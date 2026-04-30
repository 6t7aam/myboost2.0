import { useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Loader2, Tag, ChevronDown, ChevronUp, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PromoCode {
  id: string;
  code: string;
  discount_percent: number;
  is_active: boolean;
  usage_limit: number;
  usage_count: number;
  min_order_amount: number;
  created_at: string;
}

interface PromoUsage {
  id: string;
  user_id: string;
  promo_code: string;
  used_at: string;
  email?: string;
}

const AdminPromoCodes = () => {
  const [codes, setCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState(10);
  const [newUsageLimit, setNewUsageLimit] = useState(10);
  const [newMinOrder, setNewMinOrder] = useState(0);
  const [creating, setCreating] = useState(false);
  const [expandedCode, setExpandedCode] = useState<string | null>(null);
  const [usageData, setUsageData] = useState<Record<string, PromoUsage[]>>({});
  const [loadingUsage, setLoadingUsage] = useState<string | null>(null);

  const fetchCodes = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("promo_codes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load promo codes");
    } else {
      setCodes((data as PromoCode[]) || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCodes();
  }, [fetchCodes]);

  const fetchUsage = async (code: string) => {
    if (usageData[code]) return;
    setLoadingUsage(code);
    const { data: usages, error } = await supabase
      .from("promo_code_usage")
      .select("*")
      .eq("promo_code", code)
      .order("used_at", { ascending: false });
    if (error) {
      toast.error("Failed to load usage data");
      setLoadingUsage(null);
      return;
    }
    // Fetch emails from profiles
    const userIds = [...new Set((usages || []).map((u: any) => u.user_id))];
    let emailMap: Record<string, string> = {};
    if (userIds.length > 0) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, email")
        .in("user_id", userIds);
      (profiles || []).forEach((p: any) => {
        if (p.email) emailMap[p.user_id] = p.email;
      });
    }
    const enriched: PromoUsage[] = (usages || []).map((u: any) => ({
      ...u,
      email: emailMap[u.user_id] || "Unknown",
    }));
    setUsageData((prev) => ({ ...prev, [code]: enriched }));
    setLoadingUsage(null);
  };

  const toggleExpand = (code: string) => {
    if (expandedCode === code) {
      setExpandedCode(null);
    } else {
      setExpandedCode(code);
      fetchUsage(code);
    }
  };

  const createCode = async () => {
    const trimmed = newCode.trim().toUpperCase();
    if (!trimmed) {
      toast.error("Enter a code name");
      return;
    }
    setCreating(true);
    const { error } = await supabase.from("promo_codes").insert({
      code: trimmed,
      discount_percent: newDiscount,
      usage_limit: newUsageLimit,
      min_order_amount: newMinOrder,
    } as any);
    if (error) {
      if (error.code === "23505") {
        toast.error("This code already exists");
      } else {
        toast.error("Failed to create promo code");
      }
    } else {
      toast.success(`Promo code ${trimmed} created`);
      setNewCode("");
      setNewDiscount(10);
      setNewUsageLimit(10);
      setNewMinOrder(0);
      fetchCodes();
    }
    setCreating(false);
  };

  const deleteCode = async (id: string, code: string) => {
    if (!window.confirm(`Delete promo code "${code}"?`)) return;
    const { error } = await supabase.from("promo_codes").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete");
    } else {
      toast.success("Promo code deleted");
      setCodes((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const toggleActive = async (id: string, currentActive: boolean) => {
    const { error } = await supabase
      .from("promo_codes")
      .update({ is_active: !currentActive })
      .eq("id", id);
    if (error) {
      toast.error("Failed to update");
    } else {
      setCodes((prev) =>
        prev.map((c) => (c.id === id ? { ...c, is_active: !currentActive } : c))
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Tag className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold text-foreground">Promo Codes</h2>
      </div>

      {/* Create new code */}
      <Card className="border-primary/20 bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Create New Promo Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Code name (e.g. SAVE10)"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value.toUpperCase())}
              className="bg-secondary border-border font-mono uppercase"
              maxLength={30}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Discount:</span>
              <Slider
                value={[newDiscount]}
                onValueChange={(v) => setNewDiscount(v[0])}
                min={1}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-bold text-primary w-12 text-right">{newDiscount}%</span>
            </div>
            <div className="flex items-center gap-3 flex-1">
              <span className="text-sm text-muted-foreground whitespace-nowrap">Uses:</span>
              <Slider
                value={[newUsageLimit]}
                onValueChange={(v) => setNewUsageLimit(v[0])}
                min={1}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-bold text-primary w-12 text-right">{newUsageLimit}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Min Order $:</span>
            <Slider
              value={[newMinOrder]}
              onValueChange={(v) => setNewMinOrder(v[0])}
              min={0}
              max={100}
              step={1}
              className="flex-1"
            />
            <span className="text-sm font-bold text-primary w-16 text-right">${newMinOrder}</span>
          </div>
          <Button
            onClick={createCode}
            disabled={creating || !newCode.trim()}
            className="gap-1.5 glow-box font-bold uppercase tracking-wider"
          >
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Create Promo Code
          </Button>
        </CardContent>
      </Card>

      {/* Codes table */}
      <Card className="border-border/50 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : codes.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground text-sm">
            No promo codes yet
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground">Code</TableHead>
                <TableHead className="text-muted-foreground text-center">Discount</TableHead>
                <TableHead className="text-muted-foreground text-center">Min Order</TableHead>
                <TableHead className="text-muted-foreground text-center">Usage</TableHead>
                <TableHead className="text-muted-foreground text-center">Status</TableHead>
                <TableHead className="text-muted-foreground text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {codes.map((code) => (
                <>
                  <TableRow key={code.id} className="border-border/30 hover:bg-secondary/50">
                    <TableCell className="font-mono font-bold text-primary">
                      <button
                        onClick={() => toggleExpand(code.code)}
                        className="flex items-center gap-1.5 hover:underline"
                      >
                        {expandedCode === code.code ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )}
                        {code.code}
                      </button>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        {code.discount_percent}% OFF
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground">
                      {code.min_order_amount > 0 ? `$${code.min_order_amount}` : "—"}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`text-sm font-medium ${code.usage_count >= code.usage_limit ? "text-destructive" : "text-muted-foreground"}`}>
                        {code.usage_count} / {code.usage_limit}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Switch
                          checked={code.is_active}
                          onCheckedChange={() => toggleActive(code.id, code.is_active)}
                        />
                        <span className={`text-xs ${code.is_active ? "text-green-400" : "text-muted-foreground"}`}>
                          {code.is_active ? "Active" : "Disabled"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteCode(code.id, code.code)}
                        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedCode === code.code && (
                    <TableRow key={`${code.id}-usage`} className="border-border/30 hover:bg-transparent">
                      <TableCell colSpan={6} className="p-0">
                        <div className="bg-secondary/20 border-t border-border/30 px-6 py-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Users className="h-4 w-4 text-primary" />
                            <span className="text-sm font-semibold text-foreground">Usage History</span>
                          </div>
                          {loadingUsage === code.code ? (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                            </div>
                          ) : !usageData[code.code] || usageData[code.code].length === 0 ? (
                            <p className="text-sm text-muted-foreground">No usage yet</p>
                          ) : (
                            <div className="space-y-1.5">
                              {usageData[code.code].map((u) => (
                                <div key={u.id} className="flex items-center justify-between rounded-lg bg-secondary/40 px-3 py-2 text-sm">
                                  <span className="text-foreground font-medium">{u.email}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(u.used_at).toLocaleDateString()} {new Date(u.used_at).toLocaleTimeString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default AdminPromoCodes;
