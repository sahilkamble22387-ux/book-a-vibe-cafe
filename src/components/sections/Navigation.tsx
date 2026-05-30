'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: 'home' },
  { label: 'About', href: 'about' },
  { label: 'The Space', href: 'space' },
  { label: 'Menu', href: 'menu' },
  { label: 'Events', href: 'events' },
  { label: 'Visit Us', href: 'visit' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const element = document.getElementById(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FBF7F0]/95 backdrop-blur-md shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2.5 group focus-ring rounded-lg"
              aria-label="Scroll to top"
            >
              <BookOpen
                className={`w-5 h-5 transition-colors duration-300 ${
                  isScrolled ? 'text-[#6B2737]' : 'text-[#C4973B]'
                } group-hover:text-[#C4973E]`}
              />
              <div className="flex flex-col">
                <span
                  className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 leading-tight ${
                    isScrolled ? 'text-[#6B2737]' : 'text-[#FBF7F0]'
                  }`}
                  style={{ fontFamily: 'var(--font-playfair)' }}
                >
                  Bookavibe
                </span>
                <span
                  className={`text-[9px] md:text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 leading-tight ${
                    isScrolled ? 'text-[#8B7D6B]' : 'text-[#C4973B]/70'
                  }`}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Book Cafe &amp; Co-working
                </span>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-all duration-300 rounded-full ${
                    isScrolled
                      ? 'text-[#2C1810]/70 hover:text-[#6B2737] hover:bg-[#6B2737]/5'
                      : 'text-[#FBF7F0]/80 hover:text-[#FBF7F0] hover:bg-white/10'
                  }`}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right side — Book a Table CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={() => handleNavClick('visit')}
                className="px-6 py-2.5 bg-[#6B2737] text-[#FBF7F0] text-sm font-semibold tracking-wide rounded-full transition-all duration-300 hover:bg-[#8B3A4A] hover:shadow-lg hover:shadow-[#6B2737]/25 hover:-translate-y-0.5 focus-ring"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Book a Table
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => handleNavClick('visit')}
                className="px-4 py-2 bg-[#6B2737] text-[#FBF7F0] text-xs font-semibold tracking-wide rounded-full hover:bg-[#8B3A4A] transition-all duration-300"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Book
              </button>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? 'text-[#2C1810] hover:bg-[#2C1810]/5'
                    : 'text-[#FBF7F0] hover:bg-white/10'
                }`}
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            {/* Slide-in panel from right */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-sm"
              style={{ backgroundColor: '#1A1210' }}
            >
              {/* Decorative background elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                  className="absolute -top-20 -right-20 w-64 h-64 rounded-full"
                  style={{ backgroundColor: 'rgba(107, 39, 55, 0.15)' }}
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute bottom-20 -left-10 w-48 h-48 rounded-full"
                  style={{ backgroundColor: 'rgba(196, 151, 59, 0.08)' }}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Close button */}
              <div className="absolute top-5 right-4 z-10">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 rounded-full text-[#FBF7F0]/80 hover:text-[#FBF7F0] hover:bg-white/10 transition-all duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile navigation links */}
              <div className="flex flex-col items-start justify-center h-full px-8">
                {/* Logo in mobile menu */}
                <div className="mb-8">
                  <h2
                    className="text-3xl font-bold"
                    style={{ fontFamily: 'var(--font-playfair)', color: '#C4973B' }}
                  >
                    Bookavibe
                  </h2>
                  <p
                    className="text-xs tracking-[0.2em] uppercase mt-1"
                    style={{ fontFamily: 'var(--font-inter)', color: '#8B7D6B' }}
                  >
                    Book Cafe &amp; Co-working
                  </p>
                </div>

                <div className="space-y-1 w-full">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        delay: i * 0.07,
                        duration: 0.3,
                        ease: 'easeOut',
                      }}
                      onClick={() => handleNavClick(link.href)}
                      className="block w-full py-3.5 px-5 text-left text-[#FBF7F0] text-lg font-medium tracking-wide hover:bg-white/10 rounded-xl transition-all duration-300 hover:pl-7 focus-ring"
                      style={{ fontFamily: 'var(--font-inter)' }}
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </div>

                {/* Mobile Book a Table CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="mt-10 w-full"
                >
                  <button
                    onClick={() => handleNavClick('visit')}
                    className="flex items-center justify-center w-full py-3.5 bg-[#6B2737] text-[#FBF7F0] text-base font-semibold tracking-wide rounded-full hover:bg-[#8B3A4A] transition-all duration-300 hover:shadow-lg hover:shadow-[#6B2737]/30"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Book a Table
                  </button>
                </motion.div>

                {/* Brand tagline */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                  className="mt-8 text-[#8B7D6B] text-xs tracking-[0.25em] uppercase"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Books &bull; Bites &bull; Business
                </motion.p>
              </div>
            </motion.div>

            {/* Backdrop (left side) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 bottom-0 right-0 max-w-sm:ml-auto -z-10"
              style={{ backgroundColor: 'rgba(26, 18, 16, 0.5)' }}
              onClick={() => setIsMobileOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
