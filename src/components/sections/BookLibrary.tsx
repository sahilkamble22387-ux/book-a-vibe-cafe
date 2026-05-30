'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Genre data                                                          */
/* ------------------------------------------------------------------ */

const genres: string[] = [
  'Fiction',
  'Non-Fiction',
  'Philosophy',
  'Self-Help',
  'Poetry',
  'Business',
  'Science',
  'History',
  'Travel',
  'Memoir',
  'Thriller',
  'Romance',
];

/* ------------------------------------------------------------------ */
/*  Genre Pill Component                                                */
/* ------------------------------------------------------------------ */

interface GenrePillProps {
  genre: string;
  index: number;
  inView: boolean;
}

function GenrePill({ genre, index, inView }: GenrePillProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.4,
        delay: 0.08 + index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.08, backgroundColor: '#6B2737', color: '#FBF7F0' }}
      className="inline-block px-4 py-2 rounded-full text-sm font-medium border cursor-default transition-colors duration-200"
      style={{
        borderColor: '#E8DFD2',
        backgroundColor: '#FFFFFF',
        color: '#6B2737',
      }}
    >
      {genre}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Main BookLibrary Component                                          */
/* ------------------------------------------------------------------ */

export default function BookLibrary() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const genresRef = useRef<HTMLDivElement>(null);
  const genresInView = useInView(genresRef, { once: true, margin: '-60px' });

  const imageRef = useRef<HTMLDivElement>(null);
  const imageInView = useInView(imageRef, { once: true, margin: '-60px' });

  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: '-60px' });

  return (
    <section
      id="library"
      className="relative w-full py-16 sm:py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#FBF7F0' }}
    >
      <div
        ref={sectionRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* ---- Centered Header ---- */}
        <div className="text-center mb-10 sm:mb-14">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] inline-block mb-4"
            style={{ color: '#C4973B' }}
          >
            OUR LIBRARY
          </motion.span>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: 'var(--font-playfair)', color: '#1A1210' }}
          >
            A Book for Every Mood
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: '#8B7D6B' }}
          >
            Browse through thousands of titles spanning every genre — from
            timeless classics to contemporary bestsellers. Grab a book, order a
            coffee, and lose yourself.
          </motion.p>
        </div>

        {/* ---- Genre Tags ---- */}
        <div ref={genresRef} className="mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {genres.map((genre, index) => (
              <GenrePill
                key={genre}
                genre={genre}
                index={index}
                inView={genresInView}
              />
            ))}
          </div>
        </div>

        {/* ---- Center Image: coffee-pour.png ---- */}
        <div ref={imageRef} className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={imageInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-sm sm:max-w-md md:max-w-lg"
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C4973B] aspect-square">
              <Image
                src="/images/coffee-pour.png"
                alt="A perfect coffee pour at Bookavibe — where every cup is crafted with care"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, 500px"
              />
            </div>
          </motion.div>
        </div>

        {/* ---- Bottom Quote ---- */}
        <div ref={quoteRef}>
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center max-w-2xl mx-auto"
          >
            <p
              className="text-lg sm:text-xl md:text-2xl italic leading-relaxed mb-3"
              style={{ fontFamily: 'var(--font-playfair)', color: '#6B2737' }}
            >
              &ldquo;A reader lives a thousand lives before he dies. The man who
              never reads lives only one.&rdquo;
            </p>
            <footer
              className="text-sm sm:text-base font-medium"
              style={{ color: '#C4973B' }}
            >
              — George R.R. Martin
            </footer>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
