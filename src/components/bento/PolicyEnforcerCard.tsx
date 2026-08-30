import React, { useState } from 'react';
import { Network, Server, Fingerprint, CheckCircle } from 'lucide-react';
import { BorderGlow } from '../ui/BorderGlow';

export const PolicyEnforcerCard: React.FC = () => {
  const [autoHealEnabled, setAutoHealEnabled] = useState(true);

  const securityNodes = [
    { id: 'node-us-east', region: 'AWS us-east-1', latency: '0.4ms', status: 'Nominal' },
    { id: 'node-eu-west', region: 'GCP europe-west3', latency: '0.6ms', status: 'Nominal' },
    { id: 'node-ap-south', region: 'Azure ap-southeast', latency: '0.9ms', status: 'Nominal' },
  ];

  return (
    <BorderGlow
      edgeSensitivity={30}
      glowColor="155 80 70"
      backgroundColor="#0d0d14"
      borderRadius={20}
      glowRadius={40}
      glowIntensity={1.2}
      coneSpread={28}
      animated={false}
      colors={['#34d399', '#38bdf8', '#a7f3d0']}
      fillOpacity={0.4}
      className="h-full group"
    >
      <div className="p-6 sm:p-8 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white tracking-tight">
                  Zero-Trust Mesh Router
                </h3>
                <p className="text-xs text-zinc-400">Microsecond Threat Isolation</p>
              </div>
            </div>

            {/* Interactive Autonomous Switch */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-zinc-400">AUTONOMOUS</span>
              <button
                onClick={() => setAutoHealEnabled(!autoHealEnabled)}
                className={`w-9 h-5 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                  autoHealEnabled ? 'bg-emerald-500/80 shadow-[0_0_12px_rgba(52,211,153,0.5)]' : 'bg-zinc-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    autoHealEnabled ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-5">
            Every inbound telemetry packet is cross-verified against cryptographic policy graphs. Compromised paths are instantaneously rerouted without service interruption.
          </p>

          {/* Global Node Table */}
          <div className="space-y-2 font-mono text-xs">
            {securityNodes.map((node) => (
              <div
                key={node.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/70 border border-white/[0.05] hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="text-zinc-300 font-sans text-xs">{node.region}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sky-300 text-[11px]">{node.latency}</span>
                  <span className="flex items-center gap-1 text-emerald-400 text-[11px]">
                    <CheckCircle className="w-3 h-3" />
                    {node.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Attestation */}
        <div className="mt-5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <Fingerprint className="w-3.5 h-3.5 text-indigo-400" />
            Hardware Attestation
          </span>
          <span className="text-emerald-400 font-medium">100% Policy Bound</span>
        </div>
      </div>
    </BorderGlow>
  );
};
