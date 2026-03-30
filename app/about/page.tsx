import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the ArtisanDoors story. Over 15 years of handcrafted excellence, premium materials, and a passion for transforming entrances into architectural art.",
  openGraph: {
    title: "About | ArtisanDoors",
    description:
      "Discover the ArtisanDoors story. Over 15 years of handcrafted excellence, premium materials, and a passion for transforming entrances into architectural art.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "ArtisanDoors — About Us" }],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
