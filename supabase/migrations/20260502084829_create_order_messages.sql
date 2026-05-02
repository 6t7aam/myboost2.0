-- Create order_messages table for order-based chat system
CREATE TABLE IF NOT EXISTS order_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('customer', 'admin')),
  sender_id UUID,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_order_messages_order_id ON order_messages(order_id);
CREATE INDEX idx_order_messages_created_at ON order_messages(created_at);

-- Enable RLS
ALTER TABLE order_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read messages from their own orders
CREATE POLICY "Users can read their order messages"
  ON order_messages
  FOR SELECT
  USING (
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

-- Policy: Users can insert messages to their own orders
CREATE POLICY "Users can send messages to their orders"
  ON order_messages
  FOR INSERT
  WITH CHECK (
    sender_id = auth.uid() AND
    sender_type = 'customer' AND
    order_id IN (
      SELECT id FROM orders WHERE user_id = auth.uid()
    )
  );

-- Policy: Admins can read all messages
CREATE POLICY "Admins can read all messages"
  ON order_messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Policy: Admins can insert messages to any order
CREATE POLICY "Admins can send messages to any order"
  ON order_messages
  FOR INSERT
  WITH CHECK (
    sender_type = 'admin' AND
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );
