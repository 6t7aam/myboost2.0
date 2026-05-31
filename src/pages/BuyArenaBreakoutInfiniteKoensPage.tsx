import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Coins,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Clock,
  TrendingUp,
} from "lucide-react";
import { CANONICAL_PATHS } from "@/lib/siteConfig";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/lib/structuredData";

const FAQ_ITEMS = [
  {
    q: "Is Arena Breakout Koens farming safe for my account?",
    a: "Yes. Orders are handled manually by verified players using safe account practices and no bots, cheats, or macros.",
  },
  {
    q: "How fast is Arena Breakout Koens delivery?",
    a: "Most orders begin within minutes, and 1 million Koens is usually delivered in around 1 to 2 hours depending on queue and raid conditions.",
  },
  {
    q: "How much Koens can I order at once?",
    a: "The service supports orders from 1 million to 500 million Koens, so both small top-ups and full stash bankrolls are available.",
  },
  {
    q: "Do you only offer Koens or other Arena Breakout services too?",
    a: "MyBoost also offers raid carries, coaching, and broader Arena Breakout boosting services alongside Koens farming.",
  },
  {
    q: "What if I need updates during the order?",
    a: "Support stays available during the full order window and can help with timing, coordination, and delivery questions.",
  },
];

const faqSchemaItems = FAQ_ITEMS.map((item) => ({
  question: item.q,
  answer: item.a,
}));

