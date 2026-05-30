'use client';

import { useState, type FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Car,
  Navigation,
  Calendar,
  Coffee,
  ArrowRight,
  Send,
  Loader2,
} from 'lucide-react';
import { toast } from 'sonner';

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const quickActionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1 * i,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

/* ------------------------------------------------------------------ */
/*  Time & Guest Options                                               */
/* ------------------------------------------------------------------ */

const timeOptions = [
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
];

const guestOptions = ['1', '2', '3', '4', '5', '6+'];

const typeOptions = [
  'Table Reservation',
  'Workshop Booking',
  'Cupping Session',
  'Event Inquiry',
];

/* ------------------------------------------------------------------ */
/*  Form State Type                                                    */
/* ------------------------------------------------------------------ */

interface FormData {
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  type: string;
  specialRequests: string;
}

const initialFormData: FormData = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  guests: '',
  type: '',
  specialRequests: '',
};

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function Reservations() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ---------------------------------------------------------------- */
  /*  Form Handlers                                                    */
  /* ---------------------------------------------------------------- */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Reservation failed');
      }

      toast.success('Reservation Confirmed!', {
        description:
          'Your table at Blue Tokai Kalyani Nagar has been reserved. We look forward to welcoming you!',
      });

      setFormData(initialFormData);
    } catch {
      toast.error('Reservation Failed', {
        description:
          'Something went wrong. Please try again or call us directly at 9810156980.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Input Classes                                                    */
  /* ---------------------------------------------------------------- */

  const inputClasses =
    'w-full rounded-lg border border-[#E2CDB0] bg-[#FFF8F0] px-4 py-3 font-[family-name:var(--font-inter)] text-sm text-[#3C2415] placeholder:text-[#B09A7E] focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/20 focus:outline-none transition-all duration-200';

  const labelClasses =
    'block font-[family-name:var(--font-inter)] text-sm text-[#3C2415] font-medium mb-1.5';

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <section
      id="reservations"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, #1A0F08 0%, #2C1810 50%, #1A0F08 100%)',
      }}
    >
      {/* ---- Subtle texture overlay ---- */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C4883A' fill-opacity='1'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ============================================================ */}
        {/*  Section Header                                               */}
        {/* ============================================================ */}

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center mb-14 md:mb-20"
        >
          {/* Label */}
          <motion.p
            variants={headerVariants}
            className="font-[family-name:var(--font-inter)] text-[#8B6914] uppercase tracking-[0.4em] text-xs sm:text-sm font-medium mb-4"
          >
            VISIT US
          </motion.p>

          {/* Divider */}
          <motion.div
            variants={headerVariants}
            className="section-divider mb-6"
          />

          {/* Headline */}
          <motion.h2
            variants={headerVariants}
            className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl text-[#F0E6D6] font-bold mb-4"
          >
            Your Table Awaits
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            variants={headerVariants}
            className="font-[family-name:var(--font-inter)] text-[#4A4A4A] text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: '#D4B48A' }}
          >
            Reserve your spot at Kalyani Nagar&apos;s finest specialty coffee
            destination
          </motion.p>
        </motion.div>

        {/* ============================================================ */}
        {/*  Two-Column Layout                                            */}
        {/* ============================================================ */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ---------------------------------------------------------- */}
          {/*  Left Column — Reservation Form                             */}
          {/* ---------------------------------------------------------- */}

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className="rounded-2xl border border-[#E2CDB0]/30 bg-[#FFF8F0]/95 backdrop-blur-md p-6 md:p-8 shadow-xl">
              {/* Card Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#8B6914]/10">
                  <Calendar
                    className="w-5 h-5 text-[#8B6914]"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[#3C2415] font-bold">
                    Make a Reservation
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-xs text-[#8B6914]">
                    Book your perfect coffee experience
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClasses}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className={inputClasses}
                  />
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className={labelClasses}>
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className={labelClasses}>
                      Time
                    </label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    >
                      <option value="" disabled>
                        Select time
                      </option>
                      {timeOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Guests & Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="guests" className={labelClasses}>
                      Guests
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    >
                      <option value="" disabled>
                        Number of guests
                      </option>
                      {guestOptions.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="type" className={labelClasses}>
                      Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                    >
                      <option value="" disabled>
                        Reservation type
                      </option>
                      {typeOptions.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="specialRequests" className={labelClasses}>
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any dietary requirements, celebrations, or preferences..."
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#8B6914] text-[#FFF8F0] font-[family-name:var(--font-inter)] font-semibold text-sm tracking-wide rounded-lg transition-all duration-300 hover:bg-[#6B4F10] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B6914] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                      Reserving...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                      Reserve Now
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* ---------------------------------------------------------- */}
          {/*  Right Column — Location & Info                             */}
          {/* ---------------------------------------------------------- */}

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Address Card */}
            <div className="rounded-2xl border border-[#C4883A]/20 bg-[#2C1810]/80 backdrop-blur-md p-6 shadow-lg">
              <div className="flex items-start gap-4 mb-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#C4883A]/15 shrink-0">
                  <MapPin className="w-5 h-5 text-[#C4883A]" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="font-[family-name:var(--font-inter)] text-[#F0E6D6] font-semibold text-sm mb-1">
                    Address
                  </h4>
                  <p className="font-[family-name:var(--font-inter)] text-[#D4B48A] text-sm leading-relaxed">
                    Blue Tokai Coffee Roasters, Kalyani Nagar, Pune,
                    Maharashtra 411014
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#C4883A]/15 shrink-0">
                  <Phone className="w-5 h-5 text-[#C4883A]" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="font-[family-name:var(--font-inter)] text-[#F0E6D6] font-semibold text-sm mb-1">
                    Phone
                  </h4>
                  <a
                    href="tel:9810156980"
                    className="font-[family-name:var(--font-inter)] text-[#C4883A] text-sm hover:text-[#D49A4C] transition-colors duration-200"
                  >
                    9810156980
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-5">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#C4883A]/15 shrink-0">
                  <Clock className="w-5 h-5 text-[#C4883A]" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="font-[family-name:var(--font-inter)] text-[#F0E6D6] font-semibold text-sm mb-1">
                    Hours
                  </h4>
                  <div className="space-y-0.5">
                    <p className="font-[family-name:var(--font-inter)] text-[#D4B48A] text-sm">
                      Mon–Fri: 7:00 AM – 10:30 PM
                    </p>
                    <p className="font-[family-name:var(--font-inter)] text-[#D4B48A] text-sm">
                      Sat–Sun: 7:00 AM – 11:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#C4883A]/15 shrink-0">
                  <Car className="w-5 h-5 text-[#C4883A]" strokeWidth={2} />
                </div>
                <div>
                  <h4 className="font-[family-name:var(--font-inter)] text-[#F0E6D6] font-semibold text-sm mb-1">
                    Parking
                  </h4>
                  <p className="font-[family-name:var(--font-inter)] text-[#D4B48A] text-sm">
                    Free parking available at the complex. Valet parking on
                    weekends.
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl border border-[#C4883A]/20 overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.5!2d73.89757!3d18.5499059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1094ca904cb%3A0xb7ac8040c311533b!2sBlue%20Tokai%20Coffee%20Roasters%20%7C%20Kalyani%20Nagar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Blue Tokai Coffee Roasters — Kalyani Nagar location on Google Maps"
                className="w-full"
              />
            </div>

            {/* Directions Button */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=18.5499059,73.89757"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#C4883A]/40 bg-[#C4883A]/10 text-[#C4883A] font-[family-name:var(--font-inter)] font-semibold text-sm tracking-wide transition-all duration-300 hover:bg-[#C4883A]/20 hover:border-[#C4883A]/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4883A]"
            >
              <Navigation
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
              Get Directions
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </a>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/*  Quick Actions Row                                            */}
        {/* ============================================================ */}

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mt-14 md:mt-20"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* Order Ahead */}
            <motion.a
              href="#coffee"
              variants={quickActionVariants}
              custom={0}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group flex items-center gap-3 px-6 py-3.5 rounded-xl border border-[#C4883A]/30 bg-[#1A0F08]/80 text-[#F0E6D6] font-[family-name:var(--font-inter)] font-medium text-sm tracking-wide transition-all duration-300 hover:bg-[#2C1810] hover:border-[#C4883A]/50"
            >
              <Coffee
                className="w-4 h-4 text-[#C4883A] transition-transform duration-300 group-hover:rotate-12"
                strokeWidth={2}
              />
              Order Ahead
              <ArrowRight
                className="w-3.5 h-3.5 text-[#C4883A]/60 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </motion.a>

            {/* Book a Workshop */}
            <motion.a
              href="#reservations"
              variants={quickActionVariants}
              custom={1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group flex items-center gap-3 px-6 py-3.5 rounded-xl border border-[#C4883A]/30 bg-[#1A0F08]/80 text-[#F0E6D6] font-[family-name:var(--font-inter)] font-medium text-sm tracking-wide transition-all duration-300 hover:bg-[#2C1810] hover:border-[#C4883A]/50"
            >
              <Calendar
                className="w-4 h-4 text-[#C4883A] transition-transform duration-300 group-hover:scale-110"
                strokeWidth={2}
              />
              Book a Workshop
              <ArrowRight
                className="w-3.5 h-3.5 text-[#C4883A]/60 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </motion.a>

            {/* Get Directions */}
            <motion.a
              href="https://www.google.com/maps/dir/?api=1&destination=18.5499059,73.89757"
              target="_blank"
              rel="noopener noreferrer"
              variants={quickActionVariants}
              custom={2}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="group flex items-center gap-3 px-6 py-3.5 rounded-xl border border-[#C4883A]/30 bg-[#1A0F08]/80 text-[#F0E6D6] font-[family-name:var(--font-inter)] font-medium text-sm tracking-wide transition-all duration-300 hover:bg-[#2C1810] hover:border-[#C4883A]/50"
            >
              <Navigation
                className="w-4 h-4 text-[#C4883A] transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
              Get Directions
              <ArrowRight
                className="w-3.5 h-3.5 text-[#C4883A]/60 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
