import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const RouteProgressBar = () => {
  const location = useLocation();
  const reduced = useReducedMotion();
  const [step, setStep] = useState<"idle" | "loading" | "done">("idle");

  useEffect(() => {
    if (reduced) return;
    setStep("loading");
    const t1 = window.setTimeout(() => setStep("done"), 220);
    const t2 = window.setTimeout(() => setStep("idle"), 520);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [location.pathname, reduced]);

  if (reduced || step === "idle") return null;

  const width = step === "loading" ? "70%" : "100%";
  const opacity = step === "done" ? 0 : 1;

  return (
    <motion.div
      aria-hidden
      initial={{ width: "0%", opacity: 1 }}
      animate={{ width, opacity }}
      transition={{
        width: {
          duration: step === "loading" ? 0.2 : 0.1,
          ease: "easeOut",
        },
        opacity: { duration: 0.2, delay: step === "done" ? 0.1 : 0, ease: "easeOut" },
      }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 2,
        zIndex: 9999,
        background: "linear-gradient(90deg, #FFD700, #FFF8DC, #FFD700)",
        boxShadow: "0 0 10px rgba(255, 215, 0, 0.6)",
        pointerEvents: "none",
      }}
    />
  );
};

export default RouteProgressBar;
