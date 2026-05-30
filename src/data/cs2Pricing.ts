import { SpeedOption } from "@/contexts/CartContext";

export type Cs2Method = "piloted" | "self-play-party" | "duo" | "live-coaching" | "vod-review";

export type Cs2PricingType =
  | "rating_range"
  | "hourly_packages"
  | "wins_package"
  | "faceit_level_range"
  | "esea_rank_range"
  | "competitive_rank_range"
  | "wingman_rank_range"
  | "placement_package"
  | "credits_package"
  | "profile_rank_range"
  | "coaching_package"
  | "global_elite_rank_range"
  | "per_unit"
  | "tiered_per_unit";

export type Cs2CalculatorValues = Record<string, number | string>;

export interface Cs2PackageOption {
  label: string;
  value: number | string;
  price: number;
}

interface RatingSegment {
  from: number;
  to: number;
  pricePer1000: number;
}

interface RangePricingConfig {
  type:
    | "faceit_level_range"
    | "esea_rank_range"
    | "competitive_rank_range"
    | "wingman_rank_range";
  currentKey: string;
  desiredKey: string;
  currentLabel: string;
  desiredLabel: string;
  options: string[];
  defaultCurrent: string;
  defaultDesired: string;
  transitions: number[];
}

interface Cs2BasePricingConfig {
  label: string;
  startPrice: string;
  type: Cs2PricingType;
  defaultValues: Cs2CalculatorValues;
}

export interface Cs2RatingConfig {
  currentKey: string;
  desiredKey: string;
  currentLabel: string;
  desiredLabel: string;
  min: number;
  max: number;
  step: number;
  formatBadge?: (value: number) => number | string;
}

export interface Cs2TieredPerUnitTier {
  label: string;
  value: string;
  pricePerUnit: number;
}

export interface Cs2TieredPerUnitConfig {
  tierKey: string;
  tierLabel: string;
  tiers: Cs2TieredPerUnitTier[];
  unitKey: string;
  unitLabel: string;
  unitNoun: string;
  min: number;
  max: number;
  step: number;
}

export interface Cs2PerUnitConfig {
  unitKey: string;
  unitLabel: string;
  unitNoun: string;
  pricePerUnit: number;
  min: number;
  max: number;
  step: number;
  minimumPrice?: number;
}

export interface Cs2CoachOption {
  name: string;
  pricePerHour: number;
}

export interface Cs2ServicePricingConfig extends Cs2BasePricingConfig {
  ratingValues?: number[];
  ratingSegments?: RatingSegment[];
  minimumPrice?: number;
  packageKey?: string;
  packageLabel?: string;
  packages?: Cs2PackageOption[];
  perUnit?: Cs2PerUnitConfig;
  tieredPerUnit?: Cs2TieredPerUnitConfig;
  ratingConfig?: Cs2RatingConfig;
  range?: RangePricingConfig;
  coaching?: {
    coachKey: string;
    hoursKey: string;
    coaches: Cs2CoachOption[];
    min: number;
    max: number;
    step: number;
  };
  globalElite?: {
    currentKey: string;
    desiredLabel: string;
    prices: Record<string, number>;
  };
  estimatedTime?: string;
}

export interface Cs2Modifier {
  id: string;
  label: string;
  multiplier: number;
  /** Short explanation shown in an info tooltip next to the option. */
  description?: string;
}

export const cs2MethodOptions: Cs2Modifier[] = [
  {
    id: "piloted",
    label: "Piloted",
    multiplier: 1,
    description: "Our pro logs into your account and plays for you. Fastest option, no extra charge.",
  },
  {
    id: "self-play-party",
    label: "Self-play / Party",
    multiplier: 1.85,
    description: "You stay logged in and queue in a party with our pro — no account sharing. +85%.",
  },
];

export const cs2CoachingMethodOptions: Cs2Modifier[] = [
  {
    id: "live-coaching",
    label: "Live Coaching",
    multiplier: 1,
    description: "A live 1-on-1 session — the coach watches and guides you in real time.",
  },
  {
    id: "vod-review",
    label: "VOD Review",
    multiplier: 1,
    description: "Send a recorded match; the coach reviews it and returns detailed feedback.",
  },
];

export const cs2DeliverySpeedOptions: {
  value: SpeedOption;
  label: string;
  multiplier: number;
  description?: string;
}[] = [
  { value: "normal", label: "Normal", multiplier: 1, description: "Standard queue and turnaround." },
  {
    value: "express",
    label: "Express",
    multiplier: 1.3,
    description: "Prioritised order with a faster booster assignment — 30% faster completion. +30%.",
  },
  {
    value: "super-express",
    label: "Super Express",
    multiplier: 1.4,
    description: "Top of the queue — the booster works on your order almost non-stop. 40% faster. +40%.",
  },
];

