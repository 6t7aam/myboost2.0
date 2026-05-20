/**
 * Overgear-style two-column layout for Dota 2 service pages.
 *
 * Left column (lg+): page title, trust bar, feature tags, intro paragraph,
 * Your Wins, How It Works, Why Choose Us, SEO description.
 *
 * Right column (lg+, sticky): service image header + the order form (passed
 * in via `children`) + delivery info + payment row + money-back guarantee.
 *
 * Below `lg` the sidebar collapses above the main content so the order form
 * is seen first, matching Overgear mobile behavior.
 */

import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceCategorySidebar from "@/components/ServiceCategorySidebar";
import { dota2ServiceMeta } from "@/data/dota2ServiceMeta";
import {
  Dota2Breadcrumbs,
  Dota2TrustBar,
  Dota2FeatureTags,
  Dota2OrderFooter,
  Dota2YourWins,
  Dota2HowItWorks,
  Dota2WhyChooseUs,
  Dota2SeoSection,
  Dota2FooterTrustBadges,
} from "./Dota2ServiceSections";

interface Dota2ServiceLayoutProps {
  serviceId: string;
  imageSrc: string;
  intro: string;
  /** Order form contents — sliders, speed buttons, price box, CTA. */
  children: ReactNode;
  /** Optional content rendered full-width below the two-column layout (e.g. FAQ, long-form SEO article). */
  belowLayout?: ReactNode;
  showDefaultOrderFooter?: boolean;
}

const Dota2ServiceLayout = ({
  serviceId,
  imageSrc,
  intro,
  children,
  belowLayout,
  showDefaultOrderFooter = true,
}: Dota2ServiceLayoutProps) => {
  const meta = dota2ServiceMeta[serviceId];
  const title = meta?.pageTitle ?? "Dota 2 Service";
  const altText = meta?.pageTitle ?? "Dota 2 service image";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto w-full max-w-[1520px] px-4 pt-20 md:px-6">
        {/* Back link + breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
          <Link
            to="/game/dota-2"
            className="inline-flex items-center gap-1.5 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Dota 2 Services
          </Link>
          <Dota2Breadcrumbs serviceId={serviceId} />
        </div>

        {/* Desktop: categories + content + order form. Mobile keeps the stacked layout. */}
        <div className="grid gap-10 py-8 min-[900px]:grid-cols-[260px_minmax(0,1fr)_400px]">
          <ServiceCategorySidebar />

          {/* Sidebar — first on mobile, sticky right on desktop */}
          <aside className="order-1 self-start min-[900px]:order-3 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border-2 border-primary/30 bg-card shadow-[0_0_30px_hsl(48_100%_50%_/_0.15)]">
              {/* Sidebar image header */}
              <div className="relative h-[180px] w-full overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a]">
                <img
                  src={imageSrc}
                  alt={altText}
                  className="h-full w-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='360'%3E%3Crect width='800' height='360' fill='%23111'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-weight='900' font-size='28' fill='%23ffd700'%3E" +
                      encodeURIComponent(title.toUpperCase()) +
                      "%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/70 via-card/10 to-transparent" />
                {meta?.badge && (
                  <div className="absolute top-3 right-3">
                    <Badge className="border-none bg-primary/95 px-3 py-1 text-xs font-bold uppercase tracking-wider text-background shadow-lg">
                      {meta.badge}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Order form */}
              <div className="p-6">
                {children}
                {showDefaultOrderFooter ? <Dota2OrderFooter serviceId={serviceId} /> : null}
              </div>
            </div>
          </aside>

          {/* Left content column */}
          <main className="order-2 min-w-0 min-[900px]:order-2">
            <h1 className="text-3xl font-black uppercase tracking-tight text-foreground md:text-5xl">
              {title}
            </h1>

            <div className="mt-4 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:flex-wrap">
              <Dota2TrustBar />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Dota2FeatureTags serviceId={serviceId} />
            </div>

            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {intro}
            </p>

            <Dota2YourWins serviceId={serviceId} embedded />
            <Dota2HowItWorks serviceId={serviceId} embedded />
            <Dota2WhyChooseUs embedded />
            <Dota2SeoSection serviceId={serviceId} embedded />
          </main>
        </div>
      </div>

      {/* Optional full-width content (FAQ, long-form article) */}
      {belowLayout}

      <Dota2FooterTrustBadges />
      <Footer />
    </div>
  );
};

export default Dota2ServiceLayout;
