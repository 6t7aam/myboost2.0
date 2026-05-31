import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RustCategorySidebar from "./RustCategorySidebar";
import {
  RustBreadcrumbs,
  RustTrustBar,
  RustFeatureTags,
  RustOrderSummaryBar,
  RustTrustBadgesFooter,
} from "./RustServiceSections";
import { RustService, rustPlaceholderImage } from "@/data/rustServices";
import { HUB_PATHS } from "@/lib/serviceRoutes";

interface RustServiceLayoutProps {
  service: RustService;
  children: ReactNode;
  mainContent: ReactNode;
}

const RustServiceLayout = ({ service, children, mainContent }: RustServiceLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto w-full max-w-[1520px] px-4 pt-20 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <Link
            to={HUB_PATHS.rust}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Rust Services
          </Link>
          <RustBreadcrumbs service={service} />
        </div>

        {/* Desktop: 3 columns (sidebar | content | order card) */}
        <div className="grid gap-8 py-8 min-[900px]:grid-cols-[260px_minmax(0,1fr)_400px]">
          <RustCategorySidebar mode="service" activeCategory={service.category} />

          <main className="order-2 min-w-0 min-[900px]:order-2">
            <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
              Rust {service.title} <span className="text-primary glow-text">Service</span>
            </h1>

            <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:flex-wrap">
              <RustTrustBar service={service} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <RustFeatureTags service={service} />
            </div>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {service.description}
            </p>

            <RustOrderSummaryBar service={service} />
            {mainContent}
          </main>

          {/* Right column — sticky order card */}
          <aside
            className="order-1 self-start min-[900px]:order-3 min-[900px]:sticky"
            style={{ top: 96 }}
          >
            <div className="overflow-hidden rounded-2xl border border-primary/40 bg-gradient-to-b from-card to-[#0d0d0d] shadow-[0_0_36px_hsl(48_100%_50%_/_0.18)]">
              <div className="relative h-[180px] w-full overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = rustPlaceholderImage(service.title, 800, 360);
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/85 via-card/20 to-transparent" />
                {service.badge && (
                  <div className="absolute top-3 right-3">
                    <Badge className="border-none bg-primary px-3 py-1 text-[11px] font-black uppercase tracking-wider text-background shadow-lg">
                      {service.badge}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-base font-black uppercase tracking-wider text-foreground">
                    Order {service.title}
                  </h2>
                </div>
                {children}
              </div>
            </div>
          </aside>
        </div>

        <RustTrustBadgesFooter />
      </div>

      <Footer />
    </div>
  );
};

export default RustServiceLayout;
