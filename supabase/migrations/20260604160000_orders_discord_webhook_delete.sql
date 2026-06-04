-- Extend the order-sync Database Webhook to also fire on DELETE of public.orders
-- so the Edge Function can remove the associated Discord thread.
--
-- The trigger function is updated to:
--   * populate `old_record` for both UPDATE and DELETE (DELETE carries
--     OLD.discord_thread_id, which the function needs),
--   * return coalesce(NEW, OLD) so it is valid for INSERT/UPDATE *and* DELETE.

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
    'record', case when TG_OP = 'DELETE' then null else to_jsonb(NEW) end,
    'old_record', case when TG_OP in ('UPDATE', 'DELETE') then to_jsonb(OLD) else null end
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
    -- Never block the order write on a webhook failure.
    raise warning 'order-sync webhook dispatch failed: %', sqlerrm;
  end;

  return coalesce(NEW, OLD);
end;
$$;

drop trigger if exists trg_orders_discord_sync_delete on public.orders;
create trigger trg_orders_discord_sync_delete
  after delete on public.orders
  for each row execute function public.handle_order_discord_sync();
