import { Link } from "react-router-dom";
import {
  BadgeCheck,
  Check,
  ChevronRight,
  Coins,
  Headset,
  Shield,
  ShieldCheck,
  Star,
  Wallet,
  Wifi,
  Zap,
} from "lucide-react";
import {
  RustService,
  RUST_STATS,
  getRustCategory,
} from "@/data/rustServices";
import { rustServiceMeta } from "@/data/rustServiceMeta";
import { rustSEO } from "@/data/rustSEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface BaseProps {
  service: RustService;
}

export const RustBreadcrumbs = ({ service }: BaseProps) => {
  const category = getRustCategory(service.category);
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="transition-colors hover:text-primary">
            Home
          </Link>
        </li>
        <ChevronRight className="h-3 w-3 opacity-60" />
        <li>
          <Link to="/game/rust" className="transition-colors hover:text-primary">
            Rust
          </Link>
        </li>
        {category && (
          <>
            <ChevronRight className="h-3 w-3 opacity-60" />
            <li>
              <Link
                to={`/game/rust#category-${category.id}`}
                className="transition-colors hover:text-primary"
              >
                {category.title}
              </Link>
            </li>
          </>
        )}
        <ChevronRight className="h-3 w-3 opacity-60" />
        <li className="font-semibold text-foreground/85">{service.title}</li>
      </ol>
    </nav>
  );
};

export const RustTrustBar = ({ service }: BaseProps) => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-muted-foreground">
    <div className="flex items-center gap-1.5">
      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
      <span className="font-semibold text-foreground">Manual Service</span>
    </div>
    <span className="opacity-40">|</span>
    <span>
      <span className="font-semibold text-foreground">{service.delivery}</span> delivery
    </span>
    <span className="opacity-40">|</span>
    <span>
      <span className="font-semibold text-foreground">Refund Guarantee</span>
    </span>
  </div>
);

export const RustFeatureTags = ({ service }: BaseProps) => {
  const meta = rustServiceMeta[service.id];
  if (!meta) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {meta.featureTags.map((tag) => (
        <span
          key={tag.label}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-foreground/90"
        >
          <span className="text-primary" aria-hidden>
            ◆
          </span>
          <span>{tag.label}</span>
        </span>
      ))}
    </div>
  );
};

export const RustOrderSummaryBar = ({ service }: BaseProps) => (
  <div className="mt-4 grid gap-3 rounded-xl border border-border/40 bg-card/40 p-4 text-xs sm:grid-cols-3">
    <div className="flex items-center gap-2 text-muted-foreground">
      <Shield className="h-3.5 w-3.5 text-primary" />
      <span>Manual Rust service only</span>
    </div>
    <div className="flex items-center gap-2 text-muted-foreground">
      <Zap className="h-3.5 w-3.5 text-primary" />
      <span>Fast start, no bots</span>
    </div>
    <div className="flex items-center gap-2 text-muted-foreground">
      <BadgeCheck className="h-3.5 w-3.5 text-primary" />
      <span>{service.delivery} delivery</span>
    </div>
  </div>
);

