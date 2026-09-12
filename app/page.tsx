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
      {/* Top Affiliate Disclaimer Banner */}
      <AffiliateDisclaimerBanner />

      {/* Navigation Bar */}
      <Navbar
        currentLang={locale}
        onLanguageChange={setLocale}
        onOpenSearch={() => {
          setAiInitialQuestion("");
          setAiModalOpen(true);
        }}
        onOpenNewsletter={() => setNewsletterModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onSelectPrompt={handlePromptSelect}
          onOpenPdf={() => setPdfModalOpen(true)}
          onOpenVideo={handleOpenVideo}
        />

        {/* Two-Column Section: (1) Live CaryPact Dashboard, (2) CA ↔ USDT Calculator */}
        <section id="live" className="py-8 sm:py-12 relative overflow-hidden bg-dot-grid-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-[#22D3FF]">
                {tLive("sectionBadge")}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
                {tLive("sectionTitle")} <span className="text-brand-gradient">{tLive("sectionTitleHighlight")}</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {/* Column 1: Live CaryPact Dashboard */}
              <LiveDashboardCard />

              {/* Column 2: CA ↔ USDT Calculator & Staking Simulator */}
              <ConversionCalculator />
            </div>
          </div>
        </section>

        {/* BOT Chain Architecture Section (5 Pillars) */}
        <BotChainArchitecture />

        {/* Tokenomics Visualizer (210M CA, 40k Emission, Halving, Burns) */}
        <TokenomicsVisualizer />

        {/* 10-Tier VIP System Explainer */}
        <VipSystemExplainer />

        {/* Step-by-Step Guides Section (7 Tutorials) */}
        <GuidesSection
          onOpenVideo={handleOpenVideo}
          onOpenPdf={() => setPdfModalOpen(true)}
          videoDurations={videoDurations}
        />

        {/* Learn Web3 & AI Computing Section */}
        <LearnSection />

        {/* Global Events, Consensus Summits & Social Channels */}
        <EventsSchedule />

        {/* Prominent Risk Disclosures & DYOR Checklist */}
        <RiskDisclosureSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPdf={() => setPdfModalOpen(true)}
        onOpenNewsletter={() => setNewsletterModalOpen(true)}
      />

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