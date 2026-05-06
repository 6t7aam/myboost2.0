-- Add order_details column to store detailed order information
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS order_details JSONB;

COMMENT ON COLUMN public.orders.order_details IS 'Detailed order information including options and configurations';

-- Add policy for admins to read all profiles (to see user emails)
CREATE POLICY "Admins can read all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE user_id = auth.uid()
      AND email = 'myboost.services@gmail.com'
    )
  );
