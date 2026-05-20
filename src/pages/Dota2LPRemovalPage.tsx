import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { TrendingUp, Award, ArrowRight } from "lucide-react";
import Dota2ServiceLayout from "@/components/dota2/Dota2ServiceLayout";
import Dota2BoostMethodAndOptions from "@/components/dota2/Dota2BoostMethodAndOptions";
import { useCart, SpeedOption } from "@/contexts/CartContext";
import {
  applyBoostOptionsPrice,
  dota2ServicePricing,
  type BoostMethod,
} from "@/data/dota2ServicePricing";
import { toast } from "sonner";

const rangeFill = (value: number, min: number, max: number) => {
  const pct = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${pct}%, #1a1a1a ${pct}%, #1a1a1a 100%)`,
  };
};

type Speed = "standard" | "express" | "super-express";
const SPEED_OPTIONS: { id: Speed; label: string; multiplier: number; cart: SpeedOption }[] = [
  { id: "standard", label: "Standard", multiplier: 1, cart: "normal" },
  { id: "express", label: "Express +20%", multiplier: 1.2, cart: "express" },
  { id: "super-express", label: "Super Express +30%", multiplier: 1.3, cart: "super-express" },
];

const INTRO =
  "Escape the Low Priority queue fast. Professional completion guaranteed. Our experienced LP specialists get you back to ranked matchmaking within 24 hours with ban-safe methods.";

const PRICING = dota2ServicePricing["lp-removal"];

