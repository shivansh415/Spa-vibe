# The Ark Spa And Salon — claude.md

## Project Overview
**Project Name:** The Ark Spa And Salon  
**Framework:** Next.js (App Router, already scaffolded as `spa-site`)  
**Tech Stack:** React, Framer Motion, Tailwind CSS, next/image, next/font  
**Design Vibe:** Japan × Thailand luxury spa — serene, warm, editorial, refined  
**Goal:** Jaw-dropping Awwwards-level spa website with full booking flow → WhatsApp CTA

---

## You Are
You are an **Awwwards Hall of Fame web developer** — top 1% globally in UI/UX design and frontend engineering. You have shipped 100+ award-winning websites. You obsess over every pixel, every easing curve, every font pairing. You build for performance AND beauty simultaneously. Your work makes people say "how did they do that?" You don't use templates. You design and engineer from pure creative instinct backed by technical mastery.

---

## Design Direction

### Aesthetic
- **Japan × Thailand luxury fusion** — think Aman Resorts meets Kyoto ryokan
- Warm cream/off-white (`#FAF7F2`) base, deep charcoal (`#1C1A18`), gold accent (`#C9A96E`), sage green (`#8A9B6E`)
- Typography: `Cormorant Garamond` for display headings (elegant, editorial), `DM Sans` for body (clean, modern)
- Textures: subtle rice paper grain overlay, soft warm gradients, bokeh blur effects
- Motion: slow, deliberate — like breathing. Nothing jarring. Parallax scrolling, fade-in-up on scroll, staggered reveals
- Mood: peaceful, premium, healing, ancient wisdom meets modern luxury

### Color Palette (CSS Variables)
```css
--cream: #FAF7F2;
--charcoal: #1C1A18;
--gold: #C9A96E;
--gold-light: #E8D5A3;
--sage: #8A9B6E;
--warm-white: #F5F0E8;
--deep-brown: #3D2B1F;
--mist: rgba(250, 247, 242, 0.85);
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
│   ├── layout.tsx          ← Root layout, fonts, metadata, cursor
│   ├── page.tsx            ← Main page (all sections)
│   └── globals.css         ← Global styles, CSS vars, animations
├── components/
│   ├── Preloader.tsx       ← Creative off-white preloader with candle+leaf animation
│   ├── Cursor.tsx          ← Custom glowing cursor
│   ├── Navbar.tsx          ← Transparent → solid on scroll, logo + nav + CTA
│   ├── Hero.tsx            ← Full-screen hero with video background
│   ├── VideoSection.tsx    ← Cinematic video showcase section
│   ├── Services.tsx        ← Services grid (ref image 4 style)
│   ├── Pricing.tsx         ← Pricing cards with Thailand/Japan aesthetic
│   ├── About.tsx           ← Philosophy section with quote (ref image 3)
│   ├── Gallery.tsx         ← Masonry photo gallery
│   ├── Testimonials.tsx    ← Customer reviews carousel
│   ├── BookingModal.tsx    ← Full booking flow modal
│   └── Footer.tsx          ← Rich footer
├── public/
│   └── (images + videos fetched from Unsplash/Pexels)
└── package.json
```

---

## Section-by-Section Specs

### 1. Preloader (`Preloader.tsx`)
- **Background:** Off-white `#FAF7F2`
- **Animation sequence (Framer Motion):**
  1. A single animated candle flame SVG flickers in (hand-drawn style, gold stroke)
  2. Falling sakura/leaf particles drift down (CSS keyframe animation)
  3. Text: "The Ark Spa & Salon" types/fades in with `Cormorant Garamond` italic, gold color
  4. A horizontal golden line sweeps across
  5. Whole preloader slides up revealing the site (like a curtain lift)
- **Duration:** 2.8 seconds total, then unmounts
- **Performance:** No heavy assets, pure SVG + CSS

```tsx
// Candle SVG animation - flame flickers via SVG path morphing
// Leaf falls via translateY + rotate keyframes
// Exit: y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
```

