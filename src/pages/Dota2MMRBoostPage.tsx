import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { Shield, Award } from "lucide-react";
import Dota2ServiceLayout from "@/components/dota2/Dota2ServiceLayout";
import Dota2MmrBoostCalculator from "@/components/dota2/Dota2MmrBoostCalculator";
import { dota2PageSEO } from "@/data/dota2PageSEO";

const SEO_DATA = dota2PageSEO["mmr-boost"];

const INTRO =
  "Climb the ranks with Immortal-tier PROs. Safe, fast, and guaranteed results. Our verified PRO players deliver consistent MMR gains with VPN protection and a 15-minute start guarantee.";

const Dota2MMRBoostPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Dota 2 MMR Boost - Fast Rank Up by Immortal Players",
    description:
      "Buy Dota 2 MMR boost from top Immortal & Divine players. Safe, fast rank climbing with VPN protection. Solo or duo boosting available. Start in 15 minutes.",
    image: "https://www.myboost.top/images/dota2/dota2-mmr-boost.jpg",
    brand: { "@type": "Brand", name: "MyBoost" },
    offers: {
      "@type": "Offer",
      url: "https://www.myboost.top/game/dota-2/mmr-boost",
      priceCurrency: "USD",
      price: "4.02",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: "4.02",
        priceCurrency: "USD",
      },
      availability: "https://schema.org/InStock",
      areaServed: "Worldwide",
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
        serviceId="mmr-boost"
        imageSrc="/images/dota2/dota2-mmr-boost.jpg"
        intro={INTRO}
        showDefaultOrderFooter={false}
        belowLayout={
          <>
            <section className="py-16">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl">
                  <h2 className="mb-12 text-center text-3xl font-black uppercase text-foreground">
                    Frequently Asked <span className="text-primary">Questions</span>
                  </h2>
                  <div className="space-y-6">
                    <div className="rounded-xl border border-border/50 bg-card p-6">
                      <h3 className="text-lg font-bold text-foreground">Is the Dota 2 MMR service safe?</h3>
                      <p className="mt-2 text-muted-foreground">
                        Yes — every MMR service is fulfilled by verified PRO players, completely safely. We use VPN protection matched to your region, and our Immortal PROs play during your typical hours. We never use bots or cheats, only skilled players. With thousands of completed orders and zero bans, your account security is guaranteed.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-card p-6">
                      <h3 className="text-lg font-bold text-foreground">How fast is MMR service delivery?</h3>
                      <p className="mt-2 text-muted-foreground">
                        We start your order within 15 minutes and deliver approximately 500 MMR in 4-12 hours on average, depending on your starting bracket. Higher MMR gains take longer due to increased match difficulty, but our Immortal PROs work efficiently to reach your target rank as quickly as possible.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-card p-6">
                      <h3 className="text-lg font-bold text-foreground">What&apos;s the difference between Solo and Duo service?</h3>
                      <p className="mt-2 text-muted-foreground">
                        Solo service means our Immortal PRO plays on your account while you relax — the fastest method with guaranteed results. Duo service means you play alongside an Immortal PRO who supports your games while you learn, perfect for improving your skills while climbing. Both options deliver the same high-quality service.
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/50 bg-card p-6">
                      <h3 className="text-lg font-bold text-foreground">Can I track my MMR service progress?</h3>
                      <p className="mt-2 text-muted-foreground">
                        Yes. We provide live match tracking for all MMR orders. You&apos;ll receive real-time updates on every game played, including match results, heroes picked, and MMR gained. Track your progress from your dashboard and watch your rank climb in real time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-secondary/30 py-16">
              <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl">
                  <h2 className="mb-12 text-center text-3xl font-black uppercase text-foreground">
                    Other Dota 2 <span className="text-primary">Services</span>
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Link to="/game/dota-2/lp-removal" className="group">
                      <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_hsl(48_100%_50%_/_0.1)]">
                        <Shield className="h-10 w-10 text-primary" />
                        <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">
                          Low Priority Removal
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                          Escape LP queue fast with PRO completion. From $5 per game.
                        </p>
                      </div>
                    </Link>
                    <Link to="/game/dota-2/rank-tokens" className="group">
                      <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_hsl(48_100%_50%_/_0.1)]">
                        <Award className="h-10 w-10 text-primary" />
                        <h3 className="mt-4 text-xl font-bold text-foreground group-hover:text-primary">
                          Rank Tokens Delivery
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                          Collect rank tokens fast with Immortal PROs. From $3 per token.
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </>
        }
      >
        <Dota2MmrBoostCalculator />
      </Dota2ServiceLayout>
    </>
  );
};

export default Dota2MMRBoostPage;
