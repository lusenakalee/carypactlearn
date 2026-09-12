"use client";

import React, { useState } from "react";
import { 
  Coins, 
  Flame, 
  PieChart, 
  TrendingDown, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Info,
  Clock
} from "lucide-react";
import { EMISSION_SPLIT, ECOSYSTEM_METRICS } from "@/config/constants";

export default function TokenomicsVisualizer() {
  const [selectedSplit, setSelectedSplit] = useState(EMISSION_SPLIT[0]);

  // Biennial Halving Schedule data points
  const emissionSchedule = [
    { year: "Years 1–2", dailyCA: 40000, annualCA: "14.60M CA", percentOfGenesis: "100%" },
    { year: "Years 3–4", dailyCA: 36000, annualCA: "13.14M CA", percentOfGenesis: "90% (-10%)" },
    { year: "Years 5–6", dailyCA: 32400, annualCA: "11.82M CA", percentOfGenesis: "81% (-10%)" },
    { year: "Years 7–8", dailyCA: 29160, annualCA: "10.64M CA", percentOfGenesis: "72.9% (-10%)" },
    { year: "Years 9–22", dailyCA: "Decreasing", annualCA: "Remaining emissions", percentOfGenesis: "Final Halving" },
  ];

  return (
    <section id="ca-token" className="py-14 sm:py-20 relative overflow-hidden bg-[#0E1020] border-t border-[#1E243B]">
      {/* Ambient Accent Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#7B4FFF]/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#A855F7]">
            <Coins className="w-3.5 h-3.5" />
            <span>Economic Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            CA Tokenomics: <span className="text-brand-gradient">210M Fixed Supply</span>
          </h2>
          <p className="text-sm sm:text-base text-[#C4CBD8]">
            A mathematically defined disinflationary curve spanning 22 years, pairing daily algorithmic emissions with aggressive triple-burn sinks.
          </p>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-5 relative overflow-hidden">
            <div className="text-xs uppercase font-bold text-[#838E9E] tracking-wider">Hard Cap Maximum Supply</div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">210,000,000 CA</div>
            <p className="text-xs text-[#C4CBD8] mt-2">
              <strong className="text-[#22D3FF]">10M CA</strong> for initial SWAP liquidity + <strong className="text-[#A855F7]">200M CA</strong> emitted over 22 years.
            </p>
          </div>

          <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-5 relative overflow-hidden">
            <div className="text-xs uppercase font-bold text-[#838E9E] tracking-wider">Initial Daily Emission</div>
            <div className="text-2xl sm:text-3xl font-black text-[#22D3FF] mt-1">40,000 CA / Day</div>
            <p className="text-xs text-[#C4CBD8] mt-2">
              Reduced by <strong className="text-amber-300">10% every 2 years</strong> across the entire 22-year distribution cycle.
            </p>
          </div>

          <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-5 relative overflow-hidden">
            <div className="text-xs uppercase font-bold text-[#838E9E] tracking-wider">Triple Deflationary Burn</div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">Multi-Tier Burn</div>
            <p className="text-xs text-[#C4CBD8] mt-2">
              1.8% BDEX sell burn + 1.1% transaction fee buyback + 1.5% BOT gas destruction.
            </p>
          </div>
        </div>

        {/* Two-Column Emission Distribution Interactive Visualizer */}
        <div className="bg-[#0A0C14] border border-[#1E243B] rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-[#1E243B]">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">Daily 40,000 CA Emission Allocation</h3>
              <p className="text-xs text-[#838E9E]">Click any segment below to inspect on-chain distribution mechanics</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs text-[#22D3FF] font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>T+1 Daily Settlement (00:00 UTC)</span>
            </span>
          </div>

          {/* Distribution Progress Bar */}
          <div className="pt-6">
            <div className="h-6 w-full rounded-xl overflow-hidden flex bg-[#131728] p-0.5 border border-[#1E243B]">
              {EMISSION_SPLIT.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSplit(item)}
                  style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  className="h-full transition-all hover:opacity-90 cursor-pointer first:rounded-l-lg last:rounded-r-lg relative group"
                  title={`${item.name}: ${item.percent}% (${item.dailyCA.toLocaleString()} CA/day)`}
                />
              ))}
            </div>

            {/* Percentage Markers Row */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-4">
              {EMISSION_SPLIT.map((item, idx) => {
                const isSelected = selectedSplit.name === item.name;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedSplit(item)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#131728] border-[#7B4FFF] shadow-lg ring-1 ring-[#7B4FFF]"
                        : "bg-[#0E1020] border-[#1E243B] hover:bg-[#131728]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs font-bold text-white">{item.percent}%</span>
                    </div>
                    <div className="text-xs text-[#C4CBD8] font-medium truncate">{item.name}</div>
                    <div className="text-[10px] text-[#838E9E] mt-0.5">{item.dailyCA.toLocaleString()} CA/day</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Detail Showcase */}
          <div className="mt-6 bg-[#131728] border border-[#1E243B] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedSplit.color }} />
                <h4 className="text-base font-bold text-white">{selectedSplit.name}</h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1C1F2E] text-white font-mono">
                  {selectedSplit.percent}% Pool ({selectedSplit.dailyCA.toLocaleString()} CA/day)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#C4CBD8] leading-relaxed">
                {selectedSplit.description}
              </p>
            </div>
          </div>
        </div>

        {/* 22-Year Halving Curve & Reduction Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-7 bg-[#0A0C14] border border-[#1E243B] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-base font-bold text-white">22-Year 10% Biennial Emission Reduction</h4>
                <p className="text-xs text-[#838E9E]">Programmed algorithmic disinflation schedule</p>
              </div>
              <TrendingDown className="w-5 h-5 text-[#22D3FF]" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#1E243B] text-[#838E9E]">
                    <th className="pb-2 font-semibold">Emission Cycle</th>
                    <th className="pb-2 font-semibold">Daily CA Release</th>
                    <th className="pb-2 font-semibold">Annualized Output</th>
                    <th className="pb-2 font-semibold">Curve Factor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E243B]/60 text-[#C4CBD8]">
                  {emissionSchedule.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#131728]/50">
                      <td className="py-2.5 font-medium text-white">{row.year}</td>
                      <td className="py-2.5 text-[#22D3FF] font-mono">{typeof row.dailyCA === "number" ? `${row.dailyCA.toLocaleString()} CA` : row.dailyCA}</td>
                      <td className="py-2.5">{row.annualCA}</td>
                      <td className="py-2.5 text-amber-300 font-semibold">{row.percentOfGenesis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Burning & Deflationary Mechanics Box */}
          <div className="lg:col-span-5 bg-[#0A0C14] border border-[#1E243B] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <h4 className="text-base font-bold text-white">Automated Deflationary Sinks</h4>
            </div>
            <p className="text-xs text-[#C4CBD8]">
              CaryPact enforces smart contract fee sinks that permanently reduce circulating supply over time:
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B]">
                <div className="flex items-center justify-between text-white font-bold mb-1">
                  <span>1.80% BDEX Sell Burn</span>
                  <span className="text-rose-400">On-Chain Burn</span>
                </div>
                <p className="text-[#838E9E]">Every CA sold on BDEX routes 1.8% to an unrecoverable burn address.</p>
              </div>

              <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B]">
                <div className="flex items-center justify-between text-white font-bold mb-1">
                  <span>1.10% Transaction Fee Buyback</span>
                  <span className="text-amber-400">Liquidity Sink</span>
                </div>
                <p className="text-[#838E9E]">1.10% of transaction fees are converted via AMM into burned CA tokens.</p>
              </div>

              <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B]">
                <div className="flex items-center justify-between text-white font-bold mb-1">
                  <span>1.50% BOT Gas Destruction</span>
                  <span className="text-[#22D3FF]">L1 Base Burn</span>
                </div>
                <p className="text-[#838E9E]">1.50% of all BOT Chain gas fees are destroyed permanently by validators.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
