"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { NavLink } from "./NavLink";
import { navLinks } from "@/data/site";
import {
  EASE_SMOOTH,
  DURATION_SLOW,
  STAGGER_NAV_LINKS,
} from "@/lib/motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  cartItemCount: number;
}

export function MobileMenu({ isOpen, onClose, cartItemCount }: MobileMenuProps) {
  const prefersReducedMotion = useReducedMotion();

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const panelVariants = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        hidden: { y: "-100%" },
        visible: { y: 0 },
        exit: { y: "-100%" },
      };

  const panelTransition = prefersReducedMotion
    ? { duration: 0.15 }
    : { duration: DURATION_SLOW, ease: EASE_SMOOTH };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-foreground/50 z-[var(--z-overlay)]"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.25 }}
                data-lenis-prevent
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                id="mobile-nav-dialog"
                className="fixed inset-x-0 top-0 z-[var(--z-modal)] bg-background p-6 min-h-svh"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={panelTransition}
                data-lenis-prevent
              >
                <VisuallyHidden.Root>
                  <Dialog.Title>Navigation Menu</Dialog.Title>
                </VisuallyHidden.Root>

                {/* Close button */}
                <div className="flex justify-end">
                  <Dialog.Close asChild>
                    <motion.button
                      className="p-2 rounded-[12px] hover:bg-foreground/5 transition-colors"
                      aria-label="Close menu"
                      whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.button>
                  </Dialog.Close>
                </div>

                {/* Nav links */}
                <motion.nav
                  className="flex flex-col gap-6 mt-12"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: prefersReducedMotion ? 0 : STAGGER_NAV_LINKS,
                        delayChildren: prefersReducedMotion ? 0 : 0.15,
                      },
                    },
                  }}
                >
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.href}
                      variants={
                        prefersReducedMotion
                          ? {
                              hidden: { opacity: 0 },
                              visible: { opacity: 1, transition: { duration: 0.15 } },
                            }
                          : {
                              hidden: { opacity: 0, x: -20 },
                              visible: {
                                opacity: 1,
                                x: 0,
                                transition: {
                                  duration: DURATION_SLOW,
                                  ease: EASE_SMOOTH,
                                },
                              },
                            }
                      }
                    >
                      <NavLink
                        href={link.href}
                        label={link.label}
                        variant="mobile"
                        onClick={onClose}
                      />
                    </motion.div>
                  ))}

                  {/* Cart link */}
                  <motion.div
                    variants={
                      prefersReducedMotion
                        ? {
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { duration: 0.15 } },
                          }
                        : {
                            hidden: { opacity: 0, x: -20 },
                            visible: {
                              opacity: 1,
                              x: 0,
                              transition: {
                                duration: DURATION_SLOW,
                                ease: EASE_SMOOTH,
                              },
                            },
                          }
                    }
                  >
                    <Link
                      href="/cart"
                      onClick={onClose}
                      className="flex items-center gap-2 text-[length:var(--text-2xl)] font-medium text-foreground"
                    >
                      <ShoppingBag className="w-6 h-6" />
                      Cart
                      {cartItemCount > 0 && (
                        <span className="text-[length:var(--text-sm)] text-muted">
                          ({cartItemCount})
                        </span>
                      )}
                    </Link>
                  </motion.div>
                </motion.nav>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
