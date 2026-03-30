"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SecondaryButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const sizeStyles = {
  sm: "px-3 py-2 text-[length:var(--text-xs)]",
  md: "px-4 py-[10px] text-[length:var(--text-sm)]",
  lg: "px-6 py-[14px] text-[length:var(--text-base)]",
};

export const SecondaryButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  SecondaryButtonProps
>(function SecondaryButton(
  {
    label,
    href,
    onClick,
    type = "button",
    size = "md",
    disabled = false,
    loading = false,
    fullWidth = false,
    className,
  },
  ref
) {
  const baseClasses = cn(
    "inline-flex items-center justify-center gap-2",
    "bg-secondary-cta text-secondary-cta-text",
    "border border-foreground/15 rounded-[12px]",
    "font-semibold cursor-pointer select-none",
    "transition-all duration-300 ease-out",
    "hover:border-foreground/30 hover:shadow-sm",
    sizeStyles[size],
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  const content = (
    <>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      <span>{label}</span>
    </>
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={baseClasses}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled}
      className={baseClasses}
    >
      {content}
    </button>
  );
});
