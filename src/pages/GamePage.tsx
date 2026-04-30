import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Star, Zap } from "lucide-react";
import { useState } from "react";
import { gameConfigs } from "@/data/gameConfigs";
import ServiceConfigurator, { OrderSummary } from "@/components/ServiceConfigurator";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import ArenaBreakoutServiceGrid from "@/components/ArenaBreakoutServiceGrid";

const GamePage = () => {
  const { gameSlug } = useParams<{ gameSlug: string }>();
  const config = gameConfigs[gameSlug || ""];
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const { addItem } = useCart();

  if (!config) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <div className="flex flex-1 items-center justify-center pt-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Game Not Found</h1>
            <Link to="/"><Button className="mt-4">Go Home</Button></Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Arena Breakout uses service grid hub page
  if (gameSlug === "arena-breakout") {
    return <ArenaBreakoutServiceGrid config={config} />;
  }

  const activeService = config.services.find((s) => s.id === activeServiceId) || config.services[0];

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
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative flex items-end overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={config.image} alt={config.title} className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
        </div>
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
          <Link to="/" className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
            {config.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="text-primary glow-text">{config.title.split(" ").slice(-1)}</span>
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{config.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { icon: CheckCircle, value: config.stats.orders, label: "orders" },
              { icon: Star, value: config.stats.rating, label: "rating", fill: true },
              { icon: Zap, value: config.stats.speed, label: "avg. delivery" },
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
          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* Service list */}
            <div>
              <h2 className="mb-4 text-lg font-bold uppercase tracking-tight text-foreground">
                Select <span className="text-primary">Service</span>
              </h2>
              <div className="space-y-2">
                {config.services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveServiceId(s.id)}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${
                      (activeServiceId || config.services[0].id) === s.id
                        ? "border-primary bg-primary/10"
                        : "border-border/50 bg-card hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-semibold ${(activeServiceId || config.services[0].id) === s.id ? "text-primary" : "text-foreground"}`}>
                        {s.name}
                      </span>
                      {s.tag && (
                        <Badge className="border-none bg-primary/20 text-[10px] font-bold uppercase text-primary">
                          {s.tag}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{s.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Configurator panel */}
            <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
              <ServiceConfigurator
                key={activeService.id}
                service={activeService}
                gameSlug={gameSlug || ""}
                gameTitle={config.title}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GamePage;
