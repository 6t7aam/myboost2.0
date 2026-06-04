-- Discord-synced order system.
-- Adds Discord identity to profiles, consent + Discord thread tracking to orders,
-- and enforces that an order can only be inserted when the customer agreed to terms.

-- ---------------------------------------------------------------------------
-- profiles: Discord identity captured from the OAuth login
-- ---------------------------------------------------------------------------
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS discord_id TEXT,
  ADD COLUMN IF NOT EXISTS discord_username TEXT;

CREATE INDEX IF NOT EXISTS idx_profiles_discord_id
  ON public.profiles(discord_id)
  WHERE discord_id IS NOT NULL;

-- ---------------------------------------------------------------------------
-- orders: game, free-form details, consent tracking, Discord thread id
-- ---------------------------------------------------------------------------
ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS game TEXT,
  ADD COLUMN IF NOT EXISTS details TEXT,
  ADD COLUMN IF NOT EXISTS agreed_terms BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS agreed_terms_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS discord_thread_id TEXT;

-- ---------------------------------------------------------------------------
-- RLS: a customer may only insert an order for themselves AND only when they
-- have explicitly agreed to the Terms of Service / Privacy Policy.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users can insert own orders" ON public.orders;
CREATE POLICY "Users can insert own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id AND agreed_terms = true);
