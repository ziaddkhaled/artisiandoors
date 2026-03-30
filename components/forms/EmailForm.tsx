"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { emailSignupSchema, type EmailSignupData } from "@/lib/validation";
import { EASE_SMOOTH, DURATION_SLOW } from "@/lib/motion";

interface EmailFormProps {
  onSubmit: (email: string) => void;
  variant?: "inline" | "stacked";
}

export function EmailForm({ onSubmit, variant = "inline" }: EmailFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailSignupData>({
    resolver: zodResolver(emailSignupSchema),
    mode: "onBlur",
  });

  const handleFormSubmit = async (data: EmailSignupData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSubmit(data.email);
    setIsSuccess(true);
  };

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <motion.div
          key="success"
          className="flex items-center gap-2 justify-center text-success text-[length:var(--text-sm)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: DURATION_SLOW, ease: EASE_SMOOTH }}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Thank you! You&apos;re on the list.</span>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="w-full"
          exit={{ opacity: 0 }}
        >
          <div className="card flex items-center gap-1 p-[2px] rounded-[12px] border border-white">
            <label htmlFor="email-signup" className="sr-only">
              Email address
            </label>
            <input
              id="email-signup"
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-transparent px-3 py-2 text-[length:var(--text-sm)] text-foreground placeholder:text-accent/60 focus:outline-none min-w-0"
              {...register("email")}
            />
            <PrimaryButton
              label="Sign Up"
              type="submit"
              size="sm"
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </div>
          {errors.email && (
            <p className="text-error text-[length:var(--text-xs)] mt-1">
              {errors.email.message}
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
