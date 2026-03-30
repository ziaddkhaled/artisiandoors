import type { Metadata } from "next";
import { ShopPageClient } from "./ShopPageClient";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse our collection of handcrafted bespoke doors. Filter by collection, material, and style to find the perfect door for your home.",
  openGraph: {
    title: "Shop | ArtisanDoors",
    description:
      "Browse our collection of handcrafted bespoke doors.",
  },
};

export default function ShopPage() {
  return <ShopPageClient />;
}
