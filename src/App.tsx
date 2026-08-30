import React from 'react';
import { useLenis } from './hooks/useLenis';
import { ArchitecturalBackground } from './components/background/ArchitecturalBackground';
import { LiquidNavbar } from './components/navigation/LiquidNavbar';
import { HeroSection } from './components/hero/HeroSection';
import { BentoSection } from './components/bento/BentoSection';
import { AutonomousFeed } from './components/telemetry/AutonomousFeed';
import { TestimonialBento } from './components/testimonials/TestimonialBento';
import { StatsAndCompliance } from './components/compliance/StatsAndCompliance';
import { SiteFooter } from './components/footer/SiteFooter';

export const App: React.FC = () => {
  // Initialize Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useLenis();

  return (
    <div className="relative min-h-screen bg-[#070709] text-zinc-100 selection:bg-indigo-500/30 selection:text-sky-200 overflow-hidden font-sans">
      {/* 1. Architectural CAD & Telemetry Background */}
      <ArchitecturalBackground />

      {/* 2. Fixed Floating Liquid Glass Navigation */}
      <LiquidNavbar />

      {/* 3. Main Page Content Structure */}
      <main className="relative z-10 flex flex-col">
        {/* Hero Introduction & Client Marquee */}
        <HeroSection />

        {/* Feature Bento Grid (Decentralized Assembly) */}
        <BentoSection />

        {/* Autonomous Containment Live Telemetry Feed */}
        <AutonomousFeed />

        {/* Testimonial Bento & Parallax Imagery */}
        <TestimonialBento />

        {/* Data Verification & Compliance Grid */}
        <StatsAndCompliance />
      </main>

      {/* 4. Global Calm Footer */}
      <SiteFooter />
    </div>
  );
};

export default App;