export const cs2AdditionalFeatures: Cs2Modifier[] = [
  {
    id: "streaming",
    label: "🎥 Livestream",
    multiplier: 1.1,
    description: "Watch a private live stream of every match while your order is completed. +10%.",
  },
  {
    id: "offlineMode",
    label: "🕵️ Offline Mode",
    multiplier: 1.15,
    description: "Your pro stays appearing offline to your Steam friends for full discretion. +15%.",
  },
];


export const getFaceitLevel = (elo: number): number => {
  if (elo <= 500) return 1;
  if (elo <= 750) return 2;
  if (elo <= 900) return 3;
  if (elo <= 1050) return 4;
  if (elo <= 1200) return 5;
  if (elo <= 1350) return 6;
  if (elo <= 1530) return 7;
  if (elo <= 1750) return 8;
  if (elo <= 2000) return 9;
  return 10;
};

const ratingValues = Array.from({ length: 26 }, (_, index) => index * 1000);

const perUnitConfig = (
  label: string,
  startPrice: string,
  perUnit: Cs2PerUnitConfig,
  defaultQty: number,
): Cs2ServicePricingConfig => ({
  label,
  startPrice,
  type: "per_unit",
  perUnit,
  defaultValues: { [perUnit.unitKey]: defaultQty },
});

