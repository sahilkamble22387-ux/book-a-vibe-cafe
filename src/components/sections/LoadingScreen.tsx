"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  startX: number;
}

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [typedText, setTypedText] = useState("");
  const fullText = "Bring on the Buzz...";

  // Generate particles once
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 6 + 3,
      color: i % 3 === 0 ? "#F476AF" : "#0570E5",
      delay: Math.random() * 2,
      duration: Math.random() * 2 + 2,
      startX: Math.random() * 40 - 20,
    }));
  }, []);

  // Typing effect
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);
    return () => clearInterval(typingInterval);
  }, []);

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#11111C" }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              bottom: "-10px",
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
            }}
            animate={{
              y: [0, -600],
              x: [p.startX, p.startX + (Math.random() * 30 - 15)],
              opacity: [0, 0.6, 0.4, 0],
              scale: [0.5, 1, 0.8],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Pulsing glow ring behind logo */}
      <motion.div
        className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(5,112,229,0.15) 0%, rgba(244,118,175,0.08) 50%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex flex-col items-center z-10"
      >
        {/* NBC Text Logo */}
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold text-white tracking-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          NBC
        </motion.h1>

        {/* Blue gradient underline */}
        <motion.div
          className="h-1.5 md:h-2 rounded-full mt-2"
          style={{
            background: "linear-gradient(90deg, #0570E5, #F476AF, #0570E5)",
            backgroundSize: "200% 100%",
          }}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        />

        {/* Full brand name */}
        <motion.p
          className="text-sm md:text-base tracking-[0.35em] text-white/80 mt-4 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          NOTHING BEFORE COFFEE
        </motion.p>
      </motion.div>

      {/* Steam/particles rising from below the text */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10">
        {/* Rising coffee steam wisps */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`steam-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 15}%`,
              bottom: "20%",
            }}
            animate={{
              y: [0, -80, -160],
              opacity: [0, 0.4, 0],
              scaleX: [1, 1.3, 0.7],
            }}
            transition={{
              duration: 2.5 + i * 0.3,
              delay: i * 0.4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          >
            <svg width="30" height="40" viewBox="0 0 30 40" fill="none">
              <path
                d={
                  i % 2 === 0
                    ? "M15 40 C15 30, 8 25, 10 15 C12 5, 15 0, 15 0"
                    : "M15 40 C15 30, 22 25, 20 15 C18 5, 15 0, 15 0"
                }
                stroke={i % 2 === 0 ? "#0570E5" : "#F476AF"}
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Typing text */}
      <motion.div
        className="absolute bottom-20 md:bottom-24 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <p className="text-base md:text-lg tracking-wider font-medium">
          <span className="text-white/90">{typedText}</span>
          <motion.span
            className="inline-block w-0.5 h-5 ml-1 align-middle"
            style={{ backgroundColor: "#0570E5" }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          />
        </p>
      </motion.div>

      {/* Subtle decorative circles */}
      <motion.div
        className="absolute top-20 right-[10%] w-16 h-16 rounded-full border border-[#0570E5]/20"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-32 left-[8%] w-10 h-10 rounded-full border border-[#F476AF]/20"
        animate={{ rotate: -360, scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[30%] left-[5%] w-6 h-6 rounded-full bg-[#0570E5]/10"
        animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[25%] right-[12%] w-4 h-4 rounded-full bg-[#F476AF]/10"
        animate={{ y: [10, -10, 10], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
