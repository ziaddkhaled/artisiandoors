"use client";

import { CreditCard } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

export function PaymentPlaceholder() {
  return (
    <GlassCard padding="lg" className="text-center" role="status">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-[12px] bg-foreground/5 flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-muted" />
        </div>
        <h3 className="text-[length:var(--text-base)] font-medium">
          Payment Integration Coming Soon
        </h3>
        <p className="text-[length:var(--text-sm)] text-muted max-w-sm">
          This is a demo checkout. No real payment will be processed.
        </p>
      </div>
    </GlassCard>
  );
}
