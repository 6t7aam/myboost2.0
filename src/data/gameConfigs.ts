export interface RaidMode {
  name: string;
  pricePerUnit: number;
}

export interface ResourceItem {
  name: string;
  pricePerUnit: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

export interface TieredPrice {
  minElo: number;
  maxElo: number;
  pricePer: number;
  per: number;
}

export interface ServiceOption {
  id: string;
  name: string;
  description: string;
  tag?: string;
  image?: string;
  type: "slider" | "slider-input" | "fixed" | "raids" | "tiered" | "resources" | "contact" | "warlord";
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  pricePerUnit?: number;
  fixedPrice?: number;
  estimatedTime?: string;
  maps?: string[];
  modes?: RaidMode[];
  tiers?: TieredPrice[];
  resources?: ResourceItem[];
  contactMessage?: string;
  startPrice?: string;
  ranks?: string[];
}

export interface GameConfig {
  title: string;
  subtitle: string;
  image: string;
  stats: { orders: string; rating: string; speed: string };
  services: ServiceOption[];
}

export const gameConfigs: Record<string, GameConfig> = {
  "arena-breakout": {
    title: "Arena Breakout: Infinite",
    subtitle: "Gear up, loot up, and rank up with our elite ABI boosters.",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2073620/ss_a54ef098f4b4c81e6e09ed50f20e3e7c1f83c4c3.1920x1080.jpg",
    stats: { orders: "600+", rating: "4.9", speed: "1-4 hrs" },
    services: [
      {
        id: "koens-farming",
        name: "Koens Farming",
        description: "Efficient Koens farming by experienced looters.",
        tag: "Popular",
        image: "/service-images/arena-breakout/koens-farming.png",
        startPrice: "From $1.50",
        type: "slider-input",
        unit: "M",
        min: 1,
        max: 500,
        step: 1,
        defaultValue: 1,
        pricePerUnit: 1.5,
        estimatedTime: "1-2 hrs per 1M",
      },
      {
        id: "raids-boost",
        name: "Raids Boost",
        description: "Full raid carry on all maps with VIP extraction.",
        tag: "Best Value",
        image: "/service-images/arena-breakout/raids-boost.png",
        startPrice: "From $4.50",
        type: "raids",
        min: 1,
        max: 20,
        step: 1,
        defaultValue: 1,
        maps: ["TV Station", "Armory", "Valley", "Farm", "Airport", "Northridge"],
        modes: [
          { name: "Lockdown", pricePerUnit: 4.5 },
          { name: "Forbidden", pricePerUnit: 8.99 },
        ],
        estimatedTime: "30-60 min per raid",
      },
      {
        id: "titanium-case",
        name: "Titanium 3x3 Case",
        description: "Premium Titanium case with guaranteed top loot.",
        tag: "Premium",
        image: "/service-images/arena-breakout/titanium-case.png",
        startPrice: "$99.99",
        type: "fixed",
        fixedPrice: 99.99,
        estimatedTime: "24-48 hrs",
      },
      {
        id: "coaching",
        name: "Coaching",
        description: "Learn maps, rotations, and PvP from top players.",
        image: "/service-images/arena-breakout/coaching.png",
        startPrice: "From $8.50",
        type: "slider",
        unit: "hours",
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 1,
        pricePerUnit: 8.5,
        estimatedTime: "Scheduled session",
      },
      {
        id: "rent-a-booster",
        name: "Rent a Booster",
        description: "Hire a pro to play alongside you in raids.",
        tag: "Hot",
        image: "/service-images/arena-breakout/rent-a-booster.png",
        startPrice: "From $8.50",
        type: "slider",
        unit: "hours",
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 1,
        pricePerUnit: 8.5,
        estimatedTime: "Instant start",
      },
      {
        id: "warlord-tournament",
        name: "Warlord Tournament",
        description: "New Warlord Tournament mode is live. Calculate your price instantly based on your current rank and desired Warlord stars.",
        tag: "Hot",
        image: "/service-images/arena-breakout/warlord-tournament.png",
        startPrice: "From $8",
        type: "warlord",
        ranks: ["Recruit", "Vanguard", "Ranger", "Commander", "Warlord"],
        min: 1,
        max: 99,
        step: 1,
        defaultValue: 1,
        contactMessage: "Warlord Tournament rank boosting is highly competitive. Prices depend on your current rank and desired Warlord stars.\n\n**Contact us in Discord: geroj2**",
        estimatedTime: "Varies",
      },
    ],
  },
  cs2: {
    title: "CS2 Boosting",
    subtitle: "Dominate with our professional boosters. Verified top-tier players only.",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/730/ss_d830cfd0550fbb64d80e803e93c929c3abb02056.1920x1080.jpg",
    stats: { orders: "2,400+", rating: "4.9", speed: "2-6 hrs" },
    services: [
      {
        id: "cs2-elo",
        name: "ELO Boost",
        description: "ELO boosting with tiered pricing. The higher the ELO, the more skilled the booster.",
        tag: "Popular",
        type: "tiered",
        unit: "ELO",
        min: 0,
        max: 5000,
        step: 25,
        defaultValue: 100,
        tiers: [
          { minElo: 0, maxElo: 1000, pricePer: 4.5, per: 25 },
          { minElo: 1000, maxElo: 2000, pricePer: 5, per: 25 },
          { minElo: 2000, maxElo: 3000, pricePer: 13, per: 25 },
          { minElo: 3000, maxElo: 10000, pricePer: 8, per: 25 },
        ],
        estimatedTime: "2-8 hrs",
      },
      {
        id: "cs2-premier",
        name: "Premier Boost",
        description: "Premier rating boosting. Climb the ranks with our elite players.",
        tag: "New",
        type: "tiered",
        unit: "Rating",
        min: 0,
        max: 35000,
        step: 500,
        defaultValue: 5000,
        tiers: [
          { minElo: 0, maxElo: 10000, pricePer: 5, per: 500 },
          { minElo: 10000, maxElo: 20000, pricePer: 7, per: 500 },
          { minElo: 20000, maxElo: 30000, pricePer: 10, per: 500 },
          { minElo: 30000, maxElo: 40000, pricePer: 14, per: 500 },
        ],
        estimatedTime: "4-12 hrs",
      },
      {
        id: "cs2-coaching",
        name: "Coaching",
        description: "Learn strategies, aim training, and game sense from top players.",
        type: "slider",
        unit: "hours",
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 1,
        pricePerUnit: 8.5,
        estimatedTime: "Scheduled session",
      },
      {
        id: "cs2-rent-booster",
        name: "Rent a Booster",
        description: "Hire a pro to play alongside you in competitive matches.",
        tag: "Hot",
        type: "slider",
        unit: "hours",
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 1,
        pricePerUnit: 8.5,
        estimatedTime: "Instant start",
      },
    ],
  },
  "dota-2": {
    title: "Dota 2 Boosting",
    subtitle: "Reach your dream MMR with Immortal-ranked boosters. Fast, safe, and efficient.",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/570/ss_86d675fdc73ba10462abb8f5ece7791c5571584c.1920x1080.jpg",
    stats: { orders: "1,800+", rating: "4.8", speed: "4-12 hrs" },
    services: [
      {
        id: "dota-mmr",
        name: "MMR Boost",
        description: "Solo MMR boost by Immortal players. Price varies by MMR bracket.",
        tag: "Popular",
        type: "tiered",
        unit: "MMR",
        min: 0,
        max: 12000,
        step: 100,
        defaultValue: 500,
        tiers: [
          { minElo: 0, maxElo: 2500, pricePer: 12, per: 100 },
          { minElo: 2500, maxElo: 4000, pricePer: 16, per: 100 },
          { minElo: 4000, maxElo: 6000, pricePer: 20, per: 100 },
          { minElo: 6000, maxElo: 8000, pricePer: 26, per: 100 },
          { minElo: 8000, maxElo: 10000, pricePer: 32, per: 100 },
          { minElo: 10000, maxElo: 15000, pricePer: 40, per: 100 },
        ],
        estimatedTime: "4-12 hrs per 500 MMR",
      },
      {
        id: "dota-lp",
        name: "LP Removal",
        description: "Get out of Low Priority fast with guaranteed wins.",
        tag: "Quick",
        type: "slider",
        unit: "wins",
        min: 1,
        max: 5,
        step: 1,
        defaultValue: 1,
        pricePerUnit: 6,
        estimatedTime: "1-3 hrs",
      },
      {
        id: "dota-tokens",
        name: "Rank Tokens Farm",
        description: "Farm rank tokens efficiently. $6 per 2 tokens.",
        type: "slider",
        unit: "tokens",
        min: 1,
        max: 100,
        step: 1,
        defaultValue: 2,
        pricePerUnit: 3,
        estimatedTime: "Varies",
      },
    ],
  },
  rust: {
    title: "Rust Services",
    subtitle: "Survive and dominate with battle-hardened Rust veterans by your side.",
    image: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/252490/ss_c27e1201e68812e48a12ca6e44b60a3e3f3d7.1920x1080.jpg",
    stats: { orders: "900+", rating: "4.7", speed: "Same day" },
    services: [
      {
        id: "rust-base",
        name: "Base Building",
        description: "Expert base designs built for maximum raid cost.",
        type: "fixed",
        fixedPrice: 49.99,
        estimatedTime: "2-4 hrs",
      },
      {
        id: "rust-raid",
        name: "Raid Boost",
        description: "Contact us and send base screenshots for a custom quote.",
        type: "contact",
        contactMessage: "Contact us in Discord and send base screenshots for a custom raid quote.\n\n**Contact us in Discord: geroj2**",
        estimatedTime: "Varies",
      },
      {
        id: "rust-resources",
        name: "Resource Farming",
        description: "Farm any resource while you're offline. Multiple resource types available.",
        tag: "Popular",
        type: "resources",
        resources: [
          { name: "Stone", pricePerUnit: 4.5, unit: "10k", min: 0, max: 100000, step: 1000, defaultValue: 10000 },
          { name: "Wood", pricePerUnit: 3.75, unit: "10k", min: 0, max: 100000, step: 1000, defaultValue: 10000 },
          { name: "Sulfur", pricePerUnit: 9, unit: "10k", min: 0, max: 100000, step: 1000, defaultValue: 10000 },
          { name: "Scrap", pricePerUnit: 10.5, unit: "1k", min: 0, max: 100000, step: 100, defaultValue: 1000 },
        ],
        estimatedTime: "Same day",
      },
      {
        id: "rust-coaching",
        name: "Coaching",
        description: "Learn base building, PvP, and survival strategies from top players.",
        type: "slider",
        unit: "hours",
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 1,
        pricePerUnit: 8.5,
        estimatedTime: "Scheduled session",
      },
      {
        id: "rust-rent-booster",
        name: "Rent a Booster",
        description: "Hire a pro to play alongside you in your server.",
        tag: "Hot",
        type: "slider",
        unit: "hours",
        min: 1,
        max: 10,
        step: 1,
        defaultValue: 1,
        pricePerUnit: 8.5,
        estimatedTime: "Instant start",
      },
    ],
  },
};
