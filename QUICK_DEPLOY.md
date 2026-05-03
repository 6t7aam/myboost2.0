# Quick Deployment Reference

## 🚀 3-Step Deployment

### Step 1: Run SQL Migration (2 minutes)
1. Go to: https://supabase.com/dashboard/project/pgyykrhmvjqgwvqwqpum/sql
2. Copy SQL from: `supabase/migrations/20260503093800_fix_admin_order_management.sql`
3. Paste and click "Run"

### Step 2: Configure Supabase URLs (3 minutes)
1. Go to: https://supabase.com/dashboard/project/pgyykrhmvjqgwvqwqpum/auth/url-configuration
2. Set **Site URL**: `https://www.myboost.top`
3. Add **Redirect URLs**:
   - `https://www.myboost.top`
   - `https://www.myboost.top/*`
   - `https://www.myboost.top/**`
   - `http://localhost:8080`
   - `http://localhost:8080/*`
   - `http://localhost:8080/**`
4. Click "Save"

### Step 3: Deploy Frontend (5 minutes)
```bash
npm run build
# Deploy to your hosting platform
```

---

## ✅ What's Fixed

### 1. Admin Order Deletion
- ✅ Individual delete button (red X)
- ✅ "Clear All Orders" now permanent
- ✅ Delete from order details page
- ✅ Auto-deletes related messages

### 2. Admin Status Updates
- ✅ Can change to completed/paid/in_progress
- ✅ Shows detailed error messages
- ✅ Auto-refreshes after update

### 3. Email Confirmation
- ✅ Production redirects to `https://www.myboost.top`
- ✅ Localhost still works for dev
- ✅ Email templates customizable

---

## 📝 Modified Files

```
src/hooks/useAuth.ts                    - Fixed redirect URL
src/pages/AdminPage.tsx                 - Added delete functionality
src/pages/AdminOrderDetailsPage.tsx     - Added delete + better errors
supabase/migrations/20260503...sql      - RLS policy fixes
```

---

## 🧪 Quick Test

After deployment:

1. **Admin deletion:**
   - Login as admin → Click red X on order → Refresh → Should be gone

2. **Status update:**
   - Change order status → Should see "Status updated" toast

3. **Email redirect:**
   - Signup on production → Click email link → Should go to myboost.top (not localhost)

---

## 📚 Full Documentation

- **Admin fixes:** `ADMIN_FIXES_DEPLOYMENT.md`
- **Email setup:** `EMAIL_CONFIRMATION_SETUP.md`
- **Complete summary:** `PRODUCTION_FIXES_SUMMARY.md`

---

## ⚠️ Important Notes

- **Build status:** ✅ Passing (3.32s, no errors)
- **No changes to:** Checkout, pricing, promo codes, NowPayments, chat
- **Admin email:** kfeldman800@gmail.com
- **Project ID:** pgyykrhmvjqgwvqwqpum

---

## 🆘 Troubleshooting

**Can't delete orders?**
→ Check browser console for error message
→ Verify SQL migration was applied

**Email goes to localhost?**
→ Check Site URL in Supabase is production URL
→ Redeploy frontend with updated code

**"Invalid redirect URL"?**
→ Add URL to Redirect URLs list in Supabase
→ Wait 1-2 minutes for changes to propagate

---

**Ready to deploy!** 🎉
