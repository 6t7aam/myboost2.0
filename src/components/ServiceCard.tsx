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
    <Card className="service-card-hover group relative overflow-hidden border-border/50 bg-card">
      {service.tag && (
        <Badge className="badge-shimmer absolute top-3 right-3 z-10 border-none text-xs font-bold uppercase backdrop-blur-sm glow-box">
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
            <Button size="sm" className="btn-yellow rounded-lg glow-box font-bold uppercase tracking-wider text-xs px-4 transition-all duration-300 hover:glow-box-intense">
              Order Now
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
