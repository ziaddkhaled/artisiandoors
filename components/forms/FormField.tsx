"use client";

import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  options?: readonly string[] | string[];
  rows?: number;
}

export const FormField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  FormFieldProps
>(function FormField(
  {
    label,
    name,
    type = "text",
    placeholder,
    required,
    error,
    className,
    options,
    rows = 4,
    ...restProps
  },
  ref
) {
  const inputId = `field-${name}`;
  const errorId = `${inputId}-error`;

  const baseInputStyles = cn(
    "w-full px-3 py-2.5 rounded-[var(--radius-sm)] bg-transparent",
    "border border-foreground/15 text-foreground text-[length:var(--text-sm)]",
    "placeholder:text-accent/60",
    "transition-colors duration-150",
    "focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground/20",
    !!error && "border-error focus:border-error focus:ring-error/20"
  );

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={inputId}
        className="text-[length:var(--text-sm)] font-medium text-foreground"
      >
        {label}
        {required && (
          <span className="text-error ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {type === "textarea" ? (
        <textarea
          id={inputId}
          name={name}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          placeholder={placeholder}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          rows={rows}
          className={cn(baseInputStyles, "resize-vertical")}
          {...(restProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : type === "select" ? (
        <select
          id={inputId}
          name={name}
          ref={ref as React.Ref<HTMLSelectElement>}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cn(baseInputStyles, "cursor-pointer")}
          {...(restProps as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          <option value="">{placeholder || "Select..."}</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          name={name}
          ref={ref as React.Ref<HTMLInputElement>}
          type={type}
          placeholder={placeholder}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={baseInputStyles}
          {...restProps}
        />
      )}

      <AnimatePresence mode="wait">
        {error && (
          <motion.span
            id={errorId}
            role="alert"
            aria-live="polite"
            className="text-[length:var(--text-xs)] text-error"
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -4, height: 0 }}
            transition={{ duration: 0.15 }}
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
});
