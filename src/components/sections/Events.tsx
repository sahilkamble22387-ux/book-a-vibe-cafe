'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Mic, PartyPopper, Pencil, Laugh } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Event Types Data                                                   */
/* ------------------------------------------------------------------ */

interface EventType {
  emoji: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const eventTypes: EventType[] = [
  {
    emoji: '🎤',
    title: 'Open Mic',
    description: 'Poetry, music, storytelling — every week',
    icon: Mic,
  },
  {
    emoji: '😂',
    title: 'Stand-up Comedy',
    description: 'Laugh your evening away with local comedians',
    icon: Laugh,
  },
  {
    emoji: '🎉',
    title: 'Private Parties',
    description: 'Celebrate milestones in our cozy space',
    icon: PartyPopper,
  },
  {
    emoji: '📝',
    title: 'Workshops',
    description: 'From writing to art, learn something new',
    icon: Pencil,
  },
];

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const headerContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const headerItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const contentVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
};

const quoteVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.5, ease: 'easeOut' },
  },
};

/* ------------------------------------------------------------------ */
/*  Event Card Component                                               */
/* ------------------------------------------------------------------ */

function EventCard({ event }: { event: EventType }) {
  const IconComp = event.icon;

  return (
    <motion.div
      variants={cardVariants}
      className="glass-dark rounded-2xl p-5 sm:p-6 border border-white/10 transition-all duration-300 hover:border-[#C4973B]/40 hover:shadow-lg hover:shadow-[#C4973B]/5 group cursor-default"
    >
      <div className="flex items-start gap-4">
        {/* Emoji / Icon */}
        <div
          className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: 'rgba(196,151,59,0.15)' }}
        >
          <span className="text-2xl">{event.emoji}</span>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <h4
            className="text-base sm:text-lg font-bold text-[#FBF7F0] mb-1"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {event.title}
          </h4>
          <p className="text-sm text-[#8B7D6B] leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Events Component                                              */
/* ------------------------------------------------------------------ */

export default function Events() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const contentInView = useInView(contentRef, { once: true, margin: '-80px' });
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
  const quoteInView = useInView(quoteRef, { once: true, margin: '-40px' });

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#1A1210' }}
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ backgroundColor: '#C4973B' }}
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ backgroundColor: '#6B2737' }}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 max-w-7xl mx-auto">
        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate={contentInView ? 'visible' : 'hidden'}
            ref={contentRef}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden aspect-[7/4] lg:aspect-[4/3]">
              <Image
                src="/images/events-openmic.png"
                alt="Open Mic Events at Bookavibe"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(26,18,16,0.30) 0%, rgba(26,18,16,0.05) 100%)',
                }}
              />
            </div>
            {/* Floating badge */}
            <div
              className="absolute -bottom-4 -right-4 sm:bottom-4 sm:right-4 px-4 py-2 rounded-xl text-sm font-semibold text-[#1A1210] shadow-lg"
              style={{ backgroundColor: '#C4973B' }}
            >
              🎤 Live Events Weekly
            </div>
          </motion.div>

          {/* Right — Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="text-[#C4973B] text-xs sm:text-sm tracking-[0.35em] uppercase font-semibold mb-4"
              >
                EVENTS &amp; COMMUNITY
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FBF7F0] mb-4 leading-tight"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                More Than Just a Cafe
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
                className="text-base sm:text-lg text-[#8B7D6B] leading-relaxed"
              >
                Bookavibe is where Pune&apos;s creative community comes alive. Host your
                next event or join one of ours.
              </motion.p>
            </div>

            {/* Event Types Grid */}
            <div ref={gridRef}>
              <motion.div
                variants={cardContainerVariants}
                initial="hidden"
                animate={gridInView ? 'visible' : 'hidden'}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {eventTypes.map((event) => (
                  <EventCard key={event.title} event={event} />
                ))}
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
            >
              <a
                href="tel:7030073737"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[#1A1210] font-semibold text-sm sm:text-base tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#C4973B]/20 hover:scale-105"
                style={{ backgroundColor: '#C4973B' }}
              >
                Host Your Event
              </a>
            </motion.div>
          </div>
        </div>

        {/* Testimonial Quote */}
        <motion.div
          ref={quoteRef}
          variants={quoteVariants}
          initial="hidden"
          animate={quoteInView ? 'visible' : 'hidden'}
          className="mt-16 md:mt-20 max-w-3xl mx-auto text-center"
        >
          <div
            className="rounded-2xl p-8 sm:p-10 border border-white/10"
            style={{ backgroundColor: 'rgba(26,18,16,0.6)' }}
          >
            {/* Quote mark */}
            <div className="text-4xl sm:text-5xl mb-4" style={{ color: '#C4973B' }}>
              &ldquo;
            </div>
            <p
              className="text-base sm:text-lg text-[#FBF7F0]/90 leading-relaxed mb-4 italic"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              The vibe here is unmatched. I&apos;ve hosted three open mics and every
              single one was magical. The space just draws out creativity.
            </p>
            <p className="text-sm text-[#8B7D6B] font-medium">
              — A regular performer
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
