"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { 
  BookOpen, 
  ArrowLeft, 
  ArrowRight,
  Compass, 
  Wallet, 
  Zap, 
  ArrowLeftRight, 
  Wrench, 
  FileText, 
  CheckCircle2, 
  Play, 
  Download, 
  AlertTriangle, 
  Sparkles, 
  ExternalLink, 
  Check, 
  Share2, 
  Bot,
  ChevronRight,
  Clock,
  Layers,
  HelpCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AffiliateDisclaimerBanner from "@/components/AffiliateDisclaimerBanner";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import PdfCheatSheetModal from "@/components/PdfCheatSheetModal";
import AiAssistantModal from "@/components/AiAssistantModal";
import NewsletterModal from "@/components/NewsletterModal";
import { useAppLocale } from "@/components/LocaleProvider";
import { GUIDE_TOPICS, GUIDES_DATA, GuideArticle, GuideTopic } from "@/config/content";
import { AFFILIATE_CONFIG } from "@/config/constants";

function TopicIcon({ name, className }: { name: string; className?: string }) {
  let Icon = BookOpen;
  switch (name) {
    case "Compass": Icon = Compass; break;
    case "Wallet": Icon = Wallet; break;
    case "Zap": Icon = Zap; break;
    case "ArrowLeftRight": Icon = ArrowLeftRight; break;
    case "Wrench": Icon = Wrench; break;
    default: Icon = BookOpen; break;
  }
  return <Icon className={className} />;
}

