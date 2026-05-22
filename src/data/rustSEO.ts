export interface RustServiceSEO {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  content: string;
}

const componentSEO = (
  label: string,
  packSize: number,
  use: string,
): RustServiceSEO => ({
  metaTitle: `Rust ${label} Farming Boost`,
  metaDescription: `Bulk Rust ${label.toLowerCase()} components farmed and delivered to your base. ${packSize} ${label.toLowerCase()} per pack, manual gathering, fast delivery.`,
  h1: `Rust ${label} Farming`,
  content: `
    <p>Bulk ${label} components delivered to your Rust base, ready for ${use}. Each pack contains ${packSize} ${label.toLowerCase()} farmed manually by Rust veterans.</p>
    <h2>Skip The Radtown Grind</h2>
    <p>Component grinding is one of the most repetitive parts of Rust. This service hands you the ${label.toLowerCase()} stockpile so you can focus on building, raiding, and PvP instead.</p>
    <h2>Manual Delivery</h2>
    <p>Manual farming only — no bots, no shortcuts. All components are delivered straight to your base or stash.</p>
  `,
});

const electronicsSEO = (label: string, use: string): RustServiceSEO => ({
  metaTitle: `Rust ${label} Crafting Boost`,
  metaDescription: `Buy pre-crafted Rust ${label}. Manual crafting by Rust veterans, fast delivery, ready to place in your base.`,
  h1: `Rust ${label} Crafting`,
  content: `
    <p>Pre-crafted ${label} delivered to your Rust base, ready ${use}. Our players handle the component farming, scrap recycling, and crafting so you don't have to.</p>
    <h2>Plug-And-Play Electronics</h2>
    <p>Skip the painful electrical grind. ${label} is delivered fully assembled and ready to wire into your power grid or trap setup.</p>
    <h2>Manual Crafting Only</h2>
    <p>Every order is handled manually by Rust veterans — no bots, no detection risk.</p>
  `,
});

