import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Trophy, CheckCircle, Star, Zap, Shield, Clock, TrendingUp, Users, Target, Award, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Dota2MMRBoostPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const pricePerGame = 3;
  const totalPrice = quantity * pricePerGame;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Dota 2 MMR Boost - Fast Rank Up by Immortal Players",
    "description": "Buy Dota 2 MMR boost from top Immortal & Divine players. Safe, fast rank climbing with VPN protection. Solo or duo boosting available. Start in 15 minutes.",
    "image": "https://www.myboost.top/images/dota2-mmr-boost.jpg",
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

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16">
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
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/game/dota-2/mmr-boost">
                  <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                    <Zap className="h-5 w-5" /> Order Now
                  </Button>
                </Link>
                <Link to="/game/dota-2">
                  <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                    View All Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                {/* IMAGE: dota2-mmr-boost-service.jpg - Replace this div with <img> */}
                <div className="service-image-placeholder rounded-2xl border border-border/50 bg-secondary/30 overflow-hidden" data-image="dota2-mmr-boost-service.jpg">
                  <div className="aspect-video w-full bg-gradient-to-br from-primary/10 to-secondary/50 flex items-center justify-center">
                    <Trophy className="h-24 w-24 text-primary/30" />
                  </div>
                </div>

                {/* Calculator */}
                <div className="rounded-2xl border-2 border-primary/30 bg-card p-6 shadow-[0_0_30px_hsl(48_100%_50%_/_0.15)]">
                  <h3 className="text-2xl font-black uppercase text-foreground">
                    Order <span className="text-primary">MMR Boost</span>
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Select the number of games you want boosted
                  </p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="text-sm font-bold uppercase text-foreground">Number of Games</label>
                      <div className="mt-2 flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="h-10 w-10 border-primary/30"
                        >
                          -
                        </Button>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                          className="h-10 w-20 rounded-lg border border-border/50 bg-background text-center text-lg font-bold text-foreground"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(Math.min(50, quantity + 1))}
                          className="h-10 w-10 border-primary/30"
                        >
                          +
                        </Button>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">1-50 games available</p>
                    </div>

                    <div className="rounded-xl border border-border/50 bg-secondary/30 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Price per game:</span>
                        <span className="font-bold text-foreground">${pricePerGame}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between border-t border-border/50 pt-2">
                        <span className="text-lg font-bold uppercase text-foreground">Total:</span>
                        <span className="text-2xl font-black text-primary">${totalPrice}</span>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full gap-2 glow-box font-bold uppercase"
                      onClick={() => {
                        addItem({
                          id: "",
                          game: "Dota 2",
                          gameSlug: "dota-2",
                          service: "MMR Boost",
                          options: { games: quantity },
                          speed: "normal",
                          basePrice: totalPrice,
                          price: totalPrice,
                          estimatedTime: `${quantity * 1}-${quantity * 2} hours`,
                        });
                        toast.success("MMR Boost added to cart!");
                      }}
                    >
                      <ShoppingCart className="h-5 w-5" /> Add to Cart
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

        {/* Pricing Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <div className="rounded-2xl border-2 border-primary/30 bg-secondary/30 p-8 text-center shadow-[0_0_30px_hsl(48_100%_50%_/_0.15)]">
                <Trophy className="mx-auto h-12 w-12 text-primary" />
                <h2 className="mt-4 text-3xl font-black uppercase text-foreground">
                  Ready to Climb?
                </h2>
                <p className="mt-3 text-lg text-muted-foreground">
                  Professional MMR boosting starting from just $3 per game
                </p>
                <div className="mt-6">
                  <Link to="/game/dota-2/mmr-boost">
                    <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                      <Zap className="h-5 w-5" /> Order MMR Boost
                    </Button>
                  </Link>
                </div>
              </div>
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
