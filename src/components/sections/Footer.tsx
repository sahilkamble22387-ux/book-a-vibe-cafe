"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Coffee,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  ArrowUp,
  Heart,
} from "lucide-react";
import { toast } from "sonner";

const quickLinks = [
  { label: "Our Story", href: "#our-story" },
  { label: "Menu", href: "#menu" },
  { label: "Shrappe", href: "#shrappe" },
  { label: "Experience", href: "#experience" },
  { label: "Visit Us", href: "#visit" },
];

const socialLinks = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed to subscribe");

      toast.success("You're in! ☕", {
        description: "Stay buzzed — NBC updates are on the way.",
      });
      setEmail("");
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer
      className="relative"
      style={{ backgroundColor: "#11111C" }}
    >
      {/* Decorative top gradient line */}
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, #0570E5, #F476AF, #DD5350, #FBBF24, #0570E5)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Main Footer Content: 4 columns ── */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 - Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[#0570E5] flex items-center justify-center">
                <Coffee className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0570E5]">NBC</h3>
                <span className="text-[10px] tracking-[0.25em] text-[#F476AF] uppercase font-semibold">
                  Nothing Before Coffee
                </span>
              </div>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
              Bring on the Buzz — where mornings begin, ideas flow, and
              communities connect over great coffee.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-[#F476AF] hover:border-[#F476AF]/40 hover:bg-[#F476AF]/10 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-sm font-semibold tracking-[0.2em] text-[#0570E5] mb-6 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Contact */}
          <div>
            <h4 className="text-sm font-semibold tracking-[0.2em] text-[#0570E5] mb-6 uppercase">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:9251652988"
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  <Phone className="w-4 h-4 shrink-0 text-[#F476AF]" />
                  9251652988
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@nothingbeforecoffee.com"
                  className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors duration-300"
                >
                  <Mail className="w-4 h-4 shrink-0 text-[#F476AF]" />
                  info@nothingbeforecoffee.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/50">
                <Clock className="w-4 h-4 shrink-0 text-[#F476AF]" />
                8AM – 11PM Daily
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="text-sm font-semibold tracking-[0.2em] text-[#0570E5] mb-6 uppercase">
              Stay Buzzed
            </h4>
            <p className="text-sm text-white/50 leading-relaxed mb-5">
              Get the latest NBC updates, offers, and new menu drops.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#0570E5]/30 focus:border-[#0570E5] transition-all"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="w-full px-5 py-3 rounded-lg text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #0570E5, #F476AF)",
                }}
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="py-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © 2025 Nothing Before Coffee. All rights reserved.
          </p>
          <p className="text-xs text-white/30 flex items-center gap-1">
            Born in India <span className="text-base">☕</span> with{" "}
            <Heart className="w-3 h-3 text-[#DD5350] inline" /> 
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#0570E5] text-white shadow-lg flex items-center justify-center hover:bg-[#0455B4] transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
