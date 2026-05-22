import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
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
    desc: "Most orders begin within 15 minutes of confirmation.",
  },
  {
    icon: Clock,
    title: "1-24 Hour Delivery",
    desc: "Average completion time across the Rust catalog.",
  },
  {
    icon: PackageCheck,
    title: "Manual Only",
    desc: "Verified Rust veterans — no bots, no scripts, no shortcuts.",
  },
  {
    icon: Truck,
    title: "Live Updates",
    desc: "Track progress directly in your dashboard at every step.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Is your Rust boosting service safe?",
    a: "Yes. We rely exclusively on manual play by verified Rust veterans — no bots, no scripts, no automation. We use VPN routing, appear-offline mode, and account-safe practices on every order.",
  },
  {
    q: "How fast will my Rust order be completed?",
    a: "Most services start within 15 minutes of payment. Component, electronics, and key card orders typically complete the same day. Base builds, raids, and farm setups complete within 1-24 hours depending on scope.",
  },
  {
    q: "Can I play on my Rust account while the boost runs?",
    a: "For account-share services, please stay offline while the booster is working. For Rent A Booster, Coaching, and PvP Assistance you can play together with our Rust pros.",
  },
  {
    q: "What's the difference between Standard, Express, and Super Express?",
    a: "Standard delivery uses the listed completion time at the base price. Express adds priority queueing for faster scheduling (+20%). Super Express puts your order at the very top of the queue (+30%).",
  },
  {
    q: "Do you offer refunds if I'm not satisfied?",
    a: "Yes — every Rust order is backed by a refund guarantee. If something is off, our 24/7 support team will resolve it or process a refund.",
  },
  {
    q: "How do I receive components, electronics, or key cards?",
    a: "All farmed items are delivered directly to your Rust base, TC, or stash on the server you specify. Our team coordinates a safe drop window with you before delivery.",
  },
];

const RustHubPage = () => {
  const location = useLocation();

  // Smooth scroll to a category if the URL includes a hash on mount.
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
        title="Rust Boosting Services - Bases, Raids, Resources, Components, Electronics & More"
        description="Premium Rust boosting services — base building, raiding, resources, components, electronics, key cards, oil barrel farming, weapons, ammo, coaching, and rent-a-booster. Manual delivery by Rust veterans. 600+ orders, 4.9★ rating."
        keywords="rust boosting, rust base building, rust raid boost, rust components, rust electronics, rust key cards, rust oil barrel, rust weapons, rust coaching, rent a booster rust"
        canonicalUrl="https://www.myboost.top/game/rust"
      />
      <div className="min-h-screen bg-background relative">
        <div className="dota-bg-overlay absolute inset-0 pointer-events-none" />
        <Navbar />

        {/* Hero */}
        <section className="relative flex items-end overflow-hidden pt-16">
          <div className="absolute inset-0">
            <img
              src={RUST_HERO_IMAGE}
              alt="Rust"
              className="h-full w-full object-cover opacity-20"
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
            <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
              Rust <span className="text-primary glow-text">Boosting</span>
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground md:text-lg">
              Premium Rust services delivered by veteran players. Base builds, raids,
              farming, components, electronics, key cards, coaching, and rent-a-booster
              — all manual, all safe, all backed by our refund guarantee.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <StatBadge Icon={CheckCircle} value={RUST_STATS.orders} label="orders" />
              <StatBadge Icon={Star} value={RUST_STATS.rating} label="rating" fill />
              <StatBadge Icon={Zap} value={RUST_STATS.speed} label="avg. delivery" />
            </div>

            {/* Trust pills */}
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

        {/* Two-column body: sidebar + categories */}
        <section className="relative z-10 py-10 md:py-12">
          <div className="mx-auto w-full max-w-[1520px] px-4 md:px-6">
            <div className="grid gap-8 min-[900px]:grid-cols-[280px_minmax(0,1fr)]">
              <RustCategorySidebar mode="hub" />

              <div className="min-w-0 space-y-14">
                {RUST_CATEGORIES.map((cat) => {
                  const services = getRustServicesByCategory(cat.id);
                  if (services.length === 0) return null;
                  return (
                    <section
                      key={cat.id}
                      id={`category-${cat.id}`}
                      className="scroll-mt-24"
                    >
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
                        style={{
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(260px, 1fr))",
                        }}
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

        {/* Delivery info */}
        <section className="relative z-10 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
              How <span className="text-primary glow-text">Delivery</span> Works
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground md:text-base">
              Every Rust order is handled manually by verified players. Here's what to expect from
              placing your order to delivery.
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

        {/* FAQ */}
        <section className="relative z-10 py-12 md:py-16">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-center text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
              Frequently Asked <span className="text-primary glow-text">Questions</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted-foreground">
              Everything you need to know about Rust services before ordering.
            </p>

            <Accordion type="single" collapsible className="mt-10 space-y-3">
              {FAQ_ITEMS.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`rust-faq-${i}`}
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

        {/* SEO content */}
        <section className="relative z-10 pb-16">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="rounded-2xl border border-border/40 bg-card/35 p-6 md:p-8">
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
                Rust Boosting Done Right
              </h2>
              <div className="prose prose-invert mt-4 max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary">
                <p>
                  Rust is a brutal game. Wipes restart every week, raids hit at the worst
                  possible time, and the grind from rock-bashing to AKs takes more hours than most
                  players can afford. Our Rust services give you a shortcut without compromising
                  account safety or fairness — every order is handled by verified Rust veterans
                  who play wipes weekly.
                </p>
                <h3>Full Catalog Coverage</h3>
                <p>
                  From a clean starter base in the first hour of wipe, to bunker builds, online
                  raids, monument runs, component stockpiles, pre-crafted electronics, key cards,
                  and weapons — we cover every part of the Rust experience. If you need it farmed,
                  built, raided, or coached, it's in the catalog above.
                </p>
                <h3>Manual Only, Always</h3>
                <p>
                  No bots, no scripts, no detection risk. Every order is completed by a real Rust
                  player on a real account, with VPN routing and appear-offline mode if requested.
                  600+ orders later, the policy hasn't changed.
                </p>
                <h3>Fair Pricing, Cashback, Refunds</h3>
                <p>
                  Every price on this page is exactly what you pay — no upsells, no hidden
                  charges. Cashback is credited to your account for every completed order, and a
                  full refund guarantee backs every service. 24/7 support handles anything else.
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
