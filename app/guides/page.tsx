"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  ArrowLeft, 
  Sparkles, 
  Download, 
  Bot, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  FileText,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GuidesSection from "@/components/GuidesSection";
import AffiliateDisclaimerBanner from "@/components/AffiliateDisclaimerBanner";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import PdfCheatSheetModal from "@/components/PdfCheatSheetModal";
import AiAssistantModal from "@/components/AiAssistantModal";
import NewsletterModal from "@/components/NewsletterModal";
import { useAppLocale } from "@/components/LocaleProvider";
import { AFFILIATE_CONFIG } from "@/config/constants";

export default function GuidesPage() {
  const { locale, setLocale } = useAppLocale();
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoGuideSlug, setVideoGuideSlug] = useState("getting-started");
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiInitialQuestion, setAiInitialQuestion] = useState("");
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);

  const handleOpenVideo = (slug?: string) => {
    setVideoGuideSlug(slug || "getting-started");
    setVideoModalOpen(true);
  };

  const handleAskAi = (question: string) => {
    setAiInitialQuestion(question);
    setAiModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0C14] text-[#C4CBD8] flex flex-col font-sans selection:bg-[#22D3FF]/20 selection:text-[#22D3FF]">
     
      <main className="flex-grow">
        {/* Guides Page Hero Header */}
        <div className="relative py-12 sm:py-16 bg-gradient-to-b from-[#0F1322] to-[#0A0C14] border-b border-[#1E2540] overflow-hidden">
          <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#22D3FF]/10 blur-[120px] pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumb navigation */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#8EA2C6] mb-6">
              <Link 
                href="/#home" 
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Home</span>
              </Link>
              <span>/</span>
              <span className="text-[#22D3FF]">Guides & Tutorials</span>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#22D3FF] mb-4 shadow-sm">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Interactive Onboarding & Step-by-Step Tutorials</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                  CaryPact & BOT Chain <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3FF] via-[#7B4FFF] to-[#A855F7]">Step-by-Step Guides</span>
                </h1>
                <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                  Verified, step-by-step masterclasses covering BO Wallet creation, computing power acquisition, staking tiers, CA token economics, and low-slippage BDEX swaps.
                </p>
              </div>

              {/* Quick Actions Bar */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0">
                <button
                  onClick={() => setPdfModalOpen(true)}
                  id="guides-download-pdf-btn"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141A2D] hover:bg-[#1B233C] text-[#22D3FF] text-xs font-bold uppercase tracking-wider border border-[#232F4E] transition-all cursor-pointer shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Cheat Sheet (PDF)</span>
                </button>
                <button
                  onClick={() => handleAskAi("Walk me through setting up CaryPact and BO Wallet from scratch.")}
                  id="guides-ask-ai-btn"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#22D3FF] hover:bg-[#1bb8df] text-[#070913] text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-[#22D3FF]/20"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Ask AI Copilot</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* The Full Interactive Guides Section */}
        <GuidesSection
          onOpenVideo={handleOpenVideo}
          onOpenPdf={() => setPdfModalOpen(true)}
        />

        {/* Help & Support Callout */}
        <section className="py-12 bg-[#090B14] border-t border-[#1C233B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-gradient-to-r from-[#101528] via-[#151B32] to-[#101528] border border-[#232D4E] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#A855F7]">
                  <Sparkles className="w-4 h-4 text-[#22D3FF]" />
                  <span>Need personalized assistance?</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Got stuck during BO Wallet setup or staking delegation?
                </h3>
                <p className="text-xs sm:text-sm text-[#8EA2C6] max-w-2xl">
                  Our community mentors and the AI Copilot are available 24/7 to guide you through gas estimation, private key security, and computing node validation.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => handleAskAi("Explain the difference between CaryPact computing power and CA token staking.")}
                  className="px-4 py-2.5 rounded-xl bg-[#1C233D] hover:bg-[#252E4E] text-white text-xs font-semibold border border-[#2D395E] transition-colors cursor-pointer"
                >
                  Common FAQs
                </button>
                <a
                  href={AFFILIATE_CONFIG.APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#7B4FFF] hover:bg-[#6C3DEF] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#7B4FFF]/25 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Launch CaryPact DApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

    
    </div>
  );
}
