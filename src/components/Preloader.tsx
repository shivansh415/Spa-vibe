'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SakuraLeaf = ({ delay, x }: { delay: number; x: number }) => (
  <motion.div
    className="absolute"
    style={{ left: `${x}%`, top: '-20px' }}
    initial={{ y: -20, opacity: 0, rotate: 0 }}
    animate={{
      y: ['-20px', '120vh'],
      opacity: [0, 1, 1, 0],
      rotate: [0, 180, 360, 540],
      x: [0, 30, -20, 40],
    }}
    transition={{
      duration: 3.5,
      delay,
      ease: 'easeInOut',
    }}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C12 2 4 8 4 14C4 18 7 22 12 22C17 22 20 18 20 14C20 8 12 2 12 2Z"
        fill="#C9A96E"
        opacity="0.4"
      />
      <path
        d="M12 6C12 6 8 10 8 14C8 16.5 9.5 19 12 19C14.5 19 16 16.5 16 14C16 10 12 6 12 6Z"
        fill="#C9A96E"
        opacity="0.6"
      />
    </svg>
  </motion.div>
);

const CandleFlame = () => (
  <motion.div
    className="flex flex-col items-center"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
  >
    <motion.svg
      width="40"
      height="60"
      viewBox="0 0 40 60"
      fill="none"
      className="animate-flicker"
    >
      {/* Flame outer */}
      <motion.path
        d="M20 5C20 5 8 20 8 32C8 40 13 45 20 45C27 45 32 40 32 32C32 20 20 5 20 5Z"
        stroke="#C9A96E"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
      {/* Flame inner glow */}
      <motion.path
        d="M20 15C20 15 14 25 14 32C14 37 16.5 40 20 40C23.5 40 26 37 26 32C26 25 20 15 20 15Z"
        fill="#C9A96E"
        opacity="0.3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      {/* Wick */}
      <line
        x1="20"
        y1="45"
        x2="20"
        y2="55"
        stroke="#3D2B1F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  </motion.div>
);

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [xValues] = useState<number[]>(() => {
    return [...Array(8)].map((_, i) => 10 + (i * 10)); // predictable fallback
  });

  useEffect(() => {
    // We can assign random values only on client to avoid hydration mismatch
    // But since the parent hides this on touch/server, simple deterministic values are fine.
    // Or we just use a stable pseudo-random

    // The preloader will now show on every page load as requested.

    const timer = setTimeout(() => {
      setShow(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden preloader-failsafe"
          style={{ backgroundColor: '#FAF7F2' }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const },
          }}
        >
          {/* Sakura particles */}
          {[...Array(8)].map((_, i) => (
            <SakuraLeaf
              key={i}
              delay={0.3 + i * 0.15}
              x={xValues[i]}
            />
          ))}

          {/* Candle flame */}
          <CandleFlame />

          {/* Brand name */}
          <motion.h1
            className="mt-8 text-3xl md:text-4xl tracking-[0.3em] uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              color: '#C9A96E',
              fontWeight: 300,
            }}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          >
            The Ark Spa & Salon
          </motion.h1>

          {/* Golden line sweep */}
          <motion.div
            className="mt-6 h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent"
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ delay: 1.6, duration: 0.6, ease: 'easeOut' }}
          />

          {/* Subtitle */}
          <motion.p
            className="mt-4 text-xs tracking-[0.5em] uppercase"
            style={{ color: '#8A9B6E', fontFamily: 'var(--font-body)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.6 }}
          >
            Sanctuary of Serenity
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
