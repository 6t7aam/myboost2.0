import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index.tsx";
import OrderPage from "./pages/OrderPage.tsx";
import BoosterSelectionPage from "./pages/BoosterSelectionPage.tsx";
import OrderStatusPage from "./pages/OrderStatusPage.tsx";
import GamePage from "./pages/GamePage.tsx";
import ArenaBreakoutServicePage from "./pages/ArenaBreakoutServicePage.tsx";
import ArenaBreakoutInfiniteBoostingPage from "./pages/ArenaBreakoutInfiniteBoostingPage.tsx";
import BuyArenaBreakoutInfiniteKoensPage from "./pages/BuyArenaBreakoutInfiniteKoensPage.tsx";
import ArenaBreakoutInfiniteRaidsBoostPage from "./pages/ArenaBreakoutInfiniteRaidsBoostPage.tsx";
import ArenaBreakoutInfiniteCoachingPage from "./pages/ArenaBreakoutInfiniteCoachingPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import AccountPage from "./pages/AccountPage.tsx";
import MyOrdersPage from "./pages/MyOrdersPage.tsx";
import TermsPage from "./pages/TermsPage.tsx";
import RefundPage from "./pages/RefundPage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/arena-breakout-infinite-boosting" element={<ArenaBreakoutInfiniteBoostingPage />} />
              <Route path="/buy-arena-breakout-infinite-koens" element={<BuyArenaBreakoutInfiniteKoensPage />} />
              <Route path="/arena-breakout-infinite-raids-boost" element={<ArenaBreakoutInfiniteRaidsBoostPage />} />
              <Route path="/arena-breakout-infinite-coaching" element={<ArenaBreakoutInfiniteCoachingPage />} />
              <Route path="/game/arena-breakout/:serviceId" element={<ArenaBreakoutServicePage />} />
              <Route path="/game/:gameSlug" element={<GamePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/order" element={<OrderPage />} />
              <Route path="/choose-booster" element={<BoosterSelectionPage />} />
              <Route path="/order/status/:orderId" element={<OrderStatusPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/my-orders" element={<MyOrdersPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/refund" element={<RefundPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
