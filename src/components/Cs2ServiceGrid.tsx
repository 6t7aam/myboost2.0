import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
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
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  Crosshair,
  Shield,
  Star,
  Target,
  Zap,
} from "lucide-react";
import { GameConfig, ServiceOption } from "@/data/gameConfigs";
import { useCountUp } from "@/hooks/useCountUp";
import { CANONICAL_PATHS } from "@/lib/siteConfig";
import { getCs2ServicePath } from "@/lib/serviceRoutes";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/lib/structuredData";

interface Cs2ServiceGridProps {
  config: GameConfig;
}

const FAQ_ITEMS = [
  {
    q: "Which CS2 boosting services are included on this page?",
    a: "You can order Premier Rating, FACEIT wins and rank, ESEA wins and rank, Competitive rank, Wingman rank, placement matches, profile rank, Armory farming, coaching, and hourly pro sessions.",
  },
  {
    q: "Is CS2 boosting safe for my Steam account?",
    a: "Yes. CS2 services are handled manually by verified players with no bots, cheats, or third-party software involved in the delivery process.",
  },
  {
    q: "Do you support both ranked grinding and practical improvement?",
    a: "Yes. Some CS2 players want direct rating progress, while others prefer coaching or rent-a-pro sessions to improve communication, map play, and decision-making while still being involved.",
  },
  {
    q: "How quickly do CS2 boosting orders begin?",
    a: "Most CS2 orders begin within 15 minutes after confirmation, and the exact delivery window depends on the rank bracket, the mode, and the size of the order.",
  },
  {
    q: "Can I buy only a small part of my CS2 progression plan?",
    a: "Absolutely. Many players buy a handful of FACEIT wins, a short coaching block, or a few placement matches instead of ordering a large package they do not need.",
  },
  {
    q: "Why do players choose MyBoost for CS2 boosting?",
    a: "Because the service catalog is specific. You can choose the exact ranked mode or improvement format you need rather than forcing every goal into one generic CS2 boosting offer.",
  },
];

const faqSchemaItems = FAQ_ITEMS.map((item) => ({
  question: item.q,
  answer: item.a,
}));

