import type { Metadata } from "next";
import { OrderConfirmationClient } from "./OrderConfirmationClient";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description:
    "Your ArtisanDoors order has been placed successfully. View your order details and summary.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Order Confirmation | ArtisanDoors",
    description: "Your ArtisanDoors order has been placed successfully.",
  },
};

export default function OrderConfirmationPage() {
  return <OrderConfirmationClient />;
}
