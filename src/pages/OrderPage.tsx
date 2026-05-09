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
import PayPalButton from "@/components/PayPalButton";
import ManualPaymentDialog from "@/components/ManualPaymentDialog";

const COINS = [
  { id: "ltc", label: "LTC", name: "Litecoin" },
  { id: "sol", label: "SOL", name: "Solana" },
  { id: "usdttrc20", label: "USDT", name: "USDT (TRC20)" },
  { id: "usdtbsc", label: "USDT", name: "USDT (BSC)" },
] as const;

type PaymentTab = "crypto" | "paypal" | "card";

const OrderPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCoin, setSelectedCoin] = useState<string>("ltc");
  const [activeTab, setActiveTab] = useState<PaymentTab>("crypto");
  const [processing, setProcessing] = useState(false);
  const [cardPaymentProcessing, setCardPaymentProcessing] = useState(false);
  const [paypalOrderId, setPaypalOrderId] = useState<string | null>(null);
  const [paypalLoading, setPaypalLoading] = useState(false);
  const [manualOpen, setManualOpen] = useState(false);

  const successAndRedirect = (orderId: string) => {
    toast.success("✅ Order placed! Redirecting to your chat...");
    setTimeout(() => {
      navigate(`/order/status/${orderId}`, { state: { openChat: true } });
    }, 1500);
  };

  const promoCode = (location.state as any)?.promoCode as { code: string; discount_percent: number } | null;
  const boosterType = (location.state as any)?.boosterType as string | null;
  const boosterMultiplier = (location.state as any)?.boosterMultiplier as number | null;
  const discountAmount = promoCode ? totalPrice * (promoCode.discount_percent / 100) : 0;
  const priceAfterDiscount = totalPrice - discountAmount;
  const boosterMarkup = boosterMultiplier && boosterMultiplier > 1 ? priceAfterDiscount * (boosterMultiplier - 1) : 0;
  const finalPrice = priceAfterDiscount + boosterMarkup;
  const isFreeOrder = finalPrice <= 0;

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

      successAndRedirect(order.id);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setProcessing(false);
    }
  };

  const handlePaypalInit = async () => {
    if (!user) {
      toast.error("Please log in to place an order.");
      navigate("/login");
      return;
    }
    setPaypalLoading(true);
    try {
      const serviceName = items.map((i) => `${i.game} — ${i.service}`).join(", ");
      const orderInsert: any = {
        user_id: user.id,
        service: serviceName,
        price: finalPrice,
        status: "pending",
        payment_method: "paypal",
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

      setPaypalOrderId(order.id);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setPaypalLoading(false);
    }
  };

  const PayPalLogo = () => (
    <svg className="h-7 w-7 text-primary" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.905 9.5c.21-1.342.09-2.268-.451-3.105C19.625 5.205 18.29 4.5 16.36 4.5H8.49c-.555 0-1.03.405-1.12.96L4.5 19.5h4.17l1.05-6.645-.033.21c.09-.555.563-.96 1.118-.96h2.325c4.575 0 8.16-1.86 9.21-7.23.03-.165.06-.315.09-.465-.165-.075-.165-.075 0 0z" />
      <path d="M9.615 9.435c.06-.36.345-.63.72-.63h4.65c.555 0 1.08.045 1.575.135.15.03.3.075.435.12.135.045.27.09.39.15.06.03.12.06.18.09.525.24.96.585 1.26 1.065.21-1.335.09-2.25-.45-3.075C17.55 6.105 16.215 5.4 14.285 5.4H6.415c-.555 0-1.03.405-1.12.96L2.43 20.4h4.17l1.17-7.425.845-3.54z" opacity=".7" />
    </svg>
  );

  const tabs: { id: PaymentTab; label: string; icon: React.ReactNode }[] = [
    { id: "crypto", label: "Crypto", icon: <Bitcoin className="h-4 w-4" /> },
    { id: "paypal", label: "PayPal", icon: <PayPalLogo /> },
    { id: "card", label: "Card", icon: <CreditCard className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background page-enter">
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
              <div className="flex flex-col gap-4">
                <div
                  className="flex-1 rounded-2xl border border-primary/30 bg-primary/5 p-6"
                  style={{ borderLeft: "3px solid #FFD700" }}
                >
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Order Summary</h2>
                  <div className="mt-4 space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="border-b border-border/30 pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-foreground">{item.service}</span>
                          <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
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
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Subtotal</span>
                        <span className="text-sm text-muted-foreground">${totalPrice.toFixed(2)}</span>
                      </div>
                      {promoCode && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary/70">Discount ({promoCode.discount_percent}%)</span>
                          <span className="text-sm text-primary/70">-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      {boosterMarkup > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-primary">+30% for selected booster</span>
                          <span className="text-sm text-primary">+${boosterMarkup.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-border/30">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="text-3xl font-black text-primary">${finalPrice.toFixed(2)}</span>
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
              </div>

              {/* RIGHT COLUMN — Payment Methods */}
              <div className="flex flex-col">
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
                      className="mt-3 grid grid-cols-3 gap-2 rounded-[10px] border border-border/50 bg-card p-1.5"
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

                      {/* PAYPAL */}
                      <div
                        className={`flex h-full flex-col transition-opacity duration-200 ${
                          activeTab === "paypal" ? "opacity-100" : "hidden opacity-0"
                        }`}
                      >
                        <div className="flex-1 rounded-xl border border-primary/30 bg-primary/5 p-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                              <PayPalLogo />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-foreground">PayPal</h3>
                              <p className="text-xs text-muted-foreground">Fast & secure payment</p>
                            </div>
                          </div>
                          <p className="mt-4 text-sm text-muted-foreground">
                            Pay with your PayPal account or any major card via PayPal Checkout. You'll be redirected to complete the payment securely.
                          </p>
                        </div>
                        <div className="mt-5">
                          {paypalOrderId ? (
                            <PayPalButton
                              amount={finalPrice}
                              orderId={paypalOrderId}
                              onSuccess={() => {
                                clearCart();
                                successAndRedirect(paypalOrderId);
                              }}
                            />
                          ) : (
                            <Button
                              onClick={handlePaypalInit}
                              disabled={paypalLoading}
                              variant="outline"
                              className="w-full gap-2.5 rounded-lg border-primary/40 bg-card font-bold uppercase tracking-wider hover:bg-primary/10 hover:border-primary/60 transition-all"
                              style={{ height: "54px", fontSize: "16px" }}
                            >
                              {paypalLoading ? (
                                <>
                                  <Loader2 className="h-5 w-5 animate-spin text-primary" /> Preparing PayPal…
                                </>
                              ) : (
                                <>
                                  <PayPalLogo />
                                  Continue with PayPal
                                </>
                              )}
                            </Button>
                          )}
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
              </div>
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
