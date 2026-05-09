import { useEffect, useRef } from "react";

interface Options {
  threshold?: number;
  rootMargin?: string;
  staggerSelector?: string;
  staggerDelayMs?: number;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(options: Options = {}) {
  const { threshold = 0.12, rootMargin = "0px 0px -40px 0px", staggerSelector, staggerDelayMs = 100, once = true } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const reveal = (target: HTMLElement) => {
      if (staggerSelector) {
        const items = target.querySelectorAll<HTMLElement>(staggerSelector);
        items.forEach((item, idx) => {
          item.style.transitionDelay = `${idx * staggerDelayMs}ms`;
          item.classList.add("is-visible");
        });
      }
      target.classList.add("is-visible");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            (entry.target as HTMLElement).classList.remove("is-visible");
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, staggerSelector, staggerDelayMs, once]);

  return ref;
}
