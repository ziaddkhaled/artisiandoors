"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, STAGGER_NAV_LINKS } from "@/lib/motion";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <motion.ol
        className="flex flex-wrap items-center gap-1 text-[length:var(--text-sm)] text-muted"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: STAGGER_NAV_LINKS },
          },
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <motion.li
              key={item.label}
              className="flex items-center gap-1"
              variants={fadeIn}
            >
              {index > 0 && (
                <ChevronRight
                  className="w-3 h-3 text-accent/50"
                  aria-hidden="true"
                />
              )}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-foreground font-medium" : ""}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors duration-150"
                >
                  {item.label}
                </Link>
              )}
            </motion.li>
          );
        })}
      </motion.ol>
    </nav>
  );
}
