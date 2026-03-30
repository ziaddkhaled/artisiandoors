import type { Metadata } from "next";
import { CartPageClient } from "./CartPageClient";

export const metadata: Metadata = {
  title: "Cart",
  description:
    "Review your selected artisan doors, customize quantities, and proceed to checkout.",
  openGraph: {
    title: "Your Cart | ArtisanDoors",
    description: "Review your selected artisan doors and proceed to checkout.",
  },
};

export default function CartPage() {
  return <CartPageClient />;
}
