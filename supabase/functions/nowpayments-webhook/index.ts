import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

function sortObjectDeep(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(sortObjectDeep);
  if (obj !== null && typeof obj === "object") {
    return Object.keys(obj as Record<string, unknown>)
      .sort()
      .reduce((r: Record<string, unknown>, k) => {
        r[k] = sortObjectDeep((obj as Record<string, unknown>)[k]);
        return r;
      }, {});
  }
  return obj;
}

async function hmacSha512(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-512" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  try {
    const body = await req.json();
    const receivedSig = req.headers.get("x-nowpayments-sig");
    const ipnSecret = Deno.env.get("NOWPAYMENTS_IPN_SECRET");

    if (!ipnSecret || !receivedSig) {
      console.error("Missing IPN secret or signature header");
      return new Response("Unauthorized", { status: 403 });
    }

    const sorted = sortObjectDeep(body);
    const computed = await hmacSha512(ipnSecret, JSON.stringify(sorted));
    if (computed !== receivedSig) {
      console.error("Invalid IPN signature");
      return new Response("Invalid signature", { status: 403 });
    }

    console.log("IPN received:", JSON.stringify(body));

    const { payment_status, order_id } = body;

    if (payment_status === "finished" || payment_status === "confirmed") {
      const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
      const { error } = await supabase.from("orders").update({ status: "paid" }).eq("id", order_id);
      if (error) {
        console.error("DB update error:", error);
        return new Response("DB error", { status: 500 });
      }
      console.log(`Order ${order_id} marked as paid`);
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Internal error", { status: 500 });
  }
});
