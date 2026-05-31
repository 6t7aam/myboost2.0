import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { gameConfigs } from "@/data/gameConfigs";
import { dota2SEO } from "@/data/dota2SEO";
import { dota2PageSEO } from "@/data/dota2PageSEO";
import Dota2ServiceLayout from "@/components/dota2/Dota2ServiceLayout";
import Dota2SimpleOrderForm from "@/components/dota2/Dota2SimpleOrderForm";
import Dota2DualRangeOrderForm from "@/components/dota2/Dota2DualRangeOrderForm";
import { BATTLE_CUP_TIERS, BATTLE_CUP_ROLES } from "@/data/dota2ServicePricing";

interface ExtrasDropdownProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
  tooltip?: string;
}

const ExtrasDropdown = ({ label, value, onChange, options }: ExtrasDropdownProps) => (
  <div>
    <label className="text-xs font-bold uppercase text-foreground">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-2 w-full rounded-lg border border-[rgba(255,215,0,0.3)] bg-[#111] px-3 py-2.5 text-sm text-white transition-colors hover:border-[rgba(255,215,0,0.8)] focus:border-primary focus:outline-none"
    >
      {options.map((o) => (
        <option key={o.id} value={o.id} className="bg-[#111] text-white">
          {o.label}
        </option>
      ))}
    </select>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Battle Cup form — tier + role + region in extras, flatAdder = tier price  */
/* -------------------------------------------------------------------------- */
const BattleCupOrderForm = () => {
  const [tier, setTier] = useState(BATTLE_CUP_TIERS[0].id);
  const [role, setRole] = useState("hard-support");
  const [region, setRegion] = useState<"EU" | "NA">("EU");

  const tierConfig = BATTLE_CUP_TIERS.find((t) => t.id === tier) ?? BATTLE_CUP_TIERS[0];

  return (
    <Dota2SimpleOrderForm
      serviceId="battle-cup"
      serviceName="Battle Cup"
      orderTitle="Order Battle Cup"
      sliderLabel="Amount"
      unitSingular="cup"
      unitPlural="cups"
      min={1}
      max={5}
      step={1}
      defaultValue={1}
      pricePerUnit={3}
      estimatedTimeFor={() => "Next weekend tournament window"}
      flatAdder={(quantity) => quantity * tierConfig.adder}
      extraCartFields={{ tier, role, region }}
      extrasAbove={
        <>
          <div>
            <label className="text-xs font-bold uppercase text-foreground">Region</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {(["EU", "NA"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRegion(r)}
                  className={`rounded-lg border py-2.5 px-2 text-sm font-bold uppercase transition-colors ${
                    region === r
                      ? "bg-[#FFD700] text-black border-[#FFD700]"
                      : "bg-[#111] text-white border-[rgba(255,215,0,0.3)] hover:border-[rgba(255,215,0,0.8)]"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <ExtrasDropdown
            label="Tier option"
            value={tier}
            onChange={setTier}
            options={BATTLE_CUP_TIERS.map((t) => ({
              id: t.id,
              label: `${t.label}  (+$${t.adder.toFixed(2)})`,
            }))}
          />
          <ExtrasDropdown
            label="Role option"
            value={role}
            onChange={setRole}
            options={BATTLE_CUP_ROLES}
          />
        </>
      }
    />
  );
};

/* -------------------------------------------------------------------------- */
/*  Service router                                                             */
/* -------------------------------------------------------------------------- */
const renderOrderForm = (serviceId: string) => {
  switch (serviceId) {
    case "calibration-boost":
      return (
        <Dota2SimpleOrderForm
          serviceId="calibration-boost"
          serviceName="Calibration Service"
          orderTitle="Order Calibration"
          sliderLabel="Amount"
          unitSingular="match"
          unitPlural="matches"
          min={1}
          max={30}
          step={1}
          defaultValue={10}
          pricePerUnit={3}
          estimatedTimeFor={(q) => `${q * 2}-${q * 3} hours`}
        />
      );
    case "behavior-score-boost":
      return (
        <Dota2DualRangeOrderForm
          serviceId="behavior-score-boost"
          serviceName="Behavior Score Service"
          orderTitle="Order Behavior Score"
          chooserLabel="Choose your current and desired score"
          currentLabel="Current Score"
          desiredLabel="Desired Score"
          unitLabel="score"
          min={0}
          max={12000}
          step={100}
          defaultCurrent={6500}
          defaultDesired={7400}
          calculateBasePrice={(current, desired) => ((desired - current) / 1000) * 5}
          differenceSummary={(difference) => `+${difference.toLocaleString("en-US")} score`}
          selectionSummary={(current, desired) =>
            `${current.toLocaleString("en-US")} -> ${desired.toLocaleString("en-US")} score`
          }
          rateDescription="$5.00 per 1,000 behavior score with live calculator updates"
          estimatedTimeFor={() => "24-72 hours"}
        />
      );
    case "win-rate-boost":
      return (
        <Dota2SimpleOrderForm
          serviceId="win-rate-boost"
          serviceName="Win Rate Service"
          orderTitle="Order Win Rate"
          sliderLabel="Amount"
          unitSingular="win"
          unitPlural="wins"
          min={1}
          max={50}
          step={1}
          defaultValue={5}
          pricePerUnit={3}
          estimatedTimeFor={(q) => `${q}-${q * 24} hours`}
        />
      );
    case "battle-cup":
      return <BattleCupOrderForm />;
    default:
      return null;
  }
};

const Dota2ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const config = gameConfigs["dota-2"];
  const service = config.services.find((s) => s.id === serviceId);
  const seoData = serviceId ? dota2SEO[serviceId] : null;

  const orderForm = serviceId ? renderOrderForm(serviceId) : null;

  if (!service || !seoData || !serviceId || !orderForm) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <div className="flex flex-1 items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Service Not Found</h1>
            <Link to="/game/dota-2">
              <Button className="mt-4">Back to Dota 2</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getStartingPrice = (s: typeof service): number => {
    if (!s) return 0;
    if (s.fixedPrice !== undefined) return s.fixedPrice;
    if (s.pricePerUnit !== undefined) return s.pricePerUnit;
    if (s.modes && s.modes.length > 0) return s.modes[0].pricePerUnit;
    if (s.tiers && s.tiers.length > 0) return s.tiers[0].pricePer;
    if (s.startPrice) {
      const m = s.startPrice.match(/[\d.]+/);
      if (m) return parseFloat(m[0]);
    }
    return 0;
  };

  return (
    <>
      {(() => {
        const pageSEO = dota2PageSEO[serviceId];
        if (pageSEO) {
          return (
            <SEO
              title={pageSEO.title}
              description={pageSEO.description}
              keywords={pageSEO.keywords}
              canonicalUrl={pageSEO.canonicalUrl}
              ogImage={pageSEO.ogImage}
              ogTitle={pageSEO.ogTitle}
              ogDescription={pageSEO.ogDescription}
              twitterTitle={pageSEO.twitterTitle}
              twitterDescription={pageSEO.twitterDescription}
            />
          );
        }
        return (
          <SEO
            title={seoData.metaTitle}
            description={seoData.metaDescription}
            keywords={`dota 2 ${service.name.toLowerCase()}, dota 2 boosting, ${service.name.toLowerCase()} service, buy dota 2 boost`}
            canonicalUrl={`https://www.myboost.top/game/dota-2/${serviceId}`}
          />
        );
      })()}
      <StructuredData
        type="Product"
        data={{
          name: service.name,
          description: seoData.metaDescription,
          image: [`https://www.myboost.top${service.image || '/favicon.ico'}`],
          sku: serviceId,
          offers: {
            '@type': 'Offer',
            url: `https://www.myboost.top/game/dota-2/${serviceId}`,
            priceCurrency: 'USD',
            price: getStartingPrice(service).toFixed(2),
            availability: 'https://schema.org/InStock',
            areaServed: 'Worldwide',
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'USD' },
              shippingDestination: {
                '@type': 'DefinedRegion',
                addressCountry: ['US','GB','CA','AU','DE','FR','IT','ES','NL','SE','NO','FI','DK','PL','BR','MX','JP','KR','RU','UA','PT','IE','BE','AT','CH','CZ','RO','HU','GR','TR','ZA','AR','CL','NZ','SG','HK','TW','PH','MY','TH','ID','VN','IN','AE','SA','IL'],
              },
              deliveryTime: {
                '@type': 'ShippingDeliveryTime',
                handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 0, unitCode: 'h' },
                transitTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'h' },
              },
            },
            hasMerchantReturnPolicy: {
              '@type': 'MerchantReturnPolicy',
              applicableCountry: ['US','GB','CA','AU','DE','FR','IT','ES','NL','SE','NO','FI','DK','PL','BR','MX','JP','KR','RU','UA','PT','IE','BE','AT','CH','CZ','RO','HU','GR','TR','ZA','AR','CL','NZ','SG','HK','TW','PH','MY','TH','ID','VN','IN','AE','SA','IL'],
              returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
              returnMethod: 'https://schema.org/ReturnByMail',
            },
          },
        }}
      />

      <Dota2ServiceLayout
        serviceId={serviceId}
        imageSrc={service.image || config.image}
        intro={service.description}
        belowLayout={
          <section className="py-12 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <article className="prose prose-invert max-w-none">
                  <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl mb-6">
                    {seoData.h1}
                  </h2>
                  <div
                    className="text-muted-foreground space-y-4"
                    dangerouslySetInnerHTML={{ __html: seoData.content }}
                  />
                </article>
              </div>
            </div>
          </section>
        }
      >
        {orderForm}
      </Dota2ServiceLayout>
    </>
  );
};

export default Dota2ServicePage;
