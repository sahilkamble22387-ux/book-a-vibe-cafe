'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Package,
  RefreshCw,
  Gift,
  Truck,
  Flame,
  Coffee,
  ArrowRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface OfferingCard {
  icon: React.ElementType;
  title: string;
  description: string;
  price: string;
  tag: string;
  tagColor: 'forest' | 'copper';
}

const offerings: OfferingCard[] = [
  {
    icon: Package,
    title: 'Fresh Roasted Beans',
    description:
      'From single-origin to signature blends, choose from our entire range of freshly roasted beans. Roasted to order and shipped within 48 hours.',
    price: '₹450',
    tag: 'Best Seller',
    tagColor: 'forest',
  },
  {
    icon: RefreshCw,
    title: 'Monthly Subscription',
    description:
      'Never run out of coffee. Choose your frequency, roast preference, and grind size. Cancel anytime — no commitments.',
    price: '₹799/month',
    tag: 'Most Popular',
    tagColor: 'copper',
  },
  {
    icon: Gift,
    title: 'Gift Collections',
    description:
      'Curated gift boxes featuring our finest beans, brewing equipment, and tasting notes. The perfect present for any coffee lover.',
    price: '₹1,299',
    tag: 'Perfect Gift',
    tagColor: 'forest',
  },
];

interface BrewingEquipment {
  name: string;
  icon: string;
}

const brewingEquipment: BrewingEquipment[] = [
  { name: 'V60', icon: '⚙' },
  { name: 'AeroPress', icon: '⚡' },
  { name: 'French Press', icon: '☕' },
  { name: 'Chemex', icon: '🧪' },
  { name: 'Gooseneck Kettle', icon: '🫖' },
  { name: 'Grinder', icon: '🔧' },
];

interface TrustBadge {
  icon: React.ElementType;
  text: string;
}

const trustBadges: TrustBadge[] = [
  { icon: Truck, text: 'Free Shipping on ₹999+' },
  { icon: Flame, text: 'Roasted to Order' },
  { icon: Coffee, text: '100% Arabica' },
  { icon: Package, text: 'Estate Direct' },
];

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const heroImageVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const equipmentVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const trustVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.1 },
  },
};

const trustItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

/* ------------------------------------------------------------------ */
/*  Offering Card Component                                            */
/* ------------------------------------------------------------------ */

