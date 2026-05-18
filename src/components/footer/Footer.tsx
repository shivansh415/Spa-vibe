'use client';

import Image from 'next/image';
import { siteConfig } from '@/config/site';

const WA_NUMBER = siteConfig.contact.whatsappNumber;
const CURRENT_YEAR = new Date().getFullYear();

/* ── Social SVGs ── */
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
);
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
);

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-social-link {
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(221,183,175,0.08);
          border: 1px solid rgba(221,183,175,0.15);
          color: var(--color-warm-gray);
          transition: all 0.3s ease;
          text-decoration: none;
        }
        .footer-social-link:hover {
          color: var(--color-rose);
          background: rgba(221,183,175,0.16);
          border-color: rgba(221,183,175,0.35);
          transform: translateY(-2px);
        }
        .footer-link {
          color: var(--color-warm-gray);
          text-decoration: none;
          transition: color 0.3s ease;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 300;
          letter-spacing: 0.02em;
          line-height: 1.8;
        }
        .footer-link:hover { color: var(--color-rose); }
      `}</style>

      <footer
        id="contact"
        style={{
          background: 'var(--color-charcoal)',
          color: 'var(--color-cream)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ── Subtle top border glow ── */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(221,183,175,0.3) 50%, transparent 100%)',
        }} />

        {/* ── Main content ── */}
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          padding: 'clamp(48px, 6vw, 80px) clamp(20px, 5vw, 60px) clamp(24px, 3vw, 40px)',
        }}>

          {/* ── Top row: Logo + Info columns ── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(32px, 4vw, 56px)',
            marginBottom: 'clamp(40px, 5vw, 64px)',
          }}>

            {/* ── Column 1: Logo + Brand ── */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                <Image
                  src="/logo.png"
                  alt="Spa Vibe Logo"
                  width={44}
                  height={58}
                  style={{ objectFit: 'contain', filter: 'brightness(1.1)', width: 'auto' }}
                />
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: '18px',
                    fontWeight: 400, letterSpacing: '0.12em',
                    textTransform: 'uppercase', color: 'var(--color-cream)',
                    lineHeight: 1.1,
                  }}>
                    Spa Vibe
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: '9px',
                    fontWeight: 300, letterSpacing: '0.25em',
                    textTransform: 'uppercase', color: 'rgba(221,183,175,0.6)',
                    marginTop: '3px',
                  }}>
                    {siteConfig.tagline}
                  </div>
                </div>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '13px',
                fontWeight: 300, color: 'rgba(248,244,241,0.5)',
                lineHeight: 1.75, maxWidth: '280px', letterSpacing: '0.01em',
              }}>
                A sanctuary crafted for stillness, renewal, and the art of feeling alive.
              </p>
            </div>

            {/* ── Column 2: Visit Us ── */}
            <div>
              <h4 style={{
                fontFamily: 'var(--font-display)', fontSize: '13px',
                fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--color-rose)', marginBottom: '18px',
              }}>
                Visit Us
              </h4>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: '13px',
                fontWeight: 300, color: 'rgba(248,244,241,0.65)',
                lineHeight: 1.8, letterSpacing: '0.01em', maxWidth: '260px',
              }}>
                {siteConfig.contact.address}
              </p>
              <a
                href={siteConfig.contact.googleMapsUrl}
                target="_blank" rel="noopener noreferrer"
                className="footer-link"
                style={{ display: 'inline-block', marginTop: '10px', color: 'var(--color-rose)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase' }}
              >
                Open in Maps &rarr;
              </a>
            </div>

            {/* ── Column 3: Contact + Hours ── */}
            <div>
              <h4 style={{
                fontFamily: 'var(--font-display)', fontSize: '13px',
                fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--color-rose)', marginBottom: '18px',
              }}>
                Get in Touch
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {siteConfig.contact.phones.map((phone) => (
                  <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="footer-link" style={{ color: 'rgba(248,244,241,0.65)' }}>
                    {phone}
                  </a>
                ))}
              </div>

              <div style={{
                marginTop: '20px',
                padding: '12px 16px',
                background: 'rgba(221,183,175,0.06)',
                borderRadius: '10px',
                borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(221,183,175,0.1)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '9px',
                  fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: 'rgba(221,183,175,0.5)', marginBottom: '4px',
                }}>
                  Working Hours
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '13px',
                  fontWeight: 300, color: 'rgba(248,244,241,0.7)',
                  letterSpacing: '0.02em',
                }}>
                  {siteConfig.contact.hours}
                </div>
              </div>
            </div>
          </div>

          {/* ── Divider ── */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(221,183,175,0.15) 30%, rgba(221,183,175,0.15) 70%, transparent 100%)',
            marginBottom: 'clamp(20px, 3vw, 32px)',
          }} />

          {/* ── Bottom row: Copyright + Socials ── */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '11px',
              fontWeight: 300, color: 'rgba(248,244,241,0.35)',
              letterSpacing: '0.04em', margin: 0,
            }}>
              &copy; {CURRENT_YEAR} Spa Vibe. All rights reserved.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href={siteConfig.socials.facebook} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
