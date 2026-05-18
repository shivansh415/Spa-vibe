'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '@/config/site';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Lazy-load map — avoids SSR crash with mapbox-gl
const LuxuryMap = dynamic(() => import('./LuxuryMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center"
      style={{ background: 'var(--color-cream)' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="enquiry-spinner" />
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-stone)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '14px' }}>
          Loading Map
        </p>
      </div>
    </div>
  ),
});

const WHATSAPP_NUMBER = '919755500377';

export default function EnquirySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const [form, setForm]       = useState({ name: '', phone: '', date: '', message: '' });
  const [focused, setFocused] = useState<string | null>(null);

  /* ── GSAP Scroll Reveal ── */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 88%', once: true },
        }
      );

      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -50, scale: 0.97 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 50, scale: 0.97 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Build WhatsApp message
    const lines = [
      `✨ *New Booking Request — SPA VIBE*`,
      ``,
      `👤 *Name:* ${form.name}`,
      `📞 *Phone:* ${form.phone}`,
      `📅 *Preferred Date:* ${form.date}`,
    ];
    if (form.message.trim()) {
      lines.push(`💬 *Message:* ${form.message}`);
    }
    lines.push(``, `Sent via spavibe.in`);

    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  const getInputStyle = (name: string): React.CSSProperties => ({
    ...inputBase,
    ...(focused === name ? inputFocused : {}),
  });

  return (
    <>
      <style>{`
        .enquiry-spinner {
          width: 32px; height: 32px;
          border: 2px solid rgba(221,183,175,0.25);
          border-top-color: var(--color-rose);
          border-radius: 50%;
          animation: enquiry-spin 0.9s linear infinite;
          margin: 0 auto;
        }
        @keyframes enquiry-spin { to { transform: rotate(360deg); } }

        .reserve-btn {
          position: relative; overflow: hidden; cursor: pointer;
        }
        .reserve-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          opacity: 0; transition: opacity 0.3s ease;
        }
        .reserve-btn:hover::before { opacity: 1; }
        .reserve-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(221,183,175,0.3) !important; }
        .reserve-btn:active { transform: translateY(0); }

        .map-glow-wrap:hover { box-shadow: 0 0 50px rgba(221,183,175,0.12), 0 20px 50px rgba(43,43,43,0.08) !important; }

        input[type="date"]::-webkit-calendar-picker-indicator { filter: none; cursor: pointer; }
      `}</style>

      <section
        ref={sectionRef}
        id="book-session"
        aria-label="Book a spa session at Spa Vibe, Indore"
        style={{
          background: 'linear-gradient(180deg, var(--color-linen) 0%, var(--color-cream) 100%)',
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(60px, 8vw, 120px) 0',
        }}
      >
        {/* ── Subtle ambient glows ── */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 60% 50% at 20% 30%, rgba(221,183,175,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 80% 70%, rgba(94,116,101,0.05) 0%, transparent 70%)
          `,
        }} />

        {/* ── Decorative top border ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(221,183,175,0.35) 30%, rgba(221,183,175,0.5) 50%, rgba(221,183,175,0.35) 70%, transparent 100%)',
        }} />

        <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 60px)' }}>

          {/* ── Section heading ── */}
          <div ref={headingRef} style={{ textAlign: 'center', marginBottom: 'clamp(40px, 5vw, 70px)', opacity: 0 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 400,
              letterSpacing: '0.35em', textTransform: 'uppercase',
              color: 'var(--color-forest)', marginBottom: '18px',
            }}>
              <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--color-rose)' }} />
              Reserve Your Experience
              <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--color-rose)' }} />
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 400,
              fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
              color: 'var(--color-charcoal)', lineHeight: 1.1, letterSpacing: '-0.01em',
              margin: 0,
            }}>
              Begin Your Journey
              <br />
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--color-rose)' }}>
                to Serenity
              </span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '14px',
              color: 'var(--color-warm-gray)', marginTop: '14px', letterSpacing: '0.02em',
            }}>
              Fill in your details and we&apos;ll craft a bespoke session just for you.
            </p>
          </div>

          {/* ── Two-column grid ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: 'clamp(20px, 3vw, 40px)',
            alignItems: 'start',
          }}>

            {/* ════ LEFT — Map ════ */}
            <div ref={leftRef} style={{ opacity: 0 }}>
              {/* Info strip above map */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {[
                  { icon: '📍', label: 'Find Us', value: 'Spa Vibes, Indore' },
                  { icon: '🕐', label: 'Hours', value: siteConfig.contact.hours },
                ].map((info) => (
                  <div key={info.label} style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: 'rgba(255,255,255,0.6)',
                    borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(221,183,175,0.2)',
                    borderRadius: '12px', padding: '10px 14px', flex: '1 1 180px',
                    backdropFilter: 'blur(8px)',
                  }}>
                    <span style={{ fontSize: '16px' }}>{info.icon}</span>
                    <div>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-stone)', margin: '0 0 2px' }}>
                        {info.label}
                      </p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 400, color: 'var(--color-charcoal)', margin: 0 }}>
                        {info.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map container */}
              <div
                className="map-glow-wrap"
                style={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  height: 'clamp(340px, 45vw, 560px)',
                  borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(221,183,175,0.2)',
                  boxShadow: '0 16px 50px rgba(43,43,43,0.06)',
                  transition: 'box-shadow 0.4s ease',
                  position: 'relative',
                }}
              >
                <LuxuryMap />

                {/* Corner badge */}
                <a
                  href="https://maps.app.goo.gl/hgC7fQsgnHErYmB1A"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: 'absolute', bottom: '14px', right: '14px', zIndex: 10,
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(12px)',
                    borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(221,183,175,0.25)',
                    borderRadius: '10px',
                    padding: '8px 14px',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 400,
                    color: 'var(--color-charcoal)', textDecoration: 'none',
                    letterSpacing: '0.06em',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <span>Open in Maps</span>
                  <span style={{ fontSize: '10px', color: 'var(--color-rose)' }}>↗</span>
                </a>
              </div>

              {/* Contact quick links */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
                {siteConfig.contact.phones.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 400,
                      color: 'var(--color-warm-gray)', textDecoration: 'none',
                      background: 'rgba(255,255,255,0.5)',
                      borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(221,183,175,0.2)',
                      borderRadius: '10px', padding: '8px 12px',
                      transition: 'color 0.2s ease, border-color 0.2s ease',
                      flex: '1 1 140px',
                    }}
                  >
                    <span style={{ fontSize: '13px' }}>📞</span> {phone}
                  </a>
                ))}
              </div>
            </div>

            {/* ════ RIGHT — Enquiry Form ════ */}
            <div ref={rightRef} style={{ opacity: 0 }}>
              <div style={{
                background: 'rgba(255,255,255,0.55)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(221,183,175,0.2)',
                borderRadius: '28px',
                padding: 'clamp(28px, 4vw, 50px)',
                boxShadow: '0 20px 60px rgba(43,43,43,0.05), inset 0 1px 0 rgba(255,255,255,0.6)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Glass inner top accent */}
                <div style={{
                  position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
                  background: 'linear-gradient(90deg, transparent, rgba(221,183,175,0.5), transparent)',
                }} />

                {/* Form header */}
                <div style={{ marginBottom: '28px' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 400,
                    fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)',
                    color: 'var(--color-charcoal)', margin: '0 0 8px', letterSpacing: '-0.01em',
                  }}>
                    Book Your Session
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontWeight: 300, fontSize: '12px',
                    color: 'var(--color-stone)', margin: 0, letterSpacing: '0.04em',
                  }}>
                    We&apos;ll connect with you on WhatsApp to confirm.
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Name */}
                  <div style={{ marginBottom: '14px' }}>
                    <label htmlFor="enquiry-name" style={labelStyle}>Full Name</label>
                    <input
                      id="enquiry-name"
                      name="name" type="text" required placeholder="Your name"
                      value={form.name} onChange={handleChange}
                      onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                      style={getInputStyle('name')}
                    />
                  </div>

                  {/* Phone */}
                  <div style={{ marginBottom: '14px' }}>
                    <label htmlFor="enquiry-phone" style={labelStyle}>Phone Number</label>
                    <input
                      id="enquiry-phone"
                      name="phone" type="tel" required placeholder="+91 XXXXX XXXXX"
                      value={form.phone} onChange={handleChange}
                      onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)}
                      style={getInputStyle('phone')}
                    />
                  </div>

                  {/* Date */}
                  <div style={{ marginBottom: '14px' }}>
                    <label htmlFor="enquiry-date" style={labelStyle}>Preferred Date</label>
                    <input
                      id="enquiry-date"
                      name="date" type="date" required
                      value={form.date} onChange={handleChange}
                      onFocus={() => setFocused('date')} onBlur={() => setFocused(null)}
                      style={getInputStyle('date')}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: '24px' }}>
                    <label htmlFor="enquiry-message" style={labelStyle}>Message <span style={{ color: 'var(--color-stone)' }}>(optional)</span></label>
                    <textarea
                      id="enquiry-message"
                      name="message" rows={3} placeholder="Any special requests or health notes..."
                      value={form.message} onChange={handleChange}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                      style={{ ...getInputStyle('message'), resize: 'none' as const, lineHeight: 1.65 }}
                    />
                  </div>

                  {/* Submit — WhatsApp redirect */}
                  <button
                    type="submit"
                    className="reserve-btn"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, var(--color-charcoal) 0%, #3D2B1F 100%)',
                      borderWidth: 0, borderStyle: 'none', borderColor: 'transparent',
                      borderRadius: '14px',
                      padding: '16px 24px',
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      fontSize: '12.5px',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase' as const,
                      color: 'var(--color-linen)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 8px 24px rgba(43,43,43,0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                  >
                    <span>Reserve Your Escape</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.8 }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill="currentColor"/>
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 01-4.243-1.214l-.257-.154-2.876.854.854-2.876-.154-.257A8 8 0 1112 20z" fill="currentColor"/>
                    </svg>
                  </button>

                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 300,
                    color: 'var(--color-stone)', textAlign: 'center', marginTop: '14px',
                    letterSpacing: '0.02em',
                  }}>
                    You&apos;ll be redirected to WhatsApp with your booking details.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Shared styles ── */
const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontSize: '10px',
  fontWeight: 400,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--color-warm-gray)',
  marginBottom: '6px',
};

const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.5)',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgba(221,183,175,0.25)',
  borderRadius: '12px',
  padding: '13px 16px',
  fontFamily: 'var(--font-body)',
  fontSize: '13px',
  fontWeight: 300,
  color: 'var(--color-charcoal)',
  outline: 'none',
  transition: 'border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
  appearance: 'none' as const,
};

const inputFocused: React.CSSProperties = {
  background: 'rgba(255,255,255,0.8)',
  borderColor: 'rgba(221,183,175,0.6)',
  boxShadow: '0 0 0 3px rgba(221,183,175,0.1)',
};
