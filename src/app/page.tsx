'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from '@/components/sections/LoadingScreen';
import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import AboutStory from '@/components/sections/AboutStory';
import TheSpace from '@/components/sections/TheSpace';
import BookLibrary from '@/components/sections/BookLibrary';
import MenuHighlights from '@/components/sections/MenuHighlights';
import Events from '@/components/sections/Events';
import VisitUs from '@/components/sections/VisitUs';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>
      <Navigation />
      <Hero />
      <AboutStory />
      <TheSpace />
      <BookLibrary />
      <MenuHighlights />
      <Events />
      <VisitUs />
      <Footer />
    </main>
  );
}
