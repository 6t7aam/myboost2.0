/**
 * Reusable section components for Dota 2 service pages.
 *
 * Each Dota 2 service page (dedicated or dynamic) renders three of these
 * blocks: <Dota2HeaderMeta /> below the title, <Dota2OrderFooter /> below
 * the order button, and <Dota2ServiceBottom /> before the global Footer.
 *
 * All copy comes from `src/data/dota2ServiceMeta.ts` — keep changes there.
 */

import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Star, Check, ChevronRight, Shield, Wallet, BadgeCheck, Headset, Zap, Clock, ShieldCheck } from "lucide-react";
import { dota2ServiceMeta } from "@/data/dota2ServiceMeta";

interface BaseProps {
  serviceId: string;
}

interface EmbeddableProps extends BaseProps {
  /**
   * When true, render only the inner block (no outer <section>/container)
   * so the section can be inlined inside a parent layout column. When
   * false (default), wrap in a full-width <section> with its own container.
   */
  embedded?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Trust bar — ★ 4.9 | 1,500,000+ boosts | 15 min start                      */
/* -------------------------------------------------------------------------- */
export const Dota2TrustBar = () => (
  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-muted-foreground">
    <div className="flex items-center gap-1.5">
      <span className="flex items-center text-primary">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
        ))}
      </span>
      <span className="font-semibold text-foreground">4.9 / 5</span>
    </div>
    <span className="opacity-40">|</span>
    <span>
      <span className="font-semibold text-foreground">15 min</span> average start time
    </span>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Feature tags — 3 dark pills with gold border                              */
