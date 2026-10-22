"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Compass,
  Download,
  ExternalLink,
  FileText,
  Search,
  Sparkles,
  Wallet,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { GUIDE_TOPICS, GUIDES_DATA, type GuideTopic } from "@/config/content";
import { AFFILIATE_CONFIG } from "@/config/constants";

const TOPIC_ICONS: Record<GuideTopic["iconName"], LucideIcon> = {
  Compass,
  Wallet,
  Zap,
  ArrowLeftRight,
  Wrench,
};

interface GuidesSectionProps {
  onOpenVideo?: (slug: string) => void;
  onOpenPdf?: () => void;
}

interface LocalizedGuide {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  difficulty: string;
}

interface LocalizedTopic {
  id: GuideTopic["id"];
  iconName: GuideTopic["iconName"];
  title: string;
  description: string;
  badge: string;
  guides: LocalizedGuide[];
}

export default function GuidesSection({ onOpenPdf }: GuidesSectionProps) {
  const t = useTranslations("GuidesSection");
  const locale = useLocale();

  const [selectedTopicId, setSelectedTopicId] = useState<"all" | GuideTopic["id"]>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Localized view model. Falls back to the English strings in config/content.ts
  // when a message key is missing, so a raw key is never rendered.
  const topics = useMemo<LocalizedTopic[]>(() => {
    const tr = (key: string, fallback: string): string =>
      t.has(key as never) ? t(key as never) : fallback;

    const guidesById = new Map<string, LocalizedGuide>();
    for (const guide of GUIDES_DATA) {
      const minutes = Number.parseInt(guide.readTime, 10);
      guidesById.set(guide.id, {
        id: guide.id,
        title: tr(`guides.${guide.id}.title`, guide.title),
        summary: tr(`guides.${guide.id}.summary`, guide.summary),
        readTime: Number.isFinite(minutes) ? t("readTime", { minutes }) : guide.readTime,
        difficulty: tr(`difficulty.${guide.difficulty}`, guide.difficulty),
      });
    }

    return GUIDE_TOPICS.map((topic) => ({
      id: topic.id,
      iconName: topic.iconName,
      title: tr(`topics.${topic.id}.title`, topic.title),
      description: tr(`topics.${topic.id}.description`, topic.description),
      badge: tr(`topics.${topic.id}.badge`, topic.badge ?? t("defaultBadge")),
      guides: topic.guideIds.flatMap((id) => {
        const guide = guidesById.get(id);
        return guide ? [guide] : [];
      }),
    }));
  }, [t]);

  const visibleTopics = useMemo<LocalizedTopic[]>(() => {
    const query = searchQuery.trim().toLocaleLowerCase(locale);
    const matches = (...parts: string[]) =>
      parts.some((part) => part.toLocaleLowerCase(locale).includes(query));

    return topics
      .filter((topic) => selectedTopicId === "all" || topic.id === selectedTopicId)
      .flatMap((topic) => {
        if (!query) return [topic];
        const topicMatches = matches(topic.title, topic.description);
        const guides = topicMatches
          ? topic.guides
          : topic.guides.filter((guide) => matches(guide.title, guide.summary));
        return topicMatches || guides.length > 0 ? [{ ...topic, guides }] : [];
      });
  }, [topics, selectedTopicId, searchQuery, locale]);

  return (
    <section
      id="guides"
      className="py-12 sm:py-20 relative overflow-hidden bg-[#0A0C14] border-t border-[#1E243B]"
    >
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#22D3FF]/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[#7B4FFF]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#22D3FF] shadow-sm">
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t("eyebrow")}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t("titlePrefix")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3FF] via-[#7B4FFF] to-[#A855F7]">
              {t("titleHighlight")}
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* Search + topic filters */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <div className="relative">
            <Search
              className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#838E9E]"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              aria-label={t("searchLabel")}
              id="guides-search-input"
              className="w-full pl-12 pr-16 py-3.5 rounded-2xl bg-[#101322] border border-[#212946] focus:border-[#22D3FF] focus:ring-1 focus:ring-[#22D3FF] text-sm text-white placeholder-[#606E85] outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#838E9E] hover:text-white"
              >
                {t("clearSearch")}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button
              type="button"
              onClick={() => setSelectedTopicId("all")}
              aria-pressed={selectedTopicId === "all"}
              className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                selectedTopicId === "all"
                  ? "bg-[#7B4FFF] text-white shadow-md shadow-[#7B4FFF]/25 font-bold"
                  : "bg-[#131728] text-[#94A3B8] hover:text-white border border-[#222A46]"
              }`}
            >
              {t("allTopics", { count: topics.length })}
            </button>
            {topics.map((topic) => {
              const Icon = TOPIC_ICONS[topic.iconName] ?? BookOpen;
              const isSelected = selectedTopicId === topic.id;
              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopicId(topic.id)}
                  aria-pressed={isSelected}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-[#7B4FFF] text-white shadow-md shadow-[#7B4FFF]/25 font-bold"
                      : "bg-[#131728] text-[#94A3B8] hover:text-white border border-[#222A46]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{topic.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Topic cards */}
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#22D3FF]" aria-hidden="true" />
              <span>{t("topicsHeading")}</span>
            </h3>
            <span className="text-xs text-[#838E9E]" aria-live="polite">
              {t("showingCount", { shown: visibleTopics.length, total: topics.length })}
            </span>
          </div>

          {visibleTopics.length === 0 ? (
            <p className="text-sm text-[#838E9E] text-center py-10">{t("noResults")}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleTopics.map((topic) => {
                const Icon = TOPIC_ICONS[topic.iconName] ?? BookOpen;

                return (
                  <div
                    key={topic.id}
                    id={`topic-card-${topic.id}`}
                    className="bg-[#0E1222] border border-[#202742] hover:border-[#7B4FFF]/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:shadow-[#7B4FFF]/5 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B4FFF]/5 group-hover:bg-[#7B4FFF]/10 blur-2xl rounded-full transition-all pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <Link
                          href={`/guides/${topic.id}`}
                          aria-hidden="true"
                          tabIndex={-1}
                          className="w-12 h-12 rounded-2xl bg-[#161D36] border border-[#263155] group-hover:border-[#7B4FFF] group-hover:bg-[#7B4FFF]/10 flex items-center justify-center text-[#22D3FF] group-hover:text-white transition-all shadow-sm"
                        >
                          <Icon className="w-6 h-6" />
                        </Link>
                        <span className="px-2.5 py-1 rounded-full bg-[#182038] text-[10px] font-bold uppercase tracking-wider text-[#A855F7] border border-[#263155]">
                          {t("guideCount", { count: topic.guides.length })}
                        </span>
                      </div>

                      <Link href={`/guides/${topic.id}`} className="block">
                        <h3 className="text-xl font-bold text-white group-hover:text-[#22D3FF] transition-colors mb-2">
                          {topic.title}
                        </h3>
                      </Link>

                      <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-6">
                        {topic.description}
                      </p>

                      <div className="space-y-2.5 pt-4 border-t border-[#1C233C]">
                        <div className="flex items-center justify-between gap-2 text-[10px] font-bold uppercase tracking-wider text-[#606E85]">
                          <span>{t("guidesInTopic")}</span>
                          <span>{t("clickToRead")}</span>
                        </div>

                        {topic.guides.length === 0 ? (
                          <p className="text-xs text-[#606E85] italic py-2">
                            {t("noMatchingGuides")}
                          </p>
                        ) : (
                          topic.guides.map((guide) => (
                            <Link
                              key={guide.id}
                              href={`/guides/${topic.id}?guide=${guide.id}`}
                              id={`guide-link-${guide.id}`}
                              className="w-full text-left p-2.5 rounded-xl bg-[#13182C] hover:bg-[#1C233E] border border-transparent hover:border-[#2C375D] transition-all flex items-center justify-between group/link"
                            >
                              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                                <FileText
                                  className="w-3.5 h-3.5 text-[#7B4FFF] group-hover/link:text-[#22D3FF] shrink-0"
                                  aria-hidden="true"
                                />
                                <div className="min-w-0">
                                  <div className="text-xs font-medium text-[#CBD5E1] group-hover/link:text-white truncate">
                                    {guide.title}
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] text-[#606E85]">
                                    <span>{guide.readTime}</span>
                                    <span aria-hidden="true">•</span>
                                    <span>{guide.difficulty}</span>
                                  </div>
                                </div>
                              </div>
                              <ChevronRight
                                className="w-4 h-4 text-[#606E85] group-hover/link:text-[#22D3FF] group-hover/link:translate-x-0.5 transition-all shrink-0 rtl:rotate-180"
                                aria-hidden="true"
                              />
                            </Link>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#1C233C]/60 flex items-center justify-between gap-3">
                      <Link
                        href={`/guides/${topic.id}`}
                        id={`explore-topic-btn-${topic.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22D3FF] hover:text-white transition-colors group-hover:underline"
                      >
                        <span>{t("exploreTopic")}</span>
                        <ArrowRight
                          className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </Link>
                      <span className="text-[10px] text-[#606E85]">{topic.badge}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Support banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#12172E] via-[#161D3A] to-[#12172E] border border-[#252F53] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#22D3FF]" aria-hidden="true" />
              <span>{t("supportTitle")}</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#94A3B8]">{t("supportDescription")}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {onOpenPdf && (
              <button
                type="button"
                onClick={onOpenPdf}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B223E] hover:bg-[#232C50] text-[#CBD5E1] text-xs font-semibold border border-[#2B3760] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#22D3FF]" aria-hidden="true" />
                <span>{t("cheatSheet")}</span>
              </button>
            )}

            <a
              href={AFFILIATE_CONFIG.TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#22D3FF] hover:bg-[#1bb8df] text-[#0A0C14] text-xs font-bold transition-all shadow-md shadow-[#22D3FF]/20"
            >
              <span>{t("communitySupport")}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}