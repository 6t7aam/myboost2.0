# 🚀 PayPal Deployment Checklist

## ✅ Pre-Deployment (Completed)

- [x] Install @paypal/checkout-server-sdk
- [x] Create Vercel Serverless Functions
  - [x] /api/paypal/create-order.ts
  - [x] /api/paypal/capture-order.ts
  - [x] /api/paypal/webhook.ts
- [x] Create PayPalButton component
- [x] Integrate PayPal into OrderPage
- [x] Create database migration
- [x] Update vercel.json
- [x] Create .env.example
- [x] Verify .env in .gitignore
- [x] Create documentation

## 📋 Deployment Steps

### Step 1: Install Dependencies
```bash
npm install
```
**Status:** ⏳ Pending

### Step 2: Apply Database Migration
```bash
# Option A: Using Supabase CLI
supabase db push

# Option B: Manual SQL execution
# Run: supabase/migrations/20260507000000_add_paypal_fields.sql
```
**Status:** ⏳ Pending

### Step 3: Get PayPal Credentials
1. Go to https://developer.paypal.com/dashboard/
2. Create or select your app
3. Copy **Client ID** and **Secret**
4. Note: Use **Live** credentials for production

**Status:** ⏳ Pending

### Step 4: Configure Vercel Environment Variables
Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add these variables:
```
PAYPAL_CLIENT_ID=your_live_client_id
PAYPAL_CLIENT_SECRET=your_live_client_secret
PAYPAL_ENV=live
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Optional:
```
VITE_PAYPAL_CLIENT_ID=your_client_id
PAYPAL_WEBHOOK_ID=your_webhook_id
```

**Status:** ⏳ Pending

### Step 5: Setup PayPal Webhook
1. Go to https://developer.paypal.com/dashboard/
2. Navigate to: **Webhooks** section
3. Click **Add Webhook**
4. Enter webhook URL:
   ```
   https://www.myboost.top/api/paypal/webhook
   ```
5. Select event types:
   - [x] PAYMENT.CAPTURE.COMPLETED
   - [x] PAYMENT.CAPTURE.DENIED
   - [x] PAYMENT.CAPTURE.REFUNDED
6. Save webhook
7. Copy **Webhook ID**
8. Add to Vercel: `PAYPAL_WEBHOOK_ID=your_webhook_id`

**Status:** ⏳ Pending

### Step 6: Deploy to Vercel
```bash
git add .
git commit -m "Add PayPal Checkout integration"
git push origin main
```

Vercel will automatically deploy.

**Status:** ⏳ Pending

### Step 7: Test Payment Flow
1. Go to https://www.myboost.top
2. Add item to cart
3. Proceed to checkout
4. Select **PayPal** payment method
5. Complete test payment
6. Verify order status updates to "paid"

**Status:** ⏳ Pending

## 🧪 Testing Checklist

### Sandbox Testing (Recommended First)
- [ ] Set `PAYPAL_ENV=sandbox` in Vercel
- [ ] Use sandbox credentials
- [ ] Create sandbox buyer account
- [ ] Test successful payment
- [ ] Test cancelled payment
- [ ] Test failed payment
- [ ] Verify webhook receives events
- [ ] Verify database updates correctly

### Production Testing
- [ ] Set `PAYPAL_ENV=live` in Vercel
- [ ] Use live credentials
- [ ] Test with small amount ($0.01)
- [ ] Verify order status updates
- [ ] Verify webhook works
- [ ] Test on mobile device
- [ ] Test on desktop

## 🔍 Verification

### After Deployment, Check:
- [ ] PayPal button appears on order page
- [ ] PayPal window opens correctly
- [ ] Payment completes successfully
- [ ] Order status updates to "paid"
- [ ] Webhook receives events
- [ ] No console errors
- [ ] Mobile responsive works
- [ ] Desktop layout correct

## 🐛 Troubleshooting

### If payment doesn't work:
1. Check Vercel function logs
2. Verify environment variables are set
3. Check PayPal dashboard for errors
4. Review browser console for errors

### If webhook doesn't work:
1. Verify webhook URL is correct
2. Check webhook events are subscribed
3. Review Vercel function logs
4. Test webhook manually from PayPal dashboard

### If database doesn't update:
1. Verify migration was applied
2. Check SUPABASE_SERVICE_ROLE_KEY
3. Review Supabase logs
4. Check order exists in database

## 📞 Support Resources

- PayPal Developer Dashboard: https://developer.paypal.com/dashboard/
- Vercel Dashboard: https://vercel.com/dashboard
- PayPal Checkout Docs: https://developer.paypal.com/docs/checkout/
- Vercel Functions Docs: https://vercel.com/docs/functions

## 📚 Documentation Files

- **PAYPAL_SETUP.md** - Quick start guide (Russian)
- **PAYPAL_INTEGRATION.md** - Technical documentation
- **PAYPAL_COMPLETE.md** - Integration summary
- **.env.example** - Environment variables template

---

**Created:** 2026-05-07  
**Status:** Ready for Deployment  
**Next Step:** Run `npm install`
