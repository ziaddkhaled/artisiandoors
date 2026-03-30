"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/content/Badge";
import { EASE_SMOOTH, DURATION_NORMAL, DURATION_SLOW } from "@/lib/motion";
import { formatCurrency, BLUR_DATA_URL } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  index?: number;
}

export function ProductCard({
  product,
  priority = false,
  index = 0,
}: ProductCardProps) {
  const prefersReducedMotion = useReducedMotion();

  // Entrance: fade up with staggered delay
  const entranceVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: DURATION_SLOW,
            ease: EASE_SMOOTH,
            delay: index * 0.08,
          },
        },
      };

  // Hover: lift + shadow. Disabled for reduced motion.
  const hoverProps = prefersReducedMotion
    ? {}
    : {
        whileHover: {
          y: -4,
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          transition: { duration: DURATION_NORMAL, ease: EASE_SMOOTH },
        },
        whileTap: {
          scale: 0.99,
          transition: { duration: 0.1 },
        },
      };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={entranceVariants}
    >
      <Link
        href={`/shop/${product.slug}`}
        className="group block"
      >
        <motion.article
          className="card overflow-hidden"
          {...hoverProps}
        >
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-[11px]">
            <Image
              src={product.images[0].src}
              alt={product.images[0].alt}
              fill
              className={`object-cover ${prefersReducedMotion ? "" : "transition-transform duration-500 ease-out group-hover:scale-[1.05]"}`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              priority={priority}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge
                label={product.collection.charAt(0).toUpperCase() + product.collection.slice(1)}
                variant="solid"
                size="sm"
              />
              {product.isNew && (
                <Badge label="New" variant="outline" size="sm" />
              )}
            </div>
            <h3 className="text-[length:var(--text-base)] font-medium text-foreground">
              {product.name}
            </h3>
            <p className="text-[length:var(--text-sm)] text-muted line-clamp-2">
              {product.shortDescription}
            </p>
            <p className="text-[length:var(--text-lg)] font-medium text-foreground mt-1">
              {formatCurrency(product.basePrice)}
            </p>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
