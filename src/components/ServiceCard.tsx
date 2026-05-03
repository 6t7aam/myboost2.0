import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  service: {
    name: string;
    description: string;
    price: string;
    tag?: string;
  };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card transition-all duration-500 hover:border-primary/60 hover:shadow-[0_0_25px_hsl(48_100%_50%_/_0.15)] hover:-translate-y-2">
      {service.tag && (
        <Badge className="absolute top-3 right-3 z-10 border-none bg-primary/20 text-xs font-bold uppercase text-primary backdrop-blur-sm glow-box">
          {service.tag}
        </Badge>
      )}
      <CardContent className="flex h-full flex-col justify-between p-5">
        <div>
          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300">{service.name}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-foreground">{service.description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-black text-primary glow-text">{service.price}</span>
          <Link to="/order">
            <Button size="sm" className="rounded-lg glow-box font-bold uppercase tracking-wider text-xs px-4 transition-all duration-300 hover:glow-box-intense hover:scale-105">
              Order Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
