-- Add PayPal-specific fields to orders table
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS paypal_order_id TEXT,
ADD COLUMN IF NOT EXISTS paypal_payer_id TEXT,
ADD COLUMN IF NOT EXISTS paypal_payer_email TEXT,
ADD COLUMN IF NOT EXISTS paypal_capture_id TEXT,
ADD COLUMN IF NOT EXISTS paypal_status TEXT;

-- Add indexes for PayPal lookups
CREATE INDEX IF NOT EXISTS idx_orders_paypal_order_id ON public.orders(paypal_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_paypal_capture_id ON public.orders(paypal_capture_id);

-- Add comments for documentation
COMMENT ON COLUMN public.orders.paypal_order_id IS 'PayPal Order ID from create order API';
COMMENT ON COLUMN public.orders.paypal_payer_id IS 'PayPal Payer ID from approved payment';
COMMENT ON COLUMN public.orders.paypal_payer_email IS 'PayPal payer email address';
COMMENT ON COLUMN public.orders.paypal_capture_id IS 'PayPal Capture ID from completed payment';
COMMENT ON COLUMN public.orders.paypal_status IS 'PayPal payment status: CREATED, APPROVED, COMPLETED, etc.';
