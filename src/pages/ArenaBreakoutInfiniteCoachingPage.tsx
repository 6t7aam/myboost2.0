import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import { GraduationCap, CheckCircle, Zap, Shield, Clock, Target } from "lucide-react";
import { CANONICAL_PATHS } from "@/lib/siteConfig";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/lib/structuredData";

const FAQ_ITEMS = [
  {
    q: "What does Arena Breakout coaching focus on?",
    a: "Coaching can focus on map knowledge, rotations, looting efficiency, gunfights, extraction choices, and the overall decision-making that separates stable players from inconsistent ones.",
  },
  {
    q: "Is Arena Breakout coaching only for beginners?",
    a: "No. Beginners use coaching to build fundamentals, while experienced players use it to refine route planning, combat habits, and map-specific decisions.",
  },
  {
    q: "Can I combine coaching with other Arena Breakout services?",
    a: "Yes. Many players pair coaching with Koens farming or raid carries so they improve while also keeping their account progression moving.",
  },
  {
    q: "How are coaching sessions delivered?",
    a: "Sessions are one-on-one and tailored to your goal, with live review, practical feedback, and an emphasis on decisions you can apply immediately.",
  },
  {
    q: "Why buy Arena Breakout coaching instead of just watching guides?",
    a: "Guides are broad. Coaching is specific to your mistakes, your routes, and your current level, which makes improvement much faster.",
  },
];

const faqSchemaItems = FAQ_ITEMS.map((item) => ({
  question: item.q,
  answer: item.a,
}));

const ArenaBreakoutInfiniteCoachingPage = () => {
  return (
    <>
      <SEO
        title="Arena Breakout Coaching - Pro 1-on-1 Help"
        description="Arena Breakout coaching from experienced players covering maps, rotations, PvP, looting, and extraction decisions through tailored one-on-one sessions."
        keywords="arena breakout coaching, abi coaching, arena breakout training, learn arena breakout, abi lessons"
        canonicalUrl={`https://www.myboost.top${CANONICAL_PATHS.arenaBreakoutCoaching}`}
        ogImage="https://www.myboost.top/service-images/arena-breakout/coaching.webp"
      />
      <StructuredData
        data={[
          buildServiceSchema({
            name: "Arena Breakout Coaching",
            description:
              "Arena Breakout coaching sessions focused on map knowledge, combat decisions, route planning, looting efficiency, and extraction consistency.",
            path: CANONICAL_PATHS.arenaBreakoutCoaching,
            image: "/service-images/arena-breakout/coaching.webp",
            price: 4.99,
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Arena Breakout Boosting", path: CANONICAL_PATHS.arenaBreakoutBoosting },
            { name: "Arena Breakout Coaching", path: CANONICAL_PATHS.arenaBreakoutCoaching },
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
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase text-primary">Elite Arena Breakout Training</span>
              </div>
              <div className="mb-4 flex justify-center">
                <PageBreadcrumbs
                  items={[
                    { label: "Home", to: "/" },
                    { label: "Arena Breakout Boosting", to: CANONICAL_PATHS.arenaBreakoutBoosting },
                    { label: "Arena Breakout Coaching" },
                  ]}
                />
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-foreground md:text-6xl">
                Arena Breakout <span className="text-primary glow-text">Coaching</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Arena Breakout coaching for players who want stronger map knowledge, better raid
                decisions, and more consistent extracts through practical one-on-one guidance.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/game/arena-breakout/coaching">
                  <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                    <GraduationCap className="h-5 w-5" /> Book Coaching Now
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
                { icon: Clock, title: "Flexible Sessions", desc: "Book the time you need" },
                { icon: Shield, title: "Practical Guidance", desc: "Focused on real raid decisions" },
                { icon: Target, title: "Map Knowledge", desc: "Rotations, loot, and extracts" },
                { icon: CheckCircle, title: "Combat Review", desc: "Positioning and fights" },
                { icon: GraduationCap, title: "One-on-One Help", desc: "Tailored to your level" },
                { icon: Zap, title: "Fast Improvement", desc: "Specific feedback, not vague tips" },
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
                  Arena Breakout Coaching for Better Routes, Fights, and Extraction Decisions
                </h2>
                <p className="text-muted-foreground">
                  Arena Breakout is the kind of game where small mistakes compound quickly. A bad
                  route loses time, a slow rotation creates an avoidable fight, and one poor
                  extraction decision can erase an otherwise profitable raid. That is why players
                  buy Arena Breakout coaching instead of relying only on broad guides. Coaching
                  turns the feedback into something specific: your map choices, your loot habits,
                  your combat decisions, and the exact moments where a more experienced player would
                  have taken a better line.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  What Arena Breakout Coaching Includes
                </h2>
                <p className="text-muted-foreground">
                  Coaching sessions can focus on fundamentals or refinement depending on your level.
                  Newer players often need help with map familiarity, route planning, inventory
                  pacing, and when to disengage. More experienced players usually care about
                  efficiency: winning more of the right fights, looting with less downtime, and
                  improving extraction consistency on the maps they grind most often. Because the
                  session is one-on-one, the feedback stays relevant to your actual problems.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  Why Coaching Improves Faster Than Random Grinding
                </h2>
                <p className="text-muted-foreground">
                  Random volume is not the same as focused practice. Many Arena Breakout players
                  repeat the same mistakes for weeks because they do not know which decisions are
                  costing them the most value. Coaching shortens that loop. Instead of guessing why
                  a raid failed, you get direct feedback on route choices, timing, risk management,
                  and positioning. That makes Arena Breakout coaching valuable even for players who
                  already have solid mechanics but want cleaner decision-making.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  Pairing Coaching with Other Arena Breakout Services
                </h2>
                <p className="text-muted-foreground">
                  Coaching works especially well when combined with progression support. Some
                  players use{" "}
                  <Link to={CANONICAL_PATHS.arenaBreakoutKoens} className="text-primary hover:underline">
                    Arena Breakout Koens farming
                  </Link>
                  {" "}to keep their loadouts funded while improving. Others use{" "}
                  <Link to={CANONICAL_PATHS.arenaBreakoutRaids} className="text-primary hover:underline">
                    Arena Breakout raid carries
                  </Link>
                  {" "}for difficult content and coaching for the long-term learning side. If you want the
                  full service map, the{" "}
                  <Link to={CANONICAL_PATHS.arenaBreakoutBoosting} className="text-primary hover:underline">
                    Arena Breakout boosting hub
                  </Link>
                  {" "}connects the whole catalog.
                </p>

                <h2 className="mt-8 text-2xl font-black uppercase text-foreground">
                  Arena Breakout Coaching FAQ
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
                <GraduationCap className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 text-2xl font-black uppercase text-foreground">
                  Ready to Improve at Arena Breakout?
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Book Arena Breakout coaching and get practical one-on-one feedback built around
                  your routes, fights, and raid decisions.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link to="/game/arena-breakout/coaching">
                    <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                      <GraduationCap className="h-5 w-5" /> Book Coaching
                    </Button>
                  </Link>
                  <Link to={CANONICAL_PATHS.arenaBreakoutKoens}>
                    <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                      Buy Koens
                    </Button>
                  </Link>
                  <Link to={CANONICAL_PATHS.arenaBreakoutRaids}>
                    <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                      Order Raids
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

export default ArenaBreakoutInfiniteCoachingPage;
