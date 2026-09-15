"use client";

import React, { useState, useRef } from "react";
import { 
  Users, 
  Crown, 
  ShieldAlert, 
  ChevronRight, 
  Award, 
  TrendingUp, 
  Percent, 
  Sparkles,
  Info,
  ExternalLink
} from "lucide-react";
import { VIP_TIERS, AFFILIATE_CONFIG, VIP_INCOME_DISCLAIMER } from "@/config/constants";

function formatUSDT(value: number) {
  return value.toLocaleString("en-US");
}

export default function VipSystemExplainer() {
  const [selectedTier, setSelectedTier] = useState(VIP_TIERS[0]);
  const deepDiveRef = useRef<HTMLDivElement>(null);

  const handleSelectTier = (item: (typeof VIP_TIERS)[number]) => {
    setSelectedTier(item);
    deepDiveRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="how-carypact-works" className="py-14 sm:py-20 relative overflow-hidden bg-[#0A0C14] border-t border-[#1E243B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#7B4FFF]">
            <Crown className="w-3.5 h-3.5" />
            <span>Active Reward Pool & Referral Structure</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            The 10-Tier VIP <span className="text-brand-gradient">Consensus Framework</span>
          </h2>
          <p className="text-sm sm:text-base text-[#C4CBD8]">
            A 14,000 CA/day Active Reward Pool allocates incentives based on personal hashrate participation and verified community downline performance.
          </p>
        </div>

        {/* Transparent Downline Model Disclosure */}
        <div className="bg-[#0E1020] border border-amber-500/30 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1 text-xs text-[#C4CBD8]">
            <div className="font-bold text-white text-sm">Educational Transparency: Downline Incentive Structure</div>
            <p className="leading-relaxed">
              The VIP reward mechanism functions as a multi-tier referral compensation model requiring personal capital (<strong className="text-white">500 USDT minimum</strong>) and aggregate downline &quot;leg&quot; volume (<strong className="text-white">≥10,000 USDT</strong>). Rewards depend directly on active network recruitment and team volume. These earnings are not passive fixed returns.
            </p>
          </div>
        </div>

        {/* VIP Tier Selector & Table Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Tier Buttons List */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-2 gap-2">
            {VIP_TIERS.map((item) => {
              const isSelected = selectedTier.tier === item.tier;
              return (
                <button
                  key={item.tier}
                  onClick={() => handleSelectTier(item)}
                  id={`vip-tier-btn-${item.tier.toLowerCase()}`}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-[#131728] border-[#7B4FFF] text-white shadow-lg ring-1 ring-[#7B4FFF]"
                      : "bg-[#0E1020] border-[#1E243B] text-[#838E9E] hover:text-white hover:bg-[#131728]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                      isSelected ? "bg-[#7B4FFF] text-white" : "bg-[#1C1F2E] text-[#22D3FF]"
                    }`}>
                      {item.tier}
                    </span>
                    <span className="text-xs font-bold text-white">
                      {formatUSDT(item.dailyIncomeMin)}-{formatUSDT(item.dailyIncomeMax)} USDT/DAY
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Selected Tier Deep-Dive Card */}
          <div ref={deepDiveRef} className="lg:col-span-8 bg-[#0E1020] border border-[#1E243B] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#1E243B]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7B4FFF] to-[#A855F7] text-white font-black text-lg flex items-center justify-center shadow-lg shadow-[#7B4FFF]/25">
                  {selectedTier.tier}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">VIP Consensus Level {selectedTier.tier}</h3>
                  <p className="text-xs text-[#22D3FF]">
                    Active Performance Tier ({formatUSDT(selectedTier.dailyIncomeMin)}-{formatUSDT(selectedTier.dailyIncomeMax)} USDT/DAY)
                  </p>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {formatUSDT(selectedTier.monthlyIncomeMin)}-{formatUSDT(selectedTier.monthlyIncomeMax)} USDT/MONTH
                </span>
              </div>
            </div>

            {/* Requirements Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="bg-[#131728] border border-[#1E243B] p-4 rounded-2xl">
                <div className="text-[11px] uppercase font-bold text-[#838E9E]">Personal Investment</div>
                <div className="text-xl font-extrabold text-white mt-1">{formatUSDT(selectedTier.personalUSDT)} USDT</div>
                <div className="text-[11px] text-[#838E9E] mt-0.5">Minimum personal hashrate activation</div>
              </div>

              <div className="bg-[#131728] border border-[#1E243B] p-4 rounded-2xl">
                <div className="text-[11px] uppercase font-bold text-[#838E9E]">Community Performance</div>
                <div className="text-xl font-extrabold text-[#22D3FF] mt-1">
                  {formatUSDT(selectedTier.legUSDT)} USDT
                </div>
                <div className="text-[11px] text-[#838E9E] mt-0.5">Cumulative downline team volume</div>
              </div>
            </div>

            {/* Income Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-[#131728] border border-[#1E243B] p-4 rounded-2xl">
                <div className="text-[11px] uppercase font-bold text-[#838E9E]">Daily Income (Range)</div>
                <div className="text-xl font-extrabold text-emerald-400 mt-1">
                  {formatUSDT(selectedTier.dailyIncomeMin)} - {formatUSDT(selectedTier.dailyIncomeMax)} USDT
                </div>
                <div className="text-[11px] text-[#838E9E] mt-0.5">Per day</div>
              </div>

              <div className="bg-[#131728] border border-[#1E243B] p-4 rounded-2xl">
                <div className="text-[11px] uppercase font-bold text-[#838E9E]">Monthly Income (30 Days Range)</div>
                <div className="text-xl font-extrabold text-emerald-400 mt-1">
                  {formatUSDT(selectedTier.monthlyIncomeMin)} - {formatUSDT(selectedTier.monthlyIncomeMax)} USDT
                </div>
                <div className="text-[11px] text-[#838E9E] mt-0.5">Per month</div>
              </div>
            </div>

            {/* Tier Benefits */}
            <div className="bg-[#131728] border border-[#1E243B] p-4 rounded-2xl space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#838E9E]">Important Notice</div>
              <div className="flex items-start gap-2 text-sm text-white">
                <Award className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{VIP_INCOME_DISCLAIMER}</span>
              </div>
              <div className="text-xs text-[#838E9E] pt-1">
                Settled daily at 00:00 UTC from the 14,000 CA/day Active Reward Pool.
              </div>
            </div>

            {/* Register CTA */}
            <div className="pt-6">
              <a
                href={AFFILIATE_CONFIG.APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#7B4FFF]/25 transition-all"
              >
                <span>Track Your VIP Status in CaryPact</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}