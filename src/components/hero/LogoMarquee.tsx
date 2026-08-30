import React from 'react';
import { Cpu, ShieldCheck, Database, Cloud, Layers, Radio, Globe } from 'lucide-react';

const partners = [
  { name: 'Anthropic AI', icon: Cpu, desc: 'Model Security' },
  { name: 'Vercel Edge', icon: Cloud, desc: 'Edge Infrastructure' },
  { name: 'Cloudflare', icon: ShieldCheck, desc: 'Network Attestation' },
  { name: 'Supabase', icon: Database, desc: 'Encrypted Persistence' },
  { name: 'Linear', icon: Layers, desc: 'Sync Protocols' },
  { name: 'Datadog', icon: ActivityIcon, desc: 'Telemetry Stream' },
  { name: 'Raytheon Tech', icon: Radio, desc: 'Defense Standards' },
  { name: 'Global Sovereign', icon: Globe, desc: 'Zero-Trust Mesh' },
];

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

export const LogoMarquee: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-20 relative py-6">
      <div className="text-center mb-6">
        <span className="text-[11px] font-mono tracking-widest uppercase text-zinc-500">
          PROTECTING GLOBAL DECENTRALIZED INFRASTRUCTURE
        </span>
      </div>

      {/* Marquee Track Container with pure CSS alpha mask - avoids opaque background boxes */}
      <div
        className="relative overflow-hidden w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div className="flex w-max animate-marquee">
          {/* Double-cloned stream for seamless infinite loop */}
          {[...partners, ...partners].map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div
                key={`${partner.name}-${index}`}
                className="flex items-center gap-3 mx-4 sm:mx-6 px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 group cursor-pointer"
              >
                <div className="p-1.5 rounded-lg bg-white/[0.04] text-zinc-400 group-hover:text-sky-300 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                    {partner.name}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    {partner.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
