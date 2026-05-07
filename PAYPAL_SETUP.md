# PayPal Integration - Quick Start Guide

## ✅ Что было сделано

### 1. Backend (Vercel Serverless Functions)
- ✅ `/api/paypal/create-order.ts` - создание PayPal заказа
- ✅ `/api/paypal/capture-order.ts` - подтверждение платежа
- ✅ `/api/paypal/webhook.ts` - webhook для уведомлений PayPal

### 2. Frontend (Vite React)
- ✅ `src/components/PayPalButton.tsx` - компонент кнопки PayPal
- ✅ `src/pages/OrderPage.tsx` - интеграция PayPal в страницу оплаты
- ✅ Premium дизайн карточки PayPal с официальной иконкой
- ✅ Адаптивный дизайн (mobile + desktop)

### 3. Database
- ✅ `supabase/migrations/20260507000000_add_paypal_fields.sql` - новые поля для PayPal

### 4. Configuration
- ✅ `vercel.json` - настройка API routes
- ✅ `package.json` - добавлен @paypal/checkout-server-sdk
- ✅ `.env.example` - пример конфигурации без секретов

### 5. Security
- ✅ Секреты только в Vercel Environment Variables
- ✅ Frontend использует только публичные данные
- ✅ Backend validation всех платежей
- ✅ Webhook signature verification
- ✅ .env в .gitignore

## 🚀 Deployment Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Apply Database Migration
```bash
# Если используете Supabase CLI
supabase db push

# Или вручную выполните SQL из файла:
# supabase/migrations/20260507000000_add_paypal_fields.sql
```

### 3. Configure Vercel Environment Variables

Перейдите в Vercel Dashboard → Settings → Environment Variables и добавьте:

**Required:**
```
PAYPAL_CLIENT_ID=your_live_client_id
PAYPAL_CLIENT_SECRET=your_live_client_secret
PAYPAL_ENV=live
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Optional (for frontend if needed):**
```
VITE_PAYPAL_CLIENT_ID=your_client_id
```

**Optional (for webhook verification):**
```
PAYPAL_WEBHOOK_ID=your_webhook_id
```

### 4. Setup PayPal Webhook

1. Go to https://developer.paypal.com/dashboard/
2. Navigate to **Webhooks** section
3. Click **Add Webhook**
4. Enter URL: `https://www.myboost.top/api/paypal/webhook`
5. Select events:
   - ✅ `PAYMENT.CAPTURE.COMPLETED`
   - ✅ `PAYMENT.CAPTURE.DENIED`
   - ✅ `PAYMENT.CAPTURE.REFUNDED`
6. Save and copy **Webhook ID**
7. Add `PAYPAL_WEBHOOK_ID` to Vercel environment variables

### 5. Deploy to Vercel
```bash
git add .
git commit -m "Add PayPal integration"
git push origin main
```

Vercel автоматически задеплоит изменения.

## 🧪 Testing

### Sandbox Testing (Recommended First)
1. Set `PAYPAL_ENV=sandbox` in Vercel
2. Use sandbox credentials from PayPal Developer Dashboard
3. Create sandbox buyer account
4. Test full payment flow

### Production Testing
1. Set `PAYPAL_ENV=live` in Vercel
2. Use live credentials
3. Test with small amount ($0.01)
4. Verify order status updates correctly

## 📋 Payment Flow

1. User clicks "Continue with PayPal"
2. Order created in database (status: pending)
3. PayPal window opens
4. User logs in and approves payment
5. Payment captured via API
6. Order status updated to "paid"
7. Webhook confirms payment (backup)

## 🔒 Security Features

✅ **PAYPAL_CLIENT_SECRET** никогда не попадает в frontend  
✅ Все платежи проверяются на backend  
✅ Webhook signature verification  
✅ CORS protection на API routes  
✅ Database validation перед capture  
✅ Секреты только в Vercel Environment Variables  

## 📱 UI Features

✅ Premium дизайн карточки PayPal  
✅ Официальная PayPal иконка  
✅ Большая кнопка PayPal Checkout  
✅ Адаптивный дизайн (mobile + desktop)  
✅ Не ломает текущий UI/дизайн  
✅ Интегрируется с существующими способами оплаты  

## 🐛 Troubleshooting

### Payment not capturing
- Check Vercel function logs
- Verify environment variables are set correctly
- Check PayPal dashboard for order status

### Webhook not receiving events
- Verify webhook URL is correct: `https://www.myboost.top/api/paypal/webhook`
- Check webhook events are subscribed
- Review Vercel function logs

### Database not updating
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set
- Check migration was applied successfully
- Review Supabase logs

## 📚 Files Changed

```
Modified:
  package.json                    - Added @paypal/checkout-server-sdk
  vercel.json                     - Added API routes configuration
  src/pages/OrderPage.tsx         - Added PayPal payment option

Created:
  api/paypal/create-order.ts      - Create PayPal order API
  api/paypal/capture-order.ts     - Capture payment API
  api/paypal/webhook.ts           - Webhook handler
  src/components/PayPalButton.tsx - PayPal button component
  supabase/migrations/20260507000000_add_paypal_fields.sql
  .env.example                    - Environment variables template
  PAYPAL_INTEGRATION.md           - Full documentation
```

## ✅ Ready for Production

Интеграция готова к production deployment. После настройки environment variables в Vercel и webhook в PayPal Dashboard, PayPal будет работать на сайте myboost.top.

## 🆘 Support

Для получения credentials:
- PayPal Dashboard: https://developer.paypal.com/dashboard/
- Vercel Dashboard: https://vercel.com/dashboard

Документация:
- PayPal Checkout: https://developer.paypal.com/docs/checkout/
- Vercel Serverless Functions: https://vercel.com/docs/functions
