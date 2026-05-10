import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollTargets: Record<string, string> = {
  // Service purchase pages — scroll to the order/configurator card
  "/game/arena-breakout/raids-boost": "#order-card",
  "/game/arena-breakout/koens-farming": "#order-card",
  "/game/arena-breakout/coaching": "#order-card",
  "/game/arena-breakout/rent-a-booster": "#order-card",
  "/game/arena-breakout/titanium-case": "#order-card",
  "/game/arena-breakout/warlord-tournament": "#order-card",
  "/game/dota-2/mmr-boost": "#order-card",
  "/game/dota-2/lp-removal": "#order-card",
  "/game/dota-2/rank-tokens": "#order-card",
  "/game/dota-2/coaching": "#order-card",

  // Category and other pages — scroll to top
  "/": "top",
  "/cart": "top",
  "/order": "top",
  "/choose-booster": "top",
  "/game/arena-breakout": "top",
  "/game/dota-2": "top",
};

const scrollTopInstant = () => {
  if (typeof window === "undefined") return;
  try {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  } catch {
    window.scrollTo(0, 0);
  }
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const target = scrollTargets[pathname] ?? "top";

    if (target === "top") {
      scrollTopInstant();
      return;
    }

    // Reset to top first so the page never appears mid-scroll, then smooth-scroll
    // to the target element after the page enter animation has begun.
    scrollTopInstant();

    const start = Date.now();
    let frame = 0;
    let cancelled = false;

    const tryScroll = () => {
      if (cancelled) return;
      const el = document.querySelector(target) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      if (Date.now() - start > 500) return;
      frame = requestAnimationFrame(tryScroll);
    };

    const timeoutId = window.setTimeout(tryScroll, 50);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
