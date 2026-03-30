"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { BLUR_DATA_URL } from "@/lib/utils";
import { EASE_SMOOTH, DURATION_NORMAL } from "@/lib/motion";
import type { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const imageTransition = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : {
        initial: { opacity: 0, scale: 1.03 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.97 },
        transition: { duration: DURATION_NORMAL, ease: EASE_SMOOTH },
      };

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="card p-3 overflow-hidden">
        <div className="relative aspect-[3/4] rounded-[12px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="absolute inset-0"
              {...imageTransition}
            >
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            aria-label={`View image ${index + 1}`}
            className={cn(
              "relative flex-shrink-0 w-16 h-16 lg:w-20 lg:h-20 rounded-[8px] overflow-hidden",
              "border-2 transition-all duration-200",
              index === activeIndex
                ? "border-foreground opacity-100"
                : "border-transparent opacity-60 hover:opacity-90"
            )}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.15 }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="80px"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
