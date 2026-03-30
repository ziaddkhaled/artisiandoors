import { HeroSection } from "@/components/content/HeroSection";
import { AboutSection } from "@/components/content/AboutSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { MetricsSection } from "./sections/MetricsSection";
import { ContactSection } from "@/components/content/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <MetricsSection />
      <ContactSection />
    </>
  );
}
