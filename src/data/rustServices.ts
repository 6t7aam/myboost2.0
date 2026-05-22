export type RustCategoryId =
  | "base-building"
  | "raiding"
  | "resources"
  | "components"
  | "electronics"
  | "key-cards"
  | "oil-barrel"
  | "weapons"
  | "ammo"
  | "coaching"
  | "rent-a-booster";

export type RustCalculatorType = "fixed" | "hourly" | "quantity";

export interface RustService {
  id: string;
  slug: string;
  category: RustCategoryId;
  title: string;
  description: string;
  /** Exactly three short selling points shown on the card. */
  bullets: [string, string, string];
  /** Base price for a single "unit" of the calculator (1 pack, 1 item, or 1 hour). */
  price: number;
  /** Used by `hourly` and as fallback label on cards. */
  unit?: string;
  badge?: string;
  image: string;
  delivery: string;
  rating: string;
  calculatorType: RustCalculatorType;

  /**
   * For `quantity` calculators only — how many real game items are contained
   * in each priced "pack". E.g. Metal Spring sells in packs of 10 for $5.85,
   * so `packSize = 10` and `packUnitLabel = "metal springs"`.
   * When `packSize` is 1, the calculator treats each step as a single item.
   */
  packSize?: number;
  packUnitLabel?: string;
  qtyMin?: number;
  qtyMax?: number;
  qtyStep?: number;
  qtyDefault?: number;
  /** Display label for the calculator unit. E.g. "pack", "card", "item". */
  qtyUnit?: string;
}

export interface RustCategory {
  id: RustCategoryId;
  title: string;
  shortTitle: string;
  description: string;
}

export const RUST_CATEGORIES: RustCategory[] = [
  {
    id: "base-building",
    title: "Base Building",
    shortTitle: "Base Building",
    description:
      "Professional Rust base building — secure layouts, raid-resistant designs, and clean wipe-start progression.",
  },
  {
    id: "raiding",
    title: "Raiding",
    shortTitle: "Raiding",
    description:
      "Full Rust raiding services — base raids, monument runs, and hourly raid support backed by veteran players.",
  },
  {
    id: "resources",
    title: "Resources",
    shortTitle: "Resources",
    description:
      "Rust resource farming for stone, wood, sulfur, scrap, cloth, fabric, and farm infrastructure setups.",
  },
  {
    id: "components",
    title: "Components",
    shortTitle: "Components",
    description:
      "Stockpile Rust components — metal springs, rifle bodies, road signs, rope, sewing kits, and sheet metal.",
  },
  {
    id: "electronics",
    title: "Electronics",
    shortTitle: "Electronics",
    description:
      "Pre-crafted Rust electronics — generators, solar panels, batteries, computer stations, and trap parts.",
  },
  {
    id: "key-cards",
    title: "Key Cards",
    shortTitle: "Key Cards",
    description:
      "Green, blue, and red Rust key cards delivered ready for monument puzzles and high-tier loot routes.",
  },
  {
    id: "oil-barrel",
    title: "Oil Barrel",
    shortTitle: "Oil Barrel",
    description:
      "Rust oil barrel farming for crude oil, low grade fuel, and side scrap — the cheapest farm in the catalog.",
  },
  {
    id: "weapons",
    title: "Weapons",
    shortTitle: "Weapons",
    description:
      "Combat-ready Rust weapons farmed and crafted by veteran players, delivered straight to your stash.",
  },
  {
    id: "ammo",
    title: "Ammo",
    shortTitle: "Ammo",
    description:
      "Bulk Rust ammo for raids, PvP, and roam loadouts. Bullets and explosives prep covered for every caliber.",
  },
  {
    id: "coaching",
    title: "Coaching",
    shortTitle: "Coaching",
    description:
      "1-on-1 Rust coaching with veteran players — base design, raiding, PvP mechanics, and game sense.",
  },
  {
    id: "rent-a-booster",
    title: "Rent A Booster",
    shortTitle: "Rent A Booster",
    description:
      "Hire a verified Rust booster by the hour for any task — farming, building, scouting, roaming, or raids.",
  },
];

export const RUST_STATS = {
  orders: "600+",
  rating: "4.9",
  speed: "1-24 hrs",
} as const;

