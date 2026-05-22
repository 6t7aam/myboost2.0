import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Check, ChevronRight, Shield, Wallet, BadgeCheck, Headset, Star, Zap } from "lucide-react";
import { gameConfigs } from "@/data/gameConfigs";
import { arenaBreakoutServiceMeta } from "@/data/arenaBreakoutServiceMeta";
import { arenaBreakoutSEO } from "@/data/arenaBreakoutSEO";

interface BaseProps {
  serviceId: string;
}

const abiConfig = gameConfigs["arena-breakout"];

export const ArenaBreakoutBreadcrumbs = ({ serviceId }: BaseProps) => {
  const service = abiConfig.services.find((item) => item.id === serviceId);
  const label = service?.name ?? serviceId;

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
          <Link to="/game/arena-breakout" className="transition-colors hover:text-primary">
            Arena Breakout
          </Link>
        </li>
        <ChevronRight className="h-3 w-3 opacity-60" />
        <li className="font-semibold text-foreground/80">{label}</li>
      </ol>
    </nav>
  );
};

export const ArenaBreakoutTrustBar = ({ serviceId }: BaseProps) => {
  const service = abiConfig.services.find((item) => item.id === serviceId);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <span className="flex items-center text-primary">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
          ))}
        </span>
        <span className="font-semibold text-foreground">{abiConfig.stats.rating} / 5</span>
      </div>
      <span className="opacity-40">|</span>
      <span>
        <span className="font-semibold text-foreground">{abiConfig.stats.orders}</span> completed orders
      </span>
      <span className="opacity-40">|</span>
      <span>
        <span className="font-semibold text-foreground">{service?.estimatedTime ?? abiConfig.stats.speed}</span> delivery
      </span>
    </div>
  );
};

export const ArenaBreakoutFeatureTags = ({ serviceId }: BaseProps) => {
  const meta = arenaBreakoutServiceMeta[serviceId];
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

export const ArenaBreakoutYourWins = ({ serviceId }: BaseProps) => {
  const meta = arenaBreakoutServiceMeta[serviceId];
  if (!meta) return null;

  return (
    <div className="mt-10">
      <h2 className="mb-6 text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
        Your <span className="text-primary glow-text">Wins</span>
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {meta.wins.map((win) => (
          <li key={win} className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/50 p-4">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <span className="text-sm text-foreground/90">{win}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ArenaBreakoutHowItWorks = ({ serviceId }: BaseProps) => {
  const meta = arenaBreakoutServiceMeta[serviceId];
  if (!meta) return null;

  return (
    <div className="mt-10">
      <h2 className="mb-6 text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
        How It <span className="text-primary glow-text">Works</span>
      </h2>
      <div className="grid gap-4">
        {meta.steps.map((step, idx) => (
          <Fragment key={step.title}>
            <div className="relative rounded-2xl border border-primary/30 bg-card p-5 shadow-[0_0_20px_hsl(48_100%_50%_/_0.08)]">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-base font-black text-primary">
                  {step.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">Step {idx + 1}</div>
                  <h3 className="mt-1 text-base font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const PILLARS = [
  {
    icon: Shield,
    title: "Safe Delivery Protocol",
    desc: "Manual service only, smart handling, and no shady software shortcuts.",
  },
  {
    icon: Wallet,
    title: "Clear Pricing",
    desc: "Straightforward packages with visible rates and no hidden upsells.",
  },
  {
    icon: BadgeCheck,
    title: "Verified PROs",
    desc: "Experienced ABI players who know routes, loot value, and PvP pressure.",
  },
  {
    icon: Headset,
    title: "24/7 Human Support",
    desc: "Live updates and help whenever you need order status or clarification.",
  },
];

export const ArenaBreakoutWhyChooseUs = () => (
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

export const ArenaBreakoutSeoSection = ({ serviceId }: BaseProps) => {
  const seo = arenaBreakoutSEO[serviceId];
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

export const ArenaBreakoutOrderSummaryBar = ({ serviceId }: BaseProps) => {
  const service = abiConfig.services.find((item) => item.id === serviceId);

  return (
    <div className="mt-4 grid gap-3 rounded-xl border border-border/40 bg-card/40 p-4 text-xs sm:grid-cols-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Shield className="h-3.5 w-3.5 text-primary" />
        <span>Manual ABI service only</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Zap className="h-3.5 w-3.5 text-primary" />
        <span>15 min average start time</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <BadgeCheck className="h-3.5 w-3.5 text-primary" />
        <span>{service?.estimatedTime ?? abiConfig.stats.speed} delivery</span>
      </div>
    </div>
  );
};
