'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const services = [
  {
    name: 'Body Spa',
    description:
      'A rejuvenating full-body treatment that exfoliates, hydrates, and revitalizes your skin, leaving it soft, smooth, and glowing.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
  },
  {
    name: 'Body Massage',
    description:
      'Therapeutic and deeply relaxing, our massage services relieve tension, improve circulation, and restore harmony to body and mind.',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80',
  },
  {
    name: 'Swedish Massage',
    description:
      'A classic full-body massage using long, flowing strokes to improve circulation, ease tension, and promote deep relaxation.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
  },
  {
    name: 'Balinese Massage',
    description:
      'An indulgent fusion of gentle stretches, acupressure, and aromatherapy to bring balance to body and mind.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
  },
  {
    name: 'Aroma Massage',
    description:
      'A sensory delight combining essential oils with gentle massage techniques to uplift mood and calm the nervous system.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  },
  {
    name: 'Deep Tissue Massage',
    description:
      'Ideal for chronic pain and tension, this massage targets deeper muscle layers to release knots and restore flexibility.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
  },
  {
    name: 'Healing Touch Massage',
    description:
      'An intuitive energy-based therapy designed to reduce stress, support healing, and restore natural energy flow.',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80',
  },
  {
    name: 'Lomi Lomi Massage',
    description:
      'A traditional Hawaiian healing practice using rhythmic, wave-like strokes for deep relaxation and emotional release.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
  },
  {
    name: 'Relax Signature Massage',
    description:
      'Our exclusive blend of techniques tailored to your needs — experience ultimate relaxation, our signature way.',
    image: 'https://images.unsplash.com/photo-1561457013-a8b23513739a?w=600&q=80',
  },
  {
    name: 'Couple Massage',
    description:
      'Share the serenity with a loved one — two therapists, side by side, in a private setting to unwind together.',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80',
  },
  {
    name: 'Four Hand Massage',
    description:
      'Two therapists work in perfect harmony for a deeply immersive experience that relaxes body and mind in sync.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
  },
  {
    name: 'Foot Massage',
    description:
      'A soothing treatment targeting reflex points in your feet to relieve stress and restore energy throughout the body.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
  },
  {
    name: 'Hair Spa',
    description:
      'Indulge in a rejuvenating journey — our Hair Spa treatment restores every strand, leaving hair deeply nourished and silky.',
    image: 'https://images.unsplash.com/photo-1611073613226-e6c8b9a37990?w=600&q=80',
  },
  {
    name: 'Face Massage',
    description:
      'A refreshing treatment that enhances your natural glow, combining soothing techniques that restore and elevate your complexion.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
  },
  {
    name: 'Facial & Skin Treatments',
    description:
      'Advanced skincare rituals combining premium products with expert techniques for radiant, youthful, and healthy skin.',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80',
  },
];

export default function Services({
  onBookingOpen,
}: {
  onBookingOpen: () => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const displayedServices = showAll ? services : services.slice(0, 6);

  return (
    <section
      id="services"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: '#FAF7F2' }}
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10">
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
            Chosen For Your Comfort
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              color: '#1C1A18',
            }}
          >
            Our Soft{' '}
            <span style={{ color: '#C9A96E', fontStyle: 'italic' }}>
              Services
            </span>
          </h2>
          <p
            className="mt-4 text-base max-w-xl mx-auto"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              color: '#1C1A18',
              opacity: 0.55,
            }}
          >
            Explore best spa and massage services crafted to nurture your body,
            mind, and soul.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedServices.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                delay: (i % 3) * 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              whileHover={{
                y: -8,
                boxShadow: '0 24px 48px rgba(201,169,110,0.15)',
              }}
              className="group relative bg-white rounded-xl overflow-hidden border border-transparent hover:border-gold/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-[280px] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Book Now CTA on hover */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <button
                    onClick={onBookingOpen}
                    className="w-full py-2.5 bg-gold/90 backdrop-blur-sm text-charcoal text-xs tracking-[0.2em] uppercase rounded-lg hover:bg-gold transition-colors"
                    style={{ fontFamily: 'var(--font-body)', fontWeight: 500 }}
                    data-cursor="button"
                  >
                    Book Now
                  </button>
                </div>

                {/* Small logo badge */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2C12 2 6 8 6 14C6 18 8.5 22 12 22C15.5 22 18 18 18 14C18 8 12 2 12 2Z"
                      stroke="#C9A96E"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <h3
                  className="text-xl md:text-2xl mb-2"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    color: '#1C1A18',
                  }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 300,
                    color: '#1C1A18',
                    opacity: 0.55,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show All / Show Less */}
        {services.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 border border-gold/40 text-gold text-sm tracking-[0.15em] uppercase rounded-full hover:bg-gold hover:text-charcoal transition-all duration-500"
              style={{ fontFamily: 'var(--font-body)', fontWeight: 400 }}
              data-cursor="button"
            >
              {showAll ? 'Show Less' : `View All ${services.length} Services`}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
