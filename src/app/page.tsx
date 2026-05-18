import ClientSections from '@/components/ClientSections';

/* ──────────────────────────────────────────────
   Homepage — Server Component
   
   This is a SERVER component (no 'use client').
   Google crawlers and SSR receive the static
   SEO content below. Interactive sections are
   loaded via the ClientSections wrapper.
   ────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      {/* ── SSR-visible SEO content for crawlers ── */}
      <div className="sr-only" aria-hidden="false">
        <h1>Spa Vibe — Best Luxury Spa & Massage Center in Indore</h1>
        <p>
          Welcome to Spa Vibe, the premier luxury spa in Indore, Madhya Pradesh.
          We offer premium body massage, couple spa packages, aromatherapy,
          professional facial treatments, deep tissue massage, and holistic
          wellness therapies. Our certified therapists deliver the best spa
          experience near Choithram Circle, Vijay Nagar, and across Indore.
        </p>
        <address>
          G-01, Ground Floor, Samiksh Landmark, Choithram Circle,
          Choithram Mandi, Indore, Madhya Pradesh 452012.
          Phone: +91-9755500377 | Hours: Mon–Sun 10:30 AM – 11:30 PM
        </address>
      </div>

      {/* ── Interactive client-side sections ── */}
      <ClientSections />
    </>
  );
}
