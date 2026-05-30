'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Coffee,
  GraduationCap,
  Wine,
  Users,
  Calendar,
  ArrowRight,
  Quote,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Event Data                                                         */
/* ------------------------------------------------------------------ */

interface EventItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement> & { strokeWidth?: number }>;
  title: string;
  date: string;
  description: string;
  badge: string;
  badgeColor: 'copper' | 'forest';
}

const events: EventItem[] = [
  {
    icon: Coffee,
    title: 'Cupping Sessions',
    date: 'Every Saturday, 11:00 AM',
    description:
      'Discover the nuances of specialty coffee through guided cupping sessions. Learn to identify flavor notes, aromas, and processing methods.',
    badge: 'Weekly',
    badgeColor: 'copper',
  },
  {
    icon: GraduationCap,
    title: 'Brewing Workshops',
    date: 'First Sunday of Every Month, 3:00 PM',
    description:
      'Master the art of pour-over, AeroPress, and other manual brewing methods with our expert baristas. Take home a brewing kit.',
    badge: 'Monthly',
    badgeColor: 'forest',
  },
  {
    icon: Wine,
    title: 'Coffee Tastings',
    date: 'By Reservation',
    description:
      'Explore our seasonal single-origin collection with guided tastings. Perfect for groups and corporate events.',
    badge: 'By Appointment',
    badgeColor: 'copper',
  },
  {
    icon: Users,
    title: 'Community Gatherings',
    date: 'Last Friday of Every Month, 6:00 PM',
    description:
      'Connect with fellow coffee enthusiasts, share stories, and discover new favorites in our monthly community evenings.',
    badge: 'Monthly',
    badgeColor: 'forest',
  },
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

const dividerVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.8, delay: 0.2, ease: 'easeOut' },
  },
};

const headlineVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.3, ease: 'easeOut' },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.5, ease: 'easeOut' },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, delay: 0.3, ease: 'easeOut' },
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

const quoteVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

/* ------------------------------------------------------------------ */
/*  Event Card Component                                               */
/* ------------------------------------------------------------------ */

