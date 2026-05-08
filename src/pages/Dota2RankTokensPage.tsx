import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Award, CheckCircle, Star, Zap, Shield, Clock, TrendingUp, Users, Target, Trophy, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Dota2RankTokensPage = () => {
  const [quantity, setQuantity] = useState(10);
  const { addItem } = useCart();
  const pricePerToken = 5;
  const totalPrice = quantity * pricePerToken;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Dota 2 Rank Tokens Farming - Fast Token Collection",
    "description": "Buy Dota 2 rank tokens farming service. Collect tokens fast with our Immortal players. Safe account handling, fast delivery, competitive prices. Start today.",
    "image": "https://www.myboost.top/images/dota2-rank-tokens.jpg",
    "brand": {
      "@type": "Brand",
      "name": "MyBoost"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.myboost.top/game/dota-2/rank-tokens",
      "priceCurrency": "USD",
      "price": "5",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "minPrice": "5",
        "priceCurrency": "USD"
      },
      "availability": "https://schema.org/InStock",
      "areaServed": "Worldwide"
    }
  };

  return (
    <>
      <SEO
        title="Dota 2 Rank Tokens Farming - Fast Token Collection | MyBoost"
        description="Buy Dota 2 rank tokens farming service. Collect tokens fast with our Immortal players. Safe account handling, fast delivery, competitive prices. Start today."
        keywords="dota 2 rank tokens, dota 2 tokens farming, buy dota 2 tokens, rank tokens boost, dota 2 token service"
        canonicalUrl="https://www.myboost.top/game/dota-2/rank-tokens"
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16">
          {/* IMAGE: dota2-rank-tokens.jpg - Replace this div with <img> */}
          <div className="service-image-placeholder absolute inset-0" data-image="dota2-rank-tokens.jpg">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          </div>
          <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase text-primary">Premium Service</span>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-foreground md:text-6xl">
                RANK TOKENS <span className="text-primary glow-text">FARMING</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Collect Dota 2 rank tokens fast with our professional farming service. Our Immortal players deliver guaranteed token collection with safe methods, progress updates, and custom amounts.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/game/dota-2/rank-tokens">
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
              <div className="grid gap-8 lg:grid-cols-[40%_1fr]">
                {/* IMAGE: dota2-rank-tokens.jpg - Replace this div with <img> */}
                <div className="service-image-placeholder rounded-2xl border border-border/50 bg-secondary/30 overflow-hidden" data-image="dota2-rank-tokens.jpg">
                  <div className="aspect-[4/3] w-full bg-gradient-to-br from-primary/10 to-secondary/50 flex items-center justify-center">
                    <Award className="h-32 w-32 text-primary/30" />
                  </div>
                </div>

                {/* Calculator */}
                <div className="rounded-2xl border-2 border-primary/30 bg-card p-8 shadow-[0_0_30px_hsl(48_100%_50%_/_0.15)]">
                  <h3 className="text-2xl font-black uppercase text-foreground">
                    Order <span className="text-primary">Rank Tokens</span>
                  </h3>

                  <div className="mt-6 space-y-6">
                    <div>
                      <label className="text-sm font-bold uppercase text-foreground">How many tokens?</label>
                      <div className="mt-3 flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="h-12 w-12 border-primary/30 text-lg"
                        >
                          −
                        </Button>
                        <div className="flex-1 text-center">
                          <input
                            type="number"
                            min="1"
                            max="100"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                            className="w-full rounded-lg border border-border/50 bg-background px-4 py-3 text-center text-xl font-bold text-foreground"
                          />
                          <p className="mt-1 text-xs text-muted-foreground">{quantity} {quantity === 1 ? 'token' : 'tokens'}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(Math.min(100, quantity + 1))}
                          className="h-12 w-12 border-primary/30 text-lg"
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-xl border-2 border-primary/30 bg-secondary/30 p-6">
                      <div className="text-center">
                        <div className="text-sm uppercase tracking-wide text-muted-foreground">Your Price</div>
                        <div className="mt-2 text-4xl font-black text-primary">${totalPrice.toFixed(2)}</div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {quantity} {quantity === 1 ? 'token' : 'tokens'} × ${pricePerToken.toFixed(2)}
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
                          service: "Rank Tokens Farming",
                          options: { tokens: quantity },
                          speed: "normal",
                          basePrice: totalPrice,
                          price: totalPrice,
                          estimatedTime: `${quantity * 2}-${quantity * 4} hours`,
                        });
                        toast.success("Rank Tokens added to cart!");
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
                { icon: Clock, title: "Fast Collection", desc: "24-48 hour delivery" },
                { icon: Users, title: "Immortal Players", desc: "Top-tier farmers" },
                { icon: Shield, title: "Safe Methods", desc: "VPN protected" },
                { icon: Target, title: "Custom Amount", desc: "1-100 tokens" },
                { icon: TrendingUp, title: "Progress Updates", desc: "Real-time tracking" },
                { icon: CheckCircle, title: "Guaranteed", desc: "Delivery promise" },
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
                <Award className="mx-auto h-12 w-12 text-primary" />
                <h2 className="mt-4 text-3xl font-black uppercase text-foreground">
                  Unlock Your Rank
                </h2>
                <p className="mt-3 text-lg text-muted-foreground">
                  Professional token farming starting from just $5 per token
                </p>
                <div className="mt-6">
                  <Link to="/game/dota-2/rank-tokens">
                    <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                      <Zap className="h-5 w-5" /> Order Token Farming
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
                  <h3 className="mt-4 text-xl font-bold text-foreground">Select Tokens</h3>
                  <p className="mt-2 text-muted-foreground">
                    Choose how many rank tokens you need (1-100 tokens)
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                    <span className="text-2xl font-black text-primary">2</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">We Farm Tokens</h3>
                  <p className="mt-2 text-muted-foreground">
                    Immortal players farm your tokens with live progress updates
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                    <span className="text-2xl font-black text-primary">3</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">Unlock Your Rank</h3>
                  <p className="mt-2 text-muted-foreground">
                    Receive all tokens and unlock your desired rank
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
                    <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">
                      MMR Boost
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Climb ranks with Immortal players. Fast, safe boosting from $3 per game.
                    </p>
                  </div>
                </Link>
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
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Dota2RankTokensPage;
