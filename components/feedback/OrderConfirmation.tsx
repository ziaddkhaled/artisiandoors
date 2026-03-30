"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { formatCurrency } from "@/lib/utils";
import {
  SPRING_SETTLE,
  EASE_SMOOTH,
  DURATION_SLOW,
  STAGGER_FORM_FIELDS,
  fadeInUp,
} from "@/lib/motion";
import type { Order } from "@/types";

interface OrderConfirmationProps {
  order: Order;
}

export function OrderConfirmation({ order }: OrderConfirmationProps) {
  const prefersReducedMotion = useReducedMotion();

  const successIconProps = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
      }
    : {
        initial: { opacity: 0, scale: 0 },
        animate: { opacity: 1, scale: 1 },
        transition: {
          type: "spring" as const,
          ...SPRING_SETTLE,
          delay: 0.1,
        },
      };

  const containerVariants = prefersReducedMotion
    ? {
        hidden: {},
        visible: { transition: { staggerChildren: 0 } },
      }
    : {
        hidden: {},
        visible: { transition: { staggerChildren: STAGGER_FORM_FIELDS } },
      };

  const itemVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : fadeInUp;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success icon with subtle ring pulse */}
      <motion.div
        className="flex justify-center mb-6"
        {...successIconProps}
      >
        <div className="relative">
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 rounded-full bg-success-light"
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.3,
              }}
            />
          )}
          <div className="w-20 h-20 rounded-full bg-success-light flex items-center justify-center relative z-10">
            <CheckCircle className="w-10 h-10 text-success" />
          </div>
        </div>
      </motion.div>

      {/* Status message */}
      <motion.div
        className="text-center mb-8"
        role="status"
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION_SLOW, ease: EASE_SMOOTH, delay: prefersReducedMotion ? 0 : 0.3 }}
      >
        <h1 className="text-[length:var(--text-3xl)] font-medium mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-[length:var(--text-base)] text-muted">
          Order number:{" "}
          <strong className="text-foreground">{order.id}</strong>
        </p>
      </motion.div>

      {/* Order details */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <GlassCard padding="lg" className="mb-4">
            <h2 className="text-[length:var(--text-lg)] font-medium mb-4">
              Order Summary
            </h2>
            <div className="flex flex-col gap-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-[length:var(--text-sm)]"
                >
                  <span>
                    {item.productName}{" "}
                    <span className="text-accent">x{item.quantity}</span>
                  </span>
                  <span className="font-medium">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="border-t border-foreground/10 pt-3 flex flex-col gap-1">
                <div className="flex justify-between text-[length:var(--text-sm)]">
                  <span className="text-muted">Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[length:var(--text-sm)]">
                  <span className="text-muted">Tax</span>
                  <span>{formatCurrency(order.tax)}</span>
                </div>
                <div className="flex justify-between text-[length:var(--text-base)] font-semibold pt-1">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlassCard padding="lg" className="mb-6">
            <h2 className="text-[length:var(--text-lg)] font-medium mb-3">
              Shipping To
            </h2>
            <div className="text-[length:var(--text-sm)] text-muted space-y-1">
              <p className="text-foreground font-medium">
                {order.shipping.firstName} {order.shipping.lastName}
              </p>
              <p>{order.shipping.address}</p>
              <p>
                {order.shipping.city}, {order.shipping.state}{" "}
                {order.shipping.zip}
              </p>
              <p>{order.shipping.country}</p>
              <p>{order.shipping.email}</p>
            </div>
          </GlassCard>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          variants={itemVariants}
        >
          <PrimaryButton label="Continue Shopping" href="/shop" />
          <SecondaryButton label="Return Home" href="/" />
        </motion.div>
      </motion.div>
    </div>
  );
}
