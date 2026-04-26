'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    alt: 'Relaxing massage therapy',
    label: 'Massage Therapy',
    span: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80',
    alt: 'Facial treatment',
    label: 'Facial Treatment',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
    alt: 'Hot stone therapy',
    label: 'Hot Stones',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
    alt: 'Aromatherapy oils',
    label: 'Aromatherapy',
    span: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    alt: 'Face massage',
    label: 'Face Massage',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&q=80',
    alt: 'Candle ambience',
    label: 'Ambience',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=800&q=80',
    alt: 'Spa flowers',
    label: 'Botanicals',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    alt: 'Spa interior',
    label: 'Our Space',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?w=600&q=80',
    alt: 'Relaxing bath',
    label: 'Bath Ritual',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
    alt: 'Foot massage',
    label: 'Foot Therapy',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80',
    alt: 'Couple spa',
    label: 'Couple Spa',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1561457013-a8b23513739a?w=600&q=80',
    alt: 'Body scrub',
    label: 'Body Scrub',
    span: '',
  },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#FAF7F2' }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-gold/50" />
            <span
              className="text-xs tracking-[0.4em] uppercase"
              style={{
                color: '#C9A96E',
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
              }}
            >
              Visual Journey
            </span>
            <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-gold/50" />
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl tracking-[0.05em]"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              color: '#1C1A18',
              letterSpacing: '0.1em',
            }}
          >
            MOMENTS OF{' '}
            <span style={{ color: '#C9A96E', fontStyle: 'italic' }}>
              BLISS
            </span>
          </h2>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {galleryImages.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                delay: (i % 3) * 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="gallery-item relative overflow-hidden rounded-xl group break-inside-avoid cursor-pointer"
              onClick={() => setLightboxIndex(i)}
              data-cursor="image"
            >
              <div
                className={`relative ${
                  i % 5 === 0 ? 'h-[350px] md:h-[450px]' : 'h-[220px] md:h-[300px]'
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-all duration-500 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center">
                    <span
                      className="text-lg tracking-[0.1em]"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 400,
                        color: 'white',
                      }}
                    >
                      {img.label}
                    </span>
                    <div className="mt-2 text-[10px] tracking-[0.3em] uppercase text-white/60">
                      View
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-charcoal/90 backdrop-blur-md"
              onClick={() => setLightboxIndex(null)}
            />

            {/* Image */}
            <motion.div
              className="relative z-10 max-w-4xl max-h-[85vh] w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <div className="relative h-[60vh] md:h-[80vh] rounded-xl overflow-hidden">
                <Image
                  src={galleryImages[lightboxIndex].src}
                  alt={galleryImages[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Caption */}
              <div className="text-center mt-4">
                <span
                  className="text-sm tracking-[0.15em] uppercase"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: '#C9A96E',
                  }}
                >
                  {galleryImages[lightboxIndex].label}
                </span>
              </div>

              {/* Navigation */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      lightboxIndex === 0
                        ? galleryImages.length - 1
                        : lightboxIndex - 1
                    );
                  }}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                  data-cursor="button"
                >
                  ←
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      lightboxIndex === galleryImages.length - 1
                        ? 0
                        : lightboxIndex + 1
                    );
                  }}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                  data-cursor="button"
                >
                  →
                </button>
              </div>

              {/* Close */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-12 right-0 text-white/60 hover:text-white text-sm tracking-[0.15em] uppercase transition-colors"
                style={{ fontFamily: 'var(--font-body)' }}
                data-cursor="button"
              >
                Close ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
