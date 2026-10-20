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
  ShieldAlert,
  TrendingUp,
  Clock,
  Lock,
  Unlock,
  Calculator,
  Layers,
  Database,
  Activity,
} from "lucide-react";

import { useLocale, useTranslations } from "next-intl";
import { AFFILIATE_CONFIG, ECOSYSTEM_METRICS } from "@/config/constants";
import WalletLaunchButton from "@/components/wallet/WalletLaunchButton";

/** **bold** markup -> <strong> */
const rich = (s: string, cls = "text-white") =>
  s.split("**").map((part, i) =>
    i % 2 ? (
      <strong key={i} className={cls}>
        {part}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );

export default function EarnPage() {
  const locale = useLocale();
  const tr = useTranslations("earn");

  /** string lookup with {var} interpolation (ICU, handled by next-intl) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = (key: string, vars?: Record<string, string | number>): string => tr(key as any, vars);
  /** string[] lookup (for bullet lists) */
  const tl = (key: string): string[] => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const v = tr.raw(key as any);
    return Array.isArray(v) ? (v as string[]) : [];
  };

  const numLocale = locale === "zh" ? "zh-CN" : locale;

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

  // BOT Pledge (Bot Staking) Calculator State
  const [botPledgeAmount, setBotPledgeAmount] = useState<number>(1000);
  const [botPledgeAutoCompound, setBotPledgeAutoCompound] = useState<boolean>(true);
  const [botPledgeSimulatedDays, setBotPledgeSimulatedDays] = useState<number>(90);
  const [simulatedBotPrice] = useState<number>(ECOSYSTEM_METRICS.BOT_BASE_PRICE);

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
  const estimatedDailyCa = (hashrateUsdt * 0.0055) / (simulatedCaPrice / 2.74);
  const estimatedMonthlyCa = estimatedDailyCa * 30;
  const estimatedYearlyCa = estimatedDailyCa * 365;
  const estimatedDailyUsd = estimatedDailyCa * simulatedCaPrice;
  const estimatedMonthlyUsd = estimatedMonthlyCa * simulatedCaPrice;

  // PoS calculations
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
    return 0.2;
  };

  const currentApy = getBaseApy(posDays);
  const posDailyRewardCa = posCaAmount * (currentApy / 365);
  const posTotalPeriodRewardCa = posDailyRewardCa * posDays;
  const posTotalMaturityCa = posCaAmount + posTotalPeriodRewardCa;

  // BOT Pledge Calculations
  const botPledgeDailyRate = 0.0025;
  const botPledgeSimpleReward = botPledgeAmount * botPledgeDailyRate * botPledgeSimulatedDays;
  const botPledgeCompoundedReward =
    botPledgeAmount * (Math.pow(1 + botPledgeDailyRate, botPledgeSimulatedDays) - 1);
  const botPledgeSelectedReward = botPledgeAutoCompound ? botPledgeCompoundedReward : botPledgeSimpleReward;
  const botPledgeTotalMaturity = botPledgeAmount + botPledgeSelectedReward;
  const botPledgeCompoundingBonus = botPledgeCompoundedReward - botPledgeSimpleReward;

  const posTiers = [
    { days: 30, multiplier: "1.0x", estApy: "~18% – 24%", highlight: false, descKey: "pos.tier30" },
    { days: 90, multiplier: "1.5x", estApy: "~32% – 42%", highlight: false, descKey: "pos.tier90" },
    { days: 180, multiplier: "2.0x", estApy: "~50% – 68%", highlight: true, descKey: "pos.tier180" },
    { days: 360, multiplier: "3.0x", estApy: "~85% – 110%+", highlight: false, descKey: "pos.tier360" },
  ];

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
              <Link href="/#home" className="hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t("hero.home")}</span>
              </Link>
              <span>/</span>
              <span className="text-[#22D3FF]">{t("hero.breadcrumb")}</span>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#22D3FF] mb-4 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t("hero.badge")}</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                  {t("hero.titleA")}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3FF] via-[#7B4FFF] to-[#A855F7]">
                    {t("hero.titleB")}
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">{t("hero.desc")}</p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
                <button
                  onClick={() => setPdfModalOpen(true)}
                  id="earn-download-pdf-btn"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#141A2E] hover:bg-[#1C243E] text-[#22D3FF] text-xs font-bold uppercase tracking-wider border border-[#232F4E] transition-all cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t("hero.cheatSheet")}</span>
                </button>
              </div>
            </div>

            {/* Quick Anchor Navigation */}
            <div className="mt-10 pt-6 border-t border-[#1C2542] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <a href="#ca-hashrate" className="flex items-center gap-2.5 p-3 rounded-xl bg-[#101428] hover:bg-[#161C36] border border-[#1E2746] transition-all group">
                <Zap className="w-4 h-4 text-[#22D3FF] group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] font-mono text-[#8EA2C6]">{t("nav.method", { n: 1 })}</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#22D3FF] transition-colors">{t("nav.ca")}</div>
                </div>
              </a>

              <a href="#pos-mining" className="flex items-center gap-2.5 p-3 rounded-xl bg-[#101428] hover:bg-[#161C36] border border-[#1E2746] transition-all group">
                <Coins className="w-4 h-4 text-[#A855F7] group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] font-mono text-[#8EA2C6]">{t("nav.method", { n: 2 })}</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#A855F7] transition-colors">{t("nav.pos")}</div>
                </div>
              </a>

              <a href="#mining-servers" className="flex items-center gap-2.5 p-3 rounded-xl bg-[#101428] hover:bg-[#161C36] border border-[#1E2746] transition-all group">
                <Server className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] font-mono text-[#8EA2C6]">{t("nav.method", { n: 3 })}</div>
                  <div className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">{t("nav.servers")}</div>
                </div>
              </a>

              <a href="#bot-hashrate" className="flex items-center gap-2.5 p-3 rounded-xl bg-[#101428] hover:bg-[#161C36] border border-[#1E2746] transition-all group">
                <Cpu className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] font-mono text-[#8EA2C6]">{t("nav.method", { n: 4 })}</div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{t("nav.bot")}</div>
                </div>
              </a>

              <a href="#bot-pledge" className="flex items-center gap-2.5 p-3 rounded-xl bg-[#101428] hover:bg-[#161C36] border border-[#1E2746] transition-all group col-span-2 sm:col-span-1">
                <Layers className="w-4 h-4 text-[#38BDF8] group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] font-mono text-[#8EA2C6]">{t("nav.method", { n: 5 })}</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#38BDF8] transition-colors">{t("nav.pledge")}</div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* METHOD 1: CA HASHRATE */}
        <section id="ca-hashrate" className="py-16 sm:py-20 bg-[#090C17] border-b border-[#1C233B] scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-[#22D3FF]/10 text-[#22D3FF] border border-[#22D3FF]/30">
                {t("common.methodBadge", { n: "01" })}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8EA2C6]">
                {t("common.officialPage", { page: "app.carypact.com/purchaseHashrate" })}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  <span>{t("ca.title")}</span>
                  <Zap className="w-7 h-7 text-[#22D3FF]" />
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] mt-2 max-w-3xl">{t("ca.desc")}</p>
              </div>

              <WalletLaunchButton
                url={AFFILIATE_CONFIG.PURCHASE_HASHRATE_URL}
                id="cta-buy-ca-hashrate-page"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#22D3FF] to-[#0EA5E9] hover:from-[#38BDF8] hover:to-[#0284C7] text-[#070913] font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#22D3FF]/25 cursor-pointer shrink-0"
              >
                <span>{t("ca.cta")}</span>
                <ExternalLink className="w-4 h-4" />
              </WalletLaunchButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="rounded-2xl bg-[#101426] border border-[#1E2746] p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#161D36] border border-[#253054] flex items-center justify-center text-[#22D3FF]">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("ca.card1Title")}</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{rich(t("ca.card1Desc"))}</p>
                <div className="p-3 rounded-xl bg-[#0B0E1C] border border-[#171E36] text-xs font-mono text-[#CBD5E1]">
                  <div>• {rich(t("ca.card1Standard"), "text-[#22D3FF]")}</div>
                  <div>• {rich(t("ca.card1Min"))}</div>
                  <div>• {t("ca.card1Supported")}</div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#101426] border border-[#1E2746] p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#161D36] border border-[#253054] flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("ca.card2Title")}</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{rich(t("ca.card2Desc"))}</p>
                <div className="p-3 rounded-xl bg-[#0B0E1C] border border-[#171E36] text-xs font-mono text-[#CBD5E1]">
                  <div>• {rich(t("ca.card2Compound"), "text-emerald-400")}</div>
                  <div>• {rich(t("ca.card2Pool"))}</div>
                  <div>• {t("ca.card2Settlement")}</div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#101426] border border-[#1E2746] p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#161D36] border border-[#253054] flex items-center justify-center text-amber-400">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("ca.card3Title")}</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{rich(t("ca.card3Desc"))}</p>
                <div className="p-3 rounded-xl bg-[#1E1610] border border-[#452814] text-xs text-amber-300">
                  {rich(t("ca.card3Rule"), "text-amber-300")}
                </div>
              </div>
            </div>

            {/* Hashrate Calculator */}
            <div className="rounded-3xl bg-gradient-to-r from-[#11162C] via-[#141A35] to-[#11162C] border border-[#232E52] p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-[#22D3FF]/10 text-[#22D3FF]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">{t("ca.calcTitle")}</h3>
                  <p className="text-xs text-[#8EA2C6]">{t("ca.calcSubtitle")}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-[#8EA2C6]">{t("ca.calcAmount")}</span>
                      <span className="text-white font-bold">
                        {t("ca.calcAmountValue", { usdt: hashrateUsdt.toLocaleString(numLocale), units: hashrateUsdt })}
                      </span>
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
                      <span>{t("ca.calcMin")}</span>
                      <span>1,000U</span>
                      <span>5,000U</span>
                      <span>10,000U</span>
                      <span>{t("ca.calcWhale")}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-mono mb-2">
                      <span className="text-[#8EA2C6]">{t("ca.calcPrice")}</span>
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
                      <span>{t("ca.calcCurrent")}</span>
                      <span>$5.00</span>
                      <span>$10.00</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#0B0E1D] p-5 rounded-2xl border border-[#1B233D]">
                  <div className="p-3 rounded-xl bg-[#11162C]">
                    <div className="text-[11px] text-[#8EA2C6]">{t("ca.estDaily")}</div>
                    <div className="text-lg font-bold text-white mt-0.5">{estimatedDailyCa.toFixed(2)} CA</div>
                    <div className="text-[10px] text-emerald-400 font-mono">≈ ${estimatedDailyUsd.toFixed(2)} {t("ca.perDay")}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#11162C]">
                    <div className="text-[11px] text-[#8EA2C6]">{t("ca.estMonthly")}</div>
                    <div className="text-lg font-bold text-[#22D3FF] mt-0.5">{estimatedMonthlyCa.toFixed(1)} CA</div>
                    <div className="text-[10px] text-emerald-400 font-mono">≈ ${estimatedMonthlyUsd.toFixed(2)} {t("ca.perMonth")}</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#11162C] col-span-2 sm:col-span-1">
                    <div className="text-[11px] text-[#8EA2C6]">{t("ca.estYearly")}</div>
                    <div className="text-lg font-bold text-[#A855F7] mt-0.5">{estimatedYearlyCa.toFixed(0)} CA</div>
                    <div className="text-[10px] text-emerald-400 font-mono">
                      ≈ ${(estimatedYearlyCa * simulatedCaPrice).toFixed(2)} {t("ca.perYear")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METHOD 2: POS */}
        <section id="pos-mining" className="py-16 sm:py-20 bg-[#0A0C16] border-b border-[#1C233B] scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-[#A855F7]/10 text-[#A855F7] border border-[#A855F7]/30">
                {t("common.methodBadge", { n: "02" })}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8EA2C6]">
                {t("common.officialPage", { page: "app.carypact.com/posMining" })}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  <span>{t("pos.title")}</span>
                  <Coins className="w-7 h-7 text-[#A855F7]" />
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] mt-2 max-w-3xl">{t("pos.desc")}</p>
              </div>

              <WalletLaunchButton
                url={AFFILIATE_CONFIG.POS_MINING_URL}
                id="cta-pos-mining-page"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#7B4FFF] hover:from-[#B568F8] hover:to-[#6C3FEF] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#A855F7]/25 cursor-pointer shrink-0"
              >
                <span>{t("pos.cta")}</span>
                <ExternalLink className="w-4 h-4" />
              </WalletLaunchButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {posTiers.map((tier) => (
                <div
                  key={tier.days}
                  className={`rounded-2xl p-5 border ${tier.highlight ? "bg-[#15122B] border-[#7B4FFF] shadow-lg shadow-[#7B4FFF]/20" : "bg-[#101324] border-[#1E2540]"} space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#8EA2C6]">{t("pos.daysLock", { days: tier.days })}</span>
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30">
                      {t("pos.weight", { m: tier.multiplier })}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-white">{tier.estApy}</div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{t(tier.descKey)}</p>
                  <div className="pt-2 border-t border-[#1F2644] flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <Unlock className="w-3.5 h-3.5" />
                    <span>{t("pos.unlockedAt", { days: tier.days })}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 space-y-4">
                <div className="rounded-2xl bg-[#101426] border border-[#1E2746] p-6 space-y-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#A855F7]" />
                    <span>{t("pos.howTitle")}</span>
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    <p>{rich(t("pos.how1"))}</p>
                    <p>{rich(t("pos.how2"))}</p>
                    <p>{rich(t("pos.how3"))}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-2xl bg-[#11152A] border border-[#232D50] p-6 space-y-5">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Calculator className="w-4 h-4 text-[#A855F7]" />
                  <span>{t("pos.simTitle")}</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[#8EA2C6]">{t("pos.simAmount")}</span>
                    <span className="text-white font-bold">
                      {posCaAmount} CA (≈ ${(posCaAmount * simulatedCaPrice).toFixed(2)})
                    </span>
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
                  <div className="text-xs font-mono text-[#8EA2C6] mb-2">{t("pos.simDuration")}</div>
                  <div className="grid grid-cols-4 gap-2">
                    {[30, 90, 180, 360].map((d) => (
                      <button
                        key={d}
                        onClick={() => setPosDays(d)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-colors cursor-pointer ${posDays === d ? "bg-[#7B4FFF] text-white border-[#A855F7]" : "bg-[#151A31] text-[#94A3B8] border-[#202744] hover:bg-[#1A213D]"}`}
                      >
                        {t("pos.durationBtn", { days: d, m: getMultiplier(d) })}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0B0E1D] p-4 rounded-xl border border-[#1A213B] grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[11px] text-[#8EA2C6]">{t("pos.estProfit")}</div>
                    <div className="text-lg font-bold text-[#A855F7] mt-0.5">+{posTotalPeriodRewardCa.toFixed(1)} CA</div>
                    <div className="text-[10px] text-emerald-400 font-mono">≈ +${(posTotalPeriodRewardCa * simulatedCaPrice).toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-[#8EA2C6]">{t("pos.returnAtMaturity")}</div>
                    <div className="text-lg font-bold text-white mt-0.5">{posTotalMaturityCa.toFixed(1)} CA</div>
                    <div className="text-[10px] text-[#8EA2C6] font-mono">{t("pos.principalPlusRewards")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METHOD 3: MINING SERVERS */}
        <section id="mining-servers" className="py-16 sm:py-20 bg-[#090C17] border-b border-[#1C233B] scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/30">
                {t("common.methodBadge", { n: "03" })}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8EA2C6]">
                {t("common.officialPage", { page: "app.carypact.com/mining-introduction" })}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  <span>{t("servers.title")}</span>
                  <Server className="w-7 h-7 text-amber-400" />
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] mt-2 max-w-3xl">{t("servers.desc")}</p>
              </div>

              <WalletLaunchButton
                url={AFFILIATE_CONFIG.MINING_SERVERS_URL}
                id="cta-mining-servers-page"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#070913] font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-amber-400/20 cursor-pointer shrink-0"
              >
                <span>{t("servers.cta")}</span>
                <ExternalLink className="w-4 h-4" />
              </WalletLaunchButton>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
              <div className="rounded-2xl bg-[#101426] border border-[#1E2746] p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1D1A10] border border-[#3D3316] flex items-center justify-center text-amber-400">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("servers.card1Title")}</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{t("servers.card1Desc")}</p>
                <div className="text-[11px] font-mono text-[#CBD5E1] p-3 rounded-xl bg-[#0B0E1D] border border-[#182038]">
                  {tl("servers.card1Bullets").map((b, i, arr) => (
                    <React.Fragment key={i}>
                      • {b}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[#101426] border border-[#1E2746] p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1D1A10] border border-[#3D3316] flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("servers.card2Title")}</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{t("servers.card2Desc")}</p>
                <div className="text-[11px] font-mono text-[#CBD5E1] p-3 rounded-xl bg-[#0B0E1D] border border-[#182038]">
                  {tl("servers.card2Bullets").map((b, i, arr) => (
                    <React.Fragment key={i}>
                      • {b}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[#101426] border border-[#1E2746] p-6 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#1D1A10] border border-[#3D3316] flex items-center justify-center text-[#22D3FF]">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{t("servers.card3Title")}</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{t("servers.card3Desc")}</p>
                <div className="text-[11px] font-mono text-[#CBD5E1] p-3 rounded-xl bg-[#0B0E1D] border border-[#182038]">
                  {tl("servers.card3Bullets").map((b, i, arr) => (
                    <React.Fragment key={i}>
                      • {b}
                      {i < arr.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METHOD 4: BOT HASHRATE */}
        <section id="bot-hashrate" className="py-16 sm:py-20 bg-[#0A0C16] border-b border-[#1C233B] scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">
                {t("common.methodBadge", { n: "04" })}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8EA2C6]">
                {t("common.officialPage", { page: "app.carypact.com/purchase-bot-hashrate" })}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  <span>{t("botHash.title")}</span>
                  <Cpu className="w-7 h-7 text-emerald-400" />
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] mt-2 max-w-3xl">{t("botHash.desc")}</p>
              </div>

              <WalletLaunchButton
                url={AFFILIATE_CONFIG.BOT_HASHRATE_URL}
                id="cta-bot-hashrate-page"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-[#070913] font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-400/20 cursor-pointer shrink-0"
              >
                <span>{t("botHash.cta")}</span>
                <ExternalLink className="w-4 h-4" />
              </WalletLaunchButton>
            </div>

            <div className="rounded-3xl bg-[#101428] border border-[#1F2746] p-6 sm:p-8 mb-10">
              <h3 className="text-xl font-bold text-white mb-6">{t("botHash.compareTitle")}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl bg-[#0C0F1E] border border-[#1A223B] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#22D3FF]">{t("botHash.caLayer")}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#22D3FF]/10 text-[#22D3FF] border border-[#22D3FF]/30">
                      {t("botHash.caBadge")}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{t("botHash.caHeading")}</h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{t("botHash.caDesc")}</p>
                  <ul className="text-xs font-mono text-[#CBD5E1] space-y-1.5 pt-2">
                    <li>• {rich(t("botHash.caReward"), "text-[#22D3FF]")}</li>
                    <li>• {t("botHash.caDaily")}</li>
                    <li>• {t("botHash.caConversion")}</li>
                    <li>• {t("botHash.caBest")}</li>
                  </ul>
                </div>

                <div className="rounded-2xl bg-[#0C0F1E] border border-[#1A223B] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400">{t("botHash.botLayer")}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-400/10 text-emerald-400 border border-emerald-400/30">
                      {t("botHash.botBadge")}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{t("botHash.botHeading")}</h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{t("botHash.botDesc")}</p>
                  <ul className="text-xs font-mono text-[#CBD5E1] space-y-1.5 pt-2">
                    <li>• {rich(t("botHash.botReward"), "text-emerald-400")}</li>
                    <li>• {t("botHash.botBurn")}</li>
                    <li>• {t("botHash.botZeroSlip")}</li>
                    <li>• {t("botHash.botBest")}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* METHOD 5: BOT PLEDGE */}
        <section id="bot-pledge" className="py-16 sm:py-20 bg-[#090C19] border-b border-[#1C233B] scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-sm font-bold px-2.5 py-1 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30">
                {t("common.methodBadge", { n: "05" })}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8EA2C6]">
                {t("common.officialPage", { page: "app.carypact.com/bot-pledge" })}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  <span>{t("pledge.title")}</span>
                  <Layers className="w-7 h-7 text-[#38BDF8]" />
                </h2>
                <p className="text-base sm:text-lg text-[#38BDF8] font-semibold mt-1">{t("pledge.tagline")}</p>
                <p className="text-sm sm:text-base text-[#94A3B8] mt-2 max-w-3xl leading-relaxed">{t("pledge.desc")}</p>
              </div>

              <WalletLaunchButton
                url={AFFILIATE_CONFIG.BOT_PLEDGE_URL}
                id="cta-bot-pledge-page"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#0284C7] hover:from-[#60A5FA] hover:to-[#0369A1] text-[#070913] font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#38BDF8]/20 cursor-pointer shrink-0"
              >
                <span>{t("pledge.cta")}</span>
                <ExternalLink className="w-4 h-4" />
              </WalletLaunchButton>
            </div>

            {/* Basic Rules */}
            <div className="mb-10">
              <div className="text-xs font-mono uppercase tracking-wider font-bold text-[#8EA2C6] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                <span>{t("pledge.rulesTitle")}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="rounded-2xl bg-[#10152B] border border-[#1E294A] p-6 space-y-3 relative overflow-hidden group hover:border-[#38BDF8]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/30 flex items-center justify-center font-mono font-bold text-sm">1</span>
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                      {t("pledge.rule1Tag")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#38BDF8] transition-colors">{t("pledge.rule1Title")}</h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{t("pledge.rule1Desc")}</p>
                  <div className="pt-2 text-[11px] font-mono text-[#CBD5E1] border-t border-[#1B2440]">
                    {tl("pledge.rule1Bullets").map((b, i, arr) => (
                      <React.Fragment key={i}>
                        • {b}
                        {i < arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#10152B] border border-[#1E294A] p-6 space-y-3 relative overflow-hidden group hover:border-amber-400/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center font-mono font-bold text-sm">2</span>
                    <span className="text-[11px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      {t("pledge.rule2Tag")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">{t("pledge.rule2Title")}</h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{t("pledge.rule2Desc")}</p>
                  <div className="pt-2 text-[11px] font-mono text-[#CBD5E1] border-t border-[#1B2440]">
                    {tl("pledge.rule2Bullets").map((b, i, arr) => (
                      <React.Fragment key={i}>
                        • {b}
                        {i < arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#10152B] border border-[#1E294A] p-6 space-y-3 relative overflow-hidden group hover:border-[#A855F7]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-[#A855F7]/10 text-[#A855F7] border border-[#A855F7]/30 flex items-center justify-center font-mono font-bold text-sm">3</span>
                    <span className="text-[11px] font-mono text-[#A855F7] bg-[#A855F7]/10 px-2 py-0.5 rounded border border-[#A855F7]/20">
                      {t("pledge.rule3Tag")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#A855F7] transition-colors">{t("pledge.rule3Title")}</h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{t("pledge.rule3Desc")}</p>
                  <div className="pt-2 text-[11px] font-mono text-[#CBD5E1] border-t border-[#1B2440]">
                    {tl("pledge.rule3Bullets").map((b, i, arr) => (
                      <React.Fragment key={i}>
                        • {b}
                        {i < arr.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Simulator + Lifecycle */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
              <div className="lg:col-span-7 rounded-3xl bg-gradient-to-b from-[#11172E] to-[#0D1224] border border-[#212C4E] p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-base font-bold text-white">
                    <Calculator className="w-5 h-5 text-[#38BDF8]" />
                    <span>{t("pledge.simTitle")}</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                    {t("pledge.simRate")}
                  </span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-[#8EA2C6]">{t("pledge.simAmount")}</span>
                    <span className="text-white font-bold text-sm">
                      {botPledgeAmount.toLocaleString(numLocale)} BOT
                      <span className="text-[#8EA2C6] font-normal text-xs ml-1.5">
                        (≈ ${(botPledgeAmount * simulatedBotPrice).toFixed(2)})
                      </span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={20000}
                    step={50}
                    value={botPledgeAmount}
                    onChange={(e) => setBotPledgeAmount(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#1C2542] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#606E85] mt-1">
                    <span>50 BOT</span>
                    <span>5,000 BOT</span>
                    <span>10,000 BOT</span>
                    <span>20,000 BOT</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-[#8EA2C6] mb-2 flex items-center justify-between">
                    <span>{t("pledge.simDuration")}</span>
                    <span className="text-white font-bold">{t("pledge.daysValue", { days: botPledgeSimulatedDays })}</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[7, 30, 90, 180, 365].map((days) => (
                      <button
                        key={days}
                        onClick={() => setBotPledgeSimulatedDays(days)}
                        className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          botPledgeSimulatedDays === days
                            ? "bg-[#38BDF8] text-[#070913] border-[#38BDF8] shadow-md shadow-[#38BDF8]/20"
                            : "bg-[#141A30] text-[#94A3B8] border-[#222B48] hover:bg-[#1A223E]"
                        }`}
                      >
                        {t("pledge.daysShort", { days })}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#0B0F20] border border-[#1B2340] flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>{t("pledge.toggleTitle")}</span>
                    </div>
                    <div className="text-[11px] text-[#8EA2C6]">{t("pledge.toggleDesc")}</div>
                  </div>
                  <button
                    onClick={() => setBotPledgeAutoCompound(!botPledgeAutoCompound)}
                    aria-pressed={botPledgeAutoCompound}
                    aria-label={t("pledge.toggleTitle")}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors cursor-pointer ${
                      botPledgeAutoCompound ? "bg-[#38BDF8]" : "bg-[#222B48]"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        botPledgeAutoCompound ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-[#0B0F20] border border-[#1D2644] grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] text-[#8EA2C6] font-mono">{t("pledge.estYield")}</div>
                    <div className="text-xl font-extrabold text-[#38BDF8] mt-1">+{botPledgeSelectedReward.toFixed(2)} BOT</div>
                    <div className="text-xs text-emerald-400 font-mono mt-0.5">
                      ≈ +${(botPledgeSelectedReward * simulatedBotPrice).toFixed(2)} USD
                    </div>
                    {botPledgeAutoCompound && botPledgeCompoundingBonus > 0.05 && (
                      <div className="text-[10px] text-amber-400 font-mono mt-1">
                        {t("pledge.compoundBoost", { amount: botPledgeCompoundingBonus.toFixed(2) })}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-[11px] text-[#8EA2C6] font-mono">{t("pledge.totalAtHorizon")}</div>
                    <div className="text-xl font-extrabold text-white mt-1">{botPledgeTotalMaturity.toFixed(2)} BOT</div>
                    <div className="text-xs text-[#8EA2C6] font-mono mt-0.5">{t("pledge.principalAllEarnings")}</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-1">
                      {t("pledge.effectiveApy", {
                        apy: ((Math.pow(1 + botPledgeDailyRate, 365) - 1) * 100).toFixed(1),
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lifecycle */}
              <div className="lg:col-span-5 space-y-4">
                <div className="rounded-3xl bg-[#10152B] border border-[#20294A] p-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{t("pledge.lifeTitle")}</span>
                  </div>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{t("pledge.lifeIntro")}</p>

                  <div className="relative pl-6 space-y-4 border-l border-[#242F54] mt-2">
                    <div className="relative">
                      <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#38BDF8] border-2 border-[#10152B]" />
                      <div className="text-xs font-bold text-white">{t("pledge.life1Title")}</div>
                      <div className="text-[11px] text-[#8EA2C6]">{t("pledge.life1Desc")}</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-amber-400 border-2 border-[#10152B]" />
                      <div className="text-xs font-bold text-white">{t("pledge.life2Title")}</div>
                      <div className="text-[11px] text-[#8EA2C6]">{t("pledge.life2Desc")}</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-amber-400/60 border-2 border-[#10152B] animate-pulse" />
                      <div className="text-xs font-bold text-white">{t("pledge.life3Title")}</div>
                      <div className="text-[11px] text-[#8EA2C6]">{t("pledge.life3Desc")}</div>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#10152B]" />
                      <div className="text-xs font-bold text-emerald-400">{t("pledge.life4Title")}</div>
                      <div className="text-[11px] text-[#8EA2C6]">{t("pledge.life4Desc")}</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0C1022] border border-[#1A223D] text-[11px] text-[#CBD5E1]">
                    {rich(t("pledge.lifeSummary"))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#11162C] to-[#151D3A] border border-[#222E54] flex items-center justify-between gap-3">
                  <div className="text-xs text-[#CBD5E1]">{t("pledge.readyText")}</div>
                  <WalletLaunchButton
                    url={AFFILIATE_CONFIG.BOT_PLEDGE_URL}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#38BDF8] text-[#070913] text-xs font-bold shrink-0 hover:bg-[#60A5FA] transition-colors"
                  >
                    <span>{t("pledge.launchPortal")}</span>
                    <ExternalLink className="w-3 h-3" />
                  </WalletLaunchButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON MATRIX */}
        <section className="py-16 sm:py-20 bg-[#070914] border-b border-[#1C233B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-[#22D3FF]">
                {t("matrix.badge")}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">{t("matrix.title")}</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="border-b border-[#1E2540] text-xs font-mono uppercase text-[#8EA2C6] bg-[#0E1222]">
                    <th className="py-4 px-4">{t("matrix.feature")}</th>
                    <th className="py-4 px-4 text-[#22D3FF]">1. {t("nav.ca")}</th>
                    <th className="py-4 px-4 text-[#A855F7]">2. {t("nav.pos")}</th>
                    <th className="py-4 px-4 text-amber-400">3. {t("nav.servers")}</th>
                    <th className="py-4 px-4 text-emerald-400">4. {t("nav.bot")}</th>
                    <th className="py-4 px-4 text-[#38BDF8]">5. {t("nav.pledge")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#171D36] text-xs sm:text-sm">
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">{t("matrix.assetEarned")}</td>
                    <td className="py-4 px-4 text-[#22D3FF] font-mono">{t("matrix.asset1")}</td>
                    <td className="py-4 px-4 text-[#A855F7] font-mono">{t("matrix.asset2")}</td>
                    <td className="py-4 px-4 text-amber-400 font-mono">{t("matrix.asset3")}</td>
                    <td className="py-4 px-4 text-emerald-400 font-mono">{t("matrix.asset4")}</td>
                    <td className="py-4 px-4 text-[#38BDF8] font-mono">{t("matrix.asset5")}</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">{t("matrix.minCapital")}</td>
                    <td className="py-4 px-4 font-mono">{t("matrix.min1")}</td>
                    <td className="py-4 px-4 font-mono">{t("matrix.min2")}</td>
                    <td className="py-4 px-4 font-mono">{t("matrix.min3")}</td>
                    <td className="py-4 px-4 font-mono">{t("matrix.min4")}</td>
                    <td className="py-4 px-4 font-mono">{t("matrix.min5")}</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">{t("matrix.principalStatus")}</td>
                    <td className="py-4 px-4 text-amber-300">{t("matrix.principal1")}</td>
                    <td className="py-4 px-4 text-emerald-400 font-bold">{t("matrix.principal2")}</td>
                    <td className="py-4 px-4 text-amber-300">{t("matrix.principal3")}</td>
                    <td className="py-4 px-4 text-amber-300">{t("matrix.principal4")}</td>
                    <td className="py-4 px-4 text-emerald-400 font-bold">{t("matrix.principal5")}</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">{t("matrix.lockup")}</td>
                    <td className="py-4 px-4 font-mono">{t("matrix.lock1")}</td>
                    <td className="py-4 px-4 font-mono">{t("matrix.lock2")}</td>
                    <td className="py-4 px-4 font-mono">{t("matrix.lock3")}</td>
                    <td className="py-4 px-4 font-mono">{t("matrix.lock4")}</td>
                    <td className="py-4 px-4 font-mono text-[#38BDF8]">{t("matrix.lock5")}</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">{t("matrix.payout")}</td>
                    <td className="py-4 px-4 font-mono">{t("matrix.payout1")}</td>
                    <td className="py-4 px-4 font-mono">{t("matrix.payout2")}</td>
                    <td className="py-4 px-4 font-mono">{t("matrix.payout3")}</td>
                    <td className="py-4 px-4 font-mono">{t("matrix.payout4")}</td>
                    <td className="py-4 px-4 font-mono text-[#38BDF8]">{t("matrix.payout5")}</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-white">{t("matrix.bestFor")}</td>
                    <td className="py-4 px-4 text-[#94A3B8]">{t("matrix.best1")}</td>
                    <td className="py-4 px-4 text-[#94A3B8]">{t("matrix.best2")}</td>
                    <td className="py-4 px-4 text-[#94A3B8]">{t("matrix.best3")}</td>
                    <td className="py-4 px-4 text-[#94A3B8]">{t("matrix.best4")}</td>
                    <td className="py-4 px-4 text-[#94A3B8]">{t("matrix.best5")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* RISK NOTICE */}
        <section className="py-12 bg-[#090B14] border-t border-[#1C233B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-[#140F12] border border-[#3E1F24] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2.5 text-amber-400 text-sm font-bold uppercase tracking-wider">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <span>{t("risk.title")}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#CBD5E1] leading-relaxed">
                <div>
                  <strong className="text-white block mb-1">{t("risk.r1Title")}</strong>
                  {t("risk.r1Desc")}
                </div>
                <div>
                  <strong className="text-white block mb-1">{t("risk.r2Title")}</strong>
                  {t("risk.r2Desc")}
                </div>
                <div>
                  <strong className="text-white block mb-1">{t("risk.r3Title")}</strong>
                  {t("risk.r3Desc")}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}