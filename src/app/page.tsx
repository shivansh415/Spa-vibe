import ClientSections from '@/components/ClientSections';
import Footer from '@/components/footer/Footer';
import { siteConfig } from '@/config/site';

/* ──────────────────────────────────────────────
   Homepage — Server Component
   
   SSR-visible content provides semantic HTML
   for crawlers. Footer is a Server Component
   (zero JS). Interactive sections load via
   ClientSections.
   ────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* ── SSR-visible SEO content for crawlers ── */}
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

      {/* ── Footer — Server Component (zero JS) ── */}
      <Footer />
    </>
  );
}
