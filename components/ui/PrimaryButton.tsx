"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: "px-3 py-2 text-[length:var(--text-xs)]",
  md: "px-4 py-[10px] text-[length:var(--text-sm)]",
  lg: "px-6 py-[14px] text-[length:var(--text-base)]",
};

// 900ms signature easing: cubic-bezier(0.77, 0, 0.18, 1)
const BUTTON_EASE = "cubic-bezier(0.77,0,0.18,1)";
const BUTTON_DURATION = "900ms";

export const PrimaryButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  PrimaryButtonProps
>(function PrimaryButton(
  {
    label,
    href,
    onClick,
    type = "button",
    size = "md",
    disabled = false,
    loading = false,
    fullWidth = false,
    icon = true,
    className,
  },
  ref
) {
  const prefersReducedMotion = useReducedMotion();

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden",
    "btn-primary font-semibold cursor-pointer select-none",
    sizeStyles[size],
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  // When reduced motion is preferred, use a simple opacity transition on the overlay
  // instead of the translate-x expansion. Text color still transitions.
  const overlayClass = cn(
    "absolute inset-0 z-0 bg-background",
    prefersReducedMotion
      ? "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      : "translate-x-full group-hover:translate-x-0"
  );

  const overlayStyle = prefersReducedMotion
    ? {}
    : {
        transitionProperty: "transform",
        transitionDuration: BUTTON_DURATION,
        transitionTimingFunction: BUTTON_EASE,
      };

  const content = (
    <>
      <span
        className="relative z-10"
        style={{
          transitionProperty: "color",
          transitionDuration: prefersReducedMotion ? "150ms" : BUTTON_DURATION,
          transitionTimingFunction: prefersReducedMotion ? "ease" : BUTTON_EASE,
          color: "inherit",
        }}
      >
        <span className="transition-[color] duration-[900ms] ease-[cubic-bezier(0.77,0,0.18,1)] group-hover:text-secondary-cta-text">
          {label}
        </span>
      </span>
      {icon && (
        <span className="relative z-10 flex items-center justify-center w-5 h-5">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-primary-cta-text" />
          ) : (
            <ArrowUpRight
              className="w-4 h-4 transition-colors duration-[900ms] ease-[cubic-bezier(0.77,0,0.18,1)] text-primary-cta-text group-hover:text-secondary-cta-text"
            />
          )}
        </span>
      )}
      {/* Hover overlay — expands from right to left on hover */}
      <span
        className={overlayClass}
        style={overlayStyle}
        aria-hidden="true"
      />
    </>
  );

  // Tap feedback (works for both reduced and full motion — tap is instant enough)
  const tapScale = prefersReducedMotion ? 1 : 0.98;
  const motionProps = {
    whileTap: { scale: tapScale },
    transition: { duration: 0.1 },
  };

  if (href && !disabled) {
    return (
      <motion.div {...motionProps} className={fullWidth ? "w-full" : "inline-block"}>
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={baseClasses}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled}
      className={baseClasses}
      whileTap={tapScale !== 1 ? { scale: tapScale } : undefined}
      transition={{ duration: 0.1 }}
    >
      {content}
    </motion.button>
  );
});
