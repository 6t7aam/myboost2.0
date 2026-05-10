import { Button } from "@/components/ui/button";
import { ChevronRight, Zap, ShieldCheck, Trophy, Users } from "lucide-react";
import Particles from "@/components/Particles";
import { motion, useReducedMotion } from "framer-motion";

const TITLE_WORDS = ["Level", "Up", "Your", "Game"];

const Hero = () => {
  const reduced = useReducedMotion();

  const scrollToGames = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const wordVariant = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  const subtitleVariant = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const ctaVariant = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
  };

  const statsItemVariant = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  const instantlyVariant = {
    initial: {
      opacity: 0,
      scale: 1.4,
      textShadow: "0 0 60px rgba(255,215,0,0.9)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      textShadow: "0 0 20px rgba(255,215,0,0.6)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(48_100%_50%_/_0.08)_0%,_transparent_60%)]" />
      <div className="absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px] animate-pulse-glow" />
      <div className="absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-primary/3 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 left-1/4 h-[250px] w-[250px] rounded-full bg-primary/3 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />

      {/* Animated particles */}
      <Particles count={50} />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]" />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8 glow-box backdrop-blur-cyber"
        >
          <Zap className="h-4 w-4 animate-pulse" />
          <span className="font-semibold">Trusted by 10,000+ Players</span>
        </motion.div>

        <h1 className="mx-auto max-w-5xl text-5xl font-black uppercase leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
          {TITLE_WORDS.map((w, i) => (
            <motion.span
              key={w + i}
              variants={reduced ? undefined : wordVariant}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.1 + i * 0.08 }}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}{" "}
          <motion.span
            variants={reduced ? undefined : instantlyVariant}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.45 }}
            className="text-primary instantly-glow inline-block"
          >
            Instantly
          </motion.span>
        </h1>

        <motion.p
          variants={reduced ? undefined : subtitleVariant}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.7 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Professional boosting services for competitive games. Fast, safe, and powered by top-tier verified players.
        </motion.p>

        <motion.div
          variants={reduced ? undefined : ctaVariant}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.85, type: "spring", stiffness: 300, damping: 20 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button onClick={scrollToGames} size="lg" className="group rounded-xl glow-box-intense btn-yellow cta-pulse px-8 text-base font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-[0_0_50px_hsl(48_100%_50%_/_0.4)]">
            Get Boosted
            <ChevronRight className="ml-1 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button onClick={scrollToGames} size="lg" variant="outline" className="group rounded-xl border-primary/40 px-8 text-base font-bold uppercase tracking-wider text-primary hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105 hover:border-primary/60">
            View Services
          </Button>
        </motion.div>

        {/* Enhanced trust strip */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-muted-foreground">
          {[
            { Icon: ShieldCheck, label: "100% Safe" },
            { Icon: Zap, label: "15 min start" },
            { Icon: Trophy, label: "Professional Boosters" },
            { Icon: Users, label: "10,000+ orders" },
          ].map(({ Icon, label }, i) => (
            <motion.span
              key={label}
              variants={reduced ? undefined : statsItemVariant}
              initial="initial"
              animate="animate"
              transition={{ delay: 1.0 + i * 0.1 }}
              className="flex items-center gap-2 transition-all duration-300 hover:text-primary hover:scale-110"
            >
              <Icon className="h-5 w-5 text-primary drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" /> {label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
