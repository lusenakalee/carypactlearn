"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { 
  Zap, 
  Coins, 
  Server, 
  Cpu, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Lock,
  Layers,
  ChevronRight
} from "lucide-react";
import { AFFILIATE_CONFIG } from "@/config/constants";

export default function EarningMethodsHighlight() {
  const earningMethods = [
    {
      id: "ca-hashrate",
      number: "01",
      title: "CA Hashrate / Computing Power",
      badge: "Primary Earning • 16,800 CA / Day",
      badgeColor: "text-[#22D3FF] bg-[#22D3FF]/10 border-[#22D3FF]/30",
      icon: Zap,
      iconColor: "text-[#22D3FF]",
      accentBorder: "hover:border-[#22D3FF]/60",
      ctaLabel: "Buy CA Hashrate",
      ctaUrl: AFFILIATE_CONFIG.PURCHASE_HASHRATE_URL,
      learnHash: "/earn#ca-hashrate",
      whatIsIt: "1 USDT = 1 Computing Power Unit. Tokenized computing power backed by decentralized physical GPU/CPU clusters.",
      howItEarns: "The protocol allocates 42% (16,800 CA/day) of total emissions to active hashrate holders. Daily earnings are credited every 24h at 00:00 UTC.",
      keyRates: "Min. 100 USDT (100 Units). Daily dynamic yield compounded by time factor (K ≈ 1.01). Yields paid in CA tokens.",
      lockNotice: "Permanent compute activation (no principal return; ongoing daily mining dividends).",
    },
    {
      id: "pos-mining",
      number: "02",
      title: "Protocol PoS Mining / CA Staking",
      badge: "18% Pool • 7,200 CA / Day",
      badgeColor: "text-[#A855F7] bg-[#A855F7]/10 border-[#A855F7]/30",
      icon: Coins,
      iconColor: "text-[#A855F7]",
      accentBorder: "hover:border-[#A855F7]/60",
      ctaLabel: "Start PoS Mining",
      ctaUrl: AFFILIATE_CONFIG.POS_MINING_URL,
      learnHash: "/earn#pos-mining",
      whatIsIt: "Proof-of-Stake mining powered by depositing your accumulated or purchased CA tokens into protocol PoS contracts.",
      howItEarns: "Shares the dedicated 7,200 CA daily PoS emission pool. Long-term commitments receive higher multiplier weights.",
      keyRates: "30-day (1.0x), 90-day (1.5x), 180-day (2.0x), 360-day (3.0x multiplier). Daily automatic compounding interest.",
      lockNotice: "Time-locked principal. 100% of your staked CA principal is unlocked and returned upon contract maturity.",
    },
    {
      id: "mining-servers",
      number: "03",
      title: "Mining Server / Machine Presale",
      badge: "Enterprise DePIN • Node Priority",
      badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/30",
      icon: Server,
      iconColor: "text-amber-400",
      accentBorder: "hover:border-amber-400/60",
      ctaLabel: "View Mining Servers",
      ctaUrl: AFFILIATE_CONFIG.MINING_SERVERS_URL,
      learnHash: "/earn#mining-servers",
      whatIsIt: "Direct reservation of physical high-performance AI GPU/CPU compute servers hosted in institutional tier-3/4 data centers.",
      howItEarns: "Physical machine owners receive direct block generation validation rights, commercial AI execution task fees, and lifetime node revenue shares.",
      keyRates: "Enterprise hash allocation with certified NFT verification. Priority routing for commercial AI model training & inference workloads.",
      lockNotice: "Physical hardware custody managed by verified hosting facilities with verifiable hash audit telemetry.",
    },
    {
      id: "bot-hashrate",
      number: "04",
      title: "BOT Hashrate Mining",
      badge: "Layer 1 Native • Gas & Consensus",
      badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/30",
      icon: Cpu,
      iconColor: "text-emerald-400",
      accentBorder: "hover:border-emerald-400/60",
      ctaLabel: "Mine BOT Hashrate",
      ctaUrl: AFFILIATE_CONFIG.BOT_HASHRATE_URL,
      learnHash: "/earn#bot-hashrate",
      whatIsIt: "Direct hashrate mining producing BOT, the native gas and governance Layer 1 cryptocurrency of BOT Chain.",
      howItEarns: "Mines the base-layer token directly, earning revenue from on-chain transaction fees, contract executions, and gas fee burns across the network.",
      keyRates: "Native Layer 1 block emissions. Zero DEX slippage required to acquire native gas tokens. Direct validator delegation.",
      lockNotice: "Base infrastructure mining backing the entire modular blockchain economy.",
    },
    {
      id: "bot-pledge",
      number: "05",
      title: "BOT Pledge / Bot Staking",
      badge: "Flexible Exit • 24H Release • Auto-Compounding",
      badgeColor: "text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/30",
      icon: Layers,
      iconColor: "text-[#38BDF8]",
      accentBorder: "hover:border-[#38BDF8]/60",
      ctaLabel: "Pledge BOT Tokens",
      ctaUrl: AFFILIATE_CONFIG.BOT_PLEDGE_URL,
      learnHash: "/earn#bot-pledge",
      whatIsIt: "Stake BOT to Earn Rewards Flexible Entry and Exit, Free Control. Deposit native BOT tokens into the protocol pledge vault with complete self-determination.",
      howItEarns: "Automatic compounding automatically uses the previous day’s principal + daily earnings as the new principal for compounding staking.",
      keyRates: "Dynamic daily staking yields paid directly in native BOT. Zero DEX slippage. Instant on-chain auto-reinvestment every 24 hours.",
      lockNotice: "Released principal can be withdrawn at any time. After withdrawal, it will be available for claim following a 24-hour unlocking period.",
    },
  ];

  return (
    <section id="earning-methods" className="py-16 sm:py-24 relative overflow-hidden bg-[#070914] border-t border-[#1C233B]">
      {/* Radiant Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#22D3FF]/10 via-[#7B4FFF]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

      {/* Ambient Floating Coins in Background (Left) */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-16 left-4 sm:left-12 lg:left-20 w-20 h-20 sm:w-28 sm:h-28 opacity-25 lg:opacity-35 pointer-events-none select-none z-0"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-[#22D3FF]/30 blur-2xl rounded-full" />
          <Image
            src="https://www.botchain.ai/icons/icon_dex.png"
            alt="Decentralized earning potential coins"
            fill
            sizes="(max-width: 640px) 80px, 112px"
            className="object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      {/* Ambient Floating Coins in Background (Right Glow) */}
      <motion.div
        animate={{
          y: [0, 12, 0],
          rotate: [2, -2, 2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-28 right-4 sm:right-12 lg:right-24 w-20 h-20 sm:w-28 sm:h-28 opacity-20 lg:opacity-30 pointer-events-none select-none z-0"
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-[#A855F7]/30 blur-2xl rounded-full" />
          <Image
            src="https://www.botchain.ai/icons/icon_dex.png"
            alt="BOT Chain DEX mining coins"
            fill
            sizes="(max-width: 640px) 80px, 112px"
            className="object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Straight to the point with Floating Coins Visual */}
        <div className="relative max-w-4xl mx-auto mb-14 sm:mb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11162C] border border-[#232D50] text-xs font-semibold text-[#22D3FF] mb-4 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Five Core Monetization Vectors</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
            >
              How to Earn on <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3FF] via-[#7B4FFF] to-[#A855F7]">CaryPact & BOT Chain</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed max-w-2xl mx-auto"
            >
              Jump straight into the 5 official earning mechanisms. Whether you prefer liquid BOT Pledge with auto-compounding, protocol PoS staking, permanent computing power dividends, physical AI node servers, or native Layer 1 BOT mining.
            </motion.p>
          </div>

          {/* Floating Coins Graphic with Earning Potential Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ 
              y: [0, -10, 0],
              rotate: [-2, 2, -2],
            }}
            transition={{ 
              y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.6 }
            }}
            className="hidden xl:flex absolute -top-2 -right-16 z-20 flex-col items-center pointer-events-none select-none"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#22D3FF]/25 blur-2xl rounded-full scale-110" />
              <div className="relative w-28 h-28 drop-shadow-[0_12px_28px_rgba(34,211,255,0.4)]">
                <Image
                  src="https://www.botchain.ai/icons/icon_dex.png"
                  alt="Earning potential coins"
                  fill
                  sizes="112px"
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-1 px-2.5 py-1 rounded-full bg-[#0D1224]/90 border border-[#232F52] text-[10px] font-mono text-[#22D3FF] shadow-lg backdrop-blur-md whitespace-nowrap text-center flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Earning Potential</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {earningMethods.map((method, idx) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                className={`group relative rounded-3xl bg-gradient-to-b from-[#11162A] to-[#0A0D1B] border border-[#202947] ${method.accentBorder} p-6 sm:p-8 shadow-xl shadow-black/40 transition-all duration-300 flex flex-col justify-between`}
              >
                {/* Top Number & Badge */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-3xl font-black text-white/30 group-hover:text-white transition-colors">
                        {method.number}
                      </span>
                      <span className={`text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${method.badgeColor}`}>
                        {method.badge}
                      </span>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-[#161D33] border border-[#253052] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className={`w-5 h-5 ${method.iconColor}`} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#22D3FF] transition-colors">
                    {method.title}
                  </h3>

                  {/* What is it */}
                  <div className="mb-4 bg-[#0D1122] rounded-xl p-3.5 border border-[#1A223C]">
                    <div className="text-[11px] uppercase tracking-wider font-mono font-semibold text-[#8EA2C6] mb-1">
                      What It Is
                    </div>
                    <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                      {method.whatIsIt}
                    </p>
                  </div>

                  {/* How it earns */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#94A3B8]">
                      <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-medium">How You Earn:</span> {method.howItEarns}
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#94A3B8]">
                      <Coins className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-medium">Rates & Specs:</span> {method.keyRates}
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#8EA2C6]">
                      <Lock className="w-4 h-4 text-[#A855F7] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-white font-medium">Capital Terms:</span> {method.lockNotice}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Area */}
                <div className="pt-5 border-t border-[#1C2542] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <a
                    href={method.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`home-cta-${method.id}`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#22D3FF] to-[#0EA5E9] hover:from-[#38BDF8] hover:to-[#0284C7] text-[#070913] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#22D3FF]/20 cursor-pointer"
                  >
                    <span>{method.ctaLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <Link
                    href={method.learnHash}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#141A2E] hover:bg-[#1B233D] text-[#CBD5E1] hover:text-white text-xs font-semibold border border-[#232F4E] transition-colors cursor-pointer"
                  >
                    <span>Deep-Dive Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#22D3FF]" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Banner: Explore the dedicated /earn page */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-r from-[#121730] via-[#161C3B] to-[#121730] border border-[#242F54] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-center gap-5 sm:gap-6 max-w-3xl">
            {/* Earning potential coins badge inside banner */}
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 shrink-0 hidden sm:block">
              <div className="absolute inset-0 bg-[#7B4FFF]/25 blur-xl rounded-full" />
              <Image
                src="https://www.botchain.ai/icons/icon_dex.png"
                alt="Earning potential coins stack"
                fill
                sizes="(max-width: 640px) 64px, 96px"
                className="object-contain drop-shadow-[0_8px_20px_rgba(123,79,255,0.4)]"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#A855F7]">
                <Sparkles className="w-3.5 h-3.5 text-[#22D3FF]" />
                <span>Comprehensive Yield Intelligence</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Looking for In-Depth Mathematical Formulas, Lockup Schedules & ROI Calculators?
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                Visit our dedicated <strong className="text-white">/earn</strong> directory for a complete breakdown of hashrate compounding factors, PoS duration weight multipliers (30d–360d), node presale tiers, and interactive calculators.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <Link
              href="/earn"
              id="goto-earn-page-banner-btn"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-[#7B4FFF] to-[#6335E5] hover:from-[#6D3DF5] hover:to-[#5527D6] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#7B4FFF]/25 cursor-pointer w-full sm:w-auto"
            >
              <span>Explore Dedicated Earning Hub (/earn)</span>
              <ArrowRight className="w-4 h-4 text-[#22D3FF]" />
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
