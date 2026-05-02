# Order Chat System Implementation

## Overview
Added an order-based chat system that allows customers and admins to communicate within each order.

## Database Changes

### New Table: `order_messages`
- `id` (UUID, primary key)
- `order_id` (UUID, references orders table)
- `user_id` (UUID, user who sent the message)
- `message` (TEXT, message content)
- `is_admin` (BOOLEAN, whether message is from admin)
- `created_at` (TIMESTAMPTZ, timestamp)

### Row Level Security (RLS) Policies
- Customers can read/write messages only for their own orders
- Admins can read/write messages for all orders

## Migration
To apply the database migration, run:
```bash
supabase db push
```

Or manually execute the SQL file:
```
supabase/migrations/20260502084829_create_order_messages.sql
```

## New Components

### 1. OrderChat.tsx
Main chat component that displays messages and allows sending new messages.
- Real-time updates using Supabase subscriptions
- Auto-scrolls to latest message
- MyBoost black/yellow styling
- Customer messages aligned right (secondary style)
- Admin messages aligned left (primary/yellow style)
- Dark background (`bg-black/40`)
- Supports Enter key to send

### 2. OrderChatDialog.tsx
Dialog wrapper for admin to view order chats (deprecated - replaced by dedicated page).

## New Pages

### 1. AdminOrderDetailsPage.tsx
Dedicated admin page for viewing full order details with integrated chat.
- Full order information display
- Status management
- Payment details
- Integrated chat section
- Accessible via `/admin/order/:orderId`

## Updated Pages

### 1. OrderStatusPage.tsx (Customer View)
- Added OrderChat component below order status
- Vertical layout with chat section at bottom
- Chat available for all orders (pending and paid)
- MyBoost black/yellow styling

### 2. AdminPage.tsx (Admin Dashboard)
- Added "View" column with external link icon
- Clicking view button navigates to AdminOrderDetailsPage
- Shows order list with quick status updates

### 3. App.tsx
- Added route: `/admin/order/:orderId` → AdminOrderDetailsPage

## Features
- ✅ Real-time messaging with Supabase subscriptions
- ✅ Customer can chat with admin from order status page
- ✅ Admin can view full order details with integrated chat
- ✅ Admin can send replies directly from order details page
- ✅ Full message history visible to both parties
- ✅ Messages show sender (Customer/Admin/You) and timestamp
- ✅ Visual distinction between customer and admin messages
- ✅ Auto-scroll to latest message
- ✅ MyBoost black/yellow theme styling
- ✅ Secure with RLS policies
- ✅ No breaking changes to existing functionality

## Usage

### For Customers:
1. Create an order
2. Go to order status page (`/order/status/:orderId`)
3. Scroll down to the "Chat" section
4. Send messages to admin
5. See admin replies in real-time

### For Admins:
1. Go to Admin Dashboard (`/admin`)
2. Click the "View" icon (🔗) next to any order
3. View full order details on the left
4. Use integrated chat on the right
5. Send replies to customer
6. See full message history

## UI Styling (MyBoost Theme)
- **Background**: Dark (`bg-black/40` for chat area)
- **Primary Color**: Yellow/Gold (`text-primary`, `border-primary/30`)
- **Customer Messages**: Right-aligned, secondary background
- **Admin Messages**: Left-aligned, primary/yellow accent
- **Borders**: `border-primary/30` for yellow glow effect
- **Typography**: Bold uppercase headers, clean sans-serif

## Security
- RLS policies ensure customers can only access their own order chats
- Admins can access all order chats
- Messages are tied to authenticated user IDs
- Real-time subscriptions are filtered by order_id

## Files Created
1. `src/components/OrderChat.tsx` - Main chat component
2. `src/components/OrderChatDialog.tsx` - Admin modal wrapper (deprecated)
3. `src/pages/AdminOrderDetailsPage.tsx` - Admin order details page with chat
4. `supabase/migrations/20260502084829_create_order_messages.sql` - Database schema

## Files Modified
1. `src/pages/OrderStatusPage.tsx` - Added chat section for customers
2. `src/pages/AdminPage.tsx` - Added "View" button to navigate to order details
3. `src/App.tsx` - Added route for AdminOrderDetailsPage
4. `src/integrations/supabase/types.ts` - Added order_messages types
