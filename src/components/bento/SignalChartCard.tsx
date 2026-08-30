import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Activity } from 'lucide-react';
import { BorderGlow } from '../ui/BorderGlow';

const chartData = [
  { time: '00:00', confidence: 99.82, anomalies: 0 },
  { time: '03:00', confidence: 99.89, anomalies: 0 },
  { time: '06:00', confidence: 99.94, anomalies: 1 },
  { time: '09:00', confidence: 99.91, anomalies: 0 },
  { time: '12:00', confidence: 99.97, anomalies: 0 },
  { time: '15:00', confidence: 99.93, anomalies: 0 },
  { time: '18:00', confidence: 99.98, anomalies: 0 },
  { time: '21:00', confidence: 99.99, anomalies: 0 },
];

export const SignalChartCard: React.FC = () => {
  const [activeRange, setActiveRange] = useState<'24h' | '7d'>('24h');

  return (
    <BorderGlow
      edgeSensitivity={30}
      glowColor="195 90 70"
      backgroundColor="#0d0d14"
      borderRadius={20}
      glowRadius={40}
      glowIntensity={1.2}
      coneSpread={28}
      animated={false}
      colors={['#38bdf8', '#818cf8', '#34d399']}
      fillOpacity={0.4}
      className="h-full group"
    >
      <div className="p-6 sm:p-8 flex flex-col justify-between h-full">
        <div>
          {/* Header Tag */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white tracking-tight">
                  Signal Confidence Matrix
                </h3>
                <p className="text-xs text-zinc-400">Continuous Attestation Waveform</p>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-zinc-950/60 p-1 rounded-lg border border-white/5 text-[11px] font-mono">
              <button
                onClick={() => setActiveRange('24h')}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${activeRange === '24h' ? 'bg-indigo-600 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                24H
              </button>
              <button
                onClick={() => setActiveRange('7d')}
                className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${activeRange === '7d' ? 'bg-indigo-600 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'}`}
              >
                7D
              </button>
            </div>
          </div>

          {/* Live Metric Banner */}
          <div className="flex items-baseline justify-between mb-4">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-3xl sm:text-4xl font-semibold text-white tracking-tight">
                99.98%
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                +0.04% Stability
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500">4,096 Active Probes</span>
          </div>

          {/* Recharts Glowing Vector Waveform */}
          <div className="h-44 sm:h-48 w-full relative mt-2">
            {/* Pulsing Beacon Indicator overlay on current peak point */}
            <div className="absolute right-4 top-4 z-20 pointer-events-none flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-sky-400 animate-ping absolute" />
              <div className="w-2.5 h-2.5 rounded-full bg-sky-300 shadow-[0_0_12px_#38bdf8] relative" />
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="signalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.4} />
                    <stop offset="60%" stopColor="#6366f1" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                <XAxis
                  dataKey="time"
                  stroke="#52525b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  fontFamily="JetBrains Mono"
                />
                <YAxis
                  domain={[99.7, 100]}
                  stroke="#52525b"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val}%`}
                  fontFamily="JetBrains Mono"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(9, 9, 11, 0.95)',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.8)',
                  }}
                  itemStyle={{ color: '#7dd3fc' }}
                  labelStyle={{ color: '#a1a1aa' }}
                />
                <Area
                  type="monotone"
                  dataKey="confidence"
                  stroke="#38bdf8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#signalGradient)"
                  filter="url(#glowFilter)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Footer Metrics */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] grid grid-cols-2 gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">P99 Drift:</span>
            <span className="text-emerald-400 font-medium">0.0018%</span>
          </div>
          <div className="flex items-center gap-2 justify-end">
            <span className="text-zinc-500">Heuristic:</span>
            <span className="text-indigo-300 font-medium">Equilibrium</span>
          </div>
        </div>
      </div>
    </BorderGlow>
  );
};
