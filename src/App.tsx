import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import RouteProgressBar from "@/components/RouteProgressBar";
import ScrollToTop from "@/components/ScrollToTop";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getVariants, reducedVariants } from "@/lib/pageTransitions";
// Home is eager (LCP / most-visited); every other route is code-split so the
// initial bundle stays small. Prerender + browsers both load chunks fine.
import Index from "./pages/Index.tsx";

const OrderPage = lazy(() => import("./pages/OrderPage.tsx"));
const BoosterSelectionPage = lazy(() => import("./pages/BoosterSelectionPage.tsx"));
const OrderStatusPage = lazy(() => import("./pages/OrderStatusPage.tsx"));
const GamePage = lazy(() => import("./pages/GamePage.tsx"));
const Cs2ServicePage = lazy(() => import("./pages/Cs2ServicePage.tsx"));
const ArenaBreakoutServicePage = lazy(() => import("./pages/ArenaBreakoutServicePage.tsx"));
const Dota2ServicePage = lazy(() => import("./pages/Dota2ServicePage.tsx"));
const RustServicePage = lazy(() => import("./pages/RustServicePage.tsx"));
const RustHubPage = lazy(() => import("./pages/RustHubPage.tsx"));
const ArenaBreakoutInfiniteBoostingPage = lazy(() => import("./pages/ArenaBreakoutInfiniteBoostingPage.tsx"));
const BuyArenaBreakoutInfiniteKoensPage = lazy(() => import("./pages/BuyArenaBreakoutInfiniteKoensPage.tsx"));
const ArenaBreakoutInfiniteRaidsBoostPage = lazy(() => import("./pages/ArenaBreakoutInfiniteRaidsBoostPage.tsx"));
const ArenaBreakoutInfiniteCoachingPage = lazy(() => import("./pages/ArenaBreakoutInfiniteCoachingPage.tsx"));
const Dota2MMRBoostPage = lazy(() => import("./pages/Dota2MMRBoostPage.tsx"));
const Dota2LPRemovalPage = lazy(() => import("./pages/Dota2LPRemovalPage.tsx"));
const Dota2RankTokensPage = lazy(() => import("./pages/Dota2RankTokensPage.tsx"));
const Dota2CoachingPage = lazy(() => import("./pages/Dota2CoachingPage.tsx"));
const CartPage = lazy(() => import("./pages/CartPage.tsx"));
const AdminPage = lazy(() => import("./pages/AdminPage.tsx"));
const AdminOrderDetailsPage = lazy(() => import("./pages/AdminOrderDetailsPage.tsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.tsx"));
const SignupPage = lazy(() => import("./pages/SignupPage.tsx"));
const UpdatePasswordPage = lazy(() => import("./pages/UpdatePasswordPage.tsx"));
const AccountPage = lazy(() => import("./pages/AccountPage.tsx"));
const MyOrdersPage = lazy(() => import("./pages/MyOrdersPage.tsx"));
const ChatPage = lazy(() => import("./pages/ChatPage.tsx"));
const TermsPage = lazy(() => import("./pages/TermsPage.tsx"));
const RefundPage = lazy(() => import("./pages/RefundPage.tsx"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient();

const useMobileSpeedMultiplier = () => {
  if (typeof window === "undefined") return 1;
  return window.matchMedia("(max-width: 768px)").matches ? 0.7 : 1;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const reduced = useReducedMotion();
  const speed = useMobileSpeedMultiplier();
  const variants = reduced ? reducedVariants : getVariants(location.pathname, speed);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Suspense fallback={null}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/arena-breakout-infinite-boosting" element={<ArenaBreakoutInfiniteBoostingPage />} />
          <Route path="/buy-arena-breakout-infinite-koens" element={<BuyArenaBreakoutInfiniteKoensPage />} />
          <Route path="/arena-breakout-infinite-raids-boost" element={<ArenaBreakoutInfiniteRaidsBoostPage />} />
          <Route path="/arena-breakout-infinite-coaching" element={<ArenaBreakoutInfiniteCoachingPage />} />
          <Route path="/game/arena-breakout/:serviceId" element={<ArenaBreakoutServicePage />} />
          <Route path="/game/dota-2/mmr-boost" element={<Dota2MMRBoostPage />} />
          <Route path="/game/dota-2/lp-removal" element={<Dota2LPRemovalPage />} />
          <Route path="/game/dota-2/rank-tokens" element={<Dota2RankTokensPage />} />
          <Route path="/game/dota-2/coaching" element={<Dota2CoachingPage />} />
          <Route path="/game/dota-2/:serviceId" element={<Dota2ServicePage />} />
          <Route path="/game/rust" element={<RustHubPage />} />
          <Route path="/game/rust/:serviceId" element={<RustServicePage />} />
          <Route path="/game/cs2/:serviceId" element={<Cs2ServicePage />} />
          <Route path="/game/:gameSlug" element={<GamePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order" element={<OrderPage />} />
          <Route path="/choose-booster" element={<BoosterSelectionPage />} />
          <Route path="/order/status/:orderId" element={<OrderStatusPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/order/:orderId" element={<AdminOrderDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<UpdatePasswordPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/orders" element={<MyOrdersPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/refund" element={<RefundPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <RouteProgressBar />
            <AnimatedRoutes />
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
