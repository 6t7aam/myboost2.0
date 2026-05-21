import { cn } from "@/lib/utils";

interface PriceWithDiscountProps {
  oldPrice: number | null | undefined;
  newPrice: number;
  unit?: string;
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "right" | "center";
  prefix?: string;
  className?: string;
  showBadge?: boolean;
  badgeLabel?: string;
}

const SIZE_NEW: Record<NonNullable<PriceWithDiscountProps["size"]>, string> = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

const SIZE_OLD: Record<NonNullable<PriceWithDiscountProps["size"]>, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

const ALIGN: Record<NonNullable<PriceWithDiscountProps["align"]>, string> = {
  left: "items-start text-left",
  right: "items-end text-right",
  center: "items-center text-center",
};

const PriceWithDiscount = ({
  oldPrice,
  newPrice,
  unit,
  size = "lg",
  align = "left",
  prefix,
  className,
  showBadge = false,
  badgeLabel = "SALE",
}: PriceWithDiscountProps) => {
  const hasOld = typeof oldPrice === "number" && oldPrice > newPrice;
  const format = (v: number) => `$${v.toFixed(2)}`;

  return (
    <div className={cn("flex flex-col gap-0.5", ALIGN[align], className)}>
      {hasOld ? (
        <span
          className={cn(
            "font-medium text-muted-foreground/70 line-through",
            SIZE_OLD[size],
          )}
        >
          {format(oldPrice as number)}
        </span>
      ) : null}
      <div className={cn("flex items-baseline gap-2", align === "right" ? "justify-end" : align === "center" ? "justify-center" : "justify-start")}>
        {prefix ? (
          <span className={cn("font-semibold text-muted-foreground", SIZE_OLD[size])}>
            {prefix}
          </span>
        ) : null}
        <span
          className={cn(
            "font-black tracking-tight text-primary drop-shadow-[0_0_8px_hsl(48_100%_50%_/_0.45)]",
            SIZE_NEW[size],
          )}
        >
          {format(newPrice)}
        </span>
        {unit ? (
          <span className={cn("font-medium text-muted-foreground", SIZE_OLD[size])}>
            {unit}
          </span>
        ) : null}
        {showBadge && hasOld ? (
          <span className="ml-1 inline-flex items-center rounded-full border border-primary/60 bg-primary/15 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary">
            {badgeLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default PriceWithDiscount;
