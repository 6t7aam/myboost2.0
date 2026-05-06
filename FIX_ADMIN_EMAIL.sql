-- Исправление: Обновить политику для вашего админ email
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;

-- Add order_details column
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS order_details JSONB;

COMMENT ON COLUMN public.orders.order_details IS 'Detailed order information including options and configurations';

-- Создать политику для вашего реального админ email
CREATE POLICY "Admins can read all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE user_id = auth.uid()
      AND email IN ('myboost.services@gmail.com', 'kfeldman800@gmail.com')
    )
  );
