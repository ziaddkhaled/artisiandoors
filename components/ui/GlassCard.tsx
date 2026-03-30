"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  as?: "div" | "article" | "aside";
}

const paddingMap = {
  none: "",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  function GlassCard(
    { children, className, padding = "md", hover = false, as = "div", ...props },
    ref
  ) {
    const Component = motion[as] as typeof motion.div;

    return (
      <Component
        ref={ref}
        className={cn(
          "card",
          paddingMap[padding],
          hover &&
            "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-sm",
          className
        )}
        {...(hover
          ? {
              whileHover: { y: -4, boxShadow: "0 2px 4px rgba(0,0,0,0.08)" },
              transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
            }
          : {})}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
