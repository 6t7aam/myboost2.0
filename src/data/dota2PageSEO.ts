export interface Dota2PageSEO {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  twitterTitle: string;
  twitterDescription: string;
}

const BASE_URL = "https://www.myboost.top";
const img = (path: string) => `${BASE_URL}${path}`;

export const dota2PageSEO: Record<string, Dota2PageSEO> = {
  "mmr-boost": {
    title: "Dota 2 MMR Boost - Fast Rank Up by Immortal Players",
    description:
      "Buy Dota 2 MMR boost from Immortal players. Solo or duo boosting, VPN protection, 15-minute start, and safe rank climbing from Herald to Immortal.",
    keywords:
      "dota 2 mmr boost, buy dota 2 mmr boost, immortal dota 2 boosting, dota 2 rank boost, dota 2 duo boost, dota 2 solo boost",
    canonicalUrl: `${BASE_URL}/game/dota-2/mmr-boost`,
    ogImage: img("/images/dota2/dota2-mmr-boost.webp"),
    ogTitle: "Dota 2 MMR Boost by Immortal Players",
    ogDescription:
      "Safe Dota 2 MMR boosting with VPN protection, live tracking, and fast starts from verified Immortal players.",
    twitterTitle: "Dota 2 MMR Boost - Safe Rank Climbing",
    twitterDescription:
      "Reach your target MMR with Immortal players. Solo or duo boosting, fast starts, and account-safe methods.",
  },
  "calibration-boost": {
    title: "Dota 2 Calibration Boost - High Placement Matches",
    description:
      "Complete Dota 2 calibration matches with Immortal players and secure the strongest possible placement. Up to 30 matches, fast and safe service.",
    keywords:
      "dota 2 calibration boost, dota 2 placement matches, calibration service, high mmr calibration, buy dota 2 calibration boost",
    canonicalUrl: `${BASE_URL}/game/dota-2/calibration-boost`,
    ogImage: img("/images/dota2/calibration-boost.webp"),
    ogTitle: "Dota 2 Calibration Boost for Better Placement",
    ogDescription:
      "Get your Dota 2 calibration matches handled by Immortal players and lock in the best possible MMR placement.",
    twitterTitle: "Dota 2 Calibration Boost",
    twitterDescription:
      "Fast and safe Dota 2 calibration matches with verified Immortal players and transparent pricing.",
  },
  "lp-removal": {
    title: "Dota 2 Low Priority Removal - Fast LP Queue Exit",
    description:
      "Remove Dota 2 Low Priority fast with veteran players. Escape Single Draft, restore ranked access, and get back to normal queues quickly and safely.",
    keywords:
      "dota 2 low priority removal, lp removal, remove low priority, dota 2 single draft removal, buy lp removal",
    canonicalUrl: `${BASE_URL}/game/dota-2/lp-removal`,
    ogImage: img("/images/dota2/dota2-lp-removal.webp"),
    ogTitle: "Dota 2 LP Removal in Under 24 Hours",
    ogDescription:
      "Fast Dota 2 Low Priority removal handled by veteran players with safe methods and fast completion.",
    twitterTitle: "Dota 2 Low Priority Removal",
    twitterDescription:
      "Get out of Low Priority fast with veteran players, safe play, and live support.",
  },
  "behavior-score-boost": {
    title: "Dota 2 Behavior Score Boost - Reach 12K Safely",
    description:
      "Recover your Dota 2 behavior score with clean, report-free matches. Unlock full matchmaking access, chat, and ranked queues from any starting score.",
    keywords:
      "dota 2 behavior score boost, behavior score service, increase behavior score, unlock ranked matchmaking, buy behavior score boost",
    canonicalUrl: `${BASE_URL}/game/dota-2/behavior-score-boost`,
    ogImage: img("/images/dota2/behavior-score-boost.webp"),
    ogTitle: "Dota 2 Behavior Score Boost",
    ogDescription:
      "Boost your Dota 2 behavior score with clean matches and restore full matchmaking access safely.",
    twitterTitle: "Dota 2 Behavior Score Boost",
    twitterDescription:
      "Improve behavior score, unlock chat and ranked access, and return to clean matchmaking pools.",
  },
  "win-rate-boost": {
    title: "Dota 2 Win Rate Boost - Buy Wins from Immortal Players",
    description:
      "Increase your Dota 2 win rate with Immortal players. Choose 1 to 50 wins, play or spectate, and stop losing streaks with safe, fast delivery.",
    keywords:
      "dota 2 win rate boost, buy dota 2 wins, increase dota 2 win rate, win rate service, immortal dota 2 wins",
    canonicalUrl: `${BASE_URL}/game/dota-2/win-rate-boost`,
    ogImage: img("/images/dota2/win-rate-boost.webp"),
    ogTitle: "Dota 2 Win Rate Boost by Immortal Players",
    ogDescription:
      "Break losing streaks with safe Dota 2 win rate boosting from verified Immortal players.",
    twitterTitle: "Dota 2 Win Rate Boost",
    twitterDescription:
      "Choose the wins you need and let Immortal players handle the climb with safe, manual gameplay.",
  },
  "battle-cup": {
    title: "Dota 2 Battle Cup Boost - Win the Weekend Cup",
    description:
      "Win your Dota 2 Battle Cup with an Immortal team. EU and NA support, trophy rewards, and fast coordination for weekend tournaments.",
    keywords:
      "dota 2 battle cup boost, battle cup service, battle cup carry, weekend cup boost, dota 2 trophy boost",
    canonicalUrl: `${BASE_URL}/game/dota-2/battle-cup`,
    ogImage: img("/images/dota2/battle-cup.webp"),
    ogTitle: "Dota 2 Battle Cup Boost",
    ogDescription:
      "Secure your Battle Cup trophy and rewards with an Immortal Dota 2 team for your weekend bracket.",
    twitterTitle: "Dota 2 Battle Cup Boost",
    twitterDescription:
      "Weekend Battle Cup wins, trophy rewards, and Immortal teammates for EU and NA players.",
  },
  "rank-tokens": {
    title: "Dota 2 Rank Tokens Farming - Fast Token Collection",
    description:
      "Buy Dota 2 rank token farming and collect Role Queue tokens fast with veteran players. Safe matches, fast starts, and transparent per-token pricing.",
    keywords:
      "dota 2 rank tokens, role queue token farming, buy rank tokens, dota 2 role queue boost, rank token service",
    canonicalUrl: `${BASE_URL}/game/dota-2/rank-tokens`,
    ogImage: img("/images/dota2/dota2-rank-tokens.webp"),
    ogTitle: "Dota 2 Rank Token Farming",
    ogDescription:
      "Farm Dota 2 Role Queue tokens fast with safe matches and verified players.",
    twitterTitle: "Dota 2 Rank Token Farming",
    twitterDescription:
      "Get Role Queue tokens faster with veteran players and track every match along the way.",
  },
  coaching: {
    title: "Dota 2 Coaching by Immortal Players - 1-on-1 Lessons",
    description:
      "Improve your Dota 2 gameplay with 1-on-1 coaching from Immortal-ranked players. Hero pool, macro, laning, and role guidance tailored to your goals.",
    keywords:
      "dota 2 coaching, immortal dota 2 coaching, dota 2 lessons, dota 2 mentor, 1 on 1 dota 2 coaching",
    canonicalUrl: `${BASE_URL}/game/dota-2/coaching`,
    ogImage: img("/images/dota2/dota2-coaching.webp"),
    ogTitle: "Dota 2 Coaching from Immortal Players",
    ogDescription:
      "1-on-1 Dota 2 coaching for laning, macro, hero pool building, and role-specific improvement.",
    twitterTitle: "Dota 2 Coaching",
    twitterDescription:
      "Train with Immortal players and get practical lessons you can apply in your very next matches.",
  },
};
