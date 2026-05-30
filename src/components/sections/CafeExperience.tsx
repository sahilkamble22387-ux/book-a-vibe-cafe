"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Armchair,
  Sun,
  Users,
  Laptop,
  Coffee,
  Lamp,
  Wifi,
  Heart,
  Plug,
  Car,
} from "lucide-react";

const features = [
  {
    icon: Armchair,
    title: "Indoor Seating",
    description:
      "Warm wooden interiors, natural light flooding through floor-to-ceiling windows, and the aroma of freshly ground beans.",
    accent: "#2D5A3D",
  },
  {
    icon: Sun,
    title: "Outdoor Terrace",
    description:
      "Al fresco seating under shaded canopies, perfect for Pune's beautiful weather and leisurely conversations.",
    accent: "#C4883A",
  },
  {
    icon: Users,
    title: "Community Tables",
    description:
      "Shared spaces designed for connection — meet fellow coffee lovers, collaborate, or simply be inspired.",
    accent: "#2D5A3D",
  },
  {
    icon: Laptop,
    title: "Work-Friendly",
    description:
      "High-speed Wi-Fi, power outlets at every seat, and bottomless coffee for your most productive days.",
    accent: "#C4883A",
  },
  {
    icon: Coffee,
    title: "Coffee Bar",
    description:
      "Watch our baristas work their magic. Sit at the bar for an up-close experience of craft coffee making.",
    accent: "#2D5A3D",
  },
  {
    icon: Lamp,
    title: "Natural Light",
    description:
      "Thoughtfully designed with biophilic elements, bringing the outdoors in for a calming atmosphere.",
    accent: "#C4883A",
  },
];

const quickInfo = [
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: Heart, label: "Pet Friendly" },
  { icon: Plug, label: "Power Outlets" },
  { icon: Car, label: "Ample Parking" },
];

export default function CafeExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroImageInView = useInView(heroImageRef, { once: true, margin: "-60px" });

  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px" });

  const stripRef = useRef<HTMLDivElement>(null);
  const stripInView = useInView(stripRef, { once: true, margin: "-40px" });

  const infoRef = useRef<HTMLDivElement>(null);
  const infoInView = useInView(infoRef, { once: true, margin: "-40px" });

  // Parallax scroll for hero image
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroImageRef,
    offset: ["start end", "end start"],
  });
  const heroParallaxY = useTransform(heroScrollProgress, [0, 1], [-40, 40]);

  // Parallax scroll for atmosphere strip
  const { scrollYProgress: stripScrollProgress } = useScroll({
    target: stripRef,
    offset: ["start end", "end start"],
  });
  const stripParallaxY = useTransform(stripScrollProgress, [0, 1], [-20, 20]);

  return (
    <section
      id="cafe"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#FAF6F0" }}
    >
      {/* ── Section Header ── */}
      <div
        ref={headerRef}
        className="px-4 sm:px-6 lg:px-8 pt-20 md:pt-28 pb-10 md:pb-14 max-w-6xl mx-auto"
      >
        <div className="text-center md:text-left">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[#8B6914] text-xs sm:text-sm tracking-[0.4em] uppercase mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            THE CAF&Eacute;
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold text-[#3C2415] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            More Than a Caf&eacute;
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="text-base md:text-lg text-[#4A4A4A] max-w-xl"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            A space where coffee, community, and creativity converge
          </motion.p>
        </div>
      </div>

      {/* ── Full-width Hero Image with Parallax ── */}
      <div
        ref={heroImageRef}
        className="relative mx-4 sm:mx-6 lg:mx-8 mb-14 md:mb-20 overflow-hidden rounded-2xl"
        style={{ height: "clamp(260px, 45vw, 480px)" }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: heroParallaxY }}
        >
          <img
            src="/images/cafe-interior.png"
            alt="Blue Tokai Café Interior"
            className="w-full h-full object-cover"
            style={{ minHeight: "calc(100% + 80px)", marginTop: "-40px" }}
          />
        </motion.div>

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroImageInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute inset-0 flex items-center justify-center rounded-2xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(60,36,21,0.15) 0%, rgba(60,36,21,0.45) 100%)",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={heroImageInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
            className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide drop-shadow-lg"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Step into our world
          </motion.span>
        </motion.div>
      </div>

      {/* ── Feature Grid ── */}
      <div
        ref={cardsRef}
        className="px-4 sm:px-6 lg:px-8 pb-14 md:pb-20 max-w-6xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + index * 0.1,
                  ease: "easeOut",
                }}
                className="group relative rounded-2xl p-6 cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: "#FFF8F0",
                  border: "1px solid #E2CDB0",
                }}
              >
                {/* Icon Badge */}
                <div
                  className="inline-flex items-center justify-center w-11 h-11 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundColor:
                      feature.accent === "#2D5A3D"
                        ? "rgba(45,90,61,0.12)"
                        : "rgba(196,136,58,0.14)",
                  }}
                >
                  <IconComponent
                    className="w-5 h-5"
                    style={{ color: feature.accent }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="text-lg md:text-xl font-semibold text-[#3C2415] mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed text-[#4A4A4A]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {feature.description}
                </p>

                {/* Bottom accent line on hover */}
                <div
                  className="mt-5 h-[1px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                  style={{
                    background: `linear-gradient(90deg, ${feature.accent}, rgba(196,136,58,0.15), transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Atmosphere Strip ── */}
      <div
        ref={stripRef}
        className="relative mx-4 sm:mx-6 lg:mx-8 mb-14 md:mb-20 overflow-hidden rounded-2xl"
        style={{ height: "clamp(120px, 18vw, 200px)" }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: stripParallaxY }}
        >
          <img
            src="/images/cafe-outdoor.png"
            alt="Blue Tokai Café Outdoor Terrace"
            className="w-full h-full object-cover"
            style={{ minHeight: "calc(100% + 40px)", marginTop: "-20px" }}
          />
        </motion.div>

        {/* Overlay with hours */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={stripInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="absolute inset-0 flex items-center justify-center rounded-2xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(60,36,21,0.35) 0%, rgba(60,36,21,0.55) 100%)",
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={stripInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            className="text-white text-base sm:text-lg md:text-xl tracking-widest font-medium drop-shadow-md"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Open Daily &middot; 7:00 AM &ndash; 11:00 PM
          </motion.span>
        </motion.div>
      </div>

      {/* ── Quick Info Row ── */}
      <div ref={infoRef} className="px-4 sm:px-6 lg:px-8 pb-20 md:pb-28 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={infoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {quickInfo.map((item, index) => {
            const InfoIcon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={infoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + index * 0.1,
                  ease: "easeOut",
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-200"
                style={{
                  backgroundColor: "#FFF8F0",
                  border: "1px solid #E2CDB0",
                }}
              >
                <InfoIcon className="w-4 h-4 text-[#2D5A3D]" />
                <span
                  className="text-sm font-medium text-[#3C2415]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
