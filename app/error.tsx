"use client";

import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { SecondaryButton } from "@/components/ui/SecondaryButton";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <div className="bg-background min-h-[60vh] flex items-center">
      <Container>
        <div className="flex flex-col items-center text-center gap-4 py-20">
          <div className="w-16 h-16 rounded-[12px] bg-warning-light flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-warning" />
          </div>
          <h1 className="text-[length:var(--text-3xl)] font-medium tracking-tight">
            Something went wrong
          </h1>
          <p className="text-[length:var(--text-base)] text-muted max-w-sm">
            An unexpected error occurred. Please try again.
          </p>
          <div className="flex gap-3">
            <SecondaryButton label="Try Again" onClick={reset} />
            <PrimaryButton label="Return Home" href="/" />
          </div>
        </div>
      </Container>
    </div>
  );
}
