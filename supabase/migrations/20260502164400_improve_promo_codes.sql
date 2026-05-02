-- Add max_order_amount column to promo_codes table
ALTER TABLE public.promo_codes
ADD COLUMN IF NOT EXISTS max_order_amount NUMERIC;

-- Add comment for documentation
COMMENT ON COLUMN public.promo_codes.max_order_amount IS 'Maximum order amount for promo code to be valid. NULL means no maximum limit.';
