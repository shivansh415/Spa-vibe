'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const IMAGES = [
  { src: '/spavibe1.jpg',                        alt: 'Premium body massage therapy at Spa Vibe in Indore',           label: 'Our Signature'  },
  { src: '/spavibe2.jpg',                        alt: 'Luxury relaxing spa treatment at best spa in Indore',         label: 'Pure Bliss'     },
  { src: '/spavibe3.jpg',                        alt: 'Deep tissue massage session at Spa Vibe wellness center',     label: 'Deep Restore'   },
  { src: '/spavibe4.jpg',                        alt: 'Tranquil couple spa moment at Spa Vibe Indore',               label: 'Serenity'       },
  { src: '/images/gallery/gallery-facial.jpg',   alt: 'Professional facial therapy treatment at luxury spa in Indore', label: 'Glow Ritual'    },
  { src: '/images/gallery/gallery-candles.jpg',  alt: 'Aromatherapy candles at Spa Vibe premium spa Indore',          label: 'Ambiance'       },
  { src: '/images/gallery/gallery-interior.jpg', alt: 'Elegant spa treatment room interior at Spa Vibe Indore',       label: 'The Sanctuary'  },
  { src: '/images/gallery/gallery-oils.jpg',     alt: 'Essential aromatherapy oils at wellness spa in Indore',        label: 'Essence'        },
  { src: '/images/gallery/gallery-towels.jpg',   alt: 'Luxury spa towels and amenities at Spa Vibe',                  label: 'Pure Comfort'   },
];

const DESKTOP_HEIGHTS = [
  'clamp(380px,34vw,500px)', 'clamp(240px,22vw,310px)', 'clamp(300px,27vw,390px)',
  'clamp(420px,38vw,540px)', 'clamp(260px,24vw,340px)', 'clamp(360px,32vw,460px)',
  'clamp(300px,28vw,400px)', 'clamp(240px,22vw,310px)', 'clamp(380px,34vw,500px)',
];

