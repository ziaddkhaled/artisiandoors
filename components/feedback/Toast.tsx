"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastProps {
  message: string;
  variant: "success" | "error" | "info";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const variantConfig = {
  success: {
    icon: CheckCircle,
    borderColor: "border-l-success",
    bgColor: "bg-success-light",
    iconColor: "text-success",
    role: "status" as const,
  },
  error: {
    icon: AlertCircle,
    borderColor: "border-l-error",
    bgColor: "bg-error-light",
    iconColor: "text-error",
    role: "alert" as const,
  },
  info: {
    icon: Info,
    borderColor: "border-l-info",
    bgColor: "bg-info-light",
    iconColor: "text-info",
    role: "status" as const,
  },
};

// Spring config for the snappy slide-in feel
const TOAST_SPRING = { stiffness: 400, damping: 28, mass: 0.8 };

export function Toast({
  message,
  variant,
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const motionProps = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, x: 80, scale: 0.95 },
        animate: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, x: 80, scale: 0.95 },
        transition: { type: "spring" as const, ...TOAST_SPRING },
      };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-[var(--z-toast)] max-w-sm"
          {...motionProps}
          role={config.role}
          aria-live={config.role === "alert" ? undefined : "polite"}
        >
          <div
            className={cn(
              "card flex items-start gap-3 p-3 border-l-4 shadow-lg",
              config.borderColor
            )}
          >
            <Icon className={cn("w-5 h-5 flex-shrink-0 mt-0.5", config.iconColor)} />
            <p className="text-[length:var(--text-sm)] text-foreground flex-1">
              {message}
            </p>
            <motion.button
              onClick={onClose}
              className="text-muted hover:text-foreground transition-colors flex-shrink-0"
              aria-label="Dismiss notification"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
              transition={{ duration: 0.1 }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
