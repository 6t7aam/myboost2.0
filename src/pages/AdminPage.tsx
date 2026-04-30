import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ShieldCheck, Trash2, Loader2, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAdmin } from "@/hooks/useAdmin";
import Navbar from "@/components/Navbar";
import AdminPromoCodes from "@/components/AdminPromoCodes";

type OrderStatus = "pending" | "in_progress" | "completed" | "paid";

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
  { value: "paid", label: "Paid" },
];

interface Order {
  id: string;
  service: string;
  price: number;
  status: string;
  created_at: string;
  user_id: string;
  user_email?: string;
  booster_type?: string;
}

const statusColor: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  in_progress: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-green-500/20 text-green-400 border-green-500/30",
  paid: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

const AdminPage = () => {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate("/login");
    }
  }, [adminLoading, isAdmin, navigate]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("id, service, price, status, created_at, user_id, booster_type")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load orders");
      setLoading(false);
      return;
    }

    const orderList = (data || []) as Order[];

    // Fetch emails from profiles for all unique user_ids
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

    setOrders(orderList);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) fetchOrders();
  }, [isAdmin, fetchOrders]);

  useEffect(() => {
    if (!isAdmin) return;
    const channel = supabase
      .channel("admin-orders")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => {
        fetchOrders();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [isAdmin, fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase.from("orders").update({ status: newStatus }).eq("id", orderId);
    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success("Status updated");
    }
  };

  const clearAllOrders = async () => {
    if (!window.confirm("Are you sure you want to delete ALL orders? This cannot be undone.")) return;
    const { error } = await supabase.from("orders").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (error) {
      toast.error("Failed to clear orders");
    } else {
      toast.success("All orders cleared");
      setOrders([]);
    }
  };

  if (adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.service.toLowerCase().includes(search.toLowerCase()) ||
      (o.user_email || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = orders.reduce((s, o) => s + o.price, 0);
  const pending = orders.filter((o) => o.status === "pending").length;
  const inProgress = orders.filter((o) => o.status === "in_progress").length;
  const completed = orders.filter((o) => o.status === "completed").length;

  return (
    <div className="min-h-screen bg-background select-none" onContextMenu={(e) => e.preventDefault()}>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={fetchOrders} className="border-primary/30 text-primary hover:bg-primary/10 gap-1.5">
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Button variant="destructive" size="sm" onClick={clearAllOrders} className="gap-1.5">
              <Trash2 className="h-4 w-4" /> Clear All Orders
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-border/50"><CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Revenue</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-primary">${totalRevenue.toFixed(2)}</p></CardContent></Card>
          <Card className="border-border/50"><CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pending</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-yellow-400">{pending}</p></CardContent></Card>
          <Card className="border-border/50"><CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">In Progress</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-blue-400">{inProgress}</p></CardContent></Card>
          <Card className="border-border/50"><CardHeader className="pb-2"><CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Completed</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-green-400">{completed}</p></CardContent></Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders or emails..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-secondary border-border" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-secondary border-border">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Promo Codes */}
        <div className="mb-8">
          <AdminPromoCodes />
        </div>

        {/* Orders Table */}
        <Card className="border-border/50 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Order ID</TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-muted-foreground">User Account</TableHead>
                  <TableHead className="text-muted-foreground">Service</TableHead>
                   <TableHead className="text-muted-foreground text-right">Price</TableHead>
                   <TableHead className="text-muted-foreground">Booster</TableHead>
                   <TableHead className="text-muted-foreground text-center">Status</TableHead>
                   <TableHead className="text-muted-foreground text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((order) => (
                  <TableRow key={order.id} className="border-border/30 hover:bg-secondary/50 transition-colors">
                    <TableCell className="font-mono text-xs text-primary">{order.id.slice(0, 8)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {order.user_email || <span className="italic text-muted-foreground/60">Guest</span>}
                    </TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate">{order.service}</TableCell>
                    <TableCell className="text-right font-semibold">${order.price.toFixed(2)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{order.booster_type || "—"}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className={`${statusColor[order.status] || statusColor.pending} text-xs`}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Select value={order.status} onValueChange={(val) => updateStatus(order.id, val)}>
                        <SelectTrigger className="h-8 w-[130px] text-xs bg-secondary border-border mx-auto">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((s) => (
                            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No orders found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
