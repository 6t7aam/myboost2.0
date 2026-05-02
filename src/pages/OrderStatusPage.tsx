import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderChat from "@/components/OrderChat";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Loader2, Copy, MessageSquare, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface OrderData {
  status: string;
  pay_address: string | null;
  pay_amount: number | null;
  pay_currency: string | null;
  valid_until: string | null;
}

const OrderStatusPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"order" | "chat">("order");

  // Auto-open chat tab if coming from card payment
  useEffect(() => {
    if ((location.state as any)?.openChat) {
      setActiveTab("chat");
    }
  }, [location.state]);

  useEffect(() => {
    if (!orderId) return;

    const fetch_ = async () => {
      const { data } = await supabase
        .from("orders")
        .select("status, pay_address, pay_amount, pay_currency, valid_until")
        .eq("id", orderId)
        .single();
      if (data) setOrder(data as OrderData);
      setLoading(false);
    };

    fetch_();
    const interval = setInterval(fetch_, 5000);
    return () => clearInterval(interval);
  }, [orderId]);

  const isPaid = order?.status === "paid";

  const copyAddress = () => {
    if (order?.pay_address) {
      navigator.clipboard.writeText(order.pay_address);
      toast.success("Address copied!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="relative pt-24 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(48_100%_50%_/_0.06)_0%,_transparent_60%)]" />
        <div className="container relative z-10 mx-auto max-w-5xl px-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Tab Navigation */}
              <div className="flex gap-2 border-b border-border/50">
                <button
                  onClick={() => setActiveTab("order")}
                  className={`flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all ${
                    activeTab === "order"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Package className="h-4 w-4" />
                  Order Details
                </button>
                <button
                  onClick={() => setActiveTab("chat")}
                  className={`flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all ${
                    activeTab === "chat"
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <MessageSquare className="h-4 w-4" />
                  Chat
                </button>
              </div>

              {/* Order Status Tab */}
              {activeTab === "order" && (
                <>
                  {isPaid ? (
                <div className="rounded-2xl border border-primary/30 bg-card p-8 text-center">
                  <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
                  <h3 className="mt-4 text-2xl font-black uppercase text-foreground">Payment Confirmed!</h3>
                  <p className="mt-3 text-muted-foreground">Your payment has been verified. We will start your service soon.</p>
                  <Link to="/"><Button variant="outline" className="mt-6 border-primary/30 text-primary hover:bg-primary/10">Back to Home</Button></Link>
                </div>
              ) : (
                <div className="rounded-2xl border border-primary/30 bg-card p-8 text-center">
                  <Clock className="mx-auto h-16 w-16 text-primary animate-pulse" />
                  <h3 className="mt-4 text-2xl font-black uppercase text-foreground">Awaiting Payment</h3>

                  {order?.pay_address && order?.pay_amount != null && (
                    <div className="mt-6 space-y-4">
                      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
                        <p className="text-sm text-muted-foreground">Send exactly</p>
                        <p className="mt-1 text-3xl font-black text-primary glow-text">
                          {order.pay_amount} {order.pay_currency?.toUpperCase()}
                        </p>
                      </div>
                      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
                        <p className="text-sm text-muted-foreground">To this address</p>
                        <div className="mt-2 flex items-center justify-center gap-2">
                          <p className="break-all text-sm font-mono font-bold text-foreground">{order.pay_address}</p>
                          <button onClick={copyAddress} className="shrink-0 text-primary hover:text-primary/80">
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      {order.valid_until && (
                        <p className="text-xs text-muted-foreground">
                          Payment valid until: {new Date(order.valid_until).toLocaleString()}
                        </p>
                      )}
                    </div>
                  )}

                  <p className="mt-4 text-sm text-muted-foreground">
                    This page updates automatically once payment is confirmed on the blockchain.
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Checking every 5 seconds…
                  </div>
                </div>
              )}
                </>
              )}

              {/* Chat Tab */}
              {activeTab === "chat" && orderId && (
                <div className="rounded-2xl border border-primary/30 bg-card p-6">
                  {order?.status === "pending" && !order?.pay_address && (
                    <div className="mb-4 rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        Card payment is handled manually. Please message admin here to continue.
                      </p>
                    </div>
                  )}
                  {console.log("[OrderStatusPage] Rendering chat with orderId:", orderId)}
                  <OrderChat orderId={orderId} isAdmin={false} />
                </div>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default OrderStatusPage;
