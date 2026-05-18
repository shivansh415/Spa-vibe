'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { siteConfig } from '@/config/site';
import { ease } from '@/lib/motion';
import { useBodyScrollLock } from '@/lib/hooks';

/* ─────────────────────────────────────
   Constants
───────────────────────────────────── */
const SCROLL_THRESHOLD = 40;
const NAVBAR_OFFSET    = 80;   // px offset to clear the floating bar
const WA_LINK = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent('Hi! I\u2019d like to reserve a spa session at Spa Vibe. \uD83C\uDF3F')}`;

/* Nav items pulled from single source of truth */
const NAV_ITEMS = siteConfig.navigation;

/* Section IDs to track for active highlighting */
const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace('#', ''));

/* ─────────────────────────────────────
   Smooth scroll with navbar offset
   Compatible with Lenis smooth scroll
───────────────────────────────────── */
function scrollToSection(href: string) {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (!el) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // Use Lenis if available for consistency
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -NAVBAR_OFFSET, duration: 1.2 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/* ─────────────────────────────────────
   Hamburger icon
───────────────────────────────────── */
const Hamburger = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="lg:hidden relative z-[60] flex flex-col items-center justify-center w-10 h-10 focus:outline-none"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
  >
    <motion.span
      className="block h-[1.5px] rounded-full bg-charcoal"
      style={{ backgroundColor: 'var(--color-charcoal)' }}
      animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0, width: isOpen ? 20 : 24 }}
      transition={{ duration: 0.35, ease: ease.smooth }}
    />
    <motion.span
      className="block h-[1.5px] rounded-full mt-[5px]"
      style={{ backgroundColor: 'var(--color-charcoal)', width: 16 }}
      animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? 10 : 0 }}
      transition={{ duration: 0.25, ease: ease.smooth }}
    />
    <motion.span
      className="block h-[1.5px] rounded-full mt-[5px]"
      style={{ backgroundColor: 'var(--color-charcoal)' }}
      animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0, width: isOpen ? 20 : 18 }}
      transition={{ duration: 0.35, ease: ease.smooth }}
    />
  </button>
);

/* ─────────────────────────────────────
   Desktop nav link with active state
───────────────────────────────────── */
const NavLink = ({
  label, href, active, onClick,
}: {
  label: string; href: string; active: boolean; onClick?: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={() => { scrollToSection(href); onClick?.(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative py-2 bg-transparent border-0 cursor-pointer"
      style={{ outline: 'none' }}
    >
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '12px', fontWeight: 400,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: active ? 'var(--color-rose)' : 'var(--color-charcoal)',
          transition: 'color 0.3s ease',
        }}
      >
        {label}
      </span>
      {/* Animated underline */}
      <motion.span
        className="absolute bottom-0 left-0 h-[1px] rounded-full"
        style={{ backgroundColor: 'var(--color-rose)' }}
        initial={{ width: '0%' }}
        animate={{ width: (hovered || active) ? '100%' : '0%' }}
        transition={{ duration: 0.32, ease: ease.smooth }}
      />
    </button>
  );
};

/* ─────────────────────────────────────
   Mobile slide-in menu
───────────────────────────────────── */
const MobileMenu = ({
  isOpen, onClose, activeSection,
}: {
  isOpen: boolean; onClose: () => void; activeSection: string;
}) => {
  useBodyScrollLock(isOpen);

  const handleLink = useCallback((href: string) => {
    onClose();  // close menu first
    setTimeout(() => {
      scrollToSection(href);  // then scroll after close animation
    }, 280);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[45]"
            style={{ backgroundColor: 'rgba(43,43,43,0.08)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed inset-y-0 right-0 z-[50] w-full max-w-[360px] flex flex-col"
            style={{ backgroundColor: '#F8F4F1' }}
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ duration: 0.48, ease: ease.smooth }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 pt-7 pb-4">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="Spa Vibe" width={32} height={42}
                  style={{ objectFit: 'contain', width: 'auto' }} />
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: '16px',
                  fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'var(--color-charcoal)',
                }}>
                  {siteConfig.brandShortName}
                </span>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'rgba(43,43,43,0.06)', margin: '0 28px' }} />

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-7 gap-1">
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <motion.button
                    key={item.label}
                    onClick={() => handleLink(item.href)}
                    className="group flex items-center justify-between py-4 bg-transparent border-0 cursor-pointer text-left"
                    style={{
                      borderBottom: '1px solid rgba(43,43,43,0.04)',
                      outline: 'none',
                    }}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: ease.smooth }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 400,
                      letterSpacing: '0.04em',
                      color: isActive ? 'var(--color-rose)' : 'var(--color-charcoal)',
                      transition: 'color 0.3s ease',
                    }}>
                      {item.label}
                    </span>
                    <span style={{
                      fontSize: '12px', opacity: 0.35,
                      color: 'var(--color-charcoal)',
                      transform: 'translateX(0)',
                      transition: 'transform 0.3s ease',
                    }}>
                      →
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Bottom CTA */}
            <div className="px-7 pb-8">
              <motion.a
                href={WA_LINK}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-full text-[12px] tracking-[0.14em] uppercase"
                style={{
                  fontFamily: 'var(--font-body)', fontWeight: 500,
                  backgroundColor: 'var(--color-charcoal)', color: 'var(--color-linen)',
                  textDecoration: 'none',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: ease.smooth }}
                whileTap={{ scale: 0.97 }}
                onClick={onClose}
              >
                Reserve Now
              </motion.a>
              <motion.p
                className="text-center mt-3 text-[11px] tracking-[0.06em]"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--color-warm-gray)', opacity: 0.65 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.52, duration: 0.4 }}
              >
                {siteConfig.contact.phones[0]} · {siteConfig.contact.hours}
              </motion.p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/* ══════════════════════════════════════════════
   NAVBAR — Main Component
══════════════════════════════════════════════ */
export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* Scroll state for background transition */
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > SCROLL_THRESHOLD);
  });

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const options: IntersectionObserverInit = {
      rootMargin: `-${NAVBAR_OFFSET}px 0px -55% 0px`,
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current!.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  /* Close mobile on desktop resize */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[50] flex justify-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: ease.smooth }}
      >
        <motion.nav
          className="relative flex items-center justify-between w-full mx-4 md:mx-6 lg:mx-8 transition-all duration-500"
          style={{ maxWidth: '1400px' }}
          animate={{
            height: scrolled ? 60 : 72,
            marginTop: scrolled ? 12 : 20,
            borderRadius: 16,
            backgroundColor: scrolled ? 'rgba(248,244,241,0.82)' : 'rgba(248,244,241,0)',
            backdropFilter: scrolled ? 'blur(24px)' : 'blur(0px)',
            boxShadow: scrolled ? '0 4px 30px rgba(43,43,43,0.07)' : '0 0px 0px rgba(0,0,0,0)',
            paddingLeft: scrolled ? 20 : 20,
            paddingRight: scrolled ? 20 : 20,
          }}
          transition={{ duration: 0.45, ease: ease.smooth }}
        >
          {/* ── Logo ── */}
          <button
            className="flex items-center gap-2 group bg-transparent border-0 cursor-pointer"
            style={{ outline: 'none' }}
            onClick={() => scrollToSection('#home')}
            aria-label="Scroll to top"
          >
            <Image
              src="/logo.png" alt="Spa Vibe"
              width={32} height={42}
              style={{ objectFit: 'contain', width: 'auto', filter: 'none' }}
            />
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(14px,1.2vw,17px)',
              fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--color-charcoal)',
            }}>
              {siteConfig.brandShortName}
            </span>
          </button>

          {/* ── Center Nav (desktop) ── */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.label}
                label={item.label}
                href={item.href}
                active={activeSection === item.href.replace('#', '')}
              />
            ))}
          </div>

          {/* ── Right: CTA + Hamburger ── */}
          <div className="flex items-center gap-3">
            <motion.a
              href={WA_LINK}
              target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex items-center rounded-full"
              style={{
                fontFamily: 'var(--font-body)', fontWeight: 500,
                fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase',
                padding: '10px 22px',
                backgroundColor: 'var(--color-charcoal)',
                color: 'var(--color-linen)',
                textDecoration: 'none',
              }}
              whileHover={{ backgroundColor: '#3D2B1F', y: -1, boxShadow: '0 8px 24px rgba(43,43,43,0.15)' }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.28, ease: ease.smooth }}
            >
              Reserve Now
            </motion.a>

            <Hamburger isOpen={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
          </div>
        </motion.nav>
      </motion.header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
