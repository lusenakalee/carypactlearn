"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useAppLocale } from "@/components/LocaleProvider";
import Navbar from "@/components/Navbar";
import AffiliateDisclaimerBanner from "@/components/AffiliateDisclaimerBanner";
import HeroSection from "@/components/HeroSection";
import LiveDashboardCard from "@/components/LiveDashboardCard";
import ConversionCalculator from "@/components/ConversionCalculator";
import BotChainArchitecture from "@/components/BotChainArchitecture";
import TokenomicsVisualizer from "@/components/TokenomicsVisualizer";
import VipSystemExplainer from "@/components/VipSystemExplainer";
import GuidesSection from "@/components/GuidesSection";
import LearnSection from "@/components/LearnSection";
import EventsSchedule from "@/components/EventsSchedule";
import RiskDisclosureSection from "@/components/RiskDisclosureSection";
import AiAssistantModal from "@/components/AiAssistantModal";
import PdfCheatSheetModal from "@/components/PdfCheatSheetModal";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import NewsletterModal from "@/components/NewsletterModal";
import Footer from "@/components/Footer";
import BotChainLearnSection from "@/components/BotChainLearnSection";
import CaryPactBenchmarkSection from "@/components/CaryPactBenchmarkSection";

export default function HomePage() {
  const { locale, setLocale } = useAppLocale();
  const tLive = useTranslations("live");

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiInitialQuestion, setAiInitialQuestion] = useState("");
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoGuideSlug, setVideoGuideSlug] = useState("getting-started");
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);

  // Populated at runtime from the actual video source (YouTube IFrame API
  // for YouTube videos, HTMLVideoElement.duration for local files) — never
  // hardcoded, so the time shown always matches the real video.
  const [videoDurations, setVideoDurations] = useState<Record<string, string>>({});

  const handleDurationResolved = (guideId: string, duration: string) => {
    setVideoDurations((prev) => (prev[guideId] === duration ? prev : { ...prev, [guideId]: duration }));
  };

  const handlePromptSelect = (promptQuery: string) => {
    setAiInitialQuestion(promptQuery);
    setAiModalOpen(true);
  };

  const handleOpenVideo = (slug?: string) => {
    if (slug) setVideoGuideSlug(slug);
    setVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0C14] text-[#C4CBD8] flex flex-col selection:bg-[#7B4FFF] selection:text-white">
  
      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onSelectPrompt={handlePromptSelect}
          onOpenPdf={() => setPdfModalOpen(true)}
          onOpenVideo={handleOpenVideo}
        />

                      {/* BOT Chain Learn & Layer 1 Infrastructure Showcase (from botchain.ai/en/learn/) */}
        <BotChainLearnSection />

        {/* CaryPact Benchmark Protocol Overview (from app.carypact.com) */}
        <CaryPactBenchmarkSection />

       


        {/* Tokenomics Visualizer (210M CA, 40k Emission, Halving, Burns) */}
        <TokenomicsVisualizer />

       

      

        {/* Prominent Risk Disclosures & DYOR Checklist */}
        <RiskDisclosureSection />
      </main>

    

      {/* Interactive Modals */}
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
        onDurationResolved={handleDurationResolved}
      />

      <NewsletterModal
        isOpen={newsletterModalOpen}
        onClose={() => setNewsletterModalOpen(false)}
      />
    </div>
  );
}