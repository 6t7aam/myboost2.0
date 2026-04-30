import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tag, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface PromoCodeInputProps {
  appliedCode: { code: string; discount_percent: number } | null;
  onApply: (code: { code: string; discount_percent: number }) => void;
  onRemove: () => void;
  orderTotal: number;
}

const PromoCodeInput = ({ appliedCode, onApply, onRemove, orderTotal }: PromoCodeInputProps) => {
  const [input, setInput] = useState("");
  const [checking, setChecking] = useState(false);
  const { user } = useAuth();

  const handleApply = async () => {
    const trimmed = input.trim().toUpperCase();
    if (!trimmed) return;

    if (!user) {
      toast.error("Please log in to use promo codes");
      return;
    }

    setChecking(true);

    // Check if user already used this code
    const { data: usageData } = await supabase
      .from("promo_code_usage" as any)
      .select("id")
      .eq("user_id", user.id)
      .eq("promo_code", trimmed)
      .maybeSingle();

    if (usageData) {
      toast.error("You have already used this promo code");
      setChecking(false);
      return;
    }

    const { data, error } = await supabase
      .from("promo_codes")
      .select("code, discount_percent, is_active, usage_count, usage_limit, min_order_amount")
      .eq("code", trimmed)
      .maybeSingle();

    if (error || !data) {
      toast.error("Invalid promo code");
    } else if (!data.is_active) {
      toast.error("This promo code is no longer active");
    } else if ((data as any).usage_count >= (data as any).usage_limit) {
      toast.error("Promo code expired");
    } else if ((data as any).min_order_amount > 0 && orderTotal < (data as any).min_order_amount) {
      const minAmount = (data as any).min_order_amount;
      const diff = (minAmount - orderTotal).toFixed(2);
      toast.error(`Promo code cannot be applied. Minimum order amount is $${minAmount}. You need $${diff} more to use this code.`);
    } else {
      onApply({ code: data.code, discount_percent: data.discount_percent });
      toast.success(`Promo code applied: ${data.discount_percent}% off!`);
      setInput("");
    }
    setChecking(false);
  };

  if (appliedCode) {
    return (
      <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 px-4 py-3">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-primary" />
          <span className="font-mono font-bold text-primary">{appliedCode.code}</span>
          <span className="text-sm text-muted-foreground">
            — {appliedCode.discount_percent}% off
          </span>
        </div>
        <button
          onClick={onRemove}
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter promo code"
        value={input}
        onChange={(e) => setInput(e.target.value.toUpperCase())}
        className="bg-secondary border-border font-mono uppercase"
        onKeyDown={(e) => e.key === "Enter" && handleApply()}
      />
      <Button
        onClick={handleApply}
        disabled={checking || !input.trim()}
        variant="outline"
        className="border-primary/30 text-primary hover:bg-primary/10 font-bold uppercase tracking-wider shrink-0"
      >
        {checking ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
      </Button>
    </div>
  );
};

export default PromoCodeInput;
