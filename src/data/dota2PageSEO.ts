/**
 * Unique SEO metadata for every Dota 2 service page.
 *
 * One entry per service. Each one provides distinct title, description,
 * Open Graph and Twitter strings so no two Dota 2 pages share metadata.
 *
 * Keys = route slugs as wired in App.tsx:
 *   /game/dota-2/mmr-service           → "mmr-service"
 *   /game/dota-2/calibration-service   → "calibration-service"
 *   /game/dota-2/lp-removal          → "lp-removal"
 *   /game/dota-2/behavior-score-service→ "behavior-score-service"
 *   /game/dota-2/win-rate-service      → "win-rate-service"
 *   /game/dota-2/battle-cup          → "battle-cup"
 *   /game/dota-2/rank-tokens         → "rank-tokens"
 *   /game/dota-2/coaching            → "coaching"
 */

export interface Dota2PageSEO {
  /** <title> — keep 50-65 chars, primary keyword first, ends with "| MyBoost". */
  title: string;
  /** meta description — 140-170 chars, sales-driven, distinct from title. */
  description: string;
  /** comma-separated keyword list — relevant, no stuffing. */
  keywords: string;
  /** canonical URL — must match the route. */
  canonicalUrl: string;
  /** og:image absolute URL — defaults fall back to the service hero image. */
  ogImage: string;
  /** Distinct Open Graph title for social shares. */
  ogTitle: string;
  /** Distinct Open Graph description for social shares. */
  ogDescription: string;
  /** Distinct Twitter title — usually punchier than OG. */
  twitterTitle: string;
  /** Distinct Twitter description — tightened for ~200 chars. */
  twitterDescription: string;
}

const BASE_URL = "https://www.myboost.top";
const img = (path: string) => `${BASE_URL}${path}`;

