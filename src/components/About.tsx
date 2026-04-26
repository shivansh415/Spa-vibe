'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const statsData = [
  { value: '98%', label: 'Customer Satisfaction' },
  { value: '5K+', label: 'Annual Treatments' },
  { value: '4.9/5', label: 'Excellence Rating' },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FAF7F2 0%, #F0E8D8 100%)',
      }}
    >
      {/* Decorative botanical elements */}
      <div className="absolute top-20 right-10 opacity-[0.06] pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="#C9A96E" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" stroke="#C9A96E" strokeWidth="0.5" />
          <path
            d="M100 20C100 20 60 60 60 100C60 130 75 160 100 180C125 160 140 130 140 100C140 60 100 20 100 20Z"
            stroke="#C9A96E"
            strokeWidth="0.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span
            className="text-xs tracking-[0.4em] uppercase"
            style={{ color: '#C9A96E', fontFamily: 'var(--font-body)', fontWeight: 400 }}
          >
            Our Philosophy
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Editorial Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div
              variants={fadeUp}
              className="mb-8"
            >
              <h2
                className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-2"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  color: '#1C1A18',
                }}
              >
                Where Beauty
              </h2>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  color: '#C9A96E',
                }}
              >
                Meets Nature
              </h2>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              variants={fadeUp}
              className="relative pl-6 border-l-2 border-gold/30 mb-10"
            >
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: '#3D2B1F',
                  opacity: 0.8,
                }}
              >
                &ldquo;Everyone deserves a place to find their inner peace. At The Ark, we create
                moments of care, comfort, and renewal.&rdquo;
              </p>
              <footer
                className="mt-4 text-sm tracking-[0.15em] uppercase"
                style={{ fontFamily: 'var(--font-body)', color: '#C9A96E' }}
              >
                — The Founder
              </footer>
            </motion.blockquote>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed mb-10"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                color: '#1C1A18',
                opacity: 0.65,
              }}
            >
              We blend expert massage therapy with rejuvenating beauty treatments to create a
              true sanctuary of relaxation. As a leading spa experience, we invite you to discover
              ancient healing traditions fused with modern luxury.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-4"
            >
              {statsData.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-4 text-center border border-gold/10"
                >
                  <div
                    className="text-2xl md:text-3xl mb-1"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      color: '#C9A96E',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-[10px] tracking-[0.15em] uppercase"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 400,
                      color: '#1C1A18',
                      opacity: 0.5,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Large image */}
              <div className="col-span-2 relative h-[300px] md:h-[380px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=800&q=80"
                  alt="Spa flowers and towels"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
              </div>
              {/* Two smaller images */}
              <div className="relative h-[200px] md:h-[240px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&q=80"
                  alt="Candle ambience"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-[200px] md:h-[240px] rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80"
                  alt="Aromatherapy"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>

            {/* Floating decorative card */}
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-lg rounded-xl p-5 shadow-xl shadow-charcoal/5 border border-gold/10"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                className="text-xs tracking-[0.2em] uppercase mb-1"
                style={{ fontFamily: 'var(--font-body)', color: '#8A9B6E' }}
              >
                Our Philosophy
              </div>
              <div
                className="text-sm"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  color: '#1C1A18',
                }}
              >
                Crafted For Calm
              </div>
              <div
                className="text-xs mt-1"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 300,
                  color: '#1C1A18',
                  opacity: 0.6,
                }}
              >
                We create space to breathe.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
