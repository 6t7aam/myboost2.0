import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, Calendar, DollarSign, Package, User, CreditCard, Trash2, Check, X, ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAdmin } from "@/hooks/useAdmin";
import Navbar from "@/components/Navbar";
import OrderChat from "@/components/OrderChat";

type OrderStatus = "pending" | "pending_verification" | "in_progress" | "completed" | "paid" | "payment_rejected";

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "pending_verification", label: "Pending Verification" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "paid", label: "Paid" },
  { value: "payment_rejected", label: "Payment Rejected" },
];

interface OrderDetails {
  id: string;
  service: string;
  price: number;
  status: string;
  created_at: string;
  user_id: string;
  user_email?: string;
  booster_type?: string;
  pay_address?: string;
  pay_amount?: number;
  pay_currency?: string;
  payment_id?: string;
  payment_method?: string;
  manual_order_code?: string;
  payment_screenshot_url?: string;
  order_details?: {
    items?: Array<{
      game: string;
      service: string;
      price: number;
      options: Record<string, any>;
    }>;
    promo_code?: string;
    discount_percent?: number;
    booster_type?: string;
    booster_multiplier?: number;
    original_price?: number;
    final_price?: number;
  };
}

const statusColor: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  pending_verification: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  in_progress: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  paid: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  payment_rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

const AdminOrderDetailsPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate("/login");
    }
  }, [adminLoading, isAdmin, navigate]);

  useEffect(() => {
    if (!orderId || !isAdmin) return;

    const fetchOrder = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (error) {
        toast.error("Failed to load order");
        setLoading(false);
        return;
      }

      const orderData = data as OrderDetails;

      // Fetch user email
      if (orderData.user_id) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("email")
          .eq("user_id", orderData.user_id)
          .single();

        if (profile?.email) {
          orderData.user_email = profile.email;
        }
      }

      setOrder(orderData);
      setLoading(false);
    };

    fetchOrder();
  }, [orderId, isAdmin]);

  const updateStatus = async (newStatus: string) => {
    if (!orderId) return;

    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      console.error("Status update error:", error);
      toast.error(`Failed to update status: ${error.message}`);
    } else {
      toast.success("Status updated");
      setOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const deleteOrder = async () => {
    if (!orderId) return;
    if (!window.confirm("Are you sure you want to delete this order? This cannot be undone.")) return;

    const { error } = await supabase.from("orders").delete().eq("id", orderId);

    if (error) {
      console.error("Delete order error:", error);
      toast.error(`Failed to delete order: ${error.message}`);
    } else {
      toast.success("Order deleted");
      navigate("/admin");
    }
  };

  if (adminLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  if (!order) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Order Not Found</h1>
            <Link to="/admin">
              <Button className="mt-4" variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="mb-6">
          <Link to="/admin">
            <Button variant="outline" size="sm" className="mb-4 border-primary/30 text-primary hover:bg-primary/10">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Admin Dashboard
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Order Details</h1>
              <p className="text-sm text-muted-foreground mt-1">Order ID: {order.id}</p>
            </div>
            <Badge variant="outline" className={`${statusColor[order.status] || statusColor.pending} text-sm px-4 py-2`}>
              {order.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Order Information */}
          <div className="space-y-6">
            {/* Basic Info */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Order Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Service</p>
                    <p className="font-semibold text-foreground">{order.service}</p>
                    {order.order_details?.items && order.order_details.items.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {order.order_details.items.map((item, idx) => (
                          <div key={idx} className="rounded-lg bg-secondary/50 p-3 space-y-1">
                            <p className="text-xs font-medium text-foreground">{item.game} — {item.service}</p>
                            <div className="text-xs text-muted-foreground space-y-0.5">
                              {Object.entries(item.options).map(([key, value]) => (
                                <div key={key} className="flex justify-between">
                                  <span>{key}:</span>
                                  <span className="font-medium text-foreground">{String(value)}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-semibold text-foreground">${order.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <p className="font-semibold text-foreground">
                      {order.payment_method === "crypto" && "Crypto"}
                      {order.payment_method === "card" && "Card"}
                      {order.payment_method === "manual_card" && "Card (manual verification)"}
                      {order.payment_method === "paypal" && "PayPal"}
                      {order.payment_method === "promo" && "Promo / Free"}
                      {!order.payment_method && <span className="italic text-muted-foreground/60">Unknown</span>}
                    </p>
                    {order.manual_order_code && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        Manual code: <span className="font-mono text-primary">{order.manual_order_code}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-semibold text-foreground">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Customer</p>
                    <p className="font-semibold text-foreground">
                      {order.user_email || <span className="italic text-muted-foreground/60">Guest</span>}
                    </p>
                  </div>
                </div>

                {order.booster_type && (
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Booster Type</p>
                      <p className="font-semibold text-foreground">{order.booster_type}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Status Management */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Status Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">Update order status:</p>
                  <Select value={order.status} onValueChange={updateStatus}>
                    <SelectTrigger className="bg-secondary border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Manual payment verification */}
            {(order.payment_method === "manual_card" || order.payment_screenshot_url) && (
              <Card className="border-orange-500/40 bg-orange-500/5">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-orange-400" />
                    Manual Payment Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.payment_screenshot_url ? (
                    <a
                      href={order.payment_screenshot_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block overflow-hidden rounded-lg border border-primary/30 bg-background/40 hover:border-primary/60"
                    >
                      <img
                        src={order.payment_screenshot_url}
                        alt="Payment screenshot"
                        className="w-full max-h-80 object-contain bg-black"
                      />
                      <div className="px-3 py-2 text-xs text-muted-foreground">
                        Click to open full size in new tab
                      </div>
                    </a>
                  ) : (
                    <p className="text-sm italic text-muted-foreground">No screenshot uploaded.</p>
                  )}

                  {order.status === "pending_verification" && (
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => updateStatus("in_progress")}
                        className="gap-1.5 bg-green-500/90 text-white hover:bg-green-500"
                      >
                        <Check className="h-4 w-4" /> Confirm Payment
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => updateStatus("payment_rejected")}
                        className="gap-1.5 border-red-500/40 text-red-400 hover:bg-red-500/10"
                      >
                        <X className="h-4 w-4" /> Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Delete Order */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Danger Zone</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="destructive"
                  onClick={deleteOrder}
                  className="w-full gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Order
                </Button>
              </CardContent>
            </Card>

            {/* Payment Info */}
            {order.pay_address && (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg">Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {order.pay_amount && order.pay_currency && (
                    <div>
                      <p className="text-sm text-muted-foreground">Amount</p>
                      <p className="font-semibold text-foreground">
                        {order.pay_amount} {order.pay_currency.toUpperCase()}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-mono text-xs text-foreground break-all">{order.pay_address}</p>
                  </div>
                  {order.payment_id && (
                    <div>
                      <p className="text-sm text-muted-foreground">Payment ID</p>
                      <p className="font-mono text-xs text-foreground">{order.payment_id}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Chat Section */}
          <div>
            <OrderChat orderId={order.id} isAdmin={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetailsPage;
