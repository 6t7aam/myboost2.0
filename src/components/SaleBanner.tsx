import { motion, useReducedMotion } from "framer-motion";
import { Flame, Clock, Percent } from "lucide-react";
import { SALE_ACTIVE, SALE_BADGE_LABEL, GLOBAL_SALE_PERCENT } from "@/config/pricing";

const SaleBanner = () => {
  const reduced = useReducedMotion();

  if (!SALE_ACTIVE) return null;

  return (
    <section className="relative overflow-hidden border-y border-primary/30 bg-gradient-to-r from-primary/[0.06] via-primary/[0.12] to-primary/[0.06] py-5">
      {/* Animated shimmer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, transparent 0%, hsl(48 100% 50% / 0.07) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />
      </div>

      {/* Glow accents */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-primary/20 blur-[60px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-primary/20 blur-[60px]" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-8"
        >
          {/* Badge */}
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-black uppercase tracking-[0.2em] text-primary drop-shadow-[0_0_10px_hsl(48_100%_50%_/_0.5)]">
              {SALE_BADGE_LABEL}
            </span>
            <Flame className="h-5 w-5 text-primary animate-pulse" />
          </div>

          {/* Main message */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-primary/50 bg-primary/10 shadow-[0_0_20px_hsl(48_100%_50%_/_0.25)]">
              <Percent className="h-6 w-6 text-primary" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-background">
                {GLOBAL_SALE_PERCENT}
              </span>
            </span>
            <div className="text-center md:text-left">
              <p className="text-lg font-black uppercase tracking-tight text-foreground md:text-xl">
                {GLOBAL_SALE_PERCENT}% OFF <span className="text-primary">Everything</span>
              </p>
              <p className="text-xs text-muted-foreground">
                All services across all games — limited time only
              </p>
            </div>
          </div>

          {/* Urgency */}
          <div className="flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-bold text-primary backdrop-blur-sm">
            <Clock className="h-3.5 w-3.5" />
            <span>Ends Soon</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SaleBanner;
