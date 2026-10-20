"use client";

import { AFFILIATE_CONFIG } from "@/config/constants";
import {
  Bot,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Coins,
  Copy,
  Cpu,
  ExternalLink,
  Globe2,
  HelpCircle,
  Layers,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";

export type FaqCategory =
  | "tokenomics"
  | "ecosystem"
  | "mining"
  | "vip"
  | "security"
  | "global";

export interface FaqItem {
  id: string;
  category: FaqCategory;
  categoryLabel: string;
  question: string;
  seoKeywords: string[];
  geoTags?: string[];
  summary: string;
  answerParagraphs: string[];
}

/**
 * Language-neutral structure only. All visible text lives in the locale
 * files under the "LearnFaq" namespace: LearnFaq.items.<id>.{question,summary,keywords,geoTags,answer}
 */
const FAQ_META: { id: string; category: FaqCategory }[] = [
  { id: "inflation-elimination", category: "tokenomics" },
  { id: "candlestick-stability", category: "tokenomics" },
  { id: "wbot-holders-price-growth", category: "tokenomics" },
  { id: "why-invest-differentiation", category: "tokenomics" },

  { id: "bot-price-project-owners", category: "ecosystem" },
  { id: "bot-ecosystem-roadmap", category: "ecosystem" },
  { id: "bohr-to-bot-rebrand", category: "ecosystem" },
  { id: "verify-150m-bot-supply", category: "ecosystem" },

  { id: "mining-machine-pricing", category: "mining" },
  { id: "mining-machine-manufacturer", category: "mining" },
  { id: "tier-1-mining-operators", category: "mining" },
  { id: "carypact-compute-vs-bot-rigs", category: "mining" },
  { id: "hashrate-supply-servers", category: "mining" },

  { id: "v4-earnings-differential", category: "vip" },
  { id: "same-rank-bonus-distribution", category: "vip" },
  { id: "time-compensation-mechanism", category: "vip" },
  { id: "dynamic-weight-v1-v10", category: "vip" },

  { id: "wallet-hacked-recovery", category: "security" },
  { id: "bo-wallet-vs-tokenpocket", category: "security" },

  { id: "headquarters-global-offices", category: "global" },
  { id: "why-not-registered-company", category: "global" },
  { id: "cmc-coingecko-volume-changes", category: "global" },
  { id: "ca-card-mobile-roadmap", category: "global" },
];

const CATEGORY_TABS = [
  { id: "all", icon: HelpCircle },
  { id: "tokenomics", icon: Coins },
  { id: "ecosystem", icon: Layers },
  { id: "mining", icon: Cpu },
  { id: "vip", icon: TrendingUp },
  { id: "security", icon: ShieldCheck },
  { id: "global", icon: Building2 },
] as const;

/** Returns the FAQ list translated into the active locale (reuse anywhere you used FAQ_DATA). */
export function useFaqData(): FaqItem[] {
  const t = useTranslations("LearnFaq");

  return useMemo(
    () =>
      FAQ_META.map(({ id, category }) => {
        // t.raw skips ICU parsing, so apostrophes/braces in long copy are safe
        const geo = t.raw(`items.${id}.geoTags`) as string[] | undefined;
        return {
          id,
          category,
          categoryLabel: t(`categories.${category}.badge`),
          question: t.raw(`items.${id}.question`) as string,
          summary: t.raw(`items.${id}.summary`) as string,
          seoKeywords: t.raw(`items.${id}.keywords`) as string[],
          geoTags: Array.isArray(geo) ? geo : undefined,
          answerParagraphs: t.raw(`items.${id}.answer`) as string[],
        };
      }),
    [t]
  );
}

export default function LearnFaqSection() {
  const t = useTranslations("LearnFaq");
  const locale = useLocale();
  const faqs = useFaqData();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>("inflation-elimination");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(
    () =>
      CATEGORY_TABS.map(({ id, icon }) => ({
        id,
        icon,
        label: t(`categories.${id}.tab`),
        count: id === "all" ? faqs.length : faqs.filter((f) => f.category === id).length,
      })),
    [faqs, t]
  );

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLocaleLowerCase(locale);
    const has = (s: string) => s.toLocaleLowerCase(locale).includes(q);

    return faqs.filter((faq) => {
      if (selectedCategory !== "all" && faq.category !== selectedCategory) return false;
      if (!q) return true;

      return (
        has(faq.question) ||
        has(faq.summary) ||
        faq.seoKeywords.some(has) ||
        !!faq.geoTags?.some(has) ||
        faq.answerParagraphs.some(has)
      );
    });
  }, [faqs, selectedCategory, searchQuery, locale]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCopyLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}#faq-${id}`;
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleExpandAll = () => {
    setExpandedId((prev) => (prev === "all_open" ? null : "all_open"));
  };

  // Structured Data (JSON-LD) for SEO Rich Snippets — localized per page language
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: faqs.slice(0, 15).map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answerParagraphs.join(" "),
      },
    })),
  };

  return (
    <section id="faq" className="py-16 sm:py-24 relative overflow-hidden bg-[#070914] border-t border-[#1C233B]">
      {/* JSON-LD Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Radiant Background Ambient Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#22D3FF]/10 via-[#7B4FFF]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11162C] border border-[#232D50] text-xs font-semibold text-[#22D3FF] shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("badge")}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t.rich("title", {
              hl: (chunks) => (
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3FF] via-[#7B4FFF] to-[#A855F7]">
                  {chunks}
                </span>
              ),
            })}
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">{t("description")}</p>
        </div>

        {/* Search & Action Bar */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Live Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#838E9E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              id="faq-search-input"
              className="w-full pl-12 pr-24 py-3.5 rounded-2xl bg-[#101322] border border-[#212946] focus:border-[#22D3FF] focus:ring-1 focus:ring-[#22D3FF] text-sm text-white placeholder-[#606E85] outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#838E9E] hover:text-white transition-colors"
              >
                {t("clear")}
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  id={`faq-tab-${cat.id}`}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-[#7B4FFF] text-white shadow-md shadow-[#7B4FFF]/25 font-bold"
                      : "bg-[#111528] text-[#94A3B8] hover:text-white border border-[#1E2644]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isSelected ? "bg-white/20 text-white" : "bg-[#182038] text-[#8EA2C6]"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Stats & Expand All Control */}
          <div className="flex items-center justify-between text-xs text-[#838E9E] pt-1 px-1">
            <span>
              {t.rich("showing", {
                shown: filteredFaqs.length,
                total: faqs.length,
                strong: (chunks) => <strong className="text-white">{chunks}</strong>,
              })}
            </span>
            <button
              onClick={handleExpandAll}
              className="text-[#22D3FF] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>{expandedId === "all_open" ? t("collapseAll") : t("expandAll")}</span>
            </button>
          </div>
        </div>

        {/* Modern Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-[#0E1222] border border-[#1E2540] rounded-3xl p-8 space-y-3">
              <HelpCircle className="w-10 h-10 text-[#606E85] mx-auto" />
              <h4 className="text-base font-bold text-white">{t("emptyTitle")}</h4>
              <p className="text-xs text-[#94A3B8]">
                {t("emptyHint", { all: t("categories.all.tab") })}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-2 px-4 py-2 rounded-xl bg-[#171D33] text-xs font-semibold text-[#22D3FF] hover:bg-[#202844] transition-colors"
              >
                {t("resetFilters")}
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = expandedId === "all_open" || expandedId === faq.id;

              return (
                <div
                  key={faq.id}
                  id={`faq-${faq.id}`}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-[#0F1428] border-[#2E3B66] shadow-xl shadow-black/40 ring-1 ring-[#7B4FFF]/30"
                      : "bg-[#0B0E1E] border-[#1C233C] hover:border-[#2C375D] hover:bg-[#0E1224]"
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-2 flex-grow">
                      {/* Top Badges: Category & Geo tags */}
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#161D36] text-[#22D3FF] border border-[#232F52]">
                          {faq.categoryLabel}
                        </span>

                        {faq.geoTags?.map((geo) => (
                          <span
                            key={geo}
                            className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          >
                            <Globe2 className="w-2.5 h-2.5" />
                            <span>{geo}</span>
                          </span>
                        ))}
                      </div>

                      {/* Question Headline */}
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#22D3FF] transition-colors">
                        <span className="text-[#8EA2C6] mr-2 font-mono text-sm font-normal">
                          {String(index + 1).padStart(2, "0")}.
                        </span>
                        {faq.question}
                      </h3>

                      {/* Brief Executive Summary */}
                      {!isOpen && (
                        <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed pt-1">
                          {faq.summary}
                        </p>
                      )}
                    </div>

                    {/* Right Chevron & Copy Button */}
                    <div className="flex items-center gap-1 shrink-0 pt-1">
                      <button
                        onClick={(e) => handleCopyLink(faq.id, e)}
                        title={t("copyLink")}
                        aria-label={t("copyLink")}
                        className="p-1.5 rounded-lg text-[#606E85] hover:text-white hover:bg-[#161D36] transition-colors"
                      >
                        {copiedId === faq.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <div
                        className={`w-8 h-8 rounded-xl bg-[#141A30] border border-[#222B48] flex items-center justify-center text-[#8EA2C6] transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-white bg-[#7B4FFF]" : ""
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {/* Accordion Expandable Content */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#1C243F] space-y-4">
                      {/* SEO Keywords Pills Bar */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-2">
                        <span className="text-[10px] uppercase font-mono font-semibold text-[#606E85] mr-1">
                          {t("keyTopics")}
                        </span>
                        {faq.seoKeywords.map((kw) => (
                          <span
                            key={kw}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#13192F] text-[#CBD5E1] border border-[#222C4E]"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>

                      {/* Answer Paragraphs */}
                      <div className="space-y-3 text-xs sm:text-sm text-[#C4CBD8] leading-relaxed bg-[#0B0E1D] p-4 sm:p-5 rounded-xl border border-[#1A223C]">
                        {faq.answerParagraphs.map((para, pIdx) => (
                          <p key={pIdx} className="leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>

                      {/* Bottom Micro Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#838E9E]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{t("verifiedDocs")}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <a
                            href={AFFILIATE_CONFIG.TELEGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#22D3FF] hover:underline flex items-center gap-1"
                          >
                            <span>{t("discuss")}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Global Support Callout Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#10152B] via-[#151C3A] to-[#10152B] border border-[#242F54] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl max-w-4xl mx-auto">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Bot className="w-5 h-5 text-[#22D3FF]" />
              <span>{t("supportTitle")}</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl">{t("supportText")}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={AFFILIATE_CONFIG.TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#22D3FF] hover:bg-[#1bb8df] text-[#070913] text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#22D3FF]/20"
            >
              <span>{t("supportCta")}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}