const Dota2LPRemovalPage = () => {
  const [quantity, setQuantity] = useState(5);
  const [speed, setSpeed] = useState<Speed>("standard");
  const [boostMethod, setBoostMethod] = useState<BoostMethod>("piloted");
  const [checkedOptions, setCheckedOptions] = useState<Set<string>>(new Set());
  const { addItem } = useCart();
  const pricePerGame = 5;
  const speedMultiplier = SPEED_OPTIONS.find((s) => s.id === speed)!.multiplier;
  const basePrice = quantity * pricePerGame;
  const priceAfterSpeed = basePrice * speedMultiplier;
  const totalPrice = applyBoostOptionsPrice({
    priceAfterSpeed,
    boostMethod,
    selfPlayMultiplier: PRICING.selfPlayMultiplier,
    additionalOptions: PRICING.additionalOptions,
    checkedOptionIds: checkedOptions,
  });

  const handleBoostMethodChange = (m: BoostMethod) => {
    setBoostMethod(m);
    if (m === "self-play") setCheckedOptions(new Set());
  };

  const toggleOption = (id: string) => {
    setCheckedOptions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Dota 2 Low Priority Removal - Fast LP Queue Exit",
    description:
      "Remove Dota 2 Low Priority fast. Our boosters play your LP games professionally. Get out of LP queue in hours, not days. Safe method, no ban risk.",
    image: "https://www.myboost.top/images/dota2/dota2-lp-removal.jpg",
    brand: { "@type": "Brand", name: "MyBoost" },
    offers: {
      "@type": "Offer",
      url: "https://www.myboost.top/game/dota-2/lp-removal",
      priceCurrency: "USD",
      price: "5",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: "5",
        priceCurrency: "USD",
      },
      availability: "https://schema.org/InStock",
      areaServed: "Worldwide",
    },
  };

  return (
    <>
      <SEO
        title="Dota 2 Low Priority Removal - Fast LP Queue Exit | MyBoost"
        description="Remove Dota 2 Low Priority fast. Our boosters play your LP games professionally. Get out of LP queue in hours, not days. Safe method, no ban risk."
        keywords="dota 2 lp removal, dota 2 low priority, remove low priority dota 2, lp queue exit, dota 2 lp boost"
        canonicalUrl="https://www.myboost.top/game/dota-2/lp-removal"
      />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      <Dota2ServiceLayout
        serviceId="lp-removal"
        imageSrc="/images/dota2/dota2-lp-removal.jpg"
        intro={INTRO}
        belowLayout={
          <>
            {/* FAQ Section */}
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl">
                  <h2 className="mb-12 text-center text-3xl font-black uppercase text-foreground">
                    Frequently Asked <span className="text-primary">Questions</span>
                  </h2>
                  <div className="space-y-6">
                    <div className="rounded-xl border border-border/50 bg-card p-6">
                      <h3 className="text-lg font-bold text-foreground">Is LP removal safe for my account?</h3>
                      <p className="mt-2 text-muted-foreground">
                        Yes, our LP removal service is completely safe. We use VPN protection and ban-safe methods. We also offer coaching mode where you keep full account control while our expert guides you via voice chat—the safest option available with zero account sharing.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-card p-6">
                      <h3 className="text-lg font-bold text-foreground">How long does LP removal take?</h3>
                      <p className="mt-2 text-muted-foreground">
                        We guarantee completion within 24 hours of order placement. Most LP removal orders are finished much faster—often within just a few hours—depending on queue times and the number of games required. You'll receive updates throughout the process.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-card p-6">
                      <h3 className="text-lg font-bold text-foreground">What is coaching mode?</h3>
                      <p className="mt-2 text-muted-foreground">
                        Coaching mode means you play your own LP games while our expert coach guides you through voice chat. You maintain complete control of your account with zero credential sharing. This is the safest method—perfect if you want professional help without any account access.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-card p-6">
                      <h3 className="text-lg font-bold text-foreground">What if I get more LP games during the service?</h3>
                      <p className="mt-2 text-muted-foreground">
                        If you receive additional LP games during our service due to disconnects or abandons, contact our support team immediately. We'll work with you to resolve the situation. Our specialists are trained to avoid any actions that could result in additional LP penalties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Services */}
            <section className="py-16 bg-secondary/30">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl">
                  <h2 className="mb-12 text-center text-3xl font-black uppercase text-foreground">
                    Other Dota 2 <span className="text-primary">Services</span>
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Link to="/game/dota-2/mmr-boost" className="group">
                      <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_hsl(48_100%_50%_/_0.1)]">
                        <TrendingUp className="h-10 w-10 text-primary" />
                        <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">MMR Boost</h3>
                        <p className="mt-2 text-muted-foreground">
                          Climb ranks with Immortal players. Fast, safe boosting from $3 per game.
                        </p>
                      </div>
                    </Link>
                    <Link to="/game/dota-2/rank-tokens" className="group">
                      <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_hsl(48_100%_50%_/_0.1)]">
                        <Award className="h-10 w-10 text-primary" />
                        <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">Rank Tokens Farming</h3>
                        <p className="mt-2 text-muted-foreground">
                          Collect rank tokens fast with Immortal players. From $3 per token.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </>
        }
      >
        <h3 className="text-xl font-black uppercase text-foreground">
          Order <span className="text-primary">LP Removal</span>
        </h3>

        <div className="mt-6 space-y-5">
          <div>
            <div className="flex items-baseline justify-between">
              <label className="text-xs font-bold uppercase text-foreground">Number of LP Games</label>
              <span className="text-base font-black text-primary">
                {quantity} {quantity === 1 ? "game" : "games"}
              </span>
            </div>
            <input
              type="range"
              className="myboost-range mt-2"
              min={1}
              max={50}
              step={1}
              value={quantity}
              style={rangeFill(quantity, 1, 50)}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-foreground">Delivery Speed</label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {SPEED_OPTIONS.map((opt) => {
                const active = speed === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSpeed(opt.id)}
                    className={`rounded-lg border py-2.5 px-2 text-[11px] font-bold uppercase transition-colors ${
                      active
                        ? "bg-[#FFD700] text-black border-[#FFD700]"
                        : "bg-[#111] text-white border-[rgba(255,215,0,0.3)] hover:border-[rgba(255,215,0,0.8)]"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <Dota2BoostMethodAndOptions
            selfPlayMultiplier={PRICING.selfPlayMultiplier}
            additionalOptions={PRICING.additionalOptions}
            boostMethod={boostMethod}
            onBoostMethodChange={handleBoostMethodChange}
            checkedOptionIds={checkedOptions}
            onToggleOption={toggleOption}
          />

          <div className="rounded-xl border-2 border-primary/30 bg-secondary/30 p-5 text-center">
            <div className="text-3xl font-black text-primary">${totalPrice.toFixed(2)}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              {quantity} {quantity === 1 ? "game" : "games"} × ${pricePerGame.toFixed(2)} · {SPEED_OPTIONS.find((s) => s.id === speed)!.label}
            </div>
          </div>

          <Button
            size="lg"
            className="w-full gap-2 glow-box font-bold uppercase text-base py-5"
            onClick={() => {
              addItem({
                id: "",
                game: "Dota 2",
                gameSlug: "dota-2",
                service: "LP Removal",
                options: {
                  games: quantity,
                  speed,
                  boostMethod,
                  extras: Array.from(checkedOptions),
                },
                speed: SPEED_OPTIONS.find((s) => s.id === speed)!.cart,
                basePrice,
                price: totalPrice,
                estimatedTime: `${quantity * 2}-${quantity * 4} hours`,
              });
              toast.success("LP Removal added to cart!");
            }}
          >
            Order Now <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Dota2ServiceLayout>
    </>
  );
};

export default Dota2LPRemovalPage;
