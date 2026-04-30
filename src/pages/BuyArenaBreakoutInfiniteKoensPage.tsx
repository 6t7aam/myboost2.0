import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Coins, CheckCircle, Star, Zap, Shield, Clock, TrendingUp } from "lucide-react";

const BuyArenaBreakoutInfiniteKoensPage = () => {
  return (
    <>
      <SEO
        title="Buy Arena Breakout: Infinite Koens - Fast & Safe Koens Farming Service"
        description="Buy Arena Breakout: Infinite Koens from professional farmers. 1M-500M Koens delivered in 1-2 hours. Secure, affordable, VPN protected. 600+ orders, 4.9★ rating. Get Koens now!"
        keywords="buy arena breakout infinite koens, arena breakout infinite koens farming, abi koens, buy koens abi, arena breakout infinite currency"
        canonicalUrl="https://www.myboost.top/buy-arena-breakout-infinite-koens"
      />
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                <Coins className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase text-primary">Most Popular Service</span>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-foreground md:text-6xl">
                Buy Arena Breakout: Infinite <span className="text-primary glow-text">Koens</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Get Arena Breakout: Infinite Koens fast with our professional farming service. Our expert looters deliver 1M to 500M Koens in just 1-2 hours per million, using optimal routes and safe extraction strategies. No bots, no cheats—just skilled players who know every high-value spawn location across all maps.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/game/arena-breakout/koens-farming">
                  <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                    <Zap className="h-5 w-5" /> Order Koens Now
                  </Button>
                </Link>
                <Link to="/arena-breakout-infinite-boosting">
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
                { icon: Clock, title: "1-2 Hours Delivery", desc: "Per 1M Koens" },
                { icon: Shield, title: "100% Safe", desc: "VPN Protected" },
                { icon: Star, title: "4.9★ Rating", desc: "600+ Orders" },
                { icon: TrendingUp, title: "1M-500M Koens", desc: "Scalable Service" },
                { icon: CheckCircle, title: "No Cheats", desc: "Pure Skill" },
                { icon: Coins, title: "$1.50 per 1M", desc: "Affordable Pricing" },
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

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <article className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-black uppercase text-foreground">
                  Why Buy Arena Breakout: Infinite Koens from MyBoost?
                </h2>
                <p className="text-muted-foreground">
                  Koens are the lifeblood of Arena Breakout: Infinite—you need them for gear upgrades, premium cases, weapon modifications, and medical supplies. Farming Koens manually takes countless hours of risky raids, and one bad extraction can wipe out hours of progress. Our professional Koens farming service eliminates the grind, delivering the currency you need quickly and safely so you can focus on the exciting parts of the game.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Fast Koens Delivery - 1M in Just 1-2 Hours
                </h2>
                <p className="text-muted-foreground">
                  Time is money, and we respect both. When you buy Arena Breakout: Infinite Koens from us, our expert farmers get to work immediately. We deliver 1 million Koens in an average of 1-2 hours, with larger orders scaled proportionally. Need 10M Koens? We'll have it done in under a day. Our farmers know every high-value loot location on TV Station, Armory, Valley, Farm, Airport, and Northridge, ensuring maximum efficiency on every raid.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  100% Safe and Secure Koens Farming
                </h2>
                <p className="text-muted-foreground">
                  Account security is our top priority. Every Koens farming order uses VPN protection matched to your region, and our farmers play during your typical hours to avoid detection. We never use bots, macros, or any prohibited software—just skilled players with thousands of hours of experience. Your account remains completely safe, and we've maintained a perfect security record across 600+ completed orders. When you buy Koens from MyBoost, you're getting peace of mind along with premium service.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Expert Looters Who Know Every Map
                </h2>
                <p className="text-muted-foreground">
                  Our Arena Breakout: Infinite Koens farmers aren't just good players—they're specialists who have mastered the art of efficient looting. They know which rooms contain the highest-value items, which routes minimize PvP encounters, and which extraction points offer the safest exits. This expertise translates directly into faster delivery times and better value for your money. Whether it's hitting the high-tier loot spawns in Armory or navigating the dangerous corridors of TV Station, our farmers execute flawlessly.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Affordable Pricing - From $1.50 per Million
                </h2>
                <p className="text-muted-foreground">
                  We believe premium service shouldn't come with premium prices. Our Koens farming starts at just $1.50 per million, making it one of the most affordable options on the market. Whether you need a quick 1M boost to buy that weapon you've been eyeing, or a massive 500M order to fully stock your stash, we offer competitive pricing with no hidden fees. Check out our <Link to="/game/arena-breakout/koens-farming" className="text-primary hover:underline">Koens farming calculator</Link> to see exactly what you'll pay.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  How Our Koens Farming Service Works
                </h2>
                <p className="text-muted-foreground">
                  Buying Arena Breakout: Infinite Koens is simple. First, visit our <Link to="/game/arena-breakout/koens-farming" className="text-primary hover:underline">Koens farming page</Link> and select the amount you need—anywhere from 1M to 500M. Complete your order through our secure checkout, and our team will contact you within minutes to coordinate account access. Our farmer will then begin working on your order immediately, and you can track progress in real-time through our dashboard. Once complete, you'll have the Koens in your account, ready to spend on gear, cases, and upgrades.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  More Than Just Koens - Complete ABI Services
                </h2>
                <p className="text-muted-foreground">
                  While Koens farming is our most popular service, we offer a complete suite of <Link to="/arena-breakout-infinite-boosting" className="text-primary hover:underline">Arena Breakout: Infinite boosting</Link> options. Need help with difficult raids? Check out our <Link to="/arena-breakout-infinite-raids-boost" className="text-primary hover:underline">raid carry service</Link>. Want to improve your own skills? Our <Link to="/arena-breakout-infinite-coaching" className="text-primary hover:underline">coaching service</Link> pairs you with elite players who teach you everything from map knowledge to advanced PvP tactics. Whatever your ABI needs, MyBoost has you covered.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  24/7 Customer Support and Satisfaction Guarantee
                </h2>
                <p className="text-muted-foreground">
                  Questions about your order? Our support team is available 24/7 via live chat to assist you. Every Koens farming order comes with real-time progress updates and a satisfaction guarantee. If you're not completely happy with the service, we'll make it right. Join hundreds of satisfied customers who trust MyBoost for their Arena Breakout: Infinite Koens needs.
                </p>
              </article>

              {/* CTA Section */}
              <div className="mt-12 rounded-2xl border-2 border-primary/30 bg-secondary/30 p-8 text-center">
                <Coins className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 text-2xl font-black uppercase text-foreground">
                  Ready to Buy Arena Breakout: Infinite Koens?
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Get 1M-500M Koens delivered in 1-2 hours. Safe, fast, and affordable.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link to="/game/arena-breakout/koens-farming">
                    <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                      <Zap className="h-5 w-5" /> Order Koens Now
                    </Button>
                  </Link>
                  <Link to="/arena-breakout-infinite-boosting">
                    <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                      View All Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BuyArenaBreakoutInfiniteKoensPage;
