export interface ArenaFeatureTag {
  icon: string;
  label: string;
}

export interface ArenaHowItWorksStep {
  icon: string;
  title: string;
  desc: string;
}

export interface ArenaServiceMeta {
  serviceId: string;
  featureTags: ArenaFeatureTag[];
  wins: string[];
  steps: ArenaHowItWorksStep[];
}

export const arenaBreakoutServiceMeta: Record<string, ArenaServiceMeta> = {
  "koens-farming": {
    serviceId: "koens-farming",
    featureTags: [
      { icon: "Loot", label: "1M to 500M Koens" },
      { icon: "Route", label: "Efficient delivery routes" },
      { icon: "Safe", label: "Secure account handling" },
    ],
    wins: [
      "Massive Koens stock delivered without manual grind",
      "Fast currency flow for weapons, armor, and cases",
      "Experienced PRO looters running high-value routes efficiently",
      "Safe account handling with support during the full order",
    ],
    steps: [
      { icon: "1", title: "Set your amount", desc: "Pick how many millions of Koens you want delivered." },
      { icon: "2", title: "PRO starts the run", desc: "Our PRO looters begin the run and keep progress moving fast." },
      { icon: "3", title: "Koens delivered", desc: "Your order is completed and your stash is ready for upgrades." },
    ],
  },
  "raids-boost": {
    serviceId: "raids-boost",
    featureTags: [
      { icon: "Maps", label: "All major ABI maps" },
      { icon: "VIP", label: "VIP extraction focus" },
      { icon: "Modes", label: "Lockdown & Forbidden" },
    ],
    wins: [
      "Successful raid clears on the maps you choose",
      "Cleaner extracts with pro route control and PvP support",
      "Flexible packages for single raids or full grind sessions",
      "Safer progress through high-risk content and better loot runs",
    ],
    steps: [
      { icon: "1", title: "Choose map and mode", desc: "Select your preferred raid type and the number of runs." },
      { icon: "2", title: "Raid session begins", desc: "Our PRO handles rotations, fights, loot paths, and extracts." },
      { icon: "3", title: "Loot secured", desc: "Your selected raids are completed with efficient delivery." },
    ],
  },
  "titanium-case": {
    serviceId: "titanium-case",
    featureTags: [
      { icon: "Premium", label: "Premium case delivery" },
      { icon: "Fixed", label: "Fixed-price order" },
      { icon: "Fast", label: "24-48 hour ETA" },
    ],
    wins: [
      "Titanium 3x3 Case delivered without the usual grind",
      "Fast access to premium stash value and progression",
      "High-end service with clear fixed pricing from the start",
      "Support-backed delivery flow with a clean premium presentation",
    ],
    steps: [
      { icon: "1", title: "Place the order", desc: "No configuration needed beyond confirming the purchase." },
      { icon: "2", title: "Delivery is prepared", desc: "Our team handles the secure fulfillment flow for your case." },
      { icon: "3", title: "Case received", desc: "The Titanium Case lands in your account within the stated ETA." },
    ],
  },
  "coaching": {
    serviceId: "coaching",
    featureTags: [
      { icon: "1v1", label: "1-on-1 learning" },
      { icon: "PvP", label: "PvP and map mastery" },
      { icon: "Flex", label: "Flexible session length" },
    ],
    wins: [
      "Stronger map knowledge, rotations, and extraction timing",
      "Direct feedback from players who understand high-level ABI",
      "Coaching tailored to your current mistakes and goals",
      "Faster improvement than learning alone through trial and error",
    ],
    steps: [
      { icon: "1", title: "Book your session", desc: "Choose the number of coaching hours that fits your goal." },
      { icon: "2", title: "Train with a pro", desc: "Your coach reviews gameplay, routes, fights, and decision-making." },
      { icon: "3", title: "Apply and improve", desc: "Leave with practical habits you can use immediately in raids." },
    ],
  },
  "rent-a-booster": {
    serviceId: "rent-a-booster",
    featureTags: [
      { icon: "Duo", label: "Play alongside a pro" },
      { icon: "Live", label: "Real-time guidance" },
      { icon: "Instant", label: "Fast session start" },
    ],
    wins: [
      "A strong teammate for raids, quests, and high-risk pushes",
      "Real-time callouts, cover, and route guidance while you play",
      "Safer raids without handing over your account access",
      "Flexible hourly booking for both progression and learning",
    ],
    steps: [
      { icon: "1", title: "Pick your hours", desc: "Select how long you want a pro teammate by your side." },
      { icon: "2", title: "Queue up together", desc: "Your PRO teammate joins and supports your raids in real time." },
      { icon: "3", title: "Win more raids", desc: "You progress faster with live support, cover, and guidance." },
    ],
  },
};
