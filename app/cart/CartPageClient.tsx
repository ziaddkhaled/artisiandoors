"use client";

import { AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { PageTransition } from "@/components/layout/PageTransition";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { EmptyState } from "@/components/cart/EmptyState";
import { useCart } from "@/context/CartContext";

export function CartPageClient() {
  const { items, subtotal, tax, total, totalItems, updateQuantity, removeItem } =
    useCart();

  return (
    <PageTransition>
      <PageHeader
        title="Your Cart"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Cart" },
        ]}
      />

      <div className="bg-background pb-12 lg:pb-20">
        <Container>
          {items.length === 0 ? (
            <EmptyState
              icon={ShoppingBag}
              title="Your cart is empty"
              description="Start exploring our collection of handcrafted doors."
              ctaLabel="Browse Collection"
              ctaHref="/shop"
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
              {/* Cart items */}
              <div className="flex flex-col gap-4">
                <AnimatePresence mode="popLayout">
                  {items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </AnimatePresence>
              </div>

              {/* Summary sidebar */}
              <CartSummary
                subtotal={subtotal}
                itemCount={totalItems}
                tax={tax}
                total={total}
                ctaLabel="Proceed to Checkout"
                ctaHref="/checkout"
              />
            </div>
          )}
        </Container>
      </div>
    </PageTransition>
  );
}
