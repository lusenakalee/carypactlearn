"use client";

import HeroVideoPlayer from "@/components/HeroVideoPlayer";
import { AFFILIATE_CONFIG, ECOSYSTEM_METRICS, HERO_STATS } from "@/config/constants";
import { useTokenPrices, type TokenPrice } from "@/hooks/useTokenPrices";
import {
    ArrowRight,
    Coins,
    Download,
    Globe2,
    Play,
    TrendingUp,
    Users,
    Zap
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";

interface HeroSectionProps {
  onSelectPrompt: (prompt: string) => void;
  onOpenPdf: () => void;
  onOpenVideo: (guideSlug?: string) => void;
}

export default function HeroSection({
  onSelectPrompt,
  onOpenPdf,
  onOpenVideo
}: HeroSectionProps) {
  const [searchInput, setSearchInput] = useState("");
  const tHero = useTranslations("hero");
  const tCommon = useTranslations("common");
  const tLive = useTranslations("live");
  const tCalc = useTranslations("calculator");
  const locale = useLocale();
  const { ca, bot, loading } = useTokenPrices();

  const suggestedPrompts = [
    { label: tHero("chip1"), query: tHero("prompt1") },
    { label: tHero("chip2"), query: tHero("prompt2") },
    { label: tHero("chip3"), query: tHero("prompt3") },
    { label: tHero("chip4"), query: tHero("prompt4") },
  ];

  const caSupplyCompact = new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(ECOSYSTEM_METRICS.TOTAL_CA_SUPPLY);

  // CA per BOT ratio derived from the two market quotes; shown only when both are live.
  const parity =
    ca?.status === "live" && bot?.status === "live" && ca.price && bot.price
      ? ca.price / bot.price
      : null;
  const formatRate = (v: number) =>
    new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 6 }).format(v);

  const formatPrice = (p: TokenPrice & { price: number }) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: p.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: p.price < 1 ? 6 : 4,
    }).format(p.price);

  const renderPrice = (label: string, p: TokenPrice | null) => {
    const hasPrice = p !== null && p.price !== null;
    const updated =
      p?.updatedAt
        ? tHero("priceUpdated", {
            time: new Intl.DateTimeFormat(locale, { dateStyle: "short", timeStyle: "short" }).format(
              new Date(p.updatedAt)
            ),
          })
        : undefined;
    return (
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#131728]/80 border border-[#1E243B] text-xs backdrop-blur-sm"
        title={updated}
      >
        <span className="text-[#838E9E] font-medium">{label}</span>
        <span className="font-bold text-white tabular-nums">
          {loading && !p
            ? tCommon("loading")
            : hasPrice
              ? formatPrice(p as TokenPrice & { price: number })
              : tHero("priceNA")}
        </span>
        {p?.status === "stale" && (
          <span className="text-[10px] uppercase text-amber-400">{tCalc("priceStale")}</span>
        )}
        {hasPrice && p.source && (
          <span className="text-[10px] text-[#838E9E]">{tHero("priceVia", { source: p.source })}</span>
        )}
      </div>
    );
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSelectPrompt(searchInput.trim());
      setSearchInput("");
    }
  };

  return (
    <section id="home" className="relative pt-8 pb-12 lg:pt-14 lg:pb-16 overflow-hidden bg-dot-grid">
      {/* Radiant Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#22D3FF]/15 via-[#7B4FFF]/20 to-[#A855F7]/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-[#22D3FF]/10 blur-[90px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-[#A855F7]/10 blur-[90px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Floating Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131728]/90 border border-[#2A314D] shadow-inner text-xs font-medium text-[#C4CBD8] backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3FF] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22D3FF]"></span>
            </span>
            <span>{tHero("badge")}</span>
            <span className="text-[#838E9E]">•</span>
            <span className="text-[#22D3FF] font-semibold">BOT Chain Layer 1</span>
          </div>
        </div>

        {/* Hero Headline & Subheading */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            {tHero("titlePrefix")} <span className="text-brand-gradient">{tHero("titleHighlight")}</span> {tHero("titleSuffix")}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-[#C4CBD8] max-w-3xl mx-auto font-normal leading-relaxed">
            {tHero("description")}
          </p>

          {/* Core Trust & Ecosystem Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 pb-4 max-w-3xl mx-auto">
            <div className="bg-[#131728]/80 border border-[#1E243B] p-3 rounded-xl text-center backdrop-blur-sm">
              <div className="text-xs text-[#838E9E] font-medium flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#22D3FF]" />
                <span>{tHero("communityLabel")}</span>
              </div>
              <div className="text-lg font-bold text-white mt-0.5">{ECOSYSTEM_METRICS.GLOBAL_USERS}</div>
              <div className="text-[10px] text-[#22D3FF]">{tHero("countries", { count: ECOSYSTEM_METRICS.COUNTRIES_ACTIVE })}</div>
            </div>

            <div className="bg-[#131728]/80 border border-[#1E243B] p-3 rounded-xl text-center backdrop-blur-sm">
              <div className="text-xs text-[#838E9E] font-medium flex items-center justify-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-[#A855F7]" />
                <span>{tHero("botSupplyLabel")}</span>
              </div>
              <div className="text-lg font-bold text-white mt-0.5">{HERO_STATS.BOT_HEADLINE_VALUE}</div>
              <div className="text-[10px] text-[#A855F7]">{HERO_STATS.BOT_HEADLINE_PARTNERS}</div>
            </div>

            <div className="bg-[#131728]/80 border border-[#1E243B] p-3 rounded-xl text-center backdrop-blur-sm">
              <div className="text-xs text-[#838E9E] font-medium flex items-center justify-center gap-1">
                <Coins className="w-3.5 h-3.5 text-[#7B4FFF]" />
                <span>{tHero("maxCaSupplyLabel")}</span>
              </div>
              <div className="text-lg font-bold text-white mt-0.5">{caSupplyCompact}</div>
              <div className="text-[10px] text-[#7B4FFF]">{tHero("emissionYears", { years: ECOSYSTEM_METRICS.TOTAL_EMISSION_YEARS })}</div>
            </div>

            <div className="bg-[#131728]/80 border border-[#1E243B] p-3 rounded-xl text-center backdrop-blur-sm">
              <div className="text-xs text-[#838E9E] font-medium flex items-center justify-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>{tHero("officeNetworkLabel")}</span>
              </div>
              <div className="text-lg font-bold text-white mt-0.5">{ECOSYSTEM_METRICS.OFFICE_NETWORK}</div>
              <div className="text-[10px] text-emerald-400">{tHero("officeBreakdown", { studios: HERO_STATS.OFFICE_STUDIOS, hubs: HERO_STATS.OFFICE_HUBS })}</div>
            </div>
          </div>

          {/* Live Market Prices (server-cached routes; stale/unavailable states shown explicitly) */}
          <div className="flex flex-wrap items-center justify-center gap-3 pb-2" aria-live="polite">
            {renderPrice(tLive("caPrice"), ca)}
            {renderPrice(tLive("botPrice"), bot)}
          </div>

          {/* Interactive AI Question / Search Bar */}
          {/* <div className="pt-2 max-w-2xl mx-auto">
            <form 
              onSubmit={handleSearchSubmit} 
              id="hero-ai-search-form"
              className="relative flex items-center rounded-2xl bg-[#0E1020] border-2 border-[#2A314D] focus-within:border-[#7B4FFF] p-1.5 shadow-2xl shadow-[#7B4FFF]/10 transition-all duration-300"
            >
              <div className="pl-3.5 pr-2 text-[#22D3FF]">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Ask anything about CaryPact, BOT Chain, Staking, Hashrate..."
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-[#838E9E] focus:outline-none px-2 py-2"
                id="hero-search-input"
              />
              <button
                type="submit"
                id="hero-ask-ai-btn"
                className="flex-shrink-0 bg-gradient-to-r from-[#7B4FFF] to-[#A855F7] hover:opacity-90 active:scale-95 text-white text-xs font-bold uppercase tracking-wider px-4 sm:px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <span>Ask AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

           Quick Topic Chips 
            <div className="flex items-center justify-center gap-1.5 flex-wrap mt-3 text-xs">
              <span className="text-[11px] text-[#838E9E] font-medium mr-1">{tHero("searchHeading")}</span>
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectPrompt(p.query)}
                  className="px-2.5 py-1 rounded-lg bg-[#131728] hover:bg-[#1E243B] border border-[#1E243B] text-[#C4CBD8] hover:text-[#22D3FF] text-[11px] font-medium transition-colors cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div> */}

          {/* Quick Action Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <a
              href="/live-data"
              id="hero-live-data-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1020] hover:bg-[#131728] text-white text-xs font-bold border border-[#22D3FF]/40 text-[#22D3FF] transition-all shadow-lg shadow-[#22D3FF]/10"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>
                {tHero("ctaLiveMarket")}
                {parity !== null && ` (${tHero("parityInline", { rate: formatRate(parity) })})`}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => onOpenVideo("getting-started")}
              id="hero-video-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#131728] hover:bg-[#1C1F2E] text-white text-xs font-semibold border border-[#2A314D] transition-colors shadow-sm cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-[#22D3FF]/20 flex items-center justify-center text-[#22D3FF]">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </div>
              <span>{tCommon("watchVideo")}</span>
            </button>

            <button
              onClick={onOpenPdf}
              id="hero-download-pdf-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#131728] hover:bg-[#1C1F2E] text-[#C4CBD8] hover:text-white text-xs font-semibold border border-[#2A314D] transition-colors shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#A855F7]" />
              <span>{tCommon("downloadPdf")}</span>
            </button>

            <a
              href={AFFILIATE_CONFIG.APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="hero-register-cta-btn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#7B4FFF]/25"
            >
              <Zap className="w-4 h-4 text-[#22D3FF]" />
              <span>{tCommon("register")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Embedded Official Protocol Video Showcase */}
          <div className="pt-6 sm:pt-8 w-full max-w-4xl mx-auto">
            <HeroVideoPlayer />
          </div>
        </div>
      </div>
    </section>
  );
}