function TopicGuidesContent() {
  const { locale, setLocale } = useAppLocale();
  const params = useParams();
  const searchParams = useSearchParams();

  const slugParam = (params?.slug as string) || "getting-started";
  const guideQuery = searchParams.get("guide");

  // Modals state
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoGuideSlug, setVideoGuideSlug] = useState("getting-started");
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiInitialQuestion, setAiInitialQuestion] = useState("");
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  // Resolve Topic and Guide:
  // 1. Check if slugParam matches a GuideTopic
  // 2. Or if slugParam matches a GuideArticle directly
  const { currentTopic, initialGuide } = useMemo(() => {
    const matchedTopic = GUIDE_TOPICS.find((t) => t.id === slugParam);
    if (matchedTopic) {
      // Find requested guide or default to first in topic
      let guide: GuideArticle | undefined;
      if (guideQuery) {
        guide = GUIDES_DATA.find((g) => g.id === guideQuery || g.slug === guideQuery);
      }
      if (!guide) {
        guide = GUIDES_DATA.find((g) => g.id === matchedTopic.guideIds[0]);
      }
      return { currentTopic: matchedTopic, initialGuide: guide || GUIDES_DATA[0] };
    }

    // Maybe slugParam is a guide ID or slug directly?
    const matchedGuide = GUIDES_DATA.find((g) => g.id === slugParam || g.slug === slugParam);
    if (matchedGuide) {
      const topic = GUIDE_TOPICS.find((t) => t.id === matchedGuide.topicId) || GUIDE_TOPICS[0];
      return { currentTopic: topic, initialGuide: matchedGuide };
    }

    // Fallback default
    return { currentTopic: GUIDE_TOPICS[0], initialGuide: GUIDES_DATA[0] };
  }, [slugParam, guideQuery]);

  // Guides that belong to the current topic
  const topicGuides = useMemo(() => {
    return currentTopic.guideIds
      .map((id) => GUIDES_DATA.find((g) => g.id === id))
      .filter((g): g is GuideArticle => g !== undefined);
  }, [currentTopic]);

  // Selected guide state within current topic
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);

  const activeGuide: GuideArticle = useMemo(() => {
    if (selectedGuideId) {
      const match = topicGuides.find((g) => g.id === selectedGuideId);
      if (match) return match;
    }
    return initialGuide;
  }, [selectedGuideId, topicGuides, initialGuide]);

  // Sibling guide navigation
  const currentGuideIndex = topicGuides.findIndex((g) => g.id === activeGuide.id);
  const prevGuide = currentGuideIndex > 0 ? topicGuides[currentGuideIndex - 1] : null;
  const nextGuide = currentGuideIndex < topicGuides.length - 1 ? topicGuides[currentGuideIndex + 1] : null;

  // Other topics for explore section
  const otherTopics = useMemo(() => {
    return GUIDE_TOPICS.filter((t) => t.id !== currentTopic.id);
  }, [currentTopic.id]);

  const toggleStep = (stepIdx: number) => {
    const key = `${activeGuide.id}-${stepIdx}`;
    setCompletedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = activeGuide.steps.filter((_, idx) => !!completedSteps[`${activeGuide.id}-${idx}`]).length;

  const handleShareGuide = () => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/guides/${currentTopic.id}?guide=${activeGuide.id}`;
      navigator.clipboard.writeText(url);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const handleOpenVideo = (slug?: string) => {
    setVideoGuideSlug(slug || activeGuide.slug || "getting-started");
    setVideoModalOpen(true);
  };

  const handleAskAi = (question: string) => {
    setAiInitialQuestion(question);
    setAiModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0C14] text-[#C4CBD8] flex flex-col font-sans selection:bg-[#22D3FF]/20 selection:text-[#22D3FF]">
      {/* Top Affiliate Disclaimer */}
      <AffiliateDisclaimerBanner />

      {/* Main Navbar */}
      <Navbar 
        currentLang={locale}
        onLanguageChange={setLocale}
        onOpenSearch={() => {
          setAiInitialQuestion("");
          setAiModalOpen(true);
        }}
        onOpenNewsletter={() => setNewsletterModalOpen(true)}
      />

      <main className="flex-grow">
        {/* Topic Hero & Header */}
        <section className="relative py-10 sm:py-16 bg-gradient-to-b from-[#0F1426] via-[#0D101E] to-[#0A0C14] border-b border-[#1E2540] overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#22D3FF]/10 blur-[130px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7B4FFF]/10 blur-[130px] pointer-events-none rounded-full" />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#8EA2C6] mb-6 flex-wrap">
              <Link 
                href="/#home" 
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Home</span>
              </Link>
              <span>/</span>
              <Link 
                href="/guides" 
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Guides & Tutorials</span>
              </Link>
              <span>/</span>
              <span className="text-[#22D3FF] font-semibold">{currentTopic.title}</span>
            </nav>

            {/* Topic Information Box */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161D36] border border-[#273255] text-xs font-semibold text-[#22D3FF] shadow-sm">
                  <TopicIcon name={currentTopic.iconName} className="w-3.5 h-3.5 text-[#22D3FF]" />
                  <span>Topic Category • {currentTopic.badge || "Verified Module"}</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                  {currentTopic.title}
                </h1>
                
                <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                  {currentTopic.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-[#8EA2C6] pt-1">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#7B4FFF]" />
                    <span>{topicGuides.length} Comprehensive {topicGuides.length === 1 ? "Guide" : "Guides"}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#22D3FF]" />
                    <span>Estimated total read time: ~10 mins</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions Buttons */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#141A2D] hover:bg-[#1B233C] text-[#C4CBD8] hover:text-white text-xs font-semibold border border-[#232F4E] transition-all cursor-pointer shadow-sm"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>All Topics</span>
                </Link>

                <button
                  onClick={() => setPdfModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#141A2D] hover:bg-[#1B233C] text-[#22D3FF] text-xs font-bold border border-[#232F4E] transition-all cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF Sheet</span>
                </button>

                <button
                  onClick={() => handleAskAi(`Explain the ${currentTopic.title} topic in CaryPact.`)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#22D3FF] hover:bg-[#1bb8df] text-[#0A0C14] text-xs font-bold transition-all shadow-md shadow-[#22D3FF]/20 cursor-pointer"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Guides in this Topic Container */}
        <section className="py-10 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Guides Navigation Tabs / Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#8EA2C6]">
              <span>Guides in &ldquo;{currentTopic.title}&rdquo; ({topicGuides.length})</span>
              <span className="text-[11px] text-[#606E85]">Select a tutorial below to read</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topicGuides.map((guide, idx) => {
                const isSelected = guide.id === activeGuide.id;
                return (
                  <button
                    key={guide.id}
                    onClick={() => {
                      setSelectedGuideId(guide.id);
                      if (typeof window !== "undefined") {
                        window.history.replaceState(null, "", `/guides/${currentTopic.id}?guide=${guide.id}`);
                      }
                    }}
                    id={`topic-guide-tab-${guide.id}`}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex items-start justify-between gap-3 ${
                      isSelected
                        ? "bg-[#141B32] border-[#7B4FFF] shadow-lg shadow-[#7B4FFF]/10 ring-1 ring-[#7B4FFF]"
                        : "bg-[#0E1222] border-[#202742] hover:border-[#2C385E] hover:bg-[#12162B]"
                    }`}
                  >
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isSelected ? "bg-[#7B4FFF] text-white" : "bg-[#1A223B] text-[#8EA2C6]"
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#22D3FF]">
                          {guide.readTime}
                        </span>
                        <span className="text-[10px] text-[#8EA2C6]">
                          • {guide.difficulty}
                        </span>
                      </div>
                      <h3 className={`text-sm font-bold leading-snug line-clamp-2 ${
                        isSelected ? "text-white" : "text-[#CBD5E1]"
                      }`}>
                        {guide.title}
                      </h3>
                    </div>

                    <ChevronRight className={`w-5 h-5 mt-1 shrink-0 transition-transform ${
                      isSelected ? "text-[#22D3FF] translate-x-0.5" : "text-[#55637D]"
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Guide Full Reader View */}
          <div id="guide-content-area" className="bg-[#0F1322] border border-[#212946] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
            {/* Guide Header */}
            <div className="space-y-4 pb-6 border-b border-[#212946]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A223B] text-[11px] font-bold uppercase tracking-wider text-[#22D3FF]">
                  <span>{activeGuide.topicTitle}</span>
                  <span>•</span>
                  <span>{activeGuide.readTime}</span>
                  <span>•</span>
                  <span className="text-[#A855F7]">{activeGuide.difficulty}</span>
                </div>

                <div className="flex items-center gap-2">
                  {activeGuide.videoDuration && (
                    <button
                      onClick={() => handleOpenVideo(activeGuide.slug)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Watch Video ({activeGuide.videoDuration})</span>
                    </button>
                  )}

                  <button
                    onClick={() => setPdfModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161D33] hover:bg-[#1E2642] text-[#C4CBD8] hover:text-white text-xs font-medium border border-[#273254] transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#22D3FF]" />
                    <span>PDF</span>
                  </button>

                  <button
                    onClick={handleShareGuide}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#161D33] hover:bg-[#1E2642] text-[#C4CBD8] hover:text-white text-xs font-medium border border-[#273254] transition-colors cursor-pointer"
                    title="Copy Guide URL"
                  >
                    {copiedUrl ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-[#22D3FF]" />
                        <span>Share</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {activeGuide.title}
              </h2>
              
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                {activeGuide.summary}
              </p>

              {/* Progress bar */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs text-[#838E9E] mb-2">
                  <span className="font-semibold text-white">Tutorial Completion Progress</span>
                  <span>{completedCount} of {activeGuide.steps.length} steps completed</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#182038] overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#22D3FF] to-[#7B4FFF] transition-all duration-300"
                    style={{ width: `${(completedCount / activeGuide.steps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Special Interactive Multi-Network & Bridging Visual Matrix for cross-chain-networks-bridging */}
            {activeGuide.id === "cross-chain-networks-bridging" && (
              <div className="space-y-4 p-5 sm:p-6 rounded-2xl bg-[#0D1224] border border-[#2A3760] shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#1E294B] pb-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#22D3FF]">
                      <ArrowLeftRight className="w-3.5 h-3.5" />
                      <span>Cross-Chain Architecture Matrix</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Major Networks & BOT Chain Interaction
                    </h3>
                  </div>
                  <a
                    href="https://bridge.botchain.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#22D3FF] to-[#0EA5E9] hover:from-[#38BDF8] hover:to-[#0284C7] text-[#070913] text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    <span>Launch Bridge</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Network Nodes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                  {/* BSC */}
                  <div className="p-3.5 rounded-xl bg-[#141A30] border border-amber-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-400">BNB Smart Chain (BSC)</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300">BEP-20</span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                      Primary user gateway. Fast 3-second blocks & ultra-low fees (~$0.10). USDT (BEP-20) bridges seamlessly into BOT Chain.
                    </p>
                    <div className="text-[10px] font-mono text-[#22D3FF] flex items-center gap-1">
                      <span>Bridgeable ↔ BOT Chain</span>
                    </div>
                  </div>

                  {/* Ethereum */}
                  <div className="p-3.5 rounded-xl bg-[#141A30] border border-indigo-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-indigo-300">Ethereum Mainnet</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300">ERC-20</span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                      Deepest institutional liquidity, but higher Layer 1 gas costs. USDT (ERC-20) can be bridged via bridge.botchain.ai.
                    </p>
                    <div className="text-[10px] font-mono text-[#22D3FF] flex items-center gap-1">
                      <span>Bridgeable ↔ BOT Chain</span>
                    </div>
                  </div>

                  {/* Bitcoin */}
                  <div className="p-3.5 rounded-xl bg-[#141A30] border border-orange-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-orange-400">Bitcoin Network</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-300">UTXO Ledger</span>
                    </div>
                    <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                      Independent UTXO ledger. Non-EVM. Cannot bridge directly without wrapped assets or centralized exchange swap first.
                    </p>
                    <div className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                      <span>Separate Non-EVM Ledger</span>
                    </div>
                  </div>

                  {/* BOT Chain */}
                  <div className="p-3.5 rounded-xl bg-[#141A30] border border-[#22D3FF]/50 space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-[#22D3FF]/10 blur-xl pointer-events-none" />
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#22D3FF]">BOT Chain (Layer 1)</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#22D3FF]/20 text-[#22D3FF]">Chain 1918</span>
                    </div>
                    <p className="text-[11px] text-[#CBD5E1] leading-relaxed">
                      High-throughput L1 powering CaryPact AI supercomputing. Sub-second speed & 1.50% native gas burn.
                    </p>
                    <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
                      <span>Target Ecosystem Layer 1</span>
                    </div>
                  </div>
                </div>

                {/* Severe Caution Banner */}
                <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/40 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-red-400 font-bold uppercase tracking-wider text-[11px]">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Severe Warning: Avoid Sending to the Wrong Network</span>
                  </div>
                  <ul className="space-y-1.5 text-red-200 text-[11px] leading-relaxed list-disc list-inside">
                    <li>
                      <strong>Never send directly to Centralized Exchanges (Binance, OKX, Bybit, KuCoin):</strong> Exchanges do not currently support native BOT Chain deposits! If you deposit directly from BOT Chain, your funds will be permanently lost.
                    </li>
                    <li>
                      <strong>Always Bridge First:</strong> If you want to deposit to an exchange or move funds out, first use <a href="https://bridge.botchain.ai/" target="_blank" rel="noopener noreferrer" className="underline font-bold text-white hover:text-[#22D3FF]">https://bridge.botchain.ai/</a> to convert your BOT Chain USDT back to BSC (BEP-20) or Ethereum.
                    </li>
                    <li>
                      <strong>Address Match Trap:</strong> Having the same 0x... public address on multiple networks does not mean your balances are shared. Direct transfers across different chains without a bridge will destroy your tokens.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step-by-Step Instructions */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#8EA2C6] flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#22D3FF]" />
                  <span>Step-by-Step Instructions</span>
                </h3>
                <span className="text-[11px] text-[#606E85]">Click any step to mark complete</span>
              </div>

              <div className="space-y-4">
                {activeGuide.steps.map((step, sIdx) => {
                  const stepKey = `${activeGuide.id}-${sIdx}`;
                  const isDone = !!completedSteps[stepKey];
                  const stepVideos = (
                    step.videoTutorials && step.videoTutorials.length > 0
                      ? step.videoTutorials
                      : (step.videoTutorial ? [step.videoTutorial] : [])
                  );

                  return (
                    <div
                      key={sIdx}
                      onClick={() => toggleStep(sIdx)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                        isDone 
                          ? "bg-[#141A2D]/60 border-emerald-500/40 opacity-85 shadow-sm" 
                          : "bg-[#12172A] border-[#222B48] hover:border-[#2F3C64]"
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <button
                          type="button"
                          className={`mt-0.5 w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                            isDone 
                              ? "bg-emerald-500 border-emerald-500 text-black font-bold" 
                              : "border-[#606E85] hover:border-[#22D3FF] text-transparent"
                          }`}
                          aria-label={`Mark step ${sIdx + 1} complete`}
                        >
                          <CheckCircle2 className={`w-4 h-4 ${isDone ? "text-[#0A0C14]" : "text-transparent"}`} />
                        </button>

                        <div className="space-y-2 flex-1">
                          {/* Step Header with Title & Small Video Tutorial Badge / Button */}
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className={`text-base font-bold transition-colors ${isDone ? "text-[#838E9E] line-through" : "text-white"}`}>
                              {step.title}
                            </div>

                            {/* Small Video Tutorial Buttons / Badges on this Step */}
                            {stepVideos.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                {stepVideos.map((tut, vIdx) => (
                                  <a
                                    key={vIdx}
                                    href={tut.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#7B4FFF]/25 to-[#22D3FF]/20 hover:from-[#7B4FFF] hover:to-[#22D3FF] text-[#E0E7FF] hover:text-[#0A0C14] border border-[#7B4FFF]/40 hover:border-transparent text-[11px] font-semibold transition-all shadow-sm group shrink-0 cursor-pointer"
                                    title={`Watch Video Tutorial No.${tut.number}: ${tut.title}`}
                                  >
                                    <span className="w-3.5 h-3.5 rounded-full bg-[#7B4FFF] group-hover:bg-[#0A0C14] text-white group-hover:text-[#22D3FF] flex items-center justify-center shrink-0 transition-colors">
                                      <Play className="w-2 h-2 fill-current ml-0.5" />
                                    </span>
                                    <span className="font-mono text-[10px] text-[#22D3FF] group-hover:text-[#0A0C14] font-bold">
                                      #{tut.number}
                                    </span>
                                    <span className="font-medium text-white group-hover:text-[#0A0C14]">
                                      Watch Tutorial
                                    </span>
                                    <ExternalLink className="w-2.5 h-2.5 text-[#22D3FF] group-hover:text-[#0A0C14] shrink-0" />
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>

                          <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                            {step.description}
                          </p>

                          {/* Warning Callout */}
                          {step.warning && (
                            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-200 mt-2.5">
                              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                              <span><strong>Warning:</strong> {step.warning}</span>
                            </div>
                          )}

                          {/* Pro Tip Callout */}
                          {step.proTip && (
                            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#22D3FF]/10 border border-[#22D3FF]/25 text-xs text-[#22D3FF] mt-2.5">
                              <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-[#22D3FF]" />
                              <span><strong>Pro Tip:</strong> {step.proTip}</span>
                            </div>
                          )}

                          {/* Dedicated Small Tutorial Link Badge Bar under Step */}
                          {stepVideos.length > 0 && (
                            <div className="pt-2 flex flex-wrap items-center gap-2" onClick={(e) => e.stopPropagation()}>
                              {stepVideos.map((tut, vIdx) => (
                                <a
                                  key={vIdx}
                                  href={tut.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14192E] hover:bg-[#1E2548] border border-[#242F54] hover:border-[#7B4FFF]/80 text-xs text-[#CBD5E1] hover:text-white transition-all group shadow-xs cursor-pointer"
                                >
                                  <span className="w-4 h-4 rounded bg-[#7B4FFF]/30 flex items-center justify-center text-[#22D3FF] group-hover:bg-[#7B4FFF] group-hover:text-white shrink-0 transition-colors">
                                    <Play className="w-2 h-2 fill-current ml-0.5" />
                                  </span>
                                  <span className="text-[11px] font-mono font-bold text-[#A855F7] group-hover:text-[#C084FC]">
                                    Tutorial No.{tut.number}:
                                  </span>
                                  <span className="text-[11px] text-[#E2E8F0] group-hover:text-[#22D3FF] font-medium truncate max-w-[220px] sm:max-w-[360px]">
                                    {tut.title}
                                  </span>
                                  <ExternalLink className="w-3 h-3 text-[#64748B] group-hover:text-[#22D3FF] shrink-0 ml-0.5" />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Key Protocol Takeaways Box */}
            <div className="bg-[#12172A] border border-[#222B48] rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#22D3FF]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Key Protocol Takeaways</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#C4CBD8]">
                {activeGuide.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7B4FFF] mt-2 shrink-0" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Actions: Previous/Next Guide & DApp Launcher */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#212946]">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {prevGuide ? (
                  <button
                    onClick={() => setSelectedGuideId(prevGuide.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#161D33] hover:bg-[#1E2642] text-[#CBD5E1] text-xs font-semibold border border-[#273254] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Guide</span>
                  </button>
                ) : (
                  <Link
                    href="/guides"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#161D33] hover:bg-[#1E2642] text-[#CBD5E1] text-xs font-semibold border border-[#273254] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>All Topics</span>
                  </Link>
                )}

                {nextGuide && (
                  <button
                    onClick={() => setSelectedGuideId(nextGuide.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#161D33] hover:bg-[#1E2642] text-[#22D3FF] text-xs font-semibold border border-[#273254] transition-colors cursor-pointer"
                  >
                    <span>Next: {nextGuide.title.slice(0, 20)}...</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                {activeGuide.id === "cross-chain-networks-bridging" && (
                  <a
                    href="https://bridge.botchain.ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#22D3FF] to-[#0EA5E9] hover:from-[#38BDF8] hover:to-[#0284C7] text-[#070913] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#22D3FF]/20 transition-all cursor-pointer"
                  >
                    <span>Open BOT Chain Bridge</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <a
                  href={AFFILIATE_CONFIG.APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#7B4FFF]/25 transition-all cursor-pointer"
                >
                  <span>Launch CaryPact & Apply Guide</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Browse Other Topics Section */}
          <div className="pt-8 border-t border-[#1E243B] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#22D3FF]" />
                  <span>Explore Other Topics</span>
                </h3>
                <p className="text-xs text-[#8EA2C6] mt-1">
                  Continue your onboarding journey across other CaryPact knowledge categories.
                </p>
              </div>

              <Link
                href="/guides"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22D3FF] hover:text-white transition-colors"
              >
                <span>View All Topics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherTopics.map((topic) => {
                return (
                  <Link
                    key={topic.id}
                    href={`/guides/${topic.id}`}
                    className="p-5 rounded-2xl bg-[#0E1222] border border-[#202742] hover:border-[#7B4FFF]/60 hover:bg-[#12172C] transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-xl bg-[#161D36] border border-[#263155] group-hover:border-[#7B4FFF] flex items-center justify-center text-[#22D3FF] group-hover:text-white transition-all">
                          <TopicIcon name={topic.iconName} className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold text-[#A855F7] uppercase">
                          {topic.badge}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#22D3FF] transition-colors mb-1">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-[#94A3B8] line-clamp-2">
                        {topic.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#1C233C] flex items-center justify-between text-xs text-[#22D3FF] font-medium">
                      <span>{topic.guideIds.length} Guides</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenPdf={() => setPdfModalOpen(true)}
        onOpenNewsletter={() => setNewsletterModalOpen(true)}
      />

      {/* Modals */}
      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialQuestion={aiInitialQuestion}
        currentLang={locale}
      />

      <PdfCheatSheetModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
      />

      <VideoPlayerModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        guideSlug={videoGuideSlug}
      />

      <NewsletterModal
        isOpen={newsletterModalOpen}
        onClose={() => setNewsletterModalOpen(false)}
      />
    </div>
  );
}

export default function TopicGuidesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0A0C14] flex items-center justify-center text-[#8EA2C6]">Loading Topic Guides...</div>}>
      <TopicGuidesContent />
    </Suspense>
  );
}
