"use client";

import { motion } from "framer-motion";
import {
  Coffee,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ArrowUp,
  Heart,
  ExternalLink,
} from "lucide-react";

const footerLinks = {
  coffee: [
    { label: "Espresso", href: "#coffee" },
    { label: "Manual Brew", href: "#coffee" },
    { label: "Single Origin", href: "#coffee" },
    { label: "Cold Brew", href: "#coffee" },
  ],
  experience: [
    { label: "The Roastery", href: "#roastery" },
    { label: "Our Journey", href: "#journey" },
    { label: "Café Experience", href: "#cafe" },
    { label: "Events", href: "#events" },
  ],
  company: [
    { label: "Subscriptions", href: "#subscriptions" },
    { label: "Reservations", href: "#reservations" },
    { label: "Gift Cards", href: "#subscriptions" },
    { label: "Careers", href: "#" },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative"
      style={{ background: "linear-gradient(180deg, #2C1810 0%, #1A0F08 100%)" }}
    >
      {/* Decorative top border */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #8B6914, #C4883A, #8B6914, transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Coffee className="w-8 h-8 text-[#C4883A]" />
              <div>
                <h3
                  className="text-xl font-semibold tracking-wider text-[#F0E6D6]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  BLUE TOKAI
                </h3>
                <span
                  className="text-[10px] tracking-[0.3em] text-[#8B6914] uppercase"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Coffee Roasters
                </span>
              </div>
            </div>

            <p
              className="text-[#D4B48A]/80 text-sm leading-relaxed max-w-sm mb-6"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              India&apos;s pioneering specialty coffee roaster. From the hills of the
              Western Ghats to your cup — every bean has a story, every cup is
              crafted with intention.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="https://www.google.co.in/maps/place/Blue+Tokai+Coffee+Roasters+%7C+Kalyani+Nagar/@18.5499059,73.89757,15z"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[#D4B48A]/70 hover:text-[#C4883A] transition-colors group"
              >
                <MapPin className="w-4 h-4 shrink-0" />
                <span className="text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                  Kalyani Nagar, Pune, Maharashtra
                </span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="tel:9810156980"
                className="flex items-center gap-3 text-[#D4B48A]/70 hover:text-[#C4883A] transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span className="text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                  9810156980
                </span>
              </a>
              <a
                href="mailto:kalyaninagar@bluetokaicoffee.com"
                className="flex items-center gap-3 text-[#D4B48A]/70 hover:text-[#C4883A] transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span className="text-sm" style={{ fontFamily: "var(--font-inter)" }}>
                  kalyaninagar@bluetokaicoffee.com
                </span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: Instagram, label: "Instagram" },
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-[#8B6914]/30 flex items-center justify-center text-[#D4B48A]/60 hover:text-[#C4883A] hover:border-[#C4883A] hover:bg-[#C4883A]/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4
                className="text-sm font-semibold tracking-[0.2em] text-[#C4883A] mb-6 uppercase"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#D4B48A]/60 hover:text-[#F0E6D6] transition-colors"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="py-8 border-t border-[#8B6914]/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4
                className="text-lg font-semibold text-[#F0E6D6]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Stay in the Loop
              </h4>
              <p
                className="text-sm text-[#D4B48A]/60 mt-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Get updates on new roasts, events, and exclusive offers.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-2.5 bg-[#2C1810] border border-[#8B6914]/30 rounded-l-lg text-[#F0E6D6] text-sm placeholder:text-[#D4B48A]/40 focus:outline-none focus:border-[#C4883A]"
                style={{ fontFamily: "var(--font-inter)" }}
              />
              <button
                className="px-6 py-2.5 bg-[#C4883A] text-[#1A0F08] text-sm font-semibold rounded-r-lg hover:bg-[#8B6914] transition-colors"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[#8B6914]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-[#D4B48A]/40"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © {new Date().getFullYear()} Blue Tokai Coffee Roasters. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-[#D4B48A]/40 hover:text-[#D4B48A] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-[#D4B48A]/40 hover:text-[#D4B48A] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Terms of Service
            </a>
            <span
              className="text-xs text-[#D4B48A]/40 flex items-center gap-1"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Made with <Heart className="w-3 h-3 text-[#C4724E]" /> in India
            </span>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#3C2415] text-[#F0E6D6] shadow-lg flex items-center justify-center hover:bg-[#5C3A1E] transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
