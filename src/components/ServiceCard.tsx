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
    <Card className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/50 hover:glow-border">
      {service.tag && (
        <Badge className="absolute top-3 right-3 z-10 border-none bg-primary/20 text-xs font-bold uppercase text-primary">
          {service.tag}
        </Badge>
      )}
      <CardContent className="flex h-full flex-col justify-between p-5">
        <div>
          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors duration-200">{service.name}</h3>
          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-black text-primary">{service.price}</span>
          <Link to="/order">
            <Button size="sm" className="rounded-lg glow-box font-bold uppercase tracking-wider text-xs px-4 transition-all duration-200 hover:glow-box-intense">
              Order Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
