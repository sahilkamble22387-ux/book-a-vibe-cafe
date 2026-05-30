"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/sections/LoadingScreen";
import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";
import Roastery from "@/components/sections/Roastery";
import CoffeeCollection from "@/components/sections/CoffeeCollection";
import CafeExperience from "@/components/sections/CafeExperience";
import Subscriptions from "@/components/sections/Subscriptions";
import Events from "@/components/sections/Events";
import Reservations from "@/components/sections/Reservations";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF6F0" }}>
      <LoadingScreen />
      <Navigation />
      <main className="flex-1">
        <Hero />
        <Journey />
        <Roastery />
        <CoffeeCollection />
        <CafeExperience />
        <Subscriptions />
        <Events />
        <Reservations />
      </main>
      <Footer />
    </div>
  );
}
