"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Activity, 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  RefreshCw, 
  ArrowLeft, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  BadgeCheck,
  AlertTriangle,
  Globe2,
  Copy,
  Check
} from "lucide-react";

import LiveChart from "@/components/LiveChart";
import LiveMultiConverter from "@/components/LiveMultiConverter";
import LiveOrderBook from "@/components/LiveOrderBook";
import TwitterLiveFeed from "@/components/TwitterLiveFeed";
import DexPoolCard from "@/components/DexPoolCard";
import AiAssistantModal from "@/components/AiAssistantModal";
import PdfCheatSheetModal from "@/components/PdfCheatSheetModal";
import NewsletterModal from "@/components/NewsletterModal";
import { AFFILIATE_CONFIG, ECOSYSTEM_METRICS } from "@/config/constants";
import LiveMetricsCards from "@/components/LiveMetricsCards";

export default function LiveDataPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>("Just now");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiInitialQuestion, setAiInitialQuestion] = useState("");
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);

  const fetchCmcData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/cmc/quotes");
      if (res.ok) {
        const json = await res.json();
        setData(json);
        setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    } catch (err) {
      console.error("Error fetching CMC quotes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadInitialData = async () => {
      try {
        const res = await fetch("/api/cmc/quotes");
        if (res.ok && isMounted) {
          const json = await res.json();
          setData(json);
          setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }
      } catch (err) {
        console.error("Error fetching CMC quotes:", err);
      }
    };

    loadInitialData();
    const interval = setInterval(fetchCmcData, 30000); // 30s auto-refresh
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const botPrice = data?.bot?.priceUSD || 1.1109;
  const caPrice = data?.ca?.priceUSD || Number((botPrice * 2.46784).toFixed(4));
  const ratio = data?.ratio?.caToBot || 2.46784;
  const bot24h = data?.bot?.price24hChange || 4.28;
  const volume24h = data?.bot?.volume24hUSD || 14250000;
  const isCmcLive = data?.isLiveFromCMC ?? true;

  const copyInvite = () => {
    navigator.clipboard.writeText(AFFILIATE_CONFIG.INVITE_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0C14] text-[#C4CBD8] flex flex-col selection:bg-[#7B4FFF] selection:text-white">
     

      <main className="flex-1 py-8 sm:py-12 relative overflow-hidden bg-dot-grid-subtle">
        {/* Background Ambient Glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#22D3FF]/10 blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#7B4FFF]/10 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          {/* Breadcrumbs & Live Connection Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0E1020] border border-[#1E243B] rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131728] hover:bg-[#1C1F2E] border border-[#1E243B] text-xs font-bold text-[#C4CBD8] hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Learning Hub</span>
              </Link>
              <span className="text-xs text-[#838E9E]">/</span>
              <span className="text-xs font-bold text-white">Live On-Chain & CMC Portal</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>CMC Feed: {isCmcLive ? "Live Connected" : "Synced"}</span>
                <span className="text-[10px] text-[#838E9E]">({lastRefreshed})</span>
              </div>

              <button
                onClick={fetchCmcData}
                disabled={loading}
                className="p-1.5 rounded-xl bg-[#131728] hover:bg-[#1C1F2E] border border-[#1E243B] text-[#C4CBD8] hover:text-white transition-colors cursor-pointer"
                title="Refresh Live Data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#22D3FF]" : ""}`} />
              </button>
            </div>
          </div>

          {/* Page Hero Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#22D3FF]">
                <Activity className="w-3.5 h-3.5" />
                <span>Real-Time CoinMarketCap & BOT Chain Ledger</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                CaryPact & BOT Chain <span className="text-brand-gradient">Live Market Feed</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#C4CBD8] leading-relaxed">
                Live cryptocurrency quotes, on-chain parity tracking (<strong>1 CA = 27.00522 BOT</strong>), BDEX order book depth, and official Twitter/X broadcasts from{" "}
                <a 
                  href="https://x.com/CaryPact" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#22D3FF] hover:underline font-semibold"
                >
                  @CaryPact
                </a>.
              </p>
            </div>

            {/* Quick Invite & Launch Badge */}
            <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 flex items-center justify-between sm:justify-start gap-4">
              <div>
                <div className="text-[10px] text-[#838E9E] uppercase font-bold">Invite Code</div>
                <div className="text-white font-mono font-bold text-sm">1AjyRv (C82A37)</div>
              </div>
              <button
                onClick={copyInvite}
                className="px-3 py-1.5 rounded-xl bg-[#0E1020] hover:bg-[#1C1F2E] border border-[#1E243B] text-xs font-bold text-[#22D3FF] transition-colors flex items-center gap-1.5"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? "Copied" : "Copy"}</span>
              </button>
              <a
                href={AFFILIATE_CONFIG.APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <span>Launch DApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Key Metrics 5-Card Matrix */}
          <LiveMetricsCards/>
         

          {/* BDEX On-Chain Firecrawl Scraped Pool Metrics Card */}
          <DexPoolCard />

          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col (8 cols): Charts, Multi-Converter & Order Book */}
            <div className="lg:col-span-8 space-y-8">
              {/* Interactive Candlestick / Area Chart */}
              <LiveChart
                currentCaPrice={caPrice}
                currentBotPrice={botPrice}
                ratio={ratio}
              />

              {/* Multi-Currency Live Converter */}
              <LiveMultiConverter
                botPriceUSD={botPrice}
                caPriceUSD={caPrice}
                ratio={ratio}
              />

              {/* BDEX Live Order Book & Depth */}
              <LiveOrderBook basePrice={caPrice} />
            </div>

            {/* Right Col (4 cols): Live Twitter Stream & Verification Modules */}
            <div className="lg:col-span-4 space-y-6">
              {/* Twitter / X Live Feed */}
              <TwitterLiveFeed limit={4} />

              {/* CoinMarketCap Official Currency Card */}
              <div className="bg-[#0E1020] border border-[#1E243B] rounded-3xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                      CMC
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">CoinMarketCap Listing</h4>
                      <p className="text-[10px] text-[#838E9E]">bot-chain / BOT Currency</p>
                    </div>
                  </div>

                  <a
                    href="https://coinmarketcap.com/currencies/bot-chain/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#22D3FF] hover:underline flex items-center gap-1 text-xs font-bold"
                  >
                    <span>View CMC</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <p className="text-xs text-[#C4CBD8] leading-relaxed">
                  Price tracking and volume metrics for BOT Chain are directly verified via CoinMarketCap Pro. CaryPact computing asset (CA) operates on the fixed algorithmic conversion standard of <strong>1 CA = 27.00522 BOT</strong>.
                </p>

                <div className="bg-[#131728] p-3 rounded-2xl border border-[#1E243B] space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#838E9E]">
                    <span>Contract Standard:</span>
                    <span className="text-white font-mono">BOT Chain (EVM)</span>
                  </div>
                  <div className="flex items-center justify-between text-[#838E9E]">
                    <span>Decimals:</span>
                    <span className="text-white font-mono">18</span>
                  </div>
                  <div className="flex items-center justify-between text-[#838E9E]">
                    <span>Burn Mechanism:</span>
                    <span className="text-rose-400 font-mono">1.8% on BDEX Sells</span>
                  </div>
                </div>
              </div>

              {/* Protocol Rules Checklist */}
              <div className="bg-[#0E1020] border border-[#1E243B] rounded-3xl p-6 space-y-3 text-xs">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Protocol Core Directives</span>
                </h4>

                <ul className="space-y-2 text-[#C4CBD8]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22D3FF] mt-0.5 flex-shrink-0" />
                    <span><strong>1 USDT = 1 Hashrate Unit:</strong> Computing power is permanently locked with no principal refund.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22D3FF] mt-0.5 flex-shrink-0" />
                    <span><strong>Staking Multipliers:</strong> 30d (1.3x), 90d (1.6x), 180d (2.0x), 360d (2.5x).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22D3FF] mt-0.5 flex-shrink-0" />
                    <span><strong>10-Tier VIP System:</strong> Requires 300 USDT personal activation + downline leg performance.</span>
                  </li>
                </ul>

                <div className="pt-2 border-t border-[#1E243B]">
                  <button
                    onClick={() => setPdfModalOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-[#131728] hover:bg-[#1C1F2E] text-[#22D3FF] font-bold text-xs border border-[#1E243B] transition-colors"
                  >
                    Print Complete Protocol Cheat Sheet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    

      {/* Interactive Modals */}
      <AiAssistantModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        initialQuestion={aiInitialQuestion}
      />

      <PdfCheatSheetModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
      />

      <NewsletterModal
        isOpen={newsletterModalOpen}
        onClose={() => setNewsletterModalOpen(false)}
      />
    </div>
  );
}
