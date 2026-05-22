export interface RustFeatureTag {
  icon: string;
  label: string;
}

export interface RustHowItWorksStep {
  icon: string;
  title: string;
  desc: string;
}

export interface RustFAQItem {
  q: string;
  a: string;
}

export interface RustServiceMeta {
  serviceId: string;
  featureTags: RustFeatureTag[];
  wins: string[];
  steps: RustHowItWorksStep[];
  /** Optional service-specific FAQ; falls back to the global one on the page. */
  faq?: RustFAQItem[];
}

const STANDARD_STEPS = (verb: string, deliverable: string): RustHowItWorksStep[] => [
  {
    icon: "1",
    title: "Place the order",
    desc: "Choose your options, delivery speed, and confirm in cart.",
  },
  {
    icon: "2",
    title: `${verb} starts`,
    desc: "A verified Rust player begins the work on your account or server.",
  },
  {
    icon: "3",
    title: `${deliverable} delivered`,
    desc: "Clean delivery with live support throughout the order.",
  },
];

const FARM_TAGS = (label: string): RustFeatureTag[] => [
  { icon: "Safe", label: "Manual farming only" },
  { icon: "Fast", label: "Same-day delivery" },
  { icon: "Pro", label: `Veteran ${label} farmers` },
];

const FARM_WINS = (label: string, extra: string[] = []): string[] => [
  `Bulk ${label} delivered straight to your base`,
  "Manual gathering — no bots, no detection risk",
  "Flexible order size scaled to your needs",
  "Verified Rust veterans handle the farm",
  ...extra,
  "Live support throughout the order",
];

const COMPONENT_META = (label: string, packSize: number): RustServiceMeta => ({
  serviceId: `components-${label.toLowerCase().replace(/\s+/g, "-")}`,
  featureTags: [
    { icon: "Pack", label: `${packSize} per pack` },
    { icon: "Safe", label: "Manual farming only" },
    { icon: "Fast", label: "Same-day delivery" },
  ],
  wins: FARM_WINS(`${label}`, [
    "Crafting-ready components for high-tier gear",
    "Saves hours of monument and radtown grinding",
  ]),
  steps: STANDARD_STEPS("Farmer", label),
});

const ELECTRONICS_META = (slugPart: string, label: string): RustServiceMeta => ({
  serviceId: `electronics-${slugPart}`,
  featureTags: [
    { icon: "Built", label: "Pre-crafted item" },
    { icon: "Safe", label: "Manual crafting only" },
    { icon: "Fast", label: "Same-day delivery" },
  ],
  wins: [
    `${label} delivered ready to place in your Rust base`,
    "All required components are sourced manually",
    "Saves the painful electrical farming grind",
    "Crafted by Rust veterans who play wipes weekly",
    "Live support throughout the order",
  ],
  steps: STANDARD_STEPS("Crafter", label),
});

