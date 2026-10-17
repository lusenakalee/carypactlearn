"use client";

import CaryPactLogo from "@/components/CaryPactLogo";
import { AFFILIATE_CONFIG, ECOSYSTEM_METRICS, VIP_TIERS } from "@/config/constants";
import { ArrowUp, ExternalLink, FileText, Globe2, MessageSquare, Send, ShieldCheck } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import Link from "next/link";

interface FooterProps {
  onOpenPdf: () => void;
  onOpenNewsletter: () => void;
}

export default function Footer({ onOpenPdf, onOpenNewsletter }: FooterProps) {
  const t = useTranslations("Footer");
  const format = useFormatter();

  const supply = format.number(ECOSYSTEM_METRICS.TOTAL_CA_SUPPLY, { notation: "compact" });
  const slippage = format.number(ECOSYSTEM_METRICS.SLIPPAGE_FEE_PERCENT / 100, { style: "percent" });
  const year = new Date().getFullYear();

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
              <CaryPactLogo
                size="md"
                showBadge={true}
                badgeText={t("badge")}
                idPrefix="footer"
              />
            </Link>

            <p className="text-xs text-[#C4CBD8] leading-relaxed max-w-sm">
              {t("brandDescription")}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={AFFILIATE_CONFIG.TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#131728] border border-[#1E243B] flex items-center justify-center text-[#22D3FF] hover:border-[#22D3FF] transition-colors"
                title={t("telegram")}
                aria-label={t("telegram")}
              >
                <Send className="w-3.5 h-3.5" />
              </a>
              <a
                href={AFFILIATE_CONFIG.TWITTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#131728] border border-[#1E243B] flex items-center justify-center text-[#A855F7] hover:border-[#A855F7] transition-colors"
                title={t("twitter")}
                aria-label={t("twitter")}
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </a>
              <a
                href={AFFILIATE_CONFIG.BOT_CHAIN_LEARN}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-[#131728] border border-[#1E243B] flex items-center justify-center text-emerald-400 hover:border-emerald-400 transition-colors"
                title={t("explorer")}
                aria-label={t("explorer")}
              >
                <Globe2 className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Nav Col: Explorations */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">{t("navTitle")}</div>
            <ul className="space-y-2">
              <li><Link href="/#home" className="hover:text-white transition-colors">{t("navHome")}</Link></li>
              <li>
                <Link href="/live-data" className="text-[#22D3FF] font-semibold hover:underline flex items-center gap-1">
                  <span>{t("navLive")}</span>
                  <span className="text-[9px] px-1 rounded bg-[#22D3FF]/20 text-[#22D3FF]">{t("liveBadge")}</span>
                </Link>
              </li>
              <li><Link href="/#bot-chain" className="hover:text-white transition-colors">{t("navBotChain")}</Link></li>
              <li><Link href="/#ca-token" className="hover:text-white transition-colors">{t("navTokenomics", { supply })}</Link></li>
              <li><Link href="/#how-carypact-works" className="hover:text-white transition-colors">{t("navVip", { count: VIP_TIERS.length })}</Link></li>
              <li><Link href="/#risks" className="text-amber-300 hover:underline">{t("navRisks")}</Link></li>
            </ul>
          </div>

          {/* Nav Col: Guides */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">{t("guidesTitle")}</div>
            <ul className="space-y-2">
              <li><a href="#guides" className="hover:text-white transition-colors">{t("guideStart")}</a></li>
              <li><a href="#guides" className="hover:text-white transition-colors">{t("guideWallet")}</a></li>
              <li><a href="#guides" className="hover:text-white transition-colors">{t("guideBuy")}</a></li>
              <li><a href="#guides" className="hover:text-white transition-colors">{t("guideStaking")}</a></li>
              <li><a href="#guides" className="hover:text-white transition-colors">{t("guideSlippage", { percent: slippage })}</a></li>
            </ul>
          </div>

          {/* Resources & CTAs */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">{t("toolsTitle")}</div>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenPdf} className="text-[#22D3FF] hover:underline flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  <span>{t("cheatSheet")}</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenNewsletter} className="text-[#A855F7] hover:underline">
                  {t("newsletter")}
                </button>
              </li>
              <li>
                <a
                  href={AFFILIATE_CONFIG.APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#7B4FFF] flex items-center gap-1 font-semibold"
                >
                  <span>{t("launchApp")}</span>
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
                  <span>{t("botDocs")}</span>
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
            <span>{t("disclosureTitle")}</span>
          </div>
          <p className="leading-relaxed">
            {t.rich("disclosureBody", {
              inviteCode: AFFILIATE_CONFIG.INVITE_CODE,
              suffix: AFFILIATE_CONFIG.SUFFIX,
              code: (chunks) => <strong className="text-white">{chunks}</strong>,
            })}
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#1E243B] text-[11px]">
          <div>{t("copyright", { year })}</div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131728] hover:bg-[#1E243B] text-[#C4CBD8] hover:text-white transition-colors"
            >
              <span>{t("backToTop")}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}