'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Wifi, Plug, Tag, Users } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Feature data                                                        */
/* ------------------------------------------------------------------ */

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Wifi,
    title: 'High-Speed WiFi',
    description: 'Blazing fast internet for seamless video calls and uploads',
  },
  {
    icon: Plug,
    title: 'Power At Every Seat',
    description: 'Charging points at every table, no power struggles',
  },
  {
    icon: Tag,
    title: 'Flexible Pricing',
    description: 'Hourly, half-day, and full-day plans from ₹150',
  },
  {
    icon: Users,
    title: 'Community Vibe',
    description: 'Work alongside creators, freelancers, and innovators',
  },
];

/* ------------------------------------------------------------------ */
/*  Pricing data                                                        */
/* ------------------------------------------------------------------ */

interface PricingPlan {
  name: string;
  price: string;
  unit: string;
  description: string;
  highlighted: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Hourly',
    price: '₹150',
    unit: '/hr',
    description: 'Perfect for quick tasks',
    highlighted: false,
  },
  {
    name: 'Half Day',
    price: '₹400',
    unit: '/4hrs',
    description: 'Best for focused sessions',
    highlighted: true,
  },
  {
    name: 'Full Day',
    price: '₹700',
    unit: '/8hrs',
    description: 'Your productive home base',
    highlighted: false,
  },
];

/* ------------------------------------------------------------------ */
/*  Main TheSpace Component                                             */
/* ------------------------------------------------------------------ */

export default function TheSpace() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const featuresRef = useRef<HTMLDivElement>(null);
  const featuresInView = useInView(featuresRef, { once: true, margin: '-60px' });

  const pricingRef = useRef<HTMLDivElement>(null);
  const pricingInView = useInView(pricingRef, { once: true, margin: '-60px' });

  return (
    <section
      id="space"
      className="relative w-full py-16 sm:py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#1A1210' }}
    >
      <div
        ref={sectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* ---- Top: Image Left, Content Right ---- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 md:mb-20">
          {/* ---- Left Column: Image ---- */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md mx-auto lg:max-w-none"
          >
            {/* Gold border accent */}
            <div
              className="absolute -top-3 -left-3 w-full h-full rounded-2xl border-2 border-[#C4973B]/40 z-0"
              aria-hidden="true"
            />
            <div className="relative z-10 rounded-2xl overflow-hidden aspect-[16/10]">
              <Image
                src="/images/coworking-space.png"
                alt="Bookavibe co-working space — productive and inspiring"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* ---- Right Column: Content ---- */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 sm:gap-5"
          >
            {/* Label */}
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]"
              style={{ color: '#C4973B' }}
            >
              CO-WORKING
            </motion.span>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
              style={{ fontFamily: 'var(--font-playfair)', color: '#FBF7F0' }}
            >
              Your Office, But Better
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: '#A39887' }}
            >
              Fast WiFi. Power at every seat. Coffee on tap. Starting at just ₹150.
            </motion.p>
          </motion.div>
        </div>

        {/* ---- Feature Grid (2x2) ---- */}
        <div ref={featuresRef} className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="glass-dark rounded-xl p-6 border border-white/10 group cursor-default transition-all duration-300 hover:border-[#C4973B]/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#C4973B]/15 shrink-0">
                      <IconComponent className="w-5 h-5" style={{ color: '#C4973B' }} />
                    </div>
                    <div>
                      <h3
                        className="text-base sm:text-lg font-semibold mb-1"
                        style={{ color: '#FBF7F0' }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: '#A39887' }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ---- Pricing Cards Row ---- */}
        <div ref={pricingRef}>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center text-2xl sm:text-3xl font-bold mb-8 sm:mb-10"
            style={{ fontFamily: 'var(--font-playfair)', color: '#FBF7F0' }}
          >
            Choose Your Plan
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto items-end">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={pricingInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className={`glass-dark rounded-xl border-t-2 border-t-[#C4973B] p-6 text-center transition-all duration-300 cursor-default ${
                  plan.highlighted
                    ? 'sm:scale-105 sm:-translate-y-2 border-[#C4973B]/40 shadow-lg shadow-[#C4973B]/10'
                    : 'border-white/10'
                }`}
              >
                {/* Plan Name */}
                <h4
                  className="text-sm font-semibold uppercase tracking-widest mb-3"
                  style={{ color: '#C4973B' }}
                >
                  {plan.name}
                </h4>

                {/* Price */}
                <div className="mb-3">
                  <span
                    className="text-3xl sm:text-4xl font-bold"
                    style={{ fontFamily: 'var(--font-playfair)', color: '#FBF7F0' }}
                  >
                    {plan.price}
                  </span>
                  <span
                    className="text-sm ml-0.5"
                    style={{ color: '#A39887' }}
                  >
                    {plan.unit}
                  </span>
                </div>

                {/* Description */}
                <p
                  className="text-sm"
                  style={{ color: '#A39887' }}
                >
                  {plan.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
