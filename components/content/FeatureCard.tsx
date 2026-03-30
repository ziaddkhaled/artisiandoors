"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { BlurText } from "./BlurText";
import { EASE_SMOOTH, DURATION_SLOW } from "@/lib/motion";
import { BLUR_DATA_URL } from "@/lib/utils";

interface FeatureCardProps {
  number: number;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  stickyOffset: number;
}

export function FeatureCard({
  number,
  title,
  description,
  imageSrc,
  imageAlt,
  stickyOffset,
}: FeatureCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="lg:sticky w-full"
      style={{ top: `${stickyOffset}px` }}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: DURATION_SLOW, ease: EASE_SMOOTH }}
    >
      <GlassCard
        padding="lg"
        className="w-full min-h-[50vh] lg:min-h-[75vh] overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 h-full">
          {/* Text side */}
          <div className="flex flex-col justify-center gap-4">
            <motion.div
              className="flex items-center justify-center w-8 h-8 rounded-[12px] btn-primary text-primary-cta-text text-[length:var(--text-sm)] font-semibold"
              aria-hidden="true"
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.4,
                ease: EASE_SMOOTH,
                type: prefersReducedMotion ? "tween" : "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {number}
            </motion.div>
            <h3 className="text-[length:var(--text-2xl)] font-medium tracking-tight">
              {title}
            </h3>
            <BlurText
              text={description}
              variant="word"
              as="p"
              className="text-[length:var(--text-base)] text-muted leading-relaxed"
            />
          </div>

          {/* Image side */}
          <div className="relative rounded-[12px] overflow-hidden min-h-[250px] lg:min-h-0">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