export const RUST_GAME_TITLE = "Rust";
export const RUST_GAME_SLUG = "rust";
export const RUST_HERO_IMAGE =
  "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/252490/ss_c27e1201e68812e48a12ca6e44b60a3e3f3d7.1920x1080.jpg";

/**
 * Placeholder image used by the card / layout when a custom service image is
 * not yet available on disk. Returns a dark themed SVG with the service name.
 */
export const rustPlaceholderImage = (name: string, w = 400, h = 300) =>
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='" +
  w +
  "' height='" +
  h +
  "'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23161616'/%3E%3Cstop offset='100%25' stop-color='%230a0a0a'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='" +
  w +
  "' height='" +
  h +
  "' fill='url(%23g)'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter, Arial, sans-serif' font-weight='900' font-size='22' fill='%23ffd700' letter-spacing='2'%3E" +
  encodeURIComponent(name.toUpperCase()) +
  "%3C/text%3E%3C/svg%3E";

export const rustServices: RustService[] = [
  // --- 1. Base Building ---------------------------------------------------
  {
    id: "advanced-base",
    slug: "advanced-base",
    category: "base-building",
    title: "Advanced Base",
    description:
      "Professional Rust advanced base design and building service for maximum raid cost and stronger defense.",
    bullets: ["Advanced defensive layout", "High raid cost design", "Manual build only"],
    price: 22.49,
    badge: "POPULAR",
    image: "/images/rust/advanced-base.webp",
    delivery: "4-8 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },
  {
    id: "bunker-base",
    slug: "bunker-base",
    category: "base-building",
    title: "Bunker Base",
    description:
      "Secure bunker base construction for Rust with smart layout, protected loot rooms, and strong raid resistance.",
    bullets: ["Bunker entry system", "Protected loot rooms", "High raid resistance"],
    price: 24.99,
    badge: "BEST VALUE",
    image: "/images/rust/bunker-base.webp",
    delivery: "4-10 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },
  {
    id: "starter-base",
    slug: "starter-base",
    category: "base-building",
    title: "Starter Base",
    description:
      "Fast starter base setup for a clean early wipe start with essential protection and smart progression.",
    bullets: ["Early-wipe ready", "1-3 hour delivery", "Smart placement"],
    price: 9.99,
    badge: "FAST DELIVERY",
    image: "/images/rust/starter-base.webp",
    delivery: "1-3 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },
  {
    id: "hourly-driving",
    slug: "hourly-driving",
    category: "base-building",
    title: "Hourly Driving",
    description:
      "Hire a Rust booster by the hour for building, farming, progression, and roaming with any task allowed.",
    bullets: ["Any task allowed", "Pay per hour", "Instant booster start"],
    price: 7.99,
    unit: "hour",
    badge: "FLEXIBLE",
    image: "/images/rust/hourly-driving.webp",
    delivery: "Instant start",
    rating: "4.9",
    calculatorType: "hourly",
  },
  {
    id: "workbench-boost",
    slug: "workbench-boost",
    category: "base-building",
    title: "Workbench Boost",
    description:
      "Fast Rust workbench boost to unlock crafting progression and reach higher tier items faster.",
    bullets: ["Up to Tier 3", "Crafting unlocked", "Same-day boost"],
    price: 5.99,
    badge: "FAST DELIVERY",
    image: "/images/rust/workbench-boost.webp",
    delivery: "1-4 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },

  // --- 2. Raiding ---------------------------------------------------------
  {
    id: "base-raiding-boost",
    slug: "base-raiding-boost",
    category: "raiding",
    title: "Base Raiding Boost",
    description:
      "Professional Rust base raiding service to destroy enemy bases and secure valuable loot safely.",
    bullets: ["Enemy base destroyed", "Loot delivered to you", "Veteran raiders"],
    price: 59.99,
    badge: "POPULAR",
    image: "/images/rust/base-raiding-boost.webp",
    delivery: "4-12 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },
  {
    id: "cargo-ship-raid",
    slug: "cargo-ship-raid",
    category: "raiding",
    title: "Cargo Ship Raid",
    description:
      "Rust Cargo Ship raid carry with professional support for loot, crates, PvP pressure, and extraction.",
    bullets: ["Full cargo cleared", "Locked crate handled", "1-3 hr completion"],
    price: 14.99,
    badge: "HOT",
    image: "/images/rust/cargo-ship-raid-boost.webp",
    delivery: "1-3 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },
  {
    id: "oil-rig-raid",
    slug: "oil-rig-raid",
    category: "raiding",
    title: "Oil Rig Raid",
    description:
      "Rust Oil Rig raid boost for high-value loot, locked crates, PvP control, and safe completion.",
    bullets: ["Locked crate looted", "Scientists handled", "PvP control"],
    price: 34.99,
    badge: "BEST VALUE",
    image: "/images/rust/oil-rig-raid-boost.webp",
    delivery: "2-4 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },
  {
    id: "base-security",
    slug: "base-security",
    category: "raiding",
    title: "Base Security",
    description:
      "Improve your Rust base security with better doors, traps, storage protection, and safer layouts.",
    bullets: ["Hardened doors", "Trap layouts", "Reduced loot loss"],
    price: 4.99,
    badge: "SAFE",
    image: "/images/rust/base-security-boost.webp",
    delivery: "1-3 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },
  {
    id: "hourly-pvp-assistance",
    slug: "hourly-pvp-assistance",
    category: "raiding",
    title: "Hourly PvP Assistance",
    description:
      "Hourly Rust PvP support for roams, online raid defense, base hits, and raid prep scouting.",
    bullets: ["Roam + raid support", "Any task allowed", "Pay per hour"],
    price: 7.99,
    unit: "hour",
    badge: "FLEXIBLE",
    image: "/images/rust/raiding-hourly-driving.webp",
    delivery: "Instant start",
    rating: "4.9",
    calculatorType: "hourly",
  },

  // --- 3. Resources -------------------------------------------------------
  {
    id: "resource-farm",
    slug: "resource-farm",
    category: "resources",
    title: "Resource Farm",
    description:
      "Bulk Rust resource farming for stone, wood, metal, sulfur, cloth, and other essential materials.",
    bullets: ["Stone, sulfur, scrap", "Manual farming only", "Delivered to your base"],
    price: 2.93,
    badge: "POPULAR",
    image: "/images/rust/resources.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1000,
    packUnitLabel: "resources",
    qtyMin: 1,
    qtyMax: 50,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "bundle",
  },
  {
    id: "tea-farm",
    slug: "tea-farm",
    category: "resources",
    title: "Tea Farm",
    description:
      "Complete Rust tea farm setup and farming support with resources included for efficient production.",
    bullets: ["Full tea + fabric farm", "All resources included", "Long-wipe income"],
    price: 29.99,
    badge: "BEST VALUE",
    image: "/images/rust/tea-farm.webp",
    delivery: "4-8 hrs",
    rating: "4.9",
    calculatorType: "fixed",
  },
  {
    id: "oil-barrel-farm",
    slug: "oil-barrel-farm",
    category: "resources",
    title: "Oil Barrel Farm",
    description:
      "Fast Rust oil barrel farming service for fuel, crude oil, scrap, and early wipe resource support.",
    bullets: ["Crude + low grade", "Cheapest farm option", "Same-day delivery"],
    price: 1.09,
    badge: "HOT",
    image: "/images/rust/oil-barrel-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 5,
    packUnitLabel: "oil barrels",
    qtyMin: 1,
    qtyMax: 50,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },
  {
    id: "electronics-farm",
    slug: "electronics-farm",
    category: "resources",
    title: "Electronics Farm",
    description:
      "Rust electronics farming boost for electrical components, tech items, circuits, and base automation.",
    bullets: ["Circuits + switches", "Base automation ready", "Manual gathering"],
    price: 3.99,
    badge: "FAST DELIVERY",
    image: "/images/rust/electronics-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "electronics item",
    qtyMin: 1,
    qtyMax: 25,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "item",
  },
  {
    id: "key-cards-farm",
    slug: "key-cards-farm",
    category: "resources",
    title: "Key Cards Farm",
    description:
      "Rust key cards farming service for monument progression, puzzle access, and high-tier loot routes.",
    bullets: ["Green / blue / red", "Monument access", "Manual farming only"],
    price: 9.99,
    badge: "HOT",
    image: "/images/rust/key-cards-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "key card",
    qtyMin: 1,
    qtyMax: 15,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "card",
  },

  // --- 4. Components ------------------------------------------------------
  {
    id: "components-metal-spring",
    slug: "components-metal-spring",
    category: "components",
    title: "Metal Spring",
    description:
      "Bulk Metal Spring components farmed and delivered to your Rust base, ready for high-tier weapon crafting.",
    bullets: ["10 metal springs per pack", "Manual scrap farming", "Same-day delivery"],
    price: 5.85,
    badge: "POPULAR",
    image: "/images/rust/components.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 10,
    packUnitLabel: "metal springs",
    qtyMin: 1,
    qtyMax: 30,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },
  {
    id: "components-rifle-body",
    slug: "components-rifle-body",
    category: "components",
    title: "Rifle Body",
    description:
      "Rifle Body components for AK and Bolt-action crafting, farmed and delivered straight to your base.",
    bullets: ["3 rifle bodies per pack", "AK / Bolt ready", "Same-day delivery"],
    price: 5.85,
    badge: "HOT",
    image: "/images/rust/components.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 3,
    packUnitLabel: "rifle bodies",
    qtyMin: 1,
    qtyMax: 30,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },
  {
    id: "components-road-signs",
    slug: "components-road-signs",
    category: "components",
    title: "Road Signs",
    description:
      "Road Sign components for armor crafting and recycling — farmed manually and delivered to your Rust base.",
    bullets: ["20 road signs per pack", "Armor crafting ready", "Manual farming"],
    price: 5.85,
    image: "/images/rust/components.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 20,
    packUnitLabel: "road signs",
    qtyMin: 1,
    qtyMax: 30,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },
  {
    id: "components-rope",
    slug: "components-rope",
    category: "components",
    title: "Rope",
    description:
      "Bulk Rope components for crossbow, holster, and high-tier crafting, farmed manually by veteran players.",
    bullets: ["50 ropes per pack", "Crossbow / holster ready", "Same-day delivery"],
    price: 5.85,
    image: "/images/rust/components.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 50,
    packUnitLabel: "ropes",
    qtyMin: 1,
    qtyMax: 30,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },
  {
    id: "components-sewing-kit",
    slug: "components-sewing-kit",
    category: "components",
    title: "Sewing Kit",
    description:
      "Sewing Kit components for clothing and roadsign armor crafting, delivered ready to use in your base.",
    bullets: ["20 sewing kits per pack", "Armor + clothing crafts", "Manual gathering"],
    price: 5.85,
    image: "/images/rust/components.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 20,
    packUnitLabel: "sewing kits",
    qtyMin: 1,
    qtyMax: 30,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },
  {
    id: "components-sheet-metal",
    slug: "components-sheet-metal",
    category: "components",
    title: "Sheet Metal",
    description:
      "Sheet Metal components for armor, traps, and door crafting — bulk delivered to your Rust base.",
    bullets: ["10 sheet metals per pack", "Armor / trap crafting", "Same-day delivery"],
    price: 5.85,
    image: "/images/rust/components.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 10,
    packUnitLabel: "sheet metals",
    qtyMin: 1,
    qtyMax: 30,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },

  // --- 5. Electronics -----------------------------------------------------
  {
    id: "electronics-wind-turbine",
    slug: "electronics-wind-turbine",
    category: "electronics",
    title: "Wind Turbine",
    description:
      "Pre-crafted Wind Turbines delivered to your Rust base — ready to power your electrical setup.",
    bullets: ["Ready-to-place turbines", "Power your grid", "Manual crafting"],
    price: 3.99,
    badge: "POPULAR",
    image: "/images/rust/electronics-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "wind turbine",
    qtyMin: 1,
    qtyMax: 20,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "item",
  },
  {
    id: "electronics-small-generator",
    slug: "electronics-small-generator",
    category: "electronics",
    title: "Small Generator",
    description:
      "Small Generator units crafted and delivered to your Rust base for backup power and trap setups.",
    bullets: ["Backup power", "Trap-ready", "Manual crafting"],
    price: 3.99,
    image: "/images/rust/electronics-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "small generator",
    qtyMin: 1,
    qtyMax: 20,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "item",
  },
  {
    id: "electronics-large-solar-panel",
    slug: "electronics-large-solar-panel",
    category: "electronics",
    title: "Large Solar Panel",
    description:
      "Large Solar Panels crafted and delivered ready to wire into your Rust base electrical grid.",
    bullets: ["High output panels", "Plug-and-play", "Manual crafting"],
    price: 3.99,
    badge: "HOT",
    image: "/images/rust/electronics-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "large solar panel",
    qtyMin: 1,
    qtyMax: 20,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "item",
  },
  {
    id: "electronics-lr-battery",
    slug: "electronics-lr-battery",
    category: "electronics",
    title: "LR Battery",
    description:
      "Large Rechargeable (LR) Batteries crafted and delivered for full base power buffering.",
    bullets: ["High-capacity storage", "Stabilises power grid", "Manual crafting"],
    price: 3.99,
    image: "/images/rust/electronics-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "LR battery",
    qtyMin: 1,
    qtyMax: 20,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "item",
  },
  {
    id: "electronics-mr-battery",
    slug: "electronics-mr-battery",
    category: "electronics",
    title: "MR Battery",
    description:
      "Medium Rechargeable (MR) Batteries crafted and delivered to your base for compact electrical setups.",
    bullets: ["Mid-tier storage", "Compact wiring", "Manual crafting"],
    price: 3.99,
    image: "/images/rust/electronics-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "MR battery",
    qtyMin: 1,
    qtyMax: 20,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "item",
  },
  {
    id: "electronics-computer-station",
    slug: "electronics-computer-station",
    category: "electronics",
    title: "Computer Station",
    description:
      "Pre-crafted Computer Stations delivered to your Rust base for camera networks and CCTV setups.",
    bullets: ["CCTV-ready", "Camera networking", "Manual crafting"],
    price: 3.99,
    badge: "SAFE",
    image: "/images/rust/electronics-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "computer station",
    qtyMin: 1,
    qtyMax: 10,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "item",
  },
  {
    id: "electronics-guntrap",
    slug: "electronics-guntrap",
    category: "electronics",
    title: "Guntrap",
    description:
      "Auto-defense Guntraps crafted and delivered to your Rust base for hardened door defense.",
    bullets: ["Auto-defense", "Door / window ready", "Manual crafting"],
    price: 3.99,
    image: "/images/rust/electronics-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "guntrap",
    qtyMin: 1,
    qtyMax: 20,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "item",
  },
  {
    id: "electronics-switch",
    slug: "electronics-switch",
    category: "electronics",
    title: "Switch",
    description:
      "Electrical Switches crafted and delivered for trap base setups and remote power control.",
    bullets: ["Remote control", "Trap base setups", "Manual crafting"],
    price: 3.99,
    image: "/images/rust/electronics-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "switch",
    qtyMin: 1,
    qtyMax: 30,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "item",
  },
  {
    id: "electronics-sprinkler",
    slug: "electronics-sprinkler",
    category: "electronics",
    title: "Sprinkler",
    description:
      "Pre-crafted Sprinklers delivered ready to plug into your Rust farm or tea production setup.",
    bullets: ["Auto-irrigation", "Farm-ready", "Manual crafting"],
    price: 3.99,
    image: "/images/rust/electronics-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "sprinkler",
    qtyMin: 1,
    qtyMax: 20,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "item",
  },

  // --- 6. Key Cards -------------------------------------------------------
  {
    id: "key-cards-green",
    slug: "key-cards-green",
    category: "key-cards",
    title: "Green Card",
    description:
      "Green Keycards delivered ready for low-tier monument puzzles and early Rust loot routes.",
    bullets: ["Low-tier monument access", "Same-day farm", "Manual gathering"],
    price: 9.99,
    badge: "POPULAR",
    image: "/images/rust/key-cards-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "green keycard",
    qtyMin: 1,
    qtyMax: 15,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "card",
  },
  {
    id: "key-cards-blue",
    slug: "key-cards-blue",
    category: "key-cards",
    title: "Blue Card",
    description:
      "Blue Keycards delivered for mid-tier Rust monument puzzles and intermediate loot rooms.",
    bullets: ["Mid-tier monument access", "Puzzle ready", "Manual gathering"],
    price: 15.99,
    badge: "HOT",
    image: "/images/rust/key-cards-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "blue keycard",
    qtyMin: 1,
    qtyMax: 15,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "card",
  },
  {
    id: "key-cards-red",
    slug: "key-cards-red",
    category: "key-cards",
    title: "Red Card",
    description:
      "Red Keycards delivered for high-tier Rust monument puzzles and the top loot rooms in the game.",
    bullets: ["High-tier monument access", "Top loot rooms", "Manual gathering"],
    price: 24.99,
    badge: "BEST VALUE",
    image: "/images/rust/key-cards-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "red keycard",
    qtyMin: 1,
    qtyMax: 10,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "card",
  },

  // --- 7. Oil Barrel ------------------------------------------------------
  {
    id: "oil-barrel",
    slug: "oil-barrel",
    category: "oil-barrel",
    title: "Oil Barrel",
    description:
      "Crude oil and low grade fuel farmed from roadside barrels — the cheapest farm in the Rust catalog.",
    bullets: ["5 oil barrels per pack", "Crude + low grade", "Manual road farming"],
    price: 1.09,
    badge: "POPULAR",
    image: "/images/rust/oil-barrel-farm.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 5,
    packUnitLabel: "oil barrels",
    qtyMin: 1,
    qtyMax: 50,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },

  // --- 8. Weapons ---------------------------------------------------------
  {
    id: "weapons-farm",
    slug: "weapons-farm",
    category: "weapons",
    title: "Weapons",
    description:
      "Combat-ready Rust weapons farmed, crafted, and delivered to your base — any weapon, any loadout.",
    bullets: ["Any weapon", "Combat-ready gear", "Manual delivery"],
    price: 7.99,
    badge: "POPULAR",
    image: "/images/rust/weapons.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 1,
    packUnitLabel: "weapon",
    qtyMin: 1,
    qtyMax: 15,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "weapon",
  },

  // --- 9. Ammo -----------------------------------------------------------
  {
    id: "ammo",
    slug: "ammo",
    category: "ammo",
    title: "Ammo",
    description:
      "Bulk Rust ammo farmed and crafted for every caliber — bullets, explosives prep, and raid supplies.",
    bullets: ["All calibers", "Raid supply prep", "Manual crafting"],
    price: 3.99,
    badge: "FAST DELIVERY",
    image: "/images/rust/ammo.webp",
    delivery: "Same day",
    rating: "4.9",
    calculatorType: "quantity",
    packSize: 200,
    packUnitLabel: "rounds",
    qtyMin: 1,
    qtyMax: 50,
    qtyStep: 1,
    qtyDefault: 1,
    qtyUnit: "pack",
  },

  // --- 10. Coaching -------------------------------------------------------
  {
    id: "coaching",
    slug: "coaching",
    category: "coaching",
    title: "Coaching",
    description:
      "1-on-1 Rust coaching with veteran players — base design, raiding, PvP mechanics, and wipe planning.",
    bullets: ["1-on-1 voice session", "Veteran coach", "Custom learning plan"],
    price: 14.99,
    unit: "hour",
    badge: "SAFE",
    image: "/images/rust/hourly-driving.webp",
    delivery: "Instant start",
    rating: "4.9",
    calculatorType: "hourly",
  },

  // --- 11. Rent A Booster -------------------------------------------------
  {
    id: "rent-a-booster",
    slug: "rent-a-booster",
    category: "rent-a-booster",
    title: "Rent A Booster",
    description:
      "Hire a verified Rust booster by the hour for any task — farming, building, scouting, roaming, or raids.",
    bullets: ["Any task allowed", "Pay per hour", "Veteran Rust pros"],
    price: 7.99,
    unit: "hour",
    badge: "FLEXIBLE",
    image: "/images/rust/resources-hourly-driving.webp",
    delivery: "Instant start",
    rating: "4.9",
    calculatorType: "hourly",
  },
];

export const getRustServiceBySlug = (slug: string): RustService | undefined =>
  rustServices.find((s) => s.slug === slug);

export const getRustServicesByCategory = (
  categoryId: RustCategoryId,
): RustService[] => rustServices.filter((s) => s.category === categoryId);

export const getRustCategory = (id: RustCategoryId): RustCategory | undefined =>
  RUST_CATEGORIES.find((c) => c.id === id);
