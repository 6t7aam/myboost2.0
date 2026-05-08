import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Star, Zap, Clock, Users, Ban, Award, Target, TrendingUp } from "lucide-react";

const Dota2LPRemovalPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Dota 2 Low Priority Removal - Fast LP Queue Exit",
    "description": "Remove Dota 2 Low Priority fast. Our boosters play your LP games professionally. Get out of LP queue in hours, not days. Safe method, no ban risk.",
    "image": "https://www.myboost.top/images/dota2-lp-removal.jpg",
    "brand": {
      "@type": "Brand",
      "name": "MyBoost"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.myboost.top/game/dota-2/lp-removal",
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
        title="Dota 2 Low Priority Removal - Fast LP Queue Exit | MyBoost"
        description="Remove Dota 2 Low Priority fast. Our boosters play your LP games professionally. Get out of LP queue in hours, not days. Safe method, no ban risk."
        keywords="dota 2 lp removal, dota 2 low priority, remove low priority dota 2, lp queue exit, dota 2 lp boost"
        canonicalUrl="https://www.myboost.top/game/dota-2/lp-removal"
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16">
          {/* IMAGE: dota2-lp-removal.jpg - Replace this div with <img> */}
          <div className="service-image-placeholder absolute inset-0" data-image="dota2-lp-removal.jpg">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          </div>
          <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase text-primary">Quick Service</span>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-foreground md:text-6xl">
                LOW PRIORITY <span className="text-primary glow-text">REMOVAL</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Escape the Low Priority queue fast. Professional completion guaranteed. Our experienced LP specialists get you back to ranked matchmaking within 24 hours with ban-safe methods.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/game/dota-2/lp-removal">
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

        {/* Features Grid */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Clock, title: "Fast Completion", desc: "Within 24 hours" },
                { icon: Users, title: "LP Specialists", desc: "Experienced players" },
                { icon: Shield, title: "Coaching Mode", desc: "No account sharing" },
                { icon: Ban, title: "Ban-Safe", desc: "100% secure method" },
                { icon: CheckCircle, title: "Guaranteed", desc: "Complete or refund" },
                { icon: Target, title: "Flat Pricing", desc: "$3 per game" },
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
                <Shield className="mx-auto h-12 w-12 text-primary" />
                <h2 className="mt-4 text-3xl font-black uppercase text-foreground">
                  Escape LP Hell
                </h2>
                <p className="mt-3 text-lg text-muted-foreground">
                  Professional LP removal starting from just $3 per game
                </p>
                <div className="mt-6">
                  <Link to="/game/dota-2/lp-removal">
                    <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                      <Zap className="h-5 w-5" /> Order LP Removal
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
                  <h3 className="mt-4 text-xl font-bold text-foreground">Select Games</h3>
                  <p className="mt-2 text-muted-foreground">
                    Choose how many LP games you need to complete (1-5 games)
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                    <span className="text-2xl font-black text-primary">2</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">We Complete LP</h3>
                  <p className="mt-2 text-muted-foreground">
                    Our specialists complete your LP games within 24 hours
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                    <span className="text-2xl font-black text-primary">3</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">Back to Ranked</h3>
                  <p className="mt-2 text-muted-foreground">
                    Return to normal matchmaking and enjoy Dota 2 again
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
                    <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">
                      MMR Boost
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Climb ranks with Immortal players. Fast, safe boosting from $3 per game.
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

export default Dota2LPRemovalPage;
