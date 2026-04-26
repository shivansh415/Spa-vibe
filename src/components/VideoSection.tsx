'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error('Video play interrupted or failed:', error);
              setIsPlaying(false);
            });
        } else {
          setIsPlaying(true);
        }
      }
    }
  };

  return (
    <section className="relative py-24 md:py-32 bg-charcoal overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(201,169,110,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(138,155,110,0.1) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          className="text-center mb-16"
        >
          <span
            className="text-xs tracking-[0.4em] uppercase block mb-4"
            style={{ color: '#C9A96E', fontFamily: 'var(--font-body)' }}
          >
            Experience The Ambience
          </span>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#FAF7F2',
            }}
          >
            A Sanctuary For
            <br />
            <span style={{ color: '#C9A96E' }}>Your Senses</span>
          </h2>
        </motion.div>

        {/* Video area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Main Video */}
          <div className="relative aspect-[16/10] md:aspect-auto md:h-[450px] rounded-2xl overflow-hidden group">
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              poster={siteConfig.media.secondaryVideoPoster}
            >
              <source
                src={siteConfig.media.secondaryVideoUrl}
                type="video/mp4"
              />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-charcoal/30 group-hover:bg-charcoal/20 transition-all duration-500" />

            {/* Play button */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center z-10"
              data-cursor="button"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              <div className="relative">
                {/* Pulse rings */}
                <div className="absolute inset-0 rounded-full border border-gold/30 animate-pulse-ring" />
                <div
                  className="absolute inset-0 rounded-full border border-gold/20 animate-pulse-ring"
                  style={{ animationDelay: '0.5s' }}
                />

                {/* Button */}
                <div className="relative w-20 h-20 rounded-full border-2 border-gold/60 flex items-center justify-center bg-charcoal/40 backdrop-blur-sm group-hover:bg-gold/20 transition-all duration-500">
                  {isPlaying ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#C9A96E"
                    >
                      <rect x="6" y="4" width="4" height="16" rx="1" />
                      <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="#C9A96E"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </div>
              </div>
            </button>

            {/* Caption */}
            <div className="absolute bottom-6 left-6 z-10">
              <span
                className="text-sm tracking-[0.15em] uppercase"
                style={{ color: '#C9A96E', fontFamily: 'var(--font-body)' }}
              >
                Deep Tissue Therapy
              </span>
            </div>
          </div>

          {/* Side panel with text */}
          <div className="bg-deep-brown/50 backdrop-blur-sm rounded-2xl p-8 md:p-10 flex flex-col justify-center border border-gold/10 h-full">
            <div
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: '#8A9B6E', fontFamily: 'var(--font-body)' }}
            >
              Soft Moments
            </div>
            <p
              className="text-lg md:text-xl leading-relaxed mb-6 flex-1"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                color: '#FAF7F2',
                opacity: 0.9,
              }}
            >
              We blend expert massage therapy with rejuvenating beauty treatments to create a
              true sanctuary of relaxation. We invite you to experience the art of healing.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-gold/40" />
              <span
                className="text-xs tracking-[0.2em] uppercase"
                style={{ color: '#C9A96E', fontFamily: 'var(--font-body)' }}
              >
                Ancient wisdom, modern luxury
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
