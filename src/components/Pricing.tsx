'use client';

import { motion } from 'framer-motion';

const packages = [
  {
    name: 'Signature Ritual',
    duration: '60 min',
    price: '₹999',
    features: [
      'Full body massage',
      'Aromatherapy oils',
      'Hot towel treatment',
      'Relaxation lounge access',
    ],
    popular: false,
  },
  {
    name: 'Royal Indulgence',
    duration: '90 min',
    price: '₹1499',
    features: [
      'Deep tissue + Swedish blend',
      'Premium essential oils',
      'Face massage included',
      'Herbal tea ceremony',
      'Personalized consultation',
    ],
    popular: true,
  },
  {
    name: 'The Ark Experience',
    duration: '120 min',
    price: '₹1999',
    features: [
      'Full body + face + head massage',
      'Body scrub exfoliation',
      'Hot stone therapy',
      'Premium aromatherapy',
      'Private suite',
      'Complimentary refreshments',
    ],
    popular: false,
  },
];

const individualTreatments = [
  { name: 'Hair Spa (Soft Mind)', duration: '60 min', price: '₹499' },
  { name: 'Hair Spa (Full Mind)', duration: '90 min', price: '₹799' },
  { name: 'Body Massage (Mini)', duration: '60 min', price: '₹699' },
  { name: 'Body Massage (Full)', duration: '90 min', price: '₹999' },
  { name: 'Face Massage', duration: '50 min', price: '₹599' },
  { name: 'Couple Massage', duration: '90 min', price: '₹2499' },
  { name: 'Foot Massage', duration: '45 min', price: '₹399' },
];

export default function Pricing({
  onBookingOpen,
}: {
  onBookingOpen: () => void;
}) {
  return (
    <section
      id="pricing"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #F5F0E8 0%, #FAF7F2 50%, #F5F0E8 100%)',
      }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full border border-gold/5 pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full border border-gold/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-16"
        >
          <span
            className="text-xs tracking-[0.4em] uppercase block mb-4"
            style={{
              color: '#C9A96E',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
            }}
          >
            Transparent Pricing
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              color: '#1C1A18',
            }}
          >
            Choose Your{' '}
            <span style={{ color: '#C9A96E', fontStyle: 'italic' }}>
              Ritual
            </span>
          </h2>
        </motion.div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.12,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              whileHover={{
                y: -6,
                boxShadow: '0 20px 40px rgba(201,169,110,0.15)',
              }}
              className={`relative rounded-2xl p-8 md:p-10 border transition-all duration-500 ${
                pkg.popular
                  ? 'bg-gradient-to-b from-[#C9A96E]/10 to-[#FAF7F2] border-gold/40 scale-[1.02] md:scale-105'
                  : 'bg-white border-gold/10 hover:border-gold/30'
              }`}
            >
              {/* Gold accent top border */}
              <div
                className="absolute top-0 left-8 right-8 h-[2px]"
                style={{
                  background: pkg.popular
                    ? 'linear-gradient(90deg, transparent, #C9A96E, transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(201,169,110,0.3), transparent)',
                }}
              />

              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="px-4 py-1 bg-gold text-charcoal text-[10px] tracking-[0.2em] uppercase rounded-full"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="text-center">
                <h3
                  className="text-2xl md:text-3xl mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    color: '#1C1A18',
                  }}
                >
                  {pkg.name}
                </h3>
                <span
                  className="text-xs tracking-[0.2em] uppercase"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    color: '#8A9B6E',
                  }}
                >
                  {pkg.duration}
                </span>

                <div className="my-6">
                  <span
                    className="text-5xl md:text-6xl"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      color: '#C9A96E',
                    }}
                  >
                    {pkg.price}
                  </span>
                </div>

                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          stroke="#C9A96E"
                          strokeWidth="1"
                        />
                        <path
                          d="M5 8l2 2 4-4"
                          stroke="#C9A96E"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className="text-sm"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontWeight: 300,
                          color: '#1C1A18',
                          opacity: 0.65,
                        }}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={onBookingOpen}
                  className={`w-full py-3 rounded-full text-sm tracking-[0.15em] uppercase transition-all duration-500 ${
                    pkg.popular
                      ? 'bg-gold text-charcoal hover:bg-gold-light shadow-lg shadow-gold/20'
                      : 'border border-gold/40 text-gold hover:bg-gold hover:text-charcoal'
                  }`}
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                  data-cursor="button"
                >
                  Book Now →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Individual Treatments */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        >
          <h3
            className="text-center text-2xl md:text-3xl mb-8"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              color: '#1C1A18',
            }}
          >
            Individual Treatments
          </h3>

          <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl border border-gold/10 overflow-hidden">
            {individualTreatments.map((treatment, i) => (
              <div
                key={treatment.name}
                className={`flex items-center justify-between px-6 md:px-8 py-4 ${
                  i !== individualTreatments.length - 1
                    ? 'border-b border-gold/5'
                    : ''
                } hover:bg-gold/5 transition-colors duration-300`}
              >
                <div>
                  <span
                    className="text-base"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      color: '#1C1A18',
                    }}
                  >
                    {treatment.name}
                  </span>
                  <span
                    className="text-xs tracking-[0.1em] uppercase ml-3"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      color: '#1C1A18',
                      opacity: 0.4,
                    }}
                  >
                    {treatment.duration}
                  </span>
                </div>
                <span
                  className="text-lg"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    color: '#C9A96E',
                  }}
                >
                  {treatment.price}
                </span>
              </div>
            ))}
          </div>

          <p
            className="text-center mt-8 text-sm"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              color: '#1C1A18',
              opacity: 0.5,
            }}
          >
            Discover true relaxation at The Ark. Enjoy our head, body, and face treatments,
            <br className="hidden md:block" />
            crafted to nurture your body, mind, and soul.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
