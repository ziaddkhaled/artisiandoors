import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  variant?: "glass" | "solid" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  label,
  variant = "glass",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[12px] font-normal tracking-wide",
        size === "sm" && "px-2 py-[2px] text-[length:var(--text-sm)]",
        size === "md" && "px-3 py-1 text-[length:var(--text-sm)]",
        variant === "glass" &&
          "card backdrop-blur-[8px] border border-white text-foreground",
        variant === "solid" &&
          "bg-foreground/10 text-foreground",
        variant === "outline" &&
          "border border-foreground/15 text-foreground bg-transparent",
        className
      )}
    >
      {label}
    </span>
  );
}
