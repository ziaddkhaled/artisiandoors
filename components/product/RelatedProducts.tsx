"use client";

import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { STAGGER_CARDS } from "@/lib/motion";
import type { Product } from "@/types";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

export function RelatedProducts({
  products,
  title = "You May Also Like",
}: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-heading">
      <h2
        id="related-heading"
        className="text-[length:var(--text-2xl)] font-medium tracking-tight mb-6"
      >
        {title}
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          visible: { transition: { staggerChildren: STAGGER_CARDS } },
        }}
      >
        {products.map((product, i) => (
          <ProductCard key={product.slug} product={product} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