export const dota2PageSEO: Record<string, Dota2PageSEO> = {
  "mmr-service": {
    title: "Dota 2 MMR Service – Climb Ranks with Immortals | MyBoost",
    description:
      "Buy Dota 2 MMR Service from Immortal-tier players. Solo or Duo path, 15-minute start, low behavior accounts supported. Climb Herald to Immortal safely.",
    keywords:
      "dota 2 mmr service, buy mmr service, dota 2 services, immortal service, rank services service, dota 2 rank up, dota 2 solo service, dota 2 duo service",
    canonicalUrl: `${BASE_URL}/game/dota-2/mmr-service`,
    ogImage: img("/images/dota2/dota2-mmr-service.webp"),
    ogTitle: "Buy Dota 2 MMR Service – Skip the Grind, Lock Your Rank",
    ogDescription:
      "Professional MMR Services by Immortal-ranked players. Position and hero flex, live match tracking, and a 100% money-back guarantee on every order.",
    twitterTitle: "Dota 2 MMR Service – Reach Any Rank with Immortal Pros",
    twitterDescription:
      "Climb Dota 2 ranks fast. Piloted or Duo service from $3, full VPN-backed account safety, 15-minute start time.",
  },

  "calibration-service": {
    title: "Dota 2 Calibration Service – Top Placement Matches | MyBoost",
    description:
      "Complete your Dota 2 calibration with Immortal players and lock in the highest possible MMR placement. Up to 30 matches, fast start, ban-safe service.",
    keywords:
      "dota 2 calibration service, calibration matches service, ranked calibration service, high mmr calibration, dota 2 placement service, dota 2 fresh account calibration",
    canonicalUrl: `${BASE_URL}/game/dota-2/calibration-service`,
    ogImage: img("/images/dota2/calibration-service.webp"),
    ogTitle: "Dota 2 Calibration Service – Secure a High Starting MMR",
    ogDescription:
      "Skip the placement grind. Immortal pros run your calibration games with optimal hero picks for the strongest possible starting rank.",
    twitterTitle: "Dota 2 Calibration Service – High MMR from Game One",
    twitterDescription:
      "1-30 calibration matches handled by Immortal players. Best possible rank placement, starting at $3 per match.",
  },

  "lp-removal": {
    title: "Dota 2 Low Priority Removal – Exit LP Queue Fast | MyBoost",
    description:
      "Buy Dota 2 LP Removal and escape the Single Draft pool in under 24 hours. Veteran specialists, ban-safe play, ranked access restored. From $5 per game.",
    keywords:
      "low priority removal, dota 2 lp removal, remove low priority, dota 2 behavior recovery, lp queue exit, single draft removal, dota 2 ranked unlock",
    canonicalUrl: `${BASE_URL}/game/dota-2/lp-removal`,
    ogImage: img("/images/dota2/dota2-lp-removal.webp"),
    ogTitle: "Dota 2 LP Removal – Out of Low Priority in 24 Hours",
    ogDescription:
      "Stuck in Low Priority? Our LP specialists win your Single Draft games and restore Battle Pass progress, item drops, and full ranked queue access.",
    twitterTitle: "Escape Dota 2 Low Priority Fast – Pro LP Removal",
    twitterDescription:
      "LP queue cleared within 24 hours by veteran players. Safe, fast, no bans. From $5 per game.",
  },

  "behavior-score-service": {
    title: "Dota 2 Behavior Score Service – Reach 12k Safely | MyBoost",
    description:
      "Recover your Dota 2 behavior score to 12,000 with clean, report-free matches. Unlock chat, voice and full ranked queue. Works from any starting score.",
    keywords:
      "behavior score service, dota 2 behavior score, improve behavior score, unlock ranked matchmaking, conduct tier service, dota 2 chat unlock, dota 2 12k score",
    canonicalUrl: `${BASE_URL}/game/dota-2/behavior-score-service`,
    ogImage: img("/images/dota2/behavior-score-service.webp"),
    ogTitle: "Dota 2 Behavior Score Service – Unlock Full Matchmaking",
    ogDescription:
      "Tired of long queues and toxic pools? Our pros raise your behavior score to the clean player pool — voice, chat and ranked queue all restored.",
    twitterTitle: "Dota 2 Behavior Score Service – Clean Tier in Days",
    twitterDescription:
      "From any score up to 12,000. Clean matches only, no exploits. Full client features restored. From $5 per 1k score.",
  },

  "win-rate-service": {
    title: "Dota 2 Win Rate Service – Buy Wins from Pro Pros | MyBoost",
    description:
      "Level up your Dota 2 win rate with Immortal players. Pick 1-50 wins, play or spectate. Stop losing streaks fast with $3-per-win pricing and elite carries.",
    keywords:
      "dota 2 win rate service, ranked wins service, increase winrate dota 2, buy dota 2 wins, normal match service, dota 2 winrate carry",
    canonicalUrl: `${BASE_URL}/game/dota-2/win-rate-service`,
    ogImage: img("/images/dota2/win-rate-service.webp"),
    ogTitle: "Dota 2 Win Rate Service – Break the Losing Streak",
    ogDescription:
      "Elite Immortal pros secure your chosen number of wins in normal matchmaking. Pick play or spectate mode — wins delivered fast.",
    twitterTitle: "Buy Dota 2 Wins – Win Rate Service by Immortal Pros",
    twitterDescription:
      "1 to 50 wins delivered by elite pros. Account level progress and cosmetic drops included. From $3 per win.",
  },

  "battle-cup": {
    title: "Dota 2 Battle Cup Service – Win the Weekend Cup | MyBoost",
    description:
      "Win your Dota 2 Battle Cup with a stacked Immortal team. EU & NA regions, trophy, effigy and tier rewards banked, 5-stack skips random pugs entirely.",
    keywords:
      "dota 2 battle cup service, battle cup carry, battle cup team service, dota 2 weekend tournament, battle cup trophy, dota 2 5-stack",
    canonicalUrl: `${BASE_URL}/game/dota-2/battle-cup`,
    ogImage: img("/images/dota2/battle-cup.webp"),
    ogTitle: "Dota 2 Battle Cup Service – Trophy, Effigy & All Tier Rewards",
    ogDescription:
      "Skip the random pug roulette. Our 5-stack of Immortal players wins the weekend tournament bracket and locks every cosmetic reward.",
    twitterTitle: "Dota 2 Battle Cup Win – Trophy + Effigy Guaranteed",
    twitterDescription:
      "Weekend bracket cleared by an Immortal 5-stack. EU and NA supported, every tier reward delivered to your account.",
  },

  "rank-tokens": {
    title: "Dota 2 Rank Tokens Farming – Fast Role Queue Tokens | MyBoost",
    description:
      "Stack Dota 2 Role Queue Tokens fast with veteran-played matches. Any rank tier supported, behavior score bump included, tokens credited per match.",
    keywords:
      "dota 2 rank tokens, rank tokens farming, token farm service, fast rank tokens, role queue tokens, dota 2 role tokens, dota 2 token grind",
    canonicalUrl: `${BASE_URL}/game/dota-2/rank-tokens`,
    ogImage: img("/images/dota2/dota2-rank-tokens.webp"),
    ogTitle: "Dota 2 Rank Tokens Farming – Skip the Role Queue Wait",
    ogDescription:
      "Never wait for a Role Queue Token again. Immortal pros farm tokens through clean ranked matches with your rank tier handled at checkout.",
    twitterTitle: "Buy Dota 2 Rank Tokens – Fast Token Farming Service",
    twitterDescription:
      "Role Queue Tokens credited per match. 1-100 tokens, rank-locked play, behavior bump bonus. From $3 per token.",
  },

  coaching: {
    title: "Dota 2 Coaching by Immortal Players – 1-on-1 | MyBoost",
    description:
      "Improve your Dota 2 game with 1-on-1 coaching from Immortal-ranked players. Hero, role or macro focus, sessions in your language. From $8.50 per hour.",
    keywords:
      "dota 2 coaching, immortal coach, dota coaching service, rank improvement coaching, dota 2 lessons, dota 2 mentor, dota 2 1-on-1",
    canonicalUrl: `${BASE_URL}/game/dota-2/coaching`,
    ogImage: img("/images/dota2/dota2-coaching.webp"),
    ogTitle: "Dota 2 Coaching – Learn from Immortal-Rank Players",
    ogDescription:
      "Custom 1-on-1 sessions with top-bracket coaches. Hero mastery, draft theory, mechanics, keybinds and macro built around your weakest areas.",
    twitterTitle: "Dota 2 Coaching – Real Improvement from Immortal Coaches",
    twitterDescription:
      "1-on-1 lessons with Immortal coaches in your language. Hero or role focus, custom hours. From $8.50 per hour.",
  },
};
