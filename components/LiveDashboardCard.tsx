"use client";

import { AFFILIATE_CONFIG } from "@/config/constants";
import {
    Activity,
    ArrowDownRight,
    ArrowUpRight,
    Clock,
    Coins,
    Database,
    ExternalLink,
    RefreshCw
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";

function fmtUSD(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(2)}`;
}

export default function LiveDashboardCard() {
  const tLive = useTranslations("live");
  const tCommon = useTranslations("common");

  const [secondsAgo, setSecondsAgo] = useState(3);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeframe, setTimeframe] = useState<"1h" | "24h" | "7d" | "30d" | "1y">("24h");
  
  // Static protocol prices; ratio sourced live from /api/dex/pool (effectiveParityRatio)
  const [caPrice, setCaPrice] = useState(2.7415);
  const [botPrice, setBotPrice] = useState(1.1109);
  const [ratio, setRatio] = useState(1.337631);
  const [priceChange24h, setPriceChange24h] = useState(4.28);
  const [lastTickDir, setLastTickDir] = useState<"up" | "down">("up");
  const [poolStats, setPoolStats] = useState<any>(null);

  const fetchLiveQuotes = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/dex/pool");
      if (res.ok) {
        const data = await res.json();
        if (data?.success) {
          setPoolStats(data.pool);
          setRatio(data.pool.effectiveParityRatio);
        }
      }
    } catch (err) {
      console.warn("Could not fetch pool data:", err);
    } finally {
      setSecondsAgo(0);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadInitialQuotes = async () => {
      try {
        const res = await fetch("/api/dex/pool");
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data?.success) {
            setPoolStats(data.pool);
            setRatio(data.pool.effectiveParityRatio);
          }
        }
      } catch (err) {
        console.warn("Could not load pool data:", err);
      }
    };

    loadInitialQuotes();
    const tickTimer = setInterval(() => {
      setSecondsAgo((prev) => {
        if (prev >= 30) {
          fetchLiveQuotes();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => {
      isMounted = false;
      clearInterval(tickTimer);
    };
  }, []);

  // Sparkline data points based on timeframe
  const getChartPoints = () => {
    switch (timeframe) {
      case "1h": return [2.71, 2.72, 2.73, 2.75, 2.74, 2.75, caPrice];
      case "24h": return [2.62, 2.65, 2.68, 2.66, 2.71, 2.73, caPrice];
      case "7d": return [2.40, 2.48, 2.55, 2.52, 2.65, 2.70, caPrice];
      case "30d": return [2.10, 2.25, 2.38, 2.50, 2.62, 2.70, caPrice];
      case "1y": return [0.80, 1.20, 1.65, 2.10, 2.45, 2.65, caPrice];
    }
  };

  const points = getChartPoints();
  const minP = Math.min(...points);
  const maxP = Math.max(...points);
  const range = maxP - minP || 1;
  const svgPoints = points.map((p, i) => {
    const x = (i / (points.length - 1)) * 300;
    const y = 80 - ((p - minP) / range) * 65;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div 
      id="live-carypact-card"
      className="bg-[#0E1020] border border-[#1E243B] rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between"
    >
      {/* Top Card Ambient Gradient */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#22D3FF]/10 blur-3xl pointer-events-none rounded-full" />
      
      <div>
        {/* Header with Live Pulse & Time */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E243B]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#22D3FF]/10 border border-[#22D3FF]/30 flex items-center justify-center text-[#22D3FF]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">{tLive("title")}</h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {tCommon("cmcLive")}
                </span>
              </div>
              <p className="text-[11px] text-[#838E9E]">{tLive("subtitle")}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#838E9E] hidden sm:inline-flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{secondsAgo}s</span>
            </span>
            <button
              onClick={fetchLiveQuotes}
              id="live-card-refresh-btn"
              disabled={isRefreshing}
              className={`p-1.5 rounded-lg bg-[#131728] border border-[#1E243B] text-[#C4CBD8] hover:text-white hover:border-[#22D3FF] transition-all cursor-pointer ${
                isRefreshing ? "animate-spin text-[#22D3FF]" : ""
              }`}
              title="Refresh live metrics"
              aria-label="Refresh live metrics"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Parity Ribbon Banner */}
        <div className="bg-[#131728] border border-[#2A314D] rounded-xl px-3 py-2 my-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Coins className="w-3.5 h-3.5 text-[#22D3FF]" />
            <span className="text-[#838E9E]">{tLive("parityRatio")}:</span>
            <strong className="text-white font-mono">{tCommon("liveParity")}</strong>
          </div>
          <Link 
            href="/live-data" 
            className="text-[11px] font-bold text-[#22D3FF] hover:underline flex items-center gap-1"
          >
            <span>{tCommon("cmcLive")}</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Primary Metric: CA Token Price */}
        <div className="pt-2 pb-2">
          <div className="text-xs font-semibold text-[#838E9E] uppercase tracking-wider flex items-center justify-between">
            <span>{tLive("caPrice")} (USDT)</span>
            <span className="text-[11px] text-[#A855F7]">{tLive("botPrice")}: ${botPrice.toFixed(4)}</span>
          </div>
          <div className="flex items-baseline gap-3 mt-1">
            <div className={`text-3xl sm:text-4xl font-extrabold tracking-tight transition-colors duration-300 ${
              lastTickDir === "up" ? "text-white" : "text-slate-100"
            }`}>
              ${caPrice.toFixed(4)}
            </div>
            <div className={`flex items-center text-xs sm:text-sm font-bold px-2 py-0.5 rounded-md ${
              priceChange24h >= 0 
                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" 
                : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
            }`}>
              {priceChange24h >= 0 ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              <span>+{priceChange24h}% (24h)</span>
            </div>
          </div>
        </div>

        {/* Mini Sparkline Chart & Timeframe Filter */}
        <div className="bg-[#131728]/70 border border-[#1E243B] rounded-xl p-3 my-2">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#838E9E] font-medium text-[11px]">Trend (USD)</span>
            <div className="flex gap-1 bg-[#0E1020] p-0.5 rounded-lg border border-[#1E243B]">
              {(["1h", "24h", "7d", "30d", "1y"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded cursor-pointer uppercase ${
                    timeframe === tf 
                      ? "bg-[#7B4FFF] text-white" 
                      : "text-[#838E9E] hover:text-white"
                  }`}
                >
                  {tLive(`timeframes.${tf}` as any)}
                </button>
              ))}
            </div>
          </div>
          <div className="h-16 w-full flex items-end">
            <svg viewBox="0 0 300 80" className="w-full h-full overflow-visible">
              <polyline
                fill="none"
                stroke="#22D3FF"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={svgPoints}
              />
            </svg>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <div className="bg-[#131728]/60 border border-[#1E243B] p-2.5 rounded-xl">
            <div className="text-[10px] uppercase font-bold text-[#838E9E] tracking-wider flex items-center justify-between">
              <span>1 CA → BOT</span>
              <Coins className="w-3 h-3 text-[#22D3FF]" />
            </div>
            <div className="text-sm font-bold text-white mt-1 font-mono">{ratio} BOT</div>
            <div className="text-[10px] text-[#838E9E]">{tCommon("onChain")}</div>
          </div>

          <div className="bg-[#131728]/60 border border-[#1E243B] p-2.5 rounded-xl">
            <div className="text-[10px] uppercase font-bold text-[#838E9E] tracking-wider flex items-center justify-between">
              <span>{tLive("botPrice")}</span>
              <a href="https://coinmarketcap.com/currencies/bot-chain/" target="_blank" rel="noopener noreferrer" className="text-[#A855F7] hover:underline">
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="text-sm font-bold text-white mt-1 font-mono">${botPrice.toFixed(4)}</div>
            <div className="text-[10px] text-[#838E9E]">{tCommon("cmcLive")}</div>
          </div>

          <div className="bg-[#131728]/60 border border-[#1E243B] p-2.5 rounded-xl">
            <div className="text-[10px] uppercase font-bold text-[#838E9E] tracking-wider flex items-center justify-between">
              <span>BDEX Pool TVL</span>
              <a href="https://dex.botchain.ai/pool/add/0x822dc160cc971510cf87999004a28b4a7aefd082/0x546307af427902a75771434df831d88219784e19/0xd5452816194a3784dba983426cce7c122f4abd30" target="_blank" rel="noopener noreferrer" className="text-[#22D3FF] hover:underline">
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="text-sm font-bold text-white mt-1 font-mono">
              {poolStats
                ? `${fmtUSD(poolStats.tvlUSD)} TVL`
                : <span className="inline-block w-16 h-4 rounded animate-pulse bg-[#1E243B] blur-[1px]" />}
            </div>
            <div className="text-[10px] text-[#22D3FF]">
              {poolStats
                ? `Vol: ${fmtUSD(poolStats.volume24hUSD)} | ${poolStats.volume24hChange}`
                : <span className="inline-block w-24 h-3 rounded animate-pulse bg-[#1E243B] blur-[1px]" />}
            </div>
          </div>

          <div className="bg-[#131728]/60 border border-[#1E243B] p-2.5 rounded-xl">
            <div className="text-[10px] uppercase font-bold text-[#838E9E] tracking-wider flex items-center justify-between">
              <span>{tLive("dailyEmission")}</span>
              <Database className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="text-sm font-bold text-white mt-1">40,000 CA</div>
            <div className="text-[10px] text-emerald-400">≈ ${(40000 * caPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })} / day</div>
          </div>
        </div>
      </div>

      {/* Card Footer CTAs */}
      <div className="pt-4 mt-2 flex flex-col sm:flex-row gap-2">
        <Link
          href="/live-data"
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md transition-all"
        >
          <Activity className="w-3.5 h-3.5" />
          <span>{tCommon("cmcLive")} (Live Terminal)</span>
        </Link>
        <a
          href={AFFILIATE_CONFIG.APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2.5 px-3 rounded-xl bg-[#1C1F2E] hover:bg-[#2A314D] text-[#C4CBD8] hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-[#2A314D] transition-all"
        >
          <span>{tCommon("register")} (1AjyRv)</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}