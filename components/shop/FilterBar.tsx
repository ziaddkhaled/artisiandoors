"use client";

import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { X } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { collections } from "@/data/collections";
import { getAllMaterialOptions } from "@/lib/products";
import type { FilterState } from "@/types";

interface FilterBarProps {
  activeFilters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearAll: () => void;
}

const chipSpringVariants: Variants = {
  initial: { opacity: 0, scale: 0.85 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    transition: { duration: 0.12 },
  },
};

const chipFadeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export function FilterBar({
  activeFilters,
  onFilterChange,
  onClearAll,
}: FilterBarProps) {
  const materials = getAllMaterialOptions();
  const hasActiveFilters =
    activeFilters.collection || activeFilters.material;
  const prefersReducedMotion = useReducedMotion();

  const chipVariants = prefersReducedMotion ? chipFadeVariants : chipSpringVariants;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {/* Collection filter */}
        <FilterDropdown
          label="Collection"
          value={
            activeFilters.collection
              ? collections.find((c) => c.slug === activeFilters.collection)
                  ?.name ?? null
              : null
          }
          options={collections.map((c) => ({
            id: c.slug,
            label: c.name,
          }))}
          onSelect={(id) =>
            onFilterChange({ ...activeFilters, collection: id })
          }
          onClear={() =>
            onFilterChange({ ...activeFilters, collection: null })
          }
        />

        {/* Material filter */}
        <FilterDropdown
          label="Material"
          value={
            activeFilters.material
              ? materials.find((m) => m.id === activeFilters.material)
                  ?.label ?? null
              : null
          }
          options={materials}
          onSelect={(id) =>
            onFilterChange({ ...activeFilters, material: id })
          }
          onClear={() =>
            onFilterChange({ ...activeFilters, material: null })
          }
        />

        {/* Clear all */}
        <AnimatePresence>
          {hasActiveFilters && (
            <motion.button
              variants={chipVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={onClearAll}
              className="text-[length:var(--text-sm)] text-muted hover:text-foreground transition-colors px-2 py-1"
            >
              Clear All
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Active filter chips */}
      <AnimatePresence>
        <div className="flex flex-wrap gap-1.5">
          {activeFilters.collection && (
            <FilterChip
              key={`collection-${activeFilters.collection}`}
              label={`Collection: ${collections.find((c) => c.slug === activeFilters.collection)?.name}`}
              onRemove={() =>
                onFilterChange({ ...activeFilters, collection: null })
              }
              chipVariants={chipVariants}
            />
          )}
          {activeFilters.material && (
            <FilterChip
              key={`material-${activeFilters.material}`}
              label={`Material: ${materials.find((m) => m.id === activeFilters.material)?.label}`}
              onRemove={() =>
                onFilterChange({ ...activeFilters, material: null })
              }
              chipVariants={chipVariants}
            />
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}

// Sub-components

interface FilterDropdownProps {
  label: string;
  value: string | null;
  options: Array<{ id: string; label: string }>;
  onSelect: (id: string) => void;
  onClear: () => void;
}

function FilterDropdown({
  label,
  value,
  options,
  onSelect,
  onClear,
}: FilterDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-[12px] text-[length:var(--text-sm)]",
            "border border-foreground/15 transition-all duration-200",
            "hover:border-foreground/30 hover:bg-foreground/5",
            value && "bg-foreground text-primary-cta-text border-foreground"
          )}
        >
          {value || label}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[180px] card p-1.5 shadow-md z-50 animate-in fade-in-0 slide-in-from-top-2 duration-150"
          sideOffset={4}
          align="start"
        >
          {options.map((opt) => (
            <DropdownMenu.Item
              key={opt.id}
              className="flex items-center px-3 py-2 text-[length:var(--text-sm)] rounded-[8px] cursor-pointer outline-none hover:bg-foreground/5 focus:bg-foreground/5 transition-colors"
              onSelect={() => onSelect(opt.id)}
            >
              {opt.label}
            </DropdownMenu.Item>
          ))}
          {value && (
            <>
              <DropdownMenu.Separator className="h-px bg-foreground/10 my-1" />
              <DropdownMenu.Item
                className="flex items-center px-3 py-2 text-[length:var(--text-sm)] text-muted rounded-[8px] cursor-pointer outline-none hover:bg-foreground/5 focus:bg-foreground/5 transition-colors"
                onSelect={onClear}
              >
                Clear {label.toLowerCase()}
              </DropdownMenu.Item>
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

interface FilterChipProps {
  label: string;
  onRemove: () => void;
  chipVariants: Variants;
}

function FilterChip({ label, onRemove, chipVariants }: FilterChipProps) {
  return (
    <motion.span
      layout
      variants={chipVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="inline-flex items-center gap-1 px-2 py-1 rounded-[8px] bg-foreground/5 text-[length:var(--text-xs)] text-foreground"
    >
      {label}
      <button
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="hover:text-error transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </motion.span>
  );
}
