'use client';

import { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  BookOpen,
  Send,
} from 'lucide-react';
import { toast } from 'sonner';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'The Space', href: '#space' },
  { label: 'Menu', href: '#menu' },
  { label: 'Events', href: '#events' },
  { label: 'Visit Us', href: '#visit' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Failed to subscribe');

      toast.success("You're subscribed! 📚", {
        description: 'Stay in the loop — Bookavibe updates are on the way.',
      });
      setEmail('');
    } catch {
      toast.error('Something went wrong', {
        description: 'Please try again later.',
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="mt-auto" style={{ backgroundColor: '#1A1210' }}>
      {/* Subtle gold top border */}
      <div className="h-px w-full" style={{ backgroundColor: 'rgba(196, 151, 59, 0.3)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Main Footer Content: 4 columns ── */}
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 - Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <h3
                className="text-3xl font-bold"
                style={{ fontFamily: 'var(--font-playfair)', color: '#C4973B' }}
              >
                Bookavibe
              </h3>
              <p
                className="text-sm mt-1 tracking-wide"
                style={{ color: '#8B7D6B', fontFamily: 'var(--font-inter)' }}
              >
                Book Cafe &amp; Co-working Space
              </p>
            </div>

            <div className="flex items-start gap-2 mb-6">
              <BookOpen
                className="w-4 h-4 mt-0.5 shrink-0"
                style={{ color: '#5B7553' }}
              />
              <p
                className="text-sm leading-relaxed max-w-xs"
                style={{ color: '#8B7D6B' }}
              >
                Where books meet brews and ideas come to life.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/book_a_vibe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                style={{
                  borderColor: 'rgba(196, 151, 59, 0.2)',
                  color: '#8B7D6B',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(196, 151, 59, 0.5)';
                  e.currentTarget.style.color = '#C4973B';
                  e.currentTarget.style.backgroundColor = 'rgba(196, 151, 59, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(196, 151, 59, 0.2)';
                  e.currentTarget.style.color = '#8B7D6B';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/Bookavibe"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
                style={{
                  borderColor: 'rgba(196, 151, 59, 0.2)',
                  color: '#8B7D6B',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(196, 151, 59, 0.5)';
                  e.currentTarget.style.color = '#C4973B';
                  e.currentTarget.style.backgroundColor = 'rgba(196, 151, 59, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(196, 151, 59, 0.2)';
                  e.currentTarget.style.color = '#8B7D6B';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4
              className="text-sm font-semibold tracking-[0.2em] uppercase mb-6"
              style={{ color: '#FBF7F0', fontFamily: 'var(--font-playfair)' }}
            >
              Explore
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="text-sm transition-colors duration-300 inline-block"
                    style={{ color: '#8B7D6B' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#C4973B';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#8B7D6B';
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Connect */}
          <div>
            <h4
              className="text-sm font-semibold tracking-[0.2em] uppercase mb-6"
              style={{ color: '#FBF7F0', fontFamily: 'var(--font-playfair)' }}
            >
              Connect
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:7030073737"
                  className="flex items-center gap-3 text-sm transition-colors duration-300"
                  style={{ color: '#8B7D6B' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#C4973B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#8B7D6B';
                  }}
                >
                  <Phone className="w-4 h-4 shrink-0" style={{ color: '#5B7553' }} />
                  7030073737
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm" style={{ color: '#8B7D6B' }}>
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#5B7553' }} />
                <span>
                  Ground Floor, Rachana Tulips,
                  <br />
                  FC Road, Pune 411004
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm" style={{ color: '#8B7D6B' }}>
                <Clock className="w-4 h-4 shrink-0" style={{ color: '#5B7553' }} />
                10:00 AM – 10:30 PM
              </li>
              <li>
                <a
                  href="https://instagram.com/book_a_vibe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors duration-300"
                  style={{ color: '#8B7D6B' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#C4973B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#8B7D6B';
                  }}
                >
                  <Instagram className="w-4 h-4 shrink-0" style={{ color: '#5B7553' }} />
                  @book_a_vibe
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/Bookavibe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm transition-colors duration-300"
                  style={{ color: '#8B7D6B' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#C4973B';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#8B7D6B';
                  }}
                >
                  <Facebook className="w-4 h-4 shrink-0" style={{ color: '#5B7553' }} />
                  /Bookavibe
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4
              className="text-sm font-semibold tracking-[0.2em] uppercase mb-3"
              style={{ color: '#FBF7F0', fontFamily: 'var(--font-playfair)' }}
            >
              Stay in the Loop
            </h4>
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#8B7D6B' }}>
              Get updates on events, new books, and specials.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg text-sm placeholder:text-opacity-40 focus:outline-none transition-all"
                  style={{
                    backgroundColor: 'rgba(251, 247, 240, 0.05)',
                    border: '1px solid rgba(196, 151, 59, 0.15)',
                    color: '#FBF7F0',
                    fontFamily: 'var(--font-inter)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(196, 151, 59, 0.5)';
                    e.currentTarget.style.boxShadow = '0 0 0 2px rgba(196, 151, 59, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(196, 151, 59, 0.15)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={isSubscribing}
                className="w-full px-5 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: '#C4973B',
                  color: '#1A1210',
                }}
                onMouseEnter={(e) => {
                  if (!isSubscribing) {
                    e.currentTarget.style.backgroundColor = '#D4A74B';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(196, 151, 59, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#C4973B';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {isSubscribing ? (
                  'Subscribing...'
                ) : (
                  <>
                    Subscribe
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div
          className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(196, 151, 59, 0.15)' }}
        >
          <p className="text-xs" style={{ color: '#8B7D6B', opacity: 0.6 }}>
            © 2024 Bookavibe. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#8B7D6B', opacity: 0.6 }}>
            Made with ☕ &amp; 📚 in Pune
          </p>
        </div>
      </div>
    </footer>
  );
}
