"use client";

import { Section } from "@/components/layout/Section";
import { BlurText } from "@/components/content/BlurText";
import { MetricCard } from "@/components/content/MetricCard";
import { metrics } from "@/data/site";

export function MetricsSection() {
  return (
    <Section variant="dark" id="metrics">
      <div className="text-center mb-10 lg:mb-16">
        <h2 className="text-[length:var(--text-4xl)] font-medium tracking-tight text-dark-text mb-4">
          Quality in Numbers
        </h2>
        <BlurText
          text="Proven performance and satisfaction in every build."
          variant="word"
          as="p"
          className="text-[length:var(--text-base)] text-dark-muted max-w-lg mx-auto justify-center"
        />
      </div>

      <dl className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.label}
            value={metric.value}
            label={metric.label}
            index={index}
          />
        ))}
      </dl>
    </Section>
  );
}
