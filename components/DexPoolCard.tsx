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
import { useCallback, useEffect, useRef, useState } from "react";
import type { PoolResponse } from "@/lib/bdex-pool";

interface DexPoolCardProps {
  // Called with the live pool rate: WBOT (BOT) per 1 CA
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
    label: "Pool Contract (CA/WBOT V3)",
    full: "0x822dc160cc971510cf87999004a28b4a7aefd082",
    color: "text-[#22D3FF]",
  },
  {
    key: "ca",
    label: "CA Token",
    full: "0x546307af427902a75771434df831d88219784e19",
    color: "text-[#22D3FF]",
  },
  {
    key: "wbot",
    label: "WBOT Token",
    full: "0xd5452816194a3784dba983426cce7c122f4abd30",
    color: "text-[#A855F7]",
  },
];

const POLL_MS = 30 * 1000;
const BOT_USD_POLL_MS = 10 * 60 * 1000;

const shortAddr = (a: string) => `${a.slice(0, 6)}...${a.slice(-5)}`;
const usd = (n: number) =>
  `$${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export default function DexPoolCard({ onRatioChange }: DexPoolCardProps) {
  const [poolRes, setPoolRes] = useState<PoolResponse | null>(null);
  // Start true — skeleton renders immediately on mount
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [botUsd, setBotUsd] = useState<number | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("—");

  // Keep the callback in a ref so an inline parent handler can't retrigger the poll loop
  const onRatioRef = useRef(onRatioChange);
  useEffect(() => {
    onRatioRef.current = onRatioChange;
  }, [onRatioChange]);

  const fetchPool = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bdex/pool", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: PoolResponse = await res.json();
      setPoolRes(json);
      setFailed(false);
      setLastUpdated(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      const p = json.rate.price;
      if (
        json.rate.status === "ok" &&
        p !== null &&
        Number.isFinite(p) &&
        p > 0
      ) {
        onRatioRef.current?.(p);
      }
    } catch (err) {
      console.error("BDEX pool fetch error:", err);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPool();
    const interval = setInterval(fetchPool, POLL_MS);
    return () => clearInterval(interval);
  }, [fetchPool]);

  // BOT/USD from the existing CMC route (server-cached) for USD-valued reserves
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/bot-price");
        const json: { priceUSD?: number | null; error?: string } =
          await res.json();
        const p = json.priceUSD;
        if (
          alive &&
          res.ok &&
          !json.error &&
          typeof p === "number" &&
          Number.isFinite(p) &&
          p > 0
        ) {
          setBotUsd(p);
        }
      } catch {
        // keep previous value
      }
    };
    load();
    const id = setInterval(load, BOT_USD_POLL_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const copyAddress = (key: string, text: string) => {
    void navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const pool = poolRes?.pool ?? null;
  const pending = !pool && loading;

  const state: "loading" | "ok" | "stale" | "unavailable" = !poolRes
    ? loading
      ? "loading"
      : "unavailable"
    : failed
    ? "stale"
    : poolRes.status;

  const stateLabel = {
    loading: "Loading",
    ok: "BDEX API",
    stale: "Stale",
    unavailable: "Unavailable",
  }[state];

  const rate =
    poolRes &&
    poolRes.rate.status !== "unavailable" &&
    poolRes.rate.price !== null &&
    Number.isFinite(poolRes.rate.price) &&
    poolRes.rate.price > 0
      ? poolRes.rate.price
      : null;
  const rateStale = poolRes?.rate.status === "stale";

  const caReserveUsd =
    pool && rate !== null && botUsd !== null
      ? pool.caReserve * rate * botUsd
      : null;
  const wbotReserveUsd =
    pool && botUsd !== null ? pool.wbotReserve * botUsd : null;

  const volChange = pool?.volume24hChangePercent ?? null;

  // text -> value, null -> skeleton while loading, else an explicit dash
  const cell = (text: string | null, w: string, h?: string) =>
    text !== null ? text : pending ? <Skeleton w={w} h={h} /> : "—";

  const ok = state === "ok";

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
              <span
                className={`px-2 py-0.5 rounded-full border text-[10px] font-bold flex items-center gap-1 ${
                  ok
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                    : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    ok ? "bg-emerald-400 animate-ping" : "bg-amber-400"
                  }`}
                />
                <span>{stateLabel}</span>
              </span>
            </div>
            <p className="text-xs text-[#838E9E]">
              TVL, 24h volume, fees, and the live CA / WBOT pool rate from the
              BDEX public API
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchPool()}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#131728] hover:bg-[#1C1F2E] text-[#C4CBD8] hover:text-white text-xs font-semibold border border-[#1E243B] transition-colors cursor-pointer disabled:opacity-60"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#22D3FF]" : ""}`}
            />
            <span>{loading ? "Refreshing..." : "Refresh"}</span>
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
            {cell(pool ? usd(pool.tvlUsd) : null, "7rem", "1.75rem")}
          </div>
          <div className="text-[10px] text-[#838E9E]">Source: BDEX API</div>
        </div>

        {/* Volume */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#838E9E]">
            <span>24H Volume</span>
            <span
              className={`font-bold text-[11px] ${
                volChange !== null && volChange < 0
                  ? "text-red-400"
                  : "text-emerald-400"
              }`}
            >
              {cell(
                pool
                  ? volChange !== null
                    ? `${volChange >= 0 ? "+" : ""}${volChange.toFixed(2)}%`
                    : "—"
                  : null,
                "3rem",
                "0.85rem"
              )}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
            {cell(pool ? usd(pool.volume24hUsd) : null, "7rem", "1.75rem")}
          </div>
          <div className="text-[10px] text-[#838E9E]">Swap volume, past 24h</div>
        </div>

        {/* Fees */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#838E9E]">
            <span>24H Fees Collected</span>
            <Flame className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono">
            {cell(pool ? `$${pool.fees24hUsd.toFixed(2)}` : null, "5rem", "1.75rem")}
          </div>
          <div className="text-[10px] text-[#838E9E]">
            {pool
              ? `Fee tier ${pool.feeTierPercent}%${
                  pool.transactions24h !== null
                    ? ` · ${pool.transactions24h} swaps`
                    : ""
                }`
              : "Fee tier —"}
          </div>
        </div>

        {/* APR */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-1">
          <div className="flex items-center justify-between text-xs text-[#838E9E]">
            <span>LP Fee APR</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#A855F7]" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-[#A855F7] font-mono">
            {cell(pool ? `${pool.feeAprPercent.toFixed(2)}%` : null, "4rem", "1.75rem")}
          </div>
          <div className="text-[10px] text-[#838E9E]">
            BDEX-reported, not guaranteed
          </div>
        </div>
      </div>

      {/* Reserves & Pool Rate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Reserves */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-3">
          <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
            <span>Pool Token Reserves</span>
            <span className="text-[#22D3FF] font-mono text-[11px]">CA / WBOT</span>
          </div>

          <div className="space-y-2.5">
            {/* CA (base token) */}
            <div className="flex items-center justify-between bg-[#0E1020] p-3 rounded-xl border border-[#1E243B]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#22D3FF]/20 flex items-center justify-center text-[#22D3FF] font-bold text-xs">
                  C
                </div>
                <div>
                  <div className="text-xs font-bold text-white">CaryPact CA Reserve</div>
                  <div className="text-[10px] text-[#838E9E]">Base token</div>
                </div>
              </div>
              <div className="text-right space-y-0.5">
                <div className="text-sm font-bold text-[#22D3FF] font-mono">
                  {cell(
                    pool ? `${pool.caReserve.toFixed(4)} CA` : null,
                    "6rem",
                    "1rem"
                  )}
                </div>
                <div className="text-[10px] text-[#838E9E]">
                  {cell(
                    pool
                      ? caReserveUsd !== null
                        ? `≈ ${usd(caReserveUsd)}`
                        : "≈ —"
                      : null,
                    "4rem",
                    "0.75rem"
                  )}
                </div>
              </div>
            </div>

            {/* WBOT (quote token) */}
            <div className="flex items-center justify-between bg-[#0E1020] p-3 rounded-xl border border-[#1E243B]">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#A855F7]/20 flex items-center justify-center text-[#A855F7] font-bold text-xs">
                  B
                </div>
                <div>
                  <div className="text-xs font-bold text-white">WBOT Reserve</div>
                  <div className="text-[10px] text-[#838E9E]">Quote token</div>
                </div>
              </div>
              <div className="text-right space-y-0.5">
                <div className="text-sm font-bold text-white font-mono">
                  {cell(
                    pool ? `${pool.wbotReserve.toFixed(4)} WBOT` : null,
                    "6rem",
                    "1rem"
                  )}
                </div>
                <div className="text-[10px] text-[#838E9E]">
                  {cell(
                    pool
                      ? wbotReserveUsd !== null
                        ? `≈ ${usd(wbotReserveUsd)}`
                        : "≈ —"
                      : null,
                    "4rem",
                    "0.75rem"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pool Rate */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-3 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between mb-2">
              <span>CA / WBOT Pool Rate</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  rate !== null && !rateStale
                    ? "bg-[#22D3FF]/20 text-[#22D3FF]"
                    : "bg-amber-500/20 text-amber-400"
                }`}
              >
                {rate === null
                  ? pending
                    ? "Loading"
                    : "Unavailable"
                  : rateStale
                  ? "Stale"
                  : "Pool-derived"}
              </span>
            </div>
            <div className="p-3 bg-[#0E1020] rounded-xl border border-[#1E243B] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#838E9E]">Current Rate:</span>
                <span className="text-[#22D3FF] font-mono font-bold text-sm">
                  {cell(
                    rate !== null ? `1 CA = ${rate.toFixed(6)} WBOT` : null,
                    "8rem",
                    "1rem"
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#838E9E]">Inverse Rate:</span>
                <span className="text-emerald-400 font-mono font-semibold">
                  {cell(
                    rate !== null ? `1 WBOT = ${(1 / rate).toFixed(6)} CA` : null,
                    "8rem",
                    "0.85rem"
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#838E9E]">Source:</span>
                <span className="text-[#A855F7] font-mono">
                  BDEX pair summary (V3)
                </span>
              </div>
              {rateStale && poolRes?.rate.updatedAt && (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#838E9E]">As of:</span>
                  <span className="text-amber-400 font-mono">
                    {new Date(poolRes.rate.updatedAt).toLocaleTimeString()}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="text-[11px] text-[#838E9E] bg-[#0E1020]/60 p-2.5 rounded-xl border border-[#1E243B]/60 leading-relaxed">
            <span className="text-white font-medium">How to read this:</span> a
            pool-derived rate from the BDEX V3 pool. Liquidity is thin, so a
            single trade can move it, and it is not a fixed or guaranteed
            conversion. USD values use the CoinMarketCap BOT price and assume
            WBOT = BOT.
          </div>
        </div>
      </div>

      {/* Contracts */}
      <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-2.5">
        <div className="text-xs font-bold text-[#838E9E] uppercase tracking-wider">
          Pool &amp; Token Contracts (BDEX)
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          {CONTRACTS.map(({ key, label, full, color }) => (
            <div
              key={key}
              className="bg-[#0E1020] p-2.5 rounded-xl border border-[#1E243B] flex items-center justify-between gap-2"
            >
              <div className="truncate">
                <div className="text-[10px] text-[#838E9E]">{label}</div>
                <div className="font-mono text-white text-[11px] truncate">
                  {shortAddr(full)}
                </div>
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