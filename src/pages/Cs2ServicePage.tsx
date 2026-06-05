import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import Cs2ServiceLayout from "@/components/cs2/Cs2ServiceLayout";
import {
  Cs2ServiceBenefits,
  Cs2HowItWorks,
  Cs2WhyChooseUs,
} from "@/components/cs2/Cs2ServiceSections";
import Cs2ServiceConfigurator from "@/components/cs2/Cs2ServiceConfigurator";
import { gameConfigs } from "@/data/gameConfigs";
import { cs2ServiceMeta } from "@/data/cs2ServiceMeta";
import { OrderSummary } from "@/components/ServiceConfigurator";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { getCs2BasePrice, getCs2DefaultValues, getCs2StartPrice } from "@/data/cs2Pricing";
import { cs2SEO } from "@/data/cs2SEO";

const Cs2ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const config = gameConfigs["cs2"];
  const service = config.services.find((s) => s.id === serviceId);
  const meta = serviceId ? cs2ServiceMeta[serviceId] : null;
  const { addItem } = useCart();

  const seo = serviceId ? cs2SEO[serviceId] : null;
  const seoKeywords = serviceId ? `cs2 ${service?.name?.toLowerCase() ?? serviceId}, cs2 ${service?.name?.toLowerCase() ?? serviceId} service, counter strike 2 ${service?.name?.toLowerCase() ?? serviceId}, buy cs2 ${service?.name?.toLowerCase() ?? serviceId}` : "";

  if (!service || !meta || !serviceId) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <div className="flex flex-1 items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Service Not Found</h1>
            <Link to="/game/cs2"><Button className="mt-4">Back to CS2</Button></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getStartingPrice = (): number => {
    const configuredPrice = getCs2BasePrice(service.id, getCs2DefaultValues(service.id));
    if (configuredPrice > 0) return configuredPrice;
    const startPrice = getCs2StartPrice(service.id) ?? service.startPrice;
    if (startPrice) {
      const m = startPrice.match(/[\d.]+/);
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
        title={seo?.metaTitle ?? `CS2 ${service.name} | MyBoost`}
        description={seo?.metaDescription ?? meta.description}
        keywords={seoKeywords}
        canonicalUrl={`https://www.myboost.top/game/cs2/${serviceId}`}
      />
      <StructuredData
        type="Product"
        data={{
          name: `CS2 ${service.name}`,
          description: meta.description,
          image: ["https://www.myboost.top/og-image.jpg"],
          sku: serviceId,
          offers: {
            "@type": "Offer",
            url: `https://www.myboost.top/game/cs2/${serviceId}`,
            priceCurrency: "USD",
            price: getStartingPrice().toFixed(2),
            availability: "https://schema.org/InStock",
            areaServed: "Worldwide",
          },
        }}
      />
      <Cs2ServiceLayout
        serviceId={serviceId}
        service={service}
        mainContent={
          <>
            <Cs2ServiceBenefits serviceId={serviceId} />
            <Cs2HowItWorks serviceId={serviceId} />
            <Cs2WhyChooseUs />
          </>
        }
      >
        <div id="order-card">
          <Cs2ServiceConfigurator
            key={service.id}
            service={service}
            gameTitle={config.title}
            onAddToCart={handleAddToCart}
          />
        </div>
      </Cs2ServiceLayout>
    </>
  );
};

export default Cs2ServicePage;
