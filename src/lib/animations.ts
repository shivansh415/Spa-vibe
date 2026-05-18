/**
 * GSAP Animation Utilities
 * 
 * Centralized GSAP registration and reusable animation presets.
 * Import this module once in client components that need GSAP.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Connect GSAP ScrollTrigger to Lenis smooth scroll
  ScrollTrigger.defaults({
    scroller: undefined, // uses window
  });
}

/* ──────────────────────────────────────────────
   Animation Presets
   ────────────────────────────────────────────── */

/**
 * Fade-in animation triggered by scroll
 */
export function createFadeIn(
  element: gsap.TweenTarget,
  options?: {
    y?: number;
    x?: number;
    duration?: number;
    delay?: number;
    trigger?: string | Element;
    start?: string;
  }
) {
  const {
    y = 40,
    x = 0,
    duration = 1,
    delay = 0,
    trigger,
    start = 'top 85%',
  } = options || {};

  return gsap.fromTo(
    element,
    { y, x, opacity: 0 },
    {
      y: 0,
      x: 0,
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: trigger
        ? { trigger, start, toggleActions: 'play none none reverse' }
        : undefined,
    }
  );
}

/**
 * Staggered children animation
 */
export function createStagger(
  elements: gsap.TweenTarget,
  options?: {
    y?: number;
    stagger?: number;
    duration?: number;
    trigger?: string | Element;
    start?: string;
  }
) {
  const {
    y = 30,
    stagger = 0.1,
    duration = 0.8,
    trigger,
    start = 'top 85%',
  } = options || {};

  return gsap.fromTo(
    elements,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: trigger
        ? { trigger, start, toggleActions: 'play none none reverse' }
        : undefined,
    }
  );
}

/**
 * Parallax scroll effect
 */
export function createParallax(
  element: gsap.TweenTarget,
  options?: {
    speed?: number;
    trigger?: string | Element;
  }
) {
  const { speed = 0.3, trigger } = options || {};

  return gsap.to(element, {
    y: `${speed * 100}%`,
    ease: 'none',
    scrollTrigger: {
      trigger: (trigger || element) as string | Element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/**
 * Image reveal with clip-path
 */
export function createReveal(
  element: gsap.TweenTarget,
  options?: {
    direction?: 'left' | 'right' | 'up' | 'down';
    duration?: number;
    trigger?: string | Element;
  }
) {
  const { direction = 'left', duration = 1.2, trigger } = options || {};

  const clipPaths: Record<string, { from: string; to: string }> = {
    left:  { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
    right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
    up:    { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
    down:  { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },
  };

  return gsap.fromTo(
    element,
    { clipPath: clipPaths[direction].from },
    {
      clipPath: clipPaths[direction].to,
      duration,
      ease: 'power3.inOut',
      scrollTrigger: trigger
        ? { trigger, start: 'top 80%', toggleActions: 'play none none none' }
        : undefined,
    }
  );
}

/**
 * Text split and animate (character-level)
 */
export function createTextReveal(
  element: gsap.TweenTarget,
  options?: {
    duration?: number;
    stagger?: number;
    trigger?: string | Element;
  }
) {
  const { duration = 0.6, stagger = 0.02, trigger } = options || {};

  return gsap.fromTo(
    element,
    { y: '100%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration,
      stagger,
      ease: 'power4.out',
      scrollTrigger: trigger
        ? { trigger, start: 'top 85%', toggleActions: 'play none none none' }
        : undefined,
    }
  );
}

export { gsap, ScrollTrigger };
