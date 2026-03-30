"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav aria-label="Pagination" className="flex justify-center mt-8">
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          aria-disabled={currentPage <= 1}
          className={cn(
            "px-3 py-2 rounded-[12px] text-[length:var(--text-sm)]",
            "border border-foreground/15 transition-colors duration-150",
            currentPage <= 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-foreground/5"
          )}
        >
          Prev
        </button>

        {/* Page numbers */}
        {pages.map((page, i) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${i}`}
                className="px-2 py-2 text-[length:var(--text-sm)] text-muted"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrent = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              aria-current={isCurrent ? "page" : undefined}
              className={cn(
                "w-9 h-9 flex items-center justify-center rounded-[12px] text-[length:var(--text-sm)] transition-colors duration-150",
                isCurrent
                  ? "bg-foreground text-primary-cta-text"
                  : "hover:bg-foreground/5 border border-foreground/15"
              )}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-disabled={currentPage >= totalPages}
          className={cn(
            "px-3 py-2 rounded-[12px] text-[length:var(--text-sm)]",
            "border border-foreground/15 transition-colors duration-150",
            currentPage >= totalPages
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-foreground/5"
          )}
        >
          Next
        </button>
      </div>
    </nav>
  );
}

function getVisiblePages(
  current: number,
  total: number
): Array<number | "..."> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: Array<number | "..."> = [];

  pages.push(1);

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("...");

  pages.push(total);

  return pages;
}
