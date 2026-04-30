-- Allow any authenticated user to select all orders (admin is password-gated in the UI)
CREATE POLICY "Authenticated users can read all orders"
ON public.orders
FOR SELECT
TO authenticated
USING (true);

-- Drop the old restrictive select policy
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;

-- Allow authenticated users to update orders (admin gated in UI)
DROP POLICY IF EXISTS "Service role can update orders" ON public.orders;
CREATE POLICY "Authenticated users can update orders"
ON public.orders
FOR UPDATE
TO authenticated
USING (true);

-- Allow authenticated users to delete orders (for clear all)
CREATE POLICY "Authenticated users can delete orders"
ON public.orders
FOR DELETE
TO authenticated
USING (true);