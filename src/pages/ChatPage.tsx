import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderChat from "@/components/OrderChat";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Loader2, Package } from "lucide-react";
import { Helmet } from "react-helmet-async";

interface Order {
  id: string;
  service: string;
  status: string;
  created_at: string;
  last_message_at: string | null;
  unread_count: number;
}

const statusColor: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  in_progress: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  paid: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const ChatPage = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    console.log("[ChatPage] Fetching orders at:", new Date().toISOString());
    setLoading(true);

    // Fetch user's orders - sorted by created_at DESC (newest first)
    const { data: ordersData, error: ordersError } = await supabase
      .from("orders")
      .select("id, service, status, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (ordersError) {
      console.error("[ChatPage] Error fetching orders:", ordersError);
      setLoading(false);
      return;
    }

    console.log("[ChatPage] Fetched", ordersData?.length || 0, "orders");
    console.log("[ChatPage] First 5 order IDs:", ordersData?.slice(0, 5).map(o => o.id.slice(0, 8)));
    console.log("[ChatPage] Orders by status:", {
      total: ordersData?.length || 0,
      pending: ordersData?.filter(o => o.status === 'pending').length || 0,
      paid: ordersData?.filter(o => o.status === 'paid').length || 0,
      in_progress: ordersData?.filter(o => o.status === 'in_progress').length || 0,
      completed: ordersData?.filter(o => o.status === 'completed').length || 0,
      other: ordersData?.filter(o => !['pending', 'paid', 'in_progress', 'completed'].includes(o.status)).length || 0,
    });

    const orderList = (ordersData || []) as Order[];

    // Fetch message counts and last message time for each order
    for (const order of orderList) {
      const { data: messages } = await supabase
        .from("order_messages")
        .select("created_at, sender_type")
        .eq("order_id", order.id)
        .order("created_at", { ascending: false });

      if (messages && messages.length > 0) {
        order.last_message_at = messages[0].created_at;
        // Count unread admin messages
        order.unread_count = messages.filter((m: any) => m.sender_type === "admin").length;
      } else {
        order.last_message_at = null;
        order.unread_count = 0;
      }
    }

    // Sort by last message time (most recent first), then by created_at
    orderList.sort((a, b) => {
      // If both have messages, sort by last message time
      if (a.last_message_at && b.last_message_at) {
        return new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime();
      }
      // If only one has messages, prioritize it
      if (a.last_message_at && !b.last_message_at) return -1;
      if (!a.last_message_at && b.last_message_at) return 1;
      // If neither has messages, sort by created_at (newest first)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    console.log("[ChatPage] After sorting, first 5 order IDs:", orderList.slice(0, 5).map(o => ({
      id: o.id.slice(0, 8),
      status: o.status,
      last_message: o.last_message_at ? new Date(o.last_message_at).toISOString() : 'none',
      created: new Date(o.created_at).toISOString(),
    })));

    setOrders(orderList);

    // Auto-select first order if available
    if (orderList.length > 0 && !selectedOrderId) {
      console.log("[ChatPage] Auto-selecting first order:", orderList[0].id);
      setSelectedOrderId(orderList[0].id);
    }

    setLoading(false);
  };

  // Subscribe to new messages and new orders
  useEffect(() => {
    if (!user) return;

    console.log("[ChatPage] Setting up real-time subscriptions");

    // Subscribe to order_messages changes
    const messagesChannel = supabase
      .channel("customer-chat-messages")
      .on("postgres_changes", { event: "*", schema: "public", table: "order_messages" }, (payload) => {
        console.log("[ChatPage] Message change detected:", payload.eventType);
        fetchOrders();
      })
      .subscribe();

    // Subscribe to orders changes (new orders created)
    const ordersChannel = supabase
      .channel("customer-orders-list")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, (payload) => {
        console.log("[ChatPage] New order created:", payload.new);
        fetchOrders();
      })
      .subscribe();

    // Auto-refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      console.log("[ChatPage] Auto-refresh triggered");
      fetchOrders();
    }, 30000);

    return () => {
      console.log("[ChatPage] Cleaning up subscriptions");
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(ordersChannel);
      clearInterval(refreshInterval);
    };
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <link rel="canonical" href="https://www.myboost.top/chat" />
      </Helmet>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-6xl">
        <h1 className="text-3xl font-black uppercase tracking-tight text-foreground mb-8">
          Order <span className="text-primary glow-text">Chat</span>
        </h1>

        {orders.length === 0 ? (
          <Card className="border-border/40">
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">You have no orders yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Orders List */}
            <Card className="border-border/50 lg:col-span-1">
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto">
                  {orders.map((order) => (
                    <button
                      key={order.id}
                      onClick={() => {
                        console.log("[ChatPage] Selected order ID:", order.id);
                        console.log("[ChatPage] Order details:", {
                          id: order.id,
                          service: order.service,
                          created_at: order.created_at,
                        });
                        setSelectedOrderId(order.id);
                      }}
                      className={`w-full text-left p-4 border-b border-border/30 transition-colors hover:bg-secondary/50 ${
                        selectedOrderId === order.id ? "bg-secondary/50 border-l-2 border-l-primary" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Package className="h-4 w-4 text-primary shrink-0" />
                          <span className="text-sm font-semibold text-foreground truncate">
                            Order #{order.id.slice(0, 8)}
                          </span>
                        </div>
                        {order.unread_count > 0 && (
                          <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 text-xs shrink-0">
                            {order.unread_count}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mb-2">
                        {order.service}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <Badge variant="outline" className={`${statusColor[order.status] || statusColor.pending} text-xs`}>
                          {order.status}
                        </Badge>
                        {order.last_message_at && (
                          <span className="text-xs text-muted-foreground">
                            {new Date(order.last_message_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              {!selectedOrderId ? (
                <Card className="border-border/50">
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Select an order to view chat</p>
                  </CardContent>
                </Card>
              ) : selectedOrder ? (
                <div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Order #{selectedOrder.id.slice(0, 8)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {selectedOrder.service}
                        </p>
                      </div>
                      <Badge variant="outline" className={statusColor[selectedOrder.status] || statusColor.pending}>
                        {selectedOrder.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  {console.log("[ChatPage] Rendering chat with selectedOrderId:", selectedOrderId)}
                  <OrderChat orderId={selectedOrderId} isAdmin={false} />
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ChatPage;
