"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { footerLinks } from "@/data/site";

export function Footer() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.footer
      className="bg-gradient-to-b from-[rgba(26,26,26,0.75)] to-[#2c2c2c] text-dark-text py-12 lg:py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Container>
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-[length:var(--text-2xl)] font-bold text-dark-text hover:opacity-80 transition-opacity"
            >
              ArtisanDoors
            </Link>
          </div>

          {/* Link columns */}
          <div className="flex gap-12 md:gap-16">
            <nav aria-label="Company links">
              <h3 className="text-[length:var(--text-sm)] font-semibold text-dark-text mb-3">
                Company
              </h3>
              <ul className="flex flex-col gap-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[length:var(--text-sm)] text-dark-muted hover:text-dark-text transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Support links">
              <h3 className="text-[length:var(--text-sm)] font-semibold text-dark-text mb-3">
                Support
              </h3>
              <ul className="flex flex-col gap-2">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[length:var(--text-sm)] text-dark-muted hover:text-dark-text transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[rgba(245,244,240,0.2)] mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between gap-2 text-[length:var(--text-xs)] text-dark-muted">
            <p>2025 ArtisanDoors. All rights reserved.</p>
            <Link
              href="#"
              className="hover:text-dark-text transition-colors duration-150"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </motion.footer>
  );
}
