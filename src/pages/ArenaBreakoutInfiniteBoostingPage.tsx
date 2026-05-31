import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Zap, Shield, Clock, Users } from "lucide-react";
import { CANONICAL_PATHS } from "@/lib/siteConfig";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/lib/structuredData";

const FAQ_ITEMS = [
  {
    q: "Which Arena Breakout services are included on this page?",
    a: "The landing page covers Koens farming, raid carries, and coaching, with direct links into the specific service pages and order calculators.",
  },
  {
    q: "Is Arena Breakout boosting safe?",
    a: "Yes. Services are fulfilled manually by verified players without bots, macros, or cheats, and account safety remains a priority throughout the order.",
  },
  {
    q: "How quickly do Arena Breakout orders start?",
    a: "Most Arena Breakout orders start within minutes after confirmation, and the exact delivery window depends on the service and size of the order.",
  },
  {
    q: "Can I use Arena Breakout coaching instead of a fully piloted service?",
    a: "Yes. Coaching is available if you want to improve your own decisions, map understanding, and raid consistency instead of only outsourcing the result.",
  },
  {
    q: "Do I need a huge budget to use Arena Breakout boosting?",
    a: "No. The catalog includes both small entry-point offers and larger progression services, so you can solve one bottleneck without committing to a massive package.",
  },
];

const faqSchemaItems = FAQ_ITEMS.map((item) => ({
  question: item.q,
  answer: item.a,
}));

const ArenaBreakoutInfiniteBoostingPage = () => {
  return (
    <>
      <SEO
        title="Arena Breakout Boosting - Koens & Raids"
        description="Arena Breakout boosting for Koens farming, raid carries, and coaching with manual delivery, fast starts, and service pages built around real progression goals."
        keywords="arena breakout boosting, abi boosting, arena breakout koens, arena breakout raids, arena breakout coaching"
        canonicalUrl={`https://www.myboost.top${CANONICAL_PATHS.arenaBreakoutBoosting}`}
        ogImage="https://www.myboost.top/service-images/arena-breakout/raids-boost.webp"
      />
      <StructuredData
        data={[
          buildServiceSchema({
            name: "Arena Breakout Boosting Services",
            description:
              "Arena Breakout boosting services for Koens farming, raid carries, coaching, and progression support from verified players.",
            path: CANONICAL_PATHS.arenaBreakoutBoosting,
            image: "/service-images/arena-breakout/raids-boost.webp",
            price: 0.99,
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Arena Breakout Boosting", path: CANONICAL_PATHS.arenaBreakoutBoosting },
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
              <div className="mb-4 flex justify-center">
                <PageBreadcrumbs items={[{ label: "Home", to: "/" }, { label: "Arena Breakout Boosting" }]} />
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-foreground md:text-6xl">
                Arena Breakout <span className="text-primary glow-text">Boosting Services</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Arena Breakout boosting for Koens farming, raid carries, and coaching from verified
                players. Choose the exact service that matches your bottleneck instead of gambling
                your time on generic progression packs.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to={CANONICAL_PATHS.arenaBreakoutKoens}>
                  <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                    <Zap className="h-5 w-5" /> Get Koens Fast
                  </Button>
                </Link>
                <Link to={CANONICAL_PATHS.arenaBreakoutRaids}>
                  <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                    Raid Carries
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-secondary/30 py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Users, value: "600+", label: "Orders Completed" },
                { icon: Star, value: "4.9", label: "Average Rating" },
                { icon: Clock, value: "1-4hrs", label: "Average Delivery" },
                { icon: Shield, value: "Manual", label: "Safe Service" },
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

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <article className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-black uppercase text-foreground">
                  Arena Breakout Boosting for Economy, Raids, and Learning
                </h2>
                <p className="text-muted-foreground">
                  Arena Breakout rewards smart decisions, but it also punishes slow progression.
                  Players lose hours farming currency, fail high-value raids because a squad is not
                  reliable enough, or stay stuck repeating the same mistakes because they do not
                  know which parts of their raid flow are really holding them back. The goal of our
                  Arena Breakout boosting page is to separate those problems clearly so you can buy
                  the exact service that solves your current obstacle.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  What Arena Breakout Boosting Includes
                </h2>
                <p className="text-muted-foreground">
                  The catalog centers on three high-value services.{" "}
                  <Link to={CANONICAL_PATHS.arenaBreakoutKoens} className="text-primary hover:underline">
                    Arena Breakout Koens farming
                  </Link>
                  {" "}helps players fix the economy problem fast so they can run better gear and stop
                  playing scared.{" "}
                  <Link to={CANONICAL_PATHS.arenaBreakoutRaids} className="text-primary hover:underline">
                    Arena Breakout raid carries
                  </Link>
                  {" "}focus on successful clears, route control, and cleaner extractions on valuable maps.
                  And{" "}
                  <Link to={CANONICAL_PATHS.arenaBreakoutCoaching} className="text-primary hover:underline">
                    Arena Breakout coaching
                  </Link>
                  {" "}is for players who want to improve their own raid quality instead of only
                  outsourcing the result.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  How the Service Works
                </h2>
                <p className="text-muted-foreground">
                  Each service page goes deeper into its own calculator, but the main flow is
                  simple. You choose the problem you want solved, place the order, and a verified
                  player begins the work manually. That manual approach matters because it keeps the
                  service grounded in real Arena Breakout gameplay rather than risky shortcuts. It
                  also means you can choose between outcome-focused help like Koens or raids and
                  improvement-focused help like coaching depending on how involved you want to stay.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  Why Players Buy Arena Breakout Boosting
                </h2>
                <p className="text-muted-foreground">
                  Some users simply do not have the time to rebuild currency after a few bad runs.
                  Others want smoother progress on difficult maps, better loot consistency, or a
                  way to learn without relying on random teammates and generic YouTube advice. Arena
                  Breakout boosting works best when it removes that exact friction point. Instead of
                  trying to solve everything at once, you can buy the one service that moves your
                  account forward right now.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  Arena Breakout Boosting FAQ
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
                <h3 className="text-2xl font-black uppercase text-foreground">
                  Choose the Arena Breakout Service That Fits Your Goal
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Start with Koens, raids, or coaching and build progress around the part of Arena
                  Breakout that is slowing you down the most.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link to={CANONICAL_PATHS.arenaBreakoutKoens}>
                    <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                      <Zap className="h-5 w-5" /> Arena Breakout Koens
                    </Button>
                  </Link>
                  <Link to={CANONICAL_PATHS.arenaBreakoutRaids}>
                    <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                      Arena Breakout Raids
                    </Button>
                  </Link>
                  <Link to={CANONICAL_PATHS.arenaBreakoutCoaching}>
                    <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                      Arena Breakout Coaching
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
