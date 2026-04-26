'use client';

import { motion } from 'framer-motion';

import { siteConfig } from '@/config/site';

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stats = [
  { value: '13K+', label: 'Happy Clients' },
  { value: '4.9★', label: 'Rating' },
  { value: '5K+', label: 'Treatments' },
  { value: 'Since', label: '2015' },
];

const marqueeItems = [
  '✦ MON–SAT: 10 AM – 7 PM',
  '✦ Premium Spa Experience',
  '✦ Japanese & Thai Healing Rituals',
  '✦ Book Your Session Today',
  '✦ MON–SAT: 10 AM – 7 PM',
  '✦ Premium Spa Experience',
  '✦ Japanese & Thai Healing Rituals',
  '✦ Book Your Session Today',
];

export default function Hero({
  onBookingOpen,
}: {
  onBookingOpen: () => void;
}) {
  return (
    <section id="hero" className="relative">
      {/* Video Background */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          poster={siteConfig.media.heroVideoPoster}
        >
          <source
            src={siteConfig.media.heroVideoUrl}
            type="video/mp4"
          />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[rgba(28,26,24,0.50)]" />

        {/* Gradient bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1C1A18]/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {/* Tag */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-8"
            >
              <span
                className="text-sm md:text-base tracking-[0.3em] uppercase"
                style={{
                  color: '#C9A96E',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                }}
              >
                ✦ Premium Spa Experience
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[110px] leading-[0.95] mb-8"
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'white',
              }}
            >
              <span className="block">Golden</span>
              <span className="block">Moments</span>
              <span className="block">Await You</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg max-w-md leading-relaxed mb-10"
              style={{
                color: 'rgba(255,255,255,0.75)',
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
              }}
            >
              Surrender to ancient healing rituals.
              <br />
              Body, mind, and soul — restored.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button
                onClick={onBookingOpen}
                className="px-8 py-3.5 bg-gold text-charcoal text-sm tracking-[0.15em] uppercase rounded-full hover:bg-gold-light transition-all duration-500 shadow-lg shadow-gold/20"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                data-cursor="button"
              >
                Book Your Session →
              </button>
              <a
                href="#services"
                className="px-8 py-3.5 border border-white/30 text-white text-sm tracking-[0.15em] uppercase rounded-full hover:bg-white/10 transition-all duration-500"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
                data-cursor="button"
              >
                Explore Services
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-white/50"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Scroll
          </span>
          <motion.div
            className="w-[1px] h-8 bg-white/30 overflow-hidden"
          >
            <motion.div
              className="w-full bg-gold"
              animate={{ height: ['0%', '100%', '0%'], y: ['0%', '0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ height: '100%' }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee Strip */}
      <div className="bg-warm-white py-4 overflow-hidden border-y border-gold/10">
        <div className="animate-marquee flex items-center gap-12 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="text-sm tracking-[0.15em] uppercase text-charcoal/60 flex-shrink-0"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 300 }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Stats Strip */}
      <div className="bg-gradient-to-r from-warm-white to-cream py-8 md:py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              <div
                className="text-3xl md:text-4xl mb-1"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  color: '#C9A96E',
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-xs tracking-[0.2em] uppercase"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  color: '#1C1A18',
                  opacity: 0.5,
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
