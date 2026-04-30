import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { order_id, price_amount, pay_currency } = await req.json();

    if (!order_id || !price_amount || !pay_currency) {
      return jsonResponse({ ok: false, error: "Missing required fields" });
    }

    const allowed = ["ltc", "sol", "usdttrc20", "usdtbsc"];
    if (!allowed.includes(pay_currency)) {
      return jsonResponse({ ok: false, error: "Unsupported currency" });
    }

    const apiKey = Deno.env.get("NOWPAYMENTS_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!apiKey || !supabaseUrl || !serviceRoleKey) {
      console.error("Missing env vars:", { apiKey: !!apiKey, supabaseUrl: !!supabaseUrl, serviceRoleKey: !!serviceRoleKey });
      return jsonResponse({ ok: false, error: "Payment configuration is incomplete" });
    }

    const callbackUrl = `${supabaseUrl}/functions/v1/nowpayments-webhook`;

    let npRes: Response;
    try {
      npRes = await fetch("https://api.nowpayments.io/v1/payment", {
        method: "POST",
        headers: { "x-api-key": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({
          price_amount: Number(price_amount),
          price_currency: "usd",
          pay_currency,
          order_id,
          ipn_callback_url: callbackUrl,
        }),
      });
    } catch (fetchError) {
      console.error("NOWPayments network error:", fetchError);
      return jsonResponse({ ok: false, error: "Payment provider is currently unreachable" });
    }

    const rawBody = await npRes.text();
    let npData: Record<string, unknown> = {};
    if (rawBody) {
      try {
        npData = JSON.parse(rawBody);
      } catch {
        console.error("Non-JSON response:", rawBody);
        return jsonResponse({ ok: false, error: "Invalid response from payment provider" });
      }
    }

    if (!npRes.ok) {
      console.error("NOWPayments error:", npRes.status, npData);
      return jsonResponse({ ok: false, error: (npData.message as string) || "Payment creation failed" });
    }

    const paymentId = npData.payment_id != null ? String(npData.payment_id) : null;
    const payAddress = typeof npData.pay_address === "string" ? npData.pay_address : null;
    const payAmount = npData.pay_amount != null ? Number(npData.pay_amount) : null;
    const responseCurrency = (typeof npData.pay_currency === "string" ? npData.pay_currency : pay_currency);
    const validUntil = typeof npData.valid_until === "string" ? npData.valid_until : null;
    const invoiceUrl = typeof npData.invoice_url === "string" ? npData.invoice_url : null;

    if (!paymentId) {
      console.error("Missing payment_id:", npData);
      return jsonResponse({ ok: false, error: "Payment provider returned incomplete data" });
    }

    // Persist payment details
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const updateFields: Record<string, unknown> = {
      payment_id: paymentId,
      pay_currency: responseCurrency,
    };
    if (payAddress) updateFields.pay_address = payAddress;
    if (payAmount != null) updateFields.pay_amount = payAmount;
    if (validUntil) updateFields.valid_until = validUntil;
    if (invoiceUrl) updateFields.payment_url = invoiceUrl;

    const { error: updateError } = await supabase
      .from("orders")
      .update(updateFields)
      .eq("id", order_id);

    if (updateError) {
      console.error("DB update error:", updateError);
    }

    return jsonResponse({
      ok: true,
      data: {
        payment_id: paymentId,
        pay_address: payAddress,
        pay_amount: payAmount,
        pay_currency: responseCurrency,
        valid_until: validUntil,
        payment_url: invoiceUrl,
      },
    });
  } catch (err) {
    console.error("Error:", err);
    return jsonResponse({ ok: false, error: "Internal server error" });
  }
});
