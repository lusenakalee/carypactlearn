"use client";

import React, { useState, useEffect } from "react";
import { 
  MessageCircle, 
  X, 
  ExternalLink, 
  Copy, 
  Check, 
  ChevronUp, 
  Headphones, 
  Clock, 
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { SUPPORT_CONFIG } from "@/config/constants";

export default function FloatingSupportDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  // Auto clear copied status
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // Clean phone number for WhatsApp link (strip non-digits)
  const cleanPhone = SUPPORT_CONFIG.WHATSAPP_PHONE.replace(/[^\d]/g, "");
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(SUPPORT_CONFIG.WHATSAPP_DEFAULT_MESSAGE)}`;

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(SUPPORT_CONFIG.WHATSAPP_PHONE);
    setCopied(true);
  };

  const handleOpenDock = () => {
    setIsOpen(!isOpen);
    setHasUnreadNotification(false);
  };

  return (
    <aside 
      aria-label="Support Quicklinks Dock"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end select-none"
    >
      {/* Expanded Quick Support Panel */}
      {isOpen && (
        <div 
          id="support-dock-expanded-panel"
          className="mb-3 w-[330px] sm:w-[360px] rounded-2xl bg-[#0B0E1B]/95 backdrop-blur-xl border border-[#232B45] p-4 sm:p-5 shadow-2xl shadow-black/80 text-white animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#1C233B]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#22D3FF] to-[#7B4FFF] p-0.5">
                <div className="w-full h-full bg-[#0E1222] rounded-[10px] flex items-center justify-center">
                  <Headphones className="w-4 h-4 text-[#22D3FF]" />
                </div>
              </div>
              <div>
                <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span>CarryPact Support</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                </h2>
                <p className="text-[11px] text-[#838E9E]">
                  {SUPPORT_CONFIG.SUPPORT_HOURS}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              id="support-dock-close-btn"
              className="p-1 rounded-lg text-[#838E9E] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close support panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Notice */}
          <div className="my-3 px-3 py-2 rounded-xl bg-[#12162A] border border-[#1E2540] text-[11px] text-[#C4CBD8] flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#22D3FF] shrink-0 mt-0.5" />
            <span>
              Connect directly with our community specialists for wallet setup, hashrate activation, or general inquiries.
            </span>
          </div>

          {/* Direct Support Channels */}
          <div className="space-y-2.5">
            {/* Telegram Channel Option */}
            <a
              href={SUPPORT_CONFIG.TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="support-dock-telegram-link"
              className="group flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-[#0088cc]/15 to-[#29b6f6]/10 hover:from-[#0088cc]/25 hover:to-[#29b6f6]/20 border border-[#0088cc]/30 hover:border-[#29b6f6]/60 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0088cc] to-[#29b6f6] flex items-center justify-center text-white shadow-lg shadow-[#0088cc]/30 group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 fill-white ml-0.5" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Telegram Support</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#0088cc]/30 text-[#38BDF8] border border-[#0088cc]/40">
                      Community
                    </span>
                  </div>
                  <div className="text-[11px] text-[#838E9E]">
                    {SUPPORT_CONFIG.TELEGRAM_HANDLE}
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#838E9E] group-hover:text-white transition-colors" />
            </a>

            {/* WhatsApp Option */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-[#128C7E]/15 to-[#25D366]/10 border border-[#25D366]/30 transition-all flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="support-dock-whatsapp-link"
                  className="group flex items-center gap-3 flex-1 cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#128C7E] to-[#25D366] flex items-center justify-center text-white shadow-lg shadow-[#25D366]/30 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M12.004 2c-5.518 0-9.996 4.477-9.996 9.996a9.96 9.96 0 0 0 1.528 5.344L2.06 21.94a.75.75 0 0 0 .937.938l4.733-1.434a9.96 9.96 0 0 0 4.274.952c5.518 0 9.996-4.477 9.996-9.996S17.522 2 12.004 2zm5.545 13.784c-.23.648-1.157 1.242-1.742 1.344-.45.078-1.041.134-3.08-.71a10.978 10.978 0 0 1-4.787-4.225c-.244-.337-1.156-1.54-1.156-2.936 0-1.397.733-2.083.992-2.368.26-.285.568-.356.758-.356.19 0 .378.002.544.01.176.009.412-.067.644.49.24.577.818 1.996.89 2.141.071.144.119.314.024.503-.095.19-.142.308-.284.474-.142.166-.3.37-.428.497-.142.142-.29.297-.124.582.166.285.738 1.218 1.583 1.97 1.088.97 2.005 1.272 2.29 1.414.285.142.45.119.617-.071.166-.19.71-.83.901-1.115.19-.285.38-.238.64-.142.26.095 1.657.781 1.942.923.284.143.474.214.544.333.071.119.071.69-.159 1.338z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>WhatsApp Direct</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#25D366]/20 text-[#4ADE80] border border-[#25D366]/40">
                        Direct Line
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-[#838E9E]">
                      {SUPPORT_CONFIG.WHATSAPP_DISPLAY_PHONE}
                    </div>
                  </div>
                </a>

                <button
                  onClick={handleCopyPhone}
                  id="support-dock-copy-phone"
                  className="p-1.5 rounded-lg bg-[#161D2E] hover:bg-[#1E273D] border border-[#26314D] text-[#838E9E] hover:text-white transition-colors cursor-pointer"
                  title="Copy placeholder phone number"
                  aria-label="Copy phone number"
                >
                  {copied ? (
                    <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-1.5 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md shadow-[#25D366]/20"
              >
                <span>Start WhatsApp Chat</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-3 pt-2.5 border-t border-[#1C233B] flex items-center justify-between text-[10px] text-[#838E9E]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#22D3FF]" />
              <span>{SUPPORT_CONFIG.AVG_RESPONSE_TIME}</span>
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Official Protocol Hub</span>
            </span>
          </div>
        </div>
      )}

      {/* Floating Pill Dock */}
      <div 
        id="floating-support-dock-bar"
        className="relative group flex items-center gap-2 p-1.5 rounded-full bg-[#0B0E1D]/90 backdrop-blur-xl border border-[#222B45] shadow-2xl shadow-black/80 hover:border-[#7B4FFF]/60 transition-all duration-300"
      >
        {/* Subtle Neon Backing Glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0088cc]/30 via-[#7B4FFF]/30 to-[#25D366]/30 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity -z-10" />

        {/* Telegram Icon Button */}
        <div className="relative">
          <a
            href={SUPPORT_CONFIG.TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="floating-dock-telegram-btn"
            onMouseEnter={() => setActiveTooltip("telegram")}
            onMouseLeave={() => setActiveTooltip(null)}
            className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[#0E1326] hover:bg-[#0088cc] border border-[#1E2640] hover:border-[#29b6f6] text-[#29b6f6] hover:text-white transition-all duration-200 shadow-md group/tg cursor-pointer"
            aria-label="Open Telegram Support"
          >
            <svg className="w-5 h-5 fill-current transition-transform group-hover/tg:scale-110 ml-0.5" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
            </svg>
            {/* Online Green Ping */}
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B0E1D]" />
          </a>

          {/* Desktop Hover Tooltip */}
          {activeTooltip === "telegram" && (
            <div className="hidden sm:block absolute bottom-full mb-2 right-1/2 translate-x-1/2 px-2.5 py-1 rounded-md bg-[#0F1424] border border-[#232B45] text-[11px] font-medium text-white shadow-lg whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-150">
              Telegram Support
            </div>
          )}
        </div>

        {/* WhatsApp Icon Button */}
        <div className="relative">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="floating-dock-whatsapp-btn"
            onMouseEnter={() => setActiveTooltip("whatsapp")}
            onMouseLeave={() => setActiveTooltip(null)}
            className="relative flex items-center justify-center w-11 h-11 rounded-full bg-[#0E1326] hover:bg-[#25D366] border border-[#1E2640] hover:border-[#25D366] text-[#25D366] hover:text-black transition-all duration-200 shadow-md group/wa cursor-pointer"
            aria-label="Open WhatsApp Support"
          >
            <svg className="w-5 h-5 fill-current transition-transform group-hover/wa:scale-110" viewBox="0 0 24 24">
              <path d="M12.004 2c-5.518 0-9.996 4.477-9.996 9.996a9.96 9.96 0 0 0 1.528 5.344L2.06 21.94a.75.75 0 0 0 .937.938l4.733-1.434a9.96 9.96 0 0 0 4.274.952c5.518 0 9.996-4.477 9.996-9.996S17.522 2 12.004 2zm5.545 13.784c-.23.648-1.157 1.242-1.742 1.344-.45.078-1.041.134-3.08-.71a10.978 10.978 0 0 1-4.787-4.225c-.244-.337-1.156-1.54-1.156-2.936 0-1.397.733-2.083.992-2.368.26-.285.568-.356.758-.356.19 0 .378.002.544.01.176.009.412-.067.644.49.24.577.818 1.996.89 2.141.071.144.119.314.024.503-.095.19-.142.308-.284.474-.142.166-.3.37-.428.497-.142.142-.29.297-.124.582.166.285.738 1.218 1.583 1.97 1.088.97 2.005 1.272 2.29 1.414.285.142.45.119.617-.071.166-.19.71-.83.901-1.115.19-.285.38-.238.64-.142.26.095 1.657.781 1.942.923.284.143.474.214.544.333.071.119.071.69-.159 1.338z"/>
            </svg>
            {/* Online Green Ping */}
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0B0E1D]" />
          </a>

          {/* Desktop Hover Tooltip */}
          {activeTooltip === "whatsapp" && (
            <div className="hidden sm:block absolute bottom-full mb-2 right-1/2 translate-x-1/2 px-2.5 py-1 rounded-md bg-[#0F1424] border border-[#232B45] text-[11px] font-medium text-white shadow-lg whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-150">
              WhatsApp Support
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-[#1F2740]" />

        {/* Quick Menu Toggle Button */}
        <button
          onClick={handleOpenDock}
          id="floating-dock-menu-toggle"
          onMouseEnter={() => setActiveTooltip("info")}
          onMouseLeave={() => setActiveTooltip(null)}
          className={`relative flex items-center gap-1.5 px-2.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            isOpen 
              ? "bg-[#7B4FFF] text-white shadow-lg shadow-[#7B4FFF]/30" 
              : "bg-[#141A2E] hover:bg-[#1C2540] text-[#C4CBD8] hover:text-white"
          }`}
          aria-expanded={isOpen}
          aria-label="Toggle support menu"
        >
          <MessageCircle className="w-4 h-4 text-[#22D3FF]" />
          <span className="hidden md:inline text-[11px]">Support</span>
          <ChevronUp className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />

          {/* Unread dot indicator */}
          {hasUnreadNotification && !isOpen && (
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22D3FF] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22D3FF]" />
            </span>
          )}
        </button>

        {/* Info Tooltip */}
        {activeTooltip === "info" && !isOpen && (
          <div className="hidden sm:block absolute bottom-full mb-2 right-0 px-2.5 py-1 rounded-md bg-[#0F1424] border border-[#232B45] text-[11px] font-medium text-white shadow-lg whitespace-nowrap pointer-events-none animate-in fade-in zoom-in-95 duration-150">
            Quicklinks & Info
          </div>
        )}
      </div>
    </aside>
  );
}
