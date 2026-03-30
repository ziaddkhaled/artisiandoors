"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import type { Product, SelectedOptions } from "@/types";

interface ProductCustomizerProps {
  product: Product;
  selected: SelectedOptions;
  onChange: (options: SelectedOptions) => void;
}

export function ProductCustomizer({
  product,
  selected,
  onChange,
}: ProductCustomizerProps) {
  const prefersReducedMotion = useReducedMotion();

  const optionGroups: Array<{
    key: keyof SelectedOptions;
    group: typeof product.materials;
  }> = [
    { key: "material", group: product.materials },
    { key: "finish", group: product.finishes },
    { key: "size", group: product.sizes },
    { key: "hardware", group: product.hardware },
  ];

  return (
    <div className="flex flex-col gap-6">
      {optionGroups.map(({ key, group }) => (
        <fieldset key={key} className="flex flex-col gap-2">
          <legend className="text-[length:var(--text-sm)] font-medium text-foreground mb-1">
            {group.label}
          </legend>
          <div className="flex flex-wrap gap-2" role="radiogroup">
            {group.options.map((option) => {
              const isSelected = selected[key] === option.id;

              return (
                <motion.label
                  key={option.id}
                  className={cn(
                    "relative flex items-center gap-1.5 px-3 py-2 rounded-[12px] cursor-pointer",
                    "border text-[length:var(--text-sm)] transition-colors duration-200",
                    isSelected
                      ? "border-foreground bg-foreground text-primary-cta-text"
                      : "border-foreground/15 bg-transparent text-foreground hover:border-foreground/30"
                  )}
                  whileHover={
                    prefersReducedMotion || isSelected
                      ? undefined
                      : { scale: 1.03 }
                  }
                  whileTap={
                    prefersReducedMotion ? undefined : { scale: 0.97 }
                  }
                  layout
                  transition={{ duration: 0.15 }}
                >
                  <input
                    type="radio"
                    name={key}
                    value={option.id}
                    checked={isSelected}
                    onChange={() =>
                      onChange({ ...selected, [key]: option.id })
                    }
                    className="sr-only"
                    aria-checked={isSelected}
                  />
                  <span>{option.label}</span>
                  {option.priceModifier > 0 && (
                    <span className={cn(
                      "text-[length:var(--text-xs)]",
                      isSelected ? "text-primary-cta-text/70" : "text-accent"
                    )}>
                      +{formatCurrency(option.priceModifier)}
                    </span>
                  )}
                </motion.label>
              );
            })}
          </div>
        </fieldset>
      ))}
    </div>
  );
}
