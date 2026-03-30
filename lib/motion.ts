// Framer Motion shared constants — spring configs, easings, durations
// The motionist will fine-tune these values later.

export const SPRING_SETTLE = { stiffness: 100, damping: 15, mass: 1 };
export const SPRING_GENTLE = { stiffness: 60, damping: 20, mass: 1 };

export const EASE_SMOOTH: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_DEFAULT: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
];
export const EASE_BUTTON: [number, number, number, number] = [
  0.77, 0, 0.18, 1,
];

export const DURATION_FAST = 0.15;
export const DURATION_NORMAL = 0.3;
export const DURATION_SLOW = 0.5;
export const DURATION_SLOWER = 0.7;
export const DURATION_SLOWEST = 0.9;

// Stagger timing (in seconds)
export const STAGGER_CHARS = 0.02;
export const STAGGER_WORDS = 0.04;
export const STAGGER_CARDS = 0.08;
export const STAGGER_NAV_LINKS = 0.05;
export const STAGGER_FORM_FIELDS = 0.06;

// Reusable animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_SLOW, ease: EASE_SMOOTH },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION_SLOW, ease: EASE_SMOOTH },
  },
};

export const staggerContainer = (stagger = STAGGER_CARDS) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION_SLOW, ease: EASE_SMOOTH },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION_SLOW, ease: EASE_SMOOTH },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION_SLOW, ease: EASE_SMOOTH },
  },
};