### 2. Custom Cursor (`Cursor.tsx`)
- Small dot (4px, gold `#C9A96E`) + larger ring (32px, 1px gold border, slight blur)
- Ring follows with lag (spring: stiffness 150, damping 20)
- On hover over buttons/links: ring expands to 60px, fills with gold 20% opacity, text inside says "tap" or "view"
- On hover over images: ring shows crosshair style
- Hidden on mobile (pointer: none)

### 3. Navbar (`Navbar.tsx`)
- **Initial state:** Fully transparent, white text/logo
- **Scrolled state:** Backdrop-blur `blur(20px)`, cream background 85% opacity, dark text
- **Logo:** "THE ARK" in Cormorant Garamond spaced tracking, with a small lotus/leaf SVG icon
- **Nav links:** About | Services | Treatments | Gallery | Pricing
- **CTA Button:** "Book Appointment →" — gold border, gold text, hover: gold fill, dark text. Smooth underline animation on nav links
- **Mobile:** Hamburger → full-screen overlay menu with staggered link animations

### 4. Hero Section (`Hero.tsx`)
- **Full viewport (100vh)**
- **Background:** Autoplay muted loop video (spa/massage ambience) from Pexels CDN:
  `https://www.pexels.com/video/woman-getting-a-back-massage-3188/`
  Use `<video>` tag with `autoPlay muted loop playsInline` + dark overlay `rgba(28,26,24,0.45)`
- **Content (centered, left-aligned on desktop):**
  ```
  [small gold tag] ✦ Premium Spa Experience
  
  GOLDEN
  MOMENTS           ← Cormorant Garamond 120px, white, italic
  AWAIT YOU
  
  [body] Surrender to ancient healing rituals.
         Body, mind, and soul — restored.
  
  [CTA] Book Your Session →    [secondary] Explore Services
  ```
- **Animated:** Words slide up with stagger on load
- **Scroll indicator:** Animated bouncing arrow at bottom center
- **Stats strip:** After hero, a warm-bg strip: "13K+ Happy Clients | 4.9★ Rating | 5K+ Treatments | Since 2015"

### 5. About / Philosophy Section
- Split layout: large editorial text left, stacked images right (collage style)
- Pull quote: *"Everyone deserves a place to find their inner peace. At The Ark, we create moments of care, comfort, and renewal."*
- Stats cards: 98% Customer Satisfaction | 5K+ Annual Treatments | 4.9/5 Excellence
- Background: warm gradient `#FAF7F2` → `#F0E8D8`
- Subtle leaf/botanical SVG decorations

### 6. Video Section (`VideoSection.tsx`)
- **Cinematic full-width section**
- Two side-by-side video tiles OR one large video + one text panel
- Pexels spa videos (embed via CDN):
  - `https://player.vimeo.com/video/` OR direct pexels video links
  - Suggested: candle+towel ambience, facial massage, couple relaxing
- Play button: large circle with play icon, gold ring animation on hover
- Caption: "A Sanctuary For Your Senses"
- Videos lazy-load (IntersectionObserver)

### 7. Services Grid (`Services.tsx`)
- **Layout:** 3-column grid (ref image 4 style), each card has:
  - Full image (rounded corners 12px)
  - Service name in Cormorant Garamond
  - Short description in DM Sans
  - Hover: image scales 1.05, gold border appears, "Book Now" CTA fades in
- **Services List:**
  1. Body Spa
  2. Body Massage
  3. Swedish Massage
  4. Balinese Massage
  5. Aroma Massage
  6. Deep Tissue Massage
  7. Healing Touch Massage
  8. Lomi Lomi Massage
  9. Relax Signature Massage
  10. Couple Massage
  11. Four Hand Massage
  12. Foot Massage
  13. Hair Spa
  14. Face Massage
  15. Facial & Skin Treatments
