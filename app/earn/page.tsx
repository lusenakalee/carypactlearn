"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Zap, 
  Coins, 
  Server, 
  Cpu, 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  Download, 
  Bot, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Lock, 
  Unlock,
  AlertTriangle, 
  Calculator, 
  HelpCircle,
  Layers,
  ArrowRight,
  Database,
  Flame,
  Activity,
  Sliders
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AffiliateDisclaimerBanner from "@/components/AffiliateDisclaimerBanner";
import AiAssistantModal from "@/components/AiAssistantModal";
import PdfCheatSheetModal from "@/components/PdfCheatSheetModal";
import NewsletterModal from "@/components/NewsletterModal";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import { useAppLocale } from "@/components/LocaleProvider";
import { AFFILIATE_CONFIG, ECOSYSTEM_METRICS } from "@/config/constants";

export default function EarnPage() {
  const { locale, setLocale } = useAppLocale();
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiInitialQuestion, setAiInitialQuestion] = useState("");
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoGuideSlug, setVideoGuideSlug] = useState("buy-computing-power");

  // Hashrate Calculator State
  const [hashrateUsdt, setHashrateUsdt] = useState<number>(1000);
  const [simulatedCaPrice, setSimulatedCaPrice] = useState<number>(ECOSYSTEM_METRICS.CA_BASE_PRICE);

  // PoS Calculator State
  const [posCaAmount, setPosCaAmount] = useState<number>(500);
  const [posDays, setPosDays] = useState<number>(180);

  // Auto-scroll to anchor if present in URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        const el = document.querySelector(hash);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    }
  }, []);

  // Hashrate calculations
  // 1 USDT = 1 Unit. 16,800 CA daily pool. Estimated daily rate ~0.45% - 0.70% of hashrate in CA value
  const estimatedDailyCa = (hashrateUsdt * 0.0055) / (simulatedCaPrice / 2.74);
  const estimatedMonthlyCa = estimatedDailyCa * 30;
  const estimatedYearlyCa = estimatedDailyCa * 365;
  const estimatedDailyUsd = estimatedDailyCa * simulatedCaPrice;
  const estimatedMonthlyUsd = estimatedMonthlyCa * simulatedCaPrice;

  // PoS calculations
  // Multipliers: 30d -> 1.0x (~20% APY base), 90d -> 1.5x (~35% APY), 180d -> 2.0x (~55% APY), 360d -> 3.0x (~95% APY)
  const getMultiplier = (days: number) => {
    if (days >= 360) return 3.0;
    if (days >= 180) return 2.0;
    if (days >= 90) return 1.5;
    return 1.0;
  };

  const getBaseApy = (days: number) => {
    if (days >= 360) return 0.95;
    if (days >= 180) return 0.55;
    if (days >= 90) return 0.35;
    return 0.20;
  };

  const currentMultiplier = getMultiplier(posDays);
  const currentApy = getBaseApy(posDays);
  const posDailyRewardCa = (posCaAmount * (currentApy / 365));
  const posTotalPeriodRewardCa = posDailyRewardCa * posDays;
  const posTotalMaturityCa = posCaAmount + posTotalPeriodRewardCa;

  const handleAskAi = (question: string) => {
    setAiInitialQuestion(question);
    setAiModalOpen(true);
  };

  const handleOpenVideo = (slug?: string) => {
    setVideoGuideSlug(slug || "buy-computing-power");
    setVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0C14] text-[#C4CBD8] flex flex-col font-sans selection:bg-[#22D3FF]/20 selection:text-[#22D3FF]">
   

      <main className="flex-grow">
        {/* Page Hero Header */}
        <section className="relative py-14 sm:py-20 bg-gradient-to-b from-[#0F1428] via-[#0D1020] to-[#0A0C14] border-b border-[#1E2540] overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid opacity-25 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#22D3FF]/10 blur-[130px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#8EA2C6] mb-6">
              <Link 
                href="/#home" 
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span>/</span>
              <span className="text-[#22D3FF]">Earning Guide</span>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#22D3FF] mb-4 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CaryPact & BOT Chain Monetization Blueprint</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                  The Four Official Ways to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3FF] via-[#7B4FFF] to-[#A855F7]">Earn on CaryPact</span>
                </h1>
                <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                  Direct, verifiable technical data and mathematical breakdown for all 4 earning mechanisms: permanent CA hashrate, long-term PoS mining, enterprise mining server presales, and Layer 1 BOT hashrate mining.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
                <button
                  onClick={() => setPdfModalOpen(true)}
                  id="earn-download-pdf-btn"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#141A2E] hover:bg-[#1C243E] text-[#22D3FF] text-xs font-bold uppercase tracking-wider border border-[#232F4E] transition-all cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Cheat Sheet (PDF)</span>
                </button>
                {/* <button
                  onClick={() => handleAskAi("Explain the mathematical difference between CA Hashrate and PoS Staking on CaryPact.")}
                  id="earn-ask-ai-btn"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#22D3FF] hover:bg-[#1bb8df] text-[#070913] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#22D3FF]/20"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ask AI Copilot</span>
                </button> */}
              </div>
            </div>

            {/* Quick Anchor Navigation */}
            <div className="mt-10 pt-6 border-t border-[#1C2542] grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a 
                href="#ca-hashrate" 
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#101428] hover:bg-[#161C36] border border-[#1E2746] transition-all group"
              >
                <Zap className="w-4 h-4 text-[#22D3FF] group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] font-mono text-[#8EA2C6]">Method 1</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#22D3FF] transition-colors">CA Hashrate</div>
                </div>
              </a>

              <a 
                href="#pos-mining" 
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#101428] hover:bg-[#161C36] border border-[#1E2746] transition-all group"
              >
                <Coins className="w-4 h-4 text-[#A855F7] group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] font-mono text-[#8EA2C6]">Method 2</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#A855F7] transition-colors">PoS Staking</div>
                </div>
              </a>

              <a 
                href="#mining-servers" 
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#101428] hover:bg-[#161C36] border border-[#1E2746] transition-all group"
              >
                <Server className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] font-mono text-[#8EA2C6]">Method 3</div>
                  <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">Mining Servers</div>
                </div>
              </a>

              <a 
                href="#bot-hashrate" 
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#101428] hover:bg-[#161C36] border border-[#1E2746] transition-all group"
              >
                <Cpu className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] font-mono text-[#8EA2C6]">Method 4</div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">BOT Hashrate</div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* METHOD 1: CA HASHRATE / BUYING COMPUTING POWER */}
        <section id="ca-hashrate" className="py-16 sm:py-20 bg-[#090C17] border-b border-[#1C233B] scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-[#22D3FF]/10 text-[#22D3FF] border border-[#22D3FF]/30">
                METHOD 01
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8EA2C6]">
                Official Page: app.carypact.com/purchaseHashrate
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  <span>CA Hashrate & Computing Power Acquisition</span>
                  <Zap className="w-7 h-7 text-[#22D3FF]" />
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] mt-2 max-w-3xl">
                  Acquire tokenized GPU/CPU computing power units to participate in the 16,800 CA daily mining pool with automated daily dividends.
                </p>
              </div>

              {/* Verified CTA Button */}
              <a
                href={AFFILIATE_CONFIG.PURCHASE_HASHRATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-buy-ca-hashrate-page"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#22D3FF] to-[#0EA5E9] hover:from-[#38BDF8] hover:to-[#0284C7] text-[#070913] font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#22D3FF]/25 cursor-pointer shrink-0"
              >
                <span>Buy CA Hashrate (DApp)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* 3-Column Breakdown: What It Is, How It Earns, Key Rates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {/* Card 1: What is CA Hashrate */}
              <div className="rounded-2xl bg-[#101426] border border-[#1E2746] p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#161D36] border border-[#253054] flex items-center justify-center text-[#22D3FF]">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">What is CA Hashrate?</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  In CaryPact, <strong>Hashrate</strong> represents a standardized unit of AI computing capacity (tensor cores, GPU memory bandwidth, CPU threads) pledged to the decentralized network.
                </p>
                <div className="p-3 rounded-xl bg-[#0B0E1C] border border-[#171E36] text-xs font-mono text-[#CBD5E1]">
                  <div>• Standard: <strong className="text-[#22D3FF]">1 USDT = 1 Hashrate Unit</strong></div>
                  <div>• Minimum: <strong className="text-white">100 USDT</strong> (100 Units)</div>
                  <div>• Supported: USDT on BOT, BSC, ETH</div>
                </div>
              </div>

              {/* Card 2: How It Earns You Money */}
              <div className="rounded-2xl bg-[#101426] border border-[#1E2746] p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#161D36] border border-[#253054] flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">How You Earn Money</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Every 24 hours at <strong>00:00 UTC</strong>, the smart contract takes a snapshot of all active global hashrate and distributes the <strong>16,800 CA daily mining pool</strong> (42% of total 40k CA emission) proportionally to your hashrate weight.
                </p>
                <div className="p-3 rounded-xl bg-[#0B0E1C] border border-[#171E36] text-xs font-mono text-[#CBD5E1]">
                  <div>• Compounding factor: <strong className="text-emerald-400">K ≈ 1.01</strong></div>
                  <div>• Daily Pool: <strong className="text-white">16,800 CA / day</strong></div>
                  <div>• Settlement: Auto-credit to DApp wallet</div>
                </div>
              </div>

              {/* Card 3: Rates & Lockup Terms */}
              <div className="rounded-2xl bg-[#101426] border border-[#1E2746] p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#161D36] border border-[#253054] flex items-center justify-center text-amber-400">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Rates & Capital Terms</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Estimated daily yields range between <strong>0.35% – 0.75%+</strong> in CA value depending on the total network hashrate and current token valuation.
                </p>
                <div className="p-3 rounded-xl bg-[#1E1610] border border-[#452814] text-xs text-amber-300">
                  <strong>Critical Capital Rule:</strong> Hashrate purchases represent permanent infrastructure deployment. Capital cannot be refunded; yields are recouped entirely through daily CA mining output.
                </div>
              </div>
            </div>

            {/* Interactive Hashrate Live Estimator */}
            <div className="rounded-3xl bg-gradient-to-r from-[#11162C] via-[#141A35] to-[#11162C] border border-[#232E52] p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-[#22D3FF]/10 text-[#22D3FF]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    CA Hashrate Yield Calculator
                  </h3>
                  <p className="text-xs text-[#8EA2C6]">
                    Simulate your daily, monthly, and annualized CA generation based on your USDT deposit.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Inputs */}
                <div className="lg:col-span-6 space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-[#8EA2C6]">Purchase Amount (USDT):</span>
                      <span className="text-white font-bold">{hashrateUsdt.toLocaleString()} USDT ({hashrateUsdt} Units)</span>
                    </div>
                    <input 
                      type="range"
                      min={100}
                      max={20000}
                      step={100}
                      value={hashrateUsdt}
                      onChange={(e) => setHashrateUsdt(Number(e.target.value))}
                      className="w-full h-2 bg-[#1C2542] rounded-lg appearance-none cursor-pointer accent-[#22D3FF]"
                    />
                    <div className="flex justify-between text-[10px] text-[#6B7C9D] mt-1 font-mono">
                      <span>100U (Min)</span>
                      <span>1,000U</span>
                      <span>5,000U</span>
                      <span>10,000U</span>
                      <span>20,000U (Whale)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-[#8EA2C6]">Simulated CA Market Price:</span>
                      <span className="text-[#22D3FF] font-bold">${simulatedCaPrice.toFixed(4)} USD</span>
                    </div>
                    <input 
                      type="range"
                      min={1.0}
                      max={10.0}
                      step={0.1}
                      value={simulatedCaPrice}
                      onChange={(e) => setSimulatedCaPrice(Number(e.target.value))}
                      className="w-full h-2 bg-[#1C2542] rounded-lg appearance-none cursor-pointer accent-[#7B4FFF]"
                    />
                    <div className="flex justify-between text-[10px] text-[#6B7C9D] mt-1 font-mono">
                      <span>$1.00</span>
                      <span>$2.74 (Current)</span>
                      <span>$5.00</span>
                      <span>$10.00</span>
                    </div>
                  </div>
                </div>

                {/* Outputs Display */}
                <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#0B0E1D] p-5 rounded-2xl border border-[#1B233D]">
                  <div className="p-3 rounded-xl bg-[#11162C]">
                    <div className="text-[11px] text-[#8EA2C6]">Est. Daily CA</div>
                    <div className="text-lg font-bold text-white mt-0.5">{estimatedDailyCa.toFixed(2)} CA</div>
                    <div className="text-[10px] text-emerald-400 font-mono">≈ ${estimatedDailyUsd.toFixed(2)} / day</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#11162C]">
                    <div className="text-[11px] text-[#8EA2C6]">Est. Monthly CA (30d)</div>
                    <div className="text-lg font-bold text-[#22D3FF] mt-0.5">{estimatedMonthlyCa.toFixed(1)} CA</div>
                    <div className="text-[10px] text-emerald-400 font-mono">≈ ${estimatedMonthlyUsd.toFixed(2)} / mo</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#11162C] col-span-2 sm:col-span-1">
                    <div className="text-[11px] text-[#8EA2C6]">Est. Annual CA (365d)</div>
                    <div className="text-lg font-bold text-[#A855F7] mt-0.5">{estimatedYearlyCa.toFixed(0)} CA</div>
                    <div className="text-[10px] text-emerald-400 font-mono">≈ ${(estimatedYearlyCa * simulatedCaPrice).toFixed(2)} / yr</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METHOD 2: CA LONG-TERM STAKING / PROTOCOL POS MINING */}
        <section id="pos-mining" className="py-16 sm:py-20 bg-[#0A0C16] border-b border-[#1C233B] scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-[#A855F7]/10 text-[#A855F7] border border-[#A855F7]/30">
                METHOD 02
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8EA2C6]">
                Official Page: app.carypact.com/posMining
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  <span>CA Long-Term Staking & Protocol PoS Mining</span>
                  <Coins className="w-7 h-7 text-[#A855F7]" />
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] mt-2 max-w-3xl">
                  Deposit your CA tokens into Proof-of-Stake contracts with 30-day to 360-day multipliers (1.0x – 3.0x) and 100% principal return at maturity.
                </p>
              </div>

              {/* Verified CTA Button */}
              <a
                href={AFFILIATE_CONFIG.POS_MINING_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-pos-mining-page"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#7B4FFF] hover:from-[#B568F8] hover:to-[#6C3FEF] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#A855F7]/25 cursor-pointer shrink-0"
              >
                <span>Start PoS Mining (DApp)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Staking Multipliers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { days: 30, multiplier: "1.0x", estApy: "~18% – 24%", highlight: false, desc: "Flexible short lockup for testing mechanics" },
                { days: 90, multiplier: "1.5x", estApy: "~32% – 42%", highlight: false, desc: "Quarterly commitment with 50% reward boost" },
                { days: 180, multiplier: "2.0x", estApy: "~50% – 68%", highlight: true, desc: "Optimal balance between yield and liquidity" },
                { days: 360, multiplier: "3.0x", estApy: "~85% – 110%+", highlight: false, desc: "Maximum long-term compounding tier" },
              ].map((tier) => (
                <div 
                  key={tier.days}
                  className={`rounded-2xl p-5 border ${tier.highlight ? 'bg-[#15122B] border-[#7B4FFF] shadow-lg shadow-[#7B4FFF]/20' : 'bg-[#101324] border-[#1E2540]'} space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#8EA2C6]">{tier.days} Days Lock</span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30">
                      {tier.multiplier} Weight
                    </span>
                  </div>
                  <div className="text-2xl font-black text-white">{tier.estApy}</div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{tier.desc}</p>
                  <div className="pt-2 border-t border-[#1F2644] flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <Unlock className="w-3.5 h-3.5" />
                    <span>Principal 100% unlocked at {tier.days}d</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mechanics & PoS Calculator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Mechanics Explanation */}
              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-2xl bg-[#101426] border border-[#1E2746] p-6 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#A855F7]" />
                    <span>How Protocol PoS Mining Works</span>
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    <p>
                      <strong className="text-white">18% Dedicated Allocation:</strong> 7,200 CA out of the 40,000 daily CA emission is strictly allocated to the PoS Staking contract.
                    </p>
                    <p>
                      <strong className="text-white">Time-Weight Advantage:</strong> Depositing for 360 days applies a 3.0x multiplier to your share calculation, granting three times more daily CA yield per token deposited than a 30-day deposit.
                    </p>
                    <p>
                      <strong className="text-white">Principal Safety:</strong> Unlike CA hashrate (which is a permanent hardware expenditure), PoS staking retains your full principal. Once the lockup timer reaches zero, you can withdraw 100% of your initial CA deposit back to your wallet.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Staking Simulator */}
              <div className="lg:col-span-6 rounded-2xl bg-[#11152A] border border-[#232D50] p-6 space-y-5">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Calculator className="w-4 h-4 text-[#A855F7]" />
                  <span>PoS Staking Reward Simulator</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[#8EA2C6]">CA Staking Amount:</span>
                    <span className="text-white font-bold">{posCaAmount} CA (≈ ${(posCaAmount * simulatedCaPrice).toFixed(2)})</span>
                  </div>
                  <input 
                    type="range"
                    min={50}
                    max={5000}
                    step={50}
                    value={posCaAmount}
                    onChange={(e) => setPosCaAmount(Number(e.target.value))}
                    className="w-full h-2 bg-[#1C2542] rounded-lg appearance-none cursor-pointer accent-[#A855F7]"
                  />
                </div>

                <div>
                  <div className="text-xs font-mono text-[#8EA2C6] mb-2">Select Duration:</div>
                  <div className="grid grid-cols-4 gap-2">
                    {[30, 90, 180, 360].map((d) => (
                      <button
                        key={d}
                        onClick={() => setPosDays(d)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${posDays === d ? 'bg-[#7B4FFF] text-white border-[#A855F7]' : 'bg-[#151A31] text-[#94A3B8] border-[#202744] hover:bg-[#1A213D]'}`}
                      >
                        {d}d ({getMultiplier(d)}x)
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0B0E1D] p-4 rounded-xl border border-[#1A213B] grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] text-[#8EA2C6]">Est. Total Profit</div>
                    <div className="text-lg font-bold text-[#A855F7] mt-0.5">+{posTotalPeriodRewardCa.toFixed(1)} CA</div>
                    <div className="text-[10px] text-emerald-400 font-mono">≈ +${(posTotalPeriodRewardCa * simulatedCaPrice).toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#8EA2C6]">Return at Maturity</div>
                    <div className="text-lg font-bold text-white mt-0.5">{posTotalMaturityCa.toFixed(1)} CA</div>
                    <div className="text-[10px] text-[#8EA2C6] font-mono">Principal + Rewards</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METHOD 3: MINING MACHINE / MINING SERVER PRESALE */}
        <section id="mining-servers" className="py-16 sm:py-20 bg-[#090C17] border-b border-[#1C233B] scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/30">
                METHOD 03
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8EA2C6]">
                Official Page: app.carypact.com/mining-introduction
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  <span>Physical Mining Server & Machine Presale</span>
                  <Server className="w-7 h-7 text-amber-400" />
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] mt-2 max-w-3xl">
                  Acquire dedicated physical DePIN AI compute servers deployed in global tier-3 and tier-4 data centers for high-tier block validation and commercial AI task execution revenue.
                </p>
              </div>

              {/* Verified CTA Button */}
              <a
                href={AFFILIATE_CONFIG.MINING_SERVERS_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-mining-servers-page"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#070913] font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-400/20 cursor-pointer shrink-0"
              >
                <span>View Mining Servers (DApp)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Server Specifications & Value Proposition */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              <div className="rounded-2xl bg-[#101426] border border-[#1E2746] p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1D1A10] border border-[#3D3316] flex items-center justify-center text-amber-400">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Dedicated Hardware Custody</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Unlike virtualized cloud hashrate, the server presale delivers verifiable physical machine rights backed by enterprise-grade GPU/CPU clusters with 99.9% uptime and carrier-neutral fiber connections.
                </p>
                <div className="text-[11px] font-mono text-[#CBD5E1] p-3 rounded-xl bg-[#0B0E1D] border border-[#182038]">
                  • On-chain Hardware NFT Certificate<br />
                  • Certified Tier-3/4 Colocation Facilities<br />
                  • Real-time telemetry hash monitoring
                </div>
              </div>

              <div className="rounded-2xl bg-[#101426] border border-[#1E2746] p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1D1A10] border border-[#3D3316] flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Dual Revenue Streams</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Mining machines benefit from two concurrent monetization layers: consensus validation emissions on BOT Chain + real commercial fees paid by AI developers for model training and inference.
                </p>
                <div className="text-[11px] font-mono text-[#CBD5E1] p-3 rounded-xl bg-[#0B0E1D] border border-[#182038]">
                  • L1 Blockchain Block Validation Rewards<br />
                  • Commercial AI Match Execution Fees<br />
                  • Priority access to new ecosystem token drops
                </div>
              </div>

              <div className="rounded-2xl bg-[#101426] border border-[#1E2746] p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1D1A10] border border-[#3D3316] flex items-center justify-center text-[#22D3FF]">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Institutional Node Operator Status</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Participating in the server presale elevates your address to a designated Supercomputing Node, giving you governance voting power and a share of network-wide slippage burn redistributions.
                </p>
                <div className="text-[11px] font-mono text-[#CBD5E1] p-3 rounded-xl bg-[#0B0E1D] border border-[#182038]">
                  • Eligible for 3.2% Node Operator Slippage Pool<br />
                  • DAO Governance Voting Weight<br />
                  • Institutional bulk pricing advantage
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METHOD 4: BOT HASHRATE MINING */}
        <section id="bot-hashrate" className="py-16 sm:py-20 bg-[#0A0C16] border-b border-[#1C233B] scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">
                METHOD 04
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8EA2C6]">
                Official Page: app.carypact.com/purchase-bot-hashrate
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  <span>BOT Hashrate Mining (Native Layer 1)</span>
                  <Cpu className="w-7 h-7 text-emerald-400" />
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] mt-2 max-w-3xl">
                  Mine BOT, the native gas and base consensus currency of BOT Chain. Benefit directly from Layer 1 network transaction activity, gas fee burns, and zero DEX slippage conversion.
                </p>
              </div>

              {/* Verified CTA Button */}
              <a
                href={AFFILIATE_CONFIG.BOT_HASHRATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="cta-bot-hashrate-page"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-[#070913] font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-400/20 cursor-pointer shrink-0"
              >
                <span>Mine BOT Hashrate (DApp)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Comparison: CA Hashrate vs BOT Hashrate */}
            <div className="rounded-3xl bg-[#101428] border border-[#1F2746] p-6 sm:p-8 mb-10">
              <h3 className="text-xl font-bold text-white mb-6">
                Understanding the Dual-Token Mining Dynamics: CA vs. BOT
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CA Token Column */}
                <div className="rounded-2xl bg-[#0C0F1E] border border-[#1A223B] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#22D3FF]">APPLICATION & PROTOCOL LAYER</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#22D3FF]/10 text-[#22D3FF] border border-[#22D3FF]/30">CA Token</span>
                  </div>
                  <h4 className="text-base font-bold text-white">CA Hashrate Mining</h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    CA is the native governance and algorithm execution token of CaryPact. CA hashrate allocates from the 16,800 CA daily pool. 
                  </p>
                  <ul className="text-xs font-mono text-[#CBD5E1] space-y-1.5 pt-2">
                    <li>• Reward Asset: <strong className="text-[#22D3FF]">CA Tokens</strong></li>
                    <li>• Daily Release: 16,800 CA / day</li>
                    <li>• BDEX Conversion: 5% swap fee (1.8% buyback & burn)</li>
                    <li>• Best for: High daily percentage returns and staking compounding</li>
                  </ul>
                </div>

                {/* BOT Token Column */}
                <div className="rounded-2xl bg-[#0C0F1E] border border-[#1A223B] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400">LAYER 1 CONSENSUS LAYER</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">BOT Token</span>
                  </div>
                  <h4 className="text-base font-bold text-white">BOT Hashrate Mining</h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    BOT is the native gas asset powering the entire BOT Chain blockchain. Mining BOT hashrate secures base consensus and yields direct L1 gas tokens.
                  </p>
                  <ul className="text-xs font-mono text-[#CBD5E1] space-y-1.5 pt-2">
                    <li>• Reward Asset: <strong className="text-emerald-400">Native BOT</strong></li>
                    <li>• Gas Burn Benefit: 1.5% of network gas fees burned permanently</li>
                    <li>• Zero DEX Slippage: Native gas can be transferred or staked immediately</li>
                    <li>• Best for: Base Layer 1 exposure and blockchain gas utility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SIDE-BY-SIDE COMPARISON MATRIX */}
        <section className="py-16 sm:py-20 bg-[#070914] border-b border-[#1C233B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-[#22D3FF]">
                Side-by-Side Analysis
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">
                Comparison Matrix: Which Earning Method Fits You?
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#1E2540] text-xs font-mono uppercase text-[#8EA2C6] bg-[#0E1222]">
                    <th className="py-4 px-4">Feature</th>
                    <th className="py-4 px-4 text-[#22D3FF]">1. CA Hashrate</th>
                    <th className="py-4 px-4 text-[#A855F7]">2. PoS Staking</th>
                    <th className="py-4 px-4 text-amber-400">3. Mining Servers</th>
                    <th className="py-4 px-4 text-emerald-400">4. BOT Hashrate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#171D36] text-xs sm:text-sm">
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">Asset Earned</td>
                    <td className="py-4 px-4 text-[#22D3FF] font-mono">CA Token</td>
                    <td className="py-4 px-4 text-[#A855F7] font-mono">CA Token</td>
                    <td className="py-4 px-4 text-amber-400 font-mono">CA + AI Fees + Shares</td>
                    <td className="py-4 px-4 text-emerald-400 font-mono">BOT Token (L1)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">Minimum Capital</td>
                    <td className="py-4 px-4 font-mono">100 USDT</td>
                    <td className="py-4 px-4 font-mono">10 CA (~$27)</td>
                    <td className="py-4 px-4 font-mono">Enterprise Node Tier</td>
                    <td className="py-4 px-4 font-mono">100 USDT Equivalent</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">Principal Status</td>
                    <td className="py-4 px-4 text-amber-300">Permanent Compute (No refund)</td>
                    <td className="py-4 px-4 text-emerald-400 font-bold">100% Returned at Maturity</td>
                    <td className="py-4 px-4 text-amber-300">Physical Hardware Asset</td>
                    <td className="py-4 px-4 text-amber-300">Permanent Hashrate</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">Lockup Durations</td>
                    <td className="py-4 px-4 font-mono">Continuous Lifetime</td>
                    <td className="py-4 px-4 font-mono">30d, 90d, 180d, 360d</td>
                    <td className="py-4 px-4 font-mono">Lifetime Node Right</td>
                    <td className="py-4 px-4 font-mono">Continuous Lifetime</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">Payout Frequency</td>
                    <td className="py-4 px-4 font-mono">Daily at 00:00 UTC</td>
                    <td className="py-4 px-4 font-mono">Daily + At Maturity</td>
                    <td className="py-4 px-4 font-mono">Block-by-Block / Task</td>
                    <td className="py-4 px-4 font-mono">Daily at 00:00 UTC</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">Best Suited For</td>
                    <td className="py-4 px-4 text-[#94A3B8]">Passive daily cash flow seekers</td>
                    <td className="py-4 px-4 text-[#94A3B8]">Token holders wanting principal return</td>
                    <td className="py-4 px-4 text-[#94A3B8]">Institutional DePIN node investors</td>
                    <td className="py-4 px-4 text-[#94A3B8]">Layer 1 believers & gas miners</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* RISK & CRITICAL TRANSPARENCY NOTICE */}
        <section className="py-12 bg-[#090B14] border-t border-[#1C233B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-[#140F12] border border-[#3E1F24] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400 text-sm font-bold uppercase tracking-wider">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <span>Essential Risk & Operational Disclosures</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#CBD5E1] leading-relaxed">
                <div>
                  <strong className="text-white block mb-1">Permanent Hashrate Sunk Cost:</strong>
                  USDT spent on CA or BOT computing power purchases cannot be retrieved as liquid stablecoins. You are buying hardware compute allocation; return of capital is driven strictly by future mining yield distributions.
                </div>
                <div>
                  <strong className="text-white block mb-1">BDEX 5% Slippage Mechanics:</strong>
                  Swapping mined CA back to USDT on the internal BDEX incurs a 5% protocol fee (1.8% goes to token buyback & burn, 3.2% to node operators). Factor this friction into net ROI calculations.
                </div>
                <div>
                  <strong className="text-white block mb-1">Decentralized Token Volatility:</strong>
                  Cryptocurrency asset prices fluctuate based on market demand, compute adoption, and macroeconomic factors. Never allocate capital you cannot afford to risk.
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
