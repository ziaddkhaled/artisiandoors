import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export default function NotFoundPage() {
  return (
    <div className="bg-background min-h-[60vh] flex items-center">
      <Container>
        <div className="flex flex-col items-center text-center gap-4 py-20">
          <span className="text-[length:var(--text-7xl)] font-medium text-foreground/20">
            404
          </span>
          <h1 className="text-[length:var(--text-3xl)] font-medium tracking-tight">
            Page not found
          </h1>
          <p className="text-[length:var(--text-base)] text-muted max-w-sm">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <PrimaryButton label="Return Home" href="/" />
        </div>
      </Container>
    </div>
  );
}
