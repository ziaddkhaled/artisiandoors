"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_SMOOTH, DURATION_SLOW, STAGGER_CARDS } from "@/lib/motion";

interface MetricCardProps {
  value: string;
  label: string;
  index?: number;
}

// Parse the numeric part and suffix from a value string like "15+", "2000+", "98%"
function parseMetricValue(value: string): { numeric: number; suffix: string } {
  const match = value.match(/^([\d,]+)([^0-9]*)$/);
  if (!match) return { numeric: 0, suffix: value };
  const numeric = parseInt(match[1].replace(/,/g, ""), 10);
  const suffix = match[2] ?? "";
  return { numeric, suffix };
}

// Format a number to match the display style (add commas if original had them)
function formatDisplay(value: number, originalHadComma: boolean): string {
  if (originalHadComma) {
    return value.toLocaleString();
  }
  return String(value);
}

interface CountUpProps {
  value: string;
  isInView: boolean;
  duration?: number;
}

function CountUp({ value, isInView, duration = 1.5 }: CountUpProps) {
  const { numeric, suffix } = parseMetricValue(value);
  const originalHadComma = value.includes(",");
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - start) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numeric);
      setDisplayed(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, numeric, duration]);

  return (
    <span>
      {formatDisplay(displayed, originalHadComma)}
      {suffix}
    </span>
  );
}

export function MetricCard({ value, label, index = 0 }: MetricCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className="card flex flex-col justify-between p-4 min-h-[200px] md:min-h-[280px]"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: DURATION_SLOW,
        ease: EASE_SMOOTH,
        delay: prefersReducedMotion ? 0 : index * STAGGER_CARDS,
      }}
    >
      <dd className="text-[length:var(--text-9xl)] font-medium text-foreground leading-none">
        {prefersReducedMotion ? (
          value
        ) : (
          <CountUp value={value} isInView={isInView} duration={1.5} />
        )}
      </dd>
      <dt className="text-[length:var(--text-sm)] text-muted mt-auto">
        {label}
      </dt>
    </motion.div>
  );
}
