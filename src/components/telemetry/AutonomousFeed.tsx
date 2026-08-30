import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Cpu, Radio } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TelemetryEvent {
  id: string;
  timestamp: string;
  type: 'DETECTED' | 'ISOLATED' | 'REVOKED' | 'STABILIZED';
  source: string;
  action: string;
  duration: string;
  status: 'Nominal' | 'Contained' | 'Verified';
}

const initialEvents: TelemetryEvent[] = [
  {
    id: 'evt-0941',
    timestamp: '02:47:12.894',
    type: 'DETECTED',
    source: 'Edge-Gateway-AP-04',
    action: 'Unsigned gRPC token drift identified across shard boundary',
    duration: '0.24ms',
    status: 'Nominal',
  },
  {
    id: 'evt-0942',
    timestamp: '02:47:12.895',
    type: 'ISOLATED',
    source: 'Enclave-Core-9X',
    action: 'Zero-knowledge circuit isolated tainted memory partition',
    duration: '0.12ms',
    status: 'Contained',
  },
  {
    id: 'evt-0943',
    timestamp: '02:47:12.896',
    type: 'REVOKED',
    source: 'KMS-Shard-Cluster',
    action: 'Revoked intermediate ECDSA certificate; rotated HSM master root',
    duration: '0.41ms',
    status: 'Contained',
  },
  {
    id: 'evt-0944',
    timestamp: '02:47:12.898',
    type: 'STABILIZED',
    source: 'Consensus-Mesh',
    action: 'Equilibrium state verified across 100% of distributed nodes',
    duration: '0.19ms',
    status: 'Verified',
  },
];

export const AutonomousFeed: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const feedListRef = useRef<HTMLDivElement>(null);
  const [events] = useState<TelemetryEvent[]>(initialEvents);
  const [liveStreamActive, setLiveStreamActive] = useState(true);
  const [liveClock, setLiveClock] = useState<string>('02:47:18.402');

  // Real-time ticking millisecond clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const h = String(now.getUTCHours()).padStart(2, '0');
      const m = String(now.getUTCMinutes()).padStart(2, '0');
      const s = String(now.getUTCSeconds()).padStart(2, '0');
      const ms = String(now.getUTCMilliseconds()).padStart(3, '0');
      setLiveClock(`${h}:${m}:${s}.${ms}`);
    }, 47);

    return () => clearInterval(timer);
  }, []);

  // GSAP scroll trigger for staggered feed appearance
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (feedListRef.current) {
        gsap.fromTo(
          feedListRef.current.children,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: feedListRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getTypeBadge = (type: TelemetryEvent['type']) => {
    switch (type) {
      case 'DETECTED':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            DETECTED
          </span>
        );
      case 'ISOLATED':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/30">
            ISOLATED
          </span>
        );
      case 'REVOKED':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
            REVOKED
          </span>
        );
      case 'STABILIZED':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            STABILIZED
          </span>
        );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="telemetry"
      className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto z-10"
    >
      {/* Section Headline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>AUTONOMOUS CONTAINMENT LEDGER</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight">
            Threats contained in <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-sky-200 to-indigo-200">
              microsecond quietude.
            </span>
          </h2>
        </div>

        {/* Live Server UTC Readout */}
        <div className="flex items-center gap-4 p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.08] backdrop-blur-xl">
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>UTC TICK:</span>
            <span className="text-white font-semibold">{liveClock}</span>
          </div>
          <button
            onClick={() => setLiveStreamActive(!liveStreamActive)}
            className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
          >
            {liveStreamActive ? 'PAUSE' : 'RESUME'}
          </button>
        </div>
      </div>

      {/* Main Terminal Container */}
      <div className="plasma-card p-6 sm:p-8 overflow-hidden shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08] text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
            </div>
            <span className="text-zinc-300 font-medium">SHIELD_DAEMON://CONTAINMENT_LOG</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-zinc-500 text-[11px]">
            <span>LATENCY BUDGET: 1.0ms</span>
            <span>ZERO HUMAN OVERRIDE</span>
          </div>
        </div>

        {/* Staggered Event Stream */}
        <div ref={feedListRef} className="space-y-3 font-mono text-xs">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="group relative flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-xl bg-zinc-950/60 border border-white/[0.05] hover:border-white/15 hover:bg-zinc-950/90 transition-all duration-300"
            >
              {/* Left Details */}
              <div className="flex items-start lg:items-center gap-3 mb-2 lg:mb-0">
                <div className="text-zinc-500 text-[11px] whitespace-nowrap">
                  [{evt.timestamp}]
                </div>
                {getTypeBadge(evt.type)}
                <span className="text-zinc-300 font-sans text-xs sm:text-sm font-normal">
                  {evt.action}
                </span>
              </div>

              {/* Right Telemetry Meta */}
              <div className="flex items-center gap-4 text-[11px] text-zinc-400 justify-between lg:justify-end pl-0 lg:pl-4 border-t lg:border-t-0 pt-2 lg:pt-0 border-white/5">
                <span className="text-zinc-500 font-mono">{evt.source}</span>
                <span className="text-sky-300 font-mono">Δ {evt.duration}</span>
                <span className="text-emerald-400 font-mono font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {evt.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Autonomous containment rate: <strong className="text-emerald-400 font-normal">100% (0 False Positives)</strong></span>
          </div>
          <div className="text-[11px] text-zinc-400">
            CRYPTOGRAPHIC ATTESTATION #8942-F0
          </div>
        </div>
      </div>
    </section>
  );
};
