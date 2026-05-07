import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client, Environment, OrdersController } from '@paypal/paypal-server-sdk';
import { createClient } from '@supabase/supabase-js';

// PayPal client setup
function getPayPalClient() {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const env = process.env.PAYPAL_ENV || 'live';

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured');
  }

  const client = new Client({
    clientCredentialsAuthCredentials: {
      oAuthClientId: clientId,
      oAuthClientSecret: clientSecret,
    },
    environment: env === 'live' ? Environment.Production : Environment.Sandbox,
  });

  return new OrdersController(client);
}

// Supabase client
function getSupabaseClient() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not configured');
  }

  return createClient(supabaseUrl, supabaseKey);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { orderID, dbOrderId } = req.body;

    // Validation
    if (!orderID) {
      return res.status(400).json({ error: 'PayPal Order ID is required' });
    }

    if (!dbOrderId) {
      return res.status(400).json({ error: 'Database Order ID is required' });
    }

    // Capture the PayPal order
    const ordersController = getPayPalClient();
    const capture = await ordersController.captureOrder({
      id: orderID,
      prefer: 'return=representation',
    });

    const captureResult = capture.result;
    const captureStatus = captureResult?.status;

    // Extract payer information
    const payerEmail = captureResult?.payer?.emailAddress || null;
    const payerId = captureResult?.payer?.payerId || null;
    const captureId = captureResult?.purchaseUnits?.[0]?.payments?.captures?.[0]?.id || null;

    // Verify payment was completed
    if (captureStatus !== 'COMPLETED') {
      return res.status(400).json({
        ok: false,
        error: 'Payment not completed',
        status: captureStatus,
      });
    }

    // Update database order
    const supabase = getSupabaseClient();
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'paid',
        payment_method: 'paypal',
        paypal_order_id: orderID,
        paypal_payer_id: payerId,
        paypal_payer_email: payerEmail,
        paypal_capture_id: captureId,
        paypal_status: captureStatus,
      })
      .eq('id', dbOrderId);

    if (updateError) {
      console.error('Database update error:', updateError);
      // Payment succeeded but DB update failed - log for manual review
      return res.status(500).json({
        ok: false,
        error: 'Payment captured but database update failed',
        orderID,
        captureId,
      });
    }

    return res.status(200).json({
      ok: true,
      orderID,
      captureId,
      status: captureStatus,
      payerEmail,
    });
  } catch (error: any) {
    console.error('PayPal capture order error:', error);

    // Check if it's already captured
    if (error.statusCode === 422) {
      return res.status(400).json({
        ok: false,
        error: 'Order already captured or invalid',
      });
    }

    return res.status(500).json({
      ok: false,
      error: error.message || 'Failed to capture PayPal order',
    });
  }
}
