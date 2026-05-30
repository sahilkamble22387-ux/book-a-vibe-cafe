"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState<"bean" | "transform" | "cup">("bean");

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("transform"), 1200);
    const timer2 = setTimeout(() => setPhase("cup"), 2200);
    const timer3 = setTimeout(() => setIsLoading(false), 3200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, #1A0F08 0%, #2C1810 50%, #3C2415 100%)" }}
        >
          {/* Coffee Bean / Cup Animation */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Bean Phase */}
            <motion.div
              initial={{ scale: 1, rotate: 0 }}
              animate={{
                scale: phase === "bean" ? 1 : phase === "transform" ? 1.3 : 0,
                rotate: phase === "bean" ? 360 : phase === "transform" ? 720 : 720,
                opacity: phase === "cup" ? 0 : 1,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute"
            >
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <ellipse cx="40" cy="40" rx="28" ry="36" fill="#5C3A1E" />
                <ellipse cx="40" cy="40" rx="28" ry="36" fill="url(#bean-gradient)" />
                <path
                  d="M40 8 C40 8, 38 25, 40 40 C42 55, 40 72, 40 72"
                  stroke="#3C2415"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="bean-gradient" x1="20" y1="0" x2="60" y2="80">
                    <stop offset="0%" stopColor="#8B6914" />
                    <stop offset="50%" stopColor="#5C3A1E" />
                    <stop offset="100%" stopColor="#3C2415" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* Cup Phase */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: phase === "cup" ? 1 : 0,
                opacity: phase === "cup" ? 1 : 0,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute"
            >
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                {/* Cup body */}
                <path
                  d="M18 30 L22 65 C22 68, 25 70, 28 70 L48 70 C51 70, 54 68, 54 65 L58 30 Z"
                  fill="#F0E6D6"
                  stroke="#8B6914"
                  strokeWidth="1.5"
                />
                {/* Handle */}
                <path
                  d="M58 38 C66 38, 68 48, 58 55"
                  stroke="#8B6914"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Coffee liquid */}
                <path
                  d="M20 33 L23 62 C23 65, 26 67, 29 67 L47 67 C50 67, 53 65, 53 62 L56 33 Z"
                  fill="#3C2415"
                  opacity="0.8"
                />
                {/* Steam */}
                <motion.path
                  d="M32 28 C32 20, 38 18, 38 10"
                  stroke="#F0E6D6"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  animate={{ opacity: [0.3, 0.7, 0.3], y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.path
                  d="M40 26 C40 18, 46 16, 46 8"
                  stroke="#F0E6D6"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  animate={{ opacity: [0.5, 0.8, 0.5], y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
                />
              </svg>
            </motion.div>
          </div>

          {/* Brand Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 text-center"
          >
            <h1
              className="text-2xl md:text-3xl font-medium tracking-[0.3em] text-[#F0E6D6]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              BLUE TOKAI
            </h1>
            <p
              className="mt-2 text-xs tracking-[0.5em] text-[#8B6914] uppercase"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Coffee Roasters
            </p>
          </motion.div>

          {/* Loading Bar */}
          <div className="mt-8 w-48 h-[2px] bg-[#3C2415] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #8B6914, #C4883A, #8B6914)" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