- **Images:** Fetch from Unsplash spa collection:
  ```
  https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80  (massage)
  https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80  (facial)
  https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80  (spa stones)
  https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80  (couple spa)
  https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80  (aromatherapy)
  https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80  (face massage)
  https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80  (foot massage)
  https://images.unsplash.com/photo-1611073613226-e6c8b9a37990?w=600&q=80  (hair spa)
  https://images.unsplash.com/photo-1561457013-a8b23513739a?w=600&q=80  (body scrub)
  ```

### 8. Pricing Section (`Pricing.tsx`)
- **3 tiers** displayed as elegant cards on warm bg:

| Service | Duration | Price |
|---|---|---|
| **Signature Ritual** | 60 min | ₹999 |
| **Royal Indulgence** | 90 min | ₹1499 |
| **The Ark Experience** | 120 min | ₹1999 |

- Also list individual treatments:
  ```
  Hair Spa (Soft Mind)     60 min  ₹499
  Hair Spa (Full Mind)     90 min  ₹799
  Body Massage (Mini)      60 min  ₹699
  Body Massage (Full)      90 min  ₹999
  Face Massage             50 min  ₹599
  Couple Massage           90 min  ₹2499
  Foot Massage             45 min  ₹399
  ```
- Card design: cream background, gold top border accent, Cormorant Garamond pricing, hover lift + gold shadow
- Middle card highlighted: slightly larger, gold background tint, "Most Popular" badge

### 9. Gallery (`Gallery.tsx`)
- Masonry/Pinterest grid layout
- 9-12 images from Unsplash spa collection
- Hover: smooth overlay with service name + "View" text
- Lightbox on click (use `yet-another-react-lightbox` or custom)
- Section title: "MOMENTS OF BLISS" with decorative gold lines

### 10. Testimonials (`Testimonials.tsx`)
- Auto-sliding carousel (Framer Motion drag + auto-advance)
- Each card: star rating, quote text, client name, treatment received
- Large decorative quote marks in gold
- Background: deep charcoal `#1C1A18` for contrast section break

### 11. Booking Modal (`BookingModal.tsx`) ← MOST IMPORTANT
**Trigger:** Any "Book Appointment" CTA opens this modal

**Step 1 — Select Service**
- Service dropdown or card selection grid
- Animated step indicator at top (1 → 2 → 3 → 4)

**Step 2 — Select Date**
- Custom calendar (ref image 1 style)
- Only Mon–Sat selectable
- Selected date highlighted in charcoal/gold
- No past dates

**Step 3 — Select Time**
- Time slots grid: 9:00 AM to 7:00 PM (1hr slots)
- Available = cream bg; Selected = charcoal bg gold text
- Layout: responsive grid of pill buttons

**Step 4 — Your Details**
- Name field (required)
- Phone number field (required)  
- Optional message textarea: "Anything specific you'd like us to know?"
- Validation: name + phone required

**Step 5 — Confirm → WhatsApp**
```tsx
const handleBooking = () => {
  const message = encodeURIComponent(
    `🌿 *New Appointment Request — The Ark Spa & Salon*\n\n` +
    `👤 *Name:* ${name}\n` +
    `📱 *Phone:* ${phone}\n` +
    `💆 *Service:* ${selectedService}\n` +
    `📅 *Date:* ${selectedDate}\n` +
    `⏰ *Time:* ${selectedTime}\n` +
    `📝 *Message:* ${message || 'No special requests'}\n\n` +
    `_Sent via The Ark Spa website_`
  );
  window.open(`https://wa.me/916265581678?text=${message}`, '_blank');
};
```

**Modal Design:**
- Slides up from bottom on mobile, centered overlay on desktop
- Backdrop blur on page behind
- Smooth step transitions (Framer Motion `AnimatePresence`)
- Gold progress bar at top showing step completion
- Close button top-right

### 12. Footer (`Footer.tsx`)
- Dark background `#1C1A18`
- Logo + tagline
- Links: Services | Pricing | Gallery | Book Now
- Contact: 📍 [Your City] | 📞 +91 62655 81678 | 🕐 Mon–Sat 10AM–7PM
- Social icons: Instagram, Facebook, WhatsApp
- Bottom: "© 2025 The Ark Spa And Salon. Crafted with ✦"
- Subtle floating botanical SVG elements

