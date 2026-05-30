'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Flame, Snowflake, Star, CupSoda, Leaf, Sun, ArrowRight, UtensilsCrossed } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Menu Category Data — from real NBC research                        */
/* ------------------------------------------------------------------ */

interface MenuCategory {
  name: string;
  image: string;
  description: string;
  items: string[];
  accent: string;
  accentLight: string;
  badge?: 'SIGNATURE' | 'SEASONAL';
  icon: React.ElementType;
}

const menuCategories: MenuCategory[] = [
  {
    name: 'Hot Coffee',
    image: '/images/hot-coffee.png',
    description: 'Rich, aromatic, and soul-warming — the classics done right.',
    items: ['Cafe Latte', 'Cappuccino', 'Irish Coffee', 'Cafe Mocha', 'Hazelnut Cappuccino', 'Hot Chocolate'],
    accent: '#D97706',
    accentLight: 'rgba(217,119,6,0.10)',
    icon: Flame,
  },
  {
    name: 'Cold Coffee & Cold Brew',
    image: '/images/cold-coffee.png',
    description: 'Chilled to perfection — refreshing energy in every sip.',
    items: ['Cold Coffee', 'Arabica Cold Coffee', 'Iced Vanilla', 'Iced Mocha', 'Cold Brew'],
    accent: '#0570E5',
    accentLight: 'rgba(5,112,229,0.10)',
    icon: Snowflake,
  },
  {
    name: 'Shrappe',
    image: '/images/shrappe-featured.png',
    description: 'Our signature Shake + Frappe fusion — creamy, indulgent, unforgettable.',
    items: ['Creamy Shrappe', 'Nutella Shrappe', 'Brownie Shrappe', 'Lotus Biscoff Shrappe'],
    accent: '#F476AF',
    accentLight: 'rgba(244,118,175,0.12)',
    badge: 'SIGNATURE',
    icon: Star,
  },
  {
    name: 'Shakes & Smoothies',
    image: '/images/shakes.png',
    description: 'Thick, luscious, and packed with flavour — pure indulgence.',
    items: ['Chocolate Shake', 'Nutella Shake', 'Brownie Shake', 'Red Velvet Shake', 'Mango Delight Shake'],
    accent: '#8B5CF6',
    accentLight: 'rgba(139,92,246,0.10)',
    icon: CupSoda,
  },
  {
    name: 'Matcha & Specialty',
    image: '/images/matcha.png',
    description: 'Zen meets buzz — vibrant matcha and unique specialty brews.',
    items: ['Matcha Iced Latte', 'Blueberry Matcha Iced Latte', 'Mango Matcha Iced Latte', 'Protein Beverage'],
    accent: '#10B981',
    accentLight: 'rgba(16,185,129,0.10)',
    icon: Leaf,
  },
  {
    name: 'Summer Special',
    image: '/images/summer-special.png',
    description: 'Seasonal mango madness — limited-time tropical bliss.',
    items: ['Mango Cream Toast', 'Spicy Mango Mojito', 'Mango Magic Cream', 'Alphonso Shake', 'Bubble Gum Ice Fizz'],
    accent: '#F59E0B',
    accentLight: 'rgba(245,158,11,0.10)',
    badge: 'SEASONAL',
    icon: Sun,
  },
];

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                  */
/* ------------------------------------------------------------------ */

const headerContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const headerItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const bottomVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/* ------------------------------------------------------------------ */
/*  Menu Card Component                                                 */
/* ------------------------------------------------------------------ */

