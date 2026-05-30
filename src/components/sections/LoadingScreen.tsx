'use client';

import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface SteamParticle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  drift: number;
  size: number;
}

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  // Generate steam particles deterministically
  const steamParticles: SteamParticle[] = useMemo(() => {
    const arr: SteamParticle[] = [];
    let seed = 17;
    const rand = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 12; i++) {
      arr.push({
        id: i,
        x: 30 + rand() * 40,
        delay: rand() * 1.5,
        duration: 2 + rand() * 2,
        drift: -20 + rand() * 40,
        size: 3 + rand() * 5,
      });
    }
    return arr;
  }, []);

  // Ambient floating particles
  const ambientParticles = useMemo(() => {
    const arr: { id: number; x: number; y: number; size: number; delay: number; duration: number }[] = [];
    let seed = 31;
    const rand = () => {
      seed = (seed * 16807 + 0) % 2147483647;
      return seed / 2147483647;
    };
    for (let i = 0; i < 8; i++) {
      arr.push({
        id: i,
        x: 10 + rand() * 80,
        y: 20 + rand() * 60,
        size: 2 + rand() * 4,
        delay: rand() * 2,
        duration: 4 + rand() * 4,
      });
    }
    return arr;
  }, []);

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#1A1210' }}
    >
      {/* Ambient floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {ambientParticles.map((p) => (
          <motion.div
            key={`ambient-${p.id}`}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              backgroundColor: 'rgba(196, 151, 59, 0.15)',
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-8, 8, -8],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Subtle warm glow behind the book */}
      <motion.div
        className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(196, 151, 59, 0.12) 0%, rgba(107, 39, 55, 0.06) 50%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Center Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative flex flex-col items-center z-10"
      >
        {/* Animated Book Icon */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg
            width="80"
            height="70"
            viewBox="0 0 80 70"
            fill="none"
            className="md:w-[100px] md:h-[88px]"
          >
            {/* Book spine */}
            <motion.rect
              x="36"
              y="8"
              width="8"
              height="54"
              rx="1"
              fill="#6B2737"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{ transformOrigin: 'center bottom' }}
            />

            {/* Left page (opens from center) */}
            <motion.path
              d="M36 12 C36 12, 8 10, 6 14 L6 56 C6 56, 34 54, 36 60 Z"
              fill="#FBF7F0"
              stroke="#8B7D6B"
              strokeWidth="0.5"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: '36px 50%' }}
            />

            {/* Right page (opens from center) */}
            <motion.path
              d="M44 12 C44 12, 72 10, 74 14 L74 56 C74 56, 46 54, 44 60 Z"
              fill="#F5EDE0"
              stroke="#8B7D6B"
              strokeWidth="0.5"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: '44px 50%' }}
            />

            {/* Page lines left */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <line x1="14" y1="22" x2="32" y2="22" stroke="#C4973B" strokeWidth="0.5" opacity="0.5" />
              <line x1="14" y1="28" x2="30" y2="28" stroke="#C4973B" strokeWidth="0.5" opacity="0.4" />
              <line x1="14" y1="34" x2="32" y2="34" stroke="#C4973B" strokeWidth="0.5" opacity="0.5" />
              <line x1="14" y1="40" x2="28" y2="40" stroke="#C4973B" strokeWidth="0.5" opacity="0.3" />
            </motion.g>

            {/* Page lines right */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <line x1="48" y1="22" x2="66" y2="22" stroke="#C4973B" strokeWidth="0.5" opacity="0.5" />
              <line x1="50" y1="28" x2="66" y2="28" stroke="#C4973B" strokeWidth="0.5" opacity="0.4" />
              <line x1="48" y1="34" x2="66" y2="34" stroke="#C4973B" strokeWidth="0.5" opacity="0.5" />
              <line x1="52" y1="40" x2="66" y2="40" stroke="#C4973B" strokeWidth="0.5" opacity="0.3" />
            </motion.g>

            {/* Small coffee cup icon on the right page */}
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <path
                d="M54 46 L54 52 C54 54, 60 54, 60 52 L60 46 Z"
                fill="none"
                stroke="#C4724E"
                strokeWidth="0.8"
              />
              <path
                d="M60 48 C62 48, 63 49, 63 50 C63 51, 62 52, 60 52"
                fill="none"
                stroke="#C4724E"
                strokeWidth="0.6"
              />
            </motion.g>
          </svg>
        </motion.div>

        {/* Steam / Particle effects rising from the book */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-32 pointer-events-none">
          {steamParticles.map((p) => (
            <motion.div
              key={`steam-${p.id}`}
              className="absolute"
              style={{
                left: `${p.x - 50}%`,
                bottom: '0',
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [0, -60, -120, -180],
                x: [0, p.drift * 0.3, p.drift * 0.6, p.drift],
                opacity: [0, 0.5, 0.3, 0],
                scale: [0.8, 1, 0.6],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(196, 151, 59, 0.6) 0%, rgba(196, 151, 59, 0.2) 60%, transparent 100%)',
                }}
              />
            </motion.div>
          ))}

          {/* Wispy steam SVGs */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`wisp-${i}`}
              className="absolute"
              style={{
                left: `${35 + i * 15}%`,
                bottom: '10%',
              }}
              animate={{
                y: [0, -40, -90],
                opacity: [0, 0.35, 0],
                scaleX: [1, 1.2, 0.8],
              }}
              transition={{
                duration: 2.5 + i * 0.4,
                delay: i * 0.5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            >
              <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                <path
                  d={
                    i % 2 === 0
                      ? 'M12 36 C12 28, 6 22, 8 14 C10 6, 12 0, 12 0'
                      : 'M12 36 C12 28, 18 22, 16 14 C14 6, 12 0, 12 0'
                  }
                  stroke="rgba(196, 151, 59, 0.4)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* "Bookavibe" text */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-playfair)', color: '#C4973B' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          Bookavibe
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          className="h-[2px] rounded-full mt-3 mb-3"
          style={{
            background: 'linear-gradient(90deg, transparent, #C4973B, transparent)',
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '140px', opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
        />

        {/* "Books • Bites • Business" */}
        <motion.p
          className="text-sm md:text-base tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-inter)', color: '#8B7D6B' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          Books &bull; Bites &bull; Business
        </motion.p>
      </motion.div>

      {/* Decorative corner elements */}
      <motion.div
        className="absolute top-12 left-[8%] w-12 h-12 rounded-full border border-[#C4973B]/15"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-16 right-[10%] w-8 h-8 rounded-full border border-[#6B2737]/15"
        animate={{ rotate: -360, scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute top-[25%] right-[6%] w-3 h-3 rounded-full"
        style={{ backgroundColor: 'rgba(91, 117, 83, 0.15)' }}
        animate={{ y: [-8, 8, -8], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[6%] w-4 h-4 rounded-full"
        style={{ backgroundColor: 'rgba(196, 151, 59, 0.1)' }}
        animate={{ y: [8, -8, 8], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
