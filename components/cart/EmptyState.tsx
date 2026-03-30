"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { EASE_SMOOTH, DURATION_SLOW } from "@/lib/motion";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  ctaAction?: () => void;
}

const STAGGER = 0.08;

export function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaHref,
  ctaAction,
}: EmptyStateProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : STAGGER,
      },
    },
  };

  const itemVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 16, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: DURATION_SLOW, ease: EASE_SMOOTH },
        },
      };

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center py-16 gap-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div
        className="w-16 h-16 rounded-[12px] bg-foreground/5 flex items-center justify-center"
        variants={itemVariants}
      >
        <Icon className="w-8 h-8 text-muted" aria-hidden="true" />
      </motion.div>
      <motion.h2
        className="text-[length:var(--text-xl)] font-medium text-foreground"
        variants={itemVariants}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-[length:var(--text-base)] text-muted max-w-sm"
        variants={itemVariants}
      >
        {description}
      </motion.p>
      {ctaLabel && (ctaHref || ctaAction) && (
        <motion.div variants={itemVariants}>
          <PrimaryButton
            label={ctaLabel}
            href={ctaHref}
            onClick={ctaAction}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
