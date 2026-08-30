import React from 'react';
import { ArrowUpRight, Sparkles, Terminal, Lock, CheckCircle2 } from 'lucide-react';
import { LogoMarquee } from './LogoMarquee';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="architecture"
      className="relative min-h-[92vh] pt-32 sm:pt-40 pb-16 flex flex-col items-center justify-center text-center px-4 sm:px-6 max-w-7xl mx-auto overflow-visible z-10"
    >
      {/* Sentient Protocol Badge with CAD Border Accents */}
      <div
        className="animate-hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-white/15 text-zinc-200 text-xs font-mono mb-6 backdrop-blur-xl shadow-lg hover:border-white/30 transition-colors cursor-pointer group"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span className="tracking-wide text-zinc-300 font-semibold">EGYDES ARCHITECTURE 3.4</span>
        <span className="text-zinc-600 font-sans">•</span>
        <span className="text-sky-300 font-sans group-hover:underline">Zero Human Latency</span>
        <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
      </div>

      {/* Master Headline with Serif & Italic Pairing */}
      <h1
        className="animate-hero-title font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] leading-[1.08] tracking-tight text-white max-w-5xl mx-auto font-normal drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]"
      >
        Information security, <br />
        <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-sky-200 to-indigo-200 drop-shadow-[0_0_35px_rgba(99,102,241,0.25)]">
          engineered for peace.
        </span>
      </h1>

      {/* Calm Subheading */}
      <p
        className="animate-hero-desc mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-400 font-light leading-relaxed tracking-normal"
      >
        Transform security from a chaotic battlefield into a self-healing equilibrium. 
        Autonomous cryptographic enclaves that isolate threats, rotate zero-trust keys, 
        and verify compliance in microsecond silence.
      </p>

      {/* Action Buttons - Enterprise Grade High-Contrast */}
      <div
        className="animate-hero-cta mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto justify-center"
      >
        <a
          href="#vaults"
          className="btn-enterprise-primary px-6 py-3 text-sm font-medium w-full sm:w-auto group shadow-md"
        >
          <Lock className="w-4 h-4 text-zinc-900" />
          <span>Deploy Autonomous Vault</span>
          <ArrowUpRight className="w-4 h-4 text-zinc-900 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        <a
          href="#telemetry"
          className="btn-enterprise-secondary px-6 py-3 text-sm font-medium w-full sm:w-auto group"
        >
          <Terminal className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
          <span>View Telemetry Stream</span>
        </a>
      </div>

      {/* Stats Sub-Row with CAD Ticks & Corner Brackets */}
      <div
        className="animate-hero-stats mt-14 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 w-full max-w-3xl mx-auto cad-tick-border p-2"
      >
        <div className="relative p-5 rounded-xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl flex flex-col items-center shadow-lg group hover:border-white/20 transition-colors">
          <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-600">01</div>
          <span className="font-mono text-2xl font-semibold text-white tracking-tight flex items-center gap-1">
            &lt; 0.8ms
            <span className="text-emerald-400 text-xs font-normal">P99</span>
          </span>
          <span className="text-xs text-zinc-400 mt-1">Autonomous Threat Mitigation</span>
        </div>

        <div className="relative p-5 rounded-xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl flex flex-col items-center shadow-lg group hover:border-white/20 transition-colors">
          <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-600">02</div>
          <span className="font-mono text-2xl font-semibold text-sky-200 tracking-tight">
            100% Zero-Trust
          </span>
          <span className="text-xs text-zinc-400 mt-1">Cryptographic Enclave Isolation</span>
        </div>

        <div className="relative p-5 rounded-xl bg-zinc-900/60 border border-white/10 backdrop-blur-xl flex flex-col items-center shadow-lg group hover:border-white/20 transition-colors">
          <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-600">03</div>
          <span className="font-mono text-2xl font-semibold text-emerald-300 tracking-tight flex items-center gap-1.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            SOC2 & ISO
          </span>
          <span className="text-xs text-zinc-400 mt-1">Continuous Real-time Audit</span>
        </div>
      </div>

      {/* Infinite Client Logo Tape */}
      <LogoMarquee />
    </section>
  );
};
