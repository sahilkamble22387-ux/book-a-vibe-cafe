'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/* ------------------------------------------------------------------ */
/*  Stat Card Component                                                */
/* ------------------------------------------------------------------ */

interface StatCardProps {
  value: string;
  label: string;
  delay: number;
}

function StatCard({ value, label, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center p-4 sm:p-6 rounded-2xl bg-[#F3F4F6] min-w-[100px]"
    >
      <span className="text-[#0570E5] text-3xl sm:text-4xl font-extrabold leading-tight">
        {value}
      </span>
      <span className="text-[#6B7280] text-sm sm:text-base font-medium mt-1">
        {label}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main OurStory Component                                            */
/* ------------------------------------------------------------------ */

export default function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="our-story"
      className="relative w-full bg-white py-16 sm:py-20 md:py-28 overflow-hidden"
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
            {/* Blue border accent — offset behind the image */}
            <div
              className="absolute -top-3 -left-3 w-full h-full rounded-2xl border-2 border-[#0570E5] z-0"
              aria-hidden="true"
            />
            <div className="relative z-10 rounded-2xl overflow-hidden aspect-[4/3]">
              <Image
                src="/images/about-story.png"
                alt="Nothing Before Coffee — our story begins with freshly brewed coffee"
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
            <span className="text-[#0570E5] text-xs sm:text-sm font-semibold uppercase tracking-[0.2em]">
              Our Story
            </span>

            {/* Heading */}
            <h2 className="text-[#11111C] text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              Born in Jaipur. Brewing Across India.
            </h2>

            {/* Body Text */}
            <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed">
              NBC was founded in 2017 with one goal — to share the enticing
              aroma of freshly brewed coffee with everyone. We believe coffee is
              not just a beverage, but a way of life. From a single outlet in
              Jaipur to 100+ stores across 32+ cities, we&apos;ve made it our
              mission to source the best coffee beans and brew them using the
              latest and most innovative techniques — ensuring every cup is of
              the highest quality. At NBC, your day starts here.
            </p>

            {/* Stat Cards */}
            <div className="flex flex-wrap gap-4 mt-2 sm:mt-4">
              <StatCard value="100+" label="Stores" delay={0.3} />
              <StatCard value="32+" label="Cities" delay={0.45} />
              <StatCard value="2017" label="Founded" delay={0.6} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
