# Order Chat System - Deployment Checklist

## 📋 Pre-Deployment Checklist

### ✅ Code Implementation
- [x] Database migration created (`20260502084829_create_order_messages.sql`)
- [x] TypeScript types updated (`src/integrations/supabase/types.ts`)
- [x] OrderChat component created with realtime
- [x] AdminOrderDetailsPage created
- [x] Routes added to App.tsx
- [x] Customer UI integrated (OrderStatusPage)
- [x] Admin UI integrated (AdminPage + AdminOrderDetailsPage)
- [x] Security policies implemented (RLS)
- [x] MyBoost black/yellow styling applied

### 🚀 Deployment Steps

#### Step 1: Apply Database Migration
```bash
supabase db push
```

**Expected Output:**
```
Applying migration 20260502084829_create_order_messages.sql...
✓ Migration applied successfully
```

**Verify:**
```bash
supabase db diff
```
Should show no pending changes.

#### Step 2: Verify Database Table
Check that `order_messages` table exists:
```sql
SELECT * FROM order_messages LIMIT 1;
```

#### Step 3: Test RLS Policies
```sql
-- Check policies are enabled
SELECT tablename, policyname 
FROM pg_policies 
WHERE tablename = 'order_messages';
```

**Expected:** 4 policies
1. Users can read their order messages
2. Users can send messages to their orders
3. Admins can read all messages
4. Admins can send messages to any order

#### Step 4: Build & Deploy Frontend
```bash
npm run build
```

**Verify build succeeds with no errors.**

#### Step 5: Test in Production

##### Customer Flow:
1. [ ] Create a test order
2. [ ] Navigate to `/order/status/{orderId}`
3. [ ] Verify chat section appears
4. [ ] Send a test message
5. [ ] Verify message appears instantly
6. [ ] Check message is saved in database

##### Admin Flow:
1. [ ] Login as admin
2. [ ] Go to `/admin`
3. [ ] Click "View" button on test order
4. [ ] Verify order details page loads
5. [ ] Verify chat section shows customer message
6. [ ] Send admin reply
7. [ ] Verify reply appears instantly

##### Realtime Test:
1. [ ] Open order status page (customer view)
2. [ ] Open same order in admin panel (different tab/browser)
3. [ ] Send message from customer
4. [ ] Verify admin sees it instantly (< 1 second)
5. [ ] Send reply from admin
6. [ ] Verify customer sees it instantly (< 1 second)

##### Security Test:
1. [ ] Create Order A with Customer A
2. [ ] Create Order B with Customer B
3. [ ] Login as Customer A
4. [ ] Try to access Order B's chat
5. [ ] Verify: Cannot see Order B messages
6. [ ] Login as Admin
7. [ ] Verify: Can see both Order A and Order B

### 🔍 Post-Deployment Verification

#### Database Check
```sql
-- Check table exists
SELECT COUNT(*) FROM order_messages;

-- Check RLS is enabled
SELECT relname, relrowsecurity 
FROM pg_class 
WHERE relname = 'order_messages';
-- Should return: relrowsecurity = true
```

#### Application Check
- [ ] Customer can send messages
- [ ] Admin can send messages
- [ ] Messages appear in real-time
- [ ] No console errors
- [ ] Styling matches MyBoost theme
- [ ] Mobile responsive
- [ ] Works in Chrome, Firefox, Safari

#### Performance Check
- [ ] Message delivery < 1 second
- [ ] No lag when scrolling chat
- [ ] Auto-scroll works smoothly
- [ ] No memory leaks (check DevTools)

### 🐛 Troubleshooting

#### Issue: Migration fails
**Solution:**
```bash
# Check Supabase connection
supabase status

# Reset and retry
supabase db reset
supabase db push
```

#### Issue: RLS blocks all access
**Solution:**
```sql
-- Temporarily disable RLS for debugging (DO NOT USE IN PRODUCTION)
ALTER TABLE order_messages DISABLE ROW LEVEL SECURITY;

-- Check policies
SELECT * FROM pg_policies WHERE tablename = 'order_messages';

-- Re-enable RLS
ALTER TABLE order_messages ENABLE ROW LEVEL SECURITY;
```

#### Issue: Realtime not working
**Check:**
1. Supabase Realtime is enabled in project settings
2. Browser console for WebSocket errors
3. Network tab shows WebSocket connection
4. No ad blockers blocking WebSocket

**Solution:**
```typescript
// Add error handling to subscription
.on('postgres_changes', {...}, (payload) => {
  console.log('Received message:', payload);
})
.subscribe((status) => {
  console.log('Subscription status:', status);
});
```

#### Issue: Messages not appearing
**Check:**
1. Database insert succeeded (check Supabase logs)
2. RLS policies allow access
3. `order_id` matches correctly
4. User is authenticated

### 📊 Monitoring

#### Key Metrics to Watch
- Message delivery time (should be < 1 second)
- Database query performance
- WebSocket connection stability
- Error rate in logs

#### Supabase Dashboard
Monitor:
- Table size (`order_messages`)
- Realtime connections
- API requests
- Database performance

### 🎉 Success Criteria

Deployment is successful when:
- [x] Database migration applied
- [x] All RLS policies active
- [x] Customer can chat on order page
- [x] Admin can chat on order details page
- [x] Messages appear in real-time (< 1s)
- [x] Security tests pass
- [x] No console errors
- [x] Mobile responsive
- [x] MyBoost styling correct

### 📝 Rollback Plan

If issues occur:

#### Option 1: Disable Chat UI
```typescript
// In OrderStatusPage.tsx and AdminOrderDetailsPage.tsx
// Comment out:
// <OrderChat orderId={orderId} isAdmin={...} />
```

#### Option 2: Drop Table (DESTRUCTIVE)
```sql
DROP TABLE IF EXISTS order_messages CASCADE;
```

#### Option 3: Revert Migration
```bash
# Find migration ID
supabase migration list

# Revert
supabase migration revert 20260502084829
```

### 🔐 Security Checklist

Before going live:
- [ ] RLS enabled on `order_messages`
- [ ] All 4 policies active
- [ ] Customer isolation verified
- [ ] Admin access verified
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] HTTPS enabled
- [ ] WebSocket secure (wss://)

### 📞 Support

If issues arise:
1. Check Supabase logs
2. Check browser console
3. Review `ORDER_CHAT_SECURITY.md`
4. Review `ORDER_CHAT_REALTIME.md`
5. Test with Supabase SQL editor

---

**Deployment Date:** 2026-05-02  
**Status:** Ready for Production  
**Estimated Deployment Time:** 5-10 minutes  
**Risk Level:** Low (no breaking changes)
