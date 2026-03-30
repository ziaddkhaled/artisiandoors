"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useReducedMotion } from "framer-motion";
import { FormField } from "./FormField";
import { PaymentPlaceholder } from "./PaymentPlaceholder";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { checkoutFormSchema, type CheckoutFormData } from "@/lib/validation";
import { countries } from "@/data/site";
import { fadeInUp, STAGGER_FORM_FIELDS } from "@/lib/motion";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting: boolean;
}

const fadeInUpReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
};

export function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const prefersReducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutFormSchema),
    mode: "onBlur",
    defaultValues: {
      country: "United States",
    },
  });

  const itemVariants = prefersReducedMotion ? fadeInUpReduced : fadeInUp;
  const stagger = prefersReducedMotion ? 0 : STAGGER_FORM_FIELDS;

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      aria-label="Checkout form"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger },
        },
      }}
    >
      {/* Shipping information */}
      <fieldset className="flex flex-col gap-4">
        <legend className="text-[length:var(--text-lg)] font-medium mb-2">
          Shipping Information
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <FormField
              label="First Name"
              required
              placeholder="John"
              error={errors.firstName?.message}
              {...register("firstName")}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FormField
              label="Last Name"
              required
              placeholder="Doe"
              error={errors.lastName?.message}
              {...register("lastName")}
            />
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <FormField
            label="Email"
            type="email"
            required
            placeholder="john@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            label="Phone"
            type="tel"
            required
            placeholder="+1 (555) 000-0000"
            error={errors.phone?.message}
            {...register("phone")}
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <FormField
            label="Address"
            required
            placeholder="123 Main St"
            error={errors.address?.message}
            {...register("address")}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <FormField
              label="City"
              required
              placeholder="New York"
              error={errors.city?.message}
              {...register("city")}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FormField
              label="State / Province"
              required
              placeholder="NY"
              error={errors.state?.message}
              {...register("state")}
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div variants={itemVariants}>
            <FormField
              label="ZIP Code"
              required
              placeholder="10001"
              error={errors.zip?.message}
              {...register("zip")}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <FormField
              label="Country"
              type="select"
              required
              options={[...countries]}
              error={errors.country?.message}
              {...register("country")}
            />
          </motion.div>
        </div>
      </fieldset>

      {/* Payment placeholder */}
      <motion.div variants={itemVariants}>
        <PaymentPlaceholder />
      </motion.div>

      {/* Submit */}
      <motion.div variants={itemVariants}>
        <PrimaryButton
          label="Place Order (Demo)"
          type="submit"
          loading={isSubmitting}
          disabled={isSubmitting}
          fullWidth
          size="lg"
        />
      </motion.div>
    </motion.form>
  );
}
