"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { PageTransition } from "@/components/layout/PageTransition";
import { BlurText } from "@/components/content/BlurText";
import { MetricCard } from "@/components/content/MetricCard";
import { Badge } from "@/components/content/Badge";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { EASE_SMOOTH, DURATION_SLOW, fadeInUp, staggerContainer } from "@/lib/motion";
import { BLUR_DATA_URL } from "@/lib/utils";
import { metrics } from "@/data/site";

export function AboutPageClient() {
  return (
    <PageTransition>
      <PageHeader
        title="Our Story"
        subtitle="Crafting exceptional entrances since 2009."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      {/* Brand story section */}
      <div className="bg-background pb-12 lg:pb-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
            <motion.div
              className="flex flex-col gap-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer(0.1)}
            >
              <motion.div variants={fadeInUp}>
                <Badge label="Our Heritage" variant="glass" />
              </motion.div>
              <BlurText
                text="Where Craftsmanship Meets Architecture"
                variant="word"
                as="h2"
                className="text-[length:var(--text-3xl)] font-medium tracking-tight"
              />
              <motion.p
                className="text-[length:var(--text-base)] text-muted leading-relaxed"
                variants={fadeInUp}
              >
                ArtisanDoors was born from a simple belief: the entrance to your
                home should be as thoughtfully designed as the space within.
                Founded in Brooklyn by a team of architects and master
                woodworkers, we set out to revive the art of bespoke door
                craftsmanship for the modern home.
              </motion.p>
              <motion.p
                className="text-[length:var(--text-base)] text-muted leading-relaxed"
                variants={fadeInUp}
              >
                Every door we create begins as a conversation and ends as a
                one-of-a-kind piece of functional art. We source our timber from
                managed forests, employ time-honored joinery techniques alongside
                precision CNC machining, and finish each surface by hand. The
                result is a door that doesn&apos;t just fit your home -- it
                defines it.
              </motion.p>
            </motion.div>

            <motion.div
              className="relative aspect-[4/5] rounded-[12px] overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_SMOOTH }}
            >
              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80"
                alt="Artisan craftsman working on a luxury door"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Philosophy section (dark) */}
      <Section variant="dark">
        <div className="flex flex-col items-center text-center gap-6 max-w-2xl mx-auto">
          <Badge label="Our Philosophy" variant="glass" />
          <BlurText
            text="We believe a door should tell a story. Every grain, every joint, every finish carries the intention of the hands that shaped it."
            variant="word"
            as="h2"
            className="text-[length:var(--text-2xl)] font-medium text-dark-text leading-relaxed"
          />
        </div>
      </Section>

      {/* Craftsmanship section */}
      <div className="bg-background py-12 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 items-center">
            <motion.div
              className="relative aspect-[4/5] rounded-[12px] overflow-hidden order-2 md:order-1"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE_SMOOTH }}
            >
              <Image
                src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80"
                alt="Close-up of hand-carved door detail"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </motion.div>

            <motion.div
              className="flex flex-col gap-5 order-1 md:order-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer(0.1)}
            >
              <motion.div variants={fadeInUp}>
                <Badge label="Process" variant="glass" />
              </motion.div>
              <BlurText
                text="The ArtisanDoors Process"
                variant="word"
                as="h2"
                className="text-[length:var(--text-3xl)] font-medium tracking-tight"
              />
              <motion.div
                className="flex flex-col gap-4"
                variants={fadeInUp}
              >
                {[
                  {
                    step: "01",
                    title: "Consultation",
                    desc: "We listen to your vision, measure your space, and explore materials together.",
                  },
                  {
                    step: "02",
                    title: "Design",
                    desc: "Our designers create detailed 3D renderings tailored to your home's architecture.",
                  },
                  {
                    step: "03",
                    title: "Craft",
                    desc: "Master artisans bring the design to life using premium materials and proven techniques.",
                  },
                  {
                    step: "04",
                    title: "Install",
                    desc: "Our white-glove team ensures perfect fit, alignment, and hardware adjustment.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-3">
                    <span className="text-[length:var(--text-sm)] font-semibold text-muted flex-shrink-0 w-8">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="text-[length:var(--text-sm)] font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-[length:var(--text-sm)] text-muted">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Metrics */}
      <Section variant="dark">
        <div className="text-center mb-10">
          <h2 className="text-[length:var(--text-4xl)] font-medium tracking-tight text-dark-text mb-3">
            By the Numbers
          </h2>
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

      {/* CTA section */}
      <div className="bg-background py-12 lg:py-20">
        <Container>
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: DURATION_SLOW, ease: EASE_SMOOTH }}
          >
            <h2 className="text-[length:var(--text-3xl)] font-medium tracking-tight mb-4">
              Ready to transform your entrance?
            </h2>
            <p className="text-[length:var(--text-base)] text-muted mb-6 max-w-md mx-auto">
              Browse our collection or get in touch to start your bespoke door
              journey.
            </p>
            <PrimaryButton label="Browse Collection" href="/shop" />
          </motion.div>
        </Container>
      </div>
    </PageTransition>
  );
}
