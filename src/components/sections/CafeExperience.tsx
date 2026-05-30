'use client';

import { useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  Coffee,
  Laptop,
  Users,
  Leaf,
  Music,
  PawPrint,
  Clock,
  Wifi,
  Plug,
  Car,
  Star,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Feature data                                                        */
/* ------------------------------------------------------------------ */

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  accent: string;
  emoji: string;
}

const features: Feature[] = [
  {
    icon: Coffee,
    title: 'Crafted With Care',
    description:
      'Every drink is handcrafted by trained baristas who share our passion for perfect coffee.',
    accent: '#0570E5',
    emoji: '☕',
  },
  {
    icon: Laptop,
    title: 'Work-Friendly Spaces',
    description:
      "Free WiFi, comfortable seating, and power outlets at every corner. Your remote office awaits.",
    accent: '#F476AF',
    emoji: '💻',
  },
  {
    icon: Users,
    title: 'Community Hub',
    description:
      "From open mic nights to coffee tasting events, NBC is where the community comes together.",
    accent: '#0570E5',
    emoji: '🎉',
  },
  {
    icon: Leaf,
    title: 'Aesthetic Interiors',
    description:
      "Modern, vibrant spaces designed to inspire. Perfect for your next Instagram post.",
    accent: '#F476AF',
    emoji: '🌿',
  },
  {
    icon: Music,
    title: 'Good Vibes Only',
    description:
      "Curated playlists, warm lighting, and the aroma of fresh coffee — the NBC mood.",
    accent: '#0570E5',
    emoji: '🎵',
  },
  {
    icon: PawPrint,
    title: 'Pet-Friendly',
    description:
      "Because your furry friend deserves a café day too. Select locations welcome pets.",
    accent: '#F476AF',
    emoji: '🐾',
  },
];

/* ------------------------------------------------------------------ */
/*  Quick Info data                                                     */
/* ------------------------------------------------------------------ */

interface QuickInfoItem {
  icon: React.ElementType;
  label: string;
  emoji: string;
}

const quickInfo: QuickInfoItem[] = [
  { icon: Clock, label: 'Open 8AM–11PM', emoji: '🕐' },
  { icon: Wifi, label: 'Free WiFi', emoji: '📶' },
  { icon: Plug, label: 'Power Outlets', emoji: '🔌' },
  { icon: Car, label: 'Nearby Parking', emoji: '🅿️' },
  { icon: Star, label: '5.0 Rating (541 reviews)', emoji: '⭐' },
];

/* ------------------------------------------------------------------ */
/*  Main CafeExperience Component                                       */
/* ------------------------------------------------------------------ */

export default function CafeExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const bannerRef = useRef<HTMLDivElement>(null);
  const bannerInView = useInView(bannerRef, { once: true, margin: '-60px' });

  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' });

  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: '-40px' });

  const infoRef = useRef<HTMLDivElement>(null);
  const infoInView = useInView(infoRef, { once: true, margin: '-40px' });

  // Parallax scroll for banner
  const { scrollYProgress: bannerScrollProgress } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start'],
  });
  const bannerParallaxY = useTransform(bannerScrollProgress, [0, 1], [-30, 30]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-white"
    >
      {/* ── Parallax Banner ── */}
      <div
        ref={bannerRef}
        className="relative w-full overflow-hidden"
        style={{ height: 'clamp(200px, 35vw, 250px)' }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: bannerParallaxY }}
        >
          <Image
            src="/images/cafe-experience.png"
            alt="Nothing Before Coffee — The NBC Experience"
            fill
            className="object-cover"
            style={{ minHeight: 'calc(100% + 60px)', marginTop: '-30px' }}
            priority
          />
        </motion.div>

        {/* Dark Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={bannerInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              'linear-gradient(180deg, rgba(17,17,28,0.5) 0%, rgba(17,17,28,0.65) 100%)',
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={bannerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9, delay: 0.5, ease: 'easeOut' }}
            className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest drop-shadow-lg"
          >
            THE NBC EXPERIENCE
          </motion.span>
        </motion.div>
      </div>

      {/* ── Content Section ── */}
      <div
        ref={contentRef}
        className="px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-10 md:pb-14 max-w-6xl mx-auto"
      >
        <div className="text-center">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-xs sm:text-sm tracking-[0.4em] uppercase font-semibold mb-4"
            style={{ color: '#0570E5' }}
          >
            Café Vibes
          </motion.p>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4"
            style={{ color: '#11111C' }}
          >
            Where Mornings Begin
            <br />
            <span style={{ color: '#0570E5' }}>&amp; Ideas Flow</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            className="text-base md:text-lg max-w-2xl mx-auto mb-12 md:mb-16"
            style={{ color: '#6B7280' }}
          >
            Every NBC café is designed to be your second home — whether you&apos;re catching up
            with friends, crushing a deadline, or just needing that perfect cup.
          </motion.p>
        </div>
      </div>

      {/* ── Feature Grid ── */}
      <div
        ref={cardsRef}
        className="px-4 sm:px-6 lg:px-8 pb-14 md:pb-20 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + index * 0.08,
                  ease: 'easeOut',
                }}
                className="group relative rounded-2xl p-6 cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white"
                style={{
                  border: '1px solid #E5E7EB',
                }}
              >
                {/* Icon Badge */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor:
                      feature.accent === '#0570E5'
                        ? 'rgba(5, 112, 229, 0.1)'
                        : 'rgba(244, 118, 175, 0.1)',
                  }}
                >
                  <IconComponent
                    className="w-5 h-5"
                    style={{ color: feature.accent }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-lg md:text-xl font-bold mb-2"
                  style={{ color: '#11111C' }}
                >
                  {feature.emoji} {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: '#6B7280' }}
                >
                  {feature.description}
                </p>

                {/* Bottom accent line on hover */}
                <div
                  className="mt-5 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${feature.accent}, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Quick Info Bar ── */}
      <div
        ref={infoRef}
        className="px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="rounded-2xl p-4 sm:p-6"
          style={{
            backgroundColor: '#FDF9EF',
            border: '1px solid #E5E7EB',
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {quickInfo.map((item, index) => {
              const InfoIcon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={infoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.08,
                    ease: 'easeOut',
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full transition-colors duration-200 bg-white hover:shadow-sm"
                  style={{
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <InfoIcon
                    className="w-4 h-4"
                    style={{ color: '#0570E5' }}
                  />
                  <span
                    className="text-xs sm:text-sm font-semibold whitespace-nowrap"
                    style={{ color: '#11111C' }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
