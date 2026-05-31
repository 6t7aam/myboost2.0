import { CANONICAL_PATHS } from "@/lib/siteConfig";

export const HUB_PATHS = {
  rust: CANONICAL_PATHS.rustBoosting,
  "dota-2": CANONICAL_PATHS.dota2Boosting,
  cs2: CANONICAL_PATHS.cs2Boosting,
  "arena-breakout": CANONICAL_PATHS.arenaBreakoutBoosting,
} as const;

export const getArenaBreakoutServicePath = (serviceId: string) => {
  switch (serviceId) {
    case "koens-farming":
      return CANONICAL_PATHS.arenaBreakoutKoens;
    case "raids-boost":
      return CANONICAL_PATHS.arenaBreakoutRaids;
    case "coaching":
      return CANONICAL_PATHS.arenaBreakoutCoaching;
    default:
      return `/game/arena-breakout/${serviceId}`;
  }
};

export const getDota2ServicePath = (serviceId: string) => `/game/dota-2/${serviceId}`;
export const getCs2ServicePath = (serviceId: string) => `/game/cs2/${serviceId}`;
export const getRustServicePath = (serviceSlug: string) => `/game/rust/${serviceSlug}`;
