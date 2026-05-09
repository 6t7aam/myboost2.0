import { useMemo } from "react";

interface ParticlesProps {
  count?: number;
  className?: string;
}

const Particles = ({ count = 50, className = "" }: ParticlesProps) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = 2 + Math.random() * 2;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const dx = (Math.random() - 0.5) * 80;
      const dy = -40 - Math.random() * 80;
      const duration = 10 + Math.random() * 14;
      const delay = -Math.random() * duration;
      const opacity = 0.15 + Math.random() * 0.25;
      return { i, size, left, top, dx, dy, duration, delay, opacity };
    });
  }, [count]);

  return (
    <div className={`particles ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.i}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: `rgba(255, 215, 0, ${p.opacity})`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--p-dx" as never]: `${p.dx}px`,
            ["--p-dy" as never]: `${p.dy}px`,
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
