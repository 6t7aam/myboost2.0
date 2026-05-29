import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, Clock, ShieldCheck, Zap } from "lucide-react";
import { gameConfigs } from "@/data/gameConfigs";
import ServiceConfigurator, { OrderSummary } from "@/components/ServiceConfigurator";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const Cs2ServicePage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { addItem } = useCart();
  const config = gameConfigs["cs2"];
  const service = config.services.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <>
        <SEO
          title="Service Not Found"
          description="The CS2 service you're looking for could not be found. Browse all available CS2 boosting services."
        />
        <div className="flex min-h-screen flex-col bg-background">
          <Navbar />
          <div className="flex flex-1 items-center justify-center pt-16">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground">Service Not Found</h1>
              <Link to="/game/cs2">
                <Button className="mt-4">Back to CS2</Button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

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
        title={`CS2 ${service.name} - ${service.startPrice ?? "Boosting"} | MyBoost`}
        description={`${service.description} Fast, safe and professional CS2 ${service.name} service. 2,400+ orders, 4.9★ rating.`}
        keywords={`cs2 ${service.name.toLowerCase()}, cs2 boosting, ${service.name.toLowerCase()} service, buy cs2 boost`}
        canonicalUrl={`https://www.myboost.top/game/cs2/${service.id}`}
      />
      <div className="min-h-screen bg-background">
        <Navbar />

        {/* Hero */}
        <section className="relative flex items-end overflow-hidden pt-16">
          <div className="absolute inset-0">
            <img src={config.image} alt={config.title} className="h-full w-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
          </div>
          <div className="container relative z-10 mx-auto px-4 py-12 md:py-16">
            <Link
              to="/game/cs2"
              className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to CS2
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
                {service.name}
              </h1>
              {service.tag && (
                <Badge className="badge-shimmer border-none px-3 py-1 text-xs font-bold uppercase">{service.tag}</Badge>
              )}
            </div>
            <p className="mt-3 max-w-2xl text-muted-foreground">{service.description}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-10 md:py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,1.4fr)]">
              {/* Highlights */}
              <div className="space-y-6">
                {service.bullets && service.bullets.length > 0 && (
                  <div className="rounded-2xl border border-border/50 bg-card p-6">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">What you get</h2>
                    <ul className="mt-4 space-y-3">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                            <Check className="h-3.5 w-3.5 text-primary" />
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="rounded-2xl border border-border/50 bg-card p-6">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-foreground">Why MyBoost</h2>
                  <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" /> Secure & confidential handling
                    </p>
                    <p className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" /> Fast start — within 15 minutes
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" /> 24/7 live support
                    </p>
                  </div>
                </div>
              </div>

              {/* Configurator */}
              <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
                <ServiceConfigurator
                  service={service}
                  gameSlug="cs2"
                  gameTitle={config.title}
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Cs2ServicePage;
