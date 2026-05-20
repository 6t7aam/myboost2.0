import type { Variants } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const make = (s: number): Record<string, Variants> => ({
  // Generic: subtle slide up + unblur. Used as fallback.
  generic: {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 * s, ease },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.25 * s, ease: "easeIn" },
    },
  },

  // Home: confident vertical entry; scale down + blur on exit.
  home: {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 * s, ease, when: "beforeChildren", staggerChildren: 0.04 },
    },
    exit: {
      opacity: 0,
      y: -12,
      transition: { duration: 0.25 * s, ease: "easeIn" },
    },
  },

  // Game category: lift up; cards exit toward sides via inner stagger.
  gameCategory: {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 * s, ease },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 * s, ease: "easeIn" },
    },
  },

  // ABI grid: tactical lift + slide left on exit.
  abiGrid: {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 * s, ease },
    },
    exit: {
      opacity: 0,
      x: -30,
      transition: { duration: 0.2 * s, ease: "easeIn" },
    },
  },

  // Dota 2 category: rise from darkness; fade-out long enough to feel switch-screen.
  dotaCategory: {
    initial: { opacity: 0, y: 24, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45 * s, ease },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: 0.3 * s, ease: "easeIn" },
    },
  },

  // Service detail (split-screen reveal). Children handle the left/right slide.
  service: {
    initial: { opacity: 0, y: 16 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35 * s, ease, when: "beforeChildren", staggerChildren: 0.05 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 * s, ease: "easeIn" },
    },
  },

  // Cart: swift in, slide left on exit.
  cart: {
    initial: { opacity: 0, x: 30 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 * s, ease },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: { duration: 0.2 * s, ease: "easeIn" },
    },
  },

  // Booster selection: scale-in title, children slide from sides.
  booster: {
    initial: { opacity: 0, scale: 0.96 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 * s, ease, when: "beforeChildren", staggerChildren: 0.05 },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.2 * s, ease: "easeIn" },
    },
  },

  // Payment / order: vault feel — lift in, panels merge on exit.
  payment: {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 * s, ease, when: "beforeChildren", staggerChildren: 0.06 },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.25 * s, ease: "easeIn" },
    },
  },
});

export function getTransitionKey(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname === "/order") return "payment";
  if (pathname === "/choose-booster") return "booster";
  if (pathname === "/cart") return "cart";
  if (pathname === "/game/arena-breakout") return "abiGrid";
  if (pathname.startsWith("/game/dota-2/")) return "service";
  if (pathname === "/game/dota-2") return "dotaCategory";
  if (pathname.startsWith("/game/arena-breakout/")) return "service";
  if (
    pathname.startsWith("/arena-breakout-infinite-") ||
    pathname.startsWith("/buy-arena-breakout-infinite-")
  ) {
    return "service";
  }
  return "generic";
}

export function getVariants(pathname: string, speedMultiplier: number): Variants {
  const dict = make(speedMultiplier);
  const key = getTransitionKey(pathname);
  return dict[key] || dict.generic;
}

export const reducedVariants: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 1, transition: { duration: 0 } },
  exit: { opacity: 1, transition: { duration: 0 } },
};
