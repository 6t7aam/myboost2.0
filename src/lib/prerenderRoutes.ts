import { gameConfigs } from "@/data/gameConfigs";
import { rustServices } from "@/data/rustServices";
import { CANONICAL_PATHS } from "@/lib/siteConfig";

const dotaDetailRoutes = gameConfigs["dota-2"].services.map(
  (service) => `/game/dota-2/${service.id}`
);

const cs2DetailRoutes = gameConfigs.cs2.services.map(
  (service) => `/game/cs2/${service.id}`
);

const arenaDetailRoutes = gameConfigs["arena-breakout"].services
  .filter((service) => !["koens-farming", "raids-boost", "coaching"].includes(service.id))
  .map((service) => `/game/arena-breakout/${service.id}`);

const rustDetailRoutes = rustServices.map(
  (service) => `/game/rust/${service.slug}`
);

export const CANONICAL_SITEMAP_PATHS = [
  CANONICAL_PATHS.home,
  CANONICAL_PATHS.rustBoosting,
  CANONICAL_PATHS.dota2Boosting,
  CANONICAL_PATHS.cs2Boosting,
  CANONICAL_PATHS.arenaBreakoutBoosting,
  CANONICAL_PATHS.arenaBreakoutKoens,
  CANONICAL_PATHS.arenaBreakoutRaids,
  CANONICAL_PATHS.arenaBreakoutCoaching,
  ...dotaDetailRoutes,
  ...cs2DetailRoutes,
  ...arenaDetailRoutes,
  ...rustDetailRoutes,
  CANONICAL_PATHS.terms,
  CANONICAL_PATHS.privacy,
  CANONICAL_PATHS.refund,
] as const;

export const PRERENDER_PATHS = [
  ...CANONICAL_SITEMAP_PATHS,
  "/game/dota-2/mmr-boost",
  "/game/dota-2/lp-removal",
  "/game/dota-2/rank-tokens",
  "/game/dota-2/coaching",
];
