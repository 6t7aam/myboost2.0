import { useEffect, useState } from "react";

export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > threshold : false
  );

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
