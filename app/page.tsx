import { HeroSection } from "@/components/content/HeroSection";
import { AboutSection } from "@/components/content/AboutSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { MetricsSection } from "./sections/MetricsSection";
import { ContactSection } from "@/components/content/ContactSection";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ArtisanDoors",
  url: "https://artisandoors.com",
  logo: "https://artisandoors.com/og-image.jpg",
  description:
    "Handcrafted bespoke doors tailored to your home's unique character. Premium materials, artisan craftsmanship, architectural excellence.",
  sameAs: [],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <MetricsSection />
      <ContactSection />
    </>
  );
}
