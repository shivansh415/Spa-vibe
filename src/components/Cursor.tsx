'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function Cursor() {
  const [visible, setVisible] = useState(false);
  const [hoverType, setHoverType] = useState<'default' | 'button' | 'image'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useSpring(0, { stiffness: 500, damping: 40 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 40 });
  const ringX = useSpring(0, { stiffness: 150, damping: 20 });
  const ringY = useSpring(0, { stiffness: 150, damping: 20 });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!visible) setVisible(true);
    },
    [cursorX, cursorY, ringX, ringY, visible]
  );

  useEffect(() => {
    // Detect touch device more accurately (avoiding false positives on desktops with touchscreens)
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    setTimeout(() => setIsTouchDevice(isTouch), 0);
    if (isTouch) return;

    window.addEventListener('mousemove', onMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('[data-cursor="button"]')
      ) {
        setHoverType('button');
      } else if (
        target.closest('img') ||
        target.closest('[data-cursor="image"]') ||
        target.closest('.gallery-item')
      ) {
        setHoverType('image');
      } else {
        setHoverType('default');
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [onMouseMove]);

  if (isTouchDevice) return null;

  const ringSize = hoverType === 'button' ? 60 : hoverType === 'image' ? 48 : 32;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[10001] pointer-events-none mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#C9A96E',
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[10000] pointer-events-none flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor:
            hoverType === 'button'
              ? 'rgba(201, 169, 110, 0.15)'
              : 'rgba(201, 169, 110, 0)',
          borderColor: '#C9A96E',
          borderWidth: hoverType === 'image' ? 2 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div
          className="rounded-full"
          style={{
            width: ringSize,
            height: ringSize,
            borderRadius: '50%',
            border: `1px solid rgba(201, 169, 110, ${hoverType === 'default' ? 0.4 : 0.7})`,
            backdropFilter: 'blur(1px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {hoverType === 'button' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[9px] uppercase tracking-[0.15em]"
              style={{ color: '#C9A96E', fontFamily: 'var(--font-body)' }}
            >
              tap
            </motion.span>
          )}
          {hoverType === 'image' && (
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <path d="M12 2v20M2 12h20" stroke="#C9A96E" strokeWidth="1" />
            </motion.svg>
          )}
        </div>
      </motion.div>
    </>
  );
}
