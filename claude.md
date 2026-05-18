# SPA VIBE — claude.md

## Project Overview
**Project Name:** SPA VIBE  
**Framework:** Next.js 16 (App Router, SPA)  
**Tech Stack:** React 19, Framer Motion, Tailwind CSS 4, next/image, next/font  
**Design Vibe:** Premium luxury spa — serene, warm, editorial, refined, light theme  
**Goal:** High-end spa website with booking flow → WhatsApp CTA

---

## You Are
You are an **Awwwards Hall of Fame web developer** — top 1% globally in UI/UX design and frontend engineering. You have shipped 100+ award-winning websites. You obsess over every pixel, every easing curve, every font pairing. You build for performance AND beauty simultaneously. Your work makes people say "how did they do that?" You don't use templates. You design and engineer from pure creative instinct backed by technical mastery.

---

## Design Direction

### Aesthetic
- **Premium luxury spa** — calming, refined, minimal, high-end
- Warm cream/ivory (`#FBF8F3`) base, soft charcoal (`#2C2824`), muted gold accent (`#C4A265`), sage green (`#8E9E78`)
- Typography: `Cormorant Garamond` for display headings (elegant, editorial), `DM Sans` for body (clean, modern)
- Textures: subtle paper grain overlay, soft warm gradients
- Motion: slow, deliberate — like breathing. Nothing jarring. Fade-in-up on scroll, staggered reveals
- Mood: peaceful, premium, healing, modern luxury
- **LIGHT THEME ONLY** — soft beige, warm white, cream, subtle gold accents

### Color Palette (CSS Variables)
```css
--cream: #FBF8F3;
--charcoal: #2C2824;
--gold: #C4A265;
--gold-light: #D9C28E;
--gold-dark: #A88B4A;
--sage: #8E9E78;
--warm-white: #F5F0E6;
--deep-brown: #3D2B1F;
--beige: #EDE6DA;
--ivory: #FDFBF7;
--mist: rgba(251, 248, 243, 0.92);
--rose-mist: #F0E4DC;
```

### Typography
```js
// next/font
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300','400','500','600','700'], style: ['normal','italic'] })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300','400','500'] })
```

---

## File Structure
```
spa-site/
├── app/
│   ├── layout.tsx          ← Root layout, fonts, metadata
│   ├── page.tsx            ← Main page (all sections)
│   └── globals.css         ← Global styles, CSS vars, animations
├── components/
│   ├── Preloader.tsx       ← Creative preloader with candle+leaf animation
│   ├── Cursor.tsx          ← Custom glowing cursor
│   ├── Navbar.tsx          ← Transparent → solid on scroll, logo + nav + CTA
│   ├── Hero.tsx            ← Full-screen hero with local video background
│   ├── VideoSection.tsx    ← Cinematic video showcase section
│   ├── Services.tsx        ← Services grid
│   ├── Pricing.tsx         ← Pricing cards
│   ├── About.tsx           ← Philosophy section with quote
│   ├── Gallery.tsx         ← Masonry photo gallery with lightbox
│   ├── Testimonials.tsx    ← Customer reviews carousel
│   ├── BookingModal.tsx    ← Full booking flow modal → WhatsApp
│   ├── SmoothScroll.tsx    ← Lenis smooth scrolling wrapper
│   └── Footer.tsx          ← Rich footer with contact info
├── config/
│   └── site.ts             ← Central site configuration (branding, contact, media)
├── utils/
│   └── whatsapp.ts         ← WhatsApp booking integration
├── public/
│   └── homebg.mp4          ← Local hero/background video
└── package.json
```

---

## Branding & Contact

### Brand Name
**SPA VIBE** (used everywhere throughout the site)

### Contact Details
```
Contact for Appointments:
+91-9755500377
+91-9755507408
```

### Location
```
G-01, Ground Floor, Samiksh Landmark, Choithram Circle, 
Choithram Mandi, Indore, Madhya Pradesh 452012
```

### WhatsApp Number
`919755500377` (primary, country code included, no plus sign)

