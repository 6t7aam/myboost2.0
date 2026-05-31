import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Swords, CheckCircle, Zap, Trophy } from "lucide-react";
import { CANONICAL_PATHS } from "@/lib/siteConfig";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/lib/structuredData";

const FAQ_ITEMS = [
  {
    q: "Do Arena Breakout raid carries cover multiple maps?",
    a: "Yes. The raids service supports major Arena Breakout maps including TV Station, Armory, Valley, Farm, Airport, and Northridge.",
  },
  {
    q: "How fast is a raid carry completed?",
    a: "Most raid carries take around 30 to 60 minutes depending on the map, route complexity, and whether you choose Lockdown or Forbidden mode.",
  },
  {
    q: "Is Arena Breakout raid boosting safe?",
    a: "Yes. Orders are fulfilled manually by verified players using safe account handling and no cheats or automation.",
  },
  {
    q: "What is included in the raid carry service?",
    a: "The service focuses on safe raid completion, route control, PvP handling when needed, and clean extraction with as much value as possible from the run.",
  },
  {
    q: "Can I order multiple raids in one package?",
    a: "Yes. The service supports repeat raid packages, which is useful for quest progress, loot farming, or map-specific goals.",
  },
];

const faqSchemaItems = FAQ_ITEMS.map((item) => ({
  question: item.q,
  answer: item.a,
}));

const ArenaBreakoutInfiniteRaidsBoostPage = () => {
  return (
    <>
      <SEO
        title="Arena Breakout Raids - Fast Carry Service"
        description="Arena Breakout raid carries for Lockdown and Forbidden modes with fast starts, safe manual play, and clean extraction support across major maps."
        keywords="arena breakout raids, arena breakout raid carry, abi raids boost, lockdown raid carry, forbidden raid service"
        canonicalUrl={`https://www.myboost.top${CANONICAL_PATHS.arenaBreakoutRaids}`}
        ogImage="https://www.myboost.top/service-images/arena-breakout/raids-boost.webp"
      />
      <StructuredData
        data={[
          buildServiceSchema({
            name: "Arena Breakout Raids Carry Service",
            description:
              "Arena Breakout raid carry service for Lockdown and Forbidden modes with clean extraction support, map knowledge, and manual delivery.",
            path: CANONICAL_PATHS.arenaBreakoutRaids,
            image: "/service-images/arena-breakout/raids-boost.webp",
            price: 2.5,
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Arena Breakout Boosting", path: CANONICAL_PATHS.arenaBreakoutBoosting },
            { name: "Arena Breakout Raids", path: CANONICAL_PATHS.arenaBreakoutRaids },
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
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase text-primary">Expert Raid Carries</span>
              </div>
              <div className="mb-4 flex justify-center">
                <PageBreadcrumbs
                  items={[
                    { label: "Home", to: "/" },
                    { label: "Arena Breakout Boosting", to: CANONICAL_PATHS.arenaBreakoutBoosting },
                    { label: "Arena Breakout Raids" },
                  ]}
                />
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-foreground md:text-6xl">
                Arena Breakout <span className="text-primary glow-text">Raids</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Arena Breakout raid carries for players who want safer clears, better route control,
                and strong extraction support on the game's highest-value maps.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/game/arena-breakout/raids-boost">
                  <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                    <Swords className="h-5 w-5" /> Order Raids
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
            <h2 className="mb-8 text-center text-2xl font-black uppercase text-foreground">
              All Maps <span className="text-primary">Covered</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {["TV Station", "Armory", "Valley", "Farm", "Airport", "Northridge"].map((map) => (
                <div key={map} className="rounded-xl border border-border/50 bg-card p-4 text-center">
                  <CheckCircle className="mx-auto h-6 w-6 text-primary" />
                  <div className="mt-2 font-bold text-foreground">{map}</div>
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
                  Arena Breakout Raid Carries for Lockdown, Forbidden, and Loot-Focused Progress
                </h2>
                <p className="text-muted-foreground">
                  Arena Breakout raids are where the game feels best and punishes mistakes the most.
                  High-value runs combine aggressive AI, dangerous player angles, map-specific
                  extraction pressure, and the constant risk of losing everything in the final
                  minute. Our Arena Breakout raids service exists for players who want the value of
                  those runs without relying on random teammates or spending hours recovering from a
                  bad attempt.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  What the Raid Carry Service Includes
                </h2>
                <p className="text-muted-foreground">
                  The service is built around clean raid completion, route efficiency, and safer
                  extraction. Some players use it for difficult quests, others for farming specific
                  maps or simply reducing the frustration of repeated failed runs. Lockdown mode is
                  great for consistent progress and predictable value, while Forbidden mode is the
                  better fit when your goal is premium loot and higher-risk content.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  How Arena Breakout Raid Carries Work
                </h2>
                <p className="text-muted-foreground">
                  After you choose the map count and mode, verified players handle the raids
                  manually. That includes route decisions, pressure management, and extraction
                  planning. The focus is not just getting into a raid; it is getting out with the
                  right value and avoiding the wasted time that comes from sloppy pacing or bad
                  decisions under pressure. Most carries finish in roughly 30 to 60 minutes per
                  raid, depending on the target map and the complexity of the run.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  Why Players Buy Arena Breakout Raids
                </h2>
                <p className="text-muted-foreground">
                  Players order raid carries for several reasons. Some are progression-focused and
                  need clean quest completion on hard maps. Others want better loot consistency or
                  faster access to gear that would take too long to farm alone. Groups that are one
                  reliable player short often use raid carries to stabilize sessions and stop losing
                  time to failed pushes. The service works best when you know the content you want
                  to run but do not want the outcome resting on random lobbies or repeated
                  unsuccessful attempts.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  Related Arena Breakout Services
                </h2>
                <p className="text-muted-foreground">
                  If your main problem is economy, pair raids with{" "}
                  <Link to={CANONICAL_PATHS.arenaBreakoutKoens} className="text-primary hover:underline">
                    Arena Breakout Koens farming
                  </Link>
                  . If your goal is long-term improvement, the{" "}
                  <Link to={CANONICAL_PATHS.arenaBreakoutCoaching} className="text-primary hover:underline">
                    Arena Breakout coaching page
                  </Link>
                  {" "}is a better fit. For the full catalog, the{" "}
                  <Link to={CANONICAL_PATHS.arenaBreakoutBoosting} className="text-primary hover:underline">
                    Arena Breakout boosting hub
                  </Link>
                  {" "}connects every service in one place.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  Arena Breakout Raids FAQ
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
                <Swords className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 text-2xl font-black uppercase text-foreground">
                  Ready for Arena Breakout Raid Carries?
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Order Lockdown or Forbidden raids with faster starts, clean map execution, and
                  support that stays available throughout the session.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link to="/game/arena-breakout/raids-boost">
                    <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                      <Zap className="h-5 w-5" /> Order Raids
                    </Button>
                  </Link>
                  <Link to={CANONICAL_PATHS.arenaBreakoutKoens}>
                    <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                      Buy Koens
                    </Button>
                  </Link>
                  <Link to={CANONICAL_PATHS.arenaBreakoutCoaching}>
                    <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                      Get Coaching
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

export default ArenaBreakoutInfiniteRaidsBoostPage;
