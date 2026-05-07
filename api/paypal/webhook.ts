import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Supabase client
function getSupabaseClient() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not configured');
  }

  return createClient(supabaseUrl, supabaseKey);
}

// Verify PayPal webhook signature
function verifyWebhookSignature(req: VercelRequest): boolean {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;

  if (!webhookId) {
    console.warn('PAYPAL_WEBHOOK_ID not configured - skipping signature verification');
    return true; // Allow in development, but log warning
  }

  const transmissionId = req.headers['paypal-transmission-id'] as string;
  const transmissionTime = req.headers['paypal-transmission-time'] as string;
  const certUrl = req.headers['paypal-cert-url'] as string;
  const authAlgo = req.headers['paypal-auth-algo'] as string;
  const transmissionSig = req.headers['paypal-transmission-sig'] as string;

  if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
    console.error('Missing PayPal webhook headers');
    return false;
  }

  // In production, implement full signature verification
  // For now, basic validation
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, paypal-transmission-id, paypal-transmission-time, paypal-transmission-sig, paypal-cert-url, paypal-auth-algo');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Verify webhook signature
    if (!verifyWebhookSignature(req)) {
      console.error('Invalid webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    const event = req.body;
    const eventType = event.event_type;

    console.log('PayPal webhook received:', eventType);

    // Handle different event types
    switch (eventType) {
      case 'PAYMENT.CAPTURE.COMPLETED': {
        const resource = event.resource;
        const captureId = resource.id;
        const orderId = resource.supplementary_data?.related_ids?.order_id;
        const amount = resource.amount?.value;
        const currency = resource.amount?.currency_code;
        const status = resource.status;

        console.log('Payment captured:', { captureId, orderId, amount, currency, status });

        if (orderId) {
          const supabase = getSupabaseClient();

          // Find order by PayPal order ID
          const { data: orders, error: findError } = await supabase
            .from('orders')
            .select('id, status')
            .eq('paypal_order_id', orderId)
            .limit(1);

          if (findError) {
            console.error('Error finding order:', findError);
            break;
          }

          if (orders && orders.length > 0) {
            const dbOrder = orders[0];

            // Update order status if not already paid
            if (dbOrder.status !== 'paid') {
              const { error: updateError } = await supabase
                .from('orders')
                .update({
                  status: 'paid',
                  paypal_capture_id: captureId,
                  paypal_status: status,
                })
                .eq('id', dbOrder.id);

              if (updateError) {
                console.error('Error updating order:', updateError);
              } else {
                console.log('Order updated successfully:', dbOrder.id);
              }
            }
          }
        }
        break;
      }

      case 'PAYMENT.CAPTURE.DENIED':
      case 'PAYMENT.CAPTURE.REFUNDED': {
        const resource = event.resource;
        const captureId = resource.id;
        const orderId = resource.supplementary_data?.related_ids?.order_id;

        console.log('Payment denied/refunded:', { captureId, orderId, eventType });

        if (orderId) {
          const supabase = getSupabaseClient();

          const { error: updateError } = await supabase
            .from('orders')
            .update({
              status: eventType === 'PAYMENT.CAPTURE.REFUNDED' ? 'refunded' : 'failed',
              paypal_status: resource.status,
            })
            .eq('paypal_order_id', orderId);

          if (updateError) {
            console.error('Error updating order:', updateError);
          }
        }
        break;
      }

      default:
        console.log('Unhandled event type:', eventType);
    }

    // Always return 200 to acknowledge receipt
    return res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('PayPal webhook error:', error);
    // Still return 200 to prevent PayPal from retrying
    return res.status(200).json({ received: true, error: error.message });
  }
}
