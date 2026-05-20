/**
 * Per-service boost-method & add-on pricing config.
 *
 * Used by every Dota 2 service page (dedicated and dynamic) along with the
 * shared <Dota2BoostMethodAndOptions /> component. Keep all multiplier and
 * tooltip changes in this single file.
 */

export type BoostMethod = "piloted" | "self-play";

export interface AdditionalOption {
  /** Stable id used for state. */
  id: string;
  /** Emoji rendered before the label. */
  icon: string;
  label: string;
  /** Percent surcharge applied to the running price (0 = free add-on). */
  percent: number;
  /** Tooltip text shown on hover of the [?] icon. */
  tooltip: string;
}

export interface Dota2ServicePricing {
  /**
   * Multiplier when "Self-play" is selected. 1.0 means no extra cost over
   * Piloted (we still show the toggle, just without a +%).
   */
  selfPlayMultiplier: number;
  /**
   * Add-on checkboxes shown only when Piloted is active. Order = render order.
   * Provide [] for services that have no add-ons.
   */
  additionalOptions: AdditionalOption[];
  /** When true, suppress the boost-method toggle entirely (Coaching). */
  hideBoostMethod?: boolean;
}

const TOOLTIPS = {
  liveStream: "Watch your boost live via private stream link",
  appearOffline: "Booster will set your status to offline during the boost",
  specificPosition: "Choose your preferred lane and hero pool",
  mmrHigh: "Service for accounts with MMR above 5620 (high bracket)",
  expressStart: "Priority queue — booster starts within 5 minutes",
  specificKeybinds: "Booster uses your custom keybind setup",
} as const;

const LIVE_STREAM: AdditionalOption = {
  id: "live-stream",
  icon: "🔴",
  label: "Live stream",
  percent: 30,
  tooltip: TOOLTIPS.liveStream,
};
const APPEAR_OFFLINE: AdditionalOption = {
  id: "appear-offline",
  icon: "👤",
  label: "Appear offline",
  percent: 0,
  tooltip: TOOLTIPS.appearOffline,
};
const SPECIFIC_POSITION: AdditionalOption = {
  id: "specific-position",
  icon: "⭐",
  label: "Specific position & heroes",
  percent: 0,
  tooltip: TOOLTIPS.specificPosition,
};
const MMR_HIGH: AdditionalOption = {
  id: "mmr-high",
  icon: "⚡",
  label: "MMR 5620+",
  percent: 25,
  tooltip: TOOLTIPS.mmrHigh,
};
const EXPRESS_START: AdditionalOption = {
  id: "express-start",
  icon: "⚡",
  label: "Express start & completion",
  percent: 50,
  tooltip: TOOLTIPS.expressStart,
};
const SPECIFIC_KEYBINDS: AdditionalOption = {
  id: "specific-keybinds",
  icon: "⌨",
  label: "Specific keybinds",
  percent: 10,
  tooltip: TOOLTIPS.specificKeybinds,
};

export const dota2ServicePricing: Record<string, Dota2ServicePricing> = {
  "mmr-boost": {
    selfPlayMultiplier: 1.0,
    additionalOptions: [LIVE_STREAM, APPEAR_OFFLINE, SPECIFIC_POSITION],
  },
  "calibration-boost": {
    selfPlayMultiplier: 1.0,
    additionalOptions: [LIVE_STREAM, APPEAR_OFFLINE],
  },
  "lp-removal": {
    selfPlayMultiplier: 1.5,
    additionalOptions: [MMR_HIGH, LIVE_STREAM, APPEAR_OFFLINE],
  },
  "behavior-score-boost": {
    selfPlayMultiplier: 1.5,
    additionalOptions: [MMR_HIGH, LIVE_STREAM, APPEAR_OFFLINE, SPECIFIC_POSITION],
  },
  "win-rate-boost": {
    selfPlayMultiplier: 1.5,
    additionalOptions: [LIVE_STREAM, APPEAR_OFFLINE],
  },
  "battle-cup": {
    selfPlayMultiplier: 1.9,
    additionalOptions: [LIVE_STREAM, APPEAR_OFFLINE],
  },
  "rank-tokens": {
    selfPlayMultiplier: 2.0,
    additionalOptions: [EXPRESS_START, SPECIFIC_KEYBINDS, LIVE_STREAM, APPEAR_OFFLINE],
  },
  coaching: {
    selfPlayMultiplier: 1.0,
    additionalOptions: [],
    hideBoostMethod: true,
  },
};

/* -------------------------------------------------------------------------- */
/*  Battle Cup tier / role config                                              */
/* -------------------------------------------------------------------------- */
export interface BattleCupTier {
  id: string;
  label: string;
  /** Per-cup dollar surcharge added on top of base × speed × method. */
  adder: number;
}

export const BATTLE_CUP_TIERS: BattleCupTier[] = [
  { id: "tier-3", label: "Tier 3", adder: 6.88 },
  { id: "tier-4", label: "Tier 4", adder: 6.88 },
  { id: "tier-5", label: "Tier 5", adder: 12.47 },
  { id: "tier-6", label: "Tier 6", adder: 15.48 },
  { id: "tier-7", label: "Tier 7", adder: 20.65 },
  { id: "tier-8", label: "Tier 8", adder: 34.41 },
];

export const BATTLE_CUP_ROLES = [
  { id: "carry", label: "Carry (1)" },
  { id: "mid", label: "Mid (2)" },
  { id: "offlane", label: "Offlane (3)" },
  { id: "soft-support", label: "Soft Support (4)" },
  { id: "hard-support", label: "Hard Support (5)" },
];

/* -------------------------------------------------------------------------- */
/*  Pricing chain helper                                                       */
/*                                                                             */
/*  Order: base → speed (caller's job) → method → tierAdder → options          */
/* -------------------------------------------------------------------------- */
export interface ApplyBoostOptionsArgs {
  priceAfterSpeed: number;
  boostMethod: BoostMethod;
  selfPlayMultiplier: number;
  additionalOptions: AdditionalOption[];
  checkedOptionIds: Set<string>;
  /** Dollar amount added after method multiplier, before options (e.g. Battle Cup tier × cups). */
  flatAdder?: number;
}

export const applyBoostOptionsPrice = ({
  priceAfterSpeed,
  boostMethod,
  selfPlayMultiplier,
  additionalOptions,
  checkedOptionIds,
  flatAdder = 0,
}: ApplyBoostOptionsArgs): number => {
  let p = priceAfterSpeed;
  if (boostMethod === "self-play" && selfPlayMultiplier !== 1) {
    p = p * selfPlayMultiplier;
  }
  if (flatAdder) {
    p = p + flatAdder;
  }
  if (boostMethod === "piloted") {
    for (const opt of additionalOptions) {
      if (opt.percent > 0 && checkedOptionIds.has(opt.id)) {
        p = p * (1 + opt.percent / 100);
      }
    }
  }
  return p;
};
