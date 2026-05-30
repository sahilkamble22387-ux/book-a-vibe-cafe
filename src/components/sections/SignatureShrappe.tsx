'use client';

import { useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Bubble Particle — small circle drifting upward                     */
/* ------------------------------------------------------------------ */

interface BubbleParticleProps {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  color: string;
}

function BubbleParticle({ x, y, size, duration, delay, drift, color }: BubbleParticleProps) {
  return (
    <motion.span
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      }}
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{
        opacity: [0, 0.5, 0.3, 0],
        y: [0, -100, -200, -320],
        x: [0, drift * 0.3, drift, drift * 0.5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Bubble Field — generates a deterministic set of bubbles            */
/* ------------------------------------------------------------------ */

function BubbleField() {
  const bubbles = useMemo<BubbleParticleProps[]>(() => {
    const count = 24;
    const arr: BubbleParticleProps[] = [];
    let seed = 77;
    const nextRand = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return seed / 2147483647;
    };
    const colors = [
      'rgba(5, 112, 229, 0.35)',
      'rgba(244, 118, 175, 0.35)',
      'rgba(5, 112, 229, 0.25)',
      'rgba(244, 118, 175, 0.25)',
    ];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: 5 + nextRand() * 90,
        y: 40 + nextRand() * 55,
        size: 4 + nextRand() * 10,
        duration: 5 + nextRand() * 7,
        delay: nextRand() * 5,
        drift: -30 + nextRand() * 60,
        color: colors[Math.floor(nextRand() * colors.length)],
      });
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map((b, i) => (
        <BubbleParticle key={i} {...b} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Flavor data                                                        */
/* ------------------------------------------------------------------ */

interface Flavor {
  name: string;
  emoji: string;
  accent: string;
  bgColor: string;
}

const flavors: Flavor[] = [
  {
    name: 'Creamy Shrappe',
    emoji: '🍦',
    accent: '#9CA3AF',
    bgColor: 'rgba(255, 255, 255, 0.95)',
  },
  {
    name: 'Nutella Shrappe',
    emoji: '🌰',
    accent: '#8B6914',
    bgColor: 'rgba(139, 105, 20, 0.08)',
  },
  {
    name: 'Brownie Shrappe',
    emoji: '🍫',
    accent: '#6B3410',
    bgColor: 'rgba(107, 52, 16, 0.08)',
  },
  {
    name: 'Lotus Biscoff',
    emoji: '🍪',
    accent: '#C4883A',
    bgColor: 'rgba(196, 136, 58, 0.08)',
  },
  {
    name: 'Mango Delight',
    emoji: '🥭',
    accent: '#E5A700',
    bgColor: 'rgba(229, 167, 0, 0.08)',
  },
];

/* ------------------------------------------------------------------ */
/*  Main SignatureShrappe Component                                    */
/* ------------------------------------------------------------------ */

export default function SignatureShrappe() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' });

  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: '-40px' });

  return (
    <section
      id="shrappe"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#11111C' }}
    >
      {/* ── Animated Bubbles ── */}
      <BubbleField />

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* ── Left: Image (60%) ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-[60%] relative"
          >
            {/* Blue glow behind image */}
            <div
              className="absolute -inset-6 md:-inset-10 rounded-full blur-3xl opacity-40 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(5, 112, 229, 0.5) 0%, rgba(5, 112, 229, 0.15) 40%, transparent 70%)',
              }}
            />
            <div className="relative w-full aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="/images/shrappe-hero.png"
                alt="NBC Signature Shrappe — where shake meets frappe"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>

          {/* ── Right: Content (40%) ── */}
          <div
            ref={contentRef}
            className="w-full lg:w-[40%] flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold mb-3"
              style={{ color: '#F476AF' }}
            >
              NBC Signature
            </motion.p>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-3"
            >
              THE{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #0570E5, #F476AF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                SHRAPPE
              </span>
            </motion.h2>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="text-lg md:text-xl font-medium text-gray-400 mb-5"
            >
              Where Shake Meets Frappe
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="text-sm md:text-base leading-relaxed text-gray-400 mb-8 max-w-md"
            >
              Our unique Shrappe is the love child of Shakes and Frappes — creamy, indulgent, and
              utterly irresistible. It&apos;s not just a drink, it&apos;s a mood. Available in
              multiple flavors from classic Creamy to decadent Nutella, Brownie, and Lotus Biscoff.
            </motion.p>

            {/* Flavor Cards */}
            <div ref={cardsRef} className="w-full mb-8">
              {/* Horizontal scroll on mobile, centered flex-wrap on desktop */}
              <div className="flex flex-nowrap lg:flex-wrap lg:justify-center gap-3 overflow-x-auto pb-3 lg:pb-0 scrollbar-hide -mx-1 px-1">
                {flavors.map((flavor, index) => (
                  <motion.div
                    key={flavor.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + index * 0.08,
                      ease: 'easeOut',
                    }}
                    className="group flex-shrink-0 w-[150px] lg:w-auto rounded-xl px-5 py-3.5 cursor-default transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{
                      backgroundColor: flavor.bgColor,
                      border: `1.5px solid ${flavor.accent}30`,
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{flavor.emoji}</span>
                      <span
                        className="text-sm font-semibold whitespace-nowrap"
                        style={{ color: flavor.accent }}
                      >
                        {flavor.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.a
              href="#order"
              initial={{ opacity: 0, y: 20 }}
              animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base text-white transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F476AF]"
              style={{
                backgroundColor: '#F476AF',
                boxShadow: '0 4px 24px rgba(244, 118, 175, 0.35)',
              }}
            >
              <span>Try a Shrappe Today</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>
          </div>
        </div>
      </div>

      {/* ── Bottom Edge Gradient ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #FFFFFF 0%, transparent 100%)',
        }}
      />
    </section>
  );
}
