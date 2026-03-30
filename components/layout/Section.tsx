import { cn } from "@/lib/utils";
import { Container } from "./Container";

interface SectionProps {
  children: React.ReactNode;
  variant?: "light" | "dark";
  className?: string;
  id?: string;
  containerClassName?: string;
  fullWidth?: boolean;
}

export function Section({
  children,
  variant = "light",
  className,
  id,
  containerClassName,
  fullWidth = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 lg:py-20",
        variant === "light" && "bg-background text-foreground",
        variant === "dark" && "bg-dark-bg text-dark-text",
        className
      )}
    >
      {fullWidth ? (
        children
      ) : (
        <Container className={containerClassName}>{children}</Container>
      )}
    </section>
  );
}
