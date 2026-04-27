import { useMemo } from "react";

/** Decorative rising bubbles layer for the underwater background. */
export function Bubbles({ count = 24 }: { count?: number }) {
  const bubbles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const size = 6 + Math.random() * 28;
        return {
          id: i,
          size,
          left: Math.random() * 100,
          duration: 8 + Math.random() * 14,
          delay: Math.random() * 12,
        };
      }),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bubbles.map((b) => (
        <span
          key={b.id}
          className="bubble"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            left: `${b.left}%`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
