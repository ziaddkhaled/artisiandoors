import type { Metadata } from "next";
import { ContactPageClient } from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with ArtisanDoors. Request a consultation, ask about custom designs, or reach out for support.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
