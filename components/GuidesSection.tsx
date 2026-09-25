"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  Compass,
  Wallet, 
  Zap, 
  ArrowLeftRight, 
  Wrench, 
  FileText, 
  ChevronRight, 
  ArrowRight, 
  Download, 
  Sparkles, 
  ExternalLink, 
  Search,
  Clock,
  Layers
} from "lucide-react";
import { GUIDE_TOPICS, GUIDES_DATA, GuideArticle } from "@/config/content";
import { AFFILIATE_CONFIG } from "@/config/constants";

interface GuidesSectionProps {
  onOpenVideo?: (slug: string) => void;
  onOpenPdf?: () => void;
}

export default function GuidesSection({ onOpenVideo, onOpenPdf }: GuidesSectionProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass": return Compass;
      case "Wallet": return Wallet;
      case "Zap": return Zap;
      case "ArrowLeftRight": return ArrowLeftRight;
      case "Wrench": return Wrench;
      default: return BookOpen;
    }
  };

  // Filter topics based on active tab and search query
  const filteredTopics = useMemo(() => {
    return GUIDE_TOPICS.filter((topic) => {
      if (selectedTopicId !== "all" && topic.id !== selectedTopicId) {
        return false;
      }
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const topicMatches = topic.title.toLowerCase().includes(q) || topic.description.toLowerCase().includes(q);
      const hasMatchingGuide = topic.guideIds.some((gId) => {
        const guide = GUIDES_DATA.find((g) => g.id === gId);
        return guide && (guide.title.toLowerCase().includes(q) || guide.summary.toLowerCase().includes(q));
      });
      return topicMatches || hasMatchingGuide;
    });
  }, [selectedTopicId, searchQuery]);

  // Guides inside an active topic or filtered list
  const getGuidesForTopic = (guideIds: string[]) => {
    return guideIds
      .map((id) => GUIDES_DATA.find((g) => g.id === id))
      .filter((g): g is GuideArticle => {
        if (!g) return false;
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return g.title.toLowerCase().includes(q) || g.summary.toLowerCase().includes(q);
      });
  };

  return (
    <section id="guides" className="py-12 sm:py-20 relative overflow-hidden bg-[#0A0C14] border-t border-[#1E243B]">
      {/* Background Ambient Glows */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#22D3FF]/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[#7B4FFF]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header: Help Center Style */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#22D3FF] shadow-sm">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Help Center & Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Guides & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3FF] via-[#7B4FFF] to-[#A855F7]">Tutorials</span>
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Everything you need to master CaryPact and BOT Chain — select a topic card below to explore step-by-step tutorials, hashrate activation, PoS staking multipliers, and cross-chain withdrawals.
          </p>
        </div>

        {/* Search & Topic Tabs Bar */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Search Input Box */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#838E9E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, e.g., 'TokenPocket', 'hashrate', 'staking', 'bridge', 'slippage'..."
              id="guides-search-input"
              className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#101322] border border-[#212946] focus:border-[#22D3FF] focus:ring-1 focus:ring-[#22D3FF] text-sm text-white placeholder-[#606E85] outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#838E9E] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Topic Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button
              onClick={() => setSelectedTopicId("all")}
              className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                selectedTopicId === "all"
                  ? "bg-[#7B4FFF] text-white shadow-md shadow-[#7B4FFF]/25 font-bold"
                  : "bg-[#131728] text-[#94A3B8] hover:text-white border border-[#222A46]"
              }`}
            >
              All Topics ({GUIDE_TOPICS.length})
            </button>
            {GUIDE_TOPICS.map((topic) => {
              const Icon = getTopicIcon(topic.iconName);
              const isSelected = selectedTopicId === topic.id;
              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-[#7B4FFF] text-white shadow-md shadow-[#7B4FFF]/25 font-bold"
                      : "bg-[#131728] text-[#94A3B8] hover:text-white border border-[#222A46]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{topic.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Topic Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#22D3FF]" />
              <span>Categorized Help Topics</span>
            </h3>
            <span className="text-xs text-[#838E9E]">
              Showing {filteredTopics.length} of {GUIDE_TOPICS.length} Categories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic) => {
              const Icon = getTopicIcon(topic.iconName);
              const guides = getGuidesForTopic(topic.guideIds);

              return (
                <div
                  key={topic.id}
                  id={`topic-card-${topic.id}`}
                  className="bg-[#0E1222] border border-[#202742] hover:border-[#7B4FFF]/60 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:shadow-[#7B4FFF]/5 relative overflow-hidden"
                >
                  {/* Subtle Top Glow on Hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#7B4FFF]/5 group-hover:bg-[#7B4FFF]/10 blur-2xl rounded-full transition-all pointer-events-none" />

                  <div>
                    {/* Topic Header with Link */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <Link 
                        href={`/guides/${topic.id}`}
                        className="w-12 h-12 rounded-2xl bg-[#161D36] border border-[#263155] group-hover:border-[#7B4FFF] group-hover:bg-[#7B4FFF]/10 flex items-center justify-center text-[#22D3FF] group-hover:text-white transition-all shadow-sm"
                      >
                        <Icon className="w-6 h-6" />
                      </Link>
                      <span className="px-2.5 py-1 rounded-full bg-[#182038] text-[10px] font-bold uppercase tracking-wider text-[#A855F7] border border-[#263155]">
                        {guides.length} {guides.length === 1 ? "Guide" : "Guides"}
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

                    {/* Guides Links List under Topic */}
                    <div className="space-y-2.5 pt-4 border-t border-[#1C233C]">
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#606E85]">
                        <span>Guides in this Topic</span>
                        <span>Click to read</span>
                      </div>
                      
                      {guides.length === 0 ? (
                        <p className="text-xs text-[#606E85] italic py-2">No matching guides found.</p>
                      ) : (
                        guides.map((guide) => (
                          <Link
                            key={guide.id}
                            href={`/guides/${topic.id}?guide=${guide.id}`}
                            id={`guide-link-${guide.id}`}
                            className="w-full text-left p-2.5 rounded-xl bg-[#13182C] hover:bg-[#1C233E] border border-transparent hover:border-[#2C375D] transition-all flex items-center justify-between group/link"
                          >
                            <div className="flex items-center gap-2.5 min-w-0 pr-2">
                              <FileText className="w-3.5 h-3.5 text-[#7B4FFF] group-hover/link:text-[#22D3FF] shrink-0" />
                              <div className="min-w-0">
                                <div className="text-xs font-medium text-[#CBD5E1] group-hover/link:text-white truncate">
                                  {guide.title}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-[#606E85]">
                                  <span>{guide.readTime}</span>
                                  <span>•</span>
                                  <span>{guide.difficulty}</span>
                                </div>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#606E85] group-hover/link:text-[#22D3FF] group-hover/link:translate-x-0.5 transition-all shrink-0" />
                          </Link>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Card Footer Button leading to /guides/slug */}
                  <div className="pt-6 mt-6 border-t border-[#1C233C]/60 flex items-center justify-between">
                    <Link
                      href={`/guides/${topic.id}`}
                      id={`explore-topic-btn-${topic.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22D3FF] hover:text-white transition-colors group-hover:underline"
                    >
                      <span>Explore Topic</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <span className="text-[10px] text-[#606E85]">
                      {topic.badge || "Verified"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Help & Support Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#12172E] via-[#161D3A] to-[#12172E] border border-[#252F53] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#22D3FF]" />
              <span>Can&apos;t find what you&apos;re looking for?</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Ask our CaryPact AI Assistant in real-time or download the complete 3-minute PDF cheat sheet for offline reference.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {onOpenPdf && (
              <button
                onClick={onOpenPdf}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1B223E] hover:bg-[#232C50] text-[#CBD5E1] text-xs font-semibold border border-[#2B3760] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#22D3FF]" />
                <span>Cheat Sheet (PDF)</span>
              </button>
            )}

            <a
              href={AFFILIATE_CONFIG.TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#22D3FF] hover:bg-[#1bb8df] text-[#0A0C14] text-xs font-bold transition-all shadow-md shadow-[#22D3FF]/20"
            >
              <span>Community Support</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
