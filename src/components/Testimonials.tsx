'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Ananya Sharma',
    treatment: 'Swedish Massage',
    rating: 5,
    quote:
      'An absolutely divine experience. From the moment I walked in, the ambience transported me to a place of pure tranquility. My therapist was incredibly skilled. I left feeling reborn.',
  },
  {
    name: 'Rahul Verma',
    treatment: 'Deep Tissue Massage',
    rating: 5,
    quote:
      'Best massage I\'ve ever had. The deep tissue work really helped with my chronic back pain. The staff is professional and the environment is world-class. Highly recommend.',
  },
  {
    name: 'Priya Patel',
    treatment: 'Couple Massage',
    rating: 5,
    quote:
      'My husband and I had the most wonderful time. The couple massage was perfectly synchronized. The private suite was beautifully decorated. An unforgettable anniversary experience.',
  },
  {
    name: 'Vikram Singh',
    treatment: 'The Ark Experience',
    rating: 5,
    quote:
      'Worth every rupee. The 120-minute Ark Experience is a complete journey of relaxation. The hot stone therapy combined with aromatherapy is pure bliss. I\'m now a regular.',
  },
  {
    name: 'Meera Joshi',
    treatment: 'Facial Treatment',
    rating: 5,
    quote:
      'My skin has never looked better. The facial treatment used premium products and the results were visible immediately. The spa environment is so calming — true luxury.',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [nextTestimonial]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
    }),
  };

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#1C1A18' }}
    >
      {/* Background decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-10 right-10 text-[200px] md:text-[300px] leading-none"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            color: 'rgba(201,169,110,0.03)',
          }}
        >
          &ldquo;
        </div>
        <div
          className="absolute bottom-10 left-10 text-[200px] md:text-[300px] leading-none rotate-180"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            color: 'rgba(201,169,110,0.03)',
          }}
        >
          &ldquo;
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-10 relative z-10">
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
            What Clients Say
          </span>
          <h2
            className="text-4xl md:text-5xl"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              color: '#FAF7F2',
            }}
          >
            Words of{' '}
            <span style={{ color: '#C9A96E', fontStyle: 'italic' }}>
              Serenity
            </span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-center px-4"
          >
            {/* Quote mark */}
            <div
              className="text-6xl md:text-7xl mb-6 leading-none"
              style={{
                fontFamily: 'var(--font-display)',
                color: '#C9A96E',
                opacity: 0.3,
              }}
            >
              &ldquo;
            </div>

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <svg
                  key={i}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="#C9A96E"
                >
                  <path d="M8 1l2.2 4.4L15 6.3l-3.5 3.4.8 4.8L8 12.2 3.7 14.5l.8-4.8L1 6.3l4.8-.9L8 1z" />
                </svg>
              ))}
            </div>

            {/* Quote text */}
            <p
              className="text-lg md:text-xl lg:text-2xl leading-relaxed mb-8 max-w-2xl mx-auto"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#FAF7F2',
                opacity: 0.85,
              }}
            >
              {testimonials[current].quote}
            </p>

            {/* Author */}
            <div>
              <div
                className="text-base tracking-[0.1em]"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  color: '#FAF7F2',
                }}
              >
                {testimonials[current].name}
              </div>
              <div
                className="text-xs tracking-[0.2em] uppercase mt-1"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: '#C9A96E',
                  opacity: 0.7,
                }}
              >
                {testimonials[current].treatment}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold/50 transition-all duration-300"
            data-cursor="button"
            aria-label="Previous testimonial"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`transition-all duration-300 rounded-full ${
                  i === current
                    ? 'w-6 h-2 bg-gold'
                    : 'w-2 h-2 bg-gold/20 hover:bg-gold/40'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold/50 transition-all duration-300"
            data-cursor="button"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
