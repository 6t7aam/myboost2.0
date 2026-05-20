import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Trophy, Shield, ArrowRight } from "lucide-react";
import Dota2ServiceLayout from "@/components/dota2/Dota2ServiceLayout";
import Dota2BoostMethodAndOptions from "@/components/dota2/Dota2BoostMethodAndOptions";
import { useCart, SpeedOption } from "@/contexts/CartContext";
import {
  applyBoostOptionsPrice,
  dota2ServicePricing,
  type BoostMethod,
} from "@/data/dota2ServicePricing";
import { toast } from "sonner";
import { dota2PageSEO } from "@/data/dota2PageSEO";

const SEO_DATA = dota2PageSEO["rank-tokens"];

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

const RANK_OPTIONS = [
  { id: "herald", label: "Herald (0-769 MMR)" },
  { id: "guardian", label: "Guardian (770-1539 MMR)" },
  { id: "crusader", label: "Crusader (1540-2309 MMR)" },
  { id: "archon", label: "Archon (2310-3079 MMR)" },
  { id: "legend", label: "Legend (3080-3849 MMR)" },
  { id: "ancient", label: "Ancient (3850-4619 MMR)" },
  { id: "divine", label: "Divine (4620-5420 MMR)" },
  { id: "immortal", label: "Immortal (5421+ MMR)" },
];

const INTRO =
  "Collect Dota 2 rank tokens fast with our professional farming service. Our Immortal players deliver guaranteed token collection with safe methods, progress updates, and custom amounts.";

const PRICING = dota2ServicePricing["rank-tokens"];

const Dota2RankTokensPage = () => {
  const [quantity, setQuantity] = useState(5);
  const [speed, setSpeed] = useState<Speed>("standard");
  const [rank, setRank] = useState("legend");
  const [boostMethod, setBoostMethod] = useState<BoostMethod>("piloted");
  const [checkedOptions, setCheckedOptions] = useState<Set<string>>(new Set());
  const { addItem } = useCart();
  const pricePerToken = 3;
  const speedMultiplier = SPEED_OPTIONS.find((s) => s.id === speed)!.multiplier;
  const basePrice = quantity * pricePerToken;
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
    name: "Dota 2 Rank Tokens Farming - Fast Token Collection",
    description:
      "Buy Dota 2 rank tokens farming service. Collect tokens fast with our Immortal players. Safe account handling, fast delivery, competitive prices. Start today.",
    image: "https://www.myboost.top/images/dota2/dota2-rank-tokens.jpg",
    brand: { "@type": "Brand", name: "MyBoost" },
    offers: {
      "@type": "Offer",
      url: "https://www.myboost.top/game/dota-2/rank-tokens",
      priceCurrency: "USD",
      price: "3",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: "3",
        priceCurrency: "USD",
      },
      availability: "https://schema.org/InStock",
      areaServed: "Worldwide",
    },
  };

  return (
    <>
      <SEO
        title={SEO_DATA.title}
        description={SEO_DATA.description}
        keywords={SEO_DATA.keywords}
        canonicalUrl={SEO_DATA.canonicalUrl}
        ogImage={SEO_DATA.ogImage}
        ogTitle={SEO_DATA.ogTitle}
        ogDescription={SEO_DATA.ogDescription}
        twitterTitle={SEO_DATA.twitterTitle}
        twitterDescription={SEO_DATA.twitterDescription}
      />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      <Dota2ServiceLayout
        serviceId="rank-tokens"
        imageSrc="/images/dota2/dota2-rank-tokens.jpg"
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
                      <h3 className="text-lg font-bold text-foreground">How do rank tokens work in Dota 2?</h3>
                      <p className="mt-2 text-muted-foreground">
                        In Dota 2's ranked system, you earn rank tokens by winning ranked matches. You need a specific number of tokens to progress through sub-ranks and unlock new medal tiers. Our service farms these tokens efficiently by providing Immortal players who win matches consistently.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-card p-6">
                      <h3 className="text-lg font-bold text-foreground">How fast is token farming delivery?</h3>
                      <p className="mt-2 text-muted-foreground">
                        Most token farming orders are completed within 24-48 hours, depending on the number of tokens requested. Our Immortal players maintain high win rates, ensuring consistent token gains. You'll receive real-time progress updates after each match showing tokens earned.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-card p-6">
                      <h3 className="text-lg font-bold text-foreground">Is token farming safe for my account?</h3>
                      <p className="mt-2 text-muted-foreground">
                        Yes, our token farming service is completely safe. We use VPN protection matched to your region, and our Immortal players maintain natural gameplay patterns. We never use bots or cheats—only skilled players who win ranked matches legitimately. With thousands of completed orders and zero bans, your account security is guaranteed.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-card p-6">
                      <h3 className="text-lg font-bold text-foreground">Can I order any amount of tokens?</h3>
                      <p className="mt-2 text-muted-foreground">
                        Yes! Our service is completely flexible. You can order anywhere from 1 to 100 tokens using our calculator. Need just 2 tokens to unlock your next sub-rank? We've got you covered. Planning a major rank push with 50+ tokens? We can handle that too. Custom amounts mean you pay only for exactly what you need.
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
                        <Trophy className="h-10 w-10 text-primary" />
                        <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">MMR Boost</h3>
                        <p className="mt-2 text-muted-foreground">
                          Climb ranks with Immortal players. Fast, safe boosting from $3 per game.
                        </p>
                      </div>
                    </Link>
                    <Link to="/game/dota-2/lp-removal" className="group">
                      <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_hsl(48_100%_50%_/_0.1)]">
                        <Shield className="h-10 w-10 text-primary" />
                        <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">Low Priority Removal</h3>
                        <p className="mt-2 text-muted-foreground">
                          Escape LP queue fast with professional completion. From $5 per game.
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
          Order <span className="text-primary">Rank Tokens</span>
        </h3>

        <div className="mt-6 space-y-5">
          <div>
            <label className="text-xs font-bold uppercase text-foreground">Your Rank</label>
            <select
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="mt-2 w-full rounded-lg border border-[rgba(255,215,0,0.3)] bg-[#111] px-3 py-2.5 text-sm text-white transition-colors hover:border-[rgba(255,215,0,0.8)] focus:border-primary focus:outline-none"
            >
              {RANK_OPTIONS.map((r) => (
                <option key={r.id} value={r.id} className="bg-[#111] text-white">
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <label className="text-xs font-bold uppercase text-foreground">Number of Tokens</label>
              <span className="text-base font-black text-primary">
                {quantity} {quantity === 1 ? "token" : "tokens"}
              </span>
            </div>
            <input
              type="range"
              className="myboost-range mt-2"
              min={1}
              max={100}
              step={1}
              value={quantity}
              style={rangeFill(quantity, 1, 100)}
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
              {quantity} {quantity === 1 ? "token" : "tokens"} × ${pricePerToken.toFixed(2)} · {SPEED_OPTIONS.find((s) => s.id === speed)!.label}
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
                service: "Rank Tokens Farming",
                options: {
                  tokens: quantity,
                  rank,
                  speed,
                  boostMethod,
                  extras: Array.from(checkedOptions),
                },
                speed: SPEED_OPTIONS.find((s) => s.id === speed)!.cart,
                basePrice,
                price: totalPrice,
                estimatedTime: `${quantity * 2}-${quantity * 4} hours`,
              });
              toast.success("Rank Tokens added to cart!");
            }}
          >
            Order Now <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Dota2ServiceLayout>
    </>
  );
};

export default Dota2RankTokensPage;
