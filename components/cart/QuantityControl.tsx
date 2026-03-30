"use client";

import { Minus, Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuantityControlProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export function QuantityControl({
  value,
  min = 1,
  max = 99,
  onChange,
}: QuantityControlProps) {
  const isMin = value <= min;
  const isMax = value >= max;
  const prefersReducedMotion = useReducedMotion();

  const tapProps = prefersReducedMotion
    ? {}
    : { whileTap: { scale: 0.88 }, transition: { duration: 0.08 } };

  return (
    <div className="flex items-center gap-0 border border-foreground/15 rounded-[12px] overflow-hidden">
      <motion.button
        onClick={() => onChange(value - 1)}
        disabled={isMin}
        aria-label="Decrease quantity"
        className={cn(
          "flex items-center justify-center w-8 h-8 transition-colors duration-150",
          isMin
            ? "text-accent/40 cursor-not-allowed"
            : "text-foreground hover:bg-foreground/5"
        )}
        {...(!isMin ? tapProps : {})}
      >
        <Minus className="w-3.5 h-3.5" />
      </motion.button>
      <motion.span
        key={value}
        className="flex items-center justify-center w-8 h-8 text-[length:var(--text-sm)] font-medium"
        aria-live="polite"
        initial={prefersReducedMotion ? {} : { opacity: 0.6, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.15 }}
      >
        {value}
      </motion.span>
      <motion.button
        onClick={() => onChange(value + 1)}
        disabled={isMax}
        aria-label="Increase quantity"
        className={cn(
          "flex items-center justify-center w-8 h-8 transition-colors duration-150",
          isMax
            ? "text-accent/40 cursor-not-allowed"
            : "text-foreground hover:bg-foreground/5"
        )}
        {...(!isMax ? tapProps : {})}
      >
        <Plus className="w-3.5 h-3.5" />
      </motion.button>
    </div>
  );
}
