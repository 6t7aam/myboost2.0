/**
 * Meta data for every Dota 2 service page.
 *
 * Used by the shared section components in
 * `src/components/dota2/Dota2ServiceSections.tsx`. Both the dedicated
 * pages (Dota2MMRServicePage etc.) and the dynamic page (Dota2ServicePage)
 * pull from this single source of truth.
 */

export interface FeatureTag {
  icon: string;
  label: string;
}

export interface HowItWorksStep {
  icon: string;
  title: string;
  desc: string;
}

export interface DeliveryInfo {
  startTime: string;
  completion: string;
}

export interface Dota2ServiceMeta {
  serviceId: string;
  pageTitle: string;
  badge?: string;
  featureTags: FeatureTag[];
  delivery: DeliveryInfo;
  wins: string[];
  steps: HowItWorksStep[];
  seoSection: {
    title: string;
    text: string;
  };
}

export const dota2ServiceMeta: Record<string, Dota2ServiceMeta> = {
  "mmr-service": {
    serviceId: "mmr-boost",
    pageTitle: "Dota 2 MMR Service",
    badge: "POPULAR",
    featureTags: [
      { icon: "🎯", label: "Any MMR, Any Rank Tier" },
      { icon: "🔥", label: "Skip Solo Loss Streaks" },
      { icon: "🔄", label: "Any Match Count or Behavior" },
    ],
    delivery: {
      startTime: "15 min average start time",
      completion: "6 days 8 hours order completion",
    },
    wins: [
      "Booked rank reached — chosen MMR or rank tier locked on your account",
      "Position and hero flex — pick lane preference and hero pool for the climb",
      "Cosmetic drops chance — random items rolled during ranked matches",
      "Piloted or Duo path — method picked per your style of climbing",
      "Account flex — low Behavior or matches played still supported",
      "Skip solo loss streaks — no more consecutive ranked losses",
    ],
    steps: [
      {
        icon: "📋",
        title: "Order Placed",
        desc: "Select your current and desired MMR, choose Piloted or Duo method.",
      },
      {
        icon: "⚔️",
        title: "PRO Plays",
        desc: "Verified PRO player connects and runs ranked matches toward your target MMR.",
      },
      {
        icon: "🏆",
        title: "Rank Delivered",
        desc: "Target rank locked on your account, order complete.",
      },
    ],
    seoSection: {
      title: "Dota 2 MMR Service — Rank Climb Service",
      text: "Buy Dota 2 MMR Service and climb to your chosen rank without solo loss streaks. Our professional Immortal-tier pros handle any rank tier — from Herald to Immortal — with Piloted or Duo method picked at checkout. Every order includes position and hero pool flexibility, so your preferred lane and hero picks are honored throughout the climb. Accounts with low behavior scores or unusual match counts are fully supported. The pro logs in or queues with you and runs ranked matches until the target MMR lands on your account. Backed by a 4.9/5 rating, our service is the fastest and safest way to reach your desired rank in Dota 2. Choose Express for 20% faster delivery or Super Express for 30% faster. 100% Money-Back Guarantee on every order.",
    },
  },
  "calibration-service": {
    serviceId: "calibration-boost",
    pageTitle: "Dota 2 Calibration Service",
    badge: "NEW",
    featureTags: [
      { icon: "🏆", label: "High MMR Placement" },
      { icon: "⚡", label: "Calibration in One Order" },
      { icon: "🔄", label: "Any Account State Handled" },
    ],
    delivery: {
      startTime: "15 min average start time",
      completion: "2 hours 15 minutes per match, 24-72 hours total",
    },
    wins: [
      "High MMR placement secured — booked MMR locked after calibration",
      "Rank tier delivered — initial calibrated rank landed on your account",
      "Win count handled — high winrate run through placement matches",
      "Account flex — any Behavior tier or Matches Played count covered",
      "Cosmetic drops chance — random items rolled during calibration games",
    ],
    steps: [
      {
        icon: "📋",
        title: "Order Set",
        desc: "Share account details, PRO connects shortly after payment.",
      },
      {
        icon: "⚔️",
        title: "Calibration Games Run",
        desc: "PRO plays calibration matches with optimized hero choice for high MMR placement.",
      },
      {
        icon: "🏆",
        title: "Rank Placed",
        desc: "Calibrated rank and MMR locked on your account.",
      },
    ],
    seoSection: {
      title: "Dota 2 Calibration Service — Top MMR Placement Service",
      text: "Make every Dota 2 calibration match count. Our professional calibration service is powered by Immortal-ranked players who specialize in maximizing initial MMR placement. Whether you're starting a fresh account or returning after a long break requiring recalibration, our pros run your placement matches with optimal hero selection and high-impact play to secure the best possible starting rank. Calibration is locked end-to-end — no solo placement losses, with any Behavior or Match Count tier supported. Choose between 1 and 30 calibration matches. Express and Super Express options available for faster delivery. Every order includes our 100% Money-Back Guarantee and starts within 15 minutes.",
    },
  },
  "lp-removal": {
    serviceId: "lp-removal",
    pageTitle: "Dota 2 Low Priority Removal",
    badge: "QUICK",
    featureTags: [
      { icon: "🚀", label: "LP Queue Escaped" },
      { icon: "🎮", label: "Back to Ranked Faster" },
      { icon: "🏆", label: "Ranked Access Restored" },
    ],
    delivery: {
      startTime: "15 min average start time",
      completion: "1 hour 15 minutes per game, within 24 hours total",
    },
    wins: [
      "LP queue escaped — booked win count delivered to exit the pool",
      "Ranked matchmaking re-opened — normal queue restored after exit",
      "Battle Pass progress resumed — rewards rolling in normal matches",
      "Cosmetic drops chance — random items rolled during the service",
      "Single Draft LP games handled by veteran players",
    ],
    steps: [
      {
        icon: "📋",
        title: "Account Connected",
        desc: "Share Discord or account details, PRO connects shortly.",
      },
      {
        icon: "⚔️",
        title: "Single Draft Cleared",
        desc: "PRO wins the required LP games to exit Single Draft pool.",
      },
      {
        icon: "🏆",
        title: "Pool Exited",
        desc: "Normal ranked queue restored, Battle Pass and item drops back online.",
      },
    ],
    seoSection: {
      title: "Dota 2 Low Priority Removal — Fast LP Exit Service",
      text: "Buy Dota 2 Low Priority Removal and escape the LP queue fast. Our experienced LP specialists handle Single Draft games with veteran-level play, getting you back to ranked matchmaking within 24 hours using ban-safe methods. Once stuck in Low Priority, every game is Single Draft — our pros know exactly how to win these efficiently. After your order, Battle Pass progress resumes and item drops are re-enabled in normal matches. No bots, no cheats — manual services only with Smart VPN protection. Choose between Piloted (we play your account) mode. Express and Super Express delivery available. 100% Money-Back Guarantee.",
    },
  },
  "behavior-score-service": {
    serviceId: "behavior-score-boost",
    pageTitle: "Dota 2 Behavior Score Service",
    badge: "SAFE",
    featureTags: [
      { icon: "✅", label: "Conduct Tier Lifted" },
      { icon: "👤", label: "Account Features Restored" },
      { icon: "🔄", label: "Any Account State Handled" },
    ],
    delivery: {
      startTime: "15 min average start time",
      completion: "10 days 8 hours for full service, 24-72 hours typical",
    },
    wins: [
      "Behavior Score reached — chosen tier from 0 to 12,000 locked on account",
      "Chat and voice access unlocked — full client communications reopened",
      "Ranked queue restored — restrictions lifted and matchmaking opened up",
      "Position and hero flex — pick lane preference and hero pool for the climb",
      "Cosmetic drops chance — random items rolled during matches in the service",
    ],
    steps: [
      {
        icon: "📋",
        title: "Account Synced",
        desc: "Share Discord or account details after payment.",
      },
      {
        icon: "⚔️",
        title: "Clean Matches Run",
        desc: "PRO runs clean matches toward the target behavior score.",
      },
      {
        icon: "🏆",
        title: "Tier Lifted",
        desc: "Conduct tier lifted to clean player pool, all features restored.",
      },
    ],
    seoSection: {
      title: "Dota 2 Behavior Score Service — Fast Recovery Service",
      text: "Stuck with a low Dota 2 behavior score? Long queue times, toxic matchmaking pools, and locked features can ruin your experience. Our professional behavior score service quickly raises your score back to 12,000 — restoring full matchmaking access and unlocking the normal Dota 2 experience again. Our pros run clean, report-free matches that reliably increase your conduct score tier. Chat and voice communications are unlocked once you reach the clean player pool threshold. Choose between 1k and 12k score increase. The service works on any account state — whether your score is near 0 or just needs a push above a threshold. Express delivery options available. Rated 4.9/5 with a 100% Money-Back Guarantee.",
    },
  },
  "win-rate-service": {
    serviceId: "win-rate-boost",
    pageTitle: "Dota 2 Win Rate Service",
    badge: "POPULAR",
    featureTags: [
      { icon: "🎮", label: "Play or Spectate" },
      { icon: "⭐", label: "Elite PROs" },
      { icon: "🏆", label: "Choose the Amount of Wins" },
    ],
    delivery: {
      startTime: "15 min average start time",
      completion: "1 hour 15 minutes per win, 1-24 hours total",
    },
    wins: [
      "A number of wins in non-ranked games secured",
      "Account Level up from wins progression",
      "Chance to get cosmetic items from match drops",
      "Skill rating improvement in normal matchmaking",
    ],
    steps: [
      {
        icon: "📋",
        title: "Order Placed",
        desc: "Choose number of wins, add to cart and pay.",
      },
      {
        icon: "⚔️",
        title: "Pro Plays",
        desc: "Skilled pro queues in normal matches and wins your target count.",
      },
      {
        icon: "🏆",
        title: "Wins Delivered",
        desc: "Win count credited, account level progress updated.",
      },
    ],
    seoSection: {
      title: "Dota 2 Win Rate Service — Professional Wins Service",
      text: "Revitalize your Dota 2 experience with our Win Rate Service. Say goodbye to defeat screens and hello to a winning streak. Our skilled pros ensure rapid improvement in your win rate, helping you dominate normal matchmaking. Choose anywhere from 1 to 50 wins. Each win includes a chance for cosmetic item drops and contributes to your account level. With 1,800+ completed win rate orders and a 4.8 rating, our service delivers consistent results with 1-24 hour delivery per win. Express and Super Express options cut delivery time by 20-30%. Piloted mode available — we play, you watch. 100% Money-Back Guarantee on all orders.",
    },
  },
  "battle-cup": {
    serviceId: "battle-cup",
    pageTitle: "Dota 2 Battle Cup",
    badge: "NEW",
    featureTags: [
      { icon: "🏅", label: "All Tier Rewards Banked" },
      { icon: "👥", label: "5-Stack Skips Random Pugs" },
      { icon: "📅", label: "Weekend Bracket Wrapped" },
    ],
    delivery: {
      startTime: "15 min average start time",
      completion: "Next weekend tournament window",
    },
    wins: [
      "Battle Cup tier won — bracket cleared from quarterfinal to final",
      "Trophy and chat badge — winner-only profile rewards for the week",
      "Seven exclusive emoticons — chat reactions unlocked for one week",
      "Battle Cup effigy — permanent winner-only profile item",
      "Battle Points and Shards stacked — tournament currency banked",
      "Prestige profile description — victory streak displayed for the week",
    ],
    steps: [
      {
        icon: "📋",
        title: "Order Confirmed",
        desc: "Fill in details, Discord chat with assigned PRO set up shortly.",
      },
      {
        icon: "⚔️",
        title: "Tournament Played",
        desc: "Bracket runs at scheduled weekend window; in Piloted mode PRO plays your account.",
      },
      {
        icon: "🏆",
        title: "Trophy Secured",
        desc: "All winner rewards delivered to your account.",
      },
    ],
    seoSection: {
      title: "Dota 2 Battle Cup Service — Weekend Tournament Win Service",
      text: "Want to win Dota 2's Battle Cup but tired of getting stuck with random groups that bow out in the first round? Our Battle Cup Service stacks your team with experienced Immortal players who know exactly how to navigate the bracket. Available for EU and NA regions. Every tier of rewards is banked to your account — trophy, chat badge, seven exclusive emoticons for one week, the permanent effigy cosmetic, Battle Points, Shards, and the prestige profile description showing your victory streak. Runs at the scheduled weekend tournament window. Piloted or Self-play (Duo) mode available. 100% Money-Back Guarantee.",
    },
  },
  "rank-tokens": {
    serviceId: "rank-tokens",
    pageTitle: "Dota 2 Rank Tokens Delivery",
    badge: "NEW",
    featureTags: [
      { icon: "🎫", label: "Any Token Count Delivered" },
      { icon: "⏭", label: "Skip the Token Wait" },
      { icon: "🎲", label: "No More Role Roulette" },
    ],
    delivery: {
      startTime: "15 min average start time",
      completion: "3 hours 15 minutes total, 24-48 hours",
    },
    wins: [
      "Role Queue Tokens delivered — booked token count credited to your account",
      "Preferred role secured — tokens fuel later ranked queue picks",
      "Behavior score bump — clean play during token-earning matches",
      "Bonus cosmetic chance — Dota's match-time drop system included",
      "Skip the long token wait — no more grinding tokens before ranked queues",
    ],
    steps: [
      {
        icon: "📋",
        title: "Order Placed",
        desc: "PRO contacts via Discord to align scope and timing.",
      },
      {
        icon: "⚔️",
        title: "Token Matches Run",
        desc: "PRO signs in or queues with you to run ranked matches, earning Role Queue Tokens.",
      },
      {
        icon: "🎫",
        title: "Tokens Credited",
        desc: "Service wraps once tokens sit in your inventory, ready for role-locked ranked queues.",
      },
    ],
    seoSection: {
      title: "Dota 2 Role Queue Tokens Farming — Fast Token Collection",
      text: "Buy Dota 2 Role Queue Tokens Farming and get your tokens stacked through veteran-played matches without solo queue wait. Role Queue Tokens are required to play in the role-locked ranked system — running out means waiting through unranked games or losing your preferred position. Our pros earn tokens through clean, high-skill matches that also bump your behavior score. Choose between 1 and 20 tokens. Your rank tier is selected at checkout to ensure rank-appropriate matchmaking. Express and Super Express options deliver tokens 20-30% faster. Tokens sit in your inventory immediately after each earning match. Rated 4.9/5 with a 100% Money-Back Guarantee.",
    },
  },
  coaching: {
    serviceId: "coaching",
    pageTitle: "Dota 2 Coaching",
    badge: "NEW",
    featureTags: [
      { icon: "📚", label: "Guidance from Immortal Coaches" },
      { icon: "📈", label: "Actual Skill Level Up" },
      { icon: "🕐", label: "Custom Coaching Hours" },
    ],
    delivery: {
      startTime: "15 min average start time",
      completion: "1 hour 15 minutes per session",
    },
    wins: [
      "Custom Dota 2 lessons — hours of your choice, topic of your choosing",
      "Personal mentorship from an Immortal-ranked player",
      "A deeper understanding of the game's mechanics and macro play",
      "Option to learn your favorite hero in depth",
      "Option to learn a specific lane or role",
      "Graphics, keybinds and settings tune-up included",
    ],
    steps: [
      {
        icon: "📋",
        title: "Book Session",
        desc: "Choose number of hours, language, and focus area (hero or role).",
      },
      {
        icon: "📚",
        title: "Session Runs",
        desc: "1-on-1 coaching session via Discord or in-game spectate/party.",
      },
      {
        icon: "🏆",
        title: "Skills Improved",
        desc: "Replay review, hero tips, and actionable advice delivered.",
      },
    ],
    seoSection: {
      title: "Dota 2 Coaching — Learn from Immortal Players",
      text: "Buy Dota 2 Coaching and refine your skills under the guidance of Immortal-ranked experts. Learn champion strategies, optimize your keybindings, enhance your graphics settings, and master the mechanics that separate average players from great ones. Our coaching sessions are fully customized — choose your number of hours, preferred language, and whether you want to focus on a specific hero or a specific role. Coaches are ID-checked and skill-tested, with top-ranked players including world-first guild members available. Sessions run via Discord or in-game. Whether you're a new player trying to understand the basics or an Ancient trying to break into Divine, our coaches deliver real, actionable improvements. Starting at $8.50 per hour. 100% Money-Back Guarantee.",
    },
  },
};
