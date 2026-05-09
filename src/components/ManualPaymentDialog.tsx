import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  CheckCircle2,
  Copy,
  CreditCard,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const MAX_SIZE = 10 * 1024 * 1024;

interface ManualPaymentItem {
  game: string;
  service: string;
  price: number;
  options: Record<string, string | number>;
}

interface ManualPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: ManualPaymentItem[];
  totalPrice: number;
  finalPrice: number;
  promoCode?: { code: string; discount_percent: number } | null;
  boosterType?: string | null;
  boosterMultiplier?: number | null;
  onCleanup?: () => void;
}

interface PaymentDetails {
  card_number: string;
  card_name: string;
  bank_name: string;
}

const generateOrderCode = () =>
  `ORDER-${Math.floor(100000 + Math.random() * 900000)}`;

const ManualPaymentDialog = ({
  open,
  onOpenChange,
  items,
  totalPrice,
  finalPrice,
  promoCode,
  boosterType,
  boosterMultiplier,
  onCleanup,
}: ManualPaymentDialogProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [details, setDetails] = useState<PaymentDetails | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ orderId: string; code: string } | null>(null);

  const orderCode = useMemo(generateOrderCode, [open]);

  useEffect(() => {
    if (!open) return;
    setSuccess(null);
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setDetailsError(null);

    let cancelled = false;
    setDetailsLoading(true);
    supabase.functions
      .invoke("get-payment-details")
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setDetailsError(error.message || "Failed to load payment details");
          setDetails(null);
        } else if (data && data.ok === false) {
          setDetailsError(data.error || "Manual payment is not configured.");
          setDetails(null);
        } else {
          setDetails((data?.data || data) as PaymentDetails);
        }
      })
      .finally(() => {
        if (!cancelled) setDetailsLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = (selected: File | null) => {
    if (!selected) return;
    if (!ACCEPTED_TYPES.includes(selected.type)) {
      toast.error("Only JPG, PNG, WebP, or PDF files are accepted.");
      return;
    }
    if (selected.size > MAX_SIZE) {
      toast.error("File must be 10MB or smaller.");
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(selected);
    setPreviewUrl(selected.type.startsWith("image/") ? URL.createObjectURL(selected) : null);
  };

  const copyValue = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Could not copy to clipboard");
    }
  };

  const submit = async () => {
    if (!user) {
      toast.error("Please log in to submit a manual payment.");
      navigate("/login");
      return;
    }
    if (!file) {
      toast.error("Please upload a screenshot of your payment.");
      return;
    }
    if (!details) {
      toast.error("Payment details unavailable. Try again.");
      return;
    }

    setSubmitting(true);
    try {
      const serviceName = items.map((i) => `${i.game} — ${i.service}`).join(", ");
      const orderInsert: Record<string, unknown> = {
        user_id: user.id,
        service: serviceName,
        price: finalPrice,
        status: "pending_verification",
        payment_method: "manual_card",
        manual_order_code: orderCode,
        order_details: {
          items,
          promo_code: promoCode?.code,
          discount_percent: promoCode?.discount_percent,
          booster_type: boosterType,
          booster_multiplier: boosterMultiplier,
          original_price: totalPrice,
          final_price: finalPrice,
        },
      };
      if (boosterType) orderInsert.booster_type = boosterType;

      const { data: order, error: insertErr } = await supabase
        .from("orders")
        .insert(orderInsert as never)
        .select("id")
        .single();

      if (insertErr || !order) {
        throw new Error(insertErr?.message || "Failed to create order");
      }

      const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
      const path = `${user.id}/${order.id}-${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage
        .from("payment-screenshots")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (uploadErr) throw new Error(uploadErr.message || "Failed to upload screenshot");

      const { data: pub } = supabase.storage
        .from("payment-screenshots")
        .getPublicUrl(path);
      const screenshotUrl = pub?.publicUrl;

      if (!screenshotUrl) throw new Error("Could not get screenshot URL");

      await supabase
        .from("orders")
        .update({ payment_screenshot_url: screenshotUrl } as never)
        .eq("id", order.id);

      if (promoCode) {
        await supabase.rpc("increment_promo_usage" as never, { _code: promoCode.code });
        await supabase
          .from("promo_code_usage" as never)
          .insert({ user_id: user.id, promo_code: promoCode.code } as never);
      }

      const message = [
        "🔔 New manual payment order",
        `Order ID: ${orderCode}`,
        `Service: ${serviceName}`,
        `Amount: $${finalPrice.toFixed(2)}`,
        `Status: Awaiting verification`,
        `Screenshot: ${screenshotUrl}`,
      ].join("\n");

      const { error: msgErr } = await supabase.from("order_messages").insert({
        order_id: order.id,
        sender_type: "customer",
        sender_id: user.id,
        message,
      });
      if (msgErr) console.warn("Failed to post chat message:", msgErr);

      setSuccess({ orderId: order.id, code: orderCode });
      onCleanup?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      console.error(err);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const close = () => {
    if (submitting) return;
    onOpenChange(false);
  };

  const goToOrder = () => {
    if (!success) return;
    onOpenChange(false);
    navigate(`/order/status/${success.orderId}`, { state: { openChat: true } });
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="border-primary/40 bg-background max-w-lg p-0 overflow-hidden max-h-[90vh] flex flex-col">
        {success ? (
          <div className="p-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-xl font-black uppercase tracking-tight text-foreground">
              Order Submitted
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your Order ID: <span className="font-mono font-bold text-primary">{success.code}</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              We'll verify your payment within 15 minutes and start your order immediately.
              Track progress in <span className="font-semibold text-foreground">My Orders</span>.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Button
                onClick={goToOrder}
                className="btn-yellow w-full font-bold uppercase tracking-wider"
                style={{ backgroundColor: "#FFD700", color: "#000", height: "48px" }}
              >
                View Order Status
              </Button>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="w-full border-primary/40 text-primary hover:bg-primary/10"
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-border/50 bg-primary/5 px-6 py-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-black uppercase tracking-tight text-foreground">
                  Complete Your Payment
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                disabled={submitting}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Order summary */}
              <div className="rounded-lg border border-border/50 bg-card/40 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Order Summary
                </h3>
                <div className="mt-2 space-y-1 text-sm">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-foreground">
                        {item.game} — {item.service}
                      </span>
                      <span className="font-semibold text-foreground">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="mt-2 flex justify-between border-t border-border/40 pt-2">
                    <span className="font-semibold text-foreground">Amount</span>
                    <span className="text-xl font-black text-primary">
                      ${finalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment details */}
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Send Payment To
                </h3>
                {detailsLoading ? (
                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Loading payment details…
                  </div>
                ) : detailsError ? (
                  <div className="mt-3 flex items-start gap-2 text-sm text-destructive">
                    <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{detailsError}</span>
                  </div>
                ) : details ? (
                  <div className="mt-2 space-y-2">
                    <DetailRow label="Card" value={details.card_number} mono onCopy={copyValue} />
                    <DetailRow label="Name" value={details.card_name} onCopy={copyValue} />
                    <DetailRow label="Bank" value={details.bank_name} onCopy={copyValue} />
                  </div>
                ) : null}

                <div className="mt-3 flex items-start gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-xs">
                  <AlertTriangle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div className="text-foreground">
                    Include this in the payment comment:{" "}
                    <button
                      type="button"
                      onClick={() => copyValue(orderCode, "Order code")}
                      className="font-mono font-bold text-primary underline-offset-2 hover:underline"
                    >
                      {orderCode}
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Upload Payment Screenshot
                </h3>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept={ACCEPTED_TYPES.join(",")}
                  onChange={(e) => handleFile(e.target.files?.[0] || null)}
                />

                {file ? (
                  <div className="mt-2 rounded-lg border border-primary/40 bg-card/40 p-3">
                    <div className="flex items-start gap-3">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Payment screenshot preview"
                          className="h-20 w-20 rounded-md object-cover border border-border/50"
                        />
                      ) : (
                        <div className="h-20 w-20 rounded-md border border-border/50 bg-card flex items-center justify-center text-xs text-muted-foreground">
                          PDF
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <div className="mt-2 flex gap-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-xs font-semibold text-primary hover:underline"
                          >
                            Replace
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (previewUrl) URL.revokeObjectURL(previewUrl);
                              setFile(null);
                              setPreviewUrl(null);
                            }}
                            className="text-xs font-semibold text-muted-foreground hover:text-destructive"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-2 flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/40 bg-card/30 py-6 text-sm text-muted-foreground transition-colors hover:border-primary/70 hover:text-primary"
                  >
                    <Upload className="h-5 w-5" />
                    <span className="font-semibold">Click to upload screenshot</span>
                    <span className="text-xs">JPG, PNG, WebP, PDF · max 10MB</span>
                  </button>
                )}
              </div>
            </div>

            <div className="border-t border-border/50 p-4 bg-background">
              <Button
                onClick={submit}
                disabled={submitting || !file || !details}
                className="btn-yellow cta-pulse w-full font-bold uppercase tracking-wider gap-2"
                style={{
                  backgroundColor: "#FFD700",
                  color: "#000",
                  height: "54px",
                  fontSize: "16px",
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Submitting…
                  </>
                ) : (
                  <>Submit Order →</>
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const DetailRow = ({
  label,
  value,
  mono,
  onCopy,
}: {
  label: string;
  value: string;
  mono?: boolean;
  onCopy: (value: string, label: string) => void;
}) => (
  <div className="flex items-center justify-between gap-3 rounded-md bg-background/40 px-3 py-2">
    <div className="min-w-0 flex-1">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`truncate text-sm text-foreground ${mono ? "font-mono" : ""}`}>{value}</div>
    </div>
    <button
      type="button"
      onClick={() => onCopy(value, label)}
      className="shrink-0 text-muted-foreground hover:text-primary"
      aria-label={`Copy ${label}`}
    >
      <Copy className="h-4 w-4" />
    </button>
  </div>
);

export default ManualPaymentDialog;
