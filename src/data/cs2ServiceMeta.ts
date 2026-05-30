export interface Cs2ServiceMeta {
  serviceId: string;
  /** Unique long-form description shown on the detail page. */
  description: string;
  /** Short badge-style feature tags (2-3). */
  tags: string[];
  /** 4 benefit cards. */
  benefits: string[];
  /** 3-4 "How it works" steps. */
  steps: string[];
}

export const cs2ServiceMeta: Record<string, Cs2ServiceMeta> = {
  "premier-rating": {
    serviceId: "premier-rating",
    description: "Level up your CS2 Premier rating with experienced players and stable performance.",
    tags: ["Up to 21k ELO", "High KD games", "Safe account handling"],
    benefits: [
      "Fast Premier Rating progress",
      "Stable matches with skilled players",
      "Optional number of pros",
      "Safe and clean gameplay",
    ],
    steps: [
      "Select your current and desired rating",
      "Choose service method and speed",
      "Place your order",
      "Track your progress",
    ],
  },
  "rent-a-booster": {
    serviceId: "rent-a-booster",
    description: "Hire a professional CS2 pro for hourly in-game assistance.",
    tags: ["Hourly session", "Any activity", "Up to 4 pros"],
    benefits: [
      "Flexible hourly gameplay",
      "Help with any CS2 activity",
      "Play with experienced players",
      "Great for difficult matches",
    ],
    steps: [
      "Choose session duration",
      "Select activity type",
      "Confirm your order",
      "Start playing with a pro",
    ],
  },
  "faceit-wins": {
    serviceId: "faceit-wins",
    description: "Get FACEIT wins with strong players and reliable match performance.",
    tags: ["Up to 5 wins", "High KD games", "All levels"],
    benefits: [
      "Fast FACEIT win completion",
      "Strong teammates every match",
      "Better match consistency",
      "Safe progress without software",
    ],
    steps: [
      "Select number of wins",
      "Choose service method",
      "Place your order",
      "Receive completed wins",
    ],
  },
  "faceit-rank": {
    serviceId: "faceit-rank",
    description: "Improve your FACEIT level and ELO with professional CS2 players.",
    tags: ["ELO climb", "Level climb", "Custom offer"],
    benefits: [
      "FACEIT level progression",
      "Better win rate",
      "Professional match performance",
      "Flexible rank goals",
    ],
    steps: [
      "Select current FACEIT level",
      "Select desired FACEIT level",
      "Choose extra options",
      "Follow the order progress",
    ],
  },
  "esea-rank": {
    serviceId: "esea-rank",
    description: "Reach your desired ESEA rank with reliable CS2 players.",
    tags: ["Any ESEA rank", "High KD games", "Safe progress"],
    benefits: [
      "ESEA rank improvement",
      "Skilled CS2 players",
      "Stable matchmaking results",
      "Smooth order tracking",
    ],
    steps: [
      "Choose current ESEA rank",
      "Choose target ESEA rank",
      "Select method and speed",
      "Complete your order",
    ],
  },
  "competitive-rank": {
    serviceId: "competitive-rank",
    description: "Climb CS2 Competitive ranks from Silver to Global with expert help.",
    tags: ["Silver to Global", "All maps", "High KD games"],
    benefits: [
      "Rank progression on selected maps",
      "Clean gameplay",
      "Professional CS2 players",
      "Fast and safe completion",
    ],
    steps: [
      "Select current rank",
      "Select target rank",
      "Pick preferred maps",
      "Start your order",
    ],
  },
  "wingman-rank": {
    serviceId: "wingman-rank",
    description: "Level up your CS2 Wingman rank with skilled players and fast results.",
    tags: ["Any Wingman rank", "Extra wins", "High KD games"],
    benefits: [
      "Fast Wingman rank progress",
      "Reliable 2v2 performance",
      "Optional extra wins",
      "Safe account handling",
    ],
    steps: [
      "Select current Wingman rank",
      "Select desired rank",
      "Choose additional wins",
      "Complete checkout",
    ],
  },
  "placement-matches": {
    serviceId: "placement-matches",
    description: "Complete your CS2 placement matches with strong results and safe gameplay.",
    tags: ["Up to 10 wins", "Competitive unlock", "No cheats"],
    benefits: [
      "Better placement results",
      "Strong performance in early matches",
      "Safe and manual gameplay",
      "Great start for new accounts",
    ],
    steps: [
      "Select number of placement matches",
      "Choose service method",
      "Place your order",
      "Get your matches completed",
    ],
  },
  "wins-boost": {
    serviceId: "wins-boost",
    description: "Order any number of CS2 wins with professional players.",
    tags: ["Any number of wins", "No software", "All ranks"],
    benefits: [
      "Fast win completion",
      "Works for any rank",
      "Manual gameplay only",
      "Stable performance",
    ],
    steps: [
      "Choose number of wins",
      "Select game mode",
      "Pick delivery speed",
      "Receive completed wins",
    ],
  },
  "armory-boost": {
    serviceId: "armory-boost",
    description: "Farm CS2 Armory credits efficiently with professional players.",
    tags: ["Armory credits", "No software", "Skin rewards"],
    benefits: [
      "Fast Armory credit farming",
      "Manual gameplay",
      "Chance to unlock valuable skins",
      "Safe progress tracking",
    ],
    steps: [
      "Select required Armory credits",
      "Choose delivery speed",
      "Place your order",
      "Receive completed progress",
    ],
  },
  "profile-rank": {
    serviceId: "profile-rank",
    description: "Level up your CS2 profile rank and unlock seasonal rewards.",
    tags: ["Up to 40 ranks", "Service Medal chance", "High KD games"],
    benefits: [
      "Faster profile rank progress",
      "Seasonal reward unlocks",
      "Manual gameplay only",
      "Professional performance",
    ],
    steps: [
      "Select current profile rank",
      "Select target rank",
      "Choose extra options",
      "Track your progress",
    ],
  },
  "coaching": {
    serviceId: "coaching",
    description: "Improve your CS2 mechanics, tactics, aim and game sense with a professional coach.",
    tags: ["Hourly coaching", "Pro tactics", "Skill improvement"],
    benefits: [
      "Personal CS2 training",
      "Aim and positioning advice",
      "Tactical improvement",
      "Better long-term progress",
    ],
    steps: [
      "Choose coaching duration",
      "Select your focus area",
      "Schedule your session",
      "Join and train with coach",
    ],
  },
  "esea-wins": {
    serviceId: "esea-wins",
    description: "Get ESEA wins with experienced CS2 players and reliable performance.",
    tags: ["Up to 5 wins", "All levels", "High KD games"],
    benefits: [
      "Fast ESEA wins",
      "Strong match performance",
      "Available for all levels",
      "Safe manual gameplay",
    ],
    steps: [
      "Select number of ESEA wins",
      "Choose service method",
      "Place the order",
      "Receive completed wins",
    ],
  },
  "global-elite-boost": {
    serviceId: "global-elite-boost",
    description: "Reach Global Elite rank with top-tier CS2 players.",
    tags: ["Global Elite rank", "Rank discounts", "High KD games"],
    benefits: [
      "Premium rank service",
      "High-level CS2 players",
      "Fast rank progression",
      "Safe and clean gameplay",
    ],
    steps: [
      "Select current rank",
      "Confirm Global Elite target",
      "Choose delivery speed",
      "Start your premium service",
    ],
  },
};
