# Template Customization Guide

Welcome to the **Premium Spa Template**. This template has been designed to be highly customizable and performant. Everything from branding to colors, typography, imagery, and text can be easily tweaked to fit your specific needs.

## 1. Quick Config (`src/config/site.ts`)

For fast updates to core brand details, open `src/config/site.ts`. Here you can easily change:
- **Brand Name** & **Short Name**
- **Contact Details**: Phone, WhatsApp number, and Google Maps URL.
- **Social Media Links**
- **Core Images/Videos**: The hero video and main about images.

## 2. Changing Theme Colors (`src/app/globals.css`)

The color palette is centrally managed via CSS Variables. Open `src/app/globals.css` and locate the `:root` block:

```css
:root {
  --cream: #FAF7F2;          /* Main background color */
  --charcoal: #1C1A18;       /* Primary text and dark section background */
  --gold: #C9A96E;           /* Primary accent color (buttons, highlights) */
  --gold-light: #E8D5A3;     /* Lighter accent for hover states */
  --sage: #8A9B6E;           /* Secondary accent color */
  --warm-white: #F5F0E8;     /* Alternate light background */
  --deep-brown: #3D2B1F;     /* Subtle dark accents */
}
```
Change any of these hex codes to instantly transform the entire website's aesthetic.

## 3. Changing Typography (`src/app/layout.tsx`)

The site uses Google Fonts optimized via Next.js (`next/font/google`). To change them, open `src/app/layout.tsx`:

1. Update the import at the top (e.g., import `Playfair_Display` instead of `Cormorant_Garamond`).
2. Update the variable definitions.
3. Ensure the CSS variable matches in the font configuration.

```typescript
const primaryFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cormorant', // Keep the variable name to avoid refactoring CSS
});
```

## 4. Updating Content (Text, Pricing, Services)

Most of the content is organized cleanly at the top of each component file in data arrays.

- **Services**: Open `src/components/Services.tsx` and edit the `services` array at the top.
- **Pricing**: Open `src/components/Pricing.tsx` and edit the `packages` and `individualTreatments` arrays.
- **Gallery**: Open `src/components/Gallery.tsx` and replace the image URLs and labels in the `galleryImages` array.
- **Testimonials**: Open `src/components/Testimonials.tsx` and edit the `testimonials` array.

## 5. Performance Optimization

This template is already highly optimized out of the box:
- **`next/image`** is used everywhere for automatic resizing, lazy loading, and modern formats (WebP/AVIF).
- **`next/font`** removes FOUT (Flash of Unstyled Text) and optimizes font loading.
- **Framer Motion** animations are lightweight and leverage hardware acceleration.
- **Tailwind CSS V4** provides incredibly fast styling with a tiny production footprint.

**Best Practices when customizing:**
- Keep your video backgrounds optimized (use MP4 files under 5MB).
- Don't use overly large image dimensions in `galleryImages`. The Unsplash links append `?w=600&q=80` to keep them lightweight. Follow this practice for your own CDN images.

## 6. Testing Responsiveness

All components are built Mobile-First using Tailwind classes (`md:`, `lg:` prefixes). When you edit the layout, resize your browser or use DevTools to ensure everything looks flawless across mobile (375px), tablet (768px), and desktop sizes.
