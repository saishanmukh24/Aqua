import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** rotateX in deg from which the element animates in */
  rotateX?: number;
};

/**
 * Reveals children with a 3D tilt + fade as they enter the viewport.
 * Pure IntersectionObserver, no library.
 */
export function Reveal3D({ children, className = "", delay = 0, rotateX = 18 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-revealed");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-3d ${className}`}
      style={
        {
          transitionDelay: `${delay}ms`,
          "--reveal-rx": `${rotateX}deg`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}
