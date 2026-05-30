"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Menu, X, MapPin, Phone } from "lucide-react";

const navLinks = [
  { label: "Journey", href: "#journey" },
  { label: "Roastery", href: "#roastery" },
  { label: "Coffee", href: "#coffee" },
  { label: "Café", href: "#cafe" },
  { label: "Shop", href: "#subscriptions" },
  { label: "Events", href: "#events" },
  { label: "Visit", href: "#reservations" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Track active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 3.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass border-b border-[#E2CDB0]/30 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative">
                <Coffee
                  className={`w-7 h-7 transition-colors duration-300 ${
                    isScrolled ? "text-[#8B6914]" : "text-[#F0E6D6]"
                  } group-hover:text-[#C4883A]`}
                />
                <div className="absolute -inset-2 bg-[#C4883A]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div>
                <span
                  className={`text-lg md:text-xl font-semibold tracking-wider transition-colors duration-300 ${
                    isScrolled ? "text-[#3C2415]" : "text-[#F0E6D6]"
                  }`}
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  BLUE TOKAI
                </span>
                <span
                  className={`block text-[10px] tracking-[0.3em] -mt-1 transition-colors duration-300 ${
                    isScrolled ? "text-[#8B6914]" : "text-[#C4883A]"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  KALYANI NAGAR
                </span>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm tracking-wider transition-all duration-300 rounded-full ${
                    activeSection === link.href.replace("#", "")
                      ? isScrolled
                        ? "text-[#8B6914]"
                        : "text-[#C4883A]"
                      : isScrolled
                      ? "text-[#3C2415]/70 hover:text-[#3C2415]"
                      : "text-[#F0E6D6]/70 hover:text-[#F0E6D6]"
                  }`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {link.label.toUpperCase()}
                  {activeSection === link.href.replace("#", "") && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#C4883A]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:9810156980"
                className={`flex items-center gap-2 text-xs tracking-wider transition-colors ${
                  isScrolled ? "text-[#3C2415]/70" : "text-[#F0E6D6]/70"
                } hover:text-[#C4883A]`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <Phone className="w-3.5 h-3.5" />
                9810156980
              </a>
              <a
                href="#reservations"
                className="px-5 py-2.5 bg-[#3C2415] text-[#F0E6D6] text-sm tracking-wider rounded-full hover:bg-[#5C3A1E] transition-all duration-300 hover:shadow-lg hover:shadow-[#3C2415]/20"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                RESERVE A TABLE
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden p-2 rounded-full transition-colors ${
                isScrolled ? "text-[#3C2415]" : "text-[#F0E6D6]"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-[#1A0F08]/60 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-[#FFF8F0] shadow-2xl">
              <div className="p-8 pt-24">
                <div className="space-y-1">
                  {navLinks.map((link, i) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setIsMobileOpen(false)}
                      className="block py-3 px-4 text-[#3C2415] text-lg tracking-wider hover:text-[#8B6914] hover:bg-[#F0E6D6] rounded-lg transition-all"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-[#E2CDB0]">
                  <div className="flex items-center gap-3 text-[#6B4F10] mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                      Kalyani Nagar, Pune
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[#6B4F10] mb-6">
                    <Phone className="w-4 h-4" />
                    <a href="tel:9810156980" className="text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                      9810156980
                    </a>
                  </div>
                  <a
                    href="#reservations"
                    onClick={() => setIsMobileOpen(false)}
                    className="block w-full py-3 bg-[#3C2415] text-[#F0E6D6] text-center text-sm tracking-wider rounded-full hover:bg-[#5C3A1E] transition-all"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    RESERVE A TABLE
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
