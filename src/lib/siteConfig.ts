export const SITE_NAME = "MyBoost";
export const SITE_URL = "https://www.myboost.top";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/dota2/dota2-mmr-boost.webp`;

export const SITE_SOCIAL_LINKS = [
  "https://discord.com/users/geroj2",
];

export const CANONICAL_PATHS = {
  home: "/",
  rustBoosting: "/rust-boosting",
  dota2Boosting: "/dota-2-boosting",
  cs2Boosting: "/cs2-boosting",
  arenaBreakoutBoosting: "/arena-breakout-boosting",
  arenaBreakoutKoens: "/arena-breakout-koens",
  arenaBreakoutRaids: "/arena-breakout-raids",
  arenaBreakoutCoaching: "/arena-breakout-coaching",
  terms: "/terms",
  privacy: "/privacy",
  refund: "/refund",
} as const;

export const LEGACY_REDIRECTS = [
  { source: "/game/rust", destination: CANONICAL_PATHS.rustBoosting },
  { source: "/game/dota-2", destination: CANONICAL_PATHS.dota2Boosting },
  { source: "/game/cs2", destination: CANONICAL_PATHS.cs2Boosting },
  { source: "/game/arena-breakout", destination: CANONICAL_PATHS.arenaBreakoutBoosting },
  { source: "/arena-breakout-infinite-boosting", destination: CANONICAL_PATHS.arenaBreakoutBoosting },
  { source: "/buy-arena-breakout-infinite-koens", destination: CANONICAL_PATHS.arenaBreakoutKoens },
  { source: "/arena-breakout-infinite-raids-boost", destination: CANONICAL_PATHS.arenaBreakoutRaids },
  { source: "/arena-breakout-infinite-coaching", destination: CANONICAL_PATHS.arenaBreakoutCoaching },
] as const;

export const toAbsoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path}`;
