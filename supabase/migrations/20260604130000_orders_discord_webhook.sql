-- Database Webhook: fire the `order-sync` Edge Function on order INSERT/UPDATE.
--
-- Implemented as a trigger calling pg_net (net.http_post) so it is fully
-- reproducible in version control (rather than a dashboard-only webhook).
--
-- The optional shared secret is read from Supabase Vault (secret name
-- `order_sync_webhook_secret`) so it is NEVER committed. If the Vault secret is
-- absent, an empty header is sent (fine when ORDER_SYNC_WEBHOOK_SECRET is unset
-- on the Edge Function). The HTTP call is fire-and-forget and is wrapped in an
-- exception guard so a Discord/network problem can never fail the order insert.

create extension if not exists pg_net with schema extensions;

create or replace function public.handle_order_discord_sync()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  v_url text := 'https://mujdvutnjxvaujzeoudn.supabase.co/functions/v1/order-sync';
  v_secret text := '';
  v_payload jsonb;
begin
  -- Best-effort read of the optional webhook secret from Vault.
  begin
    select decrypted_secret into v_secret
    from vault.decrypted_secrets
    where name = 'order_sync_webhook_secret'
    limit 1;
  exception when others then
    v_secret := '';
  end;

  v_payload := jsonb_build_object(
    'type', TG_OP,
    'table', TG_TABLE_NAME,
    'schema', TG_TABLE_SCHEMA,
    'record', to_jsonb(NEW),
    'old_record', case when TG_OP = 'UPDATE' then to_jsonb(OLD) else null end
  );

  begin
    perform net.http_post(
      url := v_url,
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-webhook-secret', coalesce(v_secret, '')
      ),
      body := v_payload
    );
  exception when others then
    -- Never block the order insert/update on a webhook failure.
    raise warning 'order-sync webhook dispatch failed: %', sqlerrm;
  end;

  return NEW;
end;
$$;

drop trigger if exists trg_orders_discord_sync_insert on public.orders;
create trigger trg_orders_discord_sync_insert
  after insert on public.orders
  for each row execute function public.handle_order_discord_sync();

drop trigger if exists trg_orders_discord_sync_update on public.orders;
create trigger trg_orders_discord_sync_update
  after update on public.orders
  for each row execute function public.handle_order_discord_sync();
