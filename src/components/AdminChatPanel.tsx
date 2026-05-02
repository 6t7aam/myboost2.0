import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Loader2, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import OrderChat from "./OrderChat";

interface OrderWithMessages {
  id: string;
  service: string;
  status: string;
  created_at: string;
  user_id: string;
  user_email?: string;
  unread_count: number;
  last_message_at: string | null;
  last_message_preview?: string;
  last_message_sender?: string;
}

const statusColor: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  in_progress: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  paid: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const AdminChatPanel = () => {
  const [orders, setOrders] = useState<OrderWithMessages[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const fetchOrdersWithMessages = useCallback(async () => {
    console.log("[AdminChatPanel] Fetching orders at:", new Date().toISOString());
    setLoading(true);

    // Fetch all orders
    const { data: ordersData, error: ordersError } = await supabase
      .from("orders")
      .select("id, service, status, created_at, user_id")
      .order("created_at", { ascending: false });

    if (ordersError) {
      console.error("[AdminChatPanel] Error fetching orders:", ordersError);
      toast.error("Failed to load orders");
      setLoading(false);
      return;
    }

    console.log("[AdminChatPanel] Fetched", ordersData?.length || 0, "orders");

    const orderList = (ordersData || []) as OrderWithMessages[];

    // Fetch user emails
    const userIds = [...new Set(orderList.map((o) => o.user_id))];
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, email")
        .in("user_id", userIds);

      const emailMap: Record<string, string> = {};
      (profiles || []).forEach((p: any) => {
        if (p.email) emailMap[p.user_id] = p.email;
      });

      orderList.forEach((o) => {
        o.user_email = emailMap[o.user_id] || undefined;
      });
    }

    // Fetch messages for each order
    for (const order of orderList) {
      const { data: messages, error: messagesError } = await supabase
        .from("order_messages")
        .select("created_at, sender_type, message")
        .eq("order_id", order.id)
        .order("created_at", { ascending: false });

      if (messagesError) {
        console.error("[AdminChatPanel] Error fetching messages for order:", order.id, messagesError);
      }

      if (messages && messages.length > 0) {
        order.last_message_at = messages[0].created_at;
        order.last_message_preview = messages[0].message;
        order.last_message_sender = messages[0].sender_type;
        // Count unread customer messages
        order.unread_count = messages.filter((m: any) => m.sender_type === "customer").length;
      } else {
        order.last_message_at = null;
        order.last_message_preview = undefined;
        order.last_message_sender = undefined;
        order.unread_count = 0;
      }
    }

    // Filter: only show orders with messages
    const ordersWithMessages = orderList.filter(o => o.last_message_at !== null);

    // Sort by last message time (most recent first)
    ordersWithMessages.sort((a, b) => {
      if (a.last_message_at && b.last_message_at) {
        return new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime();
      }
      return 0;
    });

    console.log("[AdminChatPanel] Orders with messages:", ordersWithMessages.length);
    console.log("[AdminChatPanel] Orders with messages by status:", {
      total: ordersWithMessages.length,
      pending: ordersWithMessages.filter(o => o.status === 'pending').length,
      paid: ordersWithMessages.filter(o => o.status === 'paid').length,
      in_progress: ordersWithMessages.filter(o => o.status === 'in_progress').length,
      completed: ordersWithMessages.filter(o => o.status === 'completed').length,
    });
    console.log("[AdminChatPanel] First 5 order IDs:", ordersWithMessages.slice(0, 5).map(o => ({
      id: o.id.slice(0, 8),
      status: o.status,
      last_message: o.last_message_at ? new Date(o.last_message_at).toISOString() : 'none',
      preview: o.last_message_preview?.slice(0, 30),
    })));

    setOrders(ordersWithMessages);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrdersWithMessages();
  }, [fetchOrdersWithMessages]);

  // Subscribe to new messages AND new orders
  useEffect(() => {
    console.log("[AdminChatPanel] Setting up real-time subscriptions");

    // Subscribe to order_messages changes
    const messagesChannel = supabase
      .channel("admin-chat-messages")
      .on("postgres_changes", { event: "*", schema: "public", table: "order_messages" }, (payload) => {
        console.log("[AdminChatPanel] Message change detected:", payload.eventType);
        fetchOrdersWithMessages();
      })
      .subscribe();

    // Subscribe to orders changes (new orders created)
    const ordersChannel = supabase
      .channel("admin-orders-list")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" }, (payload) => {
        console.log("[AdminChatPanel] New order created:", payload.new);
        fetchOrdersWithMessages();
      })
      .subscribe();

    // Auto-refresh every 30 seconds to catch any missed updates
    const refreshInterval = setInterval(() => {
      console.log("[AdminChatPanel] Auto-refresh triggered");
      fetchOrdersWithMessages();
    }, 30000);

    return () => {
      console.log("[AdminChatPanel] Cleaning up subscriptions");
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(ordersChannel);
      clearInterval(refreshInterval);
    };
  }, [fetchOrdersWithMessages]);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold text-foreground">Order Chats</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <Card className="border-border/50 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Chats ({orders.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : orders.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-sm">
                No chats yet
              </div>
            ) : (
              <div className="max-h-[600px] overflow-y-auto">
                {orders.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => {
                      console.log("[AdminChatPanel] Selected order ID:", order.id);
                      console.log("[AdminChatPanel] Order details:", {
                        id: order.id,
                        service: order.service,
                        user_email: order.user_email,
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
                        <User className="h-4 w-4 text-primary shrink-0" />
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className="text-sm font-semibold text-foreground truncate">
                            {order.user_email || "Guest"}
                          </span>
                          <span className="text-xs text-muted-foreground/70 truncate">
                            #{order.id.slice(0, 8)}
                          </span>
                        </div>
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
                    {order.last_message_preview && (
                      <p className="text-xs text-muted-foreground/80 truncate mb-2 italic">
                        {order.last_message_sender === "customer" ? "Customer: " : "You: "}
                        {order.last_message_preview}
                      </p>
                    )}
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
            )}
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="border-border/50 lg:col-span-2">
          <CardContent className="p-6">
            {!selectedOrderId ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-3" />
                <p className="text-muted-foreground">Select an order to view chat</p>
              </div>
            ) : selectedOrder ? (
              <div>
                <div className="mb-4 pb-4 border-b border-border/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {selectedOrder.user_email || "Guest"}
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
                {console.log("[AdminChatPanel] Rendering chat with selectedOrderId:", selectedOrderId)}
                <OrderChat orderId={selectedOrderId} isAdmin={true} />
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminChatPanel;
