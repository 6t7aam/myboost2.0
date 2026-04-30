import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft, Zap } from "lucide-react";
import PromoCodeInput from "@/components/PromoCodeInput";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const CartPage = () => {
  const { items, removeItem, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [appliedCode, setAppliedCode] = useState<{ code: string; discount_percent: number } | null>(null);

  const discountAmount = appliedCode ? totalPrice * (appliedCode.discount_percent / 100) : 0;
  const finalPrice = totalPrice - discountAmount;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://www.myboost.top/cart" />
      </Helmet>
      <Navbar />

      <section className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(48_100%_50%_/_0.04)_0%,_transparent_60%)]" />
        <div className="container relative z-10 mx-auto max-w-3xl px-4">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>

          <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
            Your <span className="text-primary glow-text">Cart</span>
          </h1>

          {items.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-border/50 bg-card p-12 text-center">
              <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground/30" />
              <h3 className="mt-4 text-xl font-bold text-foreground">Cart is empty</h3>
              <p className="mt-2 text-sm text-muted-foreground">Browse our games and add services to get started.</p>
              <Link to="/">
                <Button className="mt-6 glow-box font-bold uppercase tracking-wider">Browse Games</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-8 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-border/50 bg-card p-5 transition-all hover:border-primary/30"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-foreground">{item.service}</h3>
                          {item.speed !== "normal" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                              <Zap className="h-3 w-3" />
                              {item.speed === "express" ? "Express" : "Super Express"}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-sm text-muted-foreground">{item.game}</p>
                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                          {Object.entries(item.options).map(([key, val]) => (
                            <span key={key} className="text-xs text-muted-foreground">
                              {key}: <span className="text-foreground">{val}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-lg font-black text-primary">${item.price.toFixed(2)}</p>
                          {item.speed !== "normal" && (
                            <p className="text-xs text-muted-foreground line-through">${item.basePrice.toFixed(2)}</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mt-6">
                <PromoCodeInput
                  appliedCode={appliedCode}
                  onApply={setAppliedCode}
                  onRemove={() => setAppliedCode(null)}
                  orderTotal={totalPrice}
                />
              </div>

              {/* Total */}
              <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-sm text-muted-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                {appliedCode && (
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-green-400">Discount ({appliedCode.discount_percent}%)</span>
                    <span className="text-sm text-green-400">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary/20">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <span className="text-3xl font-black text-primary">${finalPrice.toFixed(2)}</span>
                </div>
                <Button
                  onClick={() => {
                    const hasArenaBreakout = items.some((i) => i.gameSlug === "arena-breakout");
                    if (hasArenaBreakout) {
                      navigate("/choose-booster", { state: { promoCode: appliedCode } });
                    } else {
                      navigate("/order", { state: { promoCode: appliedCode } });
                    }
                  }}
                  size="lg"
                  className="mt-4 w-full gap-2 rounded-xl font-bold uppercase tracking-wider glow-box-intense text-base"
                >
                  Proceed to Payment <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <button
                onClick={clearCart}
                className="mt-4 w-full text-center text-sm text-muted-foreground transition-colors hover:text-destructive"
              >
                Clear Cart
              </button>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CartPage;