---

## Animations Master Plan (Framer Motion)

```tsx
// Page entry - staggered hero text
const stagger = {
  visible: { transition: { staggerChildren: 0.12 } }
}
const fadeUp = {
  hidden: { y: 60, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
}

// Scroll-triggered sections
// Use Framer Motion's useInView hook
const { ref, inView } = useInView({ threshold: 0.2, once: true })

// Service cards hover
whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(201,169,110,0.2)' }}

// Navbar transition
animate={{ backgroundColor: scrolled ? 'rgba(250,247,242,0.9)' : 'transparent' }}

// Modal slide up
initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
transition={{ type: 'spring', damping: 30, stiffness: 300 }}
```

---

## Performance Requirements
- All images: `next/image` with proper `sizes` prop, lazy loading
- Videos: `loading="lazy"`, IntersectionObserver to play only in viewport
- Fonts: `next/font` (no FOUT), `display: swap`
- Code splitting: each section as dynamic import where possible
- No layout shift: all image dimensions specified
- Tailwind purge: ensure only used classes bundled
- Target: Lighthouse 90+ Performance, 100 Accessibility

---

## Package Dependencies
```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "framer-motion": "^11",
    "tailwindcss": "^3",
    "@tailwindcss/typography": "latest",
    "yet-another-react-lightbox": "latest",
    "react-intersection-observer": "latest",
    "clsx": "latest",
    "date-fns": "latest"
  }
}
```

---

## Critical Rules
1. **NO generic AI aesthetics** — no purple gradients, no Inter font, no boring cards
2. **Every hover state** must feel intentional and premium
3. **Mobile-first** — all sections must be beautiful on 375px screens
4. **Booking modal** is the #1 priority — must work flawlessly
5. **WhatsApp number:** `916265581678` (country code included)
6. **Preloader** always runs on first load, stored in sessionStorage so it doesn't repeat on navigation
7. **Cursor** disabled on touch devices
8. **Smooth scroll** behavior on html element
9. **All text** must be readable at all viewport sizes (min 16px body)
10. **Japan × Thailand vibe** must be felt in every section — through typography, spacing, color, and imagery

---

## Spa Images (Unsplash — Free CDN, No Attribution Needed for Prototype)
```
Hero BG (video): https://www.pexels.com/video/hands-massaging-the-back-of-a-client-3750378/
Massage 1: https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80
Massage 2: https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80
Stones: https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80
Couple: https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=800&q=80
Aroma: https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80
Facial: https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80
Foot: https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80
Candle: https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=800&q=80
Flowers: https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=800&q=80
Interior: https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80
Bath: https://images.unsplash.com/photo-1591343395082-e120087004b4?w=800&q=80
```

---

## WhatsApp Booking Integration
```typescript
// utils/whatsapp.ts
export const openWhatsAppBooking = (details: BookingDetails) => {
  const { name, phone, service, date, time, message } = details;
  
  const formattedDate = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
  
  const text = [
    `🌿 *New Appointment — The Ark Spa & Salon*`,
    ``,
    `👤 Name: ${name}`,
    `📱 Phone: ${phone}`,
    `💆 Service: ${service}`,
    `📅 Date: ${formattedDate}`,
    `⏰ Time: ${time}`,
    message ? `📝 Note: ${message}` : null,
    ``,
    `_Booked via website_`
  ].filter(Boolean).join('\n');
  
  const url = `https://wa.me/916265581678?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener');
};
```

---

*This file is the single source of truth for the entire spa-site build. Every design decision, component spec, animation detail, and integration requirement is documented here. Build with excellence.*
