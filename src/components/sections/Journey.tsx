"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sprout, Coffee, CupSoda, Flame, Droplets } from "lucide-react";

/* ──────────────── Data ──────────────── */

interface JourneyStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image?: string;
  icon: React.ReactNode;
  accentColor: string;
}

const journeySteps: JourneyStep[] = [
  {
    id: 1,
    title: "FARM",
    subtitle: "Hand-picked from India's finest estates",
    description:
      "Nestled in the misty Western Ghats, our partner farms cultivate coffee under the canopy of shade trees. Each cherry is hand-picked at peak ripeness, ensuring only the finest fruit makes the journey to your cup.",
    image: "/images/farm.png",
    icon: <Sprout className="w-5 h-5" />,
    accentColor: "#2D5A3D",
  },
  {
    id: 2,
    title: "GREEN BEAN",
    subtitle: "Carefully selected and graded",
    description:
      "Every lot is meticulously sorted and graded by hand. We work directly with farmers to ensure only the highest quality green beans — free from defects and full of potential — are chosen for roasting.",
    image: undefined,
    icon: <Droplets className="w-5 h-5" />,
    accentColor: "#8B6914",
  },
  {
    id: 3,
    title: "ROASTING",
    subtitle: "Small-batch precision roasting",
    description:
      "Our master roasters use state-of-the-art Probat roasters, coaxing out each bean's unique flavour profile in small batches. Every roast is logged, tasted, and adjusted — a relentless pursuit of perfection.",
    image: "/images/roastery.png",
    icon: <Flame className="w-5 h-5" />,
    accentColor: "#C4883A",
  },
  {
    id: 4,
    title: "BREWING",
    subtitle: "Expertly crafted by our baristas",
    description:
      "Trained in the art and science of extraction, our baristas transform freshly roasted beans into extraordinary cups. Every pour, every pressure, every temperature is deliberate — nothing is left to chance.",
    image: "/images/latte-art.png",
    icon: <Coffee className="w-5 h-5" />,
    accentColor: "#C4883A",
  },
  {
    id: 5,
    title: "CUP",
    subtitle: "The perfect specialty coffee experience",
    description:
      "From the first aroma to the lingering finish, every sip tells the story of its origin. This is specialty coffee as it was meant to be experienced — honest, transparent, and profoundly satisfying.",
    image: undefined,
    icon: <CupSoda className="w-5 h-5" />,
    accentColor: "#3C2415",
  },
];

/* ──────────────── Sub-components ──────────────── */