export const rustSEO: Record<string, RustServiceSEO> = {
  // --- Base Building ----------------------------------------------------
  "advanced-base": {
    metaTitle: "Rust Advanced Base Boost Service",
    metaDescription:
      "Buy a professional Rust advanced base built for high raid cost, loot protection, and strong wipe progression. Manual build, fast delivery, full safety.",
    h1: "Rust Advanced Base Boost",
    content: `
      <p>Our Rust Advanced Base service is designed for players who want a stronger wipe start without spending hours planning and building. Experienced Rust players create a durable base structure with protected loot rooms, practical movement, and a higher raid cost.</p>
      <h2>Built For Real Wipe Pressure</h2>
      <p>The advanced layout balances raid cost, internal flow, and loot safety. You get a base that survives common raid patterns and gives you a clear progression path from Tier 1 through end-of-wipe gear.</p>
      <h2>Manual Build, Safe Delivery</h2>
      <p>No automation — only verified Rust veterans handle your base. Clean defensible structures with no shortcuts and no risk to your account or your wipe.</p>
    `,
  },
  "bunker-base": {
    metaTitle: "Rust Bunker Base Boost Service",
    metaDescription:
      "Buy a Rust bunker base build with secret entry, protected loot rooms, and strong raid resistance. Manual build by Rust veterans with fast delivery.",
    h1: "Rust Bunker Base Boost",
    content: `
      <p>The Bunker Base service delivers a multi-layered Rust base with a hidden entry system, protected loot rooms, and a layout designed to drain raider resources. It's the long-wipe option for players who want their loot to actually survive.</p>
      <h2>Why A Bunker?</h2>
      <p>Bunker designs force raiders to commit far more sulfur, time, and PvP coverage than a standard 2x2 — and most raiders will simply skip it. Our builders place the bunker entry, internal pathing, and TC protection so the design holds up under pressure.</p>
      <h2>Safe, Manual, Honest</h2>
      <p>Built by Rust players who play raids weekly. No bots, no scripts, no risk — just a strong base ready for whatever the wipe throws at you.</p>
    `,
  },
  "starter-base": {
    metaTitle: "Rust Starter Base Boost Service",
    metaDescription:
      "Buy a Rust starter base for a clean wipe start. Fast 1-3 hour build, essential protection, and smart layout for solos and groups.",
    h1: "Rust Starter Base Boost",
    content: `
      <p>The Starter Base service gets you out of the painful first wipe hour. Our builders drop a clean, defensible base in a smart location with the right doors, walls, and loot space to survive the early window.</p>
      <h2>Early Wipe, Done Right</h2>
      <p>Bad starter placements cost gear, time, and motivation. This service fixes that — you land into a base that's already secured so you can focus on farming and progression.</p>
      <h2>Fast Delivery</h2>
      <p>Most starter bases are completed in 1-3 hours from order. You can keep farming while we handle the build.</p>
    `,
  },
  "hourly-driving": {
    metaTitle: "Rust Hourly Driving Service",
    metaDescription:
      "Hire a Rust booster by the hour for farming, building, raiding, roaming, and custom goals. Pay only for the hours you need.",
    h1: "Rust Hourly Driving Boost",
    content: `
      <p>Hourly Driving puts a verified Rust player on your account by the hour for whatever task you need handled — farming, building, scouting, roaming, or progression. No fixed scope, no padding, just a clean hourly rate.</p>
      <h2>Any Task Allowed</h2>
      <p>Sleep through the wipe and still gear up. Hand off a sulfur run, a roof build, a monument route, or a roam session.</p>
      <h2>Flexible 1-24 Hour Bookings</h2>
      <p>Start with one hour or commit to a longer block. Safety, communication, and clean delivery are guaranteed across every booked hour.</p>
    `,
  },
  "workbench-boost": {
    metaTitle: "Rust Workbench Boost Service",
    metaDescription:
      "Buy a Rust workbench boost up to Tier 3 for crafting progression. Fast same-day boost, fair price, complete safety.",
    h1: "Rust Workbench Boost",
    content: `
      <p>Workbench Boost takes the painful scrap grind off your plate. We push your workbench progression up to Tier 3 so you can craft late-wipe weapons, modules, and explosives without the usual recycling marathon.</p>
      <h2>Tier 3 Unlocked</h2>
      <p>Once Tier 3 is live, the rest of the wipe becomes about raids and PvP — not about whether you have an AK. Our boost is the fastest path to that point.</p>
      <h2>Account-Safe Delivery</h2>
      <p>Everything is done manually by experienced Rust players. No tools, no cheats, no detection risk.</p>
    `,
  },

  // --- Raiding ----------------------------------------------------------
  "base-raiding-boost": {
    metaTitle: "Rust Base Raiding Boost Service",
    metaDescription:
      "Buy a Rust base raid carry — sulfur prep, explosives, online raid execution, and loot delivered. Manual service by experienced Rust raiders.",
    h1: "Rust Base Raiding Boost",
    content: `
      <p>Our Base Raiding Boost handles the full raid pipeline on an enemy base. From sulfur farming and explosives crafting to online raid execution and loot extraction, it's all included in one professional service.</p>
      <h2>Full Raid Coverage</h2>
      <p>Tell us the target. Our crew preps charges, scouts the base, executes the raid efficiently, and returns with the loot.</p>
      <h2>Safe And Efficient</h2>
      <p>No bots, no shortcuts. Just professional raid play with clean delivery and full account safety from start to finish.</p>
    `,
  },
  "cargo-ship-raid": {
    metaTitle: "Rust Cargo Ship Raid Boost",
    metaDescription:
      "Rust Cargo Ship raid carry — crates, locked crate, scientists, and PvP control. Loot secured and delivered to your stash.",
    h1: "Rust Cargo Ship Raid",
    content: `
      <p>Cargo Ship Raid is a complete Cargo run handled by experienced Rust players. Crates, scientists, the locked crate timer, and any PvP pressure are all covered.</p>
      <h2>Loot, Secured</h2>
      <p>Cargo Ship is one of the most contested events in Rust. Without coordination, the run usually ends with someone else taking your loot. This service flips that — your crew clears the ship and brings the loot back.</p>
      <h2>1-3 Hour Completion</h2>
      <p>Most Cargo orders complete within a single event window. Manual play only, no detection risk, full safety.</p>
    `,
  },
  "oil-rig-raid": {
    metaTitle: "Rust Oil Rig Raid Boost",
    metaDescription:
      "Rust Oil Rig raid boost for the locked crate, high-tier loot, scientists, and PvP coverage. Fast completion, manual delivery, safe.",
    h1: "Rust Oil Rig Raid",
    content: `
      <p>Oil Rig is one of Rust's highest-reward monument runs and one of the most dangerous to do alone. Our Oil Rig Raid Boost covers the scientists, the timer wait, the locked crate, and any PvP that lands during the run.</p>
      <h2>Locked Crate Delivered</h2>
      <p>The locked crate is the goal — we sit the timer correctly, defend the rig, and deliver the loot back to you.</p>
      <h2>Account-Safe Service</h2>
      <p>Manual play only, premium tier service, full Rust veteran coverage.</p>
    `,
  },
  "base-security": {
    metaTitle: "Rust Base Security Boost",
    metaDescription:
      "Improve your Rust base security with better doors, traps, storage protection, and safer layouts. Fast same-day fix without rebuilding.",
    h1: "Rust Base Security Boost",
    content: `
      <p>Base Security upgrades your existing Rust base without forcing a full rebuild. We harden doors, place electric traps, restructure loot rooms, and clean up weak choke points.</p>
      <h2>Tangible Loot Protection</h2>
      <p>The goal is simple: reduce loot loss the next time you get hit. Stronger doors, smarter trap placement, and better loot-room flow translate directly into surviving more raid attempts.</p>
      <h2>Fast, Manual, Account-Safe</h2>
      <p>Same-day completion in most cases. All work is manual and handled by verified Rust players.</p>
    `,
  },
  "hourly-pvp-assistance": {
    metaTitle: "Rust Hourly PvP Assistance",
    metaDescription:
      "Hourly Rust PvP support — roams, online raid defense, raid prep, and scouting. Pay only for the hours you need.",
    h1: "Rust Hourly PvP Assistance",
    content: `
      <p>Hourly PvP Assistance gives you a Rust combat veteran by the hour for everything around your raid and roam — sulfur farming, explosives prep, scouting, online raid attempts, and post-raid defense.</p>
      <h2>Combat On Demand</h2>
      <p>Most raids fail in the prep phase, not the execution. Hourly PvP support fixes that. Your hours are spent on whatever the raid actually needs.</p>
      <h2>Flexible 1-24 Hour Bookings</h2>
      <p>Book a single prep hour or commit to a multi-hour online raid window. Safety and account integrity stay the same across every booking.</p>
    `,
  },

  // --- Resources --------------------------------------------------------
  "resource-farm": {
    metaTitle: "Rust Resource Farming Boost",
    metaDescription:
      "Rust resource farming — stone, wood, sulfur, scrap, cloth and more. Manual farming, any amount, fast delivery.",
    h1: "Rust Resource Farming",
    content: `
      <p>The Resource Farm service hands off the most tedious part of Rust — manual gathering. Stone, wood, metal, sulfur, cloth, and other materials are farmed by hand and delivered to your base or crate.</p>
      <h2>Scalable Order Sizes</h2>
      <p>Order anywhere from 1 to 50 bundles. The price scales with the amount, so small farms and bulk farms are both supported.</p>
      <h2>No Bots, Ever</h2>
      <p>All gathering is manual. We use Rust veterans on real accounts — same standard we use for raids and base builds.</p>
    `,
  },
  "tea-farm": {
    metaTitle: "Rust Tea Farm Service",
    metaDescription:
      "Complete Rust tea farm and fabric production setup with all resources included. Long-term wipe income with low maintenance.",
    h1: "Rust Tea Farm Service",
    content: `
      <p>Tea Farm is a complete farming infrastructure order — planters, irrigation, fabric production, and the resources to keep it running.</p>
      <h2>All-In Setup</h2>
      <p>Seeds, fertilizer, sprinklers, water sources — all included. You receive a working farm ready to produce cloth, fabric, and teas at scale.</p>
      <h2>Best Value Service</h2>
      <p>Tea Farm is one of our top-rated Rust services. Done once, it carries you through the rest of the wipe with very little maintenance.</p>
    `,
  },
  "oil-barrel-farm": {
    metaTitle: "Rust Oil Barrel Farming Boost",
    metaDescription:
      "Fast Rust oil barrel farming for crude oil, low grade fuel, and scrap. Cheapest farming service in our Rust catalog.",
    h1: "Rust Oil Barrel Farming",
    content: `
      <p>Oil Barrel Farming covers the long road-running needed to gather crude oil, low grade fuel, and side-scrap from roadside barrels.</p>
      <h2>Early Wipe Fuel</h2>
      <p>Fuel is the silent currency of early wipe. Tools, vehicles, and quarries all need it. This service builds up your fuel reserve so you don't have to.</p>
      <h2>Same-Day Delivery</h2>
      <p>Most barrel farm orders are completed in a single play session. Manual only, no bots.</p>
    `,
  },
  "electronics-farm": {
    metaTitle: "Rust Electronics Farming Boost",
    metaDescription:
      "Rust electronics farming for electrical components, circuits, switches, and base automation parts.",
    h1: "Rust Electronics Farming",
    content: `
      <p>Electronics Farming gathers the electrical components that power base automation in Rust — switches, branches, splitters, smart alarms, and the rest.</p>
      <h2>Base Automation Ready</h2>
      <p>Once electronics are stockpiled, traps, alarms, and auto-turrets become trivial to set up. This service hands you that stockpile.</p>
      <h2>Manual Only</h2>
      <p>No bots, no shortcuts. Done by Rust veterans who play wipes weekly.</p>
    `,
  },
  "key-cards-farm": {
    metaTitle: "Rust Key Cards Farming Boost",
    metaDescription:
      "Rust key cards farming for monument puzzles, high-tier loot routes, and access progression. Green, blue, red cards covered.",
    h1: "Rust Key Cards Farming",
    content: `
      <p>Key Cards Farming delivers the green, blue, and red key cards used for Rust monument puzzles. With cards in hand, you unlock the highest-tier loot rooms across the map.</p>
      <h2>Monument Access, Solved</h2>
      <p>Most groups skip monument loot because puzzle runs take time and risk. This service removes that cost — cards land in your base, ready to use.</p>
      <h2>Same-Day Delivery</h2>
      <p>Manual farming, fast service, no bots.</p>
    `,
  },

  // --- Components -------------------------------------------------------
  "components-metal-spring": componentSEO("Metal Spring", 10, "high-tier weapon crafting"),
  "components-rifle-body": componentSEO("Rifle Body", 3, "AK and Bolt-action crafting"),
  "components-road-signs": componentSEO("Road Signs", 20, "armor crafting and recycling"),
  "components-rope": componentSEO("Rope", 50, "crossbow and holster crafting"),
  "components-sewing-kit": componentSEO("Sewing Kit", 20, "armor and clothing crafting"),
  "components-sheet-metal": componentSEO("Sheet Metal", 10, "armor, traps, and door crafting"),

  // --- Electronics ------------------------------------------------------
  "electronics-wind-turbine": electronicsSEO("Wind Turbines", "to mount on your base for renewable power"),
  "electronics-small-generator": electronicsSEO("Small Generators", "for backup power and trap setups"),
  "electronics-large-solar-panel": electronicsSEO("Large Solar Panels", "to plug into your electrical grid"),
  "electronics-lr-battery": electronicsSEO("LR Batteries", "for full base power buffering"),
  "electronics-mr-battery": electronicsSEO("MR Batteries", "for compact electrical setups"),
  "electronics-computer-station": electronicsSEO("Computer Stations", "for camera networks and CCTV"),
  "electronics-guntrap": electronicsSEO("Guntraps", "for hardened door defense"),
  "electronics-switch": electronicsSEO("Switches", "for trap base setups and remote power"),
  "electronics-sprinkler": electronicsSEO("Sprinklers", "to auto-irrigate your farm setup"),

  // --- Key Cards --------------------------------------------------------
  "key-cards-green": {
    metaTitle: "Rust Green Keycard Farming",
    metaDescription:
      "Rust green keycards farmed and delivered for low-tier monument puzzles. Manual gathering, same-day delivery.",
    h1: "Rust Green Keycard Farming",
    content: `
      <p>Green Keycards deliver access to Rust's low-tier monument puzzles. Our farmers gather and deliver the cards ready to use on your next monument run.</p>
      <h2>Monument Access</h2>
      <p>Skip the repetitive monument loops. Green keycards land in your base, ready for the next puzzle run.</p>
      <h2>Manual Farming</h2>
      <p>No bots, no automation — just experienced Rust farmers handling your order.</p>
    `,
  },
  "key-cards-blue": {
    metaTitle: "Rust Blue Keycard Farming",
    metaDescription:
      "Rust blue keycards farmed and delivered for mid-tier monument puzzles. Manual gathering, same-day delivery.",
    h1: "Rust Blue Keycard Farming",
    content: `
      <p>Blue Keycards unlock Rust's mid-tier monument puzzles. We farm and deliver the cards straight to your base or stash.</p>
      <h2>Mid-Tier Loot Rooms</h2>
      <p>Blue cards open the door to better loot tables — perfect for groups looking to skip the puzzle grind.</p>
      <h2>Manual Farming</h2>
      <p>Manual gathering only — every card is sourced by a veteran Rust player.</p>
    `,
  },
  "key-cards-red": {
    metaTitle: "Rust Red Keycard Farming",
    metaDescription:
      "Rust red keycards farmed and delivered for high-tier monument puzzles. Manual gathering, same-day delivery.",
    h1: "Rust Red Keycard Farming",
    content: `
      <p>Red Keycards unlock the top loot rooms in Rust — Launch Site, Military Tunnels, and other high-tier monuments. Our service delivers the cards manually so you can hit the best loot routes immediately.</p>
      <h2>Top-Tier Access</h2>
      <p>Red cards unlock the highest-value loot rooms in the game.</p>
      <h2>Manual Farming</h2>
      <p>Manual gathering only — every card is sourced by a veteran Rust player.</p>
    `,
  },

  // --- Oil Barrel -------------------------------------------------------
  "oil-barrel": {
    metaTitle: "Rust Oil Barrel Farming Boost",
    metaDescription:
      "Fast Rust oil barrel farming for crude oil, low grade fuel, and scrap. Cheapest farming service in our Rust catalog.",
    h1: "Rust Oil Barrel Farming",
    content: `
      <p>Oil Barrel Farming covers the long road-running needed to gather crude oil, low grade fuel, and side-scrap from roadside barrels in Rust.</p>
      <h2>Early Wipe Fuel</h2>
      <p>Fuel powers tools, vehicles, and quarries. This service builds up your fuel reserve so you don't have to spend hours on the road.</p>
      <h2>Same-Day Delivery</h2>
      <p>Most barrel farm orders complete in a single play session. Manual only, no bots.</p>
    `,
  },

  // --- Weapons ----------------------------------------------------------
  "weapons-farm": {
    metaTitle: "Rust Weapons Farming Boost",
    metaDescription:
      "Rust weapons farming for firearms, tools, attachments, and combat-ready gear. Manual delivery, fast turnaround.",
    h1: "Rust Weapons Farming",
    content: `
      <p>Weapons Farming delivers combat-ready Rust gear straight to your base — firearms, tools, attachments, and the supporting kit you need to PvP at full strength.</p>
      <h2>Skip The Grind, Keep The PvP</h2>
      <p>Rust gear loss is brutal. This service lets you replace lost loadouts fast so you stay competitive across the wipe.</p>
      <h2>Manual, Safe, Honest</h2>
      <p>Verified Rust players handle the gathering and crafting. No bots, no detection risk, full account safety.</p>
    `,
  },

  // --- Ammo -------------------------------------------------------------
  ammo: {
    metaTitle: "Rust Ammo Farming and Crafting Boost",
    metaDescription:
      "Rust ammo farming and crafting support — bullets, explosives prep, raid supplies. Any caliber, fast delivery.",
    h1: "Rust Ammo Farming Boost",
    content: `
      <p>Ammo orders cover bullets and explosives prep for every Rust loadout. Stockpiles delivered to your base, ready for the next raid or PvP push.</p>
      <h2>Raid Supply Prep</h2>
      <p>Big raids need big ammo. This service handles the gunpowder and scrap math so you can focus on the raid plan.</p>
      <h2>All Calibers</h2>
      <p>Pistol, rifle, shotgun, sniper — all calibers covered. Manual crafting only.</p>
    `,
  },

  // --- Coaching ---------------------------------------------------------
  coaching: {
    metaTitle: "Rust Coaching Service",
    metaDescription:
      "1-on-1 Rust coaching with veteran players. Improve base design, raiding, PvP, and game sense with a custom learning plan.",
    h1: "Rust Coaching",
    content: `
      <p>Rust Coaching pairs you with a veteran player for a 1-on-1 voice session focused on your weak points — base design, raiding, PvP mechanics, monument routing, or general game sense.</p>
      <h2>Custom Learning Plan</h2>
      <p>Your coach builds a session plan around your current skill level and goals. Walk away with a clear improvement plan you can actually follow next wipe.</p>
      <h2>Veteran Coach</h2>
      <p>All coaches are verified Rust players with years of wipe experience. Voice and screenshare supported.</p>
    `,
  },

  // --- Rent A Booster ---------------------------------------------------
  "rent-a-booster": {
    metaTitle: "Rust Rent A Booster Service",
    metaDescription:
      "Hire a verified Rust booster by the hour for any task — farming, building, scouting, roaming, or raids.",
    h1: "Rust Rent A Booster",
    content: `
      <p>Rent A Booster puts a verified Rust player on your account by the hour for whatever task you need handled — farming, building, scouting, roaming, raiding, or progression.</p>
      <h2>Any Task Allowed</h2>
      <p>No fixed scope, no padding, just a clean hourly rate. Hand off the grind and keep your wipe moving.</p>
      <h2>Flexible 1-24 Hour Bookings</h2>
      <p>Start with one hour or commit to a longer block. Safety, communication, and clean delivery are guaranteed across every booked hour.</p>
    `,
  },
};
