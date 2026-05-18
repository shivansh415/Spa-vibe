import ClientSections from '@/components/ClientSections';

/* ──────────────────────────────────────────────
   Homepage — Server Component
   
   This is a SERVER component (no 'use client').
   Google crawlers receive the static SEO content
   below. The noscript block provides the only H1
   for non-JS crawlers. Interactive sections load
   via the ClientSections wrapper (ssr: false).
   ────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* ── SSR-visible SEO content for crawlers ──
          Uses semantic HTML that crawlers can index.
          Not aria-hidden so screen readers can use it
          as fallback content during loading. */}
      <div className="sr-only">
        <h2>Best Luxury Spa &amp; Massage Center in Indore</h2>
        <p>
          Welcome to Spa Vibe, the premier luxury spa in Indore, Madhya Pradesh.
          We offer premium body massage, couple spa packages, aromatherapy,
          professional facial treatments, deep tissue massage, and holistic
          wellness therapies. Our certified therapists deliver the best spa
          experience near Choithram Circle, Vijay Nagar, and across Indore.
        </p>
        <address>
          Spa Vibe — G-01, Ground Floor, Samiksh Landmark, Choithram Circle,
          Choithram Mandi, Indore, Madhya Pradesh 452012.
          Phone: +91-9755500377 | Hours: Mon–Sun 10:30 AM – 11:30 PM
        </address>
      </div>

      {/* ── Interactive client-side sections ── */}
      <ClientSections />
    </>
  );
}