export default function GallerySection() {
  const headingRef     = useRef<HTMLDivElement>(null);
  const desktopRef     = useRef<HTMLDivElement>(null);
  const mobilePinRef   = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* ── Heading reveal (all breakpoints) ── */
    const headingCtx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 88%', once: true } }
      );
    });

    /* ── Desktop masonry animations ── */
    let desktopCtx: gsap.Context | null = null;
    if (window.innerWidth >= 768) {
      desktopCtx = gsap.context(() => {
        const cards = desktopRef.current?.querySelectorAll<HTMLElement>('.g-card');
        if (cards?.length) {
          gsap.fromTo(cards,
            { opacity: 0, y: 55, scale: 0.96 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 0.9, ease: 'power3.out', stagger: 0.1,
              scrollTrigger: { trigger: desktopRef.current, start: 'top 80%', once: true },
            }
          );
          cards.forEach((card) => {
            const inner = card.querySelector<HTMLElement>('.g-inner');
            if (!inner) return;
            gsap.fromTo(inner, { y: '-7%' }, {
              y: '7%', ease: 'none',
              scrollTrigger: { trigger: card, scrub: 1.8, start: 'top bottom', end: 'bottom top' },
            });
          });
        }
      });
    }

    /* ── Mobile horizontal scroll ── */
    let mobileScrollTrigger: ScrollTrigger | null = null;

    const setupMobileScroll = () => {
      if (window.innerWidth >= 768) return;

      const pin   = mobilePinRef.current;
      const track = mobileTrackRef.current;
      if (!pin || !track) return;

      // Kill any existing instance before recreating
      mobileScrollTrigger?.kill();

      // The distance to travel = total track width minus one viewport width
      const dist = track.scrollWidth - window.innerWidth;
      if (dist <= 0) return;

      gsap.set(track, { x: 0 }); // reset position

      mobileScrollTrigger = ScrollTrigger.create({
        trigger: pin,
        pin: true,
        pinSpacing: true,
        scrub: 1.4,
        start: 'top top',
        end: `+=${dist}`,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        animation: gsap.to(track, {
          x: -dist,
          ease: 'none',
          duration: 1,  // duration is irrelevant when scrub is true
        }),
      });
    };

    // Small delay to let images / fonts settle before measuring
    const timer = setTimeout(() => {
      setupMobileScroll();
      ScrollTrigger.refresh();
    }, 300);

    // Recalculate on resize / orientation change
    const handleResize = () => {
      clearTimeout(timer);
      setTimeout(() => {
        mobileScrollTrigger?.kill();
        setupMobileScroll();
        ScrollTrigger.refresh();
      }, 200);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      headingCtx.revert();
      desktopCtx?.revert();
      mobileScrollTrigger?.kill();
    };
  }, []);

  return (
    <>
      <style>{`
        /* ── Desktop card ── */
        .g-card { position:relative; overflow:hidden; border-radius:16px; cursor:pointer; opacity:0; }
        .g-inner { position:relative; width:100%; height:110%; top:-5%; transition:transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
        .g-card:hover .g-inner { transform:scale(1.06); }
        .g-overlay { position:absolute; inset:0; background:linear-gradient(to top,rgba(45,38,30,0.42) 0%,transparent 55%); opacity:0; transition:opacity 0.5s ease; border-radius:16px; }
        .g-card:hover .g-overlay { opacity:1; }
        .g-label { position:absolute; bottom:18px; left:20px; font-family:var(--font-display); font-size:12px; font-weight:400; letter-spacing:0.16em; text-transform:uppercase; color:rgba(255,255,255,0.9); opacity:0; transform:translateY(8px); transition:all 0.4s ease 0.05s; }
        .g-card:hover .g-label { opacity:1; transform:translateY(0); }

        /* ── Mobile card ── */
        .g-card-m { flex-shrink:0; width:clamp(190px,58vw,270px); height:clamp(280px,75vw,420px); border-radius:20px; overflow:hidden; position:relative; box-shadow:0 6px 28px rgba(45,38,30,0.10); }
        .g-inner-m { position:relative; width:100%; height:100%; }
        .g-overlay-m { position:absolute; inset:0; background:linear-gradient(to top,rgba(45,38,30,0.38) 0%,transparent 60%); border-radius:20px; }
        .g-label-m { position:absolute; bottom:14px; left:16px; font-family:var(--font-display); font-size:10px; font-weight:400; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.88); }

        /* Responsive show/hide */
        @media (min-width:768px) { .mobile-gallery { display:none !important; } }
        @media (max-width:767px) { .desktop-gallery { display:none !important; } }
      `}</style>

      <section id="gallery" aria-label="Spa Vibe gallery — luxury spa moments in Indore" style={{ background: 'var(--color-cream)', position: 'relative' }}>

        {/* ── Heading ── */}
        <div ref={headingRef} style={{
          textAlign: 'center', opacity: 0,
          padding: 'clamp(60px,8vw,100px) clamp(16px,4vw,60px) clamp(36px,5vw,64px)',
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '14px',
            fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 400,
            letterSpacing: '0.38em', textTransform: 'uppercase', color: 'var(--color-forest)',
            marginBottom: '18px',
          }}>
            <span style={{ display:'block', width:'36px', height:'1px', background:'var(--color-rose)' }} />
            Gallery
            <span style={{ display:'block', width:'36px', height:'1px', background:'var(--color-rose)' }} />
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'clamp(2.2rem,5vw,4.5rem)', color: 'var(--color-charcoal)',
            letterSpacing: '0.06em', lineHeight: 1.05, margin: '0 0 16px', textTransform: 'uppercase',
          }}>
            Moments of{' '}
            <em style={{ fontStyle:'italic', fontWeight:200, color:'var(--color-rose)' }}>Bliss</em>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 'clamp(13px,1.2vw,15px)',
            fontWeight: 300, color: 'var(--color-warm-gray)',
            maxWidth: '520px', margin: '0 auto', lineHeight: 1.75, letterSpacing: '0.02em',
          }}>
            Every moment at Spa Vibe is designed to restore peace, beauty, and balance — your premier luxury spa experience in Indore.
          </p>
        </div>

        {/* ══ DESKTOP — 3-col masonry ══ */}
        <div className="desktop-gallery" ref={desktopRef} style={{
          maxWidth: '1400px', margin: '0 auto',
          padding: '0 clamp(20px,4vw,60px) clamp(60px,8vw,100px)',
          columns: '3', columnGap: '16px',
        }}>
          {IMAGES.map((img, i) => (
            <div key={i} className="g-card" style={{
              breakInside: 'avoid', marginBottom: '16px',
              height: DESKTOP_HEIGHTS[i],
              boxShadow: '0 4px 20px rgba(45,38,30,0.07)',
            }}>
              <div className="g-inner">
                <Image src={img.src} alt={img.alt} fill
                  style={{ objectFit:'cover' }} sizes="33vw" />
              </div>
              <div className="g-overlay" />
              <span className="g-label">{img.label}</span>
            </div>
          ))}
        </div>

        {/* ══ MOBILE — Pinned horizontal scroll ══
            
            mobilePinRef  → gets pinned to viewport top, height = 100svh
              mobileTrackRef → flex row, width = max-content, slides left via GSAP
        */}
        <div
          className="mobile-gallery"
          ref={mobilePinRef}
          style={{
            height: '100svh',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <div
            ref={mobileTrackRef}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '14px',
              paddingLeft: '20px',
              paddingRight: '40px',  /* extra right breathing room */
              width: 'max-content',
              willChange: 'transform',
            }}
          >
            {IMAGES.map((img, i) => (
              <div key={i} className="g-card-m">
                <div className="g-inner-m">
                  <Image src={img.src} alt={img.alt} fill
                    style={{ objectFit:'cover' }} sizes="270px" />
                </div>
                <div className="g-overlay-m" />
                <span className="g-label-m">{img.label}</span>
              </div>
            ))}
          </div>
        </div>

      </section>
    </>
  );
}
