import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';

export const SiteFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.08] bg-zinc-950/80 backdrop-blur-2xl z-10 pt-16 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        {/* Brand Column */}
        <div className="col-span-2">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-950 border border-indigo-500/30 text-sky-300">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif text-xl font-semibold tracking-tight text-white">
              egydes
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-sm leading-relaxed mb-6">
            Autonomous information security engineered for peaceful equilibrium. Zero human latency, quantum-safe hardware vaults, and continuous mathematical attestation.
          </p>

          {/* System Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/30 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>MESH STATUS: 100% NOMINAL</span>
          </div>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 mb-4">
            Platform
          </h4>
          <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
            <li><a href="#vaults" className="hover:text-sky-300 transition-colors">Quantum Vaults</a></li>
            <li><a href="#telemetry" className="hover:text-sky-300 transition-colors">Live Telemetry</a></li>
            <li><a href="#architecture" className="hover:text-sky-300 transition-colors">Zero-Trust Mesh</a></li>
            <li><a href="#architecture" className="hover:text-sky-300 transition-colors">Hardware Enclaves</a></li>
          </ul>
        </div>

        {/* Compliance & Standards */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 mb-4">
            Compliance
          </h4>
          <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
            <li><a href="#compliance" className="hover:text-sky-300 transition-colors">SOC 2 Type II</a></li>
            <li><a href="#compliance" className="hover:text-sky-300 transition-colors">ISO/IEC 27001</a></li>
            <li><a href="#compliance" className="hover:text-sky-300 transition-colors">HIPAA Attestation</a></li>
            <li><a href="#compliance" className="hover:text-sky-300 transition-colors">GDPR Privacy</a></li>
          </ul>
        </div>

        {/* Company & Legal */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 mb-4">
            Company
          </h4>
          <ul className="space-y-2.5 text-xs text-zinc-400 font-light">
            <li><a href="#" className="hover:text-sky-300 transition-colors">Security Advisory</a></li>
            <li><a href="#" className="hover:text-sky-300 transition-colors">Cryptographic Proofs</a></li>
            <li><a href="#" className="hover:text-sky-300 transition-colors">Privacy Charter</a></li>
            <li><a href="#" className="hover:text-sky-300 transition-colors">Terms of Attestation</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Controls */}
      <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-4">
          <span>&copy; {new Date().getFullYear()} egydes Sentient Security Inc.</span>
          <span>•</span>
          <span className="text-zinc-600">ALL RIGHTS RESERVED</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
