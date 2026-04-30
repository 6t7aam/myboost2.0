const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY is not configured');

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY is not configured');

    const { game, service, contact, notes } = await req.json();

    if (!game || !contact) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const html = `
      <h2 style="color:#FFC700;">New MyBoost Order</h2>
      <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;">
        <tr><td style="padding:8px;border:1px solid #333;font-weight:bold;">Game</td><td style="padding:8px;border:1px solid #333;">${game}</td></tr>
        <tr><td style="padding:8px;border:1px solid #333;font-weight:bold;">Service</td><td style="padding:8px;border:1px solid #333;">${service || 'Not specified'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #333;font-weight:bold;">Contact</td><td style="padding:8px;border:1px solid #333;">${contact}</td></tr>
        <tr><td style="padding:8px;border:1px solid #333;font-weight:bold;">Notes</td><td style="padding:8px;border:1px solid #333;">${notes || 'None'}</td></tr>
      </table>
    `;

    const response = await fetch(`${GATEWAY_URL}/emails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'X-Connection-Api-Key': RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: 'MyBoost Orders <onboarding@resend.dev>',
        to: ['kfeldman800@gmail.com'],
        subject: `New Order: ${game} — ${service || 'General'}`,
        html,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Resend API failed [${response.status}]: ${JSON.stringify(data)}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error sending order email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
