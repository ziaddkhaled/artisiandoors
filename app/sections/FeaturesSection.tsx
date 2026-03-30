"use client";

import { Section } from "@/components/layout/Section";
import { BlurText } from "@/components/content/BlurText";
import { FeatureCard } from "@/components/content/FeatureCard";
import { features } from "@/data/site";

export function FeaturesSection() {
  return (
    <Section variant="light" id="features">
      <div className="text-center mb-10 lg:mb-16">
        <h2 className="text-[length:var(--text-4xl)] font-medium tracking-tight mb-4">
          Designed for You
        </h2>
        <BlurText
          text="Our custom designs transform standard entryways into architectural statements."
          variant="word"
          as="p"
          className="text-[length:var(--text-base)] text-muted max-w-xl mx-auto justify-center"
        />
      </div>

      <div className="flex flex-col gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.number}
            number={feature.number}
            title={feature.title}
            description={feature.description}
            imageSrc={feature.imageSrc}
            imageAlt={feature.imageAlt}
            stickyOffset={85 + index * 10}
          />
        ))}
      </div>
    </Section>
  );
}
