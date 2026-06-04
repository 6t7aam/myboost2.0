// order-sync — Supabase Edge Function triggered by a Database Webhook on the
// `orders` table (INSERT + UPDATE). It mirrors orders into Discord:
//
//   INSERT  → create a private thread for the order, add the customer, post an
//             embed pinging them, persist the thread id, and (on the customer's
//             first order) grant the "Verified Customer" role.
//   UPDATE  → when the status changes, post a status update into the thread.
//
// Secrets live ONLY in the Edge Function environment — never in the frontend.
//
// Required env vars:
//   DISCORD_BOT_TOKEN
//   DISCORD_GUILD_ID
//   DISCORD_ORDERS_CHANNEL_ID
//   DISCORD_VERIFIED_ROLE_ID
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
// Optional:
//   ORDER_SYNC_WEBHOOK_SECRET  — if set, the webhook must send a matching
//                                `x-webhook-secret` header.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const DISCORD_API = "https://discord.com/api/v10";

interface OrderRecord {
  id: string;
  user_id: string;
  game: string | null;
  service: string;
  details: string | null;
  price: number;
  status: string;
  discord_thread_id: string | null;
  created_at?: string;
}

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: OrderRecord | null;
  old_record: OrderRecord | null;
}

const env = (key: string): string => {
  const v = Deno.env.get(key);
  if (!v) throw new Error(`Missing required env var: ${key}`);
  return v;
};

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

// Thin wrapper around the Discord REST API with consistent auth + logging.
const discord = async (
  path: string,
  init: RequestInit & { botToken: string },
): Promise<Response> => {
  const { botToken, ...rest } = init;
  const res = await fetch(`${DISCORD_API}${path}`, {
    ...rest,
    headers: {
      Authorization: `Bot ${botToken}`,
      "Content-Type": "application/json",
      ...(rest.headers ?? {}),
    },
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`Discord ${rest.method ?? "GET"} ${path} failed: ${res.status} ${text}`);
  }
  return res;
};

// Discord channel/thread names: <=100 chars, no leading/trailing whitespace.
const buildThreadName = (order: OrderRecord) => {
  const game = (order.game ?? "order").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const shortId = order.id.slice(0, 8);
  return `order-${shortId}-${game}`.slice(0, 100);
};

const priceLabel = (price: number) => `$${Number(price).toFixed(2)}`;

const prettyStatus = (status: string) =>
  status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const orderEmbed = (order: OrderRecord) => ({
  title: `New Order — ${prettyStatus(order.status)}`,
  color: 0xffd700,
  fields: [
    { name: "Order ID", value: order.id, inline: false },
    { name: "Game", value: order.game || "—", inline: true },
    { name: "Service", value: order.service || "—", inline: true },
    { name: "Price", value: priceLabel(order.price), inline: true },
    { name: "Status", value: prettyStatus(order.status), inline: true },
    ...(order.details ? [{ name: "Details", value: order.details.slice(0, 1024), inline: false }] : []),
  ],
  timestamp: new Date().toISOString(),
});

