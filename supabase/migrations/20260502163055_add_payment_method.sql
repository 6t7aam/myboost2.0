-- Add payment_method column to orders table
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS payment_method TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.orders.payment_method IS 'Payment method used: crypto, card, or null for unknown';
