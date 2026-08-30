import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, Menu, X, Terminal } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Architecture', href: '#architecture' },
  { name: 'Key Vaults', href: '#vaults' },
  { name: 'Telemetry', href: '#telemetry' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Compliance', href: '#compliance' },
];

export const LiquidNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('#architecture');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3 sm:pt-5 pointer-events-none transition-all duration-300">
        <nav
          aria-label="Main Navigation"
          className={`relative pointer-events-auto flex items-center justify-between transition-all duration-300 ease-out rounded-full border ${
            isScrolled
              ? 'w-full max-w-5xl px-3 py-1.5 bg-zinc-950/85 backdrop-blur-2xl border-white/12 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)]'
              : 'w-full max-w-5xl px-5 py-2.5 bg-zinc-900/60 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)]'
          }`}
        >
          {/* Subtle Top-Edge Reflection Filament */}
          <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

          {/* Logo & Brand */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-full p-1"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-white/15 text-white group-hover:border-white/30 transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]">
              <Shield className="w-4 h-4 text-sky-400 transition-transform group-hover:scale-105 duration-200" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-zinc-950" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-lg font-semibold tracking-tight text-white">
                egydes
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-300 border border-white/10">
                v3.4
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-0.5 bg-zinc-950/60 border border-white/10 p-1 rounded-full shadow-inner">
            {navItems.map((item) => {
              const isActive = activeItem === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveItem(item.href)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative px-3 py-1.5 text-xs font-medium tracking-wide rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 min-h-[32px] flex items-center whitespace-nowrap ${
                    isActive
                      ? 'text-white bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.06]'
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Right Action CTA & Status Badge */}
          <div className="flex items-center gap-2">
            {/* Live Security Nominal Badge */}
            <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono shadow-sm whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-zinc-400 font-sans text-[10px]">LATENCY:</span> 0.8ms
            </div>

            {/* High-Contrast Enterprise CTA Button */}
            <a
              href="#vaults"
              className="btn-enterprise-primary group"
            >
              <span>Request Access</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-900 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-zinc-300 hover:text-white bg-zinc-900 border border-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8">
          <div className="flex flex-col gap-2">
            <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest px-2 mb-2">
              Navigation Menu
            </div>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => {
                  setActiveItem(item.href);
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-3 text-base font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-xl border border-white/5 transition-all flex items-center justify-between"
              >
                <span>{item.name}</span>
                <ArrowRight className="w-4 h-4 text-zinc-500" />
              </a>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                STATUS
              </span>
              <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                100% NOMINAL
              </span>
            </div>
            <a
              href="#vaults"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-enterprise-primary w-full py-3 justify-center text-sm"
            >
              <span>Deploy Autonomous Vault</span>
              <ArrowRight className="w-4 h-4 text-zinc-900" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
