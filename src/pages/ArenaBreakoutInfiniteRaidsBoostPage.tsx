import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Swords, CheckCircle, Star, Zap, Shield, Clock, Trophy } from "lucide-react";

const ArenaBreakoutInfiniteRaidsBoostPage = () => {
  return (
    <>
      <SEO
        title="Arena Breakout: Infinite Raids Boost - Professional Raid Carry Service"
        description="Arena Breakout: Infinite raids boost on all maps. Expert Lockdown & Forbidden mode carries with VIP extraction. 30-60 min per raid, guaranteed loot. Safe & professional ABI raid service."
        keywords="arena breakout infinite raids boost, abi raids carry, arena breakout infinite raid service, lockdown mode carry, forbidden mode boost"
        canonicalUrl="https://www.myboost.top/arena-breakout-infinite-raids-boost"
      />
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase text-primary">Expert Raid Carries</span>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-foreground md:text-6xl">
                Arena Breakout: Infinite <span className="text-primary glow-text">Raids Boost</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Professional Arena Breakout: Infinite raids boost service on all maps. Our elite squad provides expert carries for Lockdown and Forbidden modes with guaranteed VIP extraction and maximum loot. Every raid completed in 30-60 minutes by players who have mastered PvP combat and know every dangerous zone inside out.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/game/arena-breakout/raids-boost">
                  <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                    <Swords className="h-5 w-5" /> Order Raid Carry
                  </Button>
                </Link>
                <Link to="/arena-breakout-infinite-boosting">
                  <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                    View All Services
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Maps Grid */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-black uppercase text-foreground">
              All Maps <span className="text-primary">Covered</span>
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {["TV Station", "Armory", "Valley", "Farm", "Airport", "Northridge"].map((map) => (
                <div key={map} className="rounded-xl border border-border/50 bg-card p-4 text-center">
                  <CheckCircle className="mx-auto h-6 w-6 text-primary" />
                  <div className="mt-2 font-bold text-foreground">{map}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <article className="prose prose-invert max-w-none">
                <h2 className="text-3xl font-black uppercase text-foreground">
                  Professional Arena Breakout: Infinite Raids Boost Service
                </h2>
                <p className="text-muted-foreground">
                  High-tier raids in Arena Breakout: Infinite are brutally difficult. Between aggressive AI, hostile players, and complex map layouts, a single mistake can cost you everything. Our professional raids boost service eliminates the frustration and risk, providing expert carries that guarantee successful extractions with maximum loot. Whether you're tackling Lockdown mode for consistent rewards or pushing Forbidden mode for premium gear, our elite squad has you covered.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Expert Carries on Every Map
                </h2>
                <p className="text-muted-foreground">
                  Our Arena Breakout: Infinite raid boosters have mastered every map in the game. TV Station's tight corridors and vertical gameplay, Armory's high-value loot rooms and dangerous chokepoints, Valley's open sightlines and sniper positions, Farm's complex building layouts, Airport's massive scale and multiple extraction points, and Northridge's challenging terrain—our team knows them all inside and out. This expertise translates directly into faster completion times, safer routes, and better loot acquisition.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Lockdown and Forbidden Mode Specialists
                </h2>
                <p className="text-muted-foreground">
                  We offer professional carries for both Lockdown and Forbidden modes. Lockdown mode raids ($4.50 per raid) provide consistent, reliable rewards with moderate difficulty—perfect for farming specific items or completing quests. Forbidden mode raids ($8.99 per raid) offer the ultimate challenge with premium loot rewards, including rare weapons, high-tier armor, and valuable crafting materials. Our boosters have completed thousands of Forbidden mode raids and know exactly how to handle the increased AI aggression and player density.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Guaranteed VIP Extraction Every Time
                </h2>
                <p className="text-muted-foreground">
                  The most frustrating part of Arena Breakout: Infinite is losing everything to a last-second ambush at the extraction point. With our raids boost service, that never happens. Every single raid comes with guaranteed VIP extraction—we don't consider the job done until you're safely out with all the loot. Our boosters use optimal extraction timing, route planning, and tactical positioning to ensure zero failed extractions. You get the rewards, every time.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Fast Completion - 30-60 Minutes Per Raid
                </h2>
                <p className="text-muted-foreground">
                  Time efficiency matters. Our Arena Breakout: Infinite raid carries are completed in an average of 30-60 minutes per raid, depending on the map and mode. This speed comes from years of experience—our boosters know the fastest loot routes, how to avoid unnecessary PvP encounters, and when to push aggressively versus playing safe. Whether you need a single raid carry or a package of 20, we deliver results quickly without sacrificing safety or loot quality.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Maximum Loot Acquisition Strategy
                </h2>
                <p className="text-muted-foreground">
                  Our raid boosters don't just extract—they maximize your loot. Every raid follows an optimized route that hits high-value spawn locations, secures key items, and fills your inventory with the most valuable gear possible. Whether it's rare weapon attachments, premium medical supplies, or crafting materials for hideout upgrades, our team knows what to prioritize. You're not just paying for a successful extraction; you're paying for the best possible loot haul.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Safe and Secure Raid Boosting
                </h2>
                <p className="text-muted-foreground">
                  Account security is paramount. Every Arena Breakout: Infinite raids boost order uses VPN protection matched to your region, and our boosters play during your typical hours to maintain natural account behavior. We never use cheats, exploits, or any prohibited software—just pure skill and game knowledge. Your account remains completely safe throughout the entire process, backed by our perfect security record across 600+ completed orders.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Complete Arena Breakout: Infinite Services
                </h2>
                <p className="text-muted-foreground">
                  While raid carries are our specialty, we offer a full range of <Link to="/arena-breakout-infinite-boosting" className="text-primary hover:underline">Arena Breakout: Infinite boosting services</Link>. Need Koens to fund your raids? Check out our <Link to="/buy-arena-breakout-infinite-koens" className="text-primary hover:underline">Koens farming service</Link> for fast currency delivery. Want to improve your own raid skills? Our <Link to="/arena-breakout-infinite-coaching" className="text-primary hover:underline">coaching service</Link> teaches you everything from map knowledge to advanced PvP tactics. Whatever your ABI needs, MyBoost delivers professional results.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Flexible Packages and 24/7 Support
                </h2>
                <p className="text-muted-foreground">
                  We offer raid boost packages from 1 to 20 raids, allowing you to choose exactly what you need. Need just one difficult raid completed? We've got you. Planning a marathon session to farm specific loot? We can handle that too. Our customer support team is available 24/7 to answer questions, provide updates, and ensure your complete satisfaction. Every order comes with real-time progress tracking and a satisfaction guarantee.
                </p>
              </article>

              {/* CTA Section */}
              <div className="mt-12 rounded-2xl border-2 border-primary/30 bg-secondary/30 p-8 text-center">
                <Swords className="mx-auto h-12 w-12 text-primary" />
                <h3 className="mt-4 text-2xl font-black uppercase text-foreground">
                  Ready for Professional Raid Carries?
                </h3>
                <p className="mt-3 text-muted-foreground">
                  Get expert Arena Breakout: Infinite raids boost on all maps. Guaranteed VIP extraction and maximum loot.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Link to="/game/arena-breakout/raids-boost">
                    <Button size="lg" className="gap-2 glow-box font-bold uppercase">
                      <Zap className="h-5 w-5" /> Order Raid Carry
                    </Button>
                  </Link>
                  <Link to="/buy-arena-breakout-infinite-koens">
                    <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                      Buy Koens
                    </Button>
                  </Link>
                  <Link to="/arena-breakout-infinite-coaching">
                    <Button size="lg" variant="outline" className="gap-2 font-bold uppercase">
                      Get Coaching
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default ArenaBreakoutInfiniteRaidsBoostPage;
