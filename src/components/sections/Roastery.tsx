"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Flame, Search, Award } from "lucide-react";

const features = [
  {
    icon: Flame,
    title: "Roast Profiles",
    description:
      "From light and fruity to dark and bold, each profile is meticulously crafted to unlock the bean's true potential.",
  },
  {
    icon: Search,
    title: "Bean Selection",
    description:
      "We source only the top 1% of India's Arabica beans, selecting for flavor complexity and story.",
  },
  {
    icon: Award,
    title: "Quality Rituals",
    description:
      "Every roast is cupped, graded, and approved before it reaches your cup. No compromises.",
  },
];

const stats = [
  { value: "12+", label: "Estate Partners" },
  { value: "50+", label: "Roast Profiles" },
  { value: "72hr", label: "Freshness Guarantee" },
  { value: "100%", label: "Traceable" },
];

export default function Roastery() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px" });

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  return (
    <section
      id="roastery"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1A0F08 0%, #2C1810 100%)",
      }}
    >
      {/* Background Image with Overlay */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.15 }}
        animate={isInView ? { scale: 1.05 } : { scale: 1.15 }}
        transition={{ duration: 12, ease: "easeOut" }}
      >
        <img
          src="/images/roastery.png"
          alt="Blue Tokai Roastery"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(26, 15, 8, 0.85) 0%, rgba(44, 24, 16, 0.75) 40%, rgba(44, 24, 16, 0.8) 70%, rgba(26, 15, 8, 0.95) 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 md:py-32 min-h-screen">
        {/* Header Content */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          {/* Section Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-[#C4883A] text-xs sm:text-sm tracking-[0.4em] uppercase mb-6"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            THE ROASTERY
          </motion.p>

          {/* Decorative Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={headerInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-20 h-[2px] mx-auto mb-8"
            style={{
              background: "linear-gradient(90deg, transparent, #C4883A, transparent)",
            }}
          />

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold text-[#F0E6D6] mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Where Art Meets Fire
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="text-lg md:text-xl text-[#C4883A] italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Every bean tells a story of precision and passion
          </motion.p>
        </div>

        {/* Feature Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl w-full mx-auto mb-20 md:mb-24"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.7,
                delay: 0.3 + index * 0.2,
                ease: "easeOut",
              }}
              className="group relative rounded-2xl p-6 md:p-8 cursor-default transition-all duration-500 border border-transparent hover:border-[#B87333]/50 espresso-glow"
              style={{
                background: "rgba(255, 248, 240, 0.08)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
              }}
            >
              {/* Subtle espresso glow overlay on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow:
                    "inset 0 0 40px rgba(196, 136, 58, 0.08), 0 0 30px rgba(196, 136, 58, 0.1)",
                }}
              />

              {/* Icon */}
              <motion.div
                className="relative mb-5 inline-flex items-center justify-center w-12 h-12 rounded-xl"
                style={{
                  background: "rgba(196, 136, 58, 0.15)",
                }}
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 3 + index * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <feature.icon className="w-6 h-6 text-[#C4883A]" />
              </motion.div>

              {/* Title */}
              <h3
                className="text-xl md:text-2xl font-semibold text-[#F0E6D6] mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm md:text-base leading-relaxed text-[#D4B48A]/80"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {feature.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="mt-6 h-[1px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                style={{
                  background:
                    "linear-gradient(90deg, #C4883A, rgba(196, 136, 58, 0.2), transparent)",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stat Bar */}
        <div ref={statsRef} className="w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-0"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="flex items-center">
                {/* Stat Item */}
                <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 px-6 sm:px-8 py-4 sm:py-2">
                  <span
                    className="text-2xl md:text-3xl font-bold text-[#C4883A]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs sm:text-sm tracking-wider text-[#D4B48A]/90 uppercase"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {stat.label}
                  </span>
                </div>

                {/* Divider */}
                {index < stats.length - 1 && (
                  <div
                    className="hidden sm:block w-[1px] h-10"
                    style={{ background: "rgba(212, 180, 138, 0.25)" }}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Stat bar bottom accent */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={statsInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="mt-4 h-[1px] mx-auto w-3/4"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(196, 136, 58, 0.3), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