const StatBadge = ({
  Icon,
  value,
  label,
  fill,
}: {
  Icon: typeof CheckCircle;
  value: string;
  label: string;
  fill?: boolean;
}) => {
  const animated = useCountUp(value, 1500);
  return (
    <div className="stat-badge flex items-center gap-2 rounded-lg border border-border/50 bg-card/50 px-3 py-1.5 text-sm backdrop-blur-sm">
      <Icon className={`h-4 w-4 text-primary ${fill ? "fill-primary" : ""}`} />
      <span className="font-semibold text-foreground tabular-nums">{animated}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
};

const ServiceMedia = ({ service }: { service: ServiceOption }) => {
  const [imageReady, setImageReady] = useState(false);

  return (
    <div className="relative h-44 overflow-hidden bg-secondary/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_hsl(48_100%_50%_/_0.18)_0%,_transparent_55%),linear-gradient(135deg,_#0b0b0b_0%,_#181818_60%,_#0b0b0b_100%)]">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, hsl(48 100% 50%) 0, hsl(48 100% 50%) 1px, transparent 1px, transparent 14px)",
          }}
        />
        <Crosshair className="absolute -right-4 -bottom-4 h-28 w-28 text-primary/15 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-12" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <span className="text-center text-base font-black uppercase tracking-[0.18em] text-primary/80 glow-text">
            {service.name}
          </span>
        </div>
      </div>

      {service.image && (
        <img
          src={service.image}
          alt={`${service.name} CS2 boosting service`}
          loading="lazy"
          decoding="async"
          width={400}
          height={300}
          onLoad={() => setImageReady(true)}
          onError={() => setImageReady(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
            imageReady ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
    </div>
  );
};

const Cs2ServiceGrid = ({ config }: Cs2ServiceGridProps) => {
  const reduced = useReducedMotion();

  const cardVariant = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <>
      <SEO
        title="CS2 Boosting Services - Safe Wins & Coaching"
        description="CS2 boosting services for Premier, FACEIT, ESEA, placements, rank climbs, and coaching with fast manual delivery from verified players every day."
        keywords="cs2 boosting, premier boost, faceit boost, esea boost, competitive rank boost, cs2 coaching"
        canonicalUrl={`https://www.myboost.top${CANONICAL_PATHS.cs2Boosting}`}
        ogImage="https://www.myboost.top/service-images/cs2/premier-rating.webp"
      />
      <StructuredData
        data={[
          buildServiceSchema({
            name: "CS2 Boosting Services",
            description:
              "CS2 boosting services for Premier Rating, FACEIT, ESEA, Competitive rank, Wingman, placements, profile rank, Armory farming, and coaching.",
            path: CANONICAL_PATHS.cs2Boosting,
            image: "/service-images/cs2/premier-rating.webp",
            price: 1.49,
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "CS2 Boosting", path: CANONICAL_PATHS.cs2Boosting },
          ]),
          buildFaqSchema(faqSchemaItems),
        ]}
      />

      <div className="relative min-h-screen bg-background">
        <Navbar />

        <section className="relative flex items-end overflow-hidden pt-16">
          <div className="absolute inset-0">
            <img
              src={config.image}
              alt="CS2 boosting services for Premier, FACEIT, and coaching"
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
            <PageBreadcrumbs items={[{ label: "Home", to: "/" }, { label: "CS2 Boosting" }]} />
            <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
              CS2 <span className="text-primary glow-text">Boosting Services</span>
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">
              CS2 boosting for Premier, FACEIT, ESEA, Competitive, Wingman, placements, coaching,
              and account progression. Choose the exact mode you care about and skip the generic
              grind.
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
              Choose Your <span className="text-primary glow-text">CS2 Service</span>
            </h2>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-60px" }}
              variants={reduced ? undefined : { animate: { transition: { staggerChildren: 0.06 } } }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {config.services.map((service) => (
                <motion.div key={service.id} variants={reduced ? undefined : cardVariant}>
                  <Link to={getCs2ServicePath(service.id)} className="group block h-full">
                    <Card className="service-card-hover relative flex h-full flex-col overflow-hidden border-border/50 bg-card hover:glow-border">
                      {service.tag && (
                        <Badge className="badge-shimmer absolute right-3 top-3 z-10 border-none px-3 py-1 text-xs font-bold uppercase backdrop-blur-sm">
                          {service.tag}
                        </Badge>
                      )}

                      <ServiceMedia service={service} />

                      <CardContent className="flex flex-1 flex-col p-5">
                        <h3 className="text-lg font-bold uppercase text-foreground transition-colors duration-200 group-hover:text-primary">
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

                        <p className="mt-auto pt-4 text-base font-bold text-primary glow-text">{service.startPrice}</p>

                        <Button className="btn-yellow view-service-btn mt-3 w-full gap-2 rounded-lg font-bold uppercase tracking-wider glow-box transition-all duration-200 group-hover:glow-box-intense">
                          View Service <ArrowRight className="view-service-arrow h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="relative z-10 py-12 md:py-16">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-center text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
              What CS2 <span className="text-primary glow-text">Boosting</span> Covers
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-primary/15 bg-card/50 p-5">
                <Target className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-base font-bold uppercase text-foreground">Ranked Modes</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Premier Rating, FACEIT, ESEA, Competitive rank, Wingman rank, and placement
                  matches cover the full range of CS2 ladder goals.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-card/50 p-5">
                <Shield className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-base font-bold uppercase text-foreground">Progression</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Wins, Armory credits, and profile rank services help players push account progress
                  and cosmetic unlocks without marathon sessions.
                </p>
              </div>
              <div className="rounded-2xl border border-primary/15 bg-card/50 p-5">
                <Star className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-base font-bold uppercase text-foreground">Improvement</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Rent-a-pro sessions and coaching are ideal when you want stronger teamwork,
                  decision-making, and map understanding instead of only outsourced results.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-12 md:py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="rounded-2xl border border-border/40 bg-card/35 p-6 md:p-8">
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                CS2 Boosting Services for Ranked Climbing and Practical Improvement
              </h2>
              <div className="prose prose-invert mt-4 max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary">
                <p>
                  CS2 players do not all get stuck for the same reason. One player is trapped in
                  low Premier due to inconsistent teammates, another wants a Level 10 FACEIT push,
                  another needs placement matches finished cleanly, and someone else simply wants a
                  few coaching hours before grinding solo again. That is why our CS2 boosting page
                  is structured as a catalog instead of a one-size-fits-all offer.
                </p>
                <h3>What Is Included in CS2 Boosting</h3>
                <p>
                  The services above cover the major CS2 ecosystems: Premier, FACEIT, ESEA,
                  Competitive, Wingman, placement matches, direct win farming, Armory progress,
                  profile rank, coaching, and hourly help from strong players. That range matters
                  because a player aiming for Global Elite needs something very different from a
                  player farming credits or trying to stabilize FACEIT form with a few clean wins.
                </p>
                <h3>How the Service Works</h3>
                <p>
                  Every CS2 service page includes a dedicated calculator or package selector so you
                  can set the exact goal before checkout. Once ordered, the delivery is handled
                  manually by verified players. There are no bots, scripts, or fake automation
                  claims involved. If you want to stay involved, rent-a-pro sessions and coaching
                  keep you in the process while still removing the hardest part of the grind.
                </p>
                <h3>Pricing and Turnaround</h3>
                <p>
                  CS2 pricing depends on the mode and the difficulty of the bracket. A few wins in
                  one ecosystem do not carry the same difficulty as a long climb through a higher
                  rating segment, so the pricing stays tied to the real work. Most orders start
                  within 15 minutes, and delivery time scales with queue pace, match count, and the
                  rating target you choose. The key advantage is clarity: you see what you are
                  ordering instead of guessing how a generic CS2 boosting quote was calculated.
                </p>
                <h3>Why Players Buy CS2 Boosting</h3>
                <p>
                  Some players order CS2 boosting because they want rank progress without spending
                  their entire week in solo queue. Others need coaching because their mechanics are
                  fine but their map decisions, utility timing, or communication habits keep
                  dragging them back. Many users simply want targeted help: a few FACEIT wins, a
                  better starting rating, or profile-rank progress while they focus on the modes
                  they enjoy most. The service works best when it removes the exact friction point
                  blocking your account.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-center text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
              CS2 Boosting <span className="text-primary glow-text">FAQ</span>
            </h2>
            <Accordion type="single" collapsible className="mt-10 space-y-3">
              {FAQ_ITEMS.map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`cs2-faq-${index}`}
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

export default Cs2ServiceGrid;
