'use client';

import { useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, MapPin, Coffee, CalendarDays } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Coffee Particle — tiny dot drifting upward like steam             */
/* ------------------------------------------------------------------ */

interface CoffeeParticleProps {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

function CoffeeParticle({ x, y, size, duration, delay, drift }: CoffeeParticleProps) {
  return (
    <motion.span
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: `radial-gradient(circle, rgba(196,136,58,0.5) 0%, rgba(196,136,58,0) 70%)`,
      }}
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{
        opacity: [0, 0.6, 0.3, 0],
        y: [0, -80, -160, -240],
        x: [0, drift * 0.3, drift, drift * 0.6],
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
/*  Particle field — generates a deterministic set of particles       */
/* ------------------------------------------------------------------ */

function ParticleField() {
  // Use a simple seeded approach so particles stay consistent across renders
  const particles = useMemo<CoffeeParticleProps[]>(() => {
    const count = 28;
    const arr: CoffeeParticleProps[] = [];
    let seed = 42;
    const nextRand = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < count; i++) {
      arr.push({
        x: 10 + nextRand() * 80,
        y: 50 + nextRand() * 50,
        size: 3 + nextRand() * 5,
        duration: 6 + nextRand() * 8,
        delay: nextRand() * 6,
        drift: -40 + nextRand() * 80,
      });
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p, i) => (
        <CoffeeParticle key={i} {...p} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Hero Component                                               */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax — background moves slower than scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  /* ---------------------------------------------------------------- */
  /*  Stagger animation variants                                      */
  /* ---------------------------------------------------------------- */

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
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

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] max-h-[1200px] overflow-hidden"
    >
      {/* ---- Parallax Background Image ---- */}
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{ y: bgY }}
      >
        <img
          src="/images/hero.png"
          alt="Blue Tokai Coffee Roasters — specialty coffee being poured"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
      </motion.div>

      {/* ---- Dark Gradient Overlay ---- */}
      <motion.div
        className="absolute inset-0 z-[2]"
        style={{
          opacity: overlayOpacity,
          background:
            'linear-gradient(180deg, #1A0F08 0%, #2C1810DD 35%, #2C1810AA 55%, transparent 100%)',
        }}
      />

      {/* ---- Subtle vignette ---- */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(26,15,8,0.5) 100%)',
        }}
      />

      {/* ---- Floating Coffee Particles ---- */}
      <ParticleField />

      {/* ---- Main Content ---- */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 max-w-4xl"
        >
          {/* Decorative Accent Line */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="block w-8 h-[1px] bg-[#C4883A]/60" />
            <span className="block w-1.5 h-1.5 rounded-full bg-[#C4883A]/80" />
            <span className="block w-8 h-[1px] bg-[#C4883A]/60" />
          </motion.div>

          {/* Brand Name — Small Caps */}
          <motion.p
            variants={itemVariants}
            className="font-[family-name:var(--font-inter)] text-[#C4883A] uppercase tracking-[0.5em] text-[10px] sm:text-xs md:text-sm font-medium leading-none"
          >
            Blue Tokai Coffee Roasters
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-[family-name:var(--font-playfair)] text-[#F0E6D6] font-bold leading-[1.05] text-5xl md:text-7xl lg:text-8xl"
          >
            From Farm
            <br />
            to Cup
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="font-[family-name:var(--font-playfair)] italic text-[#C4883A] text-xl md:text-2xl font-normal"
          >
            India&apos;s Specialty Coffee Story
          </motion.p>

          {/* Decorative Accent Line — bottom */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mt-1">
            <span className="block w-12 h-[1px] bg-[#C4883A]/40" />
            <Coffee className="w-4 h-4 text-[#C4883A]/60" strokeWidth={1.5} />
            <span className="block w-12 h-[1px] bg-[#C4883A]/40" />
          </motion.div>

          {/* Location Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#C4883A]/30 bg-[#1A0F08]/60 backdrop-blur-sm mt-1"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C4883A]" strokeWidth={2} />
            <span className="font-[family-name:var(--font-inter)] text-[#F0E6D6] text-xs sm:text-sm font-medium tracking-wide">
              Kalyani Nagar
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 sm:mt-6"
          >
            {/* Primary CTA */}
            <a
              href="#coffee"
              className="group relative inline-flex items-center gap-2 px-7 py-3.5 bg-[#C4883A] text-[#1A0F08] font-[family-name:var(--font-inter)] font-semibold text-sm tracking-wide rounded-sm overflow-hidden transition-colors duration-300 hover:bg-[#D49A4C] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4883A]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Coffee className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" strokeWidth={2} />
                Explore Our Coffee
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#D49A4C] to-[#C4883A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            {/* Secondary CTA */}
            <a
              href="#reserve"
              className="group inline-flex items-center gap-2 px-7 py-3.5 border border-[#C4883A]/50 text-[#F0E6D6] font-[family-name:var(--font-inter)] font-medium text-sm tracking-wide rounded-sm transition-all duration-300 hover:border-[#C4883A] hover:bg-[#C4883A]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4883A]"
            >
              <CalendarDays className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2} />
              Reserve a Table
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---- Scroll Indicator ---- */}
      <motion.div
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 2 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="font-[family-name:var(--font-inter)] text-[#F0E6D6]/50 text-[10px] uppercase tracking-[0.3em]">
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
          <ChevronDown className="w-5 h-5 text-[#C4883A]/70" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* ---- Bottom Edge Gradient — blends into next section ---- */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #FAF6F0 0%, transparent 100%)',
        }}
      />
    </section>
  );
}
