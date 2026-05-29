import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap, ArrowLeft, Loader2, CreditCard, Lock, CheckCircle2, Bitcoin } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import ManualPaymentDialog from "@/components/ManualPaymentDialog";
import { motion, useReducedMotion } from "framer-motion";
import { SALE_BADGE_LABEL } from "@/config/pricing";

const COINS = [
  { id: "ltc", label: "LTC", name: "Litecoin" },
  { id: "sol", label: "SOL", name: "Solana" },
  { id: "usdttrc20", label: "USDT", name: "USDT (TRC20)" },
  { id: "usdtbsc", label: "USDT", name: "USDT (BSC)" },
] as const;

type PaymentTab = "crypto" | "card";

const OrderPage = () => {
  const { items, totalPrice, totalOldPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCoin, setSelectedCoin] = useState<string>("ltc");
  const [activeTab, setActiveTab] = useState<PaymentTab>("crypto");
  const [processing, setProcessing] = useState(false);
  const [cardPaymentProcessing, setCardPaymentProcessing] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  const successAndRedirect = (orderId: string, openChat = true, instant = false) => {
    toast.success(
      openChat ? "✅ Order placed! Redirecting to your chat..." : "✅ Order placed! Redirecting to payment..."
    );
    const go = () => navigate(`/order/status/${orderId}`, { state: { openChat } });
    if (instant) go();
    else setTimeout(go, 1500);
  };

  const promoCode = (location.state as any)?.promoCode as { code: string; discount_percent: number } | null;
  const boosterType = (location.state as any)?.boosterType as string | null;
  const boosterMultiplier = (location.state as any)?.boosterMultiplier as number | null;
  const discountAmount = promoCode ? totalPrice * (promoCode.discount_percent / 100) : 0;
  const priceAfterDiscount = totalPrice - discountAmount;
  const boosterMarkup = boosterMultiplier && boosterMultiplier > 1 ? priceAfterDiscount * (boosterMultiplier - 1) : 0;
  const finalPrice = priceAfterDiscount + boosterMarkup;
  const isFreeOrder = finalPrice <= 0;
  const hasSale = totalOldPrice > totalPrice;
  const saleSavings = hasSale ? totalOldPrice - totalPrice : 0;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">No items in cart</h1>
            <p className="mt-2 text-muted-foreground">Please add services to your cart first.</p>
            <Link to="/"><Button className="mt-4">Browse Games</Button></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleCardPayment = async () => {
    if (!user) {
      toast.error("Please log in to place an order.");
      navigate("/login");
      return;
    }

    setCardPaymentProcessing(true);

    try {
      const serviceName = items.map((i) => `${i.game} — ${i.service}`).join(", ");
      const orderInsert: any = {
        user_id: user.id,
        service: serviceName,
        price: finalPrice,
        status: "pending",
        payment_method: isFreeOrder ? "promo" : "card",
        order_details: {
          items: items.map((i) => ({
            game: i.game,
            service: i.service,
            price: i.price,
            options: i.options,
          })),
          promo_code: promoCode?.code,
          discount_percent: promoCode?.discount_percent,
          booster_type: boosterType,
          booster_multiplier: boosterMultiplier,
          original_price: totalPrice,
          final_price: finalPrice,
        },
      };
      if (boosterType) orderInsert.booster_type = boosterType;

      const { data: order, error: insertErr } = await supabase
        .from("orders")
        .insert(orderInsert)
        .select("id")
        .single();

      if (insertErr || !order) {
        throw new Error(insertErr?.message || "Failed to create order");
      }

      if (promoCode) {
        await supabase.rpc("increment_promo_usage" as any, { _code: promoCode.code });
        await supabase.from("promo_code_usage" as any).insert({
          user_id: user.id,
          promo_code: promoCode.code,
        });
      }

      clearCart();

      successAndRedirect(order.id);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setCardPaymentProcessing(false);
    }
  };

  const handlePay = async () => {
    if (!user) {
      toast.error("Please log in to place an order.");
      navigate("/login");
      return;
    }

    setProcessing(true);

    try {
      const serviceName = items.map((i) => `${i.game} — ${i.service}`).join(", ");
      const orderInsert: any = {
        user_id: user.id,
        service: serviceName,
        price: finalPrice,
        status: "pending",
        payment_method: "crypto",
        order_details: {
          items: items.map((i) => ({
            game: i.game,
            service: i.service,
            price: i.price,
            options: i.options,
          })),
          promo_code: promoCode?.code,
          discount_percent: promoCode?.discount_percent,
          booster_type: boosterType,
          booster_multiplier: boosterMultiplier,
          original_price: totalPrice,
          final_price: finalPrice,
        },
      };
      if (boosterType) orderInsert.booster_type = boosterType;

      const { data: order, error: insertErr } = await supabase
        .from("orders")
        .insert(orderInsert)
        .select("id")
        .single();

      if (insertErr || !order) {
        throw new Error(insertErr?.message || "Failed to create order");
      }

      if (promoCode) {
        await supabase.rpc("increment_promo_usage" as any, { _code: promoCode.code });
        await supabase.from("promo_code_usage" as any).insert({
          user_id: user.id,
          promo_code: promoCode.code,
        });
      }

      const { data, error } = await supabase.functions.invoke("create-nowpayment", {
        body: {
          order_id: order.id,
          price_amount: finalPrice,
          pay_currency: selectedCoin,
        },
      });

      if (error) {
        throw new Error(error?.message || "Failed to create payment");
      }

      if (data && data.ok === false) {
        throw new Error(data.error || "Payment creation failed");
      }

      clearCart();

      const paymentData = data?.data || data;
      if (paymentData?.pay_address) {
        toast.message(`Send ${paymentData.pay_amount} ${paymentData.pay_currency?.toUpperCase()} to the address shown.`);
      }

      // Crypto: redirect instantly to the Order Details tab so the payment
      // invoice (address + amount + auto-checking) is shown, not the chat.
      successAndRedirect(order.id, false, true);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setProcessing(false);
    }
  };

  const tabs: { id: PaymentTab; label: string; icon: React.ReactNode }[] = [
    { id: "crypto", label: "Crypto", icon: <Bitcoin className="h-4 w-4" /> },
    { id: "card", label: "Card", icon: <CreditCard className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(48_100%_50%_/_0.06)_0%,_transparent_60%)]" />
        <div className="container relative z-10 mx-auto px-4" style={{ maxWidth: "1100px" }}>
          <Link
            to="/cart"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Cart
          </Link>

          <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
            Complete Your <span className="text-primary glow-text">Payment</span>
          </h1>

          <style>{`
            .order-grid {
              display: grid;
              grid-template-columns: minmax(0, 1fr);
              align-items: stretch;
              gap: 32px;
            }
            @media (min-width: 768px) {
              .order-grid { grid-template-columns: 40fr 60fr; }
            }
          `}</style>
          <div className="mt-8 order-grid">
              {/* LEFT COLUMN — Order Summary */}
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col gap-4"
              >
                <div
                  className="flex-1 rounded-2xl border border-primary/30 bg-primary/5 p-6"
                  style={{ borderLeft: "3px solid #FFD700" }}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Order Summary</h2>
                    {hasSale && (
                      <span className="inline-flex items-center rounded-full border border-primary/60 bg-primary/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary">
                        {SALE_BADGE_LABEL}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="border-b border-border/30 pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-foreground">{item.service}</span>
                          <span className="text-right">
                            {item.oldPrice && item.oldPrice > item.price ? (
                              <span className="mr-2 text-xs text-muted-foreground/70 line-through">${item.oldPrice.toFixed(2)}</span>
                            ) : null}
                            <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">{item.game}</p>
                        {Object.entries(item.options).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-xs text-muted-foreground mt-0.5">
                            <span>{key}</span>
                            <span className="text-foreground">{value}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                    <div className="border-t border-border/50 pt-3 space-y-1">
                      {hasSale && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground/70">Subtotal (before sale)</span>
                          <span className="text-xs text-muted-foreground/70 line-through">${totalOldPrice.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Subtotal</span>
                        <span className="text-sm text-muted-foreground">${totalPrice.toFixed(2)}</span>
                      </div>
                      {hasSale && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-primary">Sale savings</span>
                          <span className="text-sm font-semibold text-primary">-${saleSavings.toFixed(2)}</span>
                        </div>
                      )}
                      {promoCode && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary/70">Discount ({promoCode.discount_percent}%)</span>
                          <span className="text-sm text-primary/70">-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      {boosterMarkup > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary">+30% for selected PRO</span>
                          <span className="text-sm text-primary">+${boosterMarkup.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-border/30">
                        <span className="font-semibold text-foreground">Total</span>
                        <div className="text-right">
                          {hasSale && (
                            <span className="block text-xs text-muted-foreground/70 line-through">${totalOldPrice.toFixed(2)}</span>
                          )}
                          <span className="text-3xl font-black text-primary drop-shadow-[0_0_10px_hsl(48_100%_50%_/_0.45)]">${finalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security badges */}
                <div className="flex flex-wrap items-center justify-center gap-4 rounded-xl border border-border/40 bg-card/40 px-4 py-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5 text-primary" /> SSL Secured
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-primary" /> Instant Start
                  </span>
                </div>
              </motion.div>

              {/* RIGHT COLUMN — Payment Methods */}
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col"
              >
                {isFreeOrder ? (
                  <div className="flex flex-1 flex-col rounded-2xl border border-primary/30 bg-primary/5 p-6">
                    <div className="flex-1 text-center flex flex-col items-center justify-center">
                      <h2 className="text-2xl font-bold uppercase tracking-tight text-foreground">
                        Order Fully <span className="text-primary glow-text">Covered</span>
                      </h2>
                      <p className="mt-3 text-sm text-muted-foreground">
                        Your order is fully covered by promo code. No payment required.
                      </p>
                    </div>
                    <Button
                      onClick={handleCardPayment}
                      disabled={cardPaymentProcessing}
                      className="btn-yellow cta-pulse w-full gap-2 rounded-lg font-bold uppercase tracking-wider"
                      style={{ height: "54px", fontSize: "16px" }}
                    >
                      {cardPaymentProcessing ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" /> Creating Order…
                        </>
                      ) : (
                        <>Complete Free Order</>
                      )}
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                      Select Payment Method
                    </h2>

                    {/* Tabs */}
                    <div
                      className="mt-3 grid grid-cols-2 gap-2 rounded-[10px] border border-border/50 bg-card p-1.5"
                    >
                      {tabs.map((tab) => {
                        const active = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center justify-center gap-2 rounded-md font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-200 ${
                              active
                                ? "bg-primary text-primary-foreground shadow-[0_0_18px_rgba(255,215,0,0.35)]"
                                : "text-muted-foreground border border-transparent hover:border-primary/40 hover:text-primary"
                            }`}
                            style={{ padding: "12px 16px" }}
                          >
                            <span className={active ? "text-primary-foreground" : "text-primary"}>
                              {tab.icon}
                            </span>
                            <span>{tab.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Tab content */}
                    <div className="relative mt-5 flex-1">
                      {/* CRYPTO */}
                      <div
                        key={`crypto-${activeTab === "crypto"}`}
                        className={`flex h-full flex-col transition-opacity duration-200 ${
                          activeTab === "crypto" ? "opacity-100" : "hidden opacity-0"
                        }`}
                      >
                        <div className="grid grid-cols-2 gap-3">
                          {COINS.map((coin) => (
                            <button
                              key={coin.id}
                              onClick={() => setSelectedCoin(coin.id)}
                              className={`rounded-xl border p-4 text-center transition-all ${
                                selectedCoin === coin.id
                                  ? "border-primary bg-primary/10 ring-2 ring-primary/30"
                                  : "border-border/50 bg-card hover:border-primary/30"
                              }`}
                            >
                              <span className="text-lg font-bold text-foreground">{coin.label}</span>
                              <p className="mt-1 text-xs text-muted-foreground">{coin.name}</p>
                            </button>
                          ))}
                        </div>
                        <div className="mt-auto pt-5">
                          <Button
                            onClick={handlePay}
                            disabled={processing}
                            className="btn-yellow cta-pulse w-full gap-2 rounded-lg font-bold uppercase tracking-wider"
                            style={{ height: "54px", fontSize: "16px" }}
                          >
                            {processing ? (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin" /> Creating Payment…
                              </>
                            ) : (
                              <>Pay ${finalPrice.toFixed(2)} with {COINS.find((c) => c.id === selectedCoin)?.label}</>
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* CARD (manual verification) */}
                      <div
                        className={`flex h-full flex-col transition-opacity duration-200 ${
                          activeTab === "card" ? "opacity-100" : "hidden opacity-0"
                        }`}
                      >
                        <div className="flex-1 rounded-xl border border-primary/30 bg-primary/5 p-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                              <CreditCard className="h-7 w-7 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-foreground">Pay by Card — Manual Verification</h3>
                              <p className="text-xs text-muted-foreground">Bank transfer · upload screenshot</p>
                            </div>
                          </div>
                          <p className="mt-4 text-sm text-muted-foreground">
                            Send the payment to the card details shown in the next step, upload your payment screenshot,
                            and we'll verify it within 15 minutes.
                          </p>
                        </div>
                        <div className="mt-5">
                          <Button
                            onClick={() => setManualOpen(true)}
                            type="button"
                            className="btn-yellow cta-pulse w-full gap-2 rounded-lg font-bold uppercase tracking-wider"
                            style={{
                              height: "54px",
                              fontSize: "16px",
                              backgroundColor: "#FFD700",
                              color: "#000",
                              fontWeight: 700,
                            }}
                          >
                            <CreditCard className="h-5 w-5" />
                            Pay by Card
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
          </div>

          {/* Trust strip below payment area */}
          <div className="mt-10 border-t border-border/40 pt-5">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-primary" /> SSL Encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-primary" /> 15 min start
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 100% Safe
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Secure Payments
              </span>
            </div>
          </div>
        </div>
      </section>

      <ManualPaymentDialog
        open={manualOpen}
        onOpenChange={setManualOpen}
        items={items.map((i) => ({
          game: i.game,
          service: i.service,
          price: i.price,
          options: i.options as Record<string, string | number>,
        }))}
        totalPrice={totalPrice}
        finalPrice={finalPrice}
        promoCode={promoCode}
        boosterType={boosterType}
        boosterMultiplier={boosterMultiplier}
        onSuccess={({ orderId }) => {
          clearCart();
          successAndRedirect(orderId);
        }}
      />

      <Footer />
    </div>
  );
};

export default OrderPage;
