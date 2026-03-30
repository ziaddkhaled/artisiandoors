"use client";

import Marquee from "react-fast-marquee";
import { useReducedMotion } from "framer-motion";
import { Badge } from "./Badge";

interface MarqueeTickerProps {
  items: readonly string[] | string[];
}

export function MarqueeTicker({ items }: MarqueeTickerProps) {
  const prefersReducedMotion = useReducedMotion();

  // ~52s for a full loop at our content length.
  // react-fast-marquee speed is in px/s; ~80px/s gives roughly 52s per pass.
  // When reduced motion is preferred, render as a static row of items.
  if (prefersReducedMotion) {
    return (
      <div
        className="w-full overflow-hidden flex items-center gap-[10px] px-2 flex-wrap justify-center"
        aria-hidden="true"
      >
        {items.map((item, i) => (
          <div key={`${item}-${i}`} className="mx-[5px]">
            <Badge label={item} variant="glass" size="sm" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full" aria-hidden="true">
      <Marquee
        speed={80}
        gradient={false}
        pauseOnHover={false}
        autoFill
      >
        {items.map((item, i) => (
          <div key={`${item}-${i}`} className="mx-[5px]">
            <Badge label={item} variant="glass" size="sm" />
          </div>
        ))}
      </Marquee>
    </div>
  );
}
