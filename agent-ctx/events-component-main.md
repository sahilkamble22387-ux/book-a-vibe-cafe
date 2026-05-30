# Events & Community Section Component

## Task
Build the Events & Community section component for Blue Tokai Coffee Roasters at `/home/z/my-project/src/components/sections/Events.tsx`.

## What was built
A complete `"use client"` React component with framer-motion scroll animations, containing:

1. **Section Header** — "COMMUNITY" label in small caps with copper tracking, a divider line, "Join the Coffee Community" headline in Playfair Display, and italic subtitle in Playfair Display.

2. **Full-width Parallax Image** — `/images/events.png` in a `rounded-2xl` container with scroll-driven parallax via `useScroll`/`useTransform`, dark gradient overlay, and "Experience. Learn. Connect." overlay text with animated underline.

3. **4 Event Cards** in a 2-column responsive grid (`md:grid-cols-2`):
   - **Cupping Sessions** — Coffee icon, copper accent, "Weekly" badge
   - **Brewing Workshops** — GraduationCap icon, forest green accent, "Monthly" badge
   - **Coffee Tastings** — Wine icon, copper accent, "By Appointment" badge
   - **Community Gatherings** — Users icon, forest green accent, "Monthly" badge
   
   Each card features: cream background, border, frequency badge (top-right), icon in circle accent, date/time pill with Calendar icon, Playfair Display title, Inter description, "Book a Spot" arrow link, and hover effects (lift, shadow, espresso-glow, bottom accent line).

4. **Testimonial Quote Strip** — Decorative Quote icon with split-half effect, large Playfair Display italic blockquote, section divider, and attribution ("Ananya Rao — Regular at Kalyani Nagar").

## Technical details
- Uses `useInView` for scroll-triggered animations with staggered reveals
- Uses `useScroll` + `useTransform` for parallax on the hero image
- Matches existing project patterns (font variables, color palette, CSS classes like `espresso-glow`, `section-divider`, `texture-burlap`)
- All icons from `lucide-react`: Coffee, GraduationCap, Wine, Users, Calendar, ArrowRight, Quote
- Background: cream `#FAF6F0` with burlap texture overlay
- Section `id="events"`

## Files modified
- **Created**: `/home/z/my-project/src/components/sections/Events.tsx`
- **Updated**: `/home/z/my-project/src/app/page.tsx` — added Events import and rendered it below CoffeeCollection

## Status
✅ Complete — lint passes, dev server compiles successfully with no errors.