export const rustServiceMeta: Record<string, RustServiceMeta> = {
  // --- Base Building ----------------------------------------------------
  "advanced-base": {
    serviceId: "advanced-base",
    featureTags: [
      { icon: "Base", label: "Advanced layout" },
      { icon: "Raid", label: "High raid cost" },
      { icon: "Safe", label: "Manual build only" },
    ],
    wins: [
      "Advanced defensive layout delivered",
      "Loot rooms and core protected",
      "Strong raid cost structure",
      "Built manually by experienced Rust players",
      "Clean delivery with full support",
    ],
    steps: STANDARD_STEPS("Builder", "Base"),
  },
  "bunker-base": {
    serviceId: "bunker-base",
    featureTags: [
      { icon: "Bunker", label: "Bunker entry system" },
      { icon: "Loot", label: "Protected loot rooms" },
      { icon: "Raid", label: "High raid resistance" },
    ],
    wins: [
      "Full bunker layout with hidden entry",
      "Multi-layered protection for your loot",
      "Strong wipe-long raid resistance",
      "Smart pathing for fast looting and defense",
      "Built end-to-end by Rust veterans",
    ],
    steps: STANDARD_STEPS("Builder", "Bunker"),
  },
  "starter-base": {
    serviceId: "starter-base",
    featureTags: [
      { icon: "Starter", label: "Early wipe ready" },
      { icon: "Speed", label: "Fast 1-3 hr setup" },
      { icon: "Safe", label: "Clean progression" },
    ],
    wins: [
      "Solid starter base placed in a smart location",
      "Essential protection for early wipe gear",
      "Fast turnaround so you can keep farming",
      "Layout designed for clean Tier 1 progression",
      "Saves the painful early grind",
    ],
    steps: STANDARD_STEPS("Builder", "Starter base"),
  },
  "hourly-driving": {
    serviceId: "hourly-driving",
    featureTags: [
      { icon: "Flex", label: "Any task allowed" },
      { icon: "Fast", label: "Instant booster start" },
      { icon: "Time", label: "Pay per hour" },
    ],
    wins: [
      "A pro Rust player on demand by the hour",
      "Any farming, building or roaming task allowed",
      "Skip the grind and keep your progress moving",
      "Flexible hourly booking from 1 to 24 hours",
      "Honest hourly rate with no padding",
    ],
    steps: [
      { icon: "1", title: "Pick your hours", desc: "Choose 1-24 hours of pro support." },
      { icon: "2", title: "Set the goal", desc: "Tell the booster the task — farming, building, raids, roaming." },
      { icon: "3", title: "Get the time back", desc: "The hours are spent on your account efficiently." },
    ],
  },
  "workbench-boost": {
    serviceId: "workbench-boost",
    featureTags: [
      { icon: "Tier", label: "Up to Tier 3" },
      { icon: "Craft", label: "Crafting unlocked" },
      { icon: "Fast", label: "Same-day boost" },
    ],
    wins: [
      "Workbench progression up to Tier 3",
      "Crafting unlocked for higher tier items",
      "Faster path to AKs, M2 launchers, and explosives",
      "No more manual scrap grinding to unlock tiers",
      "Clean delivery with full account safety",
    ],
    steps: STANDARD_STEPS("Booster", "Workbench"),
  },

  // --- Raiding ----------------------------------------------------------
  "base-raiding-boost": {
    serviceId: "base-raiding-boost",
    featureTags: [
      { icon: "Raid", label: "Full enemy raid" },
      { icon: "Loot", label: "Loot secured" },
      { icon: "Safe", label: "Online raid pros" },
    ],
    wins: [
      "Enemy base fully raided and cleared",
      "Loot secured and returned to you",
      "Sulfur prep, explosives and pathing handled",
      "Experienced online raid coordination",
      "Done by Rust veterans who clear bases daily",
    ],
    steps: [
      { icon: "1", title: "Send the target", desc: "Share the base or coords you want raided." },
      { icon: "2", title: "Raid begins", desc: "Our crew preps explosives and executes the raid." },
      { icon: "3", title: "Loot delivered", desc: "Successful raid loot lands in your stash." },
    ],
  },
  "cargo-ship-raid": {
    serviceId: "cargo-ship-raid",
    featureTags: [
      { icon: "Cargo", label: "Cargo Ship raid" },
      { icon: "Loot", label: "Crates + scientists" },
      { icon: "Fast", label: "1-3 hr completion" },
    ],
    wins: [
      "Cargo Ship cleared with full crate looting",
      "Locked crate handled and timed correctly",
      "Scientists removed without wasted ammo",
      "PvP pressure managed by experienced players",
      "Loot transported back to your stash safely",
    ],
    steps: [
      { icon: "1", title: "Place the order", desc: "Choose options and confirm your purchase." },
      { icon: "2", title: "Cargo run begins", desc: "Our team intercepts and clears Cargo Ship efficiently." },
      { icon: "3", title: "Loot delivered", desc: "All Cargo loot is secured and delivered to you." },
    ],
  },
  "oil-rig-raid": {
    serviceId: "oil-rig-raid",
    featureTags: [
      { icon: "Oil", label: "Large Oil Rig" },
      { icon: "Loot", label: "Locked crate" },
      { icon: "Safe", label: "PvP control" },
    ],
    wins: [
      "Full Oil Rig clear with locked crate timer",
      "Top scientists handled without burning gear",
      "PvP defense covered during the timed wait",
      "Locked crate loot delivered to your stash",
      "Faster than a manual Oil Rig run by far",
    ],
    steps: [
      { icon: "1", title: "Place the order", desc: "Pick options and we'll line up the Oil Rig run." },
      { icon: "2", title: "Rig clear begins", desc: "Scientists and PvP threats are neutralized." },
      { icon: "3", title: "Crate looted", desc: "Locked crate timer is completed and loot delivered." },
    ],
  },
  "base-security": {
    serviceId: "base-security",
    featureTags: [
      { icon: "Safe", label: "Door & trap upgrades" },
      { icon: "Loot", label: "Loot protected" },
      { icon: "Fast", label: "Same-day fix" },
    ],
    wins: [
      "Stronger doors, electric traps and storage rooms",
      "Better layout flow against raiders",
      "Reduced loot loss risk during wipe",
      "Hardened access points and choke layouts",
      "Quick fix without rebuilding from scratch",
    ],
    steps: STANDARD_STEPS("Booster", "Security upgrade"),
  },
  "hourly-pvp-assistance": {
    serviceId: "hourly-pvp-assistance",
    featureTags: [
      { icon: "PvP", label: "Roam + defend" },
      { icon: "Raid", label: "Raid support" },
      { icon: "Time", label: "Pay per hour" },
    ],
    wins: [
      "Hourly PvP and raid support on demand",
      "Online raid defense covered",
      "Sulfur, explosives, and scouting handled",
      "Pay only for the time you actually need",
      "Same Rust veterans available for any task",
    ],
    steps: [
      { icon: "1", title: "Pick your hours", desc: "Book hourly PvP / raid support — 1 to 24 hours." },
      { icon: "2", title: "Define the goal", desc: "Tell us the target, prep needs, or roam plan." },
      { icon: "3", title: "Hours delivered", desc: "Your hours are spent efficiently with full safety." },
    ],
  },

  // --- Resources --------------------------------------------------------
  "resource-farm": {
    serviceId: "resource-farm",
    featureTags: [
      { icon: "Any", label: "Stone, wood, sulfur, scrap" },
      { icon: "Speed", label: "Same-day farm" },
      { icon: "Safe", label: "No bots — manual only" },
    ],
    wins: FARM_WINS("resources", [
      "Stockpiles of stone, wood, metal, sulfur and cloth",
      "Saves hours of repetitive farming",
    ]),
    steps: [
      { icon: "1", title: "Pick the amount", desc: "Choose how many resource bundles you want farmed." },
      { icon: "2", title: "Farm begins", desc: "Our players gather the resources efficiently." },
      { icon: "3", title: "Resources delivered", desc: "The full order lands in your stash, ready to use." },
    ],
  },
  "tea-farm": {
    serviceId: "tea-farm",
    featureTags: [
      { icon: "Tea", label: "Full tea farm" },
      { icon: "Fabric", label: "Fabric production" },
      { icon: "Included", label: "Resources included" },
    ],
    wins: [
      "Full tea farm setup with planters and irrigation",
      "Fabric production line ready to scale",
      "All required seeds and resources included",
      "Long-term wipe income with low maintenance",
      "Premium farming infrastructure done in one order",
    ],
    steps: STANDARD_STEPS("Farmer", "Tea farm"),
  },
  "oil-barrel-farm": {
    serviceId: "oil-barrel-farm",
    featureTags: FARM_TAGS("barrel"),
    wins: FARM_WINS("oil barrels", [
      "Crude oil and low grade fuel piles delivered",
      "Cheapest farming order in our Rust catalog",
    ]),
    steps: STANDARD_STEPS("Farmer", "Oil barrels"),
  },
  "electronics-farm": {
    serviceId: "electronics-farm",
    featureTags: FARM_TAGS("electronics"),
    wins: FARM_WINS("electronics", [
      "Electrical components for base automation",
      "Foundation for traps and bunker tech",
    ]),
    steps: STANDARD_STEPS("Farmer", "Electronics"),
  },
  "key-cards-farm": {
    serviceId: "key-cards-farm",
    featureTags: FARM_TAGS("monument"),
    wins: FARM_WINS("key cards", [
      "Full card set for monument puzzles",
      "Faster access to high-tier loot routes",
    ]),
    steps: STANDARD_STEPS("Farmer", "Key cards"),
  },

  // --- Components -------------------------------------------------------
  "components-metal-spring": COMPONENT_META("Metal Spring", 10),
  "components-rifle-body": COMPONENT_META("Rifle Body", 3),
  "components-road-signs": COMPONENT_META("Road Signs", 20),
  "components-rope": COMPONENT_META("Rope", 50),
  "components-sewing-kit": COMPONENT_META("Sewing Kit", 20),
  "components-sheet-metal": COMPONENT_META("Sheet Metal", 10),

  // --- Electronics ------------------------------------------------------
  "electronics-wind-turbine": ELECTRONICS_META("wind-turbine", "Wind Turbine"),
  "electronics-small-generator": ELECTRONICS_META("small-generator", "Small Generator"),
  "electronics-large-solar-panel": ELECTRONICS_META("large-solar-panel", "Large Solar Panel"),
  "electronics-lr-battery": ELECTRONICS_META("lr-battery", "LR Battery"),
  "electronics-mr-battery": ELECTRONICS_META("mr-battery", "MR Battery"),
  "electronics-computer-station": ELECTRONICS_META("computer-station", "Computer Station"),
  "electronics-guntrap": ELECTRONICS_META("guntrap", "Guntrap"),
  "electronics-switch": ELECTRONICS_META("switch", "Switch"),
  "electronics-sprinkler": ELECTRONICS_META("sprinkler", "Sprinkler"),

  // --- Key Cards --------------------------------------------------------
  "key-cards-green": {
    serviceId: "key-cards-green",
    featureTags: [
      { icon: "Green", label: "Low-tier monuments" },
      { icon: "Fast", label: "Same-day delivery" },
      { icon: "Safe", label: "Manual gathering" },
    ],
    wins: [
      "Green keycards ready for low-tier monuments",
      "Faster access to early Rust loot rooms",
      "Saves repetitive monument puzzle runs",
      "Cards delivered to your base ready to use",
      "Live support throughout the order",
    ],
    steps: STANDARD_STEPS("Farmer", "Green keycards"),
  },
  "key-cards-blue": {
    serviceId: "key-cards-blue",
    featureTags: [
      { icon: "Blue", label: "Mid-tier monuments" },
      { icon: "Fast", label: "Same-day delivery" },
      { icon: "Safe", label: "Manual gathering" },
    ],
    wins: [
      "Blue keycards delivered for mid-tier monuments",
      "Intermediate loot rooms unlocked",
      "Saves repetitive monument runs",
      "Cards delivered to your base ready to use",
      "Live support throughout the order",
    ],
    steps: STANDARD_STEPS("Farmer", "Blue keycards"),
  },
  "key-cards-red": {
    serviceId: "key-cards-red",
    featureTags: [
      { icon: "Red", label: "High-tier monuments" },
      { icon: "Loot", label: "Top loot rooms" },
      { icon: "Safe", label: "Manual gathering" },
    ],
    wins: [
      "Red keycards delivered for the best loot rooms",
      "High-tier monument puzzles solved",
      "Faster access to elite loot routes",
      "Cards delivered to your base ready to use",
      "Live support throughout the order",
    ],
    steps: STANDARD_STEPS("Farmer", "Red keycards"),
  },

  // --- Oil Barrel -------------------------------------------------------
  "oil-barrel": {
    serviceId: "oil-barrel",
    featureTags: FARM_TAGS("barrel"),
    wins: FARM_WINS("oil barrels", [
      "Crude oil and low grade fuel delivered",
      "Cheapest farming order in our Rust catalog",
    ]),
    steps: STANDARD_STEPS("Farmer", "Oil barrels"),
  },

  // --- Weapons ----------------------------------------------------------
  "weapons-farm": {
    serviceId: "weapons-farm",
    featureTags: [
      { icon: "Gun", label: "Any weapon" },
      { icon: "Combat", label: "Combat-ready" },
      { icon: "Safe", label: "Manual delivery" },
    ],
    wins: [
      "Combat-ready weapons delivered",
      "Attachments and tools included",
      "Skip the long grind for AKs and bolts",
      "Manual gathering — no bots, no risk",
      "Built to fit your loadout needs",
    ],
    steps: STANDARD_STEPS("Booster", "Weapons"),
  },

  // --- Ammo -------------------------------------------------------------
  ammo: {
    serviceId: "ammo",
    featureTags: [
      { icon: "Ammo", label: "Any caliber" },
      { icon: "Raid", label: "Raid supplies" },
      { icon: "Safe", label: "Manual crafting" },
    ],
    wins: [
      "Bullets and ammo stockpile delivered",
      "Raid-supply prep handled in one order",
      "Explosives prep covered if requested",
      "All weapon calibers supported",
      "Saves hours of gunpowder and scrap grinding",
    ],
    steps: STANDARD_STEPS("Booster", "Ammo"),
  },

  // --- Coaching ---------------------------------------------------------
  coaching: {
    serviceId: "coaching",
    featureTags: [
      { icon: "1v1", label: "1-on-1 session" },
      { icon: "Pro", label: "Veteran coach" },
      { icon: "Plan", label: "Custom plan" },
    ],
    wins: [
      "Personalised Rust coaching session",
      "Improve base design, raids, PvP and game sense",
      "Veteran coach who plays wipes weekly",
      "Voice and screenshare supported",
      "Custom learning plan tailored to your goals",
    ],
    steps: [
      { icon: "1", title: "Book your hours", desc: "Pick the session length that fits your goals." },
      { icon: "2", title: "Session starts", desc: "Voice and screenshare with your coach." },
      { icon: "3", title: "Plan delivered", desc: "Walk away with a custom improvement plan." },
    ],
  },

  // --- Rent A Booster ---------------------------------------------------
  "rent-a-booster": {
    serviceId: "rent-a-booster",
    featureTags: [
      { icon: "Flex", label: "Any task allowed" },
      { icon: "Fast", label: "Instant booster start" },
      { icon: "Time", label: "Pay per hour" },
    ],
    wins: [
      "A verified Rust player on your account by the hour",
      "Farming, building, scouting, roaming — all covered",
      "Skip the grind and keep your wipe moving",
      "Flexible hourly booking from 1 to 24 hours",
      "Honest hourly rate with no padding",
    ],
    steps: [
      { icon: "1", title: "Pick your hours", desc: "Choose 1-24 hours of pro support." },
      { icon: "2", title: "Set the goal", desc: "Tell the booster which tasks to handle." },
      { icon: "3", title: "Hours delivered", desc: "Your time is spent efficiently with full safety." },
    ],
  },
};
