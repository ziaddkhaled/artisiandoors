"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { FormField } from "./FormField";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import { contactSubjects } from "@/data/site";
import {
  EASE_SMOOTH,
  DURATION_SLOW,
  STAGGER_FORM_FIELDS,
  fadeInUp,
} from "@/lib/motion";

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
}

const fadeInUpReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  const handleFormSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    onSubmit?.(data);
    setIsSuccess(true);
  };

  const itemVariants = prefersReducedMotion ? fadeInUpReduced : fadeInUp;
  const stagger = prefersReducedMotion ? 0 : STAGGER_FORM_FIELDS;

  const successProps = prefersReducedMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3 },
      }
    : {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: DURATION_SLOW, ease: EASE_SMOOTH },
      };

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <motion.div
          key="success"
          className="flex flex-col items-center justify-center gap-4 py-12 text-center"
          {...successProps}
        >
          <motion.div
            initial={{ scale: prefersReducedMotion ? 1 : 0 }}
            animate={{ scale: 1 }}
            transition={
              prefersReducedMotion
                ? { duration: 0.2 }
                : { type: "spring", stiffness: 300, damping: 20, delay: 0.1 }
            }
          >
            <CheckCircle className="w-12 h-12 text-success" />
          </motion.div>
          <h3 className="text-[length:var(--text-xl)] font-medium">
            Thank you for your message!
          </h3>
          <p className="text-[length:var(--text-base)] text-muted">
            We&apos;ll get back to you within 24 hours.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-4"
          aria-label="Contact form"
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: stagger },
            },
          }}
        >
          <motion.div variants={itemVariants}>
            <FormField
              label="Name"
              required
              placeholder="Your name"
              error={errors.name?.message}
              {...register("name")}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              label="Email"
              type="email"
              required
              placeholder="your@email.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              label="Subject"
              type="select"
              required
              placeholder="Select a subject"
              options={[...contactSubjects]}
              error={errors.subject?.message}
              {...register("subject")}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormField
              label="Message"
              type="textarea"
              required
              placeholder="Tell us about your project..."
              rows={5}
              error={errors.message?.message}
              {...register("message")}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <PrimaryButton
              label="Send Message"
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              fullWidth
            />
          </motion.div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
