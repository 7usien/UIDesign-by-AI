import React, { useState, useEffect } from 'react';
import { Key, Cpu, RefreshCw, Check, Copy } from 'lucide-react';
import { BorderGlow } from '../ui/BorderGlow';

const hexStreams = [
  '0x7F9A_21BD_E408_9A12',
  '0x3E1C_88BF_0045_D332',
  '0x9C04_FA21_908E_AA77',
  '0x5B88_1120_ED94_7701',
  '0x1A09_CC74_3389_BE10',
];

export const KeyVaultCard: React.FC = () => {
  const [activeStreamIndex, setActiveStreamIndex] = useState(0);
  const [displayedHex, setDisplayedHex] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [copied, setCopied] = useState(false);

  // Typewriter effect simulating HSM entropy derivation
  useEffect(() => {
    let currentIdx = 0;
    const targetText = hexStreams[activeStreamIndex];
    setDisplayedHex('');
    setIsTyping(true);

    const interval = setInterval(() => {
      if (currentIdx < targetText.length) {
        setDisplayedHex(targetText.slice(0, currentIdx + 1));
        currentIdx++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [activeStreamIndex]);

  const handleRotateKey = () => {
    setActiveStreamIndex((prev) => (prev + 1) % hexStreams.length);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(displayedHex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <BorderGlow
      edgeSensitivity={30}
      glowColor="250 85 75"
      backgroundColor="#0d0d14"
      borderRadius={20}
      glowRadius={40}
      glowIntensity={1.2}
      coneSpread={28}
      animated={false}
      colors={['#818cf8', '#c084fc', '#38bdf8']}
      fillOpacity={0.4}
      className="h-full group"
    >
      <div className="p-6 sm:p-8 flex flex-col justify-between h-full">
        <div>
          {/* Header Tag */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white tracking-tight">
                  Autonomous Key Vault
                </h3>
                <p className="text-xs text-zinc-400">Post-Quantum Hardware Enclave</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/40 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ISOLATED
            </span>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed mb-6">
            Cryptographic keys are derived within secure multi-party hardware enclaves, continuously rotated with zero-knowledge attestation.
          </p>

          {/* Live Hex Stream Terminal */}
          <div className="relative p-4 rounded-xl bg-zinc-950/80 border border-white/[0.08] shadow-inner font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between text-[11px] text-zinc-500 pb-2 border-b border-white/5 mb-3">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-sky-400" />
                <span>ENCLAVE: SECURE_CORE_0</span>
              </div>
              <span className="text-zinc-600">ECDSA-P384</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-indigo-200">
                <span className="text-zinc-600 select-none">&gt;</span>
                <span className="text-sky-300 font-semibold tracking-wider">
                  {displayedHex}
                </span>
                {isTyping && (
                  <span className="inline-block w-2 h-4 bg-sky-400 animate-pulse" />
                )}
              </div>

              <button
                onClick={handleCopy}
                title="Copy Enclave Address"
                className="p-1.5 rounded-md hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Sub-telemetry details */}
            <div className="mt-3 pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-[10px] text-zinc-500">
              <div>
                <span>ENTROPY: </span>
                <span className="text-emerald-400 font-mono">99.999%</span>
              </div>
              <div>
                <span>ROTATION: </span>
                <span className="text-sky-400 font-mono">AUTO (60s)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
          <button
            onClick={handleRotateKey}
            className="inline-flex items-center gap-1.5 text-xs text-indigo-300 hover:text-indigo-200 transition-colors font-medium group/btn cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 group-hover/btn:rotate-180 transition-transform duration-500" />
            <span>Derive Next Quantum Key</span>
          </button>

          <span className="text-[11px] font-mono text-zinc-500">
            MPC SHARD: 4/4
          </span>
        </div>
      </div>
    </BorderGlow>
  );
};
