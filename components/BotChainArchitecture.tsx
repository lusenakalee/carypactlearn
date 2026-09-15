"use client";

import React, { useRef, useState } from "react";
import { 
  Cpu, 
  Search, 
  ArrowLeftRight, 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  Coins,
  Globe2,
  Building2,
  Lock
} from "lucide-react";
import { BOT_CHAIN_INFRASTRUCTURE, ECOSYSTEM_METRICS, AFFILIATE_CONFIG } from "@/config/constants";

export default function BotChainArchitecture() {
  const [activeTab, setActiveTab] = useState("mainnet");
  const detailCardRef = useRef<HTMLDivElement | null>(null);

  const activeInfra = BOT_CHAIN_INFRASTRUCTURE.find((item) => item.id === activeTab) || BOT_CHAIN_INFRASTRUCTURE[0];

  const handleTabSelect = (id: string) => {
    setActiveTab(id);
    detailCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getIcon = (name: string) => {
    switch (name) {
      case "Cpu": return Cpu;
      case "Search": return Search;
      case "ArrowLeftRight": return ArrowLeftRight;
      case "Wallet": return Wallet;
      case "TrendingUp": return TrendingUp;
      default: return Layers;
    }
  };

  return (
    <section id="bot-chain" className="py-14 sm:py-20 relative overflow-hidden bg-[#0A0C14] border-t border-[#1E243B]">
      {/* Radiant Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#22D3FF]/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#A855F7]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#22D3FF]">
            <Cpu className="w-3.5 h-3.5" />
            <span>Underlying Public Chain</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            BOT Chain <span className="text-brand-gradient">5 Core Infrastructures</span>
          </h2>
          <p className="text-sm sm:text-base text-[#C4CBD8]">
            The dedicated Layer 1 architecture engineered for decentralized AI agent identity, supercomputing coordination, and high-liquidity financial settlement.
          </p>
        </div>

        {/* 5-Pillar Interactive Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
          {BOT_CHAIN_INFRASTRUCTURE.map((item) => {
            const IconComponent = getIcon(item.icon);
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabSelect(item.id)}
                id={`bot-chain-tab-${item.id}`}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#131728] border-[#7B4FFF] shadow-xl shadow-[#7B4FFF]/15 ring-1 ring-[#7B4FFF]"
                    : "bg-[#0E1020] border-[#1E243B] hover:bg-[#131728] hover:border-[#2A314D]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isSelected ? "bg-[#7B4FFF] text-white" : "bg-[#1C1F2E] text-[#22D3FF]"
                  }`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#838E9E]">0{BOT_CHAIN_INFRASTRUCTURE.indexOf(item) + 1}</span>
                </div>
                <div>
                  <h3 className={`text-xs sm:text-sm font-bold ${isSelected ? "text-white" : "text-[#C4CBD8]"}`}>
                    {item.title}
                  </h3>
                  <p className="text-[10px] text-[#838E9E] truncate mt-0.5">{item.category}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Infrastructure Detail Card */}
        <div ref={detailCardRef} className="bg-[#0E1020] border border-[#1E243B] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Description Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1F2E] border border-[#2A314D] text-xs font-semibold text-[#A855F7]">
                <span>{activeInfra.category}</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white">
                {activeInfra.title}
              </h3>
              <p className="text-sm sm:text-base font-medium text-[#22D3FF]">
                {activeInfra.tagline}
              </p>
              <p className="text-sm text-[#C4CBD8] leading-relaxed">
                {activeInfra.details}
              </p>

              {/* Key Highlights Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {activeInfra.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-white bg-[#131728] p-2.5 rounded-xl border border-[#1E243B]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Architecture Spec Box */}
            <div className="lg:col-span-5 bg-[#131728] border border-[#1E243B] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1E243B] pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#838E9E]">On-Chain Specs</span>
                <span className="text-xs font-mono text-[#22D3FF]">Status: Active Mainnet</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-[#1E243B]/60">
                  <span className="text-[#838E9E]">Native AI Agent Identity</span>
                  <span className="font-semibold text-white">W3C / DID Standard</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-[#1E243B]/60">
                  <span className="text-[#838E9E]">Gas Burning Engine</span>
                  <span className="font-semibold text-amber-400">1.50% Destroyed per tx</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-[#1E243B]/60">
                  <span className="text-[#838E9E]">Seed Round Funding</span>
                  <span className="font-semibold text-emerald-400">$15M (NIX / Alpha / Gemhead)</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[#838E9E]">Exchange Roadmap</span>
                  <span className="font-semibold text-white">OKX, Bybit, KuCoin, MEXC, Bitget</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={AFFILIATE_CONFIG.BOT_CHAIN_LEARN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#1C1F2E] hover:bg-[#7B4FFF] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#2A314D] transition-colors"
                >
                  <span>Explore Official BOT Chain Docs</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Global Scale Highlights Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-[#0E1020] border border-[#1E243B] rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#22D3FF]/10 text-[#22D3FF] flex items-center justify-center flex-shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#838E9E]">Global Consensus Presence</div>
              <div className="text-base font-bold text-white">55+ Countries • 15 Languages</div>
              <div className="text-[11px] text-[#22D3FF]">Hong Kong Global Summit (4,000+ attendees)</div>
            </div>
          </div>

          <div className="bg-[#0E1020] border border-[#1E243B] rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#A855F7]/10 text-[#A855F7] flex items-center justify-center flex-shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#838E9E]">Physical Operational Footprint</div>
              <div className="text-base font-bold text-white">1,500 Offices Worldwide</div>
              <div className="text-[11px] text-[#A855F7]">1,300 Studios + 200 Operation Centers</div>
            </div>
          </div>

          <div className="bg-[#0E1020] border border-[#1E243B] rounded-2xl p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#7B4FFF]/10 text-[#7B4FFF] flex items-center justify-center flex-shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-[#838E9E]">Institutional Capitalization</div>
              <div className="text-base font-bold text-white">$15M Seed + $50M Strategic</div>
              <div className="text-[11px] text-[#7B4FFF]">Tier-1 CEX Listings Scheduled</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}