function OfferingCardComponent({ card }: { card: OfferingCard }) {
  const Icon = card.icon;

  const tagStyles =
    card.tagColor === 'forest'
      ? 'bg-[#2D5A3D] text-white'
      : 'bg-[#C4883A] text-white';

  return (
    <motion.div
      variants={cardVariants}
      className="group relative bg-[#FFF8F0] border border-[#E2CDB0] rounded-2xl p-6 sm:p-8 flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#3C2415]/10 espresso-glow"
    >
      {/* Tag Badge */}
      <span
        className={`absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide uppercase ${tagStyles}`}
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {card.tag}
      </span>

      {/* Icon in Circular Accent */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#F0E6D6] flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-[#E2CDB0] transition-colors duration-300">
        <Icon
          className="w-6 h-6 sm:w-7 sm:h-7 text-[#8B6914] group-hover:text-[#3C2415] transition-colors duration-300"
          strokeWidth={1.8}
        />
      </div>

      {/* Title */}
      <h3
        className="text-xl sm:text-2xl text-[#3C2415] font-bold leading-tight mb-3"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {card.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed mb-5 sm:mb-6 flex-grow"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {card.description}
      </p>

      {/* Price */}
      <p
        className="text-base sm:text-lg font-bold text-[#8B6914] mb-4 sm:mb-5"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        From {card.price}
      </p>

      {/* Explore Link */}
      <a
        href="#"
        className="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#3C2415] hover:text-[#C4883A] transition-colors duration-200"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        Explore
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
      </a>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Brewing Equipment Item                                             */
/* ------------------------------------------------------------------ */

function BrewingEquipmentItem({
  equipment,
}: {
  equipment: BrewingEquipment;
}) {
  return (
    <div className="flex flex-col items-center gap-2.5 snap-center flex-shrink-0 w-24 sm:w-28">
      {/* Circular Icon/Emoji Container */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFF8F0] border border-[#E2CDB0] flex items-center justify-center text-2xl sm:text-3xl group hover:border-[#C4883A] hover:shadow-md transition-all duration-300 cursor-pointer">
        <span role="img" aria-label={equipment.name}>
          {equipment.icon}
        </span>
      </div>
      {/* Label */}
      <span
        className="text-xs sm:text-sm text-[#4A4A4A] font-medium text-center leading-tight"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {equipment.name}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Subscriptions Component                                       */
/* ------------------------------------------------------------------ */

export default function Subscriptions() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const equipmentRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const heroImageInView = useInView(heroImageRef, {
    once: true,
    margin: '-80px',
  });
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px' });
  const equipmentInView = useInView(equipmentRef, {
    once: true,
    margin: '-40px',
  });
  const trustInView = useInView(trustRef, { once: true, margin: '-40px' });

  // Parallax for hero image
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section
      id="subscriptions"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0] overflow-hidden"
    >
      {/* Texture overlay */}
      <div className="absolute inset-0 texture-burlap opacity-40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* ---------------------------------------------------------- */}
        {/*  1. Section Header                                          */}
        {/* ---------------------------------------------------------- */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          variants={headerVariants}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          {/* Label */}
          <p
            className="text-xs sm:text-sm tracking-[0.4em] text-[#8B6914] uppercase mb-5 sm:mb-6"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Coffee at Home
          </p>

          {/* Divider */}
          <div className="section-divider mb-6 sm:mb-8" />

          {/* Headline */}
          <h2
            className="text-3xl md:text-5xl text-[#3C2415] font-bold leading-tight mb-4 sm:mb-5"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Bring the Roastery Home
          </h2>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-[#6B4F10] italic"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Fresh roasted. Delivered to your door.
          </p>
        </motion.div>

        {/* ---------------------------------------------------------- */}
        {/*  2. Hero Image with Parallax                                */}
        {/* ---------------------------------------------------------- */}
        <motion.div
          ref={heroImageRef}
          initial="hidden"
          animate={heroImageInView ? 'visible' : 'hidden'}
          variants={heroImageVariants}
          className="relative w-full rounded-2xl overflow-hidden mb-14 sm:mb-18 md:mb-24 aspect-[21/9] sm:aspect-[3/1]"
        >
          {/* Parallax wrapper */}
          <motion.div
            className="absolute inset-0 w-full h-[120%] -top-[10%]"
            style={{ y: heroY }}
          >
            <img
              src="/images/subscription.png"
              alt="Blue Tokai coffee subscription — freshly roasted beans delivered to your door"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </motion.div>

          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/70 via-[#2C1810]/30 to-transparent" />

          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="text-center px-4">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={heroImageInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#F0E6D6] leading-tight drop-shadow-lg"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Discover Your Perfect Brew
              </motion.h3>
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={heroImageInView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
                className="mt-4 mx-auto w-24 h-[2px] bg-[#C4883A]"
              />
            </div>
          </div>
        </motion.div>

        {/* ---------------------------------------------------------- */}
        {/*  3. Three Offering Cards                                    */}
        {/* ---------------------------------------------------------- */}
        <motion.div
          ref={cardsRef}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
          variants={cardContainerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-16 sm:mb-20 md:mb-28"
        >
          {offerings.map((offering) => (
            <OfferingCardComponent key={offering.title} card={offering} />
          ))}
        </motion.div>

        {/* ---------------------------------------------------------- */}
        {/*  4. Brewing Equipment Highlight                             */}
        {/* ---------------------------------------------------------- */}
        <motion.div
          ref={equipmentRef}
          initial="hidden"
          animate={equipmentInView ? 'visible' : 'hidden'}
          variants={equipmentVariants}
          className="mb-16 sm:mb-20 md:mb-28"
        >
          {/* Sub-header */}
          <div className="text-center mb-8 sm:mb-10">
            <p
              className="text-xs sm:text-sm tracking-[0.3em] text-[#8B6914] uppercase mb-3"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Brew it Right
            </p>
            <h3
              className="text-2xl sm:text-3xl text-[#3C2415] font-bold leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Brewing Equipment
            </h3>
          </div>

          {/* Horizontal scroll container */}
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-[#FAF6F0] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-[#FAF6F0] to-transparent z-10 pointer-events-none" />

            <div className="flex gap-5 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4 sm:px-8 -mx-4 sm:-mx-8">
              {brewingEquipment.map((item) => (
                <BrewingEquipmentItem key={item.name} equipment={item} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* ---------------------------------------------------------- */}
        {/*  5. Trust Bar                                               */}
        {/* ---------------------------------------------------------- */}
        <motion.div
          ref={trustRef}
          initial="hidden"
          animate={trustInView ? 'visible' : 'hidden'}
          variants={trustVariants}
          className="border-t border-b border-[#E2CDB0] py-8 sm:py-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {trustBadges.map((badge) => {
              const BadgeIcon = badge.icon;
              return (
                <motion.div
                  key={badge.text}
                  variants={trustItemVariants}
                  className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 text-center sm:text-left"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#F0E6D6] flex items-center justify-center flex-shrink-0">
                    <BadgeIcon
                      className="w-5 h-5 text-[#8B6914]"
                      strokeWidth={1.8}
                    />
                  </div>
                  <span
                    className="text-xs sm:text-sm text-[#4A4A4A] font-medium leading-snug"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    {badge.text}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Hide scrollbar for horizontal scroll */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
