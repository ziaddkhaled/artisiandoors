import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ArtisanDoors. Request a consultation, ask about custom designs, or reach out for support.",
  openGraph: {
    title: "Contact | ArtisanDoors",
    description:
      "Get in touch with ArtisanDoors. Request a consultation, ask about custom designs, or reach out for support.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "ArtisanDoors — Contact Us" }],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
