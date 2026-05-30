'use client';

import { useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Book / Page Particle — small rectangles drifting gently            */
/* ------------------------------------------------------------------ */

interface PageParticleProps {
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  opacity: number;
  color: string;
}

function PageParticle({
  x,
  y,
  size,
  rotation,
  duration,
  delay,
  driftX,
  driftY,
  opacity,
  color,
}: PageParticleProps) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size * 1.4,
        borderRadius: '1px',
        backgroundColor: color,
        opacity: 0,
      }}
      animate={{
        y: [0, driftY],
        x: [0, driftX],
        opacity: [0, opacity, opacity * 0.6, 0],
        rotate: [rotation, rotation + 15, rotation - 10],
        scale: [0.8, 1, 0.7],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Particle Field — deterministic set of book/page particles          */
/* ------------------------------------------------------------------ */

function BookParticleField() {
  const particles = useMemo<PageParticleProps[]>(() => {
    const count = 18;
    const arr: PageParticleProps[] = [];
    let seed = 57;
    const nextRand = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return seed / 2147483647;
    };
    const colors = [
      'rgba(196, 151, 59, 0.25)',   // Gold
      'rgba(196, 151, 59, 0.15)',   // Gold lighter
      'rgba(251, 247, 240, 0.2)',   // Cream
      'rgba(251, 247, 240, 0.12)',  // Cream lighter
      'rgba(107, 39, 55, 0.2)',     // Burgundy
      'rgba(91, 117, 83, 0.15)',    // Sage
    ];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: 5 + nextRand() * 90,
        y: 15 + nextRand() * 70,
        size: 4 + nextRand() * 8,
        rotation: -30 + nextRand() * 60,
        duration: 8 + nextRand() * 12,
        delay: nextRand() * 6,
        driftX: -40 + nextRand() * 80,
        driftY: -60 - nextRand() * 80,
        opacity: 0.15 + nextRand() * 0.3,
        color: colors[Math.floor(nextRand() * colors.length)],
      });
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p, i) => (
        <PageParticle key={i} {...p} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Hero Component                                                */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax — background moves slower than scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  /* ---------------------------------------------------------------- */
  /*  Stagger animation variants                                      */
  /* ---------------------------------------------------------------- */

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
    >
      {/* ---- Background Image with Parallax ---- */}
      <motion.div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{ y: bgY }}
      >
        <Image
          src="/images/hero-cafe.png"
          alt="Bookavibe — Pune's favourite book cafe and co-working space on FC Road"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* ---- Dark Gradient Overlay (left darker → right lighter) ---- */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'linear-gradient(105deg, rgba(26, 18, 16, 0.88) 0%, rgba(26, 18, 16, 0.7) 35%, rgba(26, 18, 16, 0.45) 65%, rgba(26, 18, 16, 0.3) 100%)',
        }}
      />

      {/* ---- Floating Book / Page Particles ---- */}
      <BookParticleField />

      {/* ---- Main Content (left-aligned) ---- */}
      <motion.div
        className="relative z-20 flex items-center min-h-screen px-6 sm:px-10 lg:px-16 xl:px-24"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl lg:max-w-3xl"
        >
          {/* Small label */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-4 sm:mb-6"
            style={{
              fontFamily: 'var(--font-inter)',
              color: '#C4973B',
            }}
          >
            Pune&apos;s Favourite Book Cafe
          </motion.p>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="leading-[1.05] mb-4 sm:mb-6"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold"
              style={{ color: '#FBF7F0' }}
            >
              Where Books
            </span>
            <span
              className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mt-1"
              style={{
                background: 'linear-gradient(135deg, #C4973B 0%, #D4AD5E 50%, #C4973B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Meet Brews
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mb-8 sm:mb-10"
            style={{
              fontFamily: 'var(--font-inter)',
              color: 'rgba(251, 247, 240, 0.75)',
            }}
          >
            Read, work, and unwind — all under one roof. Premium Chikmagalur coffee,
            thousands of books, and a space that inspires.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            {/* Explore the Space — burgundy bg */}
            <button
              onClick={() => {
                const el = document.getElementById('space');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#6B2737] text-[#FBF7F0] font-semibold text-sm sm:text-base tracking-wide rounded-full transition-all duration-300 hover:bg-[#8B3A4A] hover:shadow-lg hover:shadow-[#6B2737]/30 hover:-translate-y-0.5 focus-ring"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Explore the Space
            </button>

            {/* Book a Table — outline with cream border */}
            <button
              onClick={() => {
                const el = document.getElementById('visit');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-transparent text-[#FBF7F0] font-semibold text-sm sm:text-base tracking-wide rounded-full border-2 border-[#FBF7F0]/40 transition-all duration-300 hover:bg-[#FBF7F0]/10 hover:border-[#FBF7F0]/70 hover:-translate-y-0.5 focus-ring"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Book a Table
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---- Scroll Indicator ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span
          className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-medium"
          style={{ fontFamily: 'var(--font-inter)', color: 'rgba(251, 247, 240, 0.4)' }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ChevronDown className="w-5 h-5" style={{ color: 'rgba(251, 247, 240, 0.5)' }} strokeWidth={2} />
        </motion.div>
      </motion.div>

      {/* ---- Bottom Gradient — smooth transition to next section ---- */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #FBF7F0 0%, rgba(251, 247, 240, 0.6) 40%, transparent 100%)',
        }}
      />
    </section>
  );
}