function StepImage({ step, isActive }: { step: JourneyStep; isActive: boolean }) {
  if (!step.image) {
    return (
      <div
        className="w-full h-full flex items-center justify-center rounded-xl"
        style={{ backgroundColor: `${step.accentColor}12` }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${step.accentColor}20` }}
        >
          <div style={{ color: step.accentColor }}>{step.icon}</div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isActive ? 1 : 0.6, scale: isActive ? 1 : 0.98 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full h-full overflow-hidden rounded-xl"
    >
      <img
        src={step.image}
        alt={step.subtitle}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}

/* ──────────────── Main Component ──────────────── */

export default function Journey() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const leftInView = useInView(leftRef, { once: true, margin: "-80px" });
  const rightInView = useInView(rightRef, { once: true, margin: "-80px" });

  const currentStep = journeySteps.find((s) => s.id === activeStep)!;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-20 md:py-28 lg:py-32 texture-burlap"
      style={{ backgroundColor: "#FAF6F0" }}
    >
      {/* Subtle top/bottom gradient borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4883A]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C4883A]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24">
          {/* ────── LEFT SIDE ────── */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -40 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            {/* Section Label */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xs font-semibold tracking-[0.4em] uppercase text-[#8B6914] mb-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              The Journey
            </motion.span>

            {/* Decorative Divider */}
            <motion.div
              initial={{ width: 0 }}
              animate={leftInView ? { width: 80 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[2px] mb-8"
              style={{
                background: "linear-gradient(90deg, #C4883A, #8B6914, transparent)",
              }}
            />

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3C2415] leading-tight mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              From India&apos;s Hills
              <br />
              <span className="text-[#8B6914]">to Your Cup</span>
            </motion.h2>

            {/* Narrative Paragraphs */}
            <div className="space-y-5">
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[#4A4A4A] leading-relaxed text-sm md:text-base"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                We work directly with coffee farms across the{" "}
                <span className="text-[#3C2415] font-medium">Western Ghats</span>{" "}
                — from Coorg and Chikmagalur to the Nilgiris and Araku Valley —
                building relationships that go beyond transactions. Our sourcing
                partnerships ensure farmers receive{" "}
                <span className="text-[#3C2415] font-medium">fair premiums</span>{" "}
                for quality, incentivising better agricultural practices and
                sustainable livelihoods.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-[#4A4A4A] leading-relaxed text-sm md:text-base"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                At our roastery, every batch is treated with{" "}
                <span className="text-[#3C2415] font-medium">
                  small-batch precision
                </span>{" "}
                — roasted to order, never stored. We believe freshness is
                non-negotiable, and our Probat roasters are calibrated daily to
                coax out the unique flavour profile locked within each origin.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-[#4A4A4A] leading-relaxed text-sm md:text-base"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Transparency and{" "}
                <span className="text-[#3C2415] font-medium">fair trade</span>{" "}
                are at the heart of what we do. From the farm gate to the final
                cup, we trace every bean&apos;s journey — publishing roast dates,
                origin details, and farm profiles so you know exactly where your
                coffee comes from.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={leftInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-[#4A4A4A] leading-relaxed text-sm md:text-base"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                We&apos;re proud to be part of the{" "}
                <span className="text-[#3C2415] font-medium">
                  evolution of specialty coffee
                </span>{" "}
                culture in India — a movement that champions quality over
                commodity, craft over convenience, and community over
                convention. Every cup is a testament to how far Indian coffee has
                come, and where it&apos;s headed next.
              </motion.p>
            </div>

            {/* Decorative coffee bean accent */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={leftInView ? { opacity: 0.15 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-10 flex items-center gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-[#C4883A]" />
              <div className="flex-1 h-px bg-gradient-to-r from-[#C4883A]/30 to-transparent" />
              <span
                className="text-[10px] tracking-[0.3em] text-[#8B6914]/50 uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Since 2013
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-[#C4883A]/30 to-transparent" />
              <div className="w-2 h-2 rounded-full bg-[#C4883A]" />
            </motion.div>
          </motion.div>

          {/* ────── RIGHT SIDE ────── */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 40 }}
            animate={rightInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col"
          >
            {/* Step selector — Horizontal on desktop, vertical on mobile */}
            <div className="relative">
              {/* Desktop: horizontal timeline */}
              <div className="hidden lg:flex items-start justify-between gap-2 mb-8">
                {journeySteps.map((step, index) => (
                  <motion.button
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={rightInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.1,
                    }}
                    onClick={() => setActiveStep(step.id)}
                    className="flex flex-col items-center gap-2 group cursor-pointer flex-1 relative"
                  >
                    {/* Connecting line between steps */}
                    {index < journeySteps.length - 1 && (
                      <div
                        className="absolute top-5 left-1/2 w-full h-[2px]"
                        style={{
                          background:
                            activeStep > step.id
                              ? "linear-gradient(90deg, #C4883A, #8B6914)"
                              : "#E2CDB0",
                        }}
                      />
                    )}

                    {/* Step circle */}
                    <div
                      className={`
                        relative w-10 h-10 rounded-full flex items-center justify-center
                        transition-all duration-500 z-10
                        ${
                          activeStep === step.id
                            ? "shadow-lg"
                            : "bg-[#F0E6D6] group-hover:bg-[#E2CDB0]"
                        }
                      `}
                      style={
                        activeStep === step.id
                          ? {
                              backgroundColor: step.accentColor,
                              boxShadow: `0 0 20px ${step.accentColor}40, 0 0 40px ${step.accentColor}20`,
                            }
                          : {}
                      }
                    >
                      <div
                        className={`transition-colors duration-300 ${
                          activeStep === step.id
                            ? "text-[#FAF6F0]"
                            : "text-[#8B6914] group-hover:text-[#6B4F10]"
                        }`}
                      >
                        {step.icon}
                      </div>

                      {/* Glow ring for active step */}
                      {activeStep === step.id && (
                        <motion.div
                          layoutId="glowRing"
                          className="absolute inset-0 rounded-full"
                          style={{
                            boxShadow: `0 0 0 3px ${step.accentColor}30`,
                          }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        />
                      )}
                    </div>

                    {/* Step number + title */}
                    <span
                      className={`text-[10px] tracking-widest transition-colors duration-300 ${
                        activeStep === step.id
                          ? "text-[#8B6914] font-semibold"
                          : "text-[#8B6914]/50 group-hover:text-[#8B6914]"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {String(step.id).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-xs tracking-wider font-medium transition-colors duration-300 ${
                        activeStep === step.id
                          ? "text-[#3C2415]"
                          : "text-[#4A4A4A]/60 group-hover:text-[#3C2415]"
                      }`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {step.title}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Mobile: vertical timeline */}
              <div className="lg:hidden space-y-0">
                {journeySteps.map((step, index) => (
                  <motion.button
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={rightInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.1,
                    }}
                    onClick={() => setActiveStep(step.id)}
                    className="flex items-start gap-4 w-full text-left group cursor-pointer py-3"
                  >
                    {/* Timeline track */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      {/* Circle */}
                      <div
                        className={`
                          relative w-10 h-10 rounded-full flex items-center justify-center
                          transition-all duration-500 z-10
                          ${
                            activeStep === step.id
                              ? "shadow-lg"
                              : "bg-[#F0E6D6] group-hover:bg-[#E2CDB0]"
                          }
                        `}
                        style={
                          activeStep === step.id
                            ? {
                                backgroundColor: step.accentColor,
                                boxShadow: `0 0 20px ${step.accentColor}40, 0 0 40px ${step.accentColor}20`,
                              }
                            : {}
                        }
                      >
                        <div
                          className={`transition-colors duration-300 ${
                            activeStep === step.id
                              ? "text-[#FAF6F0]"
                              : "text-[#8B6914] group-hover:text-[#6B4F10]"
                          }`}
                        >
                          {step.icon}
                        </div>
                      </div>

                      {/* Vertical connector */}
                      {index < journeySteps.length - 1 && (
                        <div
                          className="w-[2px] h-8 transition-colors duration-500"
                          style={{
                            backgroundColor:
                              activeStep > step.id ? "#C4883A" : "#E2CDB0",
                          }}
                        />
                      )}
                    </div>

                    {/* Text */}
                    <div className="pt-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="text-[10px] tracking-widest text-[#8B6914]/50"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {String(step.id).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-xs tracking-wider font-medium transition-colors duration-300 ${
                            activeStep === step.id
                              ? "text-[#3C2415]"
                              : "text-[#4A4A4A]/60 group-hover:text-[#3C2415]"
                          }`}
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {step.title}
                        </span>
                      </div>
                      <p
                        className={`text-sm transition-colors duration-300 ${
                          activeStep === step.id
                            ? "text-[#3C2415]"
                            : "text-[#4A4A4A]/50"
                        }`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {step.subtitle}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* ────── Active Step Detail Card ────── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-6 lg:mt-8 rounded-2xl overflow-hidden border border-[#E2CDB0]/60"
                style={{ backgroundColor: "#FFF8F0" }}
              >
                {/* Image area */}
                <div className="relative w-full aspect-[16/9] md:aspect-[2/1] overflow-hidden">
                  <StepImage step={currentStep} isActive={true} />

                  {/* Gradient overlay with title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3C2415]/70 via-[#3C2415]/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${currentStep.accentColor}CC` }}
                      >
                        <span className="text-[#FAF6F0] text-xs">
                          {currentStep.icon}
                        </span>
                      </div>
                      <div>
                        <span
                          className="block text-[10px] tracking-widest text-[#C4883A] uppercase"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          Step {String(currentStep.id).padStart(2, "0")}
                        </span>
                        <span
                          className="block text-lg md:text-xl font-bold text-[#FAF6F0] tracking-wide"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {currentStep.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="p-5 md:p-6">
                  <p
                    className="text-[#4A4A4A] leading-relaxed text-sm md:text-base"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {currentStep.description}
                  </p>

                  {/* Step progress indicator */}
                  <div className="mt-5 flex items-center gap-2">
                    {journeySteps.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setActiveStep(s.id)}
                        className="transition-all duration-300 rounded-full cursor-pointer"
                        style={{
                          width: activeStep === s.id ? 24 : 8,
                          height: 8,
                          backgroundColor:
                            activeStep === s.id ? s.accentColor : "#E2CDB0",
                        }}
                        aria-label={`Go to step ${s.id}: ${s.title}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
