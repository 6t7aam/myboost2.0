import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Trophy, CheckCircle, Star, Zap, Shield, Clock, TrendingUp, Users, Target, Award, ArrowRight, ArrowLeft } from "lucide-react";

const rangeFill = (value: number, min: number, max: number) => {
  const pct = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${pct}%, #1a1a1a ${pct}%, #1a1a1a 100%)`,
  };
};
import { useState } from "react";
import { useCart, SpeedOption } from "@/contexts/CartContext";
import { toast } from "sonner";

const getDotaRank = (mmr: number): string => {
  if (mmr >= 5420) return "Immortal ♾️";
  if (mmr >= 4620) return "Divine 💫";
  if (mmr >= 3850) return "Ancient 👑";
  if (mmr >= 3080) return "Legend 🏆";
  if (mmr >= 2310) return "Archon 🌟";
  if (mmr >= 1540) return "Crusader ⚔️";
  if (mmr >= 770) return "Guardian 🛡️";
  return "Herald 🔰";
};

const calculateMMRPrice = (from: number, to: number): number => {
  let price = 0;
  const segments = [
    { limit: 2000, rate: 3.33 },
    { limit: 4000, rate: 5.33 },
    { limit: 6000, rate: 6.67 },
    { limit: 8000, rate: 7.33 },
  ];
  let current = from;
  for (const seg of segments) {
    if (current >= seg.limit) continue;
    const segEnd = Math.min(to, seg.limit);
    const mmrInSeg = segEnd - current;
    if (mmrInSeg <= 0) break;
    price += (mmrInSeg / 25) * seg.rate;
    current = segEnd;
    if (current >= to) break;
  }
  return price;
};

type Speed = "standard" | "express" | "super-express";
const SPEED_OPTIONS: { id: Speed; label: string; multiplier: number; cart: SpeedOption }[] = [
  { id: "standard", label: "Standard", multiplier: 1, cart: "normal" },
  { id: "express", label: "Express +20%", multiplier: 1.2, cart: "express" },
  { id: "super-express", label: "Super Express +30%", multiplier: 1.3, cart: "super-express" },
];

