import { useMemo, useEffect, useState } from "react";

interface ParticlesProps {
  count?: number;
  className?: string;
}

const Particles = ({ count = 50, className = "" }: ParticlesProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detect mobile devices
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
    };

    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce particle count on mobile
  const effectiveCount = isMobile ? Math.floor(count / 3) : count;

  const particles = useMemo(() => {
    return Array.from({ length: effectiveCount }).map((_, i) => {
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
  }, [effectiveCount]);

  // Don't render particles if user prefers reduced motion
  if (prefersReducedMotion) {
    return null;
  }

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
