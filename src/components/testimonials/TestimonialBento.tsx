import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Sparkles, ShieldCheck, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const TestimonialBento: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const largeCardImageRef = useRef<HTMLImageElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax panning effect on the large nature card image
      if (largeCardImageRef.current && sectionRef.current) {
        gsap.to(largeCardImageRef.current, {
          y: -45,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Staggered entrance for all quote cards
      gsap.fromTo(
        cardRefs.current.filter(Boolean),
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto z-10"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>PROVEN QUIETUDE</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white font-normal tracking-tight">
          Trusted by engineering leaders <br />
          <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-sky-200 to-emerald-200">
            who value peaceful nights.
          </span>
        </h2>
        <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light">
          When security is mathematically verified at the hardware boundary, alarms vanish and tranquility takes over.
        </p>
      </div>

      {/* Asymmetric Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
        {/* Large Anchor Card (7 cols) with Parallax Nature Backdrop */}
        <div
          ref={(el) => { cardRefs.current[0] = el; }}
          className="lg:col-span-7 relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl min-h-[420px] flex flex-col justify-end p-8 sm:p-12 group"
        >
          {/* Nature Background Image with Parallax Shift */}
          <div className="absolute inset-0 -top-16 -bottom-16 overflow-hidden -z-20">
            <img
              ref={largeCardImageRef}
              src="/futuristic_quantum_core.jpg"
              alt="Futuristic cyber security enclave"
              className="w-full h-full object-cover object-center scale-110 filter brightness-[0.4] contrast-[1.15] transition-transform duration-700 group-hover:scale-115"
            />
          </div>

          {/* Deep Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent -z-10" />

          {/* Glowing Quote Mark */}
          <div className="text-sky-300/40 mb-4 animate-quote-breathe">
            <Quote className="w-12 h-12" />
          </div>

          {/* Quote Content */}
          <blockquote className="relative z-10 text-xl sm:text-2xl md:text-3xl font-serif text-white font-normal leading-snug drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]">
            "Before egydes, our security team was drowning in 40,000 false alerts every month. Today, our containment operates with zero human friction. It feels less like software and more like{' '}
            <span className="italic text-sky-200">natural equilibrium</span>."
          </blockquote>

          {/* Author Details */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-sky-400 p-0.5">
                <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center font-serif text-white text-sm font-semibold">
                  ER
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">Elena Rostova</h4>
                <p className="text-xs text-zinc-400">Chief Information Security Officer, Vercel Edge</p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-emerald-400 text-xs font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>VERIFIED ENTERPRISE</span>
            </div>
          </div>
        </div>

        {/* Stacked Smaller Cards (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Card B */}
          <div
            ref={(el) => { cardRefs.current[1] = el; }}
            className="plasma-card p-6 sm:p-8 flex flex-col justify-between flex-1 group hover:-translate-y-1.5 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-indigo-400/50 animate-quote-breathe">
                  <Quote className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
                  ))}
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                "The quantum key enclave rotation solved our compliance bottlenecks in three lines of code. It’s the most sophisticated yet tranquil infrastructure we’ve ever deployed."
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-medium text-white">Dr. Aris Thorne</h4>
                <p className="text-[11px] text-zinc-500">Head of Cryptography, Scale AI</p>
              </div>
              <span className="text-[10px] font-mono text-indigo-300 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                SOC2 TYPE II
              </span>
            </div>
          </div>

          {/* Card C */}
          <div
            ref={(el) => { cardRefs.current[2] = el; }}
            className="plasma-card p-6 sm:p-8 flex flex-col justify-between flex-1 group hover:-translate-y-1.5 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-emerald-400/50 animate-quote-breathe">
                  <Quote className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                "We migrated 4,000 microservices into egydes’s zero-trust mesh. Latency dropped by 40% and our audit passed in record time without a single exception."
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-medium text-white">Marcus Vance</h4>
                <p className="text-[11px] text-zinc-500">VP Infrastructure, Linear</p>
              </div>
              <span className="text-[10px] font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                ISO 27001
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
