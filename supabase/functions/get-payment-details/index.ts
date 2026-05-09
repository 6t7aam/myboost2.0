const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const jsonResponse = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve((req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const card_number = Deno.env.get("PAYMENT_CARD_NUMBER") || "";
  const card_name = Deno.env.get("PAYMENT_CARD_NAME") || "";
  const bank_name = Deno.env.get("PAYMENT_BANK_NAME") || "";

  if (!card_number || !card_name || !bank_name) {
    return jsonResponse(
      {
        ok: false,
        error:
          "Manual payment is not configured. Set PAYMENT_CARD_NUMBER, PAYMENT_CARD_NAME and PAYMENT_BANK_NAME secrets.",
      },
      503
    );
  }

  return jsonResponse({ ok: true, data: { card_number, card_name, bank_name } });
});
