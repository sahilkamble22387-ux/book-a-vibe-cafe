'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Menu Data                                                          */
/* ------------------------------------------------------------------ */

interface MenuItem {
  name: string;
  image: string;
  description: string;
  price: string;
}

const featuredItems: MenuItem[] = [
  {
    name: 'Corn Fiesta Pizza',
    image: '/images/menu-pizza.png',
    description:
      'Our signature pizza loaded with sweet corn, mozzarella, and fresh herbs on a crispy base',
    price: '₹249',
  },
  {
    name: 'Pesto Pasta',
    image: '/images/menu-pasta.png',
    description:
      'Creamy basil pesto with pine nuts and parmesan, served with perfectly cooked penne',
    price: '₹229',
  },
  {
    name: 'Exotic Garlic Bread',
    image: '/images/menu-garlicbread.png',
    description:
      'Crispy garlic bread topped with herbs and melted butter — the perfect companion',
    price: '₹149',
  },
];

const categories = ['Coffee & Beverages', 'Continental', 'Bakery', 'Brunch'];

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
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
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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
/*  Menu Card Component                                                */
/* ------------------------------------------------------------------ */

function MenuCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group rounded-2xl overflow-hidden bg-white transition-all duration-400 cursor-default menu-card-hover"
    >
      {/* Image */}
      <div className="relative w-full aspect-square overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(26,18,16,0.40) 0%, rgba(26,18,16,0.05) 50%, transparent 100%)',
          }}
        />
        {/* Price tag */}
        <div
          className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full text-sm font-bold text-white shadow-lg"
          style={{ backgroundColor: '#6B2737' }}
        >
          {item.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3
          className="text-lg sm:text-xl font-bold text-[#1A1210] mb-2"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          {item.name}
        </h3>
        <p className="text-sm text-[#8B7D6B] leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main MenuHighlights Component                                      */
/* ------------------------------------------------------------------ */

export default function MenuHighlights() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
  const bottomInView = useInView(bottomRef, { once: true, margin: '-40px' });

  return (
    <section
      id="menu"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#F5EDE0' }}
    >
      {/* Decorative background blobs */}
      <div
        className="absolute top-20 -left-32 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ backgroundColor: '#C4973B' }}
      />
      <div
        className="absolute bottom-40 -right-32 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: '#6B2737' }}
      />

      {/* Section Header */}
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
            className="text-[#C4973B] text-xs sm:text-sm tracking-[0.35em] uppercase font-semibold mb-4"
          >
            FROM OUR KITCHEN
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={headerItemVariants}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1210] mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Bites Worth Staying For
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={headerItemVariants}
            className="text-base sm:text-lg text-[#8B7D6B] max-w-2xl leading-relaxed"
          >
            From hand-crafted pizzas to aromatic coffees — every dish is made to
            complement your reading and working experience.
          </motion.p>

          {/* Divider */}
          <motion.div variants={headerItemVariants} className="section-divider mt-6" />
        </motion.div>
      </div>

      {/* Featured Cards Grid */}
      <div
        ref={gridRef}
        className="px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 max-w-6xl mx-auto"
      >
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {featuredItems.map((item) => (
            <MenuCard key={item.name} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Category Tags */}
      <div
        ref={bottomRef}
        className="px-4 sm:px-6 lg:px-8 pb-8 max-w-6xl mx-auto"
      >
        <motion.div
          variants={bottomVariants}
          initial="hidden"
          animate={bottomInView ? 'visible' : 'hidden'}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          {categories.map((cat) => (
            <span
              key={cat}
              className="inline-block px-5 py-2 rounded-full text-sm font-medium border border-[#C4973B]/30 text-[#6B2737] bg-white/60 backdrop-blur-sm transition-all duration-300 hover:bg-[#6B2737] hover:text-white hover:border-[#6B2737] cursor-default"
            >
              {cat}
            </span>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          variants={bottomVariants}
          initial="hidden"
          animate={bottomInView ? 'visible' : 'hidden'}
          className="text-center text-sm text-[#8B7D6B]"
        >
          Full menu available at the cafe. Average cost for two:{' '}
          <span className="font-semibold text-[#1A1210]">₹300</span>
        </motion.p>
      </div>

      {/* Bottom spacer */}
      <div className="h-16 md:h-20" />
    </section>
  );
}
