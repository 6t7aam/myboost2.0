# Admin Order Management Fixes - Deployment Instructions

## Issues Fixed

### 1. Admin Order Deletion
- ✅ Added individual order delete button in admin orders table
- ✅ Fixed "Clear All Orders" to permanently delete from Supabase (not just visually)
- ✅ Added delete functionality in order details page
- ✅ Cascade deletion of related order_messages when order is deleted

### 2. Admin Order Status Update
- ✅ Fixed RLS policies to allow admin status updates
- ✅ Added proper error logging with detailed error messages
- ✅ Added automatic order list refresh after updates

## Files Changed

### Frontend Changes
1. `src/pages/AdminPage.tsx`
   - Added `deleteOrder()` function for individual order deletion
   - Fixed `clearAllOrders()` to use proper delete query
   - Added delete button column in orders table
   - Improved error handling with console logging
   - Added `fetchOrders()` call after updates

2. `src/pages/AdminOrderDetailsPage.tsx`
   - Added `deleteOrder()` function
   - Added "Danger Zone" card with delete button
   - Improved error handling for status updates
   - Redirects to admin page after deletion

### Database Migration
3. `supabase/migrations/20260503093800_fix_admin_order_management.sql`
   - Fixed RLS policies to use `has_role()` function properly
   - Replaced permissive policies with admin-only policies
   - Added policy for admins to delete order_messages

## Deployment Steps

### Step 1: Apply Database Migration

Go to your Supabase Dashboard:
1. Navigate to: https://supabase.com/dashboard/project/pgyykrhmvjqgwvqwqpum
2. Go to SQL Editor
3. Create a new query
4. Copy and paste the following SQL:

```sql
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
```

5. Click "Run" to execute the migration

### Step 2: Deploy Frontend Changes

Build and deploy the updated frontend:

```bash
npm run build
# Then deploy to your hosting platform (Vercel, Netlify, etc.)
```

### Step 3: Verify Fixes

After deployment, test the following as an admin user:

1. **Individual Order Deletion**
   - Go to Admin Dashboard
   - Click the red X button on any order
   - Confirm deletion
   - Verify order is permanently removed (refresh page to confirm)

2. **Clear All Orders**
   - Click "Clear All Orders" button
   - Confirm deletion
   - Verify all orders are removed
   - Refresh page to confirm they don't come back

3. **Status Updates**
   - Change an order status to "completed", "paid", or "in_progress"
   - Verify success toast appears
   - Verify status is updated in the table
   - Check browser console for any errors

4. **Order Details Page Deletion**
   - Click "View" on any order
   - Scroll to "Danger Zone" card
   - Click "Delete Order"
   - Verify redirect to admin dashboard
   - Confirm order is deleted

## Technical Details

### RLS Policy Changes

**Before:** Any authenticated user could update/delete orders (security issue)
**After:** Only users with admin role can update/delete orders

The fix uses the `public.has_role(auth.uid(), 'admin'::public.app_role)` function to check if the current user has the admin role in the `user_roles` table.

### Cascade Deletion

When an order is deleted, related `order_messages` are automatically deleted due to:
1. Foreign key constraint: `order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE`
2. RLS policy allowing admins to delete order_messages

### Error Handling

All admin operations now include:
- Detailed error logging to browser console
- User-friendly error messages with actual error details
- Automatic data refresh after successful operations

## Rollback Plan

If issues occur, you can rollback the RLS policies:

```sql
-- Rollback to permissive policies (NOT RECOMMENDED for production)
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can delete orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can read all orders" ON public.orders;

CREATE POLICY "Authenticated users can update orders"
ON public.orders FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete orders"
ON public.orders FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read all orders"
ON public.orders FOR SELECT TO authenticated USING (true);
```

## Notes

- The migration file is saved in `supabase/migrations/` for version control
- Admin role is checked using the `user_roles` table
- Current admin email: kfeldman800@gmail.com (from migration 20260411084121)
- Order messages are automatically cleaned up when orders are deleted
