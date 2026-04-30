
-- Create promo_code_usage table
CREATE TABLE public.promo_code_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  promo_code TEXT NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, promo_code)
);

-- Enable RLS
ALTER TABLE public.promo_code_usage ENABLE ROW LEVEL SECURITY;

-- Users can view their own usage
CREATE POLICY "Users can view own promo usage"
ON public.promo_code_usage
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert own usage
CREATE POLICY "Users can insert own promo usage"
ON public.promo_code_usage
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Admins can view all usage
CREATE POLICY "Admins can view all promo usage"
ON public.promo_code_usage
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add min_order_amount to promo_codes
ALTER TABLE public.promo_codes
ADD COLUMN min_order_amount NUMERIC NOT NULL DEFAULT 0;
