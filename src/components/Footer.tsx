'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/config/site';

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
];

const socialLinks = [
  { label: 'Instagram', icon: 'M7.8 2h8.4C19 2 22 5 22 7.8v8.4A5.8 5.8 0 0116.2 22H7.8C5 22 2 19 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 110 10 5 5 0 010-10m0 2a3 3 0 100 6 3 3 0 000-6z', href: siteConfig.socials.instagram },
  { label: 'Facebook', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', href: siteConfig.socials.facebook },
  { label: 'WhatsApp', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z', href: `https://wa.me/${siteConfig.contact.whatsappNumber}` },
];

export default function Footer({ onBookingOpen }: { onBookingOpen: () => void }) {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: '#1C1A18' }}>
      {/* Decorative botanical SVGs */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-20 right-20 opacity-[0.03] pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
          <path d="M100 10C100 10 50 60 50 110C50 150 70 190 100 190C130 190 150 150 150 110C150 60 100 10 100 10Z" stroke="#C9A96E" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-20 opacity-[0.03] pointer-events-none rotate-45">
        <svg width="150" height="150" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="#C9A96E" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="50" stroke="#C9A96E" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-8">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M16 4C16 4 10 10 10 16C10 20 12.5 24 16 24C19.5 24 22 20 22 16C22 10 16 4 16 4Z" stroke="#C9A96E" strokeWidth="1.2" fill="none" />
              </svg>
              <span className="text-xl tracking-[0.25em] uppercase" style={{ fontFamily: 'var(--font-display)', fontWeight: 400, color: '#FAF7F2' }}>{siteConfig.brandShortName}</span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: '#FAF7F2', opacity: 0.5 }}>
              {siteConfig.seo.description.split('.')[0]}.
            </p>
            <button onClick={onBookingOpen}
              className="px-6 py-2.5 border border-gold/30 text-gold text-xs tracking-[0.15em] uppercase rounded-full hover:bg-gold hover:text-charcoal transition-all duration-500"
              style={{ fontFamily: 'var(--font-body)' }} data-cursor="button">
              Book Now →
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-xs tracking-[0.3em] uppercase mb-6" style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: '#C9A96E' }}>Quick Links</h4>
            <div className="space-y-3">
              {footerLinks.map((link) => (
                <a key={link.label} href={link.href}
                  className="block text-sm hover:text-gold transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(250,247,242,0.5)' }}>
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xs tracking-[0.3em] uppercase mb-6" style={{ fontFamily: 'var(--font-body)', fontWeight: 500, color: '#C9A96E' }}>Contact & Location</h4>
            <div className="space-y-3 mb-6">
              <p className="text-sm flex items-center gap-2" style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(250,247,242,0.8)' }}>
                <span className="opacity-50">📞</span> {siteConfig.contact.phone}
              </p>
              <p className="text-sm flex items-center gap-2" style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(250,247,242,0.8)' }}>
                <span className="opacity-50">🕐</span> {siteConfig.contact.hours}
              </p>
              
              <a href={siteConfig.contact.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-start gap-2 group block">
                <span className="opacity-50 text-sm mt-0.5">📍</span>
                <div>
                  <p className="text-sm group-hover:text-gold transition-colors duration-300" style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(250,247,242,0.8)' }}>
                    {siteConfig.contact.address}
                  </p>
                  <span className="text-[10px] tracking-[0.15em] uppercase text-gold/70 group-hover:text-gold mt-1 block">View on Map →</span>
                </div>
              </a>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-gold/15 flex items-center justify-center hover:bg-gold/10 hover:border-gold/30 transition-all duration-300"
                  data-cursor="button" aria-label={social.label}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(250,247,242,0.3)' }}>
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </p>
          <p className="text-xs" style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'rgba(250,247,242,0.2)' }}>
            {siteConfig.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
