'use client';

import { useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Coffee Bean Particle — small circles drifting upward               */
/* ------------------------------------------------------------------ */

interface ParticleProps {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  color: string;
}

function CoffeeParticle({ x, y, size, duration, delay, drift, color }: ParticleProps) {
  return (
    <motion.span
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        background: color,
      }}
      initial={{ opacity: 0, y: 0, x: 0 }}
      animate={{
        opacity: [0, 0.7, 0.4, 0],
        y: [0, -100, -200, -320],
        x: [0, drift * 0.3, drift, drift * 0.5],
        scale: [0.8, 1, 0.9, 0.6],
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
/*  Particle Field — deterministic set of coffee bean particles        */
/* ------------------------------------------------------------------ */

function ParticleField() {
  const particles = useMemo<ParticleProps[]>(() => {
    const count = 30;
    const arr: ParticleProps[] = [];
    let seed = 42;
    const nextRand = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return seed / 2147483647;
    };
    const colors = [
      'rgba(5, 112, 229, 0.5)',   // NBC Blue
      'rgba(244, 118, 175, 0.5)',  // NBC Pink
      'rgba(5, 112, 229, 0.35)',
      'rgba(244, 118, 175, 0.35)',
      'rgba(221, 83, 80, 0.3)',    // NBC Red
    ];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: 5 + nextRand() * 90,
        y: 40 + nextRand() * 60,
        size: 4 + nextRand() * 8,
        duration: 7 + nextRand() * 10,
        delay: nextRand() * 8,
        drift: -50 + nextRand() * 100,
        color: colors[Math.floor(nextRand() * colors.length)],
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
/*  Main Hero Component                                                */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax — background moves slower than scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* ---------------------------------------------------------------- */
  /*  Stagger animation variants                                      */
  /* ---------------------------------------------------------------- */

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.18, delayChildren: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* ---- Background Image with Parallax ---- */}
      <motion.div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{ y: bgY }}
      >
        <Image
          src="/images/hero-bg.png"
          alt="Nothing Before Coffee — bold, energetic coffee experience"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* ---- Dark Overlay ---- */}
      <div
        className="absolute inset-0 z-[2]"
        style={{ backgroundColor: 'rgba(17, 17, 28, 0.6)' }}
      />

      {/* ---- Floating Coffee Bean Particles ---- */}
      <ParticleField />

      {/* ---- Main Content ---- */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-4 sm:gap-5 md:gap-6 max-w-4xl"
        >
          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-white font-extrabold leading-[1.05] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight"
          >
            BRING ON
            <br />
            THE BUZZ
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-white/80 text-lg sm:text-xl md:text-2xl font-light max-w-2xl leading-relaxed"
          >
            High Quality Coffee. Budget Friendly Prices. Zero Compromise.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-6"
          >
            {/* Explore Menu */}
            <a
              href="#menu"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#0570E5] text-white font-semibold text-sm sm:text-base tracking-wide rounded-full transition-all duration-300 hover:bg-[#0455B4] hover:shadow-lg hover:shadow-[#0570E5]/30 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0570E5]"
            >
              Explore Menu
            </a>

            {/* Order Now */}
            <a
              href="https://stores.nothingbeforecoffee.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#DD5350] text-white font-semibold text-sm sm:text-base tracking-wide rounded-full transition-all duration-300 hover:bg-[#C44040] hover:shadow-lg hover:shadow-[#DD5350]/30 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DD5350]"
            >
              Order Now
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---- Scroll Indicator ---- */}
      <motion.div
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] sm:text-xs uppercase tracking-[0.3em] font-medium">
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
          <ChevronDown className="w-5 h-5 text-white/50" strokeWidth={2} />
        </motion.div>
      </motion.div>

      {/* ---- Bottom Gradient — smooth transition to next section ---- */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, #FFFFFF 0%, rgba(255,255,255,0.6) 40%, transparent 100%)',
        }}
      />
    </section>
  );
}
