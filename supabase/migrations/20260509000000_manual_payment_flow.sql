-- Manual payment flow: storage bucket for payment screenshots
-- and per-order columns for tracking the manual code + screenshot.

-- Add columns to orders for manual payment tracking
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS manual_order_code TEXT,
  ADD COLUMN IF NOT EXISTS payment_screenshot_url TEXT;

CREATE INDEX IF NOT EXISTS idx_orders_manual_order_code
  ON public.orders(manual_order_code);

COMMENT ON COLUMN public.orders.manual_order_code IS
  'Human-readable order code shown in manual payment flow (ORDER-XXXXXX).';
COMMENT ON COLUMN public.orders.payment_screenshot_url IS
  'Public URL of the payment screenshot uploaded by the customer.';

-- Storage bucket for payment screenshots
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'payment-screenshots',
  'payment-screenshots',
  true,
  10485760, -- 10 MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Authenticated users may upload to the bucket
DROP POLICY IF EXISTS "Authenticated users can upload payment screenshots" ON storage.objects;
CREATE POLICY "Authenticated users can upload payment screenshots"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'payment-screenshots');

-- Anyone can read (bucket is public; admins display via signed/public URL)
DROP POLICY IF EXISTS "Public read for payment screenshots" ON storage.objects;
CREATE POLICY "Public read for payment screenshots"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'payment-screenshots');

-- Owners (uploaders) may delete their own files; admins covered separately if needed
DROP POLICY IF EXISTS "Uploader can delete own payment screenshot" ON storage.objects;
CREATE POLICY "Uploader can delete own payment screenshot"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'payment-screenshots' AND owner = auth.uid());