export const RustYourWins = ({ service }: BaseProps) => {
  const meta = rustServiceMeta[service.id];
  if (!meta) return null;
  return (
    <div className="mt-10">
      <h2 className="mb-6 text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
        Your <span className="text-primary glow-text">Wins</span>
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {meta.wins.map((win) => (
          <li
            key={win}
            className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/50 p-4"
          >
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span className="text-sm text-foreground/90">{win}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const RustHowItWorks = ({ service }: BaseProps) => {
  const meta = rustServiceMeta[service.id];
  if (!meta) return null;
  return (
    <div className="mt-10">
      <h2 className="mb-6 text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
        How It <span className="text-primary glow-text">Works</span>
      </h2>
      <div className="grid gap-4">
        {meta.steps.map((step, idx) => (
          <div
            key={step.title}
            className="relative rounded-2xl border border-primary/30 bg-card p-5 shadow-[0_0_20px_hsl(48_100%_50%_/_0.08)]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-base font-black text-primary">
                {step.icon}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">
                  Step {idx + 1}
                </div>
                <h3 className="mt-1 text-base font-bold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PILLARS = [
  {
    icon: Shield,
    title: "Zero-Ban Protocol",
    desc: "Manual service only, verified Rust players, and no shady automation.",
  },
  {
    icon: Wallet,
    title: "Fair Price Promise",
    desc: "Clear pricing per service with no hidden fees or last-minute upsells.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Pros Only",
    desc: "Experienced Rust PROs who handle base builds, raid sessions, and resource routes daily.",
  },
  {
    icon: Headset,
    title: "24/7 Human Support",
    desc: "Live updates and help whenever you need order status or clarification.",
  },
];

export const RustWhyChooseUs = () => (
  <div className="mt-10">
    <h2 className="mb-6 text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
      Why Choose <span className="text-primary glow-text">Us</span>
    </h2>
    <div className="grid gap-3 sm:grid-cols-2">
      {PILLARS.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="rounded-2xl border border-border/40 bg-card/50 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/35 bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-base font-bold text-foreground">{title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const SERVICE_FAQ_DEFAULT = [
  {
    q: "Is this Rust service safe to buy?",
    a: "Yes — every order is handled manually by a verified Rust veteran. We use VPN routing, appear-offline mode, and account-safe practices. 600+ orders completed with no bans.",
  },
  {
    q: "How fast will my order be delivered?",
    a: "Most orders start within 15 minutes of payment. Total completion time is listed on the order card. Choose Express or Super Express to put your order higher in the queue.",
  },
  {
    q: "What happens if I'm not satisfied?",
    a: "Every Rust order is backed by our refund guarantee. Contact 24/7 support and we will resolve the issue or process a refund.",
  },
  {
    q: "Can I pause the order or change my options?",
    a: "Yes — message support at any point and we can pause or adjust your order to fit your needs.",
  },
];

export const RustFaqSection = ({ service }: BaseProps) => {
  const meta = rustServiceMeta[service.id];
  const items = meta?.faq && meta.faq.length > 0 ? meta.faq : SERVICE_FAQ_DEFAULT;
  return (
    <div className="mt-10">
      <h2 className="mb-6 text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
        Frequently <span className="text-primary glow-text">Asked</span>
      </h2>
      <Accordion type="single" collapsible className="space-y-3">
        {items.map((faq, i) => (
          <AccordionItem
            key={faq.q}
            value={`svc-faq-${i}`}
            className="rounded-xl border border-border/50 bg-card px-5 transition-all duration-300 data-[state=open]:border-primary/40 data-[state=open]:shadow-[0_0_20px_hsl(48_100%_50%_/_0.1)]"
          >
            <AccordionTrigger className="py-4 text-left text-sm font-semibold text-foreground transition-colors hover:text-primary hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export const RustSeoSection = ({ service }: BaseProps) => {
  const seo = rustSEO[service.id];
  if (!seo) return null;
  return (
    <div className="mt-10 rounded-2xl border border-border/40 bg-card/35 p-6">
      <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
        {seo.h1}
      </h2>
      <div
        className="prose prose-invert mt-4 max-w-none text-muted-foreground prose-headings:text-foreground prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-primary"
        dangerouslySetInnerHTML={{ __html: seo.content }}
      />
    </div>
  );
};

const FOOTER_BADGES = [
  { icon: ShieldCheck, label: "SSL Secure" },
  { icon: Wifi, label: "VPN Safe" },
  { icon: Shield, label: "Safe Service" },
  { icon: Headset, label: "24/7 Support" },
  { icon: BadgeCheck, label: "Refund Guarantee" },
  { icon: Coins, label: "Cashback Available" },
];

export const RustTrustBadgesFooter = () => (
  <div className="mt-12 rounded-2xl border border-primary/15 bg-card/40 p-5">
    <div className="flex flex-wrap items-center justify-center gap-2">
      {FOOTER_BADGES.map(({ icon: Icon, label }) => (
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
);
