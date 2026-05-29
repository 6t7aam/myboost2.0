import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Gamepad2, ShieldCheck, Zap, Headset, BadgeCheck, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Particles from "@/components/Particles";

interface AuthShellProps {
  icon: ReactNode;
  title: ReactNode;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

const benefits = [
  { Icon: BadgeCheck, text: "Verified PRO players only" },
  { Icon: ShieldCheck, text: "100% secure & confidential" },
  { Icon: Zap, text: "Instant 15-minute start" },
  { Icon: Headset, text: "24/7 live support" },
];

const stats = [
  { value: "2,400+", label: "Orders" },
  { value: "4.9★", label: "Rating" },
  { value: "24/7", label: "Support" },
];

const AuthShell = ({ icon, title, subtitle, children, footer }: AuthShellProps) => {
  const reduced = useReducedMotion();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT — brand / value panel (full height) */}
        <div className="relative hidden flex-col justify-center overflow-hidden border-r border-primary/15 bg-[linear-gradient(155deg,_#0c0c0c_0%,_#161616_55%,_#0a0a0a_100%)] px-12 pb-12 pt-28 lg:flex xl:px-20">
          {!reduced && <Particles count={48} />}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, hsl(48 100% 50%) 0, hsl(48 100% 50%) 1px, transparent 1px, transparent 18px)",
            }}
          />
          <div className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

          <motion.div
            initial={reduced ? false : { opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 mx-auto w-full max-w-md"
          >
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
                <Gamepad2 className="h-5 w-5 text-primary" />
              </span>
              <span className="text-2xl font-black uppercase tracking-tight text-foreground">
                My<span className="text-primary glow-text">Boost</span>
              </span>
            </Link>

            <h2 className="mt-10 text-4xl font-black uppercase leading-[1.05] tracking-tight text-foreground xl:text-5xl">
              Level up with <span className="text-primary glow-text">the pros</span>
            </h2>
            <p className="mt-4 max-w-md text-base text-muted-foreground">
              Join thousands of gamers boosting their rank — fast, safe, and handled by verified professionals.
            </p>

            <ul className="mt-9 space-y-4">
              {benefits.map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-[15px] text-foreground/90">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/12 ring-1 ring-primary/25">
                    <Icon className="h-4 w-4 text-primary" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <div className="flex items-center gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary" />
                ))}
                <span className="ml-2 text-xs text-muted-foreground">Rated 4.9/5 by 2,400+ gamers</span>
              </div>
              <div className="mt-5 grid max-w-md grid-cols-3 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-primary/15 bg-background/40 px-3 py-3 text-center">
                    <p className="text-lg font-black text-primary glow-text">{s.value}</p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — form panel (full height) */}
        <div className="relative flex flex-col px-6 pb-8 pt-24 sm:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(48_100%_50%_/_0.06)_0%,_transparent_55%)]" />

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 flex flex-1 items-center justify-center"
          >
            <div className="w-full max-w-sm">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/30">
                  {icon}
                </div>
                <h1 className="text-2xl font-black uppercase tracking-tight text-foreground">{title}</h1>
                <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
              </div>

              <div className="mt-7">{children}</div>

              {footer && <div className="mt-6">{footer}</div>}
            </div>
          </motion.div>

          {/* trust strip pinned to bottom */}
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> SSL Encrypted</span>
            <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5 text-primary" /> 15 min start</span>
            <span className="flex items-center gap-1.5"><BadgeCheck className="h-3.5 w-3.5 text-primary" /> Verified PROs</span>
            <span className="flex items-center gap-1.5"><Headset className="h-3.5 w-3.5 text-primary" /> 24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthShell;
