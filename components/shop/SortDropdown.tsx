"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ArrowUpDown } from "lucide-react";
import type { SortOption } from "@/types";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "popular", label: "Most Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const currentLabel =
    sortOptions.find((opt) => opt.value === value)?.label ?? "Sort";

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-[12px] text-[length:var(--text-sm)] border border-foreground/15 hover:border-foreground/30 hover:bg-foreground/5 transition-colors duration-150"
          aria-haspopup="true"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          {currentLabel}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[200px] card p-1.5 shadow-md z-50"
          sideOffset={4}
          align="end"
        >
          {sortOptions.map((opt) => (
            <DropdownMenu.Item
              key={opt.value}
              className="flex items-center px-3 py-2 text-[length:var(--text-sm)] rounded-[8px] cursor-pointer outline-none hover:bg-foreground/5 focus:bg-foreground/5 transition-colors"
              onSelect={() => onChange(opt.value)}
            >
              {opt.label}
              {value === opt.value && (
                <span className="ml-auto text-accent">&#10003;</span>
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
