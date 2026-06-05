import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import ArenaBreakoutServiceLayout from "@/components/arena-breakout/ArenaBreakoutServiceLayout";
import {
  ArenaBreakoutHowItWorks,
  ArenaBreakoutSeoSection,
  ArenaBreakoutWhyChooseUs,
  ArenaBreakoutYourWins,
} from "@/components/arena-breakout/ArenaBreakoutServiceSections";
import { gameConfigs } from "@/data/gameConfigs";
import { arenaBreakoutSEO } from "@/data/arenaBreakoutSEO";
import ServiceConfigurator, { OrderSummary } from "@/components/ServiceConfigurator";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const ArenaBreakoutServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const config = gameConfigs["arena-breakout"];
  const service = config.services.find((s) => s.id === serviceId);
  const seoData = serviceId ? arenaBreakoutSEO[serviceId] : null;
  const { addItem } = useCart();

  if (!service || !seoData) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <div className="flex flex-1 items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Service Not Found</h1>
            <Link to="/game/arena-breakout"><Button className="mt-4">Back to Arena Breakout</Button></Link>
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

  const handleAddToCart = (order: OrderSummary) => {
    addItem({
      id: "",
      game: order.game,
      gameSlug: order.gameSlug,
      service: order.service,
      options: order.options,
      currency: order.currency,
      boostMethod: order.boostMethod,
      additionalFeatures: order.additionalFeatures,
      modifiers: order.modifiers,
      speed: order.speed,
      basePrice: order.basePrice,
      price: order.price,
      oldPrice: order.oldPrice,
      estimatedTime: order.estimatedTime,
    });
    toast.success(`${order.service} added to cart!`);
  };

  return (
    <>
      <SEO
        title={seoData.metaTitle}
        description={seoData.metaDescription}
        keywords={`arena breakout ${service.name.toLowerCase()}, arena breakout infinite boosting, ${service.name.toLowerCase()} service, buy arena breakout boost`}
        canonicalUrl={`https://www.myboost.top/game/arena-breakout/${serviceId}`}
      />
      <StructuredData
        type="Product"
        data={{
          name: service.name,
          description: seoData.metaDescription,
          image: [`https://www.myboost.top${service.image}`],
          sku: serviceId,
          offers: {
            '@type': 'Offer',
            url: `https://www.myboost.top/game/arena-breakout/${serviceId}`,
            priceCurrency: 'USD',
            price: getStartingPrice(service).toFixed(2),
            availability: 'https://schema.org/InStock',
            areaServed: 'Worldwide',
            shippingDetails: {
              '@type': 'OfferShippingDetails',
              shippingRate: {
                '@type': 'MonetaryAmount',
                value: '0',
                currency: 'USD'
              },
              shippingDestination: {
                '@type': 'DefinedRegion',
                addressCountry: ['US','GB','CA','AU','DE','FR','IT','ES','NL','SE','NO','FI','DK','PL','BR','MX','JP','KR','RU','UA','PT','IE','BE','AT','CH','CZ','RO','HU','GR','TR','ZA','AR','CL','NZ','SG','HK','TW','PH','MY','TH','ID','VN','IN','AE','SA','IL']
              },
              deliveryTime: {
                '@type': 'ShippingDeliveryTime',
                handlingTime: {
                  '@type': 'QuantitativeValue',
                  minValue: 0,
                  maxValue: 0,
                  unitCode: 'h'
                },
                transitTime: {
                  '@type': 'QuantitativeValue',
                  minValue: 0,
                  maxValue: 1,
                  unitCode: 'h'
                }
              }
            },
            hasMerchantReturnPolicy: {
              '@type': 'MerchantReturnPolicy',
              applicableCountry: ['US','GB','CA','AU','DE','FR','IT','ES','NL','SE','NO','FI','DK','PL','BR','MX','JP','KR','RU','UA','PT','IE','BE','AT','CH','CZ','RO','HU','GR','TR','ZA','AR','CL','NZ','SG','HK','TW','PH','MY','TH','ID','VN','IN','AE','SA','IL'],
              returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
              returnMethod: 'https://schema.org/ReturnByMail'
            }
          }
        }}
      />
      <ArenaBreakoutServiceLayout
        serviceId={serviceId!}
        service={service}
        mainContent={
          <>
            <ArenaBreakoutYourWins serviceId={serviceId!} />
            <ArenaBreakoutHowItWorks serviceId={serviceId!} />
            <ArenaBreakoutWhyChooseUs />
            <ArenaBreakoutSeoSection serviceId={serviceId!} />
          </>
        }
      >
        <div id="order-card">
          <ServiceConfigurator
            service={service}
            gameSlug="arena-breakout"
            gameTitle={config.title}
            onAddToCart={handleAddToCart}
            hideHeader
          />
        </div>
      </ArenaBreakoutServiceLayout>
    </>
  );
};

export default ArenaBreakoutServicePage;
