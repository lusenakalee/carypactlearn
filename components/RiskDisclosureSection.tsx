"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ShieldAlert, CheckCircle2, ExternalLink, Info } from "lucide-react";
import { AFFILIATE_CONFIG, ECOSYSTEM_METRICS, EMISSION_SPLIT, VIP_TIERS } from "@/config/constants";

// All user-facing copy lives in messages/*.json under "riskDisclosure".
// Numbers are injected from constants so every language shows the same, current values.
const RISK_ITEM_KEYS = ["permanence", "volatility", "projections", "referral", "slippage", "custody"] as const;
const CHECKLIST_DOTS = ["bg-[#22D3FF]", "bg-[#A855F7]", "bg-[#7B4FFF]", "bg-amber-400", "bg-emerald-400", "bg-rose-400"] as const;

export default function RiskDisclosureSection() {
  const t = useTranslations("riskDisclosure");

  const values = {
    minUsdt: ECOSYSTEM_METRICS.MINIMUM_HASHRATE_USDT,
    dailyPool: EMISSION_SPLIT[1].dailyCA, // Active Reward Pool
    personalUsdt: VIP_TIERS[0].personalUSDT, // V1 personal requirement
    slippage: ECOSYSTEM_METRICS.SLIPPAGE_FEE_PERCENT,
    buyback: ECOSYSTEM_METRICS.BUYBACK_PERCENT,
    node: ECOSYSTEM_METRICS.NODE_OPERATOR_PERCENT,
  };

  return (
    <section id="risks" className="py-14 sm:py-20 relative overflow-hidden bg-[#0A0C14] border-t border-[#1E243B]">
      {/* Background Accent */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{t("badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.rich("title", {
              hl: (chunks) => <span className="text-brand-gradient">{chunks}</span>,
            })}
          </h2>
          <p className="text-sm sm:text-base text-[#C4CBD8]">{t("subtitle")}</p>
        </div>

        {/* Affiliate Disclosure Card */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-3xl p-6 sm:p-8 mb-8 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7B4FFF]/20 text-[#22D3FF] flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">{t("affiliate.title")}</h3>
              <p className="text-xs text-[#838E9E]">{t("affiliate.subtitle")}</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#C4CBD8] leading-relaxed">
            {t.rich("affiliate.body", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>

        {/* 6 Core Risk Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {RISK_ITEM_KEYS.map((key, idx) => (
            <div
              key={key}
              className="bg-[#0E1020] border border-[#1E243B] hover:border-amber-500/40 rounded-2xl p-5 sm:p-6 space-y-3 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-[#131728] text-amber-300 border border-amber-500/20">
                  {t(`items.${key}.category`)}
                </span>
                <span className="text-[10px] font-bold text-[#838E9E]">{t(`items.${key}.severity`)}</span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-white">
                {idx + 1}. {t(`items.${key}.title`, values)}
              </h4>
              <p className="text-xs text-[#C4CBD8] leading-relaxed">{t(`items.${key}.description`, values)}</p>
            </div>
          ))}
        </div>

        {/* DYOR (Do Your Own Research) Checklist */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-3xl p-6 sm:p-8 space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>{t("checklist.title")}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-[#C4CBD8] pt-2">
            {CHECKLIST_DOTS.map((dot, i) => (
              <div
                key={i}
                className="bg-[#0A0C14] p-3.5 rounded-xl border border-[#1E243B] flex items-start gap-2"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${dot} mt-1.5 flex-shrink-0`} />
                <span>{t(`checklist.check${i + 1}`, values)}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#1E243B]">
            <span className="text-xs text-[#838E9E]">{t("cta.ready")}</span>
            <a
              href={AFFILIATE_CONFIG.APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#7B4FFF]/25 transition-all"
            >
              <span>{t("cta.button")}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}