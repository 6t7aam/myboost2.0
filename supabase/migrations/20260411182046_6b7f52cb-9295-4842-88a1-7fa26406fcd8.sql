
ALTER TABLE public.promo_codes
  ADD COLUMN usage_limit integer NOT NULL DEFAULT 100,
  ADD COLUMN usage_count integer NOT NULL DEFAULT 0;
