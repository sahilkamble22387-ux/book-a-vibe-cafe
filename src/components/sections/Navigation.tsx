"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Our Story", href: "our-story" },
  { label: "Menu", href: "menu" },
  { label: "Shrappe", href: "shrappe" },
  { label: "Experience", href: "experience" },
  { label: "Order", href: "order" },
  { label: "Visit Us", href: "visit" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const element = document.getElementById(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 group focus-ring rounded-lg"
              aria-label="Scroll to top"
            >
              <div className="relative">
                <Coffee
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isScrolled
                      ? "text-[#0570E5]"
                      : "text-white"
                  } group-hover:text-[#0570E5]`}
                />
                <div className="absolute -inset-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#0570E5]/10" />
              </div>
              <span
                className={`text-2xl font-extrabold tracking-tight transition-colors duration-300 ${
                  isScrolled ? "text-[#0570E5]" : "text-white"
                } group-hover:text-[#0570E5]`}
              >
                NBC
              </span>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full focus-ring ${
                    isScrolled
                      ? "text-[#11111C]/70 hover:text-[#0570E5] hover:bg-[#0570E5]/5"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right side - Order Now CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="https://stores.nothingbeforecoffee.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-[#DD5350] text-white text-sm font-semibold tracking-wide rounded-full hover:bg-[#C74543] transition-all duration-300 hover:shadow-lg hover:shadow-[#DD5350]/25 hover:-translate-y-0.5 focus-ring"
              >
                Order Now
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-3 lg:hidden">
              <a
                href="https://stores.nothingbeforecoffee.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#DD5350] text-white text-xs font-semibold tracking-wide rounded-full hover:bg-[#C74543] transition-all duration-300"
              >
                Order
              </a>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`p-2 rounded-full transition-all duration-300 focus-ring ${
                  isScrolled
                    ? "text-[#11111C] hover:bg-[#11111C]/5"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              >
                {isMobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Full-screen overlay with NBC blue gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #0570E5 0%, #0455B4 40%, #11111C 100%)",
              }}
            >
              {/* Decorative background elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#F476AF]/10"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute bottom-20 -left-10 w-48 h-48 rounded-full bg-white/5"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Close button */}
              <div className="absolute top-5 right-4">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              {/* Mobile navigation links */}
              <div className="flex flex-col items-center justify-center h-full px-6">
                <div className="space-y-2 w-full max-w-sm">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{
                        delay: i * 0.07,
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      onClick={() => handleNavClick(link.href)}
                      className="block w-full py-3.5 px-6 text-left text-white text-xl font-semibold tracking-wide hover:bg-white/10 rounded-xl transition-all duration-300 hover:pl-8 focus-ring"
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </div>

                {/* Mobile Order Now CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="mt-10 w-full max-w-sm"
                >
                  <a
                    href="https://stores.nothingbeforecoffee.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex items-center justify-center w-full py-3.5 bg-[#DD5350] text-white text-lg font-bold tracking-wide rounded-full hover:bg-[#C74543] transition-all duration-300 hover:shadow-lg hover:shadow-[#DD5350]/30"
                  >
                    Order Now
                  </a>
                </motion.div>

                {/* Brand tagline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                  className="mt-8 text-white/40 text-sm tracking-widest uppercase"
                >
                  Bring on the Buzz
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
