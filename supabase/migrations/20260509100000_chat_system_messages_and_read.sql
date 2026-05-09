-- Allow 'system' as a sender_type, add read_at tracking, and a SECURITY DEFINER
-- helper that lets a customer mark admin/system messages on their own orders read.

-- Drop existing CHECK constraint and recreate to include 'system'
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.constraint_column_usage
    WHERE table_schema = 'public'
      AND table_name = 'order_messages'
      AND column_name = 'sender_type'
  ) THEN
    BEGIN
      ALTER TABLE public.order_messages DROP CONSTRAINT IF EXISTS order_messages_sender_type_check;
    EXCEPTION WHEN OTHERS THEN
      NULL;
    END;
  END IF;
END $$;

ALTER TABLE public.order_messages
  ADD CONSTRAINT order_messages_sender_type_check
  CHECK (sender_type IN ('customer', 'admin', 'system'));

-- read_at column for unread badge tracking
ALTER TABLE public.order_messages
  ADD COLUMN IF NOT EXISTS read_at TIMESTAMPTZ DEFAULT NULL;

CREATE INDEX IF NOT EXISTS idx_order_messages_unread
  ON public.order_messages(order_id, read_at)
  WHERE read_at IS NULL;

-- Allow the order owner to insert system messages on their own orders
DROP POLICY IF EXISTS "Users can post system messages to their orders" ON public.order_messages;
CREATE POLICY "Users can post system messages to their orders"
  ON public.order_messages
  FOR INSERT
  WITH CHECK (
    sender_id = auth.uid()
    AND sender_type = 'system'
    AND order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid())
  );

-- SECURITY DEFINER function so customers can mark admin/system messages as read
-- on their own orders without granting a broad UPDATE policy on the table.
CREATE OR REPLACE FUNCTION public.mark_order_messages_read(_order_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN;
  END IF;

  UPDATE public.order_messages
  SET read_at = NOW()
  WHERE order_id = _order_id
    AND read_at IS NULL
    AND sender_type IN ('admin', 'system')
    AND order_id IN (SELECT id FROM public.orders WHERE user_id = auth.uid());
END;
$$;

GRANT EXECUTE ON FUNCTION public.mark_order_messages_read(uuid) TO authenticated;
