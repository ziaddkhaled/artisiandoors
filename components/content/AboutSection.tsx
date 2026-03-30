"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Badge } from "./Badge";
import { BlurText } from "./BlurText";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { EASE_SMOOTH, DURATION_SLOW } from "@/lib/motion";

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  const badgeTransition = prefersReducedMotion
    ? { duration: 0.3 }
    : { duration: DURATION_SLOW, ease: EASE_SMOOTH };

  const ctaTransition = prefersReducedMotion
    ? { duration: 0.3 }
    : { duration: DURATION_SLOW, ease: EASE_SMOOTH, delay: 0.35 };

  return (
    <Section variant="dark" id="about">
      <div className="flex flex-col items-center text-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={badgeTransition}
        >
          <Badge label="Our Philosophy" variant="glass" />
        </motion.div>

        <BlurText
          text="The Art of Entry"
          variant="word"
          as="h2"
          className="text-[length:var(--text-4xl)] font-medium tracking-tight text-dark-text"
        />

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={ctaTransition}
        >
          <PrimaryButton label="Read Our Story" href="/about" />
        </motion.div>
      </div>
    </Section>
  );
}