function MenuCard({ category, index }: { category: MenuCategory; index: number }) {
  const isShrappe = category.badge === 'SIGNATURE';
  const IconComp = category.icon;

  return (
    <motion.div
      variants={cardVariants}
      className={`group relative rounded-2xl overflow-hidden transition-all duration-400 cursor-default menu-card-hover ${
        isShrappe
          ? 'ring-2 ring-[#F476AF]/30 shadow-lg shadow-[#F476AF]/10'
          : ''
      }`}
      style={{
        backgroundColor: '#FFFFFF',
        borderLeft: `4px solid ${category.accent}`,
      }}
    >
      {/* Badge */}
      {category.badge && (
        <div
          className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider uppercase"
          style={{
            backgroundColor: category.accent,
            color: '#FFFFFF',
          }}
        >
          {category.badge === 'SIGNATURE' ? (
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" fill="currentColor" />
              SIGNATURE
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Sun className="w-3 h-3" fill="currentColor" />
              SEASONAL
            </span>
          )}
        </div>
      )}

      {/* Image Section */}
      <div className="relative w-full h-44 sm:h-48 overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Gradient overlay at bottom of image */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, rgba(17,17,28,0.55) 0%, rgba(17,17,28,0.10) 50%, transparent 100%)`,
          }}
        />
        {/* Icon badge on image */}
        <div
          className="absolute bottom-3 left-4 z-10 flex items-center gap-2"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: category.accent }}
          >
            <IconComp className="w-4 h-4 text-white" />
          </div>
          <h3
            className="text-white text-lg sm:text-xl font-bold drop-shadow-md"
          >
            {category.name}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5">
        {/* Description */}
        <p className="text-sm text-[#6B7280] leading-relaxed mb-3">
          {category.description}
        </p>

        {/* Popular Items */}
        <div className="space-y-1.5">
          <p
            className="text-[10px] uppercase tracking-widest font-semibold"
            style={{ color: category.accent }}
          >
            Popular Items
          </p>
          <div className="flex flex-wrap gap-1.5">
            {category.items.slice(0, 4).map((item) => (
              <span
                key={item}
                className="inline-block text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: category.accentLight,
                  color: category.accent,
                }}
              >
                {item}
              </span>
            ))}
            {category.items.length > 4 && (
              <span
                className="inline-block text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  backgroundColor: category.accentLight,
                  color: category.accent,
                }}
              >
                +{category.items.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Shrappe glow effect */}
      {isShrappe && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow: '0 0 40px rgba(244,118,175,0.25), 0 0 80px rgba(244,118,175,0.10)',
          }}
        />
      )}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main MenuHighlights Component                                       */
/* ------------------------------------------------------------------ */

export default function MenuHighlights() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
  const bottomInView = useInView(bottomRef, { once: true, margin: '-40px' });

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#FDF9EF' }}
    >
      {/* ── Decorative background blobs ── */}
      <div
        className="absolute top-20 -left-32 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: '#0570E5' }}
      />
      <div
        className="absolute bottom-40 -right-32 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ backgroundColor: '#F476AF' }}
      />

      {/* ── Section Header ── */}
      <div
        ref={headerRef}
        className="px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-10 md:pb-14 max-w-6xl mx-auto"
      >
        <motion.div
          variants={headerContainerVariants}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          className="text-center flex flex-col items-center"
        >
          {/* Label */}
          <motion.p
            variants={headerItemVariants}
            className="text-[#0570E5] text-xs sm:text-sm tracking-[0.35em] uppercase font-semibold mb-4"
          >
            OUR MENU
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={headerItemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#11111C] mb-4 leading-tight"
          >
            100+ Handcrafted{' '}
            <span className="gradient-text">Beverages</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={headerItemVariants}
            className="text-base sm:text-lg text-[#6B7280] max-w-2xl leading-relaxed mb-6"
          >
            From bold espressos to creamy Shrappe, refreshing matcha to indulgent shakes — there&apos;s something for every mood.
          </motion.p>

          {/* Gradient Divider */}
          <motion.div variants={headerItemVariants} className="section-divider" />
        </motion.div>
      </div>

      {/* ── Menu Category Cards Grid ── */}
      <div
        ref={gridRef}
        className="px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 max-w-6xl mx-auto"
      >
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {menuCategories.map((category, index) => (
            <MenuCard key={category.name} category={category} index={index} />
          ))}
        </motion.div>
      </div>

      {/* ── Food Note ── */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
          className="flex items-center justify-center gap-2 text-sm sm:text-base text-[#6B7280]"
        >
          <UtensilsCrossed className="w-4 h-4 text-[#DD5350] shrink-0" />
          <span>
            Plus, tasty bites to fuel your day —{' '}
            <span className="font-semibold text-[#11111C]">Tandoori Masala Maggi</span>,{' '}
            <span className="font-semibold text-[#11111C]">Peri Peri Maggi</span>, Brownies &amp; more!
          </span>
        </motion.div>
      </div>

      {/* ── Bottom CTA ── */}
      <div
        ref={bottomRef}
        className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-28 max-w-6xl mx-auto"
      >
        <motion.div
          variants={bottomVariants}
          initial="hidden"
          animate={bottomInView ? 'visible' : 'hidden'}
          className="flex flex-col items-center gap-6"
        >
          <a
            href="https://www.zomato.com/pune/nothing-before-coffee-kalyani-nagar/order"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#0570E5] text-[#0570E5] font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:bg-[#0570E5] hover:text-white hover:shadow-lg hover:shadow-[#0570E5]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0570E5]"
          >
            View Full Menu
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          {/* Decorative dot row */}
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0570E5]/30" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#F476AF]/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0570E5]/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
