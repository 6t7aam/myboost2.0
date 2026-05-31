import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeft, ArrowRight, CheckCircle, Check, Shield, Star, Sword, Zap } from "lucide-react";
import { GameConfig } from "@/data/gameConfigs";
import { useCountUp } from "@/hooks/useCountUp";
import { CANONICAL_PATHS } from "@/lib/siteConfig";
import { getDota2ServicePath } from "@/lib/serviceRoutes";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/lib/structuredData";

interface Dota2ServiceGridProps {
  config: GameConfig;
}

interface StatBadgeProps {
  Icon: typeof CheckCircle;
  value: string;
  label: string;
  fill?: boolean;
}

const FAQ_ITEMS = [
  {
    q: "Is Dota 2 boosting safe for ranked accounts?",
    a: "Yes. Orders are completed manually by verified players using account-safe routines, region-matched VPN protection when needed, and no bots or scripts.",
  },
  {
    q: "Which Dota 2 services are available on this page?",
    a: "You can order MMR boost, calibration matches, Low Priority removal, behavior score recovery, win rate boosting, Battle Cup help, rank tokens, and coaching.",
  },
  {
    q: "How fast does Dota 2 boosting start?",
    a: "Most Dota 2 boosting orders begin within 15 minutes after confirmation, and the calculator on each service page shows the expected completion window.",
  },
  {
    q: "Can I choose duo or coaching-style options instead of piloted boosting?",
    a: "Yes. Several services support self-play, duo, or coaching-focused delivery so you can climb while still being involved in the process.",
  },
  {
    q: "Do you support low behavior score or difficult brackets?",
    a: "Yes. MyBoost handles lower behavior score accounts, difficult MMR brackets, and specialized services like LP removal and behavior score recovery.",
  },
  {
    q: "What makes your Dota 2 boosting different from generic marketplaces?",
    a: "The service catalog is focused on specific Dota 2 pain points, so you can order exactly what you need instead of buying a vague rank-up package with hidden tradeoffs.",
  },
];

