"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { QuantityControl } from "./QuantityControl";
import { formatCurrency, BLUR_DATA_URL } from "@/lib/utils";
import { EASE_SMOOTH } from "@/lib/motion";
import type { CartItem as CartItemType } from "@/types";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const prefersReducedMotion = useReducedMotion();

  const exitAnimation = prefersReducedMotion
    ? { opacity: 0, transition: { duration: 0.15 } }
    : { opacity: 0, x: -60, transition: { duration: 0.3, ease: EASE_SMOOTH } };

  const initialAnimation = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, x: 0 };

  const enterAnimation = { opacity: 1, x: 0 };

  return (
    <motion.div
      layout
      initial={initialAnimation}
      animate={enterAnimation}
      exit={exitAnimation}
      transition={{ duration: 0.3, ease: EASE_SMOOTH }}
      className="card p-4"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product image */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[8px] overflow-hidden flex-shrink-0">
          <Image
            src={item.productImage}
            alt={item.productName}
            fill
            className="object-cover"
            sizes="96px"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col gap-1">
          <h3 className="text-[length:var(--text-base)] font-medium text-foreground">
            {item.productName}
          </h3>
          <div className="flex flex-wrap gap-x-3 gap-y-0.5">
            {Object.entries(item.selectedOptionsLabels).map(
              ([key, value]) => (
                <span
                  key={key}
                  className="text-[length:var(--text-xs)] text-muted"
                >
                  {key}: {value}
                </span>
              )
            )}
          </div>
          <p className="text-[length:var(--text-sm)] text-foreground mt-1">
            {formatCurrency(item.unitPrice)}
          </p>
        </div>

        {/* Quantity + actions */}
        <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:justify-between">
          <QuantityControl
            value={item.quantity}
            onChange={(qty) => onUpdateQuantity(item.id, qty)}
          />
          <div className="flex items-center gap-3">
            <span className="text-[length:var(--text-base)] font-medium">
              {formatCurrency(item.unitPrice * item.quantity)}
            </span>
            <motion.button
              onClick={() => onRemove(item.id)}
              aria-label={`Remove ${item.productName} from cart`}
              className="p-2.5 rounded-[8px] text-muted hover:text-error hover:bg-error-light transition-colors duration-150"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.9 }}
              transition={{ duration: 0.1 }}
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
