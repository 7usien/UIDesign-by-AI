import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KeyVaultCard } from './KeyVaultCard';
import { SignalChartCard } from './SignalChartCard';
import { PolicyEnforcerCard } from './PolicyEnforcerCard';
import { Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const BentoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Entrance
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );

      // 2. Bento Cards 3D Decentralized Assembly Entrance
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current];
      
      cards.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
            scale: 0.96,
            transformPerspective: 1000,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            delay: i * 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vaults"
      className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10"
    >
      {/* Section Header */}
      <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-white/10 text-sky-300 text-xs font-mono mb-4 shadow-sm">
          <Layers className="w-3.5 h-3.5 text-sky-400" />
          <span>DECENTRALIZED ARCHITECTURE</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight">
          Sentient Defense, <br className="hidden sm:inline" />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-sky-200 to-indigo-200">
            structured in tranquility.
          </span>
        </h2>
        <p className="mt-5 text-base sm:text-lg text-zinc-400 font-light max-w-2xl mx-auto">
          Every layer of the egydes stack is mathematically insulated. Post-quantum hardware key derivation, continuous telemetry waveform confidence, and microsecond policy routing.
        </p>
      </div>

      {/* Bento Grid Layout Wrapped with CAD Calibration Frame */}
      <div className="relative p-3 sm:p-6 rounded-2xl bg-zinc-950/40 border border-white/10 cad-tick-border backdrop-blur-sm shadow-2xl">
        {/* Technical Corner Coordinate Markers */}
        <div className="absolute top-2 left-3 font-mono text-[10px] text-zinc-600 hidden sm:block">
          SEC.02 // CORE_STACK
        </div>
        <div className="absolute top-2 right-3 font-mono text-[10px] text-zinc-600 hidden sm:block">
          LAT: 0.8ms
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2 sm:pt-4">
          <div ref={card1Ref} className="h-full">
            <KeyVaultCard />
          </div>
          <div ref={card2Ref} className="h-full">
            <SignalChartCard />
          </div>
          <div ref={card3Ref} className="h-full md:col-span-2 lg:col-span-1">
            <PolicyEnforcerCard />
          </div>
        </div>
      </div>
    </section>
  );
};
