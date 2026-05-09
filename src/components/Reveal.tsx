import { ReactNode, useEffect, useRef } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: keyof JSX.IntrinsicElements;
}

const Reveal = ({ children, className = "", delayMs, as: Tag = "div" }: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style = delayMs ? { transitionDelay: `${delayMs}ms` } : undefined;
  const Component = Tag as never;
  return (
    <Component
      ref={ref as never}
      className={`reveal ${className}`}
      style={style}
    >
      {children}
    </Component>
  );
};

export default Reveal;
