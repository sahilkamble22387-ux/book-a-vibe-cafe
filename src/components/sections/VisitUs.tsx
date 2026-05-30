'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Instagram,
  CalendarDays,
  Users,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner';

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const headerContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const headerItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const leftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const rightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Main VisitUs Component                                             */
/* ------------------------------------------------------------------ */

export default function VisitUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' });

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '1',
    type: 'Cafe Visit',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit reservation');
      }

      toast.success('Reservation submitted!', {
        description:
          "We'll confirm your booking shortly. See you at Bookavibe!",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: '1',
        type: 'Cafe Visit',
        message: '',
      });
    } catch {
      toast.error('Something went wrong', {
        description: 'Please try again or call us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="visit"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: '#FBF7F0' }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-20 -left-32 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: '#5B7553' }}
      />
      <div
        className="absolute bottom-40 -right-32 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ backgroundColor: '#6B2737' }}
      />

      <div className="px-4 sm:px-6 lg:px-8 py-20 md:py-28 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <motion.div
            variants={headerContainerVariants}
            initial="hidden"
            animate={headerInView ? 'visible' : 'hidden'}
            className="flex flex-col items-center"
          >
            <motion.p
              variants={headerItemVariants}
              className="text-[#C4973B] text-xs sm:text-sm tracking-[0.35em] uppercase font-semibold mb-4"
            >
              FIND US
            </motion.p>

            <motion.h2
              variants={headerItemVariants}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1210] mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Come Say Hello
            </motion.h2>

            <motion.div variants={headerItemVariants} className="section-divider" />
          </motion.div>
        </div>

        {/* Two Column Layout */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12"
        >
          {/* Left Column — Info & Form */}
          <motion.div
            variants={leftVariants}
            initial="hidden"
            animate={contentInView ? 'visible' : 'hidden'}
            className="space-y-8"
          >
            {/* Contact Info */}
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(107,39,55,0.10)' }}
                >
                  <MapPin className="w-5 h-5" style={{ color: '#6B2737' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1210] mb-0.5">
                    Address
                  </p>
                  <p className="text-sm text-[#8B7D6B] leading-relaxed">
                    Ground Floor, Rachana Tulips, FC Road, Behind Times of India,
                    Pune 411004
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(91,117,83,0.10)' }}
                >
                  <Clock className="w-5 h-5" style={{ color: '#5B7553' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1210] mb-0.5">
                    Hours
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-[#8B7D6B]">
                      Open Daily: 10:00 AM – 10:30 PM
                    </p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: 'rgba(91,117,83,0.10)', color: '#5B7553' }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#5B7553] animate-pulse" />
                      Open All Day
                    </span>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(196,151,59,0.10)' }}
                >
                  <Phone className="w-5 h-5" style={{ color: '#C4973B' }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1210] mb-0.5">
                    Phone
                  </p>
                  <a
                    href="tel:7030073737"
                    className="text-sm hover:underline transition-colors"
                    style={{ color: '#6B2737' }}
                  >
                    7030073737
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:7030073737"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: '#6B2737' }}
              >
                <Phone className="w-4 h-4" />
                Call Us
              </a>
              <a
                href="https://www.google.com/maps/dir//18.5211504,73.8416961"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: '#5B7553' }}
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
              <a
                href="https://instagram.com/book_a_vibe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{ backgroundColor: '#C4724E' }}
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
            </div>

            {/* Reservation Form */}
            <div
              className="rounded-2xl p-6 md:p-8 border border-[#E8DFD2]"
              style={{ backgroundColor: '#FFFFFF' }}
            >
              <h3
                className="text-xl font-bold text-[#1A1210] mb-1"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                Reserve Your Spot
              </h3>
              <p className="text-sm text-[#8B7D6B] mb-6">
                Book a table, co-working desk, or event space
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#8B7D6B] mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl bg-[#FBF7F0] border border-[#E8DFD2] text-sm text-[#1A1210] placeholder:text-[#A39887] focus:outline-none focus:ring-2 focus:ring-[#6B2737]/20 focus:border-[#6B2737] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#8B7D6B] mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#FBF7F0] border border-[#E8DFD2] text-sm text-[#1A1210] placeholder:text-[#A39887] focus:outline-none focus:ring-2 focus:ring-[#6B2737]/20 focus:border-[#6B2737] transition-all"
                    />
                  </div>
                </div>

                {/* Phone & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#8B7D6B] mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      className="w-full px-4 py-3 rounded-xl bg-[#FBF7F0] border border-[#E8DFD2] text-sm text-[#1A1210] placeholder:text-[#A39887] focus:outline-none focus:ring-2 focus:ring-[#6B2737]/20 focus:border-[#6B2737] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#8B7D6B] mb-1.5">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#FBF7F0] border border-[#E8DFD2] text-sm text-[#1A1210] placeholder:text-[#A39887] focus:outline-none focus:ring-2 focus:ring-[#6B2737]/20 focus:border-[#6B2737] transition-all"
                    />
                  </div>
                </div>

                {/* Time & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#8B7D6B] mb-1.5">
                      <CalendarDays className="w-3.5 h-3.5 inline mr-1" />
                      Time
                    </label>
                    <input
                      type="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#FBF7F0] border border-[#E8DFD2] text-sm text-[#1A1210] focus:outline-none focus:ring-2 focus:ring-[#6B2737]/20 focus:border-[#6B2737] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#8B7D6B] mb-1.5">
                      <Users className="w-3.5 h-3.5 inline mr-1" />
                      Guests
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#FBF7F0] border border-[#E8DFD2] text-sm text-[#1A1210] focus:outline-none focus:ring-2 focus:ring-[#6B2737]/20 focus:border-[#6B2737] transition-all appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Type */}
                <div>
                  <label className="block text-xs font-medium text-[#8B7D6B] mb-1.5">
                    Visit Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#FBF7F0] border border-[#E8DFD2] text-sm text-[#1A1210] focus:outline-none focus:ring-2 focus:ring-[#6B2737]/20 focus:border-[#6B2737] transition-all appearance-none cursor-pointer"
                  >
                    <option value="Cafe Visit">Cafe Visit</option>
                    <option value="Co-working">Co-working</option>
                    <option value="Event">Event</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-[#8B7D6B] mb-1.5">
                    <MessageSquare className="w-3.5 h-3.5 inline mr-1" />
                    Message (optional)
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Any special requests or notes..."
                    className="w-full px-4 py-3 rounded-xl bg-[#FBF7F0] border border-[#E8DFD2] text-sm text-[#1A1210] placeholder:text-[#A39887] focus:outline-none focus:ring-2 focus:ring-[#6B2737]/20 focus:border-[#6B2737] transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white text-sm sm:text-base font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ backgroundColor: '#6B2737' }}
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
                      Reserving...
                    </>
                  ) : (
                    <>
                      <CalendarDays className="w-4 h-4" />
                      Reserve Your Spot
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right Column — Map */}
          <motion.div
            variants={rightVariants}
            initial="hidden"
            animate={contentInView ? 'visible' : 'hidden'}
            className="relative min-h-[400px] lg:min-h-full"
          >
            <div className="rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px] lg:min-h-[700px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.1!2d73.8416961!3d18.5211504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf3a8ba88529%3A0xeaa025180f30ba3d!2sBookavibe%20-%20Book%20Cafe%20and%20Co-working%20space!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bookavibe Location - FC Road, Pune"
                className="absolute inset-0"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
