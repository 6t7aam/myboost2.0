import { useEffect, useState } from "react";

interface Parts {
  prefix: string;
  number: number;
  decimals: number;
  suffix: string;
}

function parseValue(input: string): Parts | null {
  const match = input.match(/^([^\d.-]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const number = parseFloat(numStr.replace(/,/g, ""));
  if (Number.isNaN(number)) return null;
  return { prefix, number, decimals, suffix };
}

function formatNumber(value: number, decimals: number, useThousands: boolean) {
  const fixed = value.toFixed(decimals);
  if (!useThousands) return fixed;
  const [whole, frac] = fixed.split(".");
  const withSep = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return frac ? `${withSep}.${frac}` : withSep;
}

export function useCountUp(target: string, durationMs = 1500, startWhen = true): string {
  const [display, setDisplay] = useState<string>(target);

  useEffect(() => {
    const parts = parseValue(target);
    if (!parts) {
      setDisplay(target);
      return;
    }
    if (!startWhen) {
      setDisplay(`${parts.prefix}${formatNumber(0, parts.decimals, target.includes(","))}${parts.suffix}`);
      return;
    }

    const useThousands = target.includes(",");
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setDisplay(target);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = parts.number * eased;
      setDisplay(`${parts.prefix}${formatNumber(value, parts.decimals, useThousands)}${parts.suffix}`);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs, startWhen]);

  return display;
}
