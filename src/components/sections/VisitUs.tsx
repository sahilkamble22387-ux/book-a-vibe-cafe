"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Star,
  Navigation,
  MessageCircle,
  Send,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export default function VisitUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });
  const contentInView = useInView(contentRef, { once: true, margin: "-60px" });

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      toast.success("Message sent!", {
        description: "We'll get back to you soon. Thanks for reaching out!",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again or contact us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20 md:py-28 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div ref={headerRef} className="text-center md:text-left mb-12 md:mb-16">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[#0570E5] text-xs sm:text-sm tracking-[0.3em] uppercase font-semibold mb-4"
          >
            VISIT US
          </motion.p>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold text-[#11111C] mb-4"
          >
            NBC Kalyani Nagar, Pune
          </motion.h2>
        </div>

        {/* ── Two Column Layout ── */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12"
        >
          {/* Left Column - Contact & Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-5">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#E8F1FC] flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#0570E5]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#11111C] mb-0.5">Address</p>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    Shop No. 12 &amp; 13, Landmark Garden Society, Near Joggers Park,
                    Kalyani Nagar, Pune, Maharashtra
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#E8F1FC] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#0570E5]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#11111C] mb-0.5">Hours</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-[#6B7280]">8:00 AM – 11:00 PM</p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Open Now
                    </span>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#E8F1FC] flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#0570E5]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#11111C] mb-0.5">Phone</p>
                  <a
                    href="tel:9251652988"
                    className="text-sm text-[#0570E5] hover:underline"
                  >
                    9251652988
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#E8F1FC] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#0570E5]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#11111C] mb-0.5">Email</p>
                  <a
                    href="mailto:info@nothingbeforecoffee.com"
                    className="text-sm text-[#0570E5] hover:underline"
                  >
                    info@nothingbeforecoffee.com
                  </a>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 rounded-full bg-[#FEF3C7] flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#FBBF24] fill-[#FBBF24]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#11111C] mb-0.5">Rating</p>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-[#FBBF24]">★★★★★</span>
                    <span className="text-sm text-[#11111C] font-semibold">5.0</span>
                    <span className="text-sm text-[#6B7280]">(541 reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/dir//Nothing+Before+Coffee+Kalyani+Nagar+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: "#0570E5" }}
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
              <a
                href="tel:9251652988"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: "#F476AF" }}
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <a
                href="https://wa.me/919251652988"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: "#25D366" }}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
            </div>

            {/* Contact Form */}
            <div className="bg-[#FDF9EF] rounded-xl p-6 md:p-8 border border-[#E5E7EB]">
              <h3 className="text-lg font-bold text-[#11111C] mb-4">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-[#E5E7EB] text-sm text-[#11111C] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0570E5]/30 focus:border-[#0570E5] transition-all"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-[#E5E7EB] text-sm text-[#11111C] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0570E5]/30 focus:border-[#0570E5] transition-all"
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone (optional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-[#E5E7EB] text-sm text-[#11111C] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0570E5]/30 focus:border-[#0570E5] transition-all"
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-[#E5E7EB] text-sm text-[#11111C] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0570E5]/30 focus:border-[#0570E5] transition-all resize-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ backgroundColor: "#0570E5" }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right Column - Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="relative min-h-[400px] lg:min-h-full"
          >
            <div className="rounded-xl overflow-hidden shadow-lg h-full min-h-[400px] lg:min-h-[600px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.065!2d73.9054574!3d18.548747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMzJzAyLjUiTiA3M8KwNTQnMTkuNiJF!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NBC Kalyani Nagar Location"
                className="absolute inset-0"
              />

              {/* Overlay button to view on Google Maps */}
              <a
                href="https://www.google.com/maps/dir//Nothing+Before+Coffee+Kalyani+Nagar+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2.5 bg-white rounded-full shadow-lg text-sm font-semibold text-[#0570E5] hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" />
                View on Google Maps
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
