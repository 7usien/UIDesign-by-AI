import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, FileCheck2, ArrowRight, Sparkles } from 'lucide-react';
import { MagicRings } from '../ui/MagicRings';
import { BorderGlow } from '../ui/BorderGlow';

gsap.registerPlugin(ScrollTrigger);

const complianceStandards = [
  { name: 'SOC 2 Type II', desc: 'Continuous Real-time Telemetry Attestation', badge: 'Certified' },
  { name: 'ISO/IEC 27001:2022', desc: 'Global Information Security Management', badge: 'Verified' },
  { name: 'HIPAA & HITECH', desc: 'Cryptographic Health Data Shielding', badge: 'Compliant' },
  { name: 'GDPR / CCPA', desc: 'Zero-Knowledge Sovereign Enclave Privacy', badge: 'Audited' },
  { name: 'FedRAMP High', desc: 'Government-Grade Enclave Isolation', badge: 'Ready' },
  { name: 'PCI-DSS Level 1', desc: 'Quantum-Safe Cardholder Data Protection', badge: 'Certified' },
];

export const StatsAndCompliance: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const num1Ref = useRef<HTMLSpanElement>(null);
  const num2Ref = useRef<HTMLSpanElement>(null);
  const num3Ref = useRef<HTMLSpanElement>(null);
  const num4Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Numerical GSAP Count-Up ScrollTrigger Animations
      const animateCount = (el: HTMLElement | null, targetVal: number, decimals: number = 0, suffix: string = '') => {
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetVal,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          onUpdate: () => {
            el.innerText = `${obj.val.toFixed(decimals)}${suffix}`;
          },
        });
      };

      animateCount(num1Ref.current, 99.994, 3, '%');
      animateCount(num2Ref.current, 412, 0, '+');
      animateCount(num3Ref.current, 0.8, 1, 'ms');
      animateCount(num4Ref.current, 0, 0, '$');
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="compliance"
      className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10"
    >
      {/* 1. Numerical Verification Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
        <div className="plasma-card p-6 sm:p-8 flex flex-col items-center text-center">
          <span
            ref={num1Ref}
            className="font-mono text-3xl sm:text-5xl font-semibold text-white tracking-tight"
          >
            0.000%
          </span>
          <span className="text-xs sm:text-sm text-zinc-400 mt-2 font-medium">
            Autonomous Containment
          </span>
          <span className="text-[11px] font-mono text-emerald-400 mt-1">Zero human latency</span>
        </div>

        <div className="plasma-card p-6 sm:p-8 flex flex-col items-center text-center">
          <span
            ref={num2Ref}
            className="font-mono text-3xl sm:text-5xl font-semibold text-sky-200 tracking-tight"
          >
            0+
          </span>
          <span className="text-xs sm:text-sm text-zinc-400 mt-2 font-medium">
            Global Enterprises
          </span>
          <span className="text-[11px] font-mono text-sky-400 mt-1">Protected in production</span>
        </div>

        <div className="plasma-card p-6 sm:p-8 flex flex-col items-center text-center">
          <span
            ref={num3Ref}
            className="font-mono text-3xl sm:text-5xl font-semibold text-indigo-300 tracking-tight"
          >
            0.0ms
          </span>
          <span className="text-xs sm:text-sm text-zinc-400 mt-2 font-medium">
            P99 Isolation Speed
          </span>
          <span className="text-[11px] font-mono text-indigo-400 mt-1">Microsecond response</span>
        </div>

        <div className="plasma-card p-6 sm:p-8 flex flex-col items-center text-center">
          <span
            ref={num4Ref}
            className="font-mono text-3xl sm:text-5xl font-semibold text-emerald-300 tracking-tight"
          >
            0$
          </span>
          <span className="text-xs sm:text-sm text-zinc-400 mt-2 font-medium">
            Security Incident Loss
          </span>
          <span className="text-[11px] font-mono text-emerald-400 mt-1">100% Guaranteed</span>
        </div>
      </div>

      {/* 2. Compliance Standards Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-4">
          <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>INSTANTANEOUS ATTESTATION</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight">
          Compliance as a perpetual state, <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-sky-200 to-indigo-200">
            not an annual panic.
          </span>
        </h2>
      </div>

      {/* Border-glow compliance cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-20">
        {complianceStandards.map((item) => (
          <BorderGlow
            key={item.name}
            edgeSensitivity={30}
            glowColor="155 80 70"
            backgroundColor="#0f1117"
            borderRadius={18}
            glowRadius={35}
            glowIntensity={1.0}
            coneSpread={30}
            colors={['#34d399', '#38bdf8', '#818cf8']}
            fillOpacity={0.35}
            className="h-full group hover:-translate-y-1 transition-transform duration-300"
          >
            <div className="p-6 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Check className="w-4 h-4 text-emerald-300" />
                  </div>
                  <h3 className="text-sm font-semibold text-white tracking-wide">{item.name}</h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/40 text-emerald-300 border border-emerald-500/30">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          </BorderGlow>
        ))}
      </div>

      {/* 3. CTA Banner — Magic Rings Three.js background */}
      <div className="relative rounded-3xl cta-fancy-border overflow-hidden">
        {/* Glass fill layer with MagicRings as interactive background */}
        <div
          className="relative overflow-hidden rounded-3xl px-8 py-16 sm:py-20 sm:px-14 text-center min-h-[460px] flex flex-col items-center justify-center"
          style={{
            background: 'rgba(7, 7, 12, 0.85)',
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          }}
        >
          {/* Magic Rings interactive background */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none" aria-hidden="true">
            <MagicRings
              color="#38bdf8"
              colorTwo="#34d399"
              ringCount={6}
              speed={0.75}
              attenuation={11}
              lineThickness={1.8}
              baseRadius={0.34}
              radiusStep={0.1}
              scaleRate={0.09}
              opacity={0.65}
              blur={0}
              noiseAmount={0.06}
              rotation={0}
              ringGap={1.5}
              fadeIn={0.7}
              fadeOut={0.5}
              followMouse={true}
              mouseInfluence={0.18}
              hoverScale={1.15}
              parallax={0.05}
              clickBurst={true}
            />
          </div>

          {/* Dark vignette overlay so text stays ultra-legible */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 85% 75% at 50% 50%, rgba(9, 9, 14, 0.35) 0%, rgba(5, 5, 8, 0.88) 100%)',
            }}
          />

          {/* Top-edge sheen */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

          {/* CAD corner marks */}
          <div className="absolute top-3 left-4 text-[10px] font-mono text-white/25 tracking-widest hidden sm:block">SEC.03 // DEPLOY</div>
          <div className="absolute top-3 right-4 text-[10px] font-mono text-white/25 tracking-widest hidden sm:block">ENCLAVE.READY</div>

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Protocol badge */}
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-white/15 text-zinc-200 text-[11px] font-mono mb-6 backdrop-blur-xl shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <Sparkles className="w-3 h-3 text-indigo-300" />
              INSTANT ENCLAVE DEPLOYMENT
            </span>

            <h3 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight leading-tight">
              Ready to experience security <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-indigo-200 to-emerald-200 drop-shadow-[0_0_25px_rgba(99,102,241,0.3)]">
                in quiet serenity?
              </span>
            </h3>

            <p className="mt-5 text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-lg mx-auto">
              Deploy your dedicated hardware security enclave in under 3 minutes. Zero agent overhead, infinite peace of mind.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href="#architecture"
                className="btn-enterprise-primary px-8 py-3.5 text-sm font-semibold w-full sm:w-auto group shadow-xl"
              >
                <span>Initialize egydes Enclave</span>
                <ArrowRight className="w-4 h-4 text-zinc-900 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="#vaults"
                className="btn-enterprise-secondary px-7 py-3.5 text-sm font-medium w-full sm:w-auto group"
              >
                <span>Schedule Architecture Briefing</span>
              </a>
            </div>

            {/* Trust line */}
            <p className="mt-5 text-[11px] font-mono text-zinc-500 tracking-wide">
              No credit card required&nbsp;&nbsp;•&nbsp;&nbsp;SOC2 Type II Certified&nbsp;&nbsp;•&nbsp;&nbsp;99.999% SLA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