/* -------------------------------------------------------------------------- */
export const Dota2FeatureTags = ({ serviceId }: BaseProps) => {
  const meta = dota2ServiceMeta[serviceId];
  if (!meta) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {meta.featureTags.map((tag) => (
        <span
          key={tag.label}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-foreground/90"
        >
          <span aria-hidden>{tag.icon}</span>
          <span>{tag.label}</span>
        </span>
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Breadcrumbs — Home > Dota 2 > Service Name                                */
/* -------------------------------------------------------------------------- */
export const Dota2Breadcrumbs = ({ serviceId }: BaseProps) => {
  const meta = dota2ServiceMeta[serviceId];
  const label = meta?.pageTitle.replace(/^Dota 2 /, "") || serviceId;
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
          <Link to="/game/dota-2" className="transition-colors hover:text-primary">
            Dota 2
          </Link>
        </li>
        <ChevronRight className="h-3 w-3 opacity-60" />
        <li className="font-semibold text-foreground/80">{label}</li>
      </ol>
    </nav>
  );
};

/* -------------------------------------------------------------------------- */
/*  Header meta — wraps breadcrumbs + trust bar + feature tags                */
/* -------------------------------------------------------------------------- */
export const Dota2HeaderMeta = ({ serviceId }: BaseProps) => (
  <div className="mx-auto mt-6 flex max-w-4xl flex-col items-center gap-4">
    <Dota2Breadcrumbs serviceId={serviceId} />
    <Dota2TrustBar />
    <Dota2FeatureTags serviceId={serviceId} />
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Delivery info — small inline block inside order card                      */
/* -------------------------------------------------------------------------- */
export const Dota2DeliveryInfo = ({ serviceId }: BaseProps) => {
  const meta = dota2ServiceMeta[serviceId];
  if (!meta) return null;
  return (
    <div className="space-y-1.5 rounded-lg border border-border/50 bg-card/50 p-3 text-xs">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Clock className="h-3.5 w-3.5 text-primary" />
        <span>{meta.delivery.startTime}</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <span aria-hidden className="text-primary">📋</span>
        <span>{meta.delivery.completion}</span>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Payment methods + money-back row                                          */
/* -------------------------------------------------------------------------- */
export const Dota2PaymentRow = () => (
  <div className="space-y-2">
    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-wider text-muted-foreground opacity-70">
      <span>Visa</span>
      <span className="opacity-40">•</span>
      <span>Mastercard</span>
      <span className="opacity-40">•</span>
      <span>Apple Pay</span>
      <span className="opacity-40">•</span>
      <span>Google Pay</span>
      <span className="opacity-40">•</span>
      <span>Crypto</span>
    </div>
    <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400">
      <Check className="h-3.5 w-3.5" />
      <span>100% Money-Back Guarantee</span>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Order footer — drop in below "Order Now" button                           */
/* -------------------------------------------------------------------------- */
export const Dota2OrderFooter = ({ serviceId }: BaseProps) => (
  <div className="mt-4 space-y-3">
    <Dota2DeliveryInfo serviceId={serviceId} />
    <Dota2PaymentRow />
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Your Wins — checkmark list                                                */
/* -------------------------------------------------------------------------- */
export const Dota2YourWins = ({ serviceId, embedded = false }: EmbeddableProps) => {
  const meta = dota2ServiceMeta[serviceId];
  if (!meta) return null;
  const inner = (
    <>
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
    </>
  );
  if (embedded) return <div className="mt-10">{inner}</div>;
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">{inner}</div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*  How It Works — 3 steps with arrows                                         */
/* -------------------------------------------------------------------------- */
export const Dota2HowItWorks = ({ serviceId, embedded = false }: EmbeddableProps) => {
  const meta = dota2ServiceMeta[serviceId];
  if (!meta) return null;
  // When embedded in a narrow column we drop the arrow connectors and
  // switch to a vertical layout so each step still reads cleanly.
  const grid = embedded
    ? "grid gap-4"
    : "grid gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center";
  const heading = embedded ? "mb-6" : "mb-10 text-center";
  const inner = (
    <>
      <h2 className={`${heading} text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl`}>
        How It <span className="text-primary glow-text">Works</span>
      </h2>
      <div className={grid}>
        {meta.steps.map((step, idx) => (
          <Fragment key={step.title}>
            <div className="relative rounded-2xl border border-primary/30 bg-card p-5 text-center shadow-[0_0_20px_hsl(48_100%_50%_/_0.08)]">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-xl">
                <span aria-hidden>{step.icon}</span>
              </div>
              <div className="mt-3 text-xs font-bold uppercase tracking-wider text-primary">
                Step {idx + 1}
              </div>
              <h3 className="mt-1 text-base font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
            </div>
            {!embedded && idx < meta.steps.length - 1 && (
              <div className="hidden text-primary md:flex md:items-center md:justify-center" aria-hidden>
                <ChevronRight className="h-8 w-8" />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
  if (embedded) return <div className="mt-10">{inner}</div>;
  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">{inner}</div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*  Why Choose Us — 4 trust pillars                                            */
/* -------------------------------------------------------------------------- */
const PILLARS = [
  {
    icon: Shield,
    title: "Zero-Ban Protocol",
    desc: "Manual service only. Smart VPN routes. No bots or cheats.",
  },
  {
    icon: Wallet,
    title: "Fair Price Promise",
    desc: "We don't race to the bottom — pay for results, not shortcuts.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Pros Only",
    desc: "ID-checked, skill-tested. Top-ranked — including world-first guild members.",
  },
  {
    icon: Headset,
    title: "24/7 Human Support",
    desc: "Live chat with agents. Instant updates.",
  },
];

interface WhyChooseUsProps {
  embedded?: boolean;
}

export const Dota2WhyChooseUs = ({ embedded = false }: WhyChooseUsProps = {}) => {
  const grid = embedded
    ? "grid gap-3 sm:grid-cols-2"
    : "grid gap-4 sm:grid-cols-2 lg:grid-cols-4";
  const heading = embedded ? "mb-6" : "mb-10 text-center";
  const inner = (
    <>
      <h2 className={`${heading} text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl`}>
        Why <span className="text-primary glow-text">Choose Us</span>
      </h2>
      <div className={grid}>
        {PILLARS.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-border/50 bg-card p-5 transition-colors hover:border-primary/40"
          >
            <Icon className="h-7 w-7 text-primary" />
            <h3 className="mt-3 text-sm font-bold uppercase tracking-wider text-foreground">
              {title}
            </h3>
            <p className="mt-2 text-xs text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </>
  );
  if (embedded) return <div className="mt-10">{inner}</div>;
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">{inner}</div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*  SEO description section                                                    */
/* -------------------------------------------------------------------------- */
export const Dota2SeoSection = ({ serviceId, embedded = false }: EmbeddableProps) => {
  const meta = dota2ServiceMeta[serviceId];
  if (!meta) return null;
  const inner = (
    <div className="rounded-2xl border border-border/40 bg-card/40 p-6 md:p-8">
      <h2 className="text-xl font-black uppercase tracking-tight text-foreground md:text-2xl">
        {meta.seoSection.title}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        {meta.seoSection.text}
      </p>
    </div>
  );
  if (embedded) return <div className="mt-10">{inner}</div>;
  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">{inner}</div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*  Footer trust badges — Secure / Fast / 24/7                                */
/* -------------------------------------------------------------------------- */
export const Dota2FooterTrustBadges = () => (
  <section className="py-8">
    <div className="container mx-auto px-4">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground opacity-80">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span>Secure</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <span>Fast</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <span>24/7 Support</span>
        </div>
      </div>
    </div>
  </section>
);

/* -------------------------------------------------------------------------- */
/*  Service bottom — wraps Your Wins, How It Works, Why Us, SEO, Trust Row    */
/* -------------------------------------------------------------------------- */
export const Dota2ServiceBottom = ({ serviceId }: BaseProps) => (
  <>
    <Dota2YourWins serviceId={serviceId} />
    <Dota2HowItWorks serviceId={serviceId} />
    <Dota2WhyChooseUs />
    <Dota2SeoSection serviceId={serviceId} />
    <Dota2FooterTrustBadges />
  </>
);
