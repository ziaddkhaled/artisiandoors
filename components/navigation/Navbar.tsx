"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";
import { MobileMenu } from "./MobileMenu";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Container } from "@/components/layout/Container";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useCart } from "@/context/CartContext";
import { navLinks } from "@/data/site";

// Navbar easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) — matches DESIGN_SYSTEM
const NAVBAR_EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const NAVBAR_DURATION = 0.9; // 900ms

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isVisible } = useScrollDirection();
  const { totalItems } = useCart();
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: NAVBAR_DURATION, ease: NAVBAR_EASE };

  return (
    <>
      <motion.header
        className="fixed top-6 left-0 right-0 z-[100]"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : "-150%" }}
        transition={transition}
      >
        <Container>
          <nav
            className="card flex items-center justify-between px-3.5 py-[7px] pr-[7px]"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Logo />

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                />
              ))}
            </div>

            {/* Right side: CTA + Cart + Mobile hamburger */}
            <div className="flex items-center gap-2">
              <div className="hidden md:block">
                <PrimaryButton
                  label="Get Started"
                  href="/shop"
                  size="sm"
                />
              </div>

              {/* Cart icon */}
              <Link
                href="/cart"
                className="relative p-2 rounded-[12px] hover:bg-foreground/5 transition-colors duration-150"
                aria-label={`Shopping cart with ${totalItems} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <motion.span
                    key={totalItems}
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-primary-cta text-primary-cta-text text-[10px] font-semibold leading-none px-1"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {totalItems}
                  </motion.span>
                )}
              </Link>

              {/* Mobile menu trigger */}
              <button
                className="md:hidden p-2 rounded-[12px] hover:bg-foreground/5 transition-colors duration-150"
                onClick={() => setMobileMenuOpen(true)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav-dialog"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </Container>
      </motion.header>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        cartItemCount={totalItems}
      />
    </>
  );
}
