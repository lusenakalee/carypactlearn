"use client";

import { AFFILIATE_CONFIG } from "@/config/constants";
import { LEARN_MODULES } from "@/config/content";
import {
  BookOpen,
  Coins,
  Cpu,
  ExternalLink,
  Layers,
  ShieldCheck,
  TrendingUp
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function LearnSection() {
  const [activeModuleId, setActiveModuleId] = useState<string>("ai-computing");
  const activeModuleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeModuleRef.current) {
      activeModuleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeModuleId]);

  const activeModule = LEARN_MODULES.find((m) => m.id === activeModuleId) || LEARN_MODULES[0];

  const getModuleIcon = (id: string) => {
    switch (id) {
      case "blockchain": return Layers;
      case "ai-computing": return Cpu;
      case "tokenomics": return Coins;
      case "defi": return TrendingUp;
      case "web3": return ShieldCheck;
      default: return BookOpen;
    }
  };

  return (
    <section id="learn" className="py-14 sm:py-20 relative overflow-hidden bg-[#0A0C14] border-t border-[#1E243B]">
      {/* Radiant Glows */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#A855F7]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#A855F7]">
            <Layers className="w-3.5 h-3.5" />
            <span>Foundational Web3 & Computing Literacy</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Learn <span className="text-brand-gradient">Web3 & AI Supercomputing</span>
          </h2>
          <p className="text-sm sm:text-base text-[#C4CBD8]">
            Demystifying blockchain consensus, decentralized hardware clustering, tokenomics math, and non-custodial cryptographic safety.
          </p>
        </div>

        {/* 5 Module Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8">
          {LEARN_MODULES.map((mod) => {
            const IconComp = getModuleIcon(mod.id);
            const isSelected = activeModuleId === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                id={`learn-tab-${mod.id}`}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#131728] border-[#22D3FF] shadow-lg shadow-[#22D3FF]/10 ring-1 ring-[#22D3FF]"
                    : "bg-[#0E1020] border-[#1E243B] hover:bg-[#131728] hover:border-[#2A314D]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                    isSelected ? "bg-[#22D3FF] text-black" : "bg-[#1C1F2E] text-[#22D3FF]"
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-[#838E9E] font-bold">{mod.readTime}</span>
                </div>
                <div>
                  <h3 className={`text-xs sm:text-sm font-bold line-clamp-1 ${isSelected ? "text-white" : "text-[#C4CBD8]"}`}>
                    {mod.title}
                  </h3>
                  <p className="text-[10px] text-[#838E9E] mt-0.5">{mod.category}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Module Reading Card */}
        <div ref={activeModuleRef} className="bg-[#0E1020] border border-[#1E243B] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="border-b border-[#1E243B] pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1F2E] text-[10px] font-bold uppercase tracking-wider text-[#A855F7] mb-2">
              <span>{activeModule.category}</span>
              <span>•</span>
              <span>{activeModule.readTime}</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white">{activeModule.title}</h3>
            <p className="text-sm text-[#C4CBD8] mt-2 leading-relaxed">{activeModule.summary}</p>
          </div>

          {/* Educational Sections */}
          <div className="space-y-6">
            {activeModule.sections.map((sec, idx) => (
              <div key={idx} className="bg-[#131728] border border-[#1E243B] rounded-2xl p-5 sm:p-6 space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-[#22D3FF]/10 border border-[#22D3FF]/30 text-[#22D3FF] font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white">{sec.heading}</h4>
                </div>
                <p className="text-xs sm:text-sm text-[#C4CBD8] leading-relaxed whitespace-pre-line pl-8">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Module Action CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1E243B]">
            <div className="text-xs text-[#838E9E]">
              Next Step: Test your knowledge on the live BOT Chain testnet or explore real-time metrics.
            </div>
            <a
              href={AFFILIATE_CONFIG.APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#7B4FFF]/25 transition-all"
            >
              <span>Explore CaryPact DApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}