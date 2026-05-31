import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCategorySidebar from "@/components/ServiceCategorySidebar";
import { ServiceOption } from "@/data/gameConfigs";
import {
  ArenaBreakoutBreadcrumbs,
  ArenaBreakoutTrustBar,
  ArenaBreakoutFeatureTags,
  ArenaBreakoutOrderSummaryBar,
} from "./ArenaBreakoutServiceSections";
import { HUB_PATHS } from "@/lib/serviceRoutes";

interface ArenaBreakoutServiceLayoutProps {
  serviceId: string;
  service: ServiceOption;
  children: ReactNode;
  mainContent: ReactNode;
}

const ArenaBreakoutServiceLayout = ({
  serviceId,
  service,
  children,
  mainContent,
}: ArenaBreakoutServiceLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto w-full max-w-[1520px] px-4 pt-20 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <Link
            to={HUB_PATHS["arena-breakout"]}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Arena Breakout Services
          </Link>
          <ArenaBreakoutBreadcrumbs serviceId={serviceId} />
        </div>

        <div className="grid gap-10 py-8 min-[900px]:grid-cols-[260px_minmax(0,1fr)_400px]">
          <ServiceCategorySidebar />

          <main className="order-1 min-w-0 min-[900px]:order-2">
            <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
              {service.name}
            </h1>

            <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:flex-wrap">
              <ArenaBreakoutTrustBar serviceId={serviceId} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <ArenaBreakoutFeatureTags serviceId={serviceId} />
            </div>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {service.description}
            </p>

            <ArenaBreakoutOrderSummaryBar serviceId={serviceId} />
            {mainContent}
          </main>

          {/* Right column — scrolls naturally with the page; no sticky positioning. */}
          <aside className="order-2 self-start min-[900px]:order-3">
            <div className="overflow-hidden rounded-2xl border-2 border-primary/30 bg-card shadow-[0_0_30px_hsl(48_100%_50%_/_0.15)]">
              <div className="relative h-[180px] w-full overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]">
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='360'%3E%3Crect width='800' height='360' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-weight='900' font-size='28' fill='%23ffd700'%3E" +
                      encodeURIComponent(service.name.toUpperCase()) +
                      "%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/70 via-card/10 to-transparent" />
                {service.tag ? (
                  <div className="absolute top-3 right-3">
                    <Badge className="border-none bg-primary/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-background shadow-lg">
                      {service.tag}
                    </Badge>
                  </div>
                ) : null}
              </div>

              <div className="p-6">{children}</div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ArenaBreakoutServiceLayout;
