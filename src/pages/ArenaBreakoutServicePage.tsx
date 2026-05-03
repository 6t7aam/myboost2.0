import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Star, Zap } from "lucide-react";
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

  const handleAddToCart = (order: OrderSummary) => {
    addItem({
      id: "",
      game: order.game,
      gameSlug: order.gameSlug,
      service: order.service,
      options: order.options,
      speed: order.speed,
      basePrice: order.basePrice,
      price: order.price,
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
        type="Service"
        data={{
          name: service.name,
          description: seoData.metaDescription,
          url: `https://www.myboost.top/game/arena-breakout/${serviceId}`,
          serviceType: 'Game Boosting Service',
          areaServed: 'Worldwide',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '600',
            bestRating: '5',
            worstRating: '1'
          }
        }}
      />
      <div className="min-h-screen bg-background">
        <Navbar />

      {/* Hero */}
      <section className="relative flex items-end overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.name}
            className="h-full w-full object-cover opacity-20"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = config.image;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
          <Link to="/game/arena-breakout" className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Arena Breakout: Infinite
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
              {service.name}
            </h1>
            {service.tag && (
              <Badge className="border-none bg-primary/20 text-xs font-bold uppercase text-primary">
                {service.tag}
              </Badge>
            )}
          </div>
          <p className="mt-3 max-w-2xl text-muted-foreground">{service.description}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { icon: CheckCircle, value: config.stats.orders, label: "orders" },
              { icon: Star, value: config.stats.rating, label: "rating", fill: true },
              { icon: Zap, value: service.estimatedTime, label: "delivery" },
            ].map(({ icon: Icon, value, label, fill }) => (
              <div key={label} className="flex items-center gap-2 rounded-lg border border-border/50 bg-card/50 px-3 py-1.5 text-sm backdrop-blur-sm">
                <Icon className={`h-4 w-4 text-primary ${fill ? "fill-primary" : ""}`} />
                <span className="font-semibold text-foreground">{value}</span>
                <span className="text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Configurator */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            {/* Service Image */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-secondary/30 shadow-[0_0_30px_hsl(48_100%_50%_/_0.15)]">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='32' fill='%23ffd700'%3E" + service.name + "%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
              {service.tag && (
                <div className="absolute top-4 right-4">
                  <Badge className="border-none bg-primary/90 text-sm font-bold uppercase text-background px-3 py-1.5 shadow-lg">
                    {service.tag}
                  </Badge>
                </div>
              )}
            </div>

            {/* Configurator */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
              <ServiceConfigurator
                service={service}
                gameSlug="arena-breakout"
                gameTitle={config.title}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <article className="prose prose-invert max-w-none">
              <h1 className="text-3xl font-black uppercase tracking-tight text-foreground mb-6">
                {seoData.h1}
              </h1>
              <div
                className="text-muted-foreground space-y-4"
                dangerouslySetInnerHTML={{ __html: seoData.content }}
              />
            </article>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </>
  );
};

export default ArenaBreakoutServicePage;
