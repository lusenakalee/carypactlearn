"use client";

import React, { useState } from "react";
import { Info, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AffiliateDisclaimerBanner() {
  const [visible, setVisible] = useState(true);
  const tDisclaimer = useTranslations("disclaimer");

  if (!visible) return null;

  return (
    <div 
      id="affiliate-disclosure-banner"
      className="w-full bg-[#0E1020]/95 border-b border-[#1E243B] text-[11px] sm:text-xs text-[#838E9E] py-2 px-4 relative z-40 transition-all"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <span className="flex-shrink-0 flex items-center gap-1 text-[#22D3FF] font-semibold bg-[#22D3FF]/10 px-2 py-0.5 rounded border border-[#22D3FF]/20">
            <Info className="w-3.5 h-3.5" />
            <span>{tDisclaimer("badge")}</span>
          </span>
          <p className="leading-snug text-[#C4CBD8]">
            {tDisclaimer("text")}
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto flex-shrink-0">
          <a
            href="#risks"
            className="text-[#22D3FF] hover:text-[#7B4FFF] underline font-medium flex items-center gap-1 transition-colors"
          >
            <span>Full Risk Notice</span>
          </a>
          <button
            onClick={() => setVisible(false)}
            className="text-[#838E9E] hover:text-white p-1 rounded hover:bg-[#1E243B] transition-colors"
            title="Dismiss notification"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
