"use client";

import React from "react";
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Coins, 
  Users, 
  ArrowRight,
  ExternalLink,
  Info
} from "lucide-react";
import { AFFILIATE_CONFIG } from "@/config/constants";

export default function RiskDisclosureSection() {
  const riskPoints = [
    {
      title: "1. Permanence of Hashrate Units (No Principal Exit)",
      category: "Capital Structure",
      description: "When purchasing computing power at the rate of 1 USDT = 1 Hashrate Unit (minimum 100 USDT), the capital allocated is locked permanently into protocol computing reserves. There is no principal refund, exit, or redemption mechanism. Your return is solely derived from ongoing daily CA mining distributions.",
      severity: "High Importance"
    },
    {
      title: "2. Market Volatility & Price Fluctuation",
      category: "Market Risk",
      description: "The exchange value of CA, BOT, and related cryptographic tokens can fluctuate significantly based on open market conditions, liquidity depth on BDEX, and broader digital asset sentiment. Token prices may rise or fall substantially.",
      severity: "Market Volatility"
    },
    {
      title: "3. Illustrative vs. Guaranteed Yield Projections",
      category: "Staking & Emissions",
      description: "Projections depicted in ecosystem marketing presentations (e.g. compounding 360-day staking models) assume specific mathematical parameters such as sustained daily price appreciation and steady network activity. These are hypothetical simulations and must not be construed as guaranteed investment yields.",
      severity: "Model Assumptions"
    },
    {
      title: "4. Multi-Tier Referral (VIP) Incentive Structure",
      category: "Consensus Model",
      description: "The 10-tier VIP reward system (V1–V10) is funded by the 14,000 CA/day Active Reward Pool and relies on personal investment (300 USDT) combined with team downline 'leg' performance. Rewards depend on active team participation and network expansion.",
      severity: "Referral Dynamics"
    },
    {
      title: "5. Smart Contract Execution & 5% Slippage",
      category: "Protocol Mechanics",
      description: "All token sales on BDEX carry a mandatory 5% slippage distribution (1.8% buyback & burn, 3.2% node operator distribution). While smart contracts are deployed on BOT Chain, blockchain interactions carry inherent technical and execution risks.",
      severity: "Technical Rules"
    },
    {
      title: "6. Self-Custody & Key Management Responsibility",
      category: "Security",
      description: "CaryPact and BO Wallet are decentralized and non-custodial. You are solely responsible for safeguarding your 12-word seed phrase and private keys. Protocol administrators and learning hub staff can never recover lost credentials or reverse transactions.",
      severity: "Personal Custody"
    }
  ];

  return (
    <section id="risks" className="py-14 sm:py-20 relative overflow-hidden bg-[#0A0C14] border-t border-[#1E243B]">
      {/* Background Accent */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Essential Risk & Disclosure Notice</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Transparency & <span className="text-brand-gradient">Risk Disclosures</span>
          </h2>
          <p className="text-sm sm:text-base text-[#C4CBD8]">
            We believe in honest, thorough education. Read and understand these critical structural parameters before committing digital assets.
          </p>
        </div>

        {/* Affiliate Disclosure Card */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-3xl p-6 sm:p-8 mb-8 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7B4FFF]/20 text-[#22D3FF] flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Affiliate Monetization Statement</h3>
              <p className="text-xs text-[#838E9E]">Clear statement of site independence and compensation</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#C4CBD8] leading-relaxed">
            The <strong>CaryPact Learning Hub</strong> is an independent educational and analytics resource. We are not the official company entity. If you choose to register on CaryPact through the links and invitation codes provided on this site, we may receive a referral commission. This compensation does not influence our objective presentation of mathematical rules, permanent hashrate locks, slippage mechanics, or risks.
          </p>
        </div>

        {/* 6 Core Risk Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {riskPoints.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0E1020] border border-[#1E243B] hover:border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-3 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#131728] text-amber-300 border border-amber-500/20">
                  {item.category}
                </span>
                <span className="text-[10px] font-bold text-[#838E9E]">{item.severity}</span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-white">{item.title}</h4>
              <p className="text-xs text-[#C4CBD8] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* DYOR (Do Your Own Research) Checklist */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Pre-Participation &quot;Do Your Own Research&quot; Checklist</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-[#C4CBD8] pt-2">
            <div className="bg-[#0A0C14] p-3.5 rounded-xl border border-[#1E243B] flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22D3FF] mt-1.5 flex-shrink-0" />
              <span>I understand that Hashrate Units cannot be refunded or sold back.</span>
            </div>
            <div className="bg-[#0A0C14] p-3.5 rounded-xl border border-[#1E243B] flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] mt-1.5 flex-shrink-0" />
              <span>I have securely written down my 12-word recovery phrase on physical paper.</span>
            </div>
            <div className="bg-[#0A0C14] p-3.5 rounded-xl border border-[#1E243B] flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7B4FFF] mt-1.5 flex-shrink-0" />
              <span>I acknowledge that all BDEX token sales incur a 5% slippage fee.</span>
            </div>
            <div className="bg-[#0A0C14] p-3.5 rounded-xl border border-[#1E243B] flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
              <span>I am only contributing funds I am comfortable managing through market volatility.</span>
            </div>
            <div className="bg-[#0A0C14] p-3.5 rounded-xl border border-[#1E243B] flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
              <span>I have confirmed I am interacting exclusively with official domain urls.</span>
            </div>
            <div className="bg-[#0A0C14] p-3.5 rounded-xl border border-[#1E243B] flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
              <span>I recognize that downline VIP rewards require active recruitment volume.</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#1E243B]">
            <span className="text-xs text-[#838E9E]">Ready to access the CaryPact DApp?</span>
            <a
              href={AFFILIATE_CONFIG.APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#7B4FFF]/25 transition-all"
            >
              <span>Continue to CaryPact with Informed Consent</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
