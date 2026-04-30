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
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
          Why Choose <span className="text-primary glow-text">Us</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          The most trusted boosting service in the gaming community.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="group border-border/50 bg-card text-center transition-all duration-300 hover:border-primary/50 hover:-translate-y-1">
              <CardContent className="flex flex-col items-center p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:glow-box">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-5 text-lg font-bold uppercase text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
                <span className="mt-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{f.badge}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
