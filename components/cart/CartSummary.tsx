"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { formatCurrency } from "@/lib/utils";
import { EASE_SMOOTH, DURATION_SLOW } from "@/lib/motion";

interface CartSummaryProps {
  subtotal: number;
  itemCount: number;
  tax: number;
  total: number;
  ctaLabel?: string;
  ctaAction?: () => void;
  ctaHref?: string;
  isLoading?: boolean;
}

export function CartSummary({
  subtotal,
  itemCount,
  tax,
  total,
  ctaLabel,
  ctaAction,
  ctaHref,
  isLoading = false,
}: CartSummaryProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION_SLOW, ease: EASE_SMOOTH }}
    >
      <GlassCard padding="lg" className="lg:sticky lg:top-28">
        <h2 className="text-[length:var(--text-lg)] font-medium mb-4">
          Order Summary
        </h2>

        <dl className="flex flex-col gap-3">
          <div className="flex justify-between">
            <dt className="text-[length:var(--text-sm)] text-muted">
              Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
            </dt>
            <dd className="text-[length:var(--text-sm)] font-medium">
              {formatCurrency(subtotal)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[length:var(--text-sm)] text-muted">
              Estimated Tax
            </dt>
            <dd className="text-[length:var(--text-sm)] font-medium">
              {formatCurrency(tax)}
            </dd>
          </div>
          <div className="border-t border-foreground/10 pt-3 flex justify-between">
            <dt className="text-[length:var(--text-base)] font-medium">
              Total
            </dt>
            <dd className="text-[length:var(--text-base)] font-semibold">
              {formatCurrency(total)}
            </dd>
          </div>
        </dl>

        {ctaLabel && (ctaAction || ctaHref) && (
          <div className="mt-6">
            <PrimaryButton
              label={ctaLabel}
              onClick={ctaAction}
              href={ctaHref}
              loading={isLoading}
              disabled={isLoading || itemCount === 0}
              fullWidth
              size="lg"
            />
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}
