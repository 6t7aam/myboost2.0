import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Trophy, Shield, Award, ArrowRight } from "lucide-react";
import Dota2ServiceLayout from "@/components/dota2/Dota2ServiceLayout";
import { useCart, SpeedOption } from "@/contexts/CartContext";
import { toast } from "sonner";
import { dota2PageSEO } from "@/data/dota2PageSEO";

const SEO_DATA = dota2PageSEO["coaching"];

const rangeFill = (value: number, min: number, max: number) => {
  const pct = ((value - min) / (max - min)) * 100;
  return {
    background: `linear-gradient(to right, #FFD700 0%, #FFD700 ${pct}%, #1a1a1a ${pct}%, #1a1a1a 100%)`,
  };
};

type Speed = "standard" | "express" | "super-express";
const SPEED_OPTIONS: { id: Speed; label: string; multiplier: number; cart: SpeedOption }[] = [
  { id: "standard", label: "Standard", multiplier: 1, cart: "normal" },
  { id: "express", label: "Express +20%", multiplier: 1.2, cart: "express" },
  { id: "super-express", label: "Super Express +30%", multiplier: 1.3, cart: "super-express" },
];

const LANGUAGES = ["English", "Russian", "German", "Spanish", "French", "Portuguese"];
type FocusOption = "character" | "role";

const INTRO =
  "Learn from Immortal-ranked coaches. Master mechanics, macro, and draft strategy in 1-on-1 sessions tailored to your hero pool, role, and goals.";

const Dota2CoachingPage = () => {
  const [hours, setHours] = useState(1);
  const [speed, setSpeed] = useState<Speed>("standard");
  const [language, setLanguage] = useState("English");
  const [focus, setFocus] = useState<FocusOption>("character");
  const { addItem } = useCart();
  const pricePerHour = 8.5;
  const speedMultiplier = SPEED_OPTIONS.find((s) => s.id === speed)!.multiplier;
  const basePrice = hours * pricePerHour;
  const totalPrice = basePrice * speedMultiplier;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Dota 2 Coaching",
    image: "https://www.myboost.top/images/dota2/dota2-coaching.jpg",
    brand: { "@type": "Brand", name: "MyBoost" },
    offers: {
      "@type": "Offer",
      price: "8.50",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <SEO
        title={SEO_DATA.title}
        description={SEO_DATA.description}
        keywords={SEO_DATA.keywords}
        canonicalUrl={SEO_DATA.canonicalUrl}
        ogImage={SEO_DATA.ogImage}
        ogTitle={SEO_DATA.ogTitle}
        ogDescription={SEO_DATA.ogDescription}
        twitterTitle={SEO_DATA.twitterTitle}
        twitterDescription={SEO_DATA.twitterDescription}
      />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>

      <Dota2ServiceLayout
        serviceId="coaching"
        imageSrc="/images/dota2/dota2-coaching.jpg"
        intro={INTRO}
        belowLayout={
          <>
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
                        Yes — coaching is the most sustainable way to climb. Unlike account-share services, you build skills that translate to long-term gains. Most students see measurable improvement within 5-10 hours of structured coaching, with rank gains following naturally as habits change.
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
                        <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">MMR Service</h3>
                        <p className="mt-2 text-muted-foreground">Climb ranks with Immortal PROs. Fast, safe service.</p>
                      </div>
                    </Link>
                    <Link to="/game/dota-2/lp-removal" className="group">
                      <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_hsl(48_100%_50%_/_0.1)]">
                        <Shield className="h-10 w-10 text-primary" />
                        <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">Low Priority Removal</h3>
                        <p className="mt-2 text-muted-foreground">Escape LP queue fast with PRO completion.</p>
                      </div>
                    </Link>
                    <Link to="/game/dota-2/rank-tokens" className="group">
                      <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_hsl(48_100%_50%_/_0.1)]">
                        <Award className="h-10 w-10 text-primary" />
                        <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">Rank Tokens Delivery</h3>
                        <p className="mt-2 text-muted-foreground">Collect rank tokens fast with Immortal PROs.</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </>
        }
      >
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase text-primary">
          1-on-1 Sessions
        </div>

        <h3 className="mt-3 text-xl font-black uppercase text-foreground">
          Book <span className="text-primary">Coaching</span>
        </h3>

        <div className="mt-6 space-y-5">
          <div>
            <div className="flex items-baseline justify-between">
              <label className="text-xs font-bold uppercase text-foreground">Number of Hours</label>
              <span className="text-base font-black text-primary">
                {hours} {hours === 1 ? "hour" : "hours"}
              </span>
            </div>
            <input
              type="range"
              className="myboost-range mt-2"
              min={1}
              max={10}
              step={1}
              value={hours}
              style={rangeFill(hours, 1, 10)}
              onChange={(e) => setHours(parseInt(e.target.value, 10))}
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-foreground">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-2 w-full rounded-lg border border-[rgba(255,215,0,0.3)] bg-[#111] px-3 py-2.5 text-sm text-white transition-colors hover:border-[rgba(255,215,0,0.8)] focus:border-primary focus:outline-none"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang} className="bg-[#111] text-white">
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-foreground">Focus</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["character", "role"] as FocusOption[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFocus(opt)}
                  className={`rounded-lg border py-2.5 px-2 text-[11px] font-bold uppercase transition-colors ${
                    focus === opt
                      ? "bg-[#FFD700] text-black border-[#FFD700]"
                      : "bg-[#111] text-white border-[rgba(255,215,0,0.3)] hover:border-[rgba(255,215,0,0.8)]"
                  }`}
                >
                  {opt === "character" ? "Specific Character" : "Specific Role"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {SPEED_OPTIONS.map((opt) => {
              const active = speed === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSpeed(opt.id)}
                  className={`rounded-lg border py-2.5 px-2 text-[11px] font-bold uppercase transition-colors ${
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

          <div className="rounded-xl border-2 border-primary/30 bg-secondary/30 p-5 text-center">
            <div className="text-3xl font-black text-primary">${totalPrice.toFixed(2)}</div>
            <div className="mt-1 text-xs text-muted-foreground">
              {hours} {hours === 1 ? "hour" : "hours"} × ${pricePerHour.toFixed(2)} · {SPEED_OPTIONS.find((s) => s.id === speed)!.label}
            </div>
          </div>

          <Button
            size="lg"
            className="w-full gap-2 glow-box font-bold uppercase text-base py-5"
            onClick={() => {
              addItem({
                id: "",
                game: "Dota 2",
                gameSlug: "dota-2",
                service: "Coaching",
                options: { hours, language, focus, speed },
                speed: SPEED_OPTIONS.find((s) => s.id === speed)!.cart,
                basePrice,
                price: totalPrice,
                estimatedTime: `${hours} ${hours === 1 ? "hour" : "hours"} of coaching`,
              });
              toast.success("Coaching added to cart!");
            }}
          >
            Book Now <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Dota2ServiceLayout>
    </>
  );
};

export default Dota2CoachingPage;
