import { Zap, Shield, Trophy, Clock, Users, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  { icon: Zap, title: "Fast Delivery", description: "Most orders start within 15 minutes and complete in hours.", badge: "2-6 hrs avg" },
  { icon: Shield, title: "Secure Payments", description: "Crypto & card options with full payment protection.", badge: "100% safe" },
  { icon: Trophy, title: "Professional Boosters", description: "Top 0.1% verified players with thousands of orders.", badge: "500+ pros" },
  { icon: Users, title: "10,000+ Players", description: "Trusted by thousands of gamers worldwide every day.", badge: "10k+ done" },
  { icon: Clock, title: "24/7 Support", description: "Live Discord support around the clock. Always here.", badge: "< 2 min" },
  { icon: CreditCard, title: "Money Back", description: "Not satisfied? Get a full refund. No questions asked.", badge: "Guaranteed" },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,215,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-center text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl animate-slide-up">
          Why Choose <span className="text-primary glow-text">Us</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground animate-slide-up" style={{ animationDelay: '0.1s' }}>
          The most trusted boosting service in the gaming community.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, index) => (
            <Card key={f.title} className="group border-border/50 bg-card text-center transition-all duration-500 hover:border-primary/60 hover:-translate-y-2 hover:shadow-[0_0_30px_hsl(48_100%_50%_/_0.15)] animate-slide-up" style={{ animationDelay: `${0.05 * (index + 1)}s` }}>
              <CardContent className="flex flex-col items-center p-8">
                <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-all duration-500 group-hover:bg-primary/20 group-hover:glow-box group-hover:scale-110 group-hover:rotate-6">
                  <f.icon className="h-7 w-7 text-primary transition-transform duration-500 group-hover:scale-110" />
                </div>
                <h3 className="mt-5 text-lg font-bold uppercase text-foreground transition-colors duration-300 group-hover:text-primary">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-foreground">{f.description}</p>
                <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:glow-box">{f.badge}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
