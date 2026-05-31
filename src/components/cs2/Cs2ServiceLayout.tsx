import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Crosshair } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCategorySidebar from "@/components/ServiceCategorySidebar";
import { ServiceOption } from "@/data/gameConfigs";
import { cs2ServiceMeta } from "@/data/cs2ServiceMeta";
import {
  Cs2Breadcrumbs,
  Cs2TrustBar,
  Cs2FeatureTags,
  Cs2OrderSummaryBar,
} from "./Cs2ServiceSections";
import { HUB_PATHS } from "@/lib/serviceRoutes";

interface Cs2ServiceLayoutProps {
  serviceId: string;
  service: ServiceOption;
  children: ReactNode;
  mainContent: ReactNode;
}

const Cs2ServiceLayout = ({ serviceId, service, children, mainContent }: Cs2ServiceLayoutProps) => {
  const meta = cs2ServiceMeta[serviceId];
  const description = meta?.description ?? service.description;
  const [imageReady, setImageReady] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto w-full max-w-[1520px] px-4 pt-20 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <Link
            to={HUB_PATHS.cs2}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to CS2 Services
          </Link>
          <Cs2Breadcrumbs serviceId={serviceId} />
        </div>

        <div className="grid gap-10 py-8 min-[900px]:grid-cols-[260px_minmax(0,1fr)_400px]">
          <ServiceCategorySidebar />

          <main className="order-1 min-w-0 min-[900px]:order-2">
            <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
              {service.name}
            </h1>

            <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:flex-wrap">
              <Cs2TrustBar serviceId={serviceId} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Cs2FeatureTags serviceId={serviceId} />
            </div>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>

            <Cs2OrderSummaryBar serviceId={serviceId} />
            {mainContent}
          </main>

          {/* Right column — order panel; scrolls naturally with the page. */}
          <aside className="order-2 self-start min-[900px]:order-3">
            <div className="overflow-hidden rounded-2xl border-2 border-primary/30 bg-card shadow-[0_0_30px_hsl(48_100%_50%_/_0.15)]">
              {/* Black-yellow gradient placeholder (no image yet) */}
              <div className="relative h-[180px] w-full overflow-hidden bg-[radial-gradient(circle_at_30%_20%,_hsl(48_100%_50%_/_0.18)_0%,_transparent_55%),linear-gradient(135deg,_#1a1a1a_0%,_#0f0f0f_60%,_#1a1a1a_100%)]">
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, hsl(48 100% 50%) 0, hsl(48 100% 50%) 1px, transparent 1px, transparent 14px)",
                  }}
                />
                <Crosshair className="absolute -right-5 -bottom-5 h-32 w-32 text-primary/15" />
                <div className="absolute inset-0 flex items-center justify-center px-4">
                  <span className="text-center text-xl font-black uppercase tracking-[0.16em] text-primary/85 glow-text">
                    {service.name}
                  </span>
                </div>
                {/* Real image once uploaded to /service-images/cs2/<slug>; falls back to the gradient above. */}
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.name}
                    loading="eager"
                    decoding="async"
                    onLoad={() => setImageReady(true)}
                    onError={() => setImageReady(false)}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                      imageReady ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )}
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

export default Cs2ServiceLayout;
