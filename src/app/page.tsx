"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "@/components/sections/LoadingScreen";
import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import OurStory from "@/components/sections/OurStory";
import MenuHighlights from "@/components/sections/MenuHighlights";
import SignatureShrappe from "@/components/sections/SignatureShrappe";
import CafeExperience from "@/components/sections/CafeExperience";
import OrderOnline from "@/components/sections/OrderOnline";
import VisitUs from "@/components/sections/VisitUs";
import Footer from "@/components/sections/Footer";

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
      <OurStory />
      <MenuHighlights />
      <SignatureShrappe />
      <CafeExperience />
      <OrderOnline />
      <VisitUs />
      <Footer />
    </main>
  );
}
