import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { GraduationCap, CheckCircle, Star, Zap, Shield, Clock, TrendingUp, Users, Target, Award, Trophy, ArrowRight, ArrowLeft, BookOpen, MessageSquare } from "lucide-react";

const rangeFill = (value: number, min: number, max: number) => {
  const pct = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${pct}%, #1a1a1a ${pct}%, #1a1a1a 100%)`,
  };
};
import { useState } from "react";
import { useCart, SpeedOption } from "@/contexts/CartContext";
import { toast } from "sonner";

type Speed = "standard" | "express" | "super-express";
const SPEED_OPTIONS: { id: Speed; label: string; multiplier: number; cart: SpeedOption }[] = [
  { id: "standard", label: "Standard", multiplier: 1, cart: "normal" },
  { id: "express", label: "Express +20%", multiplier: 1.2, cart: "express" },
  { id: "super-express", label: "Super Express +30%", multiplier: 1.3, cart: "super-express" },
];

const Dota2CoachingPage = () => {
  const [hours, setHours] = useState(1);
  const [speed, setSpeed] = useState<Speed>("standard");
  const { addItem } = useCart();
  const pricePerHour = 8.50;
  const speedMultiplier = SPEED_OPTIONS.find((s) => s.id === speed)!.multiplier;
  const basePrice = hours * pricePerHour;
  const totalPrice = basePrice * speedMultiplier;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Dota 2 Coaching",
    "image": "https://www.myboost.top/images/dota2/dota2-coaching.jpg",
    "brand": {
      "@type": "Brand",
      "name": "MyBoost"
    },
    "offers": {
      "@type": "Offer",
      "price": "8.50",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <SEO
        title="Dota 2 Coaching - Learn from Immortal Players | MyBoost"
        description="Improve your Dota 2 skills with 1-on-1 coaching from Immortal-ranked players. Learn map control, draft, mechanics and macro. Book your session today."
        keywords="dota 2 coaching, dota 2 lessons, immortal coach, learn dota 2, dota 2 improvement, dota 2 1-on-1"
        canonicalUrl="https://www.myboost.top/game/dota-2/coaching"
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="container mx-auto px-4 pt-20" style={{ marginTop: '24px' }}>
          <Link to="/game/dota-2" className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Dota 2 Services
          </Link>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-6">
          {/* IMAGE: dota2-coaching.jpg - Replace this div with <img> */}
          <div className="service-image-placeholder absolute inset-0" data-image="dota2-coaching.jpg">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          </div>
          <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                <span className="text-sm font-bold uppercase text-primary">1-on-1 Sessions</span>
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-foreground md:text-6xl">
                DOTA 2 <span className="text-primary glow-text">COACHING</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground md:text-xl">
                Learn from Immortal-ranked coaches. Master mechanics, macro, and draft strategy.
              </p>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 lg:grid-cols-[40%_1fr]">
                <img
                  src="/images/dota2/dota2-coaching.jpg"
                  alt="Dota 2 Coaching"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                />

                {/* Calculator */}
                <div className="rounded-2xl border-2 border-primary/30 bg-card p-8 shadow-[0_0_30px_hsl(48_100%_50%_/_0.15)]">
                  <h3 className="text-2xl font-black uppercase text-foreground">
                    Book <span className="text-primary">Coaching</span>
                  </h3>

                  <div className="mt-6 space-y-6">
                    <div>
                      <div className="flex items-baseline justify-between">
                        <label className="text-sm font-bold uppercase text-foreground">Number of Hours</label>
                        <span className="text-lg font-black text-primary">{hours} {hours === 1 ? 'hour' : 'hours'}</span>
                      </div>
                      <input
                        type="range"
                        className="myboost-range mt-3"
                        min={1}
                        max={10}
                        step={1}
                        value={hours}
                        style={rangeFill(hours, 1, 10)}
                        onChange={(e) => setHours(parseInt(e.target.value, 10))}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {SPEED_OPTIONS.map((opt) => {
                        const active = speed === opt.id;
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setSpeed(opt.id)}
                            className={`rounded-lg border py-3 px-2 text-xs font-bold uppercase transition-colors ${
                              active
                                ? "bg-[#FFD700] text-black border-[#FFD700]"
                                : "bg-[#111] text-white border-[rgba(255,215,0,0.3)] hover:border-[rgba(255,215,0,0.8)]"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="rounded-xl border-2 border-primary/30 bg-secondary/30 p-6">
                      <div className="text-center">
                        <div className="text-4xl font-black text-primary">${totalPrice.toFixed(2)}</div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          {hours} {hours === 1 ? 'hour' : 'hours'} × ${pricePerHour.toFixed(2)} · {SPEED_OPTIONS.find((s) => s.id === speed)!.label}
                        </div>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full gap-2 glow-box font-bold uppercase text-lg py-6"
                      onClick={() => {
                        addItem({
                          id: "",
                          game: "Dota 2",
                          gameSlug: "dota-2",
                          service: "Coaching",
                          options: { hours, speed },
                          speed: SPEED_OPTIONS.find((s) => s.id === speed)!.cart,
                          basePrice,
                          price: totalPrice,
                          estimatedTime: `${hours} ${hours === 1 ? 'hour' : 'hours'} of coaching`,
                        });
                        toast.success("Coaching added to cart!");
                      }}
                    >
                      Book Now <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-12 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: MessageSquare, title: "1-on-1 Session", desc: "Personal attention" },
                { icon: Users, title: "Immortal Coaches", desc: "Top-tier expertise" },
                { icon: TrendingUp, title: "VOD Review", desc: "Analyze your replays" },
                { icon: BookOpen, title: "Custom Curriculum", desc: "Tailored to your needs" },
                { icon: Target, title: "Live Coaching", desc: "Play together in real time" },
                { icon: Clock, title: "Flexible Schedule", desc: "Book any time" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="rounded-xl border border-border/50 bg-card p-6">
                  <Icon className="h-8 w-8 text-primary" />
                  <div className="mt-3 text-lg font-bold text-foreground">{title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center text-3xl font-black uppercase text-foreground">
                How It <span className="text-primary">Works</span>
              </h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                    <span className="text-2xl font-black text-primary">1</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">Book Your Hours</h3>
                  <p className="mt-2 text-muted-foreground">
                    Choose how many coaching hours you need (1-10 hours)
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                    <span className="text-2xl font-black text-primary">2</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">Match With a Coach</h3>
                  <p className="mt-2 text-muted-foreground">
                    We pair you with an Immortal coach matching your goals and role
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                    <span className="text-2xl font-black text-primary">3</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-foreground">Improve & Climb</h3>
                  <p className="mt-2 text-muted-foreground">
                    Get personalized feedback and apply new skills in your ranked games
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-12 text-center text-3xl font-black uppercase text-foreground">
                Frequently Asked <span className="text-primary">Questions</span>
              </h2>
              <div className="space-y-6">
                <div className="rounded-xl border border-border/50 bg-card p-6">
                  <h3 className="text-lg font-bold text-foreground">Who are the coaches?</h3>
                  <p className="mt-2 text-muted-foreground">
                    All our coaches are Immortal-ranked players, often within the top global brackets, with proven teaching experience. Each coach specializes in specific roles (carry, mid, offlane, support) so we can match you with someone who understands your playstyle and goals.
                  </p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-6">
                  <h3 className="text-lg font-bold text-foreground">What does a coaching session cover?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Sessions are tailored to your needs: replay reviews of your recent games, live coaching while you play, drafting and pick-phase strategy, hero matchups, map awareness, itemization, and macro decision-making. Your coach builds a curriculum around your weakest areas.
                  </p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-6">
                  <h3 className="text-lg font-bold text-foreground">How are sessions delivered?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Sessions run over Discord with voice and screen share. Your coach watches your gameplay or replays in real time and provides immediate feedback. You can also schedule duo-queue games where the coach guides you live during ranked matches.
                  </p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-6">
                  <h3 className="text-lg font-bold text-foreground">Will coaching actually improve my MMR?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Yes — coaching is the most sustainable way to climb. Unlike boosting, you build skills that translate to long-term gains. Most students see measurable improvement within 5-10 hours of structured coaching, with rank gains following naturally as habits change.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-12 text-center text-3xl font-black uppercase text-foreground">
                Other Dota 2 <span className="text-primary">Services</span>
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Link to="/game/dota-2/mmr-boost" className="group">
                  <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_hsl(48_100%_50%_/_0.1)]">
                    <Trophy className="h-10 w-10 text-primary" />
                    <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">
                      MMR Boost
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Climb ranks with Immortal players. Fast, safe boosting.
                    </p>
                  </div>
                </Link>
                <Link to="/game/dota-2/lp-removal" className="group">
                  <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_hsl(48_100%_50%_/_0.1)]">
                    <Shield className="h-10 w-10 text-primary" />
                    <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">
                      Low Priority Removal
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Escape LP queue fast with professional completion.
                    </p>
                  </div>
                </Link>
                <Link to="/game/dota-2/rank-tokens" className="group">
                  <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_hsl(48_100%_50%_/_0.1)]">
                    <Award className="h-10 w-10 text-primary" />
                    <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">
                      Rank Tokens Farming
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Collect rank tokens fast with Immortal players.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Dota2CoachingPage;
