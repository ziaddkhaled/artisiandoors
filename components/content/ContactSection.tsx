"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/layout/Section";
import { Badge } from "./Badge";
import { BlurText } from "./BlurText";
import { EmailForm } from "@/components/forms/EmailForm";
import { EASE_SMOOTH, DURATION_SLOW } from "@/lib/motion";
import { BLUR_DATA_URL } from "@/lib/utils";

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section variant="light" id="contact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[400px] lg:min-h-[520px]">
        {/* Left column: Form */}
        <div className="card flex flex-col items-center justify-center text-center gap-5 p-8 lg:p-12">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: DURATION_SLOW, ease: EASE_SMOOTH }}
          >
            <Badge label="Get in touch" variant="glass" />
          </motion.div>

          <BlurText
            text="Start Your Design"
            variant="word"
            as="h2"
            className="text-[length:var(--text-3xl)] font-medium tracking-tight"
          />

          <BlurText
            text="Consult with our designers and bring your vision to life today."
            variant="word"
            as="p"
            className="text-[length:var(--text-base)] text-muted"
          />

          <motion.div
            className="w-full max-w-sm"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION_SLOW, ease: EASE_SMOOTH, delay: prefersReducedMotion ? 0 : 0.35 }}
          >
            <EmailForm onSubmit={() => {}} />
          </motion.div>

          <motion.p
            className="text-[length:var(--text-xs)] text-muted max-w-xs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION_SLOW, ease: EASE_SMOOTH, delay: prefersReducedMotion ? 0 : 0.5 }}
          >
            By clicking Sign Up you&apos;re confirming that you agree with our
            Terms and Conditions.
          </motion.p>
        </div>

        {/* Right column: Image */}
        <motion.div
          className="relative rounded-[12px] overflow-hidden min-h-[300px]"
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE_SMOOTH, delay: prefersReducedMotion ? 0 : 0.15 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
            alt="Elegant doorway with warm lighting"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </motion.div>
      </div>
    </Section>
  );
}
