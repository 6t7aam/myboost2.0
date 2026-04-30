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

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  When Do Players Need Raid Carries?
                </h2>
                <p className="text-muted-foreground">
                  Arena Breakout: Infinite raid carries serve multiple purposes for different player types. New players use raid carries to experience high-tier content and obtain gear they couldn't acquire solo. Players stuck on difficult quests that require specific raid completions rely on our carries to progress. Busy professionals who lack time for lengthy raid attempts use our service to maintain progression. Players farming specific loot from Forbidden mode raids—like rare weapon blueprints or premium armor—order multiple carries for efficient farming. Groups missing a skilled player for their squad hire our boosters to fill the gap. Content creators preparing showcase videos need guaranteed successful raids without wasting hours on failed attempts. Whatever your reason for needing a raid carry, our expert team delivers consistent results.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Advantages of Professional Raid Boosting
                </h2>
                <p className="text-muted-foreground">
                  Professional Arena Breakout: Infinite raid carries offer numerous benefits over attempting raids solo or with random teammates. You eliminate the frustration of failed extractions and wasted time on unsuccessful raids. Our boosters guarantee VIP extraction every time, ensuring you never lose your loot to last-second ambushes. You gain access to premium loot from Forbidden mode without the stress of intense PvP combat. Your time investment is predictable—30-60 minutes per raid instead of hours of failed attempts. You learn optimal strategies by observing how elite players navigate dangerous zones, handle PvP encounters, and maximize loot acquisition. Most importantly, you progress through the game at your desired pace without being held back by difficult content or skill gaps.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Raid Difficulty Tiers and Pricing
                </h2>
                <p className="text-muted-foreground">
                  We offer raid carries for both difficulty tiers in Arena Breakout: Infinite. Lockdown mode raids ($4.50 per raid) feature moderate AI difficulty, lower player density, and consistent loot rewards—ideal for quest completions, farming specific common items, or learning map layouts with reduced risk. Forbidden mode raids ($8.99 per raid) represent the ultimate challenge with aggressive AI, high player density, and premium loot including rare weapons, high-tier armor, and valuable crafting materials. Forbidden mode is where the best gear in the game comes from, and our boosters have mastered the intense combat and strategic positioning required to extract successfully every time. Choose the difficulty tier that matches your goals and budget.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Map-Specific Raid Strategies
                </h2>
                <p className="text-muted-foreground">
                  Each Arena Breakout: Infinite map requires unique strategies for successful raids. TV Station demands vertical awareness and close-quarters combat skills due to its multi-story layout and tight corridors. Armory features high-value loot rooms protected by dangerous chokepoints that require tactical clearing. Valley's open sightlines favor long-range engagements and careful positioning to avoid sniper fire. Farm's complex building layouts require extensive map knowledge to navigate efficiently. Airport's massive scale demands stamina management and knowledge of multiple extraction routes. Northridge's challenging terrain combines elevation changes with dense cover, requiring adaptability. Our boosters have mastered every map's unique challenges and adjust their strategies accordingly to guarantee successful extractions regardless of the location.
                </p>

                <h2 className="text-2xl font-black uppercase text-foreground mt-8">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6 mt-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Is Arena Breakout: Infinite raid boosting safe?</h3>
                    <p className="text-muted-foreground">
                      Yes, our raid boosting service is completely safe. We use VPN protection matched to your region and our boosters play during your typical gaming hours. We never use cheats, exploits, or prohibited software—only skilled players with thousands of hours of experience. With 600+ completed orders and a perfect security record, your account is guaranteed safe throughout the entire raid carry process.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">How fast is raid carry delivery?</h3>
                    <p className="text-muted-foreground">
                      Each raid is completed in 30-60 minutes on average, depending on the map and mode. Lockdown mode raids tend toward the faster end (30-45 minutes), while Forbidden mode raids may take 45-60 minutes due to increased combat intensity. Multiple raid orders are completed sequentially, and we provide real-time progress updates for each raid.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Is my account safe during raid carries?</h3>
                    <p className="text-muted-foreground">
                      Your account security is guaranteed. We use enterprise-grade VPN protection, secure login protocols, and our boosters are thoroughly vetted professionals. We've maintained a 100% account safety record across all raid carry services. Every raid is completed through legitimate gameplay with guaranteed VIP extraction—your account and loot are completely secure.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">What is your refund policy for raid carries?</h3>
                    <p className="text-muted-foreground">
                      We offer full refunds for raid carry orders that haven't started. Once boosting begins, we guarantee successful completion with VIP extraction. In the extremely rare case of a failed raid, we immediately retry at no additional cost. If you're unsatisfied with the service, contact our 24/7 support team and we'll resolve any concerns.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">How do I get started with raid carries?</h3>
                    <p className="text-muted-foreground">
                      Getting started is easy. Select your desired raid type (Lockdown or Forbidden mode), choose the number of raids (1-20), select your preferred maps if applicable, add to cart, and complete checkout using cryptocurrency (LTC, SOL, or USDT). Our team will contact you within minutes to coordinate account access and begin your raid carries immediately.
                    </p>
                  </div>
                </div>
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
