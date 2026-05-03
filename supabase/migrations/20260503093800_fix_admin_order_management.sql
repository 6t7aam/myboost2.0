-- Fix admin order management: allow admins to update and delete orders using has_role function

-- Drop old permissive policies that allowed any authenticated user
DROP POLICY IF EXISTS "Authenticated users can update orders" ON public.orders;
DROP POLICY IF EXISTS "Authenticated users can delete orders" ON public.orders;

-- Create admin-only update policy using has_role
CREATE POLICY "Admins can update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Create admin-only delete policy using has_role
CREATE POLICY "Admins can delete orders"
ON public.orders
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Ensure admins can read all orders
DROP POLICY IF EXISTS "Authenticated users can read all orders" ON public.orders;
CREATE POLICY "Admins can read all orders"
ON public.orders
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::public.app_role) OR
  auth.uid() = user_id
);

-- Add policy for admins to delete order_messages when deleting orders
CREATE POLICY "Admins can delete order messages"
ON public.order_messages
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));
