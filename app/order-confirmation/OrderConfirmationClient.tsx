"use client";

import { useState, useEffect } from "react";
import { Package } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { PageTransition } from "@/components/layout/PageTransition";
import { OrderConfirmation } from "@/components/feedback/OrderConfirmation";
import { EmptyState } from "@/components/cart/EmptyState";
import { getLastOrder } from "@/lib/orders";
import type { Order } from "@/types";

export function OrderConfirmationClient() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const lastOrder = getLastOrder();
    setOrder(lastOrder);
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <PageTransition>
      <PageHeader
        title="Order Confirmation"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Order Confirmation" },
        ]}
      />

      <div className="bg-background pb-12 lg:pb-20">
        <Container>
          {order ? (
            <OrderConfirmation order={order} />
          ) : (
            <EmptyState
              icon={Package}
              title="No recent order found"
              description="If you just placed an order, it may have been cleared from your browser."
              ctaLabel="Return to Shop"
              ctaHref="/shop"
            />
          )}
        </Container>
      </div>
    </PageTransition>
  );
}