function EventCard({ event, index }: { event: EventItem; index: number }) {
  const IconComponent = event.icon;

  const badgeStyles =
    event.badgeColor === 'copper'
      ? 'bg-[#C4883A]/10 text-[#C4883A] border-[#C4883A]/20'
      : 'bg-[#2D5A3D]/10 text-[#2D5A3D] border-[#2D5A3D]/20';

  const iconBgStyles =
    event.badgeColor === 'copper'
      ? 'bg-[#C4883A]/12'
      : 'bg-[#2D5A3D]/12';

  const iconColor =
    event.badgeColor === 'copper' ? 'text-[#C4883A]' : 'text-[#2D5A3D]';

  const datePillStyles =
    event.badgeColor === 'copper'
      ? 'bg-[#C4883A]/8 text-[#C4883A] border border-[#C4883A]/15'
      : 'bg-[#2D5A3D]/8 text-[#2D5A3D] border border-[#2D5A3D]/15';

  const arrowColor =
    event.badgeColor === 'copper'
      ? 'text-[#C4883A] group-hover:text-[#A6722F]'
      : 'text-[#2D5A3D] group-hover:text-[#1E3F2B]';

  return (
    <motion.div
      variants={cardVariants}
      className="group relative rounded-2xl p-6 md:p-8 border border-[#E2CDB0] bg-[#FFF8F0] transition-all duration-500 hover:shadow-xl hover:shadow-[#C4883A]/10 hover:-translate-y-1 espresso-glow"
    >
      {/* Frequency Badge — top right */}
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium tracking-wide border ${badgeStyles}`}
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {event.badge}
        </span>
      </div>

      {/* Icon in circle accent */}
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-5 ${iconBgStyles}`}
      >
        <IconComponent className={`w-5 h-5 ${iconColor}`} strokeWidth={1.8} />
      </div>

      {/* Title */}
      <h3
        className="text-xl font-bold text-[#3C2415] mb-3 pr-20 md:pr-24"
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {event.title}
      </h3>

      {/* Date/Time pill badge */}
      <div
        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium mb-4 ${datePillStyles}`}
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        <Calendar className="w-3 h-3" strokeWidth={2} />
        {event.date}
      </div>

      {/* Description */}
      <p
        className="text-sm leading-relaxed text-[#4A4A4A] mb-6"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        {event.description}
      </p>

      {/* Book a Spot arrow link */}
      <a
        href="#reserve"
        className={`group/link inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-300 ${arrowColor}`}
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        Book a Spot
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" strokeWidth={2} />
      </a>

      {/* Bottom accent line — expands on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out"
        style={{
          background:
            event.badgeColor === 'copper'
              ? 'linear-gradient(90deg, transparent, #C4883A, transparent)'
              : 'linear-gradient(90deg, transparent, #2D5A3D, transparent)',
        }}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Events Component                                              */
/* ------------------------------------------------------------------ */

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const imageInView = useInView(imageRef, { once: true, margin: '-60px' });
  const cardsInView = useInView(cardsRef, { once: true, margin: '-40px' });
  const quoteInView = useInView(quoteRef, { once: true, margin: '-40px' });

  /* Parallax for the full-width image */
  const { scrollYProgress: imageScrollProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const parallaxY = useTransform(imageScrollProgress, [0, 1], ['-8%', '8%']);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#FAF6F0]"
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 texture-burlap opacity-40 pointer-events-none" />

      <div className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* -------------------------------------------------------- */}
          {/*  Section Header                                           */}
          {/* -------------------------------------------------------- */}
          <div
            ref={headerRef}
            className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 md:mb-22"
          >
            {/* Label */}
            <motion.p
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              variants={headerVariants}
              className="text-xs sm:text-sm tracking-[0.4em] text-[#8B6914] uppercase mb-5 sm:mb-6"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              COMMUNITY
            </motion.p>

            {/* Divider */}
            <motion.div
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              variants={dividerVariants}
              className="section-divider mb-6 sm:mb-8"
            />

            {/* Headline */}
            <motion.h2
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              variants={headlineVariants}
              className="text-3xl md:text-5xl text-[#3C2415] font-bold leading-tight mb-4 sm:mb-5"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Join the Coffee Community
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial="hidden"
              animate={headerInView ? 'visible' : 'hidden'}
              variants={subtitleVariants}
              className="text-lg sm:text-xl text-[#6B4F10] italic"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Where coffee lovers become coffee connoisseurs
            </motion.p>
          </div>

          {/* -------------------------------------------------------- */}
          {/*  Full-width Image with Parallax                           */}
          {/* -------------------------------------------------------- */}
          <motion.div
            ref={imageRef}
            initial="hidden"
            animate={imageInView ? 'visible' : 'hidden'}
            variants={imageVariants}
            className="relative w-full rounded-2xl overflow-hidden mb-14 sm:mb-18 md:mb-22 aspect-[21/9] sm:aspect-[3/1]"
          >
            {/* Parallax image container */}
            <motion.div
              className="absolute inset-0 w-full h-[130%] -top-[15%]"
              style={{ y: parallaxY }}
            >
              <img
                src="/images/events.png"
                alt="Blue Tokai community coffee events — cupping, brewing workshops, and tastings"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Dark gradient overlay for text legibility */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(44,24,16,0.3) 0%, rgba(44,24,16,0.55) 40%, rgba(44,24,16,0.7) 100%)',
              }}
            />

            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-end justify-center pb-8 sm:pb-10 md:pb-14 z-10">
              <div className="text-center">
                <h3
                  className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#F0E6D6] tracking-wide drop-shadow-lg"
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Experience. Learn. Connect.
                </h3>
                <motion.div
                  className="mx-auto mt-4 h-[2px] w-24"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, #C4883A, transparent)',
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={imageInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>

          {/* -------------------------------------------------------- */}
          {/*  Event Cards Grid                                         */}
          {/* -------------------------------------------------------- */}
          <motion.div
            ref={cardsRef}
            initial="hidden"
            animate={cardsInView ? 'visible' : 'hidden'}
            variants={cardContainerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8 mb-16 sm:mb-20 md:mb-28"
          >
            {events.map((event, index) => (
              <EventCard key={event.title} event={event} index={index} />
            ))}
          </motion.div>

          {/* -------------------------------------------------------- */}
          {/*  Testimonial / Quote Strip                                */}
          {/* -------------------------------------------------------- */}
          <motion.div
            ref={quoteRef}
            initial="hidden"
            animate={quoteInView ? 'visible' : 'hidden'}
            variants={quoteVariants}
            className="relative max-w-4xl mx-auto text-center py-10 sm:py-14 md:py-16 px-4 sm:px-8"
          >
            {/* Decorative Quote Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Quote
                  className="w-10 h-10 sm:w-12 sm:h-12 text-[#C4883A]/30"
                  strokeWidth={1}
                />
                <Quote
                  className="w-10 h-10 sm:w-12 sm:h-12 text-[#C4883A] absolute top-0 left-0"
                  strokeWidth={1.5}
                  style={{ clipPath: 'inset(0 0 50% 0)' }}
                />
              </div>
            </div>

            {/* Quote Text */}
            <blockquote
              className="text-xl sm:text-2xl md:text-3xl text-[#3C2415] italic leading-relaxed mb-6 sm:mb-8"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              &ldquo;Walking into Blue Tokai feels like coming home. The
              community here isn&apos;t just about coffee — it&apos;s about
              shared moments, quiet conversations, and the kind of warmth
              you can&apos;t find anywhere else.&rdquo;
            </blockquote>

            {/* Divider */}
            <div className="section-divider mb-5 sm:mb-6" />

            {/* Attribution */}
            <div className="flex flex-col items-center gap-1">
              <p
                className="text-base sm:text-lg font-semibold text-[#3C2415]"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Ananya Rao
              </p>
              <p
                className="text-xs sm:text-sm tracking-wider text-[#8B6914] uppercase"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Regular at Kalyani Nagar
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
