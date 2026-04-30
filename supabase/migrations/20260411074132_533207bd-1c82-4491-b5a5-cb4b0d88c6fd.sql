ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS pay_address text;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS pay_amount numeric;
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS valid_until timestamptz;