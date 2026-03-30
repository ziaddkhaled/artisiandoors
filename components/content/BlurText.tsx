"use client";

import { useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurTextProps {
  text: string;
  variant?: "char" | "word";
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  staggerDelay?: number;
  scrub?: boolean;
}

export function BlurText({
  text,
  variant = "word",
  as: Component = "p",
  className,
  staggerDelay,
  scrub = false,
}: BlurTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <ReducedMotionBlurText
        text={text}
        as={Component}
        className={className}
        containerRef={containerRef}
      />
    );
  }

  if (scrub) {
    return (
      <ScrubBlurText
        text={text}
        variant={variant}
        as={Component}
        className={className}
        containerRef={containerRef}
      />
    );
  }

  return (
    <InViewBlurText
      text={text}
      variant={variant}
      as={Component}
      className={className}
      staggerDelay={staggerDelay}
      containerRef={containerRef}
    />
  );
}

// -- Reduced motion fallback: simple opacity fade --

interface ReducedMotionBlurTextProps {
  text: string;
  as: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function ReducedMotionBlurText({
  text,
  as: Component,
  className,
  containerRef,
}: ReducedMotionBlurTextProps) {
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <Component
      ref={containerRef}
      aria-label={text}
      className={cn("flex flex-wrap", className)}
    >
      <motion.span
        aria-hidden="true"
        className="inline"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {text}
      </motion.span>
    </Component>
  );
}

// -- In-view triggered variant (whileInView with stagger) --

interface InViewBlurTextProps {
  text: string;
  variant: "char" | "word";
  as: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  staggerDelay?: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function InViewBlurText({
  text,
  variant,
  as: Component,
  className,
  staggerDelay,
  containerRef,
}: InViewBlurTextProps) {
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const defaultDelay = variant === "char" ? 0.02 : 0.04;
  const delay = staggerDelay ?? defaultDelay;

  const segments = useMemo(() => {
    if (variant === "char") {
      return text.split("").map((char, i) => ({
        key: `${char}-${i}`,
        content: char === " " ? "\u00A0" : char,
        index: i,
      }));
    }
    return text.split(" ").map((word, i) => ({
      key: `${word}-${i}`,
      content: word,
      index: i,
    }));
  }, [text, variant]);

  return (
    <Component
      ref={containerRef}
      aria-label={text}
      className={cn("flex flex-wrap", className)}
    >
      {segments.map((segment) => (
        <motion.span
          key={segment.key}
          aria-hidden="true"
          className={cn(
            "inline-block",
            "[&:not(.motion-finished)]:will-change-[filter,opacity,transform]",
            variant === "word" && "mr-[0.25em]"
          )}
          initial={{ filter: "blur(10px)", opacity: 0, y: 4 }}
          animate={
            isInView
              ? { filter: "blur(0px)", opacity: 1, y: 0 }
              : { filter: "blur(10px)", opacity: 0, y: 4 }
          }
          transition={{
            duration: 0.7,
            delay: segment.index * delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {segment.content}
        </motion.span>
      ))}
    </Component>
  );
}

// -- Scroll-scrubbed variant (useScroll + useTransform) --

interface ScrubBlurTextProps {
  text: string;
  variant: "char" | "word";
  as: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function ScrubBlurText({
  text,
  variant,
  as: Component,
  className,
  containerRef,
}: ScrubBlurTextProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.95", "start 0.2"],
  });

  const segments = useMemo(() => {
    if (variant === "char") {
      return text.split("").map((char, i, arr) => ({
        key: `${char}-${i}`,
        content: char === " " ? "\u00A0" : char,
        index: i,
        total: arr.length,
      }));
    }
    return text.split(" ").map((word, i, arr) => ({
      key: `${word}-${i}`,
      content: word,
      index: i,
      total: arr.length,
    }));
  }, [text, variant]);

  return (
    <Component
      ref={containerRef}
      aria-label={text}
      className={cn("flex flex-wrap", className)}
    >
      {segments.map((segment) => (
        <ScrubChar
          key={segment.key}
          content={segment.content}
          index={segment.index}
          total={segment.total}
          scrollYProgress={scrollYProgress}
          isWord={variant === "word"}
        />
      ))}
    </Component>
  );
}

interface ScrubCharProps {
  content: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  isWord: boolean;
}

function ScrubChar({
  content,
  index,
  total,
  scrollYProgress,
  isWord,
}: ScrubCharProps) {
  // Stagger each char/word so they reveal progressively left-to-right
  // Give each segment a slightly overlapping window for smoothness
  const segmentSize = 1 / total;
  const overlap = segmentSize * 0.5;
  const start = Math.max(0, index * segmentSize - overlap * 0.5);
  const end = Math.min(1, start + segmentSize + overlap);

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const blur = useTransform(scrollYProgress, [start, end], [10, 0]);
  const y = useTransform(scrollYProgress, [start, end], [6, 0]);

  return (
    <motion.span
      aria-hidden="true"
      className={cn(
        "inline-block",
        "[&:not(.motion-finished)]:will-change-[filter,opacity,transform]",
        isWord && "mr-[0.25em]"
      )}
      style={{
        opacity,
        filter: useTransformFilter(blur),
        y,
      }}
    >
      {content}
    </motion.span>
  );
}

// Helper to create a MotionValue<string> for filter from a MotionValue<number>
function useTransformFilter(blur: MotionValue<number>): MotionValue<string> {
  return useTransform(blur, (v) => (v > 0.05 ? `blur(${v.toFixed(2)}px)` : "none"));
}
