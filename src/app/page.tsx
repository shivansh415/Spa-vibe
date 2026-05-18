import ClientSections from '@/components/ClientSections';
import { siteConfig } from '@/config/site';

/* ──────────────────────────────────────────────
   Homepage — Server Component
   
   This is a SERVER component (no 'use client').
   The SSR-visible content below provides semantic
   HTML, heading hierarchy, and rich text that
   Google crawlers can index. Interactive sections
   load via the ClientSections wrapper (ssr: false).
   ────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* ── SSR-visible SEO content for crawlers ──
          Rendered server-side for Googlebot. Uses semantic
          HTML with a proper heading hierarchy. Visually
          hidden via sr-only so it doesn't conflict with
          the interactive client-rendered design. */}
      <div className="sr-only">
        <h1>Best Luxury Spa &amp; Body Massage in Indore — Spa Vibe</h1>
        <p>
          Welcome to Spa Vibe, the premier luxury spa in Indore, Madhya Pradesh.
          We offer premium body massage, couple spa packages, aromatherapy,
          professional facial treatments, deep tissue massage, and holistic
          wellness therapies. Our certified therapists deliver the best spa
          experience near Choithram Circle, Vijay Nagar, and across Indore.
        </p>

        <h2>Our Premium Spa Services</h2>
        <ul>
          <li>Full Body Massage — Deep relaxation &amp; muscle recovery</li>
          <li>Couple Spa — Romantic side-by-side treatments in a private suite</li>
          <li>Aromatherapy — Essential oil-based holistic healing sessions</li>
          <li>Facial Treatment — Professional skin rejuvenation &amp; glow therapy</li>
          <li>Deep Tissue Massage — Targeted relief for chronic tension</li>
        </ul>

        <h2>Why Choose Spa Vibe?</h2>
        <ul>
          <li>Certified massage therapists trained in international techniques</li>
          <li>Personalized wellness plans tailored to your needs</li>
          <li>Premium organic products and essential oils</li>
          <li>Tranquil, luxurious spa environment in Indore</li>
        </ul>

        <h2>Visit Spa Vibe in Indore</h2>
        <address>
          {siteConfig.contact.address}
        </address>
        <p>
          Phone: {siteConfig.contact.phones.join(' | ')} <br />
          Hours: {siteConfig.contact.hours} <br />
          Email: {siteConfig.contact.email}
        </p>

        <h2>Book Your Spa Session</h2>
        <p>
          Reserve your luxury spa experience at Spa Vibe, Indore.
          No registration required — instant WhatsApp confirmation.
          Call us at {siteConfig.contact.phones[0]} or visit our spa near Choithram Circle.
        </p>

        <nav aria-label="Quick links">
          <a href={`tel:${siteConfig.contact.phones[0].replace(/[\s-]/g, '')}`}>Call Now</a>
          {' | '}
          <a href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}>WhatsApp</a>
          {' | '}
          <a href={siteConfig.contact.googleMapsUrl}>Directions</a>
        </nav>
      </div>

      {/* ── Interactive client-side sections ── */}
      <ClientSections />
    </>
  );
}
