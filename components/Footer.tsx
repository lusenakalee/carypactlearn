"use client";

import React from "react";
import Link from "next/link";
import CarryPactLogo from "@/components/CarryPactLogo";
import { 
  Cpu, 
  ExternalLink, 
  ShieldCheck, 
  Heart, 
  ArrowUp,
  FileText,
  Send,
  MessageSquare,
  Globe2
} from "lucide-react";
import { AFFILIATE_CONFIG, ECOSYSTEM_METRICS } from "@/config/constants";

interface FooterProps {
  onOpenPdf: () => void;
  onOpenNewsletter: () => void;
}

export default function Footer({ onOpenPdf, onOpenNewsletter }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#05060A] border-t border-[#1E243B] text-xs text-[#838E9E] pt-14 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/#home" id="footer-logo-link" className="group inline-flex items-center">
              <CarryPactLogo
                size="md"
                showBadge={true}
                badgeText="Learning Hub"
                idPrefix="footer"
              />
            </Link>

            <p className="text-xs text-[#C4CBD8] leading-relaxed max-w-sm">
              The premier independent educational resource and live analytical portal for CaryPact, BOT Chain, CA Token, and decentralized supercomputing protocols.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={AFFILIATE_CONFIG.TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#131728] border border-[#1E243B] flex items-center justify-center text-[#22D3FF] hover:border-[#22D3FF] transition-colors"
                title="Telegram"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <a
                href={AFFILIATE_CONFIG.TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#131728] border border-[#1E243B] flex items-center justify-center text-[#A855F7] hover:border-[#A855F7] transition-colors"
                title="Twitter / X"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>
              <a
                href={AFFILIATE_CONFIG.BOT_CHAIN_LEARN}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#131728] border border-[#1E243B] flex items-center justify-center text-emerald-400 hover:border-emerald-400 transition-colors"
                title="BOT Chain Explorer"
              >
                <Globe2 className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Nav Col: Explorations */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Hub Navigation</div>
            <ul className="space-y-2">
              <li><Link href="/#home" className="hover:text-white transition-colors">Home & Learning Hub</Link></li>
              <li>
                <Link href="/live-data" className="text-[#22D3FF] font-semibold hover:underline flex items-center gap-1">
                  <span>Live Market & CMC Portal</span>
                  <span className="text-[9px] px-1 rounded bg-[#22D3FF]/20 text-[#22D3FF]">LIVE</span>
                </Link>
              </li>
              <li><Link href="/#bot-chain" className="hover:text-white transition-colors">BOT Chain 5 Pillars</Link></li>
              <li><Link href="/#ca-token" className="hover:text-white transition-colors">210M CA Tokenomics</Link></li>
              <li><Link href="/#how-carypact-works" className="hover:text-white transition-colors">10-Tier VIP System</Link></li>
              <li><Link href="/#risks" className="text-amber-300 hover:underline">Risk Disclosures</Link></li>
            </ul>
          </div>

          {/* Nav Col: Guides */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Guides & Setup</div>
            <ul className="space-y-2">
              <li><a href="#guides" className="hover:text-white transition-colors">Getting Started</a></li>
              <li><a href="#guides" className="hover:text-white transition-colors">Create BO Wallet</a></li>
              <li><a href="#guides" className="hover:text-white transition-colors">Buy Computing Power</a></li>
              <li><a href="#guides" className="hover:text-white transition-colors">Staking Multipliers (30d–360d)</a></li>
              <li><a href="#guides" className="hover:text-white transition-colors">BDEX 5% Slippage Swaps</a></li>
            </ul>
          </div>

          {/* Resources & CTAs */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Tools & Official</div>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenPdf} className="text-[#22D3FF] hover:underline flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  <span>Download Cheat Sheet</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenNewsletter} className="text-[#A855F7] hover:underline">
                  Join Newsletter
                </button>
              </li>
              <li>
                <a 
                  href={AFFILIATE_CONFIG.APP_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#7B4FFF] flex items-center gap-1 font-semibold"
                >
                  <span>Launch CaryPact App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href={AFFILIATE_CONFIG.BOT_CHAIN_LEARN} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1"
                >
                  <span>BOT Chain Docs</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Affiliate Disclosure Notice Box */}
        <div className="bg-[#0E1020] border border-[#1E243B] rounded-2xl p-5 text-xs text-[#838E9E] space-y-2">
          <div className="flex items-center gap-2 text-white font-bold">
            <ShieldCheck className="w-4 h-4 text-[#22D3FF]" />
            <span>Independent Learning Hub & Affiliate Disclosure</span>
          </div>
          <p className="leading-relaxed">
            This website is an independent educational initiative and is not operated directly by CaryPact or BOT Chain foundation. All registration links contain the verified community invite code <strong className="text-white">1AjyRv (Suffix: C82A37)</strong>. We may receive referral commissions when users participate through links on this site. Content is strictly for educational purposes and never constitutes financial advice.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#1E243B] text-[11px]">
          <div>
            © 2026 CaryPact Learning Hub. Independent Educational Resource.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131728] hover:bg-[#1E243B] text-[#C4CBD8] hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