const Dota2MMRBoostPage = () => {
  const [currentMMR, setCurrentMMR] = useState(1000);
  const [desiredMMR, setDesiredMMR] = useState(3000);
  const [speed, setSpeed] = useState<Speed>("standard");
  const { addItem } = useCart();
  const mmrDiff = Math.max(0, desiredMMR - currentMMR);
  const games = Math.ceil(mmrDiff / 25);
  const speedMultiplier = SPEED_OPTIONS.find((s) => s.id === speed)!.multiplier;
  const basePrice = calculateMMRPrice(currentMMR, desiredMMR);
  const totalPrice = basePrice * speedMultiplier;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Dota 2 MMR Boost - Fast Rank Up by Immortal Players",
    "description": "Buy Dota 2 MMR boost from top Immortal & Divine players. Safe, fast rank climbing with VPN protection. Solo or duo boosting available. Start in 15 minutes.",
    "image": "https://www.myboost.top/images/dota2/dota2-mmr-boost.jpg",
    "brand": {
      "@type": "Brand",
      "name": "MyBoost"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.myboost.top/game/dota-2/mmr-boost",
      "priceCurrency": "USD",
      "price": "3",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": "3",
        "priceCurrency": "USD"
      },
      "availability": "https://schema.org/InStock",
      "areaServed": "Worldwide"
    }
  };

  return (
    <>
      <SEO
        title="Dota 2 MMR Boost - Fast Rank Up by Immortal Players | MyBoost"
        description="Buy Dota 2 MMR boost from top Immortal & Divine players. Safe, fast rank climbing with VPN protection. Solo or duo boosting available. Start in 15 minutes."
        keywords="dota 2 mmr boost, dota 2 boosting, buy dota 2 boost, dota 2 rank boost, mmr boosting service"
        canonicalUrl="https://www.myboost.top/game/dota-2/mmr-boost"
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="container mx-auto px-4 pt-20" style={{ marginTop: '24px' }}>
          <Link to="/game/dota-2" className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Dota 2 Services
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-6">
          {/* IMAGE: dota2-mmr-boost.jpg - Replace this div with <img> */}
          <div className="service-image-placeholder absolute inset-0" data-image="dota2-mmr-boost.jpg">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          </div>
          <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase text-primary">Most Popular Service</span>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-foreground md:text-6xl">
                DOTA 2 <span className="text-primary glow-text">MMR BOOST</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Climb the ranks with Immortal-tier players. Safe, fast, and guaranteed results. Our professional boosters deliver consistent MMR gains with VPN protection and 15-minute start guarantee.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 lg:grid-cols-[40%_1fr]">
                <img
                  src="/images/dota2/dota2-mmr-boost.jpg"
                  alt="Dota 2 MMR Boost"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    background: '#111',
                    padding: '16px',
                    borderRadius: '12px',
                  }}
                />

                {/* Calculator */}
                <div className="rounded-2xl border-2 border-primary/30 bg-card p-8 shadow-[0_0_30px_hsl(48_100%_50%_/_0.15)]">
                  <h3 className="text-2xl font-black uppercase text-foreground">
                    Order <span className="text-primary">MMR Boost</span>
                  </h3>

                  <div className="mt-6 space-y-6">
                    <div>
                      <div className="flex items-baseline justify-between">
                        <label className="text-sm font-bold uppercase text-foreground">Current MMR</label>
                        <div className="text-right">
                          <div className="text-lg font-black text-primary">{currentMMR} MMR</div>
                          <div className="text-xs font-bold uppercase text-muted-foreground">{getDotaRank(currentMMR)}</div>
                        </div>
                      </div>
                      <input
                        type="range"
                        className="myboost-range mt-3"
                        min={0}
                        max={7975}
                        step={25}
                        value={currentMMR}
                        style={rangeFill(currentMMR, 0, 7975)}
                        onChange={(e) => {
                          const next = Math.min(parseInt(e.target.value, 10), desiredMMR - 25);
                          setCurrentMMR(next);
                        }}
                      />
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between">
                        <label className="text-sm font-bold uppercase text-foreground">Desired MMR</label>
                        <div className="text-right">
                          <div className="text-lg font-black text-primary">{desiredMMR} MMR</div>
                          <div className="text-xs font-bold uppercase text-muted-foreground">{getDotaRank(desiredMMR)}</div>
                        </div>
                      </div>
                      <input
                        type="range"
                        className="myboost-range mt-3"
                        min={25}
                        max={8000}
                        step={25}
                        value={desiredMMR}
                        style={rangeFill(desiredMMR, 25, 8000)}
                        onChange={(e) => {
                          const next = Math.max(currentMMR + 25, parseInt(e.target.value, 10));
                          setDesiredMMR(next);
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {SPEED_OPTIONS.map((opt) => {
                        const active = speed === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setSpeed(opt.id)}
                            className={`rounded-lg border py-3 px-2 text-xs font-bold uppercase transition-colors ${
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

                    <div className="rounded-xl border-2 border-primary/30 bg-secondary/30 p-6">
                      <div className="text-center">
                        <div className="text-sm uppercase tracking-wide text-muted-foreground">+{mmrDiff} MMR</div>
                        <div className="mt-2 text-4xl font-black text-primary">${totalPrice.toFixed(2)}</div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {currentMMR} → {desiredMMR} MMR · {SPEED_OPTIONS.find((s) => s.id === speed)!.label}
                        </div>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full gap-2 glow-box font-bold uppercase text-lg py-6"
                      onClick={() => {
                        addItem({
                          id: "",
                          game: "Dota 2",
                          gameSlug: "dota-2",
                          service: "MMR Boost",
                          options: {
                            currentMMR,
                            desiredMMR,
                            mmrGained: mmrDiff,
                            games,
                            speed,
                          },
                          speed: SPEED_OPTIONS.find((s) => s.id === speed)!.cart,
                          basePrice,
                          price: totalPrice,
                          estimatedTime: `${games * 1}-${games * 2} hours`,
                        });
                        toast.success("MMR Boost added to cart!");
                      }}
                    >
                      Order Now <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Users, title: "Immortal Boosters", desc: "Top-tier players only" },
                { icon: Shield, title: "VPN Protected", desc: "100% account safety" },
                { icon: Clock, title: "15 Min Start", desc: "Instant service" },
                { icon: Target, title: "100% Win Focus", desc: "Maximum efficiency" },
                { icon: TrendingUp, title: "Live Tracking", desc: "Real-time updates" },
                { icon: Award, title: "Solo & Duo", desc: "Choose your method" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-xl border border-border/50 bg-card p-6">
                  <Icon className="h-8 w-8 text-primary" />
                  <div className="mt-3 text-lg font-bold text-foreground">{title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center text-3xl font-black uppercase text-foreground">
                How It <span className="text-primary">Works</span>
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                    <span className="text-2xl font-black text-primary">1</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">Select Your MMR</h3>
                  <p className="mt-2 text-muted-foreground">
                    Choose your current and desired MMR using our calculator
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                    <span className="text-2xl font-black text-primary">2</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">We Start Boosting</h3>
                  <p className="mt-2 text-muted-foreground">
                    Immortal booster begins within 15 minutes with live tracking
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                    <span className="text-2xl font-black text-primary">3</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">Enjoy Your Rank</h3>
                  <p className="mt-2 text-muted-foreground">
                    Receive your account back at your desired MMR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center text-3xl font-black uppercase text-foreground">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <div className="space-y-6">
                <div className="rounded-xl border border-border/50 bg-card p-6">
                  <h3 className="text-lg font-bold text-foreground">Is Dota 2 MMR boosting safe?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Yes, our MMR boosting service is completely safe. We use VPN protection matched to your region, and our Immortal boosters play during your typical hours. We never use bots or cheats—only skilled players. With thousands of completed orders and zero bans, your account security is guaranteed.
                  </p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-6">
                  <h3 className="text-lg font-bold text-foreground">How fast is MMR boost delivery?</h3>
                  <p className="mt-2 text-muted-foreground">
                    We start your order within 15 minutes and deliver approximately 500 MMR in 4-12 hours on average, depending on your starting bracket. Higher MMR gains take longer due to increased match difficulty, but our Immortal boosters work efficiently to reach your target rank as quickly as possible.
                  </p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-6">
                  <h3 className="text-lg font-bold text-foreground">What's the difference between Solo and Duo boost?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Solo boost means our Immortal player plays on your account while you relax—fastest method with guaranteed results. Duo boost means you play alongside an Immortal player who carries your games while you learn—perfect for improving your skills while climbing. Both options deliver the same high-quality service.
                  </p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-6">
                  <h3 className="text-lg font-bold text-foreground">Can I track my MMR boost progress?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Yes! We provide live match tracking for all MMR boost orders. You'll receive real-time updates on every game played, including match results, heroes picked, and MMR gained. Track your progress from your dashboard and watch your rank climb in real-time with full transparency.
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
                <Link to="/game/dota-2/lp-removal" className="group">
                  <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_hsl(48_100%_50%_/_0.1)]">
                    <Shield className="h-10 w-10 text-primary" />
                    <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">
                      Low Priority Removal
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Escape LP queue fast with professional completion. From $3 per game.
                    </p>
                  </div>
                </Link>
                <Link to="/game/dota-2/rank-tokens" className="group">
                  <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_hsl(48_100%_50%_/_0.1)]">
                    <Award className="h-10 w-10 text-primary" />
                    <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">
                      Rank Tokens Farming
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Collect rank tokens fast with Immortal players. From $5 per token.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Dota2MMRBoostPage;
