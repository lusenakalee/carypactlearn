"use client";

import {
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  TrendingDown,
  TrendingUp
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type BotPriceResponse = {
  symbol: string;
  name: string;
  slug: string;
  priceUSD: number | null;
  percentChange24h: number | null;
  volume24hUSD: number | null;
  marketCapUSD: number | null;
  lastUpdated: string | null;
  isLiveFromCMC: boolean;
  error?: string;
};

const CACHE_MS = 3 * 60 * 60 * 1000; // 3h, matches the API route's revalidate window
const CACHE_KEY = "bot-price-cache-v1";

type CachedBotPrice = { data: BotPriceResponse; fetchedAt: number };

function readCache(): CachedBotPrice | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as CachedBotPrice) : null;
  } catch {
    return null;
  }
}

function writeCache(entry: CachedBotPrice) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    // ignore quota/storage errors
  }
}

export default function LiveMetricsCards() {
  const [data, setData] = useState<any>(null);
  const [botLive, setBotLive] = useState<BotPriceResponse | null>(null);
  const [botLoading, setBotLoading] = useState(true);
  const [botError, setBotError] = useState<string | null>(null);
  const [lastFetchedAt, setLastFetchedAt] = useState<number | null>(null);

  const fetchBotPrice = useCallback(async (force = false) => {
    const cached = readCache();
    const cacheIsFresh = cached && Date.now() - cached.fetchedAt < CACHE_MS;

    if (!force && cacheIsFresh) {
      setBotError(null);
      setBotLive(cached!.data);
      setLastFetchedAt(cached!.fetchedAt);
      setBotLoading(false);
      return;
    }

    try {
      setBotLoading(true);
      const res = await fetch("/api/bot-price", { cache: "no-store" });
      const json: BotPriceResponse = await res.json();

      if (!res.ok || json.error) {
        setBotError(json.error || "Failed to fetch BOT price");
        setBotLive(null);
        return;
      }

      const fetchedAt = Date.now();
      setBotError(null);
      setBotLive(json);
      setLastFetchedAt(fetchedAt);
      writeCache({ data: json, fetchedAt });
    } catch (err: any) {
      setBotError(err?.message || "Failed to fetch BOT price");
      setBotLive(null);
    } finally {
      setBotLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBotPrice();
    // Re-check hourly; fetchBotPrice itself only hits the API once the 3h cache is stale
    const interval = setInterval(() => fetchBotPrice(), 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchBotPrice]);

  const canRefresh =
    lastFetchedAt === null || Date.now() - lastFetchedAt >= CACHE_MS;
  const nextRefreshAt = lastFetchedAt !== null ? lastFetchedAt + CACHE_MS : null;
  const refreshTitle = canRefresh
    ? "Refresh price"
    : `Next refresh available at ${new Date(nextRefreshAt!).toLocaleTimeString()}`;

  const botPrice = botLive?.priceUSD ?? data?.bot?.priceUSD ?? 12.396794;
  const caPrice = data?.ca?.priceUSD || Number((botPrice * 1.337631).toFixed(4));
  const ratio = data?.ratio?.caToBot || 1.337631;
  const bot24h = botLive?.percentChange24h ?? data?.bot?.price24hChange ?? 4.28;
  const volume24h = botLive?.volume24hUSD ?? data?.bot?.volume24hUSD ?? 14250000;
  const isCmcLive = botLive?.isLiveFromCMC ?? data?.isLiveFromCMC ?? true;
  const bot24hIsPositive = bot24h >= 0;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Metric 1: Core Parity Rule */}
        <div className="bg-[#0E1020] border border-[#1E243B] hover:border-[#22D3FF]/50 rounded-2xl p-4.5 space-y-1 transition-all">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#838E9E]">
            <span>On-Chain Parity</span>
            <span className="text-[#22D3FF] font-bold">Fixed Parity</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-white font-mono">
            {ratio} BOT = 1 CA
          </div>
          <div className="text-[10px] text-[#838E9E]">
            {(1 / ratio).toFixed(6)} CA = 1 BOT
          </div>
        </div>

        {/* Metric 2: CA Price in USD */}
        <div className="bg-[#0E1020] border border-[#1E243B] hover:border-[#22D3FF]/50 rounded-2xl p-4.5 space-y-1 transition-all">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#838E9E]">
            <span>CA Price (USDT)</span>
            <span className="text-emerald-400 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+{bot24h}%</span>
            </span>
          </div>
          <div className="text-lg sm:text-xl font-black text-[#22D3FF] font-mono">
            ${caPrice.toFixed(4)}
          </div>
          <div className="text-[10px] text-[#838E9E]">
            Implied from BOT × {ratio}
          </div>
        </div>

        {/* Metric 3: BOT Chain CMC Price (live) */}
        <div className="bg-[#0E1020] border border-[#1E243B] hover:border-[#A855F7]/50 rounded-2xl p-4.5 space-y-1 transition-all">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#838E9E]">
            <span>BOT Price (CMC)</span>
            <a
              href="https://coinmarketcap.com/currencies/bot-chain/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#A855F7] hover:underline flex items-center gap-0.5 text-[10px]"
            >
              <span>CMC</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          <div className="text-lg sm:text-xl font-black text-[#A855F7] font-mono flex items-center gap-2">
            {botLoading && !botLive ? (
              <span className="text-[#838E9E] text-sm animate-pulse">
                Loading...
              </span>
            ) : (
              <>${botPrice.toFixed(4)}</>
            )}
            {!botLoading && (
              <button
                type="button"
                onClick={() => canRefresh && fetchBotPrice(true)}
                disabled={!canRefresh}
                title={refreshTitle}
                className={`transition-colors ${
                  canRefresh
                    ? "text-[#838E9E] hover:text-[#A855F7]"
                    : "text-[#838E9E]/30 cursor-not-allowed"
                }`}
              >
                <RefreshCw className="w-3 h-3" />
              </button>
            )}
          </div>

          <div className="text-[10px] text-[#838E9E] flex items-center gap-1">
            {botError ? (
              <span className="text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-2.5 h-2.5" />
                Live fetch failed — showing fallback
              </span>
            ) : (
              <>
                <span
                  className={`flex items-center gap-0.5 ${
                    bot24hIsPositive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {bot24hIsPositive ? (
                    <TrendingUp className="w-2.5 h-2.5" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5" />
                  )}
                  {bot24h.toFixed(2)}%
                </span>
                <span>· 24h Vol: ${(volume24h / 1000000).toFixed(2)}M</span>
              </>
            )}
          </div>
        </div>

        {/* Metric 4: Daily 40k CA Release */}
        <div className="bg-[#0E1020] border border-[#1E243B] hover:border-amber-500/50 rounded-2xl p-4.5 space-y-1 transition-all">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#838E9E]">
            <span>Daily CA Emission</span>
            <span className="text-amber-300 font-bold">22-Yr Schedule</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-amber-300 font-mono">
            40,000 CA
          </div>
          <div className="text-[10px] text-[#838E9E]">
            ≈ $
            {(40000 * caPrice).toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}{" "}
            / day
          </div>
        </div>

        {/* Metric 5: Max Cap & Supply */}
        <div className="bg-[#0E1020] border border-[#1E243B] hover:border-emerald-500/50 rounded-2xl p-4.5 space-y-1 transition-all col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#838E9E]">
            <span>Total CA Supply</span>
            <span className="text-emerald-400 font-bold">Hard Cap</span>
          </div>
          <div className="text-lg sm:text-xl font-black text-emerald-400 font-mono">
            210,000,000
          </div>
          <div className="text-[10px] text-[#838E9E]">
            -10% every 2 years halving
          </div>
        </div>
      </div>
    </div>
  );
}