export const cs2PricingConfig: Record<string, Cs2ServicePricingConfig> = {
  "premier-rating": {
    label: "Premier Rating",
    startPrice: "From $6.49",
    type: "rating_range",
    ratingValues,
    ratingSegments: [
      { from: 0, to: 10000, pricePer1000: 6.49 },
      { from: 10000, to: 15000, pricePer1000: 10.39 },
      { from: 15000, to: 20000, pricePer1000: 16.89 },
      { from: 20000, to: 25000, pricePer1000: 25.99 },
    ],
    defaultValues: { currentRating: 0, desiredRating: 5000 },
  },
  "rent-a-booster": perUnitConfig(
    "Rent a Pro",
    "From $16.89 / hour",
    { unitKey: "hours", unitLabel: "Hours", unitNoun: "hour", pricePerUnit: 16.89, min: 1, max: 24, step: 1 },
    2,
  ),
  "faceit-wins": {
    label: "FACEIT Wins",
    startPrice: "From $1.94 / win",
    type: "tiered_per_unit",
    defaultValues: { faceitLevel: "1-3", wins: 5 },
    tieredPerUnit: {
      tierKey: "faceitLevel",
      tierLabel: "Your FACEIT Level",
      tiers: [
        { label: "Level 1-3", value: "1-3", pricePerUnit: 1.94 },
        { label: "Level 4-5", value: "4-5", pricePerUnit: 2.59 },
        { label: "Level 6-7", value: "6-7", pricePerUnit: 3.89 },
        { label: "Level 8", value: "8", pricePerUnit: 5.19 },
        { label: "Level 9", value: "9", pricePerUnit: 7.79 },
        { label: "Level 10", value: "10", pricePerUnit: 10.39 },
      ],
      unitKey: "wins",
      unitLabel: "Number of Wins",
      unitNoun: "win",
      min: 1,
      max: 50,
      step: 1,
    },
  },
  "faceit-rank": {
    label: "FACEIT Rank",
    startPrice: "From $13.20",
    type: "rating_range",
    ratingSegments: [
      { from: 100, to: 500, pricePer1000: 33 },
      { from: 500, to: 750, pricePer1000: 46 },
      { from: 750, to: 900, pricePer1000: 59 },
      { from: 900, to: 1050, pricePer1000: 78 },
      { from: 1050, to: 1200, pricePer1000: 104 },
      { from: 1200, to: 1350, pricePer1000: 130 },
      { from: 1350, to: 1530, pricePer1000: 170 },
      { from: 1530, to: 1750, pricePer1000: 230 },
      { from: 1750, to: 2000, pricePer1000: 330 },
      { from: 2000, to: 2500, pricePer1000: 460 },
      { from: 2500, to: 3000, pricePer1000: 650 },
    ],
    ratingConfig: {
      currentKey: "currentElo",
      desiredKey: "desiredElo",
      currentLabel: "Current ELO",
      desiredLabel: "Desired ELO",
      min: 100,
      max: 3000,
      step: 10,
      formatBadge: getFaceitLevel,
    },
    defaultValues: { currentElo: 100, desiredElo: 500 },
  },
  "esea-rank": {
    label: "ESEA Rank",
    startPrice: "From $6.49",
    type: "esea_rank_range",
    defaultValues: { currentRank: "D-", desiredRank: "D" },
    range: {
      type: "esea_rank_range",
      currentKey: "currentRank",
      desiredKey: "desiredRank",
      currentLabel: "Current ESEA Rank",
      desiredLabel: "Desired ESEA Rank",
      options: ["D-", "D", "D+", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+", "G", "S"],
      defaultCurrent: "D-",
      defaultDesired: "D",
      transitions: [6.49, 6.49, 7.79, 7.79, 9.09, 9.09, 10.39, 11.69, 16.89, 19.49, 25.99, 38.99, 45.49],
    },
  },
  "competitive-rank": {
    label: "Competitive Rank",
    startPrice: "From $3.49",
    type: "competitive_rank_range",
    defaultValues: { currentRank: "S1", desiredRank: "S2" },
    range: {
      type: "competitive_rank_range",
      currentKey: "currentRank",
      desiredKey: "desiredRank",
      currentLabel: "Current Rank",
      desiredLabel: "Desired Rank",
      options: ["S1", "S2", "S3", "S4", "SE", "SEM", "GN1", "GN2", "GN3", "GNM", "MG1", "MG2", "MGE", "DMG", "LE", "LEM", "Supreme", "Global"],
      defaultCurrent: "S1",
      defaultDesired: "S2",
      transitions: [3.49, 3.49, 3.99, 4.49, 4.99, 6.49, 5.99, 6.49, 6.99, 7.99, 8.99, 9.99, 14.99, 19.99, 24.99, 34.99, 64.99],
    },
  },
  "wingman-rank": {
    label: "Wingman Rank",
    startPrice: "From $12.99",
    type: "wingman_rank_range",
    defaultValues: { currentRank: "Silver", desiredRank: "Gold" },
    range: {
      type: "wingman_rank_range",
      currentKey: "currentRank",
      desiredKey: "desiredRank",
      currentLabel: "Current Wingman Rank",
      desiredLabel: "Desired Wingman Rank",
      options: ["Silver", "Gold", "Nova", "MG", "LE", "Global"],
      defaultCurrent: "Silver",
      defaultDesired: "Gold",
      transitions: [12.99, 12.99, 16.89, 19.49, 32.49],
    },
  },
  "placement-matches": perUnitConfig(
    "Placement Matches",
    "From $1.94 / match",
    { unitKey: "placements", unitLabel: "Number of Placements", unitNoun: "placement", pricePerUnit: 1.94, min: 1, max: 20, step: 1 },
    5,
  ),
  "wins-boost": perUnitConfig(
    "Wins",
    "From $1.94 / win",
    { unitKey: "wins", unitLabel: "Number of Wins", unitNoun: "win", pricePerUnit: 1.94, min: 1, max: 60, step: 1 },
    5,
  ),
  "armory-boost": perUnitConfig(
    "The Armory",
    "From $3.89",
    { unitKey: "credits", unitLabel: "Armory Credits", unitNoun: "credit", pricePerUnit: 0.0389, min: 100, max: 10000, step: 100 },
    1000,
  ),
  "profile-rank": {
    label: "Profile Rank",
    startPrice: "From $12.99",
    type: "profile_rank_range",
    defaultValues: { currentProfileRank: 1, desiredProfileRank: 40 },
  },
  coaching: {
    label: "Coaching",
    startPrice: "From $19.49 / hour",
    type: "coaching_package",
    defaultValues: { coachLevel: "Faceit 8-10 Coach", hours: 1 },
    coaching: {
      coachKey: "coachLevel",
      hoursKey: "hours",
      min: 1,
      max: 20,
      step: 1,
      coaches: [
        { name: "Faceit 8-10 Coach", pricePerHour: 19.49 },
        { name: "Semi-Pro Coach", pricePerHour: 32.49 },
        { name: "Pro Coach", pricePerHour: 64.99 },
      ],
    },
  },
  "esea-wins": {
    label: "ESEA Wins",
    startPrice: "From $1.94 / win",
    type: "tiered_per_unit",
    defaultValues: { eseaRank: "D", wins: 5 },
    tieredPerUnit: {
      tierKey: "eseaRank",
      tierLabel: "Your ESEA Rank",
      tiers: [
        { label: "D- — D+", value: "D", pricePerUnit: 1.94 },
        { label: "C- — C+", value: "C", pricePerUnit: 2.59 },
        { label: "B- — B+", value: "B", pricePerUnit: 3.24 },
        { label: "A- — A+", value: "A", pricePerUnit: 5.19 },
        { label: "G — S", value: "G-S", pricePerUnit: 7.79 },
      ],
      unitKey: "wins",
      unitLabel: "Number of Wins",
      unitNoun: "win",
      min: 1,
      max: 50,
      step: 1,
    },
  },
  "global-elite-boost": {
    label: "Global Elite Boost",
    startPrice: "From $38.99",
    type: "global_elite_rank_range",
    defaultValues: { currentRank: "Supreme", desiredRank: "Global" },
    globalElite: {
      currentKey: "currentRank",
      desiredLabel: "Global Elite / Global",
      prices: {
        Supreme: 38.99,
        LE: 71.49,
        DMG: 90.99,
        "Any Rank": 116.99,
      },
    },
  },
};

export const formatUsd = (value: number) => `$${roundMoney(value).toFixed(2)}`;

export const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export const getCs2ServicePricing = (serviceSlug: string) => cs2PricingConfig[serviceSlug];

export const getCs2DefaultValues = (serviceSlug: string): Cs2CalculatorValues => ({
  ...(getCs2ServicePricing(serviceSlug)?.defaultValues ?? {}),
});

export const getCs2StartPrice = (serviceSlug: string) =>
  getCs2ServicePricing(serviceSlug)?.startPrice;

const calculateRatingRangePrice = (
  currentRating: number,
  desiredRating: number,
  config: Cs2ServicePricingConfig,
): number => {
  if (desiredRating <= currentRating || !config.ratingSegments) return 0;

  const total = config.ratingSegments.reduce((sum, segment) => {
    const overlapStart = Math.max(currentRating, segment.from);
    const overlapEnd = Math.min(desiredRating, segment.to);
    const overlap = Math.max(0, overlapEnd - overlapStart);
    return sum + (overlap / 1000) * segment.pricePer1000;
  }, 0);

  return total;
};

const calculateRangePrice = (range: RangePricingConfig, values: Cs2CalculatorValues): number => {
  const current = String(values[range.currentKey] ?? range.defaultCurrent);
  const desired = String(values[range.desiredKey] ?? range.defaultDesired);
  const currentIndex = range.options.indexOf(current);
  const desiredIndex = range.options.indexOf(desired);

  if (currentIndex < 0 || desiredIndex < 0 || desiredIndex <= currentIndex) return 0;

  return range.transitions
    .slice(currentIndex, desiredIndex)
    .reduce((sum, transitionPrice) => sum + transitionPrice, 0);
};

const findPackagePrice = (packages: Cs2PackageOption[] | undefined, value: number | string) =>
  packages?.find((item) => String(item.value) === String(value))?.price ?? 0;

export const getCs2BasePrice = (serviceSlug: string, values: Cs2CalculatorValues): number => {
  const config = getCs2ServicePricing(serviceSlug);
  if (!config) return 0;

  if (config.type === "rating_range") {
    const rc = config.ratingConfig;
    const currentKey = rc?.currentKey ?? "currentRating";
    const desiredKey = rc?.desiredKey ?? "desiredRating";
    return roundMoney(
      calculateRatingRangePrice(
        Number(values[currentKey] ?? config.defaultValues[currentKey]),
        Number(values[desiredKey] ?? config.defaultValues[desiredKey]),
        config,
      ),
    );
  }

  if (config.range) {
    return roundMoney(calculateRangePrice(config.range, values));
  }

  if (config.type === "profile_rank_range") {
    const currentRank = Number(values.currentProfileRank ?? config.defaultValues.currentProfileRank);
    const desiredRank = Number(values.desiredProfileRank ?? config.defaultValues.desiredProfileRank);
    const rankDifference = Math.max(0, desiredRank - currentRank);
    return roundMoney(rankDifference * 12.99);
  }

  if (config.perUnit) {
    const qty = Number(values[config.perUnit.unitKey] ?? config.perUnit.min);
    return roundMoney(Math.max(0, qty) * config.perUnit.pricePerUnit);
  }

  if (config.tieredPerUnit) {
    const tu = config.tieredPerUnit;
    const tierValue = String(values[tu.tierKey] ?? config.defaultValues[tu.tierKey]);
    const tier = tu.tiers.find((t) => t.value === tierValue) ?? tu.tiers[0];
    const qty = Number(values[tu.unitKey] ?? tu.min);
    return roundMoney(Math.max(0, qty) * tier.pricePerUnit);
  }

  if (config.packages && config.packageKey) {
    return roundMoney(findPackagePrice(config.packages, values[config.packageKey] ?? config.defaultValues[config.packageKey]));
  }


  if (config.coaching) {
    const coachName = String(values[config.coaching.coachKey] ?? config.defaultValues[config.coaching.coachKey]);
    const coach = config.coaching.coaches.find((option) => option.name === coachName) ?? config.coaching.coaches[0];
    const hours = Number(values[config.coaching.hoursKey] ?? config.defaultValues[config.coaching.hoursKey] ?? config.coaching.min);
    return roundMoney(Math.max(0, hours) * coach.pricePerHour);
  }

  if (config.globalElite) {
    const rank = String(values[config.globalElite.currentKey] ?? config.defaultValues[config.globalElite.currentKey]);
    return roundMoney(config.globalElite.prices[rank] ?? 0);
  }

  return 0;
};

export const getCs2ValidationMessage = (serviceSlug: string, values: Cs2CalculatorValues): string | null => {
  const config = getCs2ServicePricing(serviceSlug);
  if (!config) return "Please select a valid service.";

  if (config.type === "rating_range") {
    const rc = config.ratingConfig;
    const currentKey = rc?.currentKey ?? "currentRating";
    const desiredKey = rc?.desiredKey ?? "desiredRating";
    const current = Number(values[currentKey] ?? config.defaultValues[currentKey]);
    const desired = Number(values[desiredKey] ?? config.defaultValues[desiredKey]);
    return desired > current ? null : "Desired rating must be higher than current rating.";
  }

  if (config.range) {
    const current = String(values[config.range.currentKey] ?? config.range.defaultCurrent);
    const desired = String(values[config.range.desiredKey] ?? config.range.defaultDesired);
    const currentIndex = config.range.options.indexOf(current);
    const desiredIndex = config.range.options.indexOf(desired);
    return desiredIndex > currentIndex ? null : "Desired rank must be higher than current rank.";
  }


  if (config.perUnit) {
    const qty = Number(values[config.perUnit.unitKey] ?? config.perUnit.min);
    return qty > 0 ? null : "Please choose a quantity.";
  }

  if (config.tieredPerUnit) {
    const qty = Number(values[config.tieredPerUnit.unitKey] ?? config.tieredPerUnit.min);
    return qty > 0 ? null : "Please choose a quantity.";
  }

  if (config.coaching) {
    const hours = Number(values[config.coaching.hoursKey] ?? config.defaultValues[config.coaching.hoursKey] ?? config.coaching.min);
    return hours > 0 ? null : "Please choose the number of hours.";
  }

  if (config.packages && config.packageKey) {
    return findPackagePrice(config.packages, values[config.packageKey] ?? config.defaultValues[config.packageKey]) > 0
      ? null
      : "Please select a valid package.";
  }

  return null;
};

export const calculateCs2ServicePrice = ({
  serviceSlug,
  values,
  method,
  selectedFeatures,
  speed,
  promoDiscount = 0,
}: {
  serviceSlug: string;
  values: Cs2CalculatorValues;
  method: Cs2Method;
  selectedFeatures: Record<string, boolean>;
  speed: SpeedOption;
  /** Cart-level promo discount as a fraction (e.g. 0.2 for 20% off). */
  promoDiscount?: number;
}) => {
  const basePrice = getCs2BasePrice(serviceSlug, values);
  const methodOptions = serviceSlug === "coaching" ? cs2CoachingMethodOptions : cs2MethodOptions;
  const methodMultiplier = methodOptions.find((option) => option.id === method)?.multiplier ?? 1;
  const speedMultiplier = cs2DeliverySpeedOptions.find((option) => option.value === speed)?.multiplier ?? 1;
  const featureMultipliers = cs2AdditionalFeatures
    .filter((feature) => selectedFeatures[feature.id])
    .map((feature) => feature.multiplier);

  // Price after all up-charges, before any discount.
  const subtotal = roundMoney(
    [methodMultiplier, ...featureMultipliers, speedMultiplier].reduce(
      (price, multiplier) => price * multiplier,
      basePrice,
    ),
  );

  const safePromoDiscount = Math.max(0, promoDiscount);
  const finalPrice = roundMoney(subtotal * (1 - safePromoDiscount));

  return {
    basePrice,
    subtotal,
    finalPrice,
    formattedFinalPrice: formatUsd(finalPrice),
    methodMultiplier,
    speedMultiplier,
    featureMultipliers,
    promoDiscount: safePromoDiscount,
  };
};
