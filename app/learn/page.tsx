"use client";

import AffiliateDisclaimerBanner from "@/components/AffiliateDisclaimerBanner";
import AiAssistantModal from "@/components/AiAssistantModal";
import BotChainLearnSection from "@/components/BotChainLearnSection";
import Footer from "@/components/Footer";
import LearnFaqSection from "@/components/LearnFaqSection";
import LearnSection from "@/components/LearnSection";
import { useAppLocale } from "@/components/LocaleProvider";
import Navbar from "@/components/Navbar";
import NewsletterModal from "@/components/NewsletterModal";
import PdfCheatSheetModal from "@/components/PdfCheatSheetModal";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import {
  ArrowLeft,
  BookOpen,
  Bot,
  Cpu,
  Download,
  HelpCircle,
  Layers,
  TrendingUp
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LearnPage() {
  const { locale, setLocale } = useAppLocale();
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiInitialQuestion, setAiInitialQuestion] = useState("");
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoGuideSlug, setVideoGuideSlug] = useState("getting-started");

  const handleAskAi = (question: string) => {
    setAiInitialQuestion(question);
    setAiModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0C14] text-[#C4CBD8] flex flex-col font-sans selection:bg-[#7B4FFF]/30 selection:text-white">
     

      <main className="flex-grow">
        {/* Learn Page Hero Header */}
        <section className="relative py-12 sm:py-16 bg-gradient-to-b from-[#0F1428] via-[#0D1020] to-[#0A0C14] border-b border-[#1E2540] overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid opacity-25 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#7B4FFF]/10 blur-[130px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#8EA2C6] mb-6">
              <Link 
                href="/#home" 
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span>/</span>
              <span className="text-[#22D3FF]">Learn & Academy</span>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#A855F7] mb-4 shadow-sm">
                  <Layers className="w-3.5 h-3.5 text-[#22D3FF]" />
                  <span>Foundational Web3 & Decentralized AI Literacy</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                  CaryPact & BOT Chain <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3FF] via-[#7B4FFF] to-[#A855F7]">Learning Academy</span>
                </h1>
                <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                  Understand the technological architecture behind the BOT Chain Layer 1 public chain, decentralized GPU/CPU supercomputing, non-custodial cryptographic safety, and comprehensive protocol economics.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
                <a
                  href="#faq"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#141A2E] hover:bg-[#1C243E] text-[#22D3FF] text-xs font-bold uppercase tracking-wider border border-[#232F4E] transition-all cursor-pointer shadow-md"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Jump to FAQ</span>
                </a>
                <button
                  onClick={() => setPdfModalOpen(true)}
                  id="learn-download-pdf-btn"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#141A2E] hover:bg-[#1C243E] text-[#A855F7] text-xs font-bold uppercase tracking-wider border border-[#232F4E] transition-all cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Cheat Sheet (PDF)</span>
                </button>
                <button
                  onClick={() => handleAskAi("Explain the difference between BOT Public Chain and CaryPact's computing power.")}
                  id="learn-ask-ai-btn"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#22D3FF] hover:bg-[#1bb8df] text-[#070913] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#22D3FF]/20"
                >
                  <Bot className="w-4 h-4" />
                  <span>Ask AI Copilot</span>
                </button>
              </div>
            </div>

            {/* Anchor Links to Learning Sub-Sections */}
            <div className="mt-8 pt-6 border-t border-[#1C2542] grid grid-cols-2 sm:grid-cols-4 gap-3">
              <a 
                href="#botchain-learn" 
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#101428] hover:bg-[#161C36] border border-[#1E2746] transition-all group"
              >
                <Cpu className="w-4 h-4 text-[#22D3FF] group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] font-mono text-[#8EA2C6]">Part 1</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#22D3FF] transition-colors">BOT Chain L1</div>
                </div>
              </a>

              <a 
                href="#core-curriculum" 
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#101428] hover:bg-[#161C36] border border-[#1E2746] transition-all group"
              >
                <BookOpen className="w-4 h-4 text-[#A855F7] group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] font-mono text-[#8EA2C6]">Part 2</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#A855F7] transition-colors">Core Curriculum</div>
                </div>
              </a>

              <Link 
                href="/guides" 
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#101428] hover:bg-[#161C36] border border-[#1E2746] transition-all group"
              >
                <TrendingUp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] font-mono text-[#8EA2C6]">Step-by-Step</div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Action Guides</div>
                </div>
              </Link>

              <a 
                href="#faq" 
                className="flex items-center gap-2.5 p-3 rounded-xl bg-[#101428] hover:bg-[#161C36] border border-[#1E2746] transition-all group"
              >
                <HelpCircle className="w-4 h-4 text-[#22D3FF] group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <div className="text-[11px] font-mono text-[#8EA2C6]">Master FAQ</div>
                  <div className="text-xs font-bold text-white group-hover:text-[#22D3FF] transition-colors">22+ Answers</div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* Section 1: BOT Chain Layer 1 Infrastructure Details */}
        <div id="botchain-learn">
          <BotChainLearnSection />
        </div>

        {/* Section 2: Core Web3 & AI Computing Curriculum */}
        <div id="core-curriculum">
          <LearnSection />
        </div>

        {/* Section 3: Modern Master FAQ Section with SEO & GEO Keyword Optimization */}
        <LearnFaqSection />
      </main>

    </div>
  );
}
