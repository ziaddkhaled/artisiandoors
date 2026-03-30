import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Discover the ArtisanDoors story. Over 15 years of handcrafted excellence, premium materials, and a passion for transforming entrances into architectural art.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
