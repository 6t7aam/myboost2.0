import { Zap, ShieldCheck, Trophy } from "lucide-react";
import Particles from "@/components/Particles";
import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = () => {
  const reduced = useReducedMotion();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Delay heavy animations until after initial render
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden pt-24 pb-10">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(48_100%_50%_/_0.08)_0%,_transparent_60%)]" />
      <div className="absolute top-1/3 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px] animate-pulse-glow" />
      <div className="absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-primary/3 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 left-1/4 h-[250px] w-[250px] rounded-full bg-primary/3 blur-[100px] animate-float" style={{ animationDelay: '2s' }} />

      {/* Animated particles - load after initial render */}
      {isReady && <Particles count={50} />}

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
          <span className="font-semibold">Orders Start in 15 Minutes</span>
        </motion.div>

        <motion.h1
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-5xl uppercase leading-[1.05] tracking-tight text-foreground text-center"
          style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 900 }}
        >
          Level Up Your Game
        </motion.h1>

        <motion.div
          initial={reduced ? false : { y: 16, opacity: 0 }}
          animate={
            reduced
              ? { y: 0, opacity: 1 }
              : {
                  y: 0,
                  opacity: 1,
                  textShadow: [
                    "0 0 0px rgba(255,215,0,0)",
                    "0 0 18px rgba(255,215,0,0.18)",
                    "0 0 8px rgba(255,215,0,0.12)",
                  ],
                }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  y: { duration: 0.5, delay: 0.35, ease: [0.34, 1.56, 0.64, 1] },
                  opacity: { duration: 0.4, delay: 0.35, ease: "easeOut" },
                  textShadow: { duration: 0.5, delay: 0.35, times: [0, 0.5, 1], ease: "easeOut" },
                }
          }
          className="mt-1 mx-auto block uppercase tracking-tight text-primary text-center"
          style={{
            fontSize: "clamp(52px, 8vw, 110px)",
            fontWeight: 900,
            lineHeight: 1,
            opacity: 0
          }}
        >
          Instantly
        </motion.div>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
        >
          Premium gaming marketplace for competitive titles. Fast, secure, and fulfilled by verified PRO players.
        </motion.p>

        {/* Enhanced trust strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm text-muted-foreground">
          {[
            { Icon: ShieldCheck, label: "100% Safe" },
            { Icon: Zap, label: "15 min start" },
            { Icon: Trophy, label: "Verified PRO Players" },
          ].map(({ Icon, label }, i) => (
            <motion.span
              key={label}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 1.1 + i * 0.08, ease: "easeOut" }}
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
