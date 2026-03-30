import type { Metadata } from "next";
import { CheckoutPageClient } from "./CheckoutPageClient";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your order for handcrafted ArtisanDoors. Enter shipping details and place your order.",
  openGraph: {
    title: "Checkout | ArtisanDoors",
    description: "Complete your order for handcrafted ArtisanDoors.",
  },
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
