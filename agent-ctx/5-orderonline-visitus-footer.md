# Task 5 - OrderOnline, VisitUs & Footer Agent

## Task
Build three React components for the Nothing Before Coffee (NBC) website: OrderOnline, VisitUs, and Footer.

## Work Completed

### Files Created/Modified
1. **`/src/components/sections/OrderOnline.tsx`** — New component
   - Section id="order", light blue (#E8F1FC) background
   - 3 order cards: Order Delivery (red), NBC Shop (blue), NBC Loyalty Rewards (pink)
   - Each card: white bg, rounded-xl, shadow, hover lift, accent bar, emoji icon
   - Framer Motion scroll-triggered animations

2. **`/src/components/sections/VisitUs.tsx`** — New component (replaced stub)
   - Section id="visit", white background
   - Two-column layout: contact info + form (left), Google Maps embed (right)
   - Contact details with icon badges, action buttons, contact form
   - Form POSTs to /api/contact with sonner toast feedback

3. **`/src/components/sections/Footer.tsx`** — Rewritten (replaced Blue Tokai version)
   - Dark (#11111C) background with gradient top accent
   - 4 columns: Brand, Quick Links, Contact, Newsletter
   - Newsletter form POSTs to /api/newsletter with sonner toast
   - Back-to-top button with Framer Motion

4. **`/src/app/api/contact/route.ts`** — New API route
   - POST handler: validates name/email/message, returns JSON

5. **`/src/app/api/newsletter/route.ts`** — New API route
   - POST handler: validates email, returns JSON

### Verification
- ESLint passes with zero errors
- Dev server compiles successfully
- All components use "use client" directive
- All components use Tailwind CSS + Framer Motion
- Responsive design (mobile-first)
- NBC brand colors used throughout (#0570E5, #F476AF, #DD5350, #11111C, #FDF9EF)
