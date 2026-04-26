'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Treatments', href: '#pricing' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Pricing', href: '#pricing' },
];

// Lotus SVG icon
const LotusIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path
      d="M16 4C16 4 10 10 10 16C10 20 12.5 24 16 24C19.5 24 22 20 22 16C22 10 16 4 16 4Z"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
    />
    <path
      d="M16 8C16 8 6 12 6 18C6 22 10 26 16 26"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.6"
    />
    <path
      d="M16 8C16 8 26 12 26 18C26 22 22 26 16 26"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity="0.6"
    />
  </svg>
);

export default function Navbar({ onBookingOpen }: { onBookingOpen: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
        animate={{
          backgroundColor: scrolled
            ? 'rgba(250, 247, 242, 0.92)'
            : 'rgba(250, 247, 242, 0)',
          backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span
                className={clsx(
                  'transition-colors duration-500',
                  scrolled ? 'text-[#C9A96E]' : 'text-white'
                )}
              >
                <LotusIcon />
              </span>
              <span
                className={clsx(
                  'text-xl md:text-2xl tracking-[0.25em] uppercase transition-colors duration-500',
                  scrolled ? 'text-charcoal' : 'text-white'
                )}
                style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}
              >
                THE ARK
              </span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={clsx(
                    'relative text-sm tracking-[0.15em] uppercase transition-colors duration-500 group',
                    scrolled
                      ? 'text-charcoal/70 hover:text-charcoal'
                      : 'text-white/80 hover:text-white'
                  )}
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
                >
                  {link.label}
                  <span
                    className={clsx(
                      'absolute -bottom-1 left-0 h-[1px] w-0 group-hover:w-full transition-all duration-500 ease-out',
                      scrolled ? 'bg-gold' : 'bg-white/60'
                    )}
                  />
                </a>
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-4">
              <button
                onClick={onBookingOpen}
                className={clsx(
                  'hidden md:inline-flex items-center gap-2 px-6 py-2.5 text-sm tracking-[0.1em] uppercase rounded-full transition-all duration-500 border',
                  scrolled
                    ? 'border-gold text-gold hover:bg-gold hover:text-charcoal'
                    : 'border-white/40 text-white hover:bg-white/10'
                )}
                style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
                data-cursor="button"
              >
                Book Appointment
                <span className="text-xs">→</span>
              </button>

              {/* Hamburger */}
              <button
                className="lg:hidden flex flex-col gap-1.5 p-2"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                data-cursor="button"
              >
                <motion.span
                  className={clsx(
                    'block w-6 h-[1.5px] transition-colors',
                    scrolled ? 'bg-charcoal' : 'bg-white'
                  )}
                  animate={{
                    rotate: mobileOpen ? 45 : 0,
                    y: mobileOpen ? 6 : 0,
                  }}
                />
                <motion.span
                  className={clsx(
                    'block w-6 h-[1.5px] transition-colors',
                    scrolled ? 'bg-charcoal' : 'bg-white'
                  )}
                  animate={{ opacity: mobileOpen ? 0 : 1 }}
                />
                <motion.span
                  className={clsx(
                    'block w-6 h-[1.5px] transition-colors',
                    scrolled ? 'bg-charcoal' : 'bg-white'
                  )}
                  animate={{
                    rotate: mobileOpen ? -45 : 0,
                    y: mobileOpen ? -6 : 0,
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center"
            style={{ backgroundColor: '#FAF7F2' }}
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-3xl tracking-[0.2em] uppercase text-charcoal hover:text-gold transition-colors"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 300,
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                onClick={() => {
                  setMobileOpen(false);
                  onBookingOpen();
                }}
                className="mt-4 px-8 py-3 border border-gold text-gold tracking-[0.15em] uppercase text-sm rounded-full hover:bg-gold hover:text-charcoal transition-all"
                style={{ fontFamily: 'var(--font-body)' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                data-cursor="button"
              >
                Book Appointment →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
