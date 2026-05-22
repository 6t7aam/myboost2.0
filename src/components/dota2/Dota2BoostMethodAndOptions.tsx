/**
 * Boost method (Piloted / Self-play) + Additional options checkboxes block.
 *
 * Shared across all Dota 2 service pages that support these controls. The
 * additional-options checkbox group is animated open/closed via max-height
 * transition when toggling between Piloted and Self-play.
 */

import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type {
  AdditionalOption,
  BoostMethod,
} from "@/data/dota2ServicePricing";

interface Dota2BoostMethodAndOptionsProps {
  selfPlayMultiplier: number;
  additionalOptions: AdditionalOption[];
  boostMethod: BoostMethod;
  onBoostMethodChange: (m: BoostMethod) => void;
  checkedOptionIds: Set<string>;
  onToggleOption: (id: string) => void;
}

const Dota2BoostMethodAndOptions = ({
  selfPlayMultiplier,
  additionalOptions,
  boostMethod,
  onBoostMethodChange,
  checkedOptionIds,
  onToggleOption,
}: Dota2BoostMethodAndOptionsProps) => {
  const selfPlayPct = Math.round((selfPlayMultiplier - 1) * 100);
  const selfPlayLabel = selfPlayPct > 0 ? `Self-play +${selfPlayPct}%` : "Self-play";
  const optionsVisible = boostMethod === "piloted" && additionalOptions.length > 0;

  return (
    <TooltipProvider delayDuration={200}>
      <div>
        <label className="text-xs font-bold uppercase text-foreground">Service method</label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onBoostMethodChange("piloted")}
            className={`rounded-lg border py-2.5 px-2 text-[11px] font-bold uppercase transition-colors ${
              boostMethod === "piloted"
                ? "bg-[#FFD700] text-black border-[#FFD700]"
                : "bg-[#111] text-white border-[rgba(255,215,0,0.3)] hover:border-[rgba(255,215,0,0.8)]"
            }`}
          >
            Piloted
          </button>
          <button
            type="button"
            onClick={() => onBoostMethodChange("self-play")}
            className={`rounded-lg border py-2.5 px-2 text-[11px] font-bold uppercase transition-colors ${
              boostMethod === "self-play"
                ? "bg-[#FFD700] text-black border-[#FFD700]"
                : "bg-[#111] text-white border-[rgba(255,215,0,0.3)] hover:border-[rgba(255,215,0,0.8)]"
            }`}
          >
            {selfPlayLabel}
          </button>
        </div>
      </div>

      {/* Additional options panel — animates open only when Piloted */}
      {additionalOptions.length > 0 && (
        <div
          aria-hidden={!optionsVisible}
          className={`overflow-hidden transition-all duration-300 ease-out ${
            optionsVisible ? "max-h-[600px] opacity-100 mt-5" : "max-h-0 opacity-0 mt-0"
          }`}
        >
          <label className="text-xs font-bold uppercase text-foreground">
            Additional options
          </label>
          <div className="mt-2 space-y-2">
            {additionalOptions.map((opt) => {
              const checked = checkedOptionIds.has(opt.id);
              return (
                <label
                  key={opt.id}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border bg-[#111] px-3 py-2 transition-colors ${
                    checked
                      ? "border-primary/70 bg-primary/5"
                      : "border-[rgba(255,215,0,0.2)] hover:border-[rgba(255,215,0,0.5)]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleOption(opt.id)}
                    className="h-4 w-4 shrink-0 cursor-pointer accent-[#FFD700]"
                  />
                  <span aria-hidden className="text-base">{opt.icon}</span>
                  <span className="flex-1 text-xs font-semibold text-foreground">
                    {opt.label}
                  </span>
                  {opt.percent > 0 && (
                    <span className="text-[11px] font-bold text-primary">+{opt.percent}%</span>
                  )}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={(e) => e.preventDefault()}
                        className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                        aria-label={`More info: ${opt.label}`}
                      >
                        <HelpCircle className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-[220px] text-xs">
                      {opt.tooltip}
                    </TooltipContent>
                  </Tooltip>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </TooltipProvider>
  );
};

export default Dota2BoostMethodAndOptions;
