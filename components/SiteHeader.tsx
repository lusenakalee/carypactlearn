'use client'
import React from 'react'
import AffiliateDisclaimerBanner from './AffiliateDisclaimerBanner';
import Navbar from './Navbar';
import { useAppLocale } from "@/components/LocaleProvider";
import { useState } from "react";

export default function SiteHeader() {
        const { locale, setLocale } = useAppLocale();
     const [aiModalOpen, setAiModalOpen] = useState(false);
      const [aiInitialQuestion, setAiInitialQuestion] = useState("");
        const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);

  return (
    <div>
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
    </div>
  )
}
