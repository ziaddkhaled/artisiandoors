"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "./Container";
import { Breadcrumbs } from "./Breadcrumbs";
import { BlurText } from "@/components/content/BlurText";
import { EASE_SMOOTH, DURATION_SLOW } from "@/lib/motion";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: Array<{ label: string; href?: string }>;
}

export function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="bg-background pt-32 pb-8 lg:pt-36 lg:pb-12">
      <Container>
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-4">
          <BlurText
            text={title}
            variant="word"
            as="h1"
            className="text-[length:var(--text-5xl)] font-medium tracking-tight"
          />
          {subtitle && (
            <motion.p
              className="mt-3 text-[length:var(--text-lg)] text-muted max-w-2xl"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION_SLOW,
                ease: EASE_SMOOTH,
                delay: prefersReducedMotion ? 0 : 0.3,
              }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </Container>
    </div>
  );
}
