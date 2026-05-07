# PayPal Integration for MyBoost

## Overview
This document describes the PayPal Checkout integration for myboost.top.

## Architecture

### Frontend (Vite React)
- **OrderPage.tsx** - Payment selection UI with PayPal option
- **PayPalButton.tsx** - PayPal checkout button component

### Backend (Vercel Serverless Functions)
- **api/paypal/create-order.ts** - Creates PayPal order
- **api/paypal/capture-order.ts** - Captures completed payment
- **api/paypal/webhook.ts** - Handles PayPal webhook events

### Database
- **orders table** - Extended with PayPal-specific columns:
  - `paypal_order_id` - PayPal Order ID
  - `paypal_payer_id` - Payer ID
  - `paypal_payer_email` - Payer email
  - `paypal_capture_id` - Capture ID
  - `paypal_status` - Payment status

## Environment Variables

### Required in Vercel
```
PAYPAL_CLIENT_ID=your_live_client_id
PAYPAL_CLIENT_SECRET=your_live_client_secret
PAYPAL_ENV=live
VITE_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Optional
```
VITE_PAYPAL_CLIENT_ID=your_client_id (if needed in frontend)
PAYPAL_WEBHOOK_ID=your_webhook_id (for signature verification)
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Database Migration
```bash
# Apply the migration to add PayPal fields
supabase db push
```

### 3. Configure Vercel Environment Variables
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all required variables listed above
3. **IMPORTANT**: Never commit secrets to GitHub

### 4. Configure PayPal Webhook
1. Go to https://developer.paypal.com/dashboard/
2. Navigate to Webhooks
3. Create webhook with URL: `https://www.myboost.top/api/paypal/webhook`
4. Subscribe to events:
   - `PAYMENT.CAPTURE.COMPLETED`
   - `PAYMENT.CAPTURE.DENIED`
   - `PAYMENT.CAPTURE.REFUNDED`
5. Copy Webhook ID and add to Vercel environment variables

## Payment Flow

1. User selects PayPal payment method
2. Frontend creates order in database
3. Frontend calls `/api/paypal/create-order`
4. PayPal window opens for user approval
5. User completes payment on PayPal
6. Frontend calls `/api/paypal/capture-order`
7. Backend verifies and captures payment
8. Database order status updated to "paid"
9. Webhook confirms payment (backup verification)

## Security Features

✅ Client secret never exposed to frontend
✅ All payment verification on backend
✅ Webhook signature verification
✅ Database validation before capture
✅ CORS protection on API routes
✅ Environment variables in Vercel only

## Testing

### Sandbox Mode
1. Set `PAYPAL_ENV=sandbox` in Vercel
2. Use sandbox credentials from PayPal Developer Dashboard
3. Test with PayPal sandbox accounts

### Production Mode
1. Set `PAYPAL_ENV=live` in Vercel
2. Use live credentials
3. Test with real PayPal account (small amount)

## Troubleshooting

### Payment not capturing
- Check Vercel logs for API errors
- Verify environment variables are set
- Check PayPal dashboard for order status

### Webhook not working
- Verify webhook URL is correct
- Check webhook events are subscribed
- Review Vercel function logs

### Database not updating
- Check SUPABASE_SERVICE_ROLE_KEY is set
- Verify migration was applied
- Check Supabase logs

## Support
For issues, check:
- Vercel function logs
- PayPal Developer Dashboard
- Supabase logs
