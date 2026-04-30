ALTER TABLE public.orders
  ADD COLUMN payment_id text,
  ADD COLUMN pay_currency text,
  ADD COLUMN payment_url text;