const BuyArenaBreakoutInfiniteKoensPage = () => {
  return (
    <>
      <SEO
        title="Arena Breakout Koens - Fast & Safe Farming"
        description="Arena Breakout Koens farming with 1M to 500M delivery, safe account handling, and fast starts from verified players. Order Koens without the grind."
        keywords="arena breakout koens farming, buy arena breakout koens, abi koens, arena breakout currency farming, fast koens delivery"
        canonicalUrl={`https://www.myboost.top${CANONICAL_PATHS.arenaBreakoutKoens}`}
        ogImage="https://www.myboost.top/service-images/arena-breakout/koens-farming.webp"
      />
      <StructuredData
        data={[
          buildServiceSchema({
            name: "Arena Breakout Koens Farming",
            description:
              "Arena Breakout Koens farming service with fast delivery, safe account handling, and orders from 1 million to 500 million Koens.",
            path: CANONICAL_PATHS.arenaBreakoutKoens,
            image: "/service-images/arena-breakout/koens-farming.webp",
            price: 0.99,
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Arena Breakout Boosting", path: CANONICAL_PATHS.arenaBreakoutBoosting },
            { name: "Arena Breakout Koens", path: CANONICAL_PATHS.arenaBreakoutKoens },
          ]),
          buildFaqSchema(faqSchemaItems),
        ]}
      />

      <div className="min-h-screen bg-background">
        <Navbar />

        <section className="relative overflow-hidden pt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                <Coins className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase text-primary">Most Popular Arena Breakout Service</span>
              </div>
              <div className="mb-4 flex justify-center">
                <PageBreadcrumbs
                  items={[
                    { label: "Home", to: "/" },
                    { label: "Arena Breakout Boosting", to: CANONICAL_PATHS.arenaBreakoutBoosting },
                    { label: "Arena Breakout Koens" },
                  ]}
                />
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-foreground md:text-6xl">
                Arena Breakout <span className="text-primary glow-text">Koens Farming</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Get Arena Breakout Koens fast with verified players who know the best loot routes,
                safest extracts, and highest-value maps. Orders run from 1M to 500M Koens with
                safe manual delivery and fast starts.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/game/arena-breakout/koens-farming">
                  <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                    <Zap className="h-5 w-5" /> Order Koens Now
                  </Button>
                </Link>
                <Link to={CANONICAL_PATHS.arenaBreakoutBoosting}>
                  <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                    View All Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Clock, title: "1-2 Hours Delivery", desc: "Per 1M Koens" },
                { icon: Shield, title: "Manual & Safe", desc: "No bots or cheats" },
                { icon: Star, title: "Trusted Service", desc: "Fast starts and support" },
                { icon: TrendingUp, title: "1M-500M Koens", desc: "Scalable orders" },
                { icon: CheckCircle, title: "High-Value Routes", desc: "Experienced looters" },
                { icon: Coins, title: "$0.99 per 1M", desc: "Affordable pricing" },
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

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <article className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-black uppercase text-foreground">
                  Why Arena Breakout Koens Farming Is the Fastest Way to Stay Equipped
                </h2>
                <p className="text-muted-foreground">
                  Koens drive everything in Arena Breakout. You need them for weapon builds, armor,
                  meds, cases, and the freedom to play aggressive loadouts without constantly
                  worrying about going broke. Manual farming can work if you have endless time, but
                  it also means exposing hours of progress to one bad raid, one failed extract, or
                  one unlucky PvP encounter. That is why players buy Arena Breakout Koens farming:
                  it removes the repetitive part of the economy grind and lets you spend your
                  limited gaming time on the raids you actually enjoy.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  What Is Included in the Koens Service
                </h2>
                <p className="text-muted-foreground">
                  The Koens farming page supports deliveries from 1 million to 500 million Koens,
                  which makes it useful for both quick top-ups and full account bankrolls. Some
                  players only need enough currency to stabilize a few loadouts after a rough
                  losing streak. Others want a large reserve so they can open cases, test weapon
                  builds, and run higher-value raids without constantly retreating to budget gear.
                  The important part is flexibility: you buy the amount that matches your actual
                  progression goal instead of being forced into a fixed package.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  How Arena Breakout Koens Farming Works
                </h2>
                <p className="text-muted-foreground">
                  Once you place the order, verified players start farming through efficient loot
                  routes and safe extraction planning. The service is manual, not automated, which
                  matters for both account safety and delivery quality. Good Koens farming is not
                  just about grabbing random loot. It is about knowing which maps and areas create
                  the best value per minute, how to reduce unnecessary PvP risk, and when to exit
                  instead of overextending a profitable run. That discipline is what turns Koens
                  farming from a time sink into a reliable delivery service.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  Pricing, Turnaround, and Safety
                </h2>
                <p className="text-muted-foreground">
                  Koens farming starts at competitive per-million pricing and scales up cleanly for
                  larger orders. Delivery pace depends on the amount, but 1 million Koens is often
                  completed in around 1 to 2 hours, which makes it much faster than trying to
                  rebuild a stash manually after losses. More importantly, the service stays focused
                  on safe account handling. There are no bots, no cheats, and no fake shortcuts
                  attached to the process, only verified players doing the work directly.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  Related Arena Breakout Services
                </h2>
                <p className="text-muted-foreground">
                  Koens farming solves the economy problem, but some players also need combat or
                  learning support. If you want direct success in difficult content, check the{" "}
                  <Link to={CANONICAL_PATHS.arenaBreakoutRaids} className="text-primary hover:underline">
                    Arena Breakout raids page
                  </Link>
                  . If your goal is long-term improvement, the{" "}
                  <Link to={CANONICAL_PATHS.arenaBreakoutCoaching} className="text-primary hover:underline">
                    Arena Breakout coaching page
                  </Link>
                  {" "}is the better fit. And if you want the full service overview, the{" "}
                  <Link to={CANONICAL_PATHS.arenaBreakoutBoosting} className="text-primary hover:underline">
                    Arena Breakout boosting hub
                  </Link>
                  {" "}connects all of the available offers in one place.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  Arena Breakout Koens FAQ
                </h2>
                <div className="mt-6 space-y-6">
                  {FAQ_ITEMS.map((item) => (
                    <div key={item.q}>
                      <h3 className="mb-2 text-lg font-bold text-foreground">{item.q}</h3>
                      <p className="text-muted-foreground">{item.a}</p>
                    </div>
                  ))}
                </div>
              </article>

              <div className="mt-12 rounded-2xl border-2 border-primary/30 bg-secondary/30 p-8 text-center">
                <Coins className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 text-2xl font-black uppercase text-foreground">
                  Ready to Order Arena Breakout Koens?
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Get 1M to 500M Koens delivered with fast starts, manual play, and support that
                  stays available throughout the order.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link to="/game/arena-breakout/koens-farming">
                    <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                      <Zap className="h-5 w-5" /> Order Koens Now
                    </Button>
                  </Link>
                  <Link to={CANONICAL_PATHS.arenaBreakoutBoosting}>
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
