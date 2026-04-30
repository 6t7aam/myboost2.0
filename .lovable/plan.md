
Root cause: the payment function is treating a valid NOWPayments direct-payment response as a failure. The logs show `/v1/payment` returns `payment_id`, `payment_status`, `pay_address`, `pay_amount`, `pay_currency`, and validity timestamps, but no `invoice_url` or `invoice_id`. The current code requires a payment link, so it throws `502` even though the payment was created successfully.

Plan

1. Fix `create-nowpayment` success handling
- Update `supabase/functions/create-nowpayment/index.ts` so a response with `payment_id` + `pay_address` is treated as success.
- Stop requiring `invoice_url` / `invoice_id`.
- Keep `payment_url` optional instead of mandatory.
- Return direct-payment fields needed by the UI: `payment_id`, `pay_address`, `pay_amount`, `pay_currency`, `payment_status`, and validity/expiration fields if present.

2. Persist the real payment instructions on the order
- Add order columns for the direct-payment flow, at minimum:
  - `pay_address`
  - `pay_amount`
  - `payment_status` or reuse existing `status` plus provider-specific fields
  - optionally `valid_until` / `expiration_estimate_date`
- Save these fields when the payment is created so the user can refresh the page and still see where to send funds.

3. Fix the frontend payment flow
- Update `src/pages/OrderPage.tsx` so it no longer assumes a hosted payment page always exists.
- If NOWPayments returns a hosted URL, use it.
- If it returns a direct-payment response, navigate to the order status page and show the payment instructions there instead of failing.
- Prevent the current “blank screen” style failure by handling this branch explicitly.

4. Upgrade `OrderStatusPage` into a real payment-instructions screen
- Fetch and display:
  - order status
  - selected coin
  - amount to send
  - wallet address
  - validity/expiry if available
- Keep the existing polling for paid status.
- When status becomes paid, show the Discord contact message.
- This makes the direct-payment flow actually usable.

5. Harden the webhook verification
- Update `supabase/functions/nowpayments-webhook/index.ts` to require `x-nowpayments-sig` instead of accepting missing signatures.
- Use recursive key sorting before HMAC generation, matching NOWPayments docs.
- Keep updating the order to `paid` when `payment_status` becomes `finished` or `confirmed`.

6. End-to-end verification after implementation
- Create a test order, invoke the payment function, confirm the order row stores address/amount, and verify the status page shows the instructions.
- Confirm webhook updates the order to paid and the paid UI appears.
- Check that the flow works without any local/mock data.

Technical details
- The core bug is not connectivity; it is response-shape handling.
- The direct-payment API response already contains the actionable data:
  - `payment_id`
  - `pay_address`
  - `pay_amount`
  - `pay_currency`
  - `valid_until` / expiry fields
- `payment_url` should be treated as optional fallback, not required.
- The webhook logic should be tightened because the current signature check is permissive and the sort helper is not recursive.
