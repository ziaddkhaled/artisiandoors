"use client";

import { useState, useCallback } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { PageTransition } from "@/components/layout/PageTransition";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductCustomizer } from "@/components/product/ProductCustomizer";
import { PriceDisplay } from "@/components/product/PriceDisplay";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/content/Badge";
import { Toast } from "@/components/feedback/Toast";
import { useCart } from "@/context/CartContext";
import {
  calculateCustomPrice,
  getDefaultSelectedOptions,
  getSelectedOptionsLabels,
  getOptionPriceModifier,
} from "@/lib/pricing";
import { generateCartItemId } from "@/lib/cart";
import type { Product, SelectedOptions } from "@/types";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const { addItem } = useCart();
  const [selected, setSelected] = useState<SelectedOptions>(
    getDefaultSelectedOptions(product)
  );
  const [showToast, setShowToast] = useState(false);

  const totalPrice = calculateCustomPrice(product, selected);

  const modifiers = [
    {
      label: "Material",
      amount: getOptionPriceModifier(product, "materials", selected.material),
    },
    {
      label: "Finish",
      amount: getOptionPriceModifier(product, "finishes", selected.finish),
    },
    {
      label: "Size",
      amount: getOptionPriceModifier(product, "sizes", selected.size),
    },
    {
      label: "Hardware",
      amount: getOptionPriceModifier(product, "hardware", selected.hardware),
    },
  ];

  const handleAddToCart = useCallback(() => {
    const itemId = generateCartItemId(product.slug, selected);
    const labels = getSelectedOptionsLabels(product, selected);

    addItem({
      id: itemId,
      productSlug: product.slug,
      productName: product.name,
      productImage: product.images[0].src,
      selectedOptions: selected,
      selectedOptionsLabels: labels,
      quantity: 1,
      unitPrice: totalPrice,
    });

    setShowToast(true);
  }, [product, selected, totalPrice, addItem]);

  return (
    <PageTransition>
      <PageHeader
        title={product.name}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]}
      />

      <div className="bg-background pb-12 lg:pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Gallery */}
            <ProductGallery images={product.images} />

            {/* Right: Details */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Badge
                  label={
                    product.collection.charAt(0).toUpperCase() +
                    product.collection.slice(1)
                  }
                  variant="solid"
                />
                {product.isNew && (
                  <Badge label="New" variant="outline" />
                )}
              </div>

              <p className="text-[length:var(--text-base)] text-muted leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              {product.features.length > 0 && (
                <GlassCard padding="md">
                  <h3 className="text-[length:var(--text-sm)] font-semibold mb-2">
                    Key Features
                  </h3>
                  <ul className="flex flex-col gap-1">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-[length:var(--text-sm)] text-muted flex items-start gap-2"
                      >
                        <span
                          className="w-1 h-1 rounded-full bg-foreground mt-2 flex-shrink-0"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              )}

              {/* Customizer */}
              <ProductCustomizer
                product={product}
                selected={selected}
                onChange={setSelected}
              />

              {/* Price */}
              <PriceDisplay
                basePrice={product.basePrice}
                modifiers={modifiers}
              />

              {/* Add to cart */}
              <PrimaryButton
                label="Add to Cart"
                onClick={handleAddToCart}
                size="lg"
              />
            </div>
          </div>

          {/* Related products */}
          <div className="mt-16">
            <RelatedProducts products={relatedProducts} />
          </div>
        </Container>
      </div>

      <Toast
        message={`${product.name} added to cart`}
        variant="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </PageTransition>
  );
}