const StatBadge = ({ Icon, value, label, fill }: StatBadgeProps) => {
  const animated = useCountUp(value, 1500);
  return (
    <div className="stat-badge flex items-center gap-2 rounded-lg border border-border/50 bg-card/50 px-3 py-1.5 text-sm backdrop-blur-sm">
      <Icon className={`h-4 w-4 text-primary ${fill ? "fill-primary" : ""}`} />
      <span className="font-semibold text-foreground tabular-nums">{animated}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
};

const faqSchemaItems = FAQ_ITEMS.map((item) => ({
  question: item.q,
  answer: item.a,
}));

const Dota2ServiceGrid = ({ config }: Dota2ServiceGridProps) => {
  return (
    <>
      <SEO
        title="Dota 2 Boosting Services - Safe Rank Climbing"
        description="Dota 2 boosting services for MMR, calibration, LP removal, behavior score, rank tokens, and coaching. Fast manual delivery from verified players."
        keywords="dota 2 boosting, dota 2 mmr boost, lp removal, behavior score boost, rank tokens, dota 2 coaching"
        canonicalUrl={`https://www.myboost.top${CANONICAL_PATHS.dota2Boosting}`}
        ogImage="https://www.myboost.top/images/dota2/dota2-mmr-boost.webp"
      />
      <StructuredData
        data={[
          buildServiceSchema({
            name: "Dota 2 Boosting Services",
            description:
              "Dota 2 boosting services for MMR climbing, calibration matches, LP removal, behavior score recovery, rank tokens, Battle Cup help, and coaching.",
            path: CANONICAL_PATHS.dota2Boosting,
            image: "/images/dota2/dota2-mmr-boost.webp",
            price: 3,
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Dota 2 Boosting", path: CANONICAL_PATHS.dota2Boosting },
          ]),
          buildFaqSchema(faqSchemaItems),
        ]}
      />

      <div className="relative min-h-screen bg-background">
        <div className="dota-bg-overlay absolute inset-0 pointer-events-none" />
        <Navbar />

        <section className="relative flex items-end overflow-hidden pt-16">
          <div className="absolute inset-0">
            <img
              src={config.image}
              alt="Dota 2 boosting services for MMR, calibration, and coaching"
              className="h-full w-full object-cover opacity-20"
              width={1920}
              height={1080}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
          </div>
          <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Link>
            <PageBreadcrumbs items={[{ label: "Home", to: "/" }, { label: "Dota 2 Boosting" }]} />
            <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
              Dota 2 <span className="text-primary glow-text">Boosting Services</span>
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">
              Dota 2 boosting for MMR, calibration, behavior score, and queue recovery handled by
              verified players. Pick the exact service you need and climb faster without sacrificing
              account safety.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <StatBadge Icon={CheckCircle} value={config.stats.orders} label="orders" />
              <StatBadge Icon={Star} value={config.stats.rating} label="rating" fill />
              <StatBadge Icon={Zap} value={config.stats.speed} label="avg. delivery" />
            </div>
          </div>
        </section>

        <section className="relative z-10 py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
              Choose Your <span className="text-primary glow-text">Dota 2 Service</span>
            </h2>

            <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
              {config.services.map((service) => (
                <Link key={service.id} to={getDota2ServicePath(service.id)} className="group">
                  <Card
                    className="service-card-hover relative h-full overflow-hidden border-border/50 bg-card hover:glow-border"
                    style={{ minHeight: "460px" }}
                  >
                    {service.tag && (
                      <Badge className="badge-shimmer absolute top-3 right-3 z-10 border-none px-3 py-1 text-sm font-bold uppercase backdrop-blur-sm">
                        {service.tag}
                      </Badge>
                    )}
                    <div className="relative overflow-hidden bg-secondary/30" style={{ height: "220px" }}>
                      <img
                        src={service.image}
                        alt={`${service.name} Dota 2 boosting service`}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        style={{ objectPosition: "top center" }}
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={300}
                        onError={(event) => {
                          const target = event.target as HTMLImageElement;
                          target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23ffd700'%3E${service.name}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                    </div>
                    <CardContent style={{ padding: "20px" }}>
                      <h3 className="text-xl font-bold uppercase text-foreground transition-colors duration-200 group-hover:text-primary">
                        {service.name}
                      </h3>
                      <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                      {service.bullets && service.bullets.length > 0 && (
                        <ul className="mt-3 space-y-1.5">
                          {service.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <p className="mt-3 text-base font-bold text-primary">{service.startPrice}</p>
                      <Button className="btn-yellow view-service-btn mt-3 w-full gap-2 rounded-lg glow-box font-bold uppercase tracking-wider transition-all duration-200 group-hover:glow-box-intense">
                        View Service <ArrowRight className="view-service-arrow h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 py-12 md:py-16">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-center text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
              What Dota 2 <span className="text-primary glow-text">Boosting</span> Covers
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-primary/15 bg-card/50 p-5">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-base font-bold uppercase text-foreground">Rank Climbing</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Order MMR boost, calibration matches, or win-rate help when your main goal is
                  climbing faster and playing in a bracket that matches your real skill.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-card/50 p-5">
                <Sword className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-base font-bold uppercase text-foreground">Queue Recovery</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Low Priority removal, behavior score recovery, and role queue token farming fix
                  the friction that stops many players from even entering ranked in the first place.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-card/50 p-5">
                <Star className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-base font-bold uppercase text-foreground">Improvement</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Coaching and duo-friendly options help you improve match understanding, hero pool
                  choices, and macro decisions instead of only outsourcing the result.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-12 md:py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="rounded-2xl border border-border/40 bg-card/35 p-6 md:p-8">
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                Dota 2 Boosting for MMR, Queue Recovery, and Coaching
              </h2>
              <div className="prose prose-invert mt-4 max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary">
                <p>
                  Dota 2 is one of the hardest ranked games to climb consistently because every
                  pain point compounds. A weak calibration can bury you in the wrong bracket,
                  losing streaks damage your confidence, Low Priority steals your free time, and a
                  bad behavior score can turn every queue into a grind before the draft even starts.
                  Our Dota 2 boosting services are structured to solve those exact problems instead
                  of forcing every player into one generic rank-up package.
                </p>
                <h3>What Is Included in Dota 2 Boosting</h3>
                <p>
                  On this page you can choose between MMR boosting, calibration matches, win-rate
                  help, Battle Cup support, behavior score recovery, rank token farming, and Dota 2
                  coaching. That matters because not every player needs the same thing. Some users
                  want pure MMR. Others only need their LP games cleared so they can get back to
                  ranked. Support and off-role players often buy rank token farming because role
                  queue friction is the real bottleneck, not match skill.
                </p>
                <h3>How the Service Works</h3>
                <p>
                  Each Dota 2 service page includes its own calculator and delivery rules, but the
                  overall flow stays simple. You pick the offer, choose the amount or target, and
                  place the order. A verified player starts quickly and completes the job manually.
                  When the service supports duo or coaching-style delivery, you can stay involved
                  and turn the purchase into practical learning instead of treating it only as an
                  outsourced grind.
                </p>
                <h3>Pricing, Turnaround, and Safety</h3>
                <p>
                  Dota 2 pricing is tied to the real effort behind the service. Calibration and
                  win-rate jobs are priced differently from behavior score recovery because the risk,
                  pacing, and match goals are different. Most orders begin within 15 minutes, and
                  the delivery time scales with the bracket, queue conditions, and service type.
                  Every job is handled manually by verified players, which is the safest approach
                  for Dota 2 boosting when compared with risky shortcuts or fake automation claims.
                </p>
                <h3>Why Players Buy Dota 2 Boosting</h3>
                <p>
                  The most common reason is time efficiency. Working adults use Dota 2 boosting to
                  protect their ranked progress when they cannot commit to marathon queues. Others
                  use behavior score and LP recovery to repair an account that no longer feels fun
                  to play on. Higher-bracket players often buy coaching because they do not need a
                  miracle climb; they need sharper macro, better draft discipline, and clearer
                  decision-making. In each case, the goal is the same: remove the specific obstacle
                  that is blocking enjoyable games.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-center text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
              Dota 2 Boosting <span className="text-primary glow-text">FAQ</span>
            </h2>
            <Accordion type="single" collapsible className="mt-10 space-y-3">
              {FAQ_ITEMS.map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`dota2-faq-${index}`}
                  className="rounded-xl border border-border/50 bg-card px-5 transition-all duration-300 data-[state=open]:border-primary/40 data-[state=open]:shadow-[0_0_20px_hsl(48_100%_50%_/_0.1)]"
                >
                  <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground transition-colors duration-300 hover:text-primary hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Dota2ServiceGrid;
