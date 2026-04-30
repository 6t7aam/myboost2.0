
CREATE OR REPLACE FUNCTION public.increment_promo_usage(_code text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.promo_codes
  SET usage_count = usage_count + 1
  WHERE code = _code;
$$;
