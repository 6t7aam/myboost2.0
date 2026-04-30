import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Shuffle } from "lucide-react";
import boosterAvatar from "@/assets/booster-keitarochka.png";
import { useCart } from "@/contexts/CartContext";

interface Booster {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  avatar?: string;
  link?: string;
  priceMultiplier: number;
}

const BOOSTERS: Booster[] = [
  {
    id: "random",
    title: "Random Booster",
    description: "We will assign the best available booster for your order",
    icon: <Shuffle className="h-10 w-10 text-primary" />,
    priceMultiplier: 1,
  },
  {
    id: "keitarochka",
    title: "keitarochka",
    description: "Play with a specific booster",
    link: "https://www.tiktok.com/@keitar0chka",
    avatar: boosterAvatar,
    priceMultiplier: 1.3,
  },
];

const BoosterSelectionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalPrice } = useCart();
  const [selected, setSelected] = useState<string | null>(null);

  const promoCode = (location.state as any)?.promoCode ?? null;

  const selectedBooster = BOOSTERS.find((b) => b.id === selected);
  const multiplier = selectedBooster?.priceMultiplier ?? 1;
  const promoDiscount = promoCode ? totalPrice * (promoCode.discount_percent / 100) : 0;
  const priceAfterPromo = totalPrice - promoDiscount;
  const markup = selected === "keitarochka" ? priceAfterPromo * 0.3 : 0;
  const displayTotal = priceAfterPromo + markup;

  const handleContinue = () => {
    if (!selected) return;
    navigate("/order", {
      state: {
        promoCode,
        boosterType: selected,
        boosterMultiplier: multiplier,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(48_100%_50%_/_0.06)_0%,_transparent_60%)]" />
        <div className="container relative z-10 mx-auto max-w-2xl px-4">
          <Link
            to="/cart"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Cart
          </Link>

          <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl text-center">
            Choose Your <span className="text-primary glow-text">Booster</span>
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Select who will complete your Arena Breakout: Infinite order
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {BOOSTERS.map((booster) => (
              <button
                key={booster.id}
                onClick={() => setSelected(booster.id)}
                className={`group relative flex flex-col items-center rounded-2xl border p-6 text-center transition-all duration-200 ${
                  selected === booster.id
                    ? "border-primary bg-primary/10 ring-2 ring-primary/40 shadow-[0_0_24px_-4px_hsl(var(--primary)/0.3)]"
                    : "border-border/50 bg-card hover:border-primary/40 hover:bg-primary/5"
                }`}
              >
                {/* Avatar / Icon */}
                <div className="mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30 bg-background">
                  {booster.avatar ? (
                    <img
                      src={booster.avatar}
                      alt={booster.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width={80}
                      height={80}
                    />
                  ) : (
                    booster.icon
                  )}
                </div>

                <h3 className="text-lg font-bold text-foreground">{booster.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{booster.description}</p>

                {booster.priceMultiplier > 1 && (
                  <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    +{Math.round((booster.priceMultiplier - 1) * 100)}% price
                  </span>
                )}

                {booster.link && (
                  <a
                    href={booster.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-2 text-xs font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
                  >
                    View TikTok Profile
                  </a>
                )}

                {/* Selection indicator */}
                {selected === booster.id && (
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Price preview */}
          {selected && (
            <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-1">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>${priceAfterPromo.toFixed(2)}</span>
              </div>
              {markup > 0 && (
                <div className="flex justify-between text-sm text-primary">
                  <span>+30% for selected booster</span>
                  <span>+${markup.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-primary/20">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-black text-primary">${displayTotal.toFixed(2)}</span>
              </div>
            </div>
          )}

          <Button
            onClick={handleContinue}
            disabled={!selected}
            size="lg"
            className="mt-6 w-full gap-2 rounded-xl font-bold uppercase tracking-wider glow-box-intense text-base"
          >
            Continue to Payment <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BoosterSelectionPage;
