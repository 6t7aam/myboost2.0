import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const reviews = [
  { name: "Alex R.", game: "CS2", quote: "Went from 800 ELO to 2500 in 2 days. Absolutely insane service! The booster was super professional and communicated the whole time.", rating: 5, orders: "12 orders" },
  { name: "Maria K.", game: "Dota 2", quote: "Got from 3k to 5.5k MMR in a week. Account was completely safe the whole time. Best service I've ever used.", rating: 5, orders: "8 orders" },
  { name: "Jake T.", game: "Rust", quote: "Best farming service ever. Logged in to stacks of sulfur and stone. Will definitely come back every wipe.", rating: 5, orders: "5 orders" },
  { name: "Sarah L.", game: "Arena Breakout", quote: "The raid carries are amazing. Extracted with millions in loot. These guys know every map inside out.", rating: 5, orders: "3 orders" },
  { name: "Mike D.", game: "CS2", quote: "ELO boost was incredibly fast. Went from Level 5 to Level 10 in two days. Worth every penny.", rating: 5, orders: "6 orders" },
  { name: "Chris W.", game: "Dota 2", quote: "LP removal in under an hour. Fast, clean, professional. Already recommended to all my friends.", rating: 5, orders: "4 orders" },
  { name: "Tommy G.", game: "Rust", quote: "Base building was perfect. Honeycombed compound with all the turrets. Survived 3 raid attempts.", rating: 5, orders: "7 orders" },
  { name: "Lisa M.", game: "Arena Breakout", quote: "Koens farming is legit. Got 50M overnight. No issues at all. Customer support is top notch too.", rating: 5, orders: "9 orders" },
];

const Reviews = () => {
  return (
    <section id="reviews" className="border-t border-border/50 bg-secondary py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-3xl font-black uppercase tracking-tight text-foreground md:text-4xl">
          Player <span className="text-primary glow-text">Reviews</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          Trusted by 10,000+ players worldwide.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <Card key={r.name} className="group border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{r.game}</span>
                </div>
                <p className="mt-3 text-sm text-foreground leading-relaxed">"{r.quote}"</p>
                <div className="mt-4 flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-primary">
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.orders}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
