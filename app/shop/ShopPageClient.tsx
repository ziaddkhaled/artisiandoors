"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { PageTransition } from "@/components/layout/PageTransition";
import { ProductCard } from "@/components/product/ProductCard";
import { FilterBar } from "@/components/shop/FilterBar";
import { SortDropdown } from "@/components/shop/SortDropdown";
import { Pagination } from "@/components/shop/Pagination";
import { EmptyState } from "@/components/cart/EmptyState";
import { getAllProducts, filterProducts, getDefaultFilterState } from "@/lib/products";
import { paginateProducts } from "@/lib/filters";
import type { FilterState, SortOption } from "@/types";

const PRODUCTS_PER_PAGE = 12;

export function ShopPageClient() {
  const allProducts = useMemo(() => getAllProducts(), []);
  const [filters, setFilters] = useState<FilterState>(getDefaultFilterState());
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(
    () => filterProducts(allProducts, filters),
    [allProducts, filters]
  );

  const { products: paginatedProducts, totalPages } = useMemo(
    () => paginateProducts(filteredProducts, currentPage, PRODUCTS_PER_PAGE),
    [filteredProducts, currentPage]
  );

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setFilters(getDefaultFilterState());
    setCurrentPage(1);
  };

  const handleSortChange = (sortBy: SortOption) => {
    setFilters((prev) => ({ ...prev, sortBy }));
    setCurrentPage(1);
  };

  return (
    <PageTransition>
      <PageHeader
        title="Our Collection"
        subtitle="Handcrafted doors for every style and space."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop" },
        ]}
      />

      <div className="bg-background pb-12 lg:pb-20">
        <Container>
          {/* Filter + Sort bar */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
            <FilterBar
              activeFilters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAll}
            />
            <SortDropdown
              value={filters.sortBy}
              onChange={handleSortChange}
            />
          </div>

          {/* Product grid or empty state */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {paginatedProducts.map((product, i) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    index={i}
                    priority={i < 4}
                  />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <EmptyState
              icon={Search}
              title="No products match your filters"
              description="Try adjusting your filters or browse our full collection."
              ctaLabel="Clear Filters"
              ctaAction={handleClearAll}
            />
          )}
        </Container>
      </div>
    </PageTransition>
  );
}
