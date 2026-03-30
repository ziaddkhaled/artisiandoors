"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
  variant?: "default" | "mobile";
  onClick?: () => void;
}

export function NavLink({
  href,
  label,
  variant = "default",
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative transition-colors duration-150",
        variant === "default" &&
          "text-[length:var(--text-sm)] font-normal text-foreground hover:text-foreground/80",
        variant === "mobile" &&
          "text-[length:var(--text-2xl)] font-medium text-foreground",
        // Underline animation for desktop variant
        variant === "default" &&
          "after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:bg-current after:transition-[width] after:duration-300 after:ease-out",
        variant === "default" && isActive
          ? "after:w-full"
          : variant === "default"
            ? "after:w-0 hover:after:w-full"
            : ""
      )}
    >
      {label}
    </Link>
  );
}
