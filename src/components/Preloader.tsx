'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ease } from '@/lib/motion';

/* ──────────────────────────────────────────────
   Decorative SVG Elements
   ────────────────────────────────────────────── */
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
    transition={{ duration: 3.5, delay, ease: 'easeInOut' }}
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C12 2 4 8 4 14C4 18 7 22 12 22C17 22 20 18 20 14C20 8 12 2 12 2Z"
        fill="#DDB7AF"
        opacity="0.35"
      />
      <path
        d="M12 6C12 6 8 10 8 14C8 16.5 9.5 19 12 19C14.5 19 16 16.5 16 14C16 10 12 6 12 6Z"
        fill="#DDB7AF"
        opacity="0.55"
      />
    </svg>
  </motion.div>
);

const CandleFlame = () => (
  <motion.div
    className="flex flex-col items-center"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6, ease: ease.smooth }}
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
        stroke="#DDB7AF"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
      {/* Flame inner glow */}
      <motion.path
        d="M20 15C20 15 14 25 14 32C14 37 16.5 40 20 40C23.5 40 26 37 26 32C26 25 20 15 20 15Z"
        fill="#E8C6C1"
        opacity="0.3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
      {/* Wick */}
      <line
        x1="20" y1="45" x2="20" y2="55"
        stroke="#2B2B2B"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.svg>
  </motion.div>
);

/* ──────────────────────────────────────────────
   Preloader Component
   ────────────────────────────────────────────── */
export default function Preloader() {
  const [show, setShow] = useState(true);
  const [xValues] = useState<number[]>(() =>
    [...Array(8)].map((_, i) => 10 + i * 10)
  );

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden preloader-failsafe"
          style={{ backgroundColor: '#F8F4F1' }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: ease.inOut },
          }}
        >
          {/* Falling leaves */}
          {[...Array(8)].map((_, i) => (
            <SakuraLeaf key={i} delay={0.3 + i * 0.15} x={xValues[i]} />
          ))}

          {/* Candle */}
          <CandleFlame />

          {/* Brand name */}
          <motion.h1
            className="mt-8 tracking-[0.3em] uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              color: '#DDB7AF',
              fontWeight: 300,
              fontSize: 'var(--text-3xl)',
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.9, ease: ease.smooth }}
          >
            SPA VIBE
          </motion.h1>

          {/* Line sweep */}
          <motion.div
            className="mt-6 h-[1px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, #DDB7AF, transparent)',
            }}
            initial={{ width: 0 }}
            animate={{ width: '200px' }}
            transition={{ delay: 1.6, duration: 0.6, ease: 'easeOut' }}
          />

          {/* Subtitle */}
          <motion.p
            className="mt-4 tracking-[0.5em] uppercase"
            style={{
              color: '#5E7465',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
            }}
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
