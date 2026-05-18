'use client';

import { useState, useEffect } from 'react';

/* ──────────────────────────────────────────────
   Preloader — CSS-Only (Zero Framer Motion)
   
   Pure CSS animations eliminate ~45KB gzip of
   Framer Motion from the critical rendering path.
   Visually identical slide-up exit with falling
   leaves, candle flame, and brand reveal.
   ────────────────────────────────────────────── */

export default function Preloader() {
  const [phase, setPhase] = useState<'show' | 'exit' | 'done'>('show');

  useEffect(() => {
    // Reduced from 2800ms → 1200ms for dramatically better LCP
    const exitTimer = setTimeout(() => setPhase('exit'), 1200);
    const doneTimer = setTimeout(() => setPhase('done'), 1900); // 1200 + 700ms slide
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <>
      <style>{`
        .preloader-wrap {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background-color: #F8F4F1; overflow: hidden;
        }
        .preloader-wrap.exit {
          animation: preloader-up 0.7s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        @keyframes preloader-up {
          to { transform: translateY(-100%); }
        }

        /* Candle flame */
        .pl-candle { opacity: 0; animation: pl-fade-in 0.5s 0.1s ease forwards; }
        @keyframes pl-fade-in { to { opacity: 1; } }
        .pl-flame-svg { animation: pl-flicker 2s ease-in-out infinite alternate; }
        @keyframes pl-flicker {
          0%, 100% { transform: scaleY(1) scaleX(1); }
          25% { transform: scaleY(1.04) scaleX(0.96); }
          50% { transform: scaleY(0.96) scaleX(1.03); }
          75% { transform: scaleY(1.02) scaleX(0.98); }
        }
        .pl-flame-draw {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: pl-draw 1s 0.2s ease-in-out forwards;
        }
        @keyframes pl-draw { to { stroke-dashoffset: 0; } }
        .pl-flame-glow { opacity: 0; animation: pl-glow 0.6s 0.6s ease forwards; }
        @keyframes pl-glow { to { opacity: 0.3; } }

        /* Brand name */
        .pl-brand {
          margin-top: 32px; letter-spacing: 0.3em; text-transform: uppercase;
          font-family: var(--font-display); font-style: italic;
          color: #DDB7AF; font-weight: 300; font-size: var(--text-3xl);
          opacity: 0; transform: translateY(16px);
          animation: pl-brand-in 0.7s 0.5s var(--ease-smooth, ease) forwards;
        }
        @keyframes pl-brand-in { to { opacity: 1; transform: translateY(0); } }

        /* Line sweep */
        .pl-line {
          margin-top: 24px; height: 1px; width: 0;
          background: linear-gradient(90deg, transparent, #DDB7AF, transparent);
          animation: pl-line-grow 0.5s 0.85s ease-out forwards;
        }
        @keyframes pl-line-grow { to { width: 180px; } }

        /* Subtitle */
        .pl-sub {
          margin-top: 16px; letter-spacing: 0.5em; text-transform: uppercase;
          color: #5E7465; font-family: var(--font-body);
          font-size: var(--text-xs); opacity: 0;
          animation: pl-fade-in 0.5s 1s ease forwards;
        }

        /* Falling leaves — CSS only */
        .pl-leaf {
          position: absolute; top: -20px; width: 16px; height: 16px;
          opacity: 0;
          animation: pl-fall 2.5s ease-in-out forwards;
        }
        @keyframes pl-fall {
          0%   { opacity: 0; transform: translateY(-20px) rotate(0deg); }
          15%  { opacity: 0.7; }
          85%  { opacity: 0.7; }
          100% { opacity: 0; transform: translateY(100vh) rotate(360deg); }
        }
      `}</style>

      <div className={`preloader-wrap ${phase === 'exit' ? 'exit' : ''}`} aria-hidden="true">
        {/* Falling leaves — 5 instead of 8 for perf */}
        {[15, 30, 50, 70, 85].map((x, i) => (
          <div
            key={i}
            className="pl-leaf"
            style={{ left: `${x}%`, animationDelay: `${0.2 + i * 0.15}s` }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C12 2 4 8 4 14C4 18 7 22 12 22C17 22 20 18 20 14C20 8 12 2 12 2Z" fill="#DDB7AF" opacity="0.35" />
              <path d="M12 6C12 6 8 10 8 14C8 16.5 9.5 19 12 19C14.5 19 16 16.5 16 14C16 10 12 6 12 6Z" fill="#DDB7AF" opacity="0.55" />
            </svg>
          </div>
        ))}

        {/* Candle */}
        <div className="pl-candle">
          <svg width="40" height="60" viewBox="0 0 40 60" fill="none" className="pl-flame-svg">
            <path
              className="pl-flame-draw"
              d="M20 5C20 5 8 20 8 32C8 40 13 45 20 45C27 45 32 40 32 32C32 20 20 5 20 5Z"
              stroke="#DDB7AF" strokeWidth="1.5"
            />
            <path
              className="pl-flame-glow"
              d="M20 15C20 15 14 25 14 32C14 37 16.5 40 20 40C23.5 40 26 37 26 32C26 25 20 15 20 15Z"
              fill="#E8C6C1"
            />
            <line x1="20" y1="45" x2="20" y2="55" stroke="#2B2B2B" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <div className="pl-brand">SPA VIBE</div>
        <div className="pl-line" />
        <p className="pl-sub">Sanctuary of Serenity</p>
      </div>
    </>
  );
}
