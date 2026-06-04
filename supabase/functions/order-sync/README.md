# Discord-Synced Order System

End-to-end order flow that links customers' Discord accounts and mirrors every
order into a private Discord thread.

## Overview

| Step | What happens |
|------|--------------|
| **1. Login with Discord** | Supabase Auth Discord OAuth. On sign-in the app upserts `discord_id` + `discord_username` into `profiles`. |
| **2. Checkout consent** | The order page requires a "I agree to the Terms of Service and Privacy Policy" checkbox. Every payment button is disabled until it's checked, and the order is inserted with `agreed_terms = true`, `agreed_terms_at = now()`. RLS rejects any insert without consent. |
| **3. My Orders** | Protected routes `/orders` and `/my-orders` list the current user's orders. |
| **4. order-sync Edge Function** | A Database Webhook on `orders` (INSERT + UPDATE) calls this function, which talks to the Discord REST API. |
| **5. Security** | Bot token + service role key live only in the Edge Function env, never in the frontend. |

## Database changes

Applied by `supabase/migrations/20260604120000_discord_order_sync.sql`:

- `profiles.discord_id`, `profiles.discord_username`
- `orders.game`, `orders.details`, `orders.agreed_terms`, `orders.agreed_terms_at`, `orders.discord_thread_id`
- RLS insert policy on `orders` now requires `agreed_terms = true`

Apply with `supabase db push` (or run the migration in the SQL editor).

## Step 1 — Configure Discord OAuth in Supabase

1. Create an application at <https://discord.com/developers/applications>.
2. **OAuth2 → Redirects**: add `https://<your-project-ref>.supabase.co/auth/v1/callback`.
3. In the Supabase dashboard: **Authentication → Providers → Discord** → enable it and paste the Client ID + Client Secret.
4. Add your site URLs (`https://www.myboost.top`, `http://localhost:8080`) under **Authentication → URL Configuration → Redirect URLs**.

The "Continue with Discord" button is on `/login` and `/signup`.

## Step 4 — Deploy the Edge Function

```bash
supabase functions deploy order-sync
```

`verify_jwt` is disabled for this function in `supabase/config.toml` because it is
invoked by a webhook, not an end user. It is protected by a shared secret instead
(see below).

### Environment variables (Edge Function secrets)

Set these with `supabase secrets set KEY=value` (or in the dashboard under
**Edge Functions → order-sync → Secrets**). **Never** put these in the frontend.

| Variable | Description |
|----------|-------------|
| `DISCORD_BOT_TOKEN` | Bot token from the Discord application. |
| `DISCORD_GUILD_ID` | Your Discord server (guild) id. |
| `DISCORD_ORDERS_CHANNEL_ID` | Channel where order threads are created. |
| `DISCORD_VERIFIED_ROLE_ID` | Role granted on a customer's first order. |
| `SUPABASE_URL` | Project URL (auto-provided in Supabase runtime). |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (auto-provided in Supabase runtime). |
| `ORDER_SYNC_WEBHOOK_SECRET` | *(optional)* If set, the webhook must send a matching `x-webhook-secret` header. |

> `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically in the
> Supabase Edge runtime, so you usually only need to set the Discord values and the
> optional webhook secret.

## Step 4 — Register the Database Webhook

Dashboard → **Database → Webhooks → Create a new hook**:

- **Name:** `order-sync`
- **Table:** `public.orders`
- **Events:** `Insert`, `Update`
- **Type:** Supabase Edge Function → `order-sync`
- **HTTP Headers:** if you set `ORDER_SYNC_WEBHOOK_SECRET`, add
  `x-webhook-secret: <same value>`.

The webhook sends a payload of the shape
`{ type, table, schema, record, old_record }`, which the function handles.

## Required Discord bot permissions

Invite the bot with the **bot** scope and these permissions:

- **Create Private Threads**
- **Send Messages in Threads**
- **Manage Threads**
- **Manage Roles**

> **Important:** In **Server Settings → Roles**, drag the bot's role **above** the
> "Verified Customer" role. A bot can only assign roles that sit *below* its own
> highest role.

The bot must also be a member of the guild and have access to
`DISCORD_ORDERS_CHANNEL_ID`.

## Behaviour details

**On INSERT:**
1. Look up `profiles.discord_id` for the order's `user_id`.
   - If none → log and skip Discord (the order is unaffected).
2. Create a **private thread** (type `12`) in `DISCORD_ORDERS_CHANNEL_ID`,
   named `order-<short-id>-<game>`.
3. Add the customer via `PUT /channels/{thread}/thread-members/{discord_id}`.
4. Post an embed pinging `<@discord_id>` with the order summary + status.
5. Save the thread id into `orders.discord_thread_id` (service role).
6. If this is the user's first order, grant `DISCORD_VERIFIED_ROLE_ID` via
   `PUT /guilds/{guild}/members/{discord_id}/roles/{role}`.

**On UPDATE (status change):**
- Post a status-update embed (`old → new`) into the existing
  `discord_thread_id`. No-ops if the status didn't change or there's no thread.

## Error handling / logging

- Missing env vars throw a clear error.
- Every failed Discord call is logged with the status + response body.
- A missing linked Discord id is logged and skipped — it never blocks the order.
- All failures return a JSON error with the appropriate HTTP status; the order row
  itself is never rolled back by Discord problems.
