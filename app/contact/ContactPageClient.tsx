"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/layout/Container";
import { PageTransition } from "@/components/layout/PageTransition";
import { ContactForm } from "@/components/forms/ContactForm";
import { GlassCard } from "@/components/ui/GlassCard";
import { MapPlaceholder } from "@/components/content/MapPlaceholder";
import { contactInfo } from "@/data/site";
import { EASE_SMOOTH, DURATION_SLOW, fadeInUp, staggerContainer } from "@/lib/motion";

export function ContactPageClient() {
  return (
    <PageTransition>
      <PageHeader
        title="Get in Touch"
        subtitle="We'd love to hear about your project."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <div className="bg-background pb-12 lg:pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
            {/* Left: Contact form */}
            <GlassCard padding="lg">
              <h2 className="text-[length:var(--text-xl)] font-medium mb-6">
                Send Us a Message
              </h2>
              <ContactForm />
            </GlassCard>

            {/* Right: Business info + map */}
            <div className="flex flex-col gap-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer(0.08)}
              >
                <GlassCard padding="lg">
                  <h2 className="text-[length:var(--text-xl)] font-medium mb-4">
                    Contact Information
                  </h2>
                  <div className="flex flex-col gap-4">
                    <motion.div
                      className="flex items-start gap-3"
                      variants={fadeInUp}
                    >
                      <MapPin className="w-5 h-5 text-muted flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[length:var(--text-sm)] font-medium">
                          Address
                        </p>
                        <p className="text-[length:var(--text-sm)] text-muted">
                          {contactInfo.address}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start gap-3"
                      variants={fadeInUp}
                    >
                      <Phone className="w-5 h-5 text-muted flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[length:var(--text-sm)] font-medium">
                          Phone
                        </p>
                        <p className="text-[length:var(--text-sm)] text-muted">
                          {contactInfo.phone}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start gap-3"
                      variants={fadeInUp}
                    >
                      <Mail className="w-5 h-5 text-muted flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[length:var(--text-sm)] font-medium">
                          Email
                        </p>
                        <p className="text-[length:var(--text-sm)] text-muted">
                          {contactInfo.email}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      className="flex items-start gap-3"
                      variants={fadeInUp}
                    >
                      <Clock className="w-5 h-5 text-muted flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[length:var(--text-sm)] font-medium">
                          Hours
                        </p>
                        <p className="text-[length:var(--text-sm)] text-muted">
                          {contactInfo.hours}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </GlassCard>
              </motion.div>

              <MapPlaceholder address={contactInfo.address} />
            </div>
          </div>
        </Container>
      </div>
    </PageTransition>
  );
}
