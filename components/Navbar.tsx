"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useAppLocale } from "@/components/LocaleProvider";
import { LANGUAGES } from "@/lib/i18n";
import { AFFILIATE_CONFIG } from "@/config/constants";
import CarryPactLogo from "@/components/CarryPactLogo";
import { 
  Cpu, 
  Search, 
  ExternalLink, 
  Menu, 
  X, 
  Globe, 
  Sparkles,
  ShieldAlert,
  BookOpen,
  Activity,
  Layers,
  Check
} from "lucide-react";

interface NavbarProps {
  currentLang?: string;
  onLanguageChange?: (lang: string) => void;
  onOpenSearch: () => void;
  onOpenNewsletter: () => void;
}

export default function Navbar({
  currentLang: propLang,
  onLanguageChange: propOnLanguageChange,
  onOpenSearch,
  onOpenNewsletter,
}: NavbarProps) {
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");
  const { locale: contextLocale, setLocale: setContextLocale } = useAppLocale();
  
  const activeLocale = propLang || contextLocale;
  const handleLocaleChange = (code: string) => {
    setContextLocale(code);
    if (propOnLanguageChange) {
      propOnLanguageChange(code);
    }
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const navLinks = [
    { name: tNav("home"), href: "/#home", icon: Cpu, id: "home" },
    { name: tNav("liveData"), href: "/live-data", icon: Activity, badge: tNav("newBadge"), id: "live" },
    { name: tNav("guides"), href: "/#guides", icon: BookOpen, id: "guides" },
    { name: tNav("learn"), href: "/#learn", icon: Layers, id: "learn" },
    { name: tNav("risks"), href: "/#risks", icon: ShieldAlert, highlight: true, id: "risks" },
  ];

  const currentLangObj = LANGUAGES.find(l => l.code === activeLocale) || LANGUAGES[0];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#0A0C14]/90 border-b border-[#1E243B] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <Link 
              href="/#home" 
              id="nav-logo-link"
              className="flex items-center group"
            >
              <CarryPactLogo 
                size="md"
                showBadge={true}
                badgeText="Hub"
                subtitle={tNav("brandSub")}
                idPrefix="nav"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  id={`nav-link-${link.id}`}
                  className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 ${
                    link.highlight 
                      ? "text-amber-300 hover:text-amber-200 hover:bg-amber-500/10 border border-amber-500/20"
                      : link.badge
                      ? "text-[#22D3FF] hover:bg-[#1C1F2E] border border-[#22D3FF]/30 bg-[#22D3FF]/10"
                      : "text-[#C4CBD8] hover:text-white hover:bg-[#1C1F2E]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-75" />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#22D3FF] text-[#0A0C14] text-[9px] font-black tracking-normal">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Search Assistant Trigger */}
            {/* <button
              onClick={onOpenSearch}
              id="nav-search-btn"
              type="button"
              className="flex items-center gap-2 px-3 py-2 text-xs text-[#838E9E] bg-[#131728] hover:bg-[#1C1F2E] hover:text-white border border-[#1E243B] rounded-lg transition-colors cursor-pointer"
              title={tNav("askAi")}>
              <Search className="w-3.5 h-3.5 text-[#22D3FF]" />
              <span className="hidden md:inline">{tNav("askAi")}</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-[#1E243B] text-[#C4CBD8] rounded border border-[#2A314D]">
                ⌘K
              </kbd>
            </button> */}

            {/* next-intl Functional Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                id="nav-lang-btn"
                type="button"
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#C4CBD8] bg-[#131728] hover:bg-[#1C1F2E] hover:text-white border border-[#1E243B] rounded-xl transition-all shadow-sm"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="w-3.5 h-3.5 text-[#22D3FF]" />
                <span className="text-sm">{currentLangObj.flag}</span>
                <span className="uppercase font-bold tracking-wider">{activeLocale}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#131728] border border-[#1E243B] rounded-xl shadow-2xl py-2 z-50 backdrop-blur-xl">
                  <div className="px-3.5 py-1.5 text-[10px] uppercase font-bold text-[#838E9E] tracking-wider border-b border-[#1E243B]/60 mb-1 flex items-center justify-between">
                    <span>{tNav("selectLang")}</span>
                    <span className="text-[#22D3FF] font-mono text-[9px]">next-intl</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          handleLocaleChange(l.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#1C1F2E] transition-colors ${
                          activeLocale === l.code ? "text-[#22D3FF] font-bold bg-[#22D3FF]/10" : "text-[#C4CBD8]"
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base leading-none">{l.flag}</span>
                          <span className="font-medium">{l.nativeName}</span>
                        </span>
                        {activeLocale === l.code && <Check className="w-3.5 h-3.5 text-[#22D3FF]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Primary Affiliate Action CTA */}
            <a
              href={AFFILIATE_CONFIG.APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-affiliate-cta"
              className="relative group inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#7B4FFF] hover:bg-[#6D3DF5] active:bg-[#5E2DE0] rounded-xl shadow-lg shadow-[#7B4FFF]/25 hover:shadow-[#7B4FFF]/40 transition-all duration-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#22D3FF] group-hover:rotate-12 transition-transform" />
              <span>{tNav("launchApp")}</span>
              <ExternalLink className="w-3 h-3 opacity-80" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            {/* <button
              onClick={onOpenSearch}
              className="p-2 text-[#C4CBD8] hover:text-white bg-[#131728] rounded-lg border border-[#1E243B]"
              aria-label="Search" >
              <Search className="w-4 h-4 text-[#22D3FF]" />
            </button> */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="p-2 text-[#C4CBD8] hover:text-white bg-[#131728] rounded-lg border border-[#1E243B]"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0E1020] border-b border-[#1E243B] px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-between ${
                    link.highlight 
                      ? "text-amber-300 bg-amber-500/10 border border-amber-500/20"
                      : link.badge
                      ? "text-[#22D3FF] bg-[#22D3FF]/10 border border-[#22D3FF]/30"
                      : "text-[#C4CBD8] hover:bg-[#1C1F2E] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#22D3FF]" />
                    <span>{link.name}</span>
                  </div>
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#22D3FF] text-[#0A0C14] text-[9px] font-black">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#1E243B] flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-[#838E9E]">
              <span>{tNav("selectLang")}:</span>
              <div className="flex gap-1 overflow-x-auto py-1 max-w-[200px]">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      handleLocaleChange(l.code);
                      setMobileMenuOpen(false);
                    }}
                    className={`px-2 py-1 text-xs rounded border transition-all ${
                      activeLocale === l.code 
                        ? "border-[#22D3FF] bg-[#22D3FF]/20 text-white font-bold" 
                        : "border-[#1E243B] text-[#838E9E] hover:text-white"
                    }`}
                  >
                    {l.flag} {l.code.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <a
              href={AFFILIATE_CONFIG.APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#7B4FFF] hover:bg-[#6D3DF5] flex items-center justify-center gap-2 shadow-lg shadow-[#7B4FFF]/30"
            >
              <Sparkles className="w-4 h-4 text-[#22D3FF]" />
              <span>{tCommon("launchCaryPact")}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
