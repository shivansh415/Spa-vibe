/**
 * Framer Motion Animation Variants
 * 
 * Reusable motion variants for consistent animations across components.
 * All easing curves use premium, smooth bezier curves.
 */
import type { Variants, Transition } from 'framer-motion';

/* ──────────────────────────────────────────────
   Easing Curves
   ────────────────────────────────────────────── */
export const ease = {
  smooth: [0.22, 1, 0.36, 1] as const,
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.76, 0, 0.24, 1] as const,
  bounce: [0.34, 1.56, 0.64, 1] as const,
};

/* ──────────────────────────────────────────────
   Transition Presets
   ────────────────────────────────────────────── */
export const transition = {
  fast: { duration: 0.3, ease: ease.smooth } satisfies Transition,
  normal: { duration: 0.6, ease: ease.smooth } satisfies Transition,
  slow: { duration: 1, ease: ease.smooth } satisfies Transition,
  spring: { type: 'spring', damping: 25, stiffness: 200 } satisfies Transition,
  springBouncy: { type: 'spring', damping: 15, stiffness: 300 } satisfies Transition,
};

/* ──────────────────────────────────────────────
   Fade Variants
   ────────────────────────────────────────────── */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.normal },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: ease.smooth },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.smooth },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: ease.smooth },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: ease.smooth },
  },
};

/* ──────────────────────────────────────────────
   Scale Variants
   ────────────────────────────────────────────── */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: ease.smooth },
  },
};

/* ──────────────────────────────────────────────
   Stagger Containers
   ────────────────────────────────────────────── */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/* ──────────────────────────────────────────────
   Page Transition
   ────────────────────────────────────────────── */
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: ease.smooth } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: ease.inOut } },
};

/* ──────────────────────────────────────────────
   Hover Animations
   ────────────────────────────────────────────── */
export const hoverLift = {
  whileHover: { y: -6, transition: transition.fast },
  whileTap: { scale: 0.98 },
};

export const hoverScale = {
  whileHover: { scale: 1.03, transition: transition.fast },
  whileTap: { scale: 0.97 },
};

export const hoverGlow = {
  whileHover: {
    boxShadow: '0 0 40px rgba(221, 183, 175, 0.2)',
    transition: transition.fast,
  },
};

/* ──────────────────────────────────────────────
   Viewport Config
   ────────────────────────────────────────────── */
export const viewportOnce = {
  once: true,
  margin: '-80px' as const,
};

export const viewportRepeat = {
  once: false,
  margin: '-50px' as const,
};
