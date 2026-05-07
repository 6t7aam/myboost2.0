import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Client, Environment, OrdersController } from '@paypal/paypal-server-sdk';

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
    const { amount, currency = 'USD', orderId } = req.body;

    // Validation
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    if (!orderId) {
      return res.status(400).json({ error: 'Order ID is required' });
    }

    // Create PayPal order
    const ordersController = getPayPalClient();
    const response = await ordersController.createOrder({
      body: {
        intent: 'CAPTURE',
        purchaseUnits: [
          {
            referenceId: orderId,
            amount: {
              currencyCode: currency,
              value: amount.toFixed(2),
            },
            description: `MyBoost Order #${orderId}`,
          },
        ],
        applicationContext: {
          brandName: 'MyBoost',
          landingPage: 'NO_PREFERENCE',
          userAction: 'PAY_NOW',
          returnUrl: `https://www.myboost.top/order/status/${orderId}`,
          cancelUrl: `https://www.myboost.top/order`,
        },
      },
      prefer: 'return=representation',
    });

    return res.status(200).json({
      ok: true,
      orderID: response.result?.id,
      status: response.result?.status,
    });
  } catch (error: any) {
    console.error('PayPal create order error:', error);
    return res.status(500).json({
      ok: false,
      error: error.message || 'Failed to create PayPal order',
    });
  }
}
