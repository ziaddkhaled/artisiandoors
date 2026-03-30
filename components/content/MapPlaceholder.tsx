"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { EASE_SMOOTH, DURATION_SLOW } from "@/lib/motion";

interface MapPlaceholderProps {
  address: string;
}

export function MapPlaceholder({ address }: MapPlaceholderProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: DURATION_SLOW, ease: EASE_SMOOTH }}
    >
      <GlassCard
        padding="none"
        className="aspect-video md:aspect-[16/9] flex items-center justify-center bg-background-accent"
        aria-label="Map showing business location"
      >
        <div className="flex flex-col items-center gap-3 text-center p-6">
          <div className="w-12 h-12 rounded-full bg-foreground/5 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-muted" />
          </div>
          <p className="text-[length:var(--text-sm)] text-muted max-w-xs">
            {address}
          </p>
        </div>
      </GlassCard>
    </motion.div>
  );
}
