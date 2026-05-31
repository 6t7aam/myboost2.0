import { Link } from "react-router-dom";
import { Check, ChevronRight, Shield, ShieldCheck, Wallet, BadgeCheck, Headset, Star, Zap } from "lucide-react";
import { gameConfigs } from "@/data/gameConfigs";
import { cs2ServiceMeta } from "@/data/cs2ServiceMeta";

interface BaseProps {
  serviceId: string;
}

const cs2Config = gameConfigs["cs2"];

export const Cs2Breadcrumbs = ({ serviceId }: BaseProps) => {
  const service = cs2Config.services.find((item) => item.id === serviceId);
  const label = service?.name ?? serviceId;

  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="transition-colors hover:text-primary">Home</Link>
        </li>
        <ChevronRight className="h-3 w-3 opacity-60" />
        <li>
          <Link to="/game/cs2" className="transition-colors hover:text-primary">CS2</Link>
        </li>
        <ChevronRight className="h-3 w-3 opacity-60" />
        <li className="font-semibold text-foreground/80">{label}</li>
      </ol>
    </nav>
  );
};

export const Cs2TrustBar = ({ serviceId }: BaseProps) => {
  const service = cs2Config.services.find((item) => item.id === serviceId);

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-muted-foreground">
      <div className="flex items-center gap-1.5">
        <ShieldCheck className="h-3.5 w-3.5 text-primary" />
        <span className="font-semibold text-foreground">Manual Service</span>
      </div>
      <span className="opacity-40">|</span>
      <span>
        <span className="font-semibold text-foreground">{service?.estimatedTime ?? cs2Config.stats.speed}</span> delivery
      </span>
      <span className="opacity-40">|</span>
      <span className="font-semibold text-foreground">Refund Guarantee</span>
    </div>
  );
};

export const Cs2FeatureTags = ({ serviceId }: BaseProps) => {
  const meta = cs2ServiceMeta[serviceId];
  if (!meta) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {meta.tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-foreground/90"
        >
          <BadgeCheck className="h-3.5 w-3.5 text-primary" />
          <span>{tag}</span>
        </span>
      ))}
    </div>
  );
};

export const Cs2ServiceBenefits = ({ serviceId }: BaseProps) => {
  const meta = cs2ServiceMeta[serviceId];
  if (!meta) return null;

  return (
    <div className="mt-10">
      <h2 className="mb-6 text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
        Service <span className="text-primary glow-text">Benefits</span>
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {meta.benefits.map((benefit) => (
          <div key={benefit} className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/50 p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/25">
              <Check className="h-4 w-4 text-primary" />
            </span>
            <span className="self-center text-sm text-foreground/90">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Cs2HowItWorks = ({ serviceId }: BaseProps) => {
  const meta = cs2ServiceMeta[serviceId];
  if (!meta) return null;

  return (
    <div className="mt-10">
      <h2 className="mb-6 text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl">
        How It <span className="text-primary glow-text">Works</span>
      </h2>
      <div className="grid gap-4">
        {meta.steps.map((step, idx) => (
          <div
            key={step}
            className="relative rounded-2xl border border-primary/30 bg-card p-5 shadow-[0_0_20px_hsl(48_100%_50%_/_0.08)]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-base font-black text-primary">
                {idx + 1}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold uppercase tracking-wider text-primary">Step {idx + 1}</div>
                <h3 className="mt-1 text-base font-bold text-foreground">{step}</h3>
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
    title: "Safe & Manual Service",
    desc: "Manual boosting only — no bots, cheats, or third-party software on your account.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    desc: "Clear packages with visible rates that update live as you change options.",
  },
  {
    icon: BadgeCheck,
    title: "Verified CS2 PROs",
    desc: "Experienced players with high KD who know maps, economy, and clutch pressure.",
  },
  {
    icon: Headset,
    title: "24/7 Human Support",
    desc: "Live order updates and help whenever you need status or want to adjust your boost.",
  },
];

export const Cs2WhyChooseUs = () => (
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

export const Cs2OrderSummaryBar = ({ serviceId }: BaseProps) => {
  const service = cs2Config.services.find((item) => item.id === serviceId);

  return (
    <div className="mt-4 grid gap-3 rounded-xl border border-border/40 bg-card/40 p-4 text-xs sm:grid-cols-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Shield className="h-3.5 w-3.5 text-primary" />
        <span>Manual CS2 service only</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <Zap className="h-3.5 w-3.5 text-primary" />
        <span>15 min average start time</span>
      </div>
      <div className="flex items-center gap-2 text-muted-foreground">
        <BadgeCheck className="h-3.5 w-3.5 text-primary" />
        <span>{service?.estimatedTime ?? cs2Config.stats.speed} delivery</span>
      </div>
    </div>
  );
};