### Hours
Mon–Sat 10AM–7PM

---

## Section-by-Section Specs

### 1. Preloader (`Preloader.tsx`)
- **Background:** Cream `#FBF8F3`
- Animated candle flame SVG + falling sakura leaves
- "SPA VIBE" fades in with golden sweep line
- Duration: 2.8 seconds, slides up on exit

### 2. Custom Cursor (`Cursor.tsx`)
- Small dot (6px, gold) + larger ring (32px, gold border)
- Ring expands on button/link hover, crosshair on images
- Hidden on touch devices

### 3. Navbar (`Navbar.tsx`)
- Transparent → cream backdrop-blur on scroll
- Logo: "SPA VIBE" in Cormorant Garamond with lotus SVG icon
- Nav links: About | Services | Treatments | Gallery
- CTA: "Book Appointment →"
- Mobile: hamburger → full-screen overlay

### 4. Hero (`Hero.tsx`)
- Full viewport with local video (`/homebg.mp4`)
- Smooth fade-in on video load (no flicker)
- "Discover Pure Tranquility" heading
- CTA buttons: "Book Your Session" + "Explore Services"
- Stats strip: 13K+ Clients | 4.9★ Rating | 5K+ Treatments | Since 2015
- Marquee scrolling strip with hours and features

### 5. About (`About.tsx`)
- Split layout: editorial text + image collage
- Quote: "At SPA VIBE, we create moments of care, comfort, and renewal."
- Stats: 98% Satisfaction | 5K+ Treatments | 4.9/5 Rating

### 6. Video Section (`VideoSection.tsx`)
- Local video with play/pause toggle
- Side panel with descriptive text
- "A Sanctuary For Your Senses" heading

### 7. Services (`Services.tsx`)
- 15 services in 3-column grid (show 6, expand to all)
- Service cards with hover effects and "Book Now" CTA
- Images from Unsplash

### 8. Pricing (`Pricing.tsx`)
- 3 tiers: Signature Ritual (₹999) | Royal Indulgence (₹1499) | The Vibe Experience (₹1999)
- Individual treatments list below
- Middle card highlighted as "Most Popular"

### 9. Gallery (`Gallery.tsx`)
- Masonry grid with 12 images
- Hover overlay with labels
- Lightbox with navigation

### 10. Testimonials (`Testimonials.tsx`)
- Auto-sliding carousel with 5 testimonials
- Star ratings, quotes, attribution
- Dark background for contrast

### 11. BookingModal (`BookingModal.tsx`)
- 5-step flow: Service → Date → Time → Details → Confirm via WhatsApp
- Calendar with Mon-Sat only (no Sundays)
- Sends formatted message to WhatsApp

### 12. Footer (`Footer.tsx`)
- Dark background with brand, links, contact info
- Shows both phone numbers with "Contact for Appointments" label
- Full address with Google Maps link
- Social links: Instagram, Facebook, WhatsApp

---

## Performance & Optimization
- Video: locally hosted (`/homebg.mp4`) with `preload="auto"` and smooth fade-in
- Images: `next/image` with `loading="lazy"` and proper `sizes` prop
- Fonts: `next/font/google` with `display: swap`
- Smooth scrolling: Lenis library
- Animations: Framer Motion with `viewport={{ once: true }}`
- Build: Next.js 16 Turbopack

---

## Critical Rules
1. **Brand name is SPA VIBE** — never "The Ark"
2. **Light theme only** — no dark mode
3. **Every hover state** must feel intentional and premium
4. **Mobile-first** responsive design
5. **Booking modal** is the #1 priority — must work flawlessly
6. **WhatsApp number:** `919755500377`
7. **Contact phones:** `+91-9755500377` and `+91-9755507408`
8. **Address:** G-01, Ground Floor, Samiksh Landmark, Choithram Circle, Choithram Mandi, Indore, Madhya Pradesh 452012
9. **Cursor** disabled on touch devices
10. **All configuration** centralized in `src/config/site.ts`

---

*This file is the single source of truth for the SPA VIBE website build.*
