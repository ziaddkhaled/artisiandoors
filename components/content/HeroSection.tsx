"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BlurText } from "./BlurText";
import { AvatarGroup } from "./AvatarGroup";
import { MarqueeTicker } from "./MarqueeTicker";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Container } from "@/components/layout/Container";
import { EASE_SMOOTH, DURATION_SLOW } from "@/lib/motion";
import { BLUR_DATA_URL } from "@/lib/utils";
import { marqueeItems } from "@/data/site";

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  // CTA button appears after the heading blur animation completes
  // "Entrance to Elegance" = 19 chars, at 0.02s stagger + 0.7s duration = ~1.1s total
  const ctaDelay = prefersReducedMotion ? 0 : 0.8;
  // Avatar group appears slightly after the CTA
  const avatarDelay = prefersReducedMotion ? 0 : 1.0;
  // Hero image on the right fades in alongside heading
  const imageDelay = prefersReducedMotion ? 0 : 0.2;

  return (
    <section className="relative min-h-svh flex flex-col bg-background">
      <Container className="flex-1 flex items-center py-24 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full">
          {/* Left column: Text content */}
          <div className="flex flex-col justify-center gap-6 lg:gap-8">
            <BlurText
              text="Entrance to Elegance"
              variant="char"
              as="h1"
              className="text-[length:var(--text-7xl)] font-medium tracking-tight leading-[1.1]"
              scrub
            />
            <BlurText
              text="Crafting bespoke door designs tailored to your home's unique character. Excellence in every entry."
              variant="word"
              as="p"
              className="text-[length:var(--text-lg)] text-muted leading-relaxed max-w-lg"
            />
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION_SLOW,
                ease: EASE_SMOOTH,
                delay: ctaDelay,
              }}
            >
              <PrimaryButton label="View Our Collection" href="/shop" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: DURATION_SLOW,
                ease: EASE_SMOOTH,
                delay: avatarDelay,
              }}
            >
              <AvatarGroup
                avatars={[
                  {
                    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=48&q=80",
                    alt: "Homeowner",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&q=80",
                    alt: "Homeowner",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&q=80",
                    alt: "Homeowner",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=48&q=80",
                    alt: "Homeowner",
                  },
                  {
                    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&q=80",
                    alt: "Homeowner",
                  },
                ]}
                text="Trusted by 2000+ homeowners"
              />
            </motion.div>
          </div>

          {/* Right column: Hero image in GlassCard */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE_SMOOTH, delay: imageDelay }}
          >
            <GlassCard
              padding="md"
              className="w-full max-h-[75svh] overflow-hidden"
            >
              <div className="relative aspect-[3/4] w-full rounded-[12px] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80"
                  alt="Luxury bespoke entrance door with elegant architectural details"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </Container>

      {/* Bottom marquee ticker */}
      <div className="absolute bottom-6 left-0 right-0">
        <MarqueeTicker items={[...marqueeItems]} />
      </div>
    </section>
  );
}
