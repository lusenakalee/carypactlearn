"use client";

import {
  Check,
  Copy,
  DollarSign,
  ExternalLink,
  Flame,
  Layers,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface DexPoolCardProps {
  onRatioChange?: (ratio: number) => void;
}

// Blur-pulse skeleton block shown while pool data is loading
function Skeleton({ w, h = "1.2em" }: { w: string; h?: string }) {
  return (
    <span
      className="inline-block rounded-md animate-pulse bg-[#1E243B] blur-[1.5px]"
      style={{ width: w, height: h, verticalAlign: "middle" }}
    />
  );
}

const POOL_URL =
  "https://dex.botchain.ai/pool/add/0x822dc160cc971510cf87999004a28b4a7aefd082/0x546307af427902a75771434df831d88219784e19/0xd5452816194a3784dba983426cce7c122f4abd30";

const CONTRACTS = [
  {
    key: "pool",
    label: "Pool Contract",
    display: "0xd545...abd30",
    full: "0xd5452816194a3784dba983426cce7c122f4abd30",
    color: "text-[#22D3FF]",
  },
  {
    key: "bot",
    label: "BOT Token (Token 0)",
    display: "0x822d...fd082",
    full: "0x822dc160cc971510cf87999004a28b4a7aefd082",
    color: "text-[#A855F7]",
  },
  {
    key: "ca",
    label: "CA Token (Token 1)",
    display: "0x5463...84e19",
    full: "0x546307af427902a75771434df831d88219784e19",
    color: "text-[#22D3FF]",
  },
];

export default function DexPoolCard({ onRatioChange }: DexPoolCardProps) {
  const [poolData, setPoolData] = useState<any>(null);
  // Start true — skeleton renders immediately on mount
  const [loading, setLoading] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("—");

  const fetchPool = useCallback(
    async (force = false) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/dex/pool${force ? "?refresh=true" : ""}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data?.success) {
          setPoolData(data);
          setLastUpdated(
            new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          );
          if (data.pool?.effectiveParityRatio && onRatioChange) {
            onRatioChange(data.pool.effectiveParityRatio);
          }
        }
      } catch (err) {
        console.error("DEX pool fetch error:", err);
      } finally {
        setLoading(false);
      }
    },
    [onRatioChange]
  );

  useEffect(() => {
    fetchPool(false);
    const interval = setInterval(() => fetchPool(false), 25000);
    return () => clearInterval(interval);
  }, [fetchPool]);

  const copyAddress = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const pool = poolData?.pool ?? null;

  return (
    <div className="bg-[#0E1020] border border-[#1E243B] hover:border-[#22D3FF]/40 rounded-3xl p-6 sm:p-7 space-y-6 transition-all relative overflow-hidden shadow-xl">
      {/* Glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#22D3FF]/10 blur-[80px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#7B4FFF] to-[#22D3FF] flex items-center justify-center text-white shadow-lg shadow-[#7B4FFF]/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white tracking-tight">
                BDEX On-Chain Liquidity Pool
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>{poolData?.isLiveScraped ? "Firecrawl Live" : pool ? "Cached" : "Loading"}</span>
              </span>
            </div>
            <p className="text-xs text-[#838E9E]">
              Real-time TVL, 24h Volume, Protocol Fees, and Dynamic Parity Ratio
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchPool(true)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131728] hover:bg-[#1C1F2E] text-[#C4CBD8] hover:text-white text-xs font-semibold border border-[#1E243B] transition-colors cursor-pointer disabled:opacity-60"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#22D3FF]" : ""}`}
            />
            <span>{loading ? "Scraping..." : "Re-scrape"}</span>
            <span className="text-[10px] text-[#838E9E]">({lastUpdated})</span>
          </button>

          <a
            href={POOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#22D3FF]/10 hover:bg-[#22D3FF]/20 text-[#22D3FF] text-xs font-bold border border-[#22D3FF]/30 transition-all"
          >
            <span>Open Pool</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 4-Stat Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* TVL */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#838E9E]">
            <span>Total Liquidity (TVL)</span>
            <DollarSign className="w-3.5 h-3.5 text-[#22D3FF]" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono">
            {pool ? (
              `$${pool.tvlUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            ) : (
              <Skeleton w="7rem" h="1.75rem" />
            )}
          </div>
          <div className="text-[10px] text-[#838E9E]">Verified on BDEX Smart Contract</div>
        </div>

        {/* Volume */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#838E9E]">
            <span>24H Volume</span>
            <span className="text-emerald-400 font-bold text-[11px]">
              {pool ? pool.volume24hChange : <Skeleton w="3rem" h="0.85rem" />}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
            {pool ? (
              `$${pool.volume24hUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            ) : (
              <Skeleton w="7rem" h="1.75rem" />
            )}
          </div>
          <div className="text-[10px] text-[#838E9E]">Active Swaps Volume</div>
        </div>

        {/* Fees */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#838E9E]">
            <span>24H Fees Collected</span>
            <Flame className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
            {pool ? `$${pool.fee24hUSD.toFixed(2)}` : <Skeleton w="5rem" h="1.75rem" />}
          </div>
          <div className="text-[10px] text-[#838E9E]">1.8% Burn / 3.2% Node Pool</div>
        </div>

        {/* APR */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#838E9E]">
            <span>Total Pool APR</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#A855F7]" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#A855F7] font-mono">
            {pool ? `${pool.aprPercent.toFixed(2)}%` : <Skeleton w="4rem" h="1.75rem" />}
          </div>
          <div className="text-[10px] text-[#838E9E]">LP Yield Reward</div>
        </div>
      </div>

      {/* Reserves & Parity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Reserves */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-3">
          <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
            <span>Pool Token Reserves</span>
            <span className="text-[#22D3FF] font-mono text-[11px]">DEX Pool Pair</span>
          </div>

          <div className="space-y-2.5">
            {/* BOT */}
            <div className="flex items-center justify-between bg-[#0E1020] p-3 rounded-xl border border-[#1E243B]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#A855F7]/20 flex items-center justify-center text-[#A855F7] font-bold text-xs">
                  B
                </div>
                <div>
                  <div className="text-xs font-bold text-white">BOT Chain Reserve</div>
                  <div className="text-[10px] text-[#838E9E]">Token 0 (Native EVM)</div>
                </div>
              </div>
              <div className="text-right space-y-0.5">
                <div className="text-sm font-bold text-white font-mono">
                  {pool ? (
                    `${Number(pool.token0.reserve).toFixed(4)} BOT`
                  ) : (
                    <Skeleton w="6rem" h="1rem" />
                  )}
                </div>
                <div className="text-[10px] text-[#838E9E]">
                  {pool ? (
                    `≈ $${(pool.token0.reserve * 1.1109).toFixed(2)}`
                  ) : (
                    <Skeleton w="4rem" h="0.75rem" />
                  )}
                </div>
              </div>
            </div>

            {/* CA */}
            <div className="flex items-center justify-between bg-[#0E1020] p-3 rounded-xl border border-[#1E243B]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#22D3FF]/20 flex items-center justify-center text-[#22D3FF] font-bold text-xs">
                  C
                </div>
                <div>
                  <div className="text-xs font-bold text-white">CaryPact CA Reserve</div>
                  <div className="text-[10px] text-[#838E9E]">Token 1 (Asset Token)</div>
                </div>
              </div>
              <div className="text-right space-y-0.5">
                <div className="text-sm font-bold text-[#22D3FF] font-mono">
                  {pool ? (
                    `${Number(pool.token1.reserve).toFixed(4)} CA`
                  ) : (
                    <Skeleton w="6rem" h="1rem" />
                  )}
                </div>
                <div className="text-[10px] text-[#838E9E]">
                  {pool ? (
                    `≈ $${(pool.token1.reserve * 2.7415).toFixed(2)}`
                  ) : (
                    <Skeleton w="4rem" h="0.75rem" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parity */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-3 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between mb-2">
              <span>Dynamic Protocol Parity</span>
              <span className="px-2 py-0.5 rounded bg-[#22D3FF]/20 text-[#22D3FF] text-[10px] font-bold">
                Protocol Standard
              </span>
            </div>
            <div className="p-3 bg-[#0E1020] rounded-xl border border-[#1E243B] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#838E9E]">System Conversion Parity:</span>
                <span className="text-[#22D3FF] font-mono font-bold text-sm">
                  {pool ? (
                    `1 CA = ${pool.effectiveParityRatio} BOT`
                  ) : (
                    <Skeleton w="8rem" h="1rem" />
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#838E9E]">Inverse Rate:</span>
                <span className="text-emerald-400 font-mono font-semibold">
                  {pool ? (
                    `1 BOT = ${(1 / pool.effectiveParityRatio).toFixed(6)} CA`
                  ) : (
                    <Skeleton w="8rem" h="0.85rem" />
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#838E9E]">DEX Pool Spot Ratio:</span>
                <span className="text-[#A855F7] font-mono">
                  {pool ? (
                    `1 CA = ${pool.poolRatio} BOT`
                  ) : (
                    <Skeleton w="6rem" h="0.85rem" />
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-[#838E9E] bg-[#0E1020]/60 p-2.5 rounded-xl border border-[#1E243B]/60 leading-relaxed">
            <span className="text-white font-medium">Scraped Live via Firecrawl API:</span> Real
            pool reserves and volume are constantly synchronized from the BOT Chain DEX smart
            contracts to dynamically validate liquidity and asset conversion.
          </div>
        </div>
      </div>

      {/* Contracts */}
      <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-2.5">
        <div className="text-xs font-bold text-[#838E9E] uppercase tracking-wider">
          Verified On-Chain Smart Contracts
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          {CONTRACTS.map(({ key, label, display, full, color }) => (
            <div
              key={key}
              className="bg-[#0E1020] p-2.5 rounded-xl border border-[#1E243B] flex items-center justify-between gap-2"
            >
              <div className="truncate">
                <div className="text-[10px] text-[#838E9E]">{label}</div>
                <div className="font-mono text-white text-[11px] truncate">{display}</div>
              </div>
              <button
                onClick={() => copyAddress(key, full)}
                className={`p-1.5 rounded-lg bg-[#131728] hover:bg-[#1E243B] ${color} transition-colors flex-shrink-0`}
              >
                {copiedKey === key ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}