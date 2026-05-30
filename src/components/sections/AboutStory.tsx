'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Pillar Card Component                                              */
/* ------------------------------------------------------------------ */

interface PillarCardProps {
  emoji: string;
  title: string;
  description: string;
  delay: number;
}

function PillarCard({ emoji, title, description, delay }: PillarCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(107, 39, 55, 0.1)' }}
      className="bg-white rounded-xl border border-[#E8DFD2] p-6 text-center cursor-default transition-shadow duration-300"
    >
      <span className="text-4xl mb-3 block">{emoji}</span>
      <h3
        className="text-lg font-bold mb-1.5"
        style={{ fontFamily: 'var(--font-playfair)', color: '#1A1210' }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: '#8B7D6B' }}>
        {description}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main AboutStory Component                                          */
/* ------------------------------------------------------------------ */

export default function AboutStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const pillars = [
    {
      emoji: '📚',
      title: 'Books',
      description: 'Thousands of titles across every genre',
    },
    {
      emoji: '☕',
      title: 'Bites',
      description: 'Premium Chikmagalur coffee & fresh bites',
    },
    {
      emoji: '💻',
      title: 'Business',
      description: 'High-speed WiFi & productive workspaces',
    },
  ];

  return (
    <section
      id="about"
      className="relative w-full py-16 sm:py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#FBF7F0' }}
    >
      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ---- Left Column: Image ---- */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md mx-auto lg:max-w-none"
          >
            {/* Burgundy border accent — offset behind the image */}
            <div
              className="absolute -top-3 -left-3 w-full h-full rounded-2xl border-2 border-[#6B2737] z-0"
              aria-hidden="true"
            />
            <div className="relative z-10 rounded-2xl overflow-hidden aspect-[16/10]">
              <Image
                src="/images/book-reading.png"
                alt="Reading at Bookavibe — a cozy corner with books and coffee"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* ---- Right Column: Story Content ---- */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5 sm:gap-6"
          >
            {/* Label */}
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]"
              style={{ color: '#C4973B' }}
            >
              OUR STORY
            </motion.span>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-playfair)', color: '#1A1210' }}
            >
              Born from a Simple Idea
            </motion.h2>

            {/* Paragraph 1 */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: '#8B7D6B' }}
            >
              What if you could walk into a space that feeds your mind, fuels
              your creativity, and serves an incredible cup of coffee? That&apos;s
              the question that sparked Bookavibe.
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: '#8B7D6B' }}
            >
              Nestled on FC Road, Pune, we created a haven where book lovers,
              remote workers, dreamers, and doers come together. Whether
              you&apos;re deep into a novel, cracking a deadline, or just need a
              quiet corner with great coffee — this is your space.
            </motion.p>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2 sm:mt-4">
              {pillars.map((pillar, index) => (
                <PillarCard
                  key={pillar.title}
                  emoji={pillar.emoji}
                  title={pillar.title}
                  description={pillar.description}
                  delay={0.6 + index * 0.12}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
