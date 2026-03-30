"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { formatCurrency } from "@/lib/utils";
import { EASE_SMOOTH } from "@/lib/motion";

interface PriceDisplayProps {
  basePrice: number;
  modifiers: Array<{ label: string; amount: number }>;
  currency?: string;
}

export function PriceDisplay({
  basePrice,
  modifiers,
}: PriceDisplayProps) {
  const totalModifiers = modifiers.reduce((sum, mod) => sum + mod.amount, 0);
  const totalPrice = basePrice + totalModifiers;
  const prefersReducedMotion = useReducedMotion();

  const priceTransition = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.1 },
      }
    : {
        initial: { opacity: 0, y: -6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 6 },
        transition: { duration: 0.22, ease: EASE_SMOOTH },
      };

  return (
    <div className="flex flex-col gap-1" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={totalPrice}
          className="text-[length:var(--text-3xl)] font-medium text-foreground"
          {...priceTransition}
        >
          {formatCurrency(totalPrice)}
        </motion.span>
      </AnimatePresence>

      {totalModifiers > 0 && (
        <div className="flex flex-wrap gap-2">
          {modifiers
            .filter((m) => m.amount > 0)
            .map((mod) => (
              <span
                key={mod.label}
                className="text-[length:var(--text-xs)] text-muted"
              >
                {mod.label}: +{formatCurrency(mod.amount)}
              </span>
            ))}
        </div>
      )}
    </div>
  );
}
