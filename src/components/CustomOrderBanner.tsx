import { Sparkles, MessageCircle, ArrowRight, X } from "lucide-react";
import { useState } from "react";

/**
 * "Create a custom order" call-to-action.
 *
 * Rendered as a slim bar pinned to the bottom of the viewport so it stays
 * visible while browsing a service page (no need to scroll to the footer).
 * It sits on the left/centre and leaves room on the bottom-right for the
 * tawk.to chat launcher. Clicking opens the live support chat so a player can
 * request a tailored order that isn't covered by the standard configurators.
 * A dismiss button hides it for the rest of the session.
 */
const CustomOrderBanner = () => {
  const [dismissed, setDismissed] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem("mb-custom-order-dismissed") === "1"
  );

  if (dismissed) return null;

  const openSupport = () => {
    const api = (window as unknown as { Tawk_API?: { maximize?: () => void } }).Tawk_API;
    if (api?.maximize) {
      api.maximize();
    }
  };

  const dismiss = () => {
    sessionStorage.setItem("mb-custom-order-dismissed", "1");
    setDismissed(true);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[2147482000] px-4 pb-4 md:pb-5">
      <div className="container mx-auto md:pr-24">
        <div className="pointer-events-auto relative flex items-center gap-3 overflow-hidden rounded-2xl border border-primary/40 bg-card/95 p-3 pr-10 shadow-[0_8px_32px_rgba(0,0,0,.45)] backdrop-blur-md md:gap-4 md:p-4 md:pr-12 animate-slide-up">
          {/* glow decoration */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 md:h-12 md:w-12">
            <Sparkles className="h-5 w-5 text-primary md:h-6 md:w-6" />
          </div>

          <div className="relative z-10 min-w-0 flex-1">
            <h3 className="text-sm font-black uppercase tracking-tight text-foreground md:text-base">
              Create a <span className="text-primary glow-text">custom order</span>
            </h3>
            <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block md:text-sm">
              Can't find what you need? Tell us your exact goal — any rank, any game — and we'll build a personalized offer.
            </p>
          </div>

          <button
            type="button"
            onClick={openSupport}
            className="group relative z-10 inline-flex shrink-0 items-center gap-2 rounded-xl border-2 border-primary bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(255,215,0,.5)] md:px-6 md:py-3 md:text-sm"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Create a custom order</span>
            <span className="sm:hidden">Custom order</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute right-2 top-2 z-10 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomOrderBanner;