const handleInsert = async (order: OrderRecord) => {
  const botToken = env("DISCORD_BOT_TOKEN");
  const guildId = env("DISCORD_GUILD_ID");
  const channelId = env("DISCORD_ORDERS_CHANNEL_ID");
  const verifiedRoleId = env("DISCORD_VERIFIED_ROLE_ID");
  const supabaseUrl = env("SUPABASE_URL");
  const serviceRoleKey = env("SUPABASE_SERVICE_ROLE_KEY");

  const admin = createClient(supabaseUrl, serviceRoleKey);

  // Look up the customer's linked Discord id.
  const { data: profile, error: profileErr } = await admin
    .from("profiles")
    .select("discord_id, discord_username")
    .eq("user_id", order.user_id)
    .maybeSingle();

  if (profileErr) {
    console.error("Failed to load profile:", profileErr.message);
    return json({ ok: false, error: "profile lookup failed" }, 500);
  }

  const discordId = profile?.discord_id ?? null;
  console.log(
    `Order ${order.id}: profile ${profile ? "found" : "missing"} for user ${order.user_id}, resolved discord_id = ${discordId ?? "null"}.`,
  );
  if (!discordId) {
    console.log(`Order ${order.id}: user ${order.user_id} has no linked Discord — skipping Discord sync.`);
    return json({ ok: true, skipped: "no linked discord" });
  }

  // 1) Create a PRIVATE thread (type 12) in the orders channel.
  const threadRes = await discord(`/channels/${channelId}/threads`, {
    botToken,
    method: "POST",
    body: JSON.stringify({
      name: buildThreadName(order),
      type: 12, // GUILD_PRIVATE_THREAD
      invitable: false,
      auto_archive_duration: 10080, // 7 days
    }),
  });
  if (!threadRes.ok) {
    return json({ ok: false, error: "failed to create thread" }, 502);
  }
  const thread = await threadRes.json();
  const threadId: string = thread.id;

  // 2) Add the customer to the private thread.
  await discord(`/channels/${threadId}/thread-members/${discordId}`, {
    botToken,
    method: "PUT",
  });

  // 3) Post the order embed, pinging the customer.
  await discord(`/channels/${threadId}/messages`, {
    botToken,
    method: "POST",
    body: JSON.stringify({
      content: `<@${discordId}> your order has been received! Our team will assist you here.`,
      embeds: [orderEmbed(order)],
      allowed_mentions: { users: [discordId] },
    }),
  });

  // 4) Persist the thread id back onto the order (service role bypasses RLS).
  const { error: updateErr } = await admin
    .from("orders")
    .update({ discord_thread_id: threadId })
    .eq("id", order.id);
  if (updateErr) console.error("Failed to save discord_thread_id:", updateErr.message);

  // 5) On the customer's FIRST order, grant the Verified Customer role.
  const { count, error: countErr } = await admin
    .from("orders")
    .select("id", { count: "exact", head: true })
    .eq("user_id", order.user_id);
  if (countErr) {
    console.error("Failed to count user orders:", countErr.message);
  } else if ((count ?? 0) <= 1) {
    await discord(`/guilds/${guildId}/members/${discordId}/roles/${verifiedRoleId}`, {
      botToken,
      method: "PUT",
    });
    console.log(`Order ${order.id}: granted Verified Customer role to ${discordId}.`);
  }

  return json({ ok: true, thread_id: threadId });
};

const handleUpdate = async (order: OrderRecord, old: OrderRecord | null) => {
  // Only react to status changes.
  if (old && old.status === order.status) {
    return json({ ok: true, skipped: "status unchanged" });
  }

  if (!order.discord_thread_id) {
    console.log(`Order ${order.id}: no discord_thread_id on update — skipping.`);
    return json({ ok: true, skipped: "no thread" });
  }

  const botToken = env("DISCORD_BOT_TOKEN");
  await discord(`/channels/${order.discord_thread_id}/messages`, {
    botToken,
    method: "POST",
    body: JSON.stringify({
      embeds: [
        {
          title: "Order Status Updated",
          color: 0xffd700,
          description: `**${old ? prettyStatus(old.status) : "—"} → ${prettyStatus(order.status)}**`,
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  return json({ ok: true, updated: true });
};

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return json({ ok: false, error: "method not allowed" }, 405);
  }

  // Optional shared-secret verification for the webhook.
  const expectedSecret = Deno.env.get("ORDER_SYNC_WEBHOOK_SECRET");
  if (expectedSecret && req.headers.get("x-webhook-secret") !== expectedSecret) {
    return json({ ok: false, error: "unauthorized" }, 401);
  }

  let payload: WebhookPayload;
  try {
    payload = await req.json();
  } catch {
    return json({ ok: false, error: "invalid json" }, 400);
  }

  if (payload.table !== "orders") {
    return json({ ok: true, skipped: "not orders table" });
  }

  try {
    if (payload.type === "INSERT" && payload.record) {
      return await handleInsert(payload.record);
    }
    if (payload.type === "UPDATE" && payload.record) {
      return await handleUpdate(payload.record, payload.old_record);
    }
    return json({ ok: true, skipped: `unhandled type ${payload.type}` });
  } catch (err) {
    console.error("order-sync error:", err);
    return json({ ok: false, error: err instanceof Error ? err.message : "internal error" }, 500);
  }
});
