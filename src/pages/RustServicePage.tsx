import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import RustServiceLayout from "@/components/rust/RustServiceLayout";
import {
  RustFaqSection,
  RustHowItWorks,
  RustSeoSection,
  RustWhyChooseUs,
  RustYourWins,
} from "@/components/rust/RustServiceSections";
import RustServiceConfigurator, {
  RustOrderPayload,
} from "@/components/rust/RustServiceConfigurator";
import { getRustServiceBySlug } from "@/data/rustServices";
import { rustSEO } from "@/data/rustSEO";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const RustServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? getRustServiceBySlug(serviceId) : undefined;
  const seo = service ? rustSEO[service.id] : null;
  const { addItem } = useCart();

  if (!service || !seo) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <div className="flex flex-1 items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Service Not Found</h1>
            <Link to="/game/rust">
              <Button className="mt-4">Back to Rust</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = (order: RustOrderPayload) => {
    addItem({
      id: "",
      game: order.game,
      gameSlug: order.gameSlug,
      service: order.serviceName,
      options: order.options,
      currency: order.currency,
      boostMethod: order.boostMethod,
      additionalFeatures: { liveStream: order.additionalFeatures.liveStream },
      modifiers: {
        boostMethodModifier: order.modifiers.boostMethodModifier,
        liveStreamModifier: order.modifiers.liveStreamModifier,
      },
      speed: order.deliverySpeed,
      basePrice: order.basePrice,
      price: order.finalPrice,
      estimatedTime: order.estimatedTime,
    });
    toast.success(`${order.serviceName} added to cart!`);
  };

  return (
    <>
      <SEO
        title={seo.metaTitle}
        description={seo.metaDescription}
        keywords={seo.keywords}
        canonicalUrl={`https://www.myboost.top/game/rust/${service.slug}`}
      />
      <StructuredData
        type="Product"
        data={{
          name: `Rust ${service.title}`,
          description: seo.metaDescription,
          image: [`https://www.myboost.top${service.image}`],
          sku: service.id,
          offers: {
            "@type": "Offer",
            url: `https://www.myboost.top/game/rust/${service.slug}`,
            priceCurrency: "USD",
            price: service.price.toFixed(2),
            availability: "https://schema.org/InStock",
            areaServed: "Worldwide",
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: 4.9,
            reviewCount: 600,
            bestRating: 5,
            worstRating: 1,
          },
        }}
      />
      <RustServiceLayout
        service={service}
        mainContent={
          <>
            <RustYourWins service={service} />
            <RustHowItWorks service={service} />
            <RustWhyChooseUs />
            <RustFaqSection service={service} />
            <RustSeoSection service={service} />
          </>
        }
      >
        <div id="order-card">
          <RustServiceConfigurator service={service} onAddToCart={handleAddToCart} />
        </div>
      </RustServiceLayout>
    </>
  );
};

export default RustServicePage;
