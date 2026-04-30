import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Zap, Shield, Clock, Users } from "lucide-react";

const ArenaBreakoutInfiniteBoostingPage = () => {
  return (
    <>
      <SEO
        title="Arena Breakout: Infinite Boosting - Professional ABI Boost Services"
        description="Professional Arena Breakout: Infinite boosting services. Expert Koens farming, raid carries, coaching, and more. 600+ orders, 4.9★ rating. Safe, fast, affordable ABI boost."
        keywords="arena breakout infinite boosting, abi boosting, arena breakout infinite boost, buy arena breakout infinite boost, professional abi services"
        canonicalUrl="https://www.myboost.top/arena-breakout-infinite-boosting"
      />
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-black uppercase tracking-tight text-foreground md:text-6xl">
                Arena Breakout: Infinite <span className="text-primary glow-text">Boosting</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Professional Arena Breakout: Infinite boosting services by elite players. Whether you need Koens farming, raid carries, or expert coaching, our experienced team delivers fast, safe, and reliable results. Join 600+ satisfied customers who trust MyBoost for their ABI boosting needs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/game/arena-breakout/koens-farming">
                  <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                    <Zap className="h-5 w-5" /> Get Koens Fast
                  </Button>
                </Link>
                <Link to="/game/arena-breakout/raids-boost">
                  <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                    Raid Carries
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Users, value: "600+", label: "Orders Completed" },
                { icon: Star, value: "4.9", label: "Average Rating" },
                { icon: Clock, value: "1-4hrs", label: "Average Delivery" },
                { icon: Shield, value: "100%", label: "Account Safety" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="rounded-xl border border-border/50 bg-card p-6 text-center">
                  <Icon className="mx-auto h-8 w-8 text-primary" />
                  <div className="mt-3 text-3xl font-black text-foreground">{value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{label}</div>
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
                  Why Choose Our Arena Breakout: Infinite Boosting Services?
                </h2>
                <p className="text-muted-foreground">
                  Arena Breakout: Infinite is an intense tactical extraction shooter that demands skill, strategy, and countless hours of grinding. Our professional boosting services eliminate the frustration and time investment, allowing you to enjoy the best parts of the game without the tedious grind. We specialize in <Link to="/buy-arena-breakout-infinite-koens" className="text-primary hover:underline">Koens farming</Link>, <Link to="/arena-breakout-infinite-raids-boost" className="text-primary hover:underline">raid carries</Link>, and <Link to="/arena-breakout-infinite-coaching" className="text-primary hover:underline">personalized coaching</Link> to help you dominate every map.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Fast and Secure Arena Breakout: Infinite Boost
                </h2>
                <p className="text-muted-foreground">
                  Security is our top priority. Every Arena Breakout: Infinite boosting order is handled by verified, experienced players who use VPN protection and match your typical play schedule. We never use prohibited software or cheats—just pure skill and game knowledge. Your account remains completely safe throughout the entire boosting process, backed by our 100% security guarantee.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Professional Koens Farming Services
                </h2>
                <p className="text-muted-foreground">
                  Need Koens to upgrade your gear and unlock premium cases? Our <Link to="/buy-arena-breakout-infinite-koens" className="text-primary hover:underline">Koens farming service</Link> delivers 1M to 500M Koens in record time. Our expert looters know every high-value spawn, optimal route, and safe extraction point on every map. With an average delivery time of just 1-2 hours per million Koens, you'll have the currency you need without spending days grinding.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Expert Raid Carries on All Maps
                </h2>
                <p className="text-muted-foreground">
                  Struggling with high-tier raids? Our <Link to="/arena-breakout-infinite-raids-boost" className="text-primary hover:underline">raid boost service</Link> provides professional carries on TV Station, Armory, Valley, Farm, Airport, and Northridge. We handle both Lockdown and Forbidden modes with guaranteed VIP extraction and maximum loot. Each raid is completed in 30-60 minutes by players who have mastered PvP combat and know exactly how to navigate dangerous zones.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Personalized Coaching from Top Players
                </h2>
                <p className="text-muted-foreground">
                  Want to improve your own skills? Our <Link to="/arena-breakout-infinite-coaching" className="text-primary hover:underline">coaching service</Link> pairs you with elite Arena Breakout: Infinite players who teach you map knowledge, rotation strategies, PvP tactics, and economy management. Learn the secrets that separate casual players from top-tier operators through personalized 1-on-1 sessions tailored to your skill level and goals.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  24/7 Support and Guaranteed Results
                </h2>
                <p className="text-muted-foreground">
                  Our customer support team is available around the clock to answer questions, provide updates, and ensure your complete satisfaction. Every Arena Breakout: Infinite boosting order comes with real-time progress tracking and a satisfaction guarantee. If you're not happy with the results, we'll make it right. Join thousands of satisfied customers who trust MyBoost for their ABI boosting needs.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Common Use Cases for ABI Boosting Services
                </h2>
                <p className="text-muted-foreground">
                  Players choose our Arena Breakout: Infinite boosting for various reasons. Busy professionals use our services to stay competitive without sacrificing work-life balance. New players accelerate their progression to catch up with friends who started earlier. Experienced players farm Koens during work hours to maximize their gaming time. Content creators maintain their accounts while focusing on video production. Competitive players prepare for tournaments by ensuring their accounts have optimal gear and resources. Whatever your situation, our boosting services adapt to your specific needs and schedule.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Key Benefits of Professional ABI Boosting
                </h2>
                <p className="text-muted-foreground">
                  Professional Arena Breakout: Infinite boosting saves you hundreds of hours of grinding while maintaining complete account security. You skip the frustrating early-game progression and jump straight to the content you enjoy. Our services eliminate the risk of losing valuable gear to unlucky deaths or extraction campers. You gain access to high-tier equipment and resources that would take weeks to farm manually. Your account progresses even when you're at work, asleep, or busy with other commitments. Most importantly, you reclaim your gaming time to focus on the exciting aspects of ABI—intense PvP battles, strategic raid planning, and playing with friends—instead of tedious resource grinding.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Is Arena Breakout: Infinite boosting safe?</h3>
                    <p className="text-muted-foreground">
                      Yes, absolutely. We prioritize account security above all else. Every boosting order uses VPN protection matched to your region, and our boosters play during your typical gaming hours to maintain natural account behavior. We never use bots, cheats, macros, or any prohibited software—only skilled human players. With 600+ completed orders and a perfect security record, your account is in safe hands.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">How fast is the delivery?</h3>
                    <p className="text-muted-foreground">
                      Delivery times vary by service. Koens farming delivers 1M Koens in 1-2 hours on average. Raid carries take 30-60 minutes per raid. Coaching sessions are scheduled at your convenience. Most orders begin within minutes of purchase, and we provide real-time progress updates throughout. Express and Super Express options are available for even faster completion.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Is my account safe during boosting?</h3>
                    <p className="text-muted-foreground">
                      Your account security is guaranteed. We use enterprise-grade VPN protection, secure login protocols, and never share your credentials with third parties. Our boosters are thoroughly vetted professionals who follow strict security guidelines. We've maintained a 100% account safety record across all our services. Your account will be returned to you in better condition than we received it.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">What is your refund policy?</h3>
                    <p className="text-muted-foreground">
                      We offer full refunds for orders that haven't started yet. Once boosting begins, we guarantee completion of your order. If you're unsatisfied with the service quality, contact our support team and we'll work to resolve any concerns. Our goal is 100% customer satisfaction, and we stand behind every service we provide.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">How do I get started?</h3>
                    <p className="text-muted-foreground">
                      Getting started is simple. Choose your desired service (Koens farming, raid carries, or coaching), select your options and quantity, add to cart, and complete checkout using cryptocurrency (LTC, SOL, or USDT). Our team will contact you within minutes to coordinate account access or schedule your session. You'll receive real-time updates throughout the entire process.
                    </p>
                  </div>
                </div>
              </article>

              {/* CTA Section */}
              <div className="mt-12 rounded-2xl border-2 border-primary/30 bg-secondary/30 p-8 text-center">
                <h3 className="text-2xl font-black uppercase text-foreground">
                  Ready to Level Up Your Arena Breakout: Infinite Experience?
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Choose your service and get started in minutes. Fast delivery, professional boosters, 100% secure.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link to="/game/arena-breakout/koens-farming">
                    <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                      <Zap className="h-5 w-5" /> Buy Koens Now
                    </Button>
                  </Link>
                  <Link to="/game/arena-breakout/raids-boost">
                    <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                      Get Raid Carry
                    </Button>
                  </Link>
                  <Link to="/game/arena-breakout/coaching">
                    <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                      Book Coaching
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

export default ArenaBreakoutInfiniteBoostingPage;
