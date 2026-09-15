"use client";

import { AFFILIATE_CONFIG } from "@/config/constants";
import { GUIDES_DATA, GuideArticle } from "@/config/content";
import {
  AlertTriangle,
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Coins,
  Cpu,
  Download,
  ExternalLink,
  Lock,
  Play,
  ShieldCheck,
  Sparkles,
  Wallet
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface GuidesSectionProps {
  onOpenVideo: (slug: string) => void;
  onOpenPdf: () => void;
  /**
   * Map of guide id -> formatted duration (e.g. "4:32"), resolved at runtime
   * once the actual video source (YouTube player or local <video> element)
   * reports its real duration. Guides not yet resolved simply omit the time.
   */
  videoDurations?: Record<string, string>;
}

export default function GuidesSection({ onOpenVideo, onOpenPdf, videoDurations = {} }: GuidesSectionProps) {
  const [selectedGuideId, setSelectedGuideId] = useState<string>("getting-started");
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const guideReaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (guideReaderRef.current) {
      guideReaderRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedGuideId]);

  const activeGuide: GuideArticle = GUIDES_DATA.find((g) => g.id === selectedGuideId) || GUIDES_DATA[0];

  const toggleStep = (stepIdx: number) => {
    const key = `${activeGuide.id}-${stepIdx}`;
    setCompletedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getGuideIcon = (id: string) => {
    switch (id) {
      case "getting-started": return Sparkles;
      case "create-wallet": return Wallet;
      case "buy-computing-power": return Cpu;
      case "receive-ca": return Coins;
      case "stake-ca": return Lock;
      case "ca-to-usdt": return ArrowLeftRight;
      case "withdraw": return ShieldCheck;
      default: return BookOpen;
    }
  };

  return (
    <section id="guides" className="py-14 sm:py-20 relative overflow-hidden bg-[#0E1020] border-t border-[#1E243B]">
      {/* Background Accent */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#22D3FF]/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#22D3FF]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Interactive Onboarding & Step-by-Step Tutorials</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            CaryPact <span className="text-brand-gradient">Guides & Walkthroughs</span>
          </h2>
          <p className="text-sm sm:text-base text-[#C4CBD8]">
            Master every step of participating in the ecosystem — from wallet setup to hashrate activation, staking lockups, and secure cross-chain withdrawals.
          </p>
        </div>

        {/* Guides Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Guide Selector Nav */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#838E9E] px-2 mb-3">
              Tutorial Modules (7 Guides)
            </div>
            {GUIDES_DATA.map((guide, idx) => {
              const IconComp = getGuideIcon(guide.id);
              const isSelected = selectedGuideId === guide.id;
              return (
                <button
                  key={guide.id}
                  onClick={() => setSelectedGuideId(guide.id)}
                  id={`guide-nav-${guide.id}`}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                    isSelected
                      ? "bg-[#131728] border-[#7B4FFF] text-white shadow-xl shadow-[#7B4FFF]/10 ring-1 ring-[#7B4FFF]"
                      : "bg-[#0A0C14] border-[#1E243B] text-[#C4CBD8] hover:bg-[#131728] hover:border-[#2A314D]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected ? "bg-[#7B4FFF] text-white" : "bg-[#1C1F2E] text-[#22D3FF]"
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold group-hover:text-[#22D3FF] transition-colors">{guide.title}</div>
                      <div className="text-[10px] text-[#838E9E] flex items-center gap-2 mt-0.5">
                        <span>{guide.readTime}</span>
                        <span>•</span>
                        <span className="text-[#A855F7]">{guide.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#838E9E] font-bold">0{idx + 1}</span>
                </button>
              );
            })}

            {/* Quick PDF & Video Actions */}
            <div className="pt-4 space-y-2">
              <button
                onClick={onOpenPdf}
                className="w-full py-2.5 px-4 rounded-xl bg-[#131728] hover:bg-[#1C1F2E] text-[#C4CBD8] hover:text-white text-xs font-semibold border border-[#2A314D] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#22D3FF]" />
                <span>Download All Guides PDF</span>
              </button>
            </div>
          </div>

          {/* Right Active Guide Reader */}
          <div ref={guideReaderRef} className="lg:col-span-8 bg-[#0A0C14] border border-[#1E243B] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Guide Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E243B]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#1C1F2E] text-[10px] font-bold uppercase tracking-wider text-[#22D3FF] mb-2">
                  <span>{activeGuide.category} Module</span>
                  <span>•</span>
                  <span>{activeGuide.readTime}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">{activeGuide.title}</h3>
                <p className="text-xs sm:text-sm text-[#C4CBD8] mt-1">{activeGuide.summary}</p>
              </div>

              {activeGuide.video && (
                <button
                  onClick={() => onOpenVideo(activeGuide.slug)}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold transition-all shadow-md cursor-pointer self-start sm:self-auto"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>
                    Video
                    {videoDurations[activeGuide.id] ? ` (${videoDurations[activeGuide.id]})` : ""}
                  </span>
                </button>
              )}
            </div>

            {/* Interactive Steps List */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#838E9E]">
                Execution Checklist & Steps
              </div>

              {activeGuide.steps.map((step, sIdx) => {
                const stepKey = `${activeGuide.id}-${sIdx}`;
                const isDone = !!completedSteps[stepKey];
                return (
                  <div
                    key={sIdx}
                    onClick={() => toggleStep(sIdx)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isDone 
                        ? "bg-[#131728]/40 border-emerald-500/30 opacity-80" 
                        : "bg-[#131728] border-[#1E243B] hover:border-[#2A314D]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                          isDone 
                            ? "bg-emerald-500 border-emerald-500 text-black font-bold" 
                            : "border-[#838E9E] hover:border-[#22D3FF]"
                        }`}
                        aria-label={`Mark step ${sIdx + 1} complete`}
                      >
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>

                      <div className="space-y-1.5 flex-1">
                        <div className={`text-sm font-bold ${isDone ? "text-[#838E9E] line-through" : "text-white"}`}>
                          {step.title}
                        </div>
                        <p className="text-xs text-[#C4CBD8] leading-relaxed">
                          {step.description}
                        </p>

                        {/* Critical Warning Callout */}
                        {step.warning && (
                          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 mt-2">
                            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <span>{step.warning}</span>
                          </div>
                        )}

                        {/* Pro Tip Callout */}
                        {step.proTip && (
                          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[#22D3FF]/10 border border-[#22D3FF]/20 text-[11px] text-[#22D3FF] mt-2">
                            <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span><strong>Pro Tip:</strong> {step.proTip}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Key Takeaways Box */}
            <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-5 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#22D3FF]">Key Takeaways</div>
              <ul className="space-y-1.5 text-xs text-[#C4CBD8]">
                {activeGuide.keyTakeaways.map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7B4FFF]" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Next Guide Button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  const currentIndex = GUIDES_DATA.findIndex(g => g.id === selectedGuideId);
                  const nextIndex = (currentIndex + 1) % GUIDES_DATA.length;
                  setSelectedGuideId(GUIDES_DATA[nextIndex].id);
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#131728] hover:bg-[#1C1F2E] text-[#C4CBD8] hover:text-white text-xs font-semibold border border-[#2A314D] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Next Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Action Footer */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#838E9E]">Ready to test on the official protocol?</span>
              <a
                href={AFFILIATE_CONFIG.APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#7B4FFF]/25 transition-all"
              >
                <span>Launch CaryPact & Apply Guide</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}