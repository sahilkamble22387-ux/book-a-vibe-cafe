"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CategoryCard {
  number: string;
  title: string;
  image: string;
  items: string[];
}

const categories: CategoryCard[] = [
  {
    number: "01",
    title: "Espresso Favorites",
    image: "/images/espresso.png",
    items: ["Classic Espresso", "Americano", "Doppio", "Espresso Con Panna"],
  },
  {
    number: "02",
    title: "Manual Brew Selection",
    image: "/images/manual-brew.png",
    items: ["V60 Pour Over", "AeroPress", "French Press", "Chemex"],
  },
  {
    number: "03",
    title: "Seasonal Single Origins",
    image: "/images/single-origin.png",
    items: ["Coorg Estate", "Chikmagalur Reserve", "Nilgiri Select", "Baba Budan"],
  },
  {
    number: "04",
    title: "Signature Beverages",
    image: "/images/signature-bev.png",
    items: ["Tokai Cold Brew", "Caramel Affogato", "Spiced Mocha", "Honeycomb Latte"],
  },
];

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const cardContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.4, ease: "easeOut" },
  },
};

function CategoryCardComponent({ card, index }: { card: CategoryCard; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer espresso-glow"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810EE] via-[#2C1810]/40 to-transparent" />

      {/* Hover Additional Overlay */}
      <motion.div
        className="absolute inset-0 bg-[#2C1810]/20"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Category Number - with subtle pulse animation */}
      <motion.div
        className="absolute top-4 right-5 sm:top-6 sm:right-6 text-6xl sm:text-7xl md:text-8xl font-bold leading-none select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-playfair)",
          WebkitTextStroke: "1.5px rgba(196, 136, 58, 0.2)",
          WebkitTextFillColor: "rgba(196, 136, 58, 0.3)",
          color: "transparent",
        }}
        animate={{
          opacity: isHovered ? 0.5 : [0.3, 0.45, 0.3],
          scale: isHovered ? 1.05 : [1, 1.03, 1],
        }}
        transition={
          isHovered
            ? { duration: 0.3 }
            : { duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
        }
      >
        {card.number}
      </motion.div>

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
        {/* Items List - slides up on hover */}
        <div className="overflow-hidden">
          <motion.div
            animate={{
              y: isHovered ? 0 : 50,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2"
          >
            {card.items.map((item, itemIndex) => (
              <motion.p
                key={item}
                animate={{
                  y: isHovered ? 0 : 12,
                  opacity: isHovered ? 1 : 0,
                }}
                transition={{
                  duration: 0.3,
                  delay: isHovered ? 0.05 + itemIndex * 0.06 : 0,
                  ease: "easeOut",
                }}
                className="text-sm sm:text-base text-[#D4B48A] flex items-center gap-2"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span className="w-1 h-1 rounded-full bg-[#C4883A] flex-shrink-0" />
                {item}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Category Title */}
        <h3
          className="text-xl sm:text-2xl text-[#F0E6D6] font-semibold leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {card.title}
        </h3>
      </div>
    </motion.div>
  );
}

export default function CoffeeCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-40px" });

  return (
    <section
      id="coffee"
      ref={sectionRef}
      className="relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 lg:px-8 bg-[#FAF6F0]"
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 texture-burlap opacity-40 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={headerVariants}
          className="text-center mb-14 sm:mb-18 md:mb-22"
        >
          {/* Label */}
          <p
            className="text-xs sm:text-sm tracking-[0.4em] text-[#8B6914] uppercase mb-5 sm:mb-6"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Our Coffee
          </p>

          {/* Divider */}
          <div className="section-divider mb-6 sm:mb-8" />

          {/* Headline */}
          <h2
            className="text-3xl md:text-5xl text-[#3C2415] font-bold leading-tight mb-4 sm:mb-5"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Signature Coffee Collection
          </h2>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl text-[#6B4F10] italic"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Each cup, a curated experience
          </p>
        </motion.div>

        {/* Category Cards Grid */}
        <motion.div
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          variants={cardContainerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6 mb-12 sm:mb-16 md:mb-20"
        >
          {categories.map((card, index) => (
            <CategoryCardComponent key={card.number} card={card} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={ctaVariants}
          className="text-center"
        >
          <a
            href="#menu"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#3C2415] text-[#F0E6D6] rounded-full hover:bg-[#5C3A1E] transition-all duration-300 hover:shadow-lg hover:shadow-[#3C2415]/20 text-sm sm:text-base tracking-wider"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            View Full Menu
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
