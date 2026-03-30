"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { PageTransition } from "@/components/layout/PageTransition";
import { CheckoutForm } from "@/components/forms/CheckoutForm";
import { CartSummary } from "@/components/cart/CartSummary";
import { GlassCard } from "@/components/ui/GlassCard";
import { useCart } from "@/context/CartContext";
import { createOrder, saveOrder } from "@/lib/orders";
import { formatCurrency } from "@/lib/utils";
import type { CheckoutFormData } from "@/lib/validation";

export function CheckoutPageClient() {
  const router = useRouter();
  const { items, subtotal, tax, total, totalItems, clearCart, isHydrated } =
    useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to cart if empty (after hydration)
  useEffect(() => {
    if (isHydrated && items.length === 0) {
      router.replace("/cart");
    }
  }, [isHydrated, items.length, router]);

  const handleSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate processing delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Create and save order
      const order = createOrder(items, data);
      saveOrder(order);

      // Clear cart
      clearCart();

      // Redirect to confirmation
      router.push("/order-confirmation");
    } catch {
      setIsSubmitting(false);
    }
  };

  // Don't render until hydrated
  if (!isHydrated || items.length === 0) {
    return null;
  }

  return (
    <PageTransition>
      <PageHeader
        title="Checkout"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />

      <div className="bg-background pb-12 lg:pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* Checkout form */}
            <GlassCard padding="lg">
              <CheckoutForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </GlassCard>

            {/* Order summary sidebar */}
            <div>
              <CartSummary
                subtotal={subtotal}
                itemCount={totalItems}
                tax={tax}
                total={total}
              />

              {/* Order items preview */}
              <GlassCard padding="md" className="mt-4">
                <h3 className="text-[length:var(--text-sm)] font-semibold mb-3">
                  Items ({totalItems})
                </h3>
                <div className="flex flex-col gap-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-[length:var(--text-xs)] text-muted"
                    >
                      <span className="truncate mr-2">
                        {item.productName} x{item.quantity}
                      </span>
                      <span className="flex-shrink-0 font-medium text-foreground">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}
