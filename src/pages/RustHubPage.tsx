import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import PageBreadcrumbs from "@/components/PageBreadcrumbs";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle,
  Clock,
  Coins,
  Headset,
  PackageCheck,
  Shield,
  ShieldCheck,
  Star,
  Truck,
  Wifi,
  Zap,
} from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  RUST_CATEGORIES,
  RUST_HERO_IMAGE,
  RUST_STATS,
  getRustServicesByCategory,
} from "@/data/rustServices";
import RustCategorySidebar from "@/components/rust/RustCategorySidebar";
import RustServiceCard from "@/components/rust/RustServiceCard";
import { CANONICAL_PATHS } from "@/lib/siteConfig";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/lib/structuredData";

interface StatBadgeProps {
  Icon: typeof CheckCircle;
  value: string;
  label: string;
  fill?: boolean;
}

const StatBadge = ({ Icon, value, label, fill }: StatBadgeProps) => {
  const animated = useCountUp(value, 1500);
  return (
    <div className="stat-badge flex items-center gap-2 rounded-lg border border-primary/20 bg-card/60 px-3 py-1.5 text-sm backdrop-blur-sm">
      <Icon className={`h-4 w-4 text-primary ${fill ? "fill-primary" : ""}`} />
      <span className="font-semibold text-foreground tabular-nums">{animated}</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
};

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "SSL Secure" },
  { icon: Wifi, label: "VPN Safe" },
  { icon: Shield, label: "Safe Service" },
  { icon: Headset, label: "24/7 Support" },
  { icon: BadgeCheck, label: "Refund Guarantee" },
  { icon: Coins, label: "Cashback Available" },
];

const DELIVERY_INFO = [
  {
    icon: Zap,
    title: "Instant Start",
    desc: "Most Rust boosting orders begin within 15 minutes after confirmation.",
  },
  {
    icon: Clock,
    title: "Flexible Turnaround",
    desc: "Small deliveries finish the same day while larger raids and builds stay scheduled and predictable.",
  },
  {
    icon: PackageCheck,
    title: "Manual Only",
    desc: "Verified Rust veterans handle every order with no bots, scripts, or risky shortcuts.",
  },
  {
    icon: Truck,
    title: "Live Updates",
    desc: "Track delivery progress and coordinate safe handoff windows with support in real time.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Is Rust boosting safe for my account and my server reputation?",
    a: "Yes. Every order is completed manually by verified Rust players using account-safe practices, sensible VPN routing, and no bots or scripts.",
  },
  {
    q: "How fast can a Rust boosting order be completed?",
    a: "Most orders start within 15 minutes. Resource, component, electronics, and key card deliveries are often completed the same day, while full base builds and raid jobs can take longer depending on scope.",
  },
  {
    q: "Can I order only one part of my Rust progression?",
    a: "Absolutely. Some players only need sulfur, electronics, or a starter base, while others combine multiple services into a full wipe plan. Each service can be ordered on its own.",
  },
  {
    q: "Do you offer Rust raid services and monument carries?",
    a: "Yes. We handle full base raid carries, Oil Rig runs, Cargo Ship clears, PvP assistance, monument access prep, and the resource support that makes those jobs possible.",
  },
  {
    q: "How are items like components, electronics, and key cards delivered?",
    a: "Deliveries are coordinated directly to your Rust base, stash, or agreed handoff point on the server you specify, with support staying available during the full process.",
  },
  {
    q: "What if I need coaching instead of a piloted Rust service?",
    a: 'You can book Rust coaching or hourly pro help if you want guidance, live support, or a duo-style session instead of fully handing over the task.',
  },
];

const RUST_FAQ_SCHEMA_ITEMS = FAQ_ITEMS.map((item) => ({
  question: item.q,
  answer: item.a,
}));

const RustHubPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  }, [location.hash]);

  return (
    <>
      <SEO
        title="Rust Boosting Services - Fast & Safe"
        description="Rust boosting services for raids, bases, resources, components, and coaching. Order safe manual Rust help from veterans and start your wipe stronger."
        keywords="rust boosting, rust raid service, rust base building, rust resource delivery, rust monument carries, rust coaching, buy rust boosting"
        canonicalUrl={`https://www.myboost.top${CANONICAL_PATHS.rustBoosting}`}
        ogImage="https://www.myboost.top/images/rust/base-raiding-boost.webp"
      />
      <StructuredData
        data={[
          buildServiceSchema({
            name: "Rust Boosting Services",
            description:
              "Rust boosting services for base building, raid carries, monument runs, resource delivery, components, electronics, key cards, weapons, ammo, and coaching.",
            path: CANONICAL_PATHS.rustBoosting,
            image: "/images/rust/base-raiding-boost.webp",
            price: 1.09,
          }),
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Rust Boosting", path: CANONICAL_PATHS.rustBoosting },
          ]),
          buildFaqSchema(RUST_FAQ_SCHEMA_ITEMS),
        ]}
      />

      <div className="relative min-h-screen bg-background">
        <div className="dota-bg-overlay absolute inset-0 pointer-events-none" />
        <Navbar />

        <section className="relative flex items-end overflow-hidden pt-16">
          <div className="absolute inset-0">
            <img
              src={RUST_HERO_IMAGE}
              alt="Rust boosting services for raid carries, base building, and resource delivery"
              className="h-full w-full object-cover opacity-20"
              width={1920}
              height={1080}
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/55" />
          </div>
          <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </Link>
            <PageBreadcrumbs items={[{ label: "Home", to: "/" }, { label: "Rust Boosting" }]} />
            <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
              Rust <span className="text-primary glow-text">Boosting Services</span>
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">
              Rust boosting handled by verified veterans for bases, raid carries, monument runs,
              resource delivery, electronics, and coaching. Every order is manual, account-safe,
              and built for players who want stronger wipe progress without wasting entire evenings.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <StatBadge Icon={CheckCircle} value={RUST_STATS.orders} label="orders" />
              <StatBadge Icon={Star} value={RUST_STATS.rating} label="rating" fill />
              <StatBadge Icon={Zap} value={RUST_STATS.speed} label="avg. delivery" />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-black/40 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/80"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 py-10 md:py-12">
          <div className="mx-auto w-full max-w-[1520px] px-4 md:px-6">
            <div className="grid gap-8 min-[900px]:grid-cols-[280px_minmax(0,1fr)]">
              <RustCategorySidebar mode="hub" />

              <div className="min-w-0 space-y-14">
                {RUST_CATEGORIES.map((cat) => {
                  const services = getRustServicesByCategory(cat.id);
                  if (services.length === 0) return null;

                  return (
                    <section key={cat.id} id={`category-${cat.id}`} className="scroll-mt-24">
                      <div className="mb-6 flex flex-col gap-1 border-l-4 border-primary pl-4">
                        <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                          {cat.title}
                        </h2>
                        <p className="text-sm text-muted-foreground md:text-base">
                          {cat.description}
                        </p>
                      </div>

                      <div
                        className="grid gap-5"
                        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}
                      >
                        {services.map((service) => (
                          <RustServiceCard key={service.id} service={service} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
              How <span className="text-primary glow-text">Rust Boosting</span> Works
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground md:text-base">
              Every order is fulfilled manually by verified Rust players. From selecting a service
              to receiving the delivery, the process is built to stay fast, transparent, and safe.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {DELIVERY_INFO.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-primary/15 bg-gradient-to-b from-card to-card/40 p-5 transition-all hover:border-primary/40 hover:shadow-[0_0_28px_rgba(255,215,0,0.08)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold uppercase tracking-wide text-foreground">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative z-10 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-center text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
              Frequently Asked <span className="text-primary glow-text">Questions</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
              Everything you need to know about buying Rust boosting, raid carries, and resource
              delivery before you place an order.
            </p>

            <Accordion type="single" collapsible className="mt-10 space-y-3">
              {FAQ_ITEMS.map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`rust-faq-${index}`}
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

        <section className="relative z-10 pb-16">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="rounded-2xl border border-border/40 bg-card/35 p-6 md:p-8">
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                Rust Boosting Services for Wipes, Raids, and Fast Progression
              </h2>
              <div className="prose prose-invert mt-4 max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary">
                <p>
                  Rust is brutal by design. Wipes reset your work, sulfur routes collapse to roof
                  campers, and a weak first night can snowball into an entire week of playing from
                  behind. Our Rust boosting services are built for players who want expert help
                  without risking their account to bots, scripts, or careless shortcuts. Every
                  order is completed manually by Rust veterans who understand wipe pacing, raid
                  cost, monument timings, and safe delivery etiquette.
                </p>
                <h3>What Is Included in Rust Boosting</h3>
                <p>
                  The catalog above covers the full Rust progression loop. Players buy Rust
                  boosting for wipe-day starter bases, bunker builds, workbench progression, Cargo
                  Ship and Oil Rig clears, base raid carries, resource delivery, component bundles,
                  electronics crafting, key cards, tea farms, weapons, ammo, and coaching. That
                  means you can fix one exact bottleneck in your wipe instead of paying for a vague
                  package that does not match your server, group size, or current objective.
                </p>
                <h3>How Our Rust Boosting Service Works</h3>
                <p>
                  The flow is straightforward. You choose the Rust service you need, configure the
                  quantity or delivery speed, and place the order through the live calculator. From
                  there, a verified Rust player handles the job manually, whether that means running
                  monuments, building on your server, gathering a stockpile of resources, or
                  playing on your account during a scheduled session. Support stays available the
                  whole time, so you always know when the order starts, what is being handled, and
                  when delivery is ready.
                </p>
                <h3>Rust Pricing and Package Options</h3>
                <p>
                  Rust pricing depends on the real difficulty of the task. Small deliveries like oil
                  barrels or resource bundles start low, while advanced base designs, long hourly
                  sessions, and full raid carries cost more because they demand planning, PvP
                  experience, and longer delivery windows. The upside is transparency. You can buy
                  Rust boosting for one precise need or combine several services into a wipe plan
                  without guessing at hidden fees or padded bundles.
                </p>
                <h3>Turnaround Time and Rust Account Safety</h3>
                <p>
                  Most Rust orders begin within 15 minutes after confirmation. Resource, component,
                  electronics, and key card deliveries are often completed the same day. Starter
                  bases, workbench progression, and monument runs usually finish in a few hours,
                  while full bunker builds or large raid sessions can take longer. We keep the
                  delivery pace fast, but not reckless. Manual gameplay, sensible VPN routing, and
                  account-safe behavior matter more than shaving a few minutes off the ETA.
                </p>
                <h3>Why Players Order Rust Boosting</h3>
                <p>
                  Some players buy Rust raid services because their group lacks sulfur time. Others
                  need Rust resource delivery because they would rather spend their limited hours on
                  PvP than on hitting trees and recycling roads. Solo players often use Rust base
                  building to avoid losing a whole wipe to a weak starter. Competitive groups order
                  electronics, monument carries, or workbench services to reach late-game weapons
                  faster. The common goal is time efficiency: Rust boosting removes repetitive
                  friction so you can focus on the content you actually enjoy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default RustHubPage;
