"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { 
  Calculator, 
  ArrowLeftRight, 
  Sparkles, 
  AlertTriangle, 
  Info, 
  Coins, 
  ExternalLink
} from "lucide-react";
import { STAKING_TERMS, ECOSYSTEM_METRICS, AFFILIATE_CONFIG } from "@/config/constants";
import type { MarketDataPayload } from "@/lib/market-data-types";

export default function ConversionCalculator() {
  const tCalc = useTranslations("calculator");
  const tCommon = useTranslations("common");

  const [calcMode, setCalcMode] = useState<"instant_swap" | "staking_yield">("instant_swap");

  // Live market data (BOT/CA + BOT/USDT pools, PoS Mining) from /api/market-data.
  // Falls back to the static config below while loading or if the fetch fails.
  const [marketData, setMarketData] = useState<MarketDataPayload | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/market-data")
      .then((res) => {
        if (!res.ok) throw new Error(`market-data responded ${res.status}`);
        return res.json() as Promise<MarketDataPayload>;
      })
      .then((data) => {
        if (!cancelled) setMarketData(data);
      })
      .catch((err) => {
        console.error("Failed to load live market data, using static fallback", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Instant Swap state
  const [swapDirection, setSwapDirection] = useState<"ca_to_usdt" | "usdt_to_ca">("ca_to_usdt");
  const [swapAmount, setSwapAmount] = useState<number>(100);
  const caPrice = marketData?.swap.caPriceUsdt ?? ECOSYSTEM_METRICS.CA_BASE_PRICE;
  const swapPriceIsLive = marketData?.swap.priceSource === "live";

  // Staking & Hashrate Simulation state
  const [simulationPrincipal, setSimulationPrincipal] = useState<number>(1000);
  const [selectedTermId, setSelectedTermId] = useState<string>("360d");
  const [assumedDailyGrowth, setAssumedDailyGrowth] = useState<number>(0.3);

  // Overlay live PoS Mining rates onto the configured term list by id, so the
  // UI keeps its known set of terms/labels even if the live payload is
  // missing or only covers some of them.
  const stakingTerms = STAKING_TERMS.map((term) => {
    const live = marketData?.posMining.terms.find((t) => t.id === term.id);
    return live ? { ...term, avgDaily: live.avgDaily, multiplier: live.multiplier } : term;
  });

  // Calculate swap metrics
  const slippageTotalPercent = ECOSYSTEM_METRICS.SLIPPAGE_FEE_PERCENT; // 5%

  let estimatedReceived = 0;
  let feeAmountUsd = 0;

  if (swapDirection === "ca_to_usdt") {
    const grossUsdt = swapAmount * caPrice;
    const feeUsdt = grossUsdt * (slippageTotalPercent / 100);
    estimatedReceived = grossUsdt - feeUsdt;
    feeAmountUsd = feeUsdt;
  } else {
    const grossCa = swapAmount / caPrice;
    estimatedReceived = grossCa;
    feeAmountUsd = 0;
  }

  // Calculate Staking Simulation
  const selectedTerm = stakingTerms.find((t) => t.id === selectedTermId) || stakingTerms[0];
  const effectiveDailyRate = selectedTerm.avgDaily * selectedTerm.multiplier;
  const days = selectedTerm.durationDays || 30;
  
  const startingCA = simulationPrincipal / caPrice;
  const estimatedTotalCA = startingCA * Math.pow(1 + effectiveDailyRate, days);
  const earnedCA = estimatedTotalCA - startingCA;
  
  const projectedFuturePrice = caPrice * Math.pow(1 + assumedDailyGrowth / 100, days);
  const projectedFutureUsdtValue = estimatedTotalCA * projectedFuturePrice;

  return (
    <div 
      id="conversion-calculator-card"
      className="bg-[#0E1020] border border-[#1E243B] rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between"
    >
      {/* Background Accent Glow */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#A855F7]/10 blur-3xl pointer-events-none rounded-full" />

      <div>
        {/* Header with Mode Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E243B]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#A855F7]/10 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7]">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">{tCalc("title")}</h2>
              <p className="text-[11px] text-[#838E9E]">{tCalc("subtitle")}</p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-[#131728] p-1 rounded-xl border border-[#1E243B]">
            <button
              onClick={() => setCalcMode("instant_swap")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                calcMode === "instant_swap"
                  ? "bg-[#7B4FFF] text-white shadow-md"
                  : "text-[#838E9E] hover:text-white"
              }`}
            >
              {tCalc("tabSwap")}
            </button>
            <button
              onClick={() => setCalcMode("staking_yield")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                calcMode === "staking_yield"
                  ? "bg-[#7B4FFF] text-white shadow-md"
                  : "text-[#838E9E] hover:text-white"
              }`}
            >
              {tCalc("tabStaking")}
            </button>
          </div>
        </div>

        {calcMode === "instant_swap" ? (
          /* INSTANT SWAP CONVERTER */
          <div className="pt-4 space-y-4">
            {/* Input Box */}
            <div className="bg-[#131728] border border-[#1E243B] rounded-xl p-3.5 focus-within:border-[#7B4FFF] transition-colors">
              <div className="flex items-center justify-between text-xs text-[#838E9E] mb-1.5">
                <span>{tCalc("youConvert")}</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-medium ${swapPriceIsLive ? "text-[#22D3FF]" : "text-amber-400"}`}
                    title={swapPriceIsLive ? undefined : "Live pool data unavailable — showing cached/fallback price"}
                  >
                    {tCommon("liveParity")}
                    {!swapPriceIsLive && " · cached"}
                  </span>
                  <a href="/live-data" className="text-[10px] text-[#A855F7] hover:underline flex items-center gap-0.5">
                    <span>{tCommon("cmcLive")}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <input
                  type="number"
                  min="1"
                  value={swapAmount || ""}
                  onChange={(e) => setSwapAmount(Math.max(0, Number(e.target.value)))}
                  className="bg-transparent text-2xl font-bold text-white focus:outline-none w-full"
                  placeholder="100"
                />
                <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0E1020] border border-[#1E243B] text-xs font-bold text-white">
                  <Coins className="w-3.5 h-3.5 text-[#22D3FF]" />
                  <span>{swapDirection === "ca_to_usdt" ? "CA Token" : "USDT"}</span>
                </div>
              </div>
              {/* Quick Select Preset Buttons */}
              <div className="flex gap-1.5 mt-2">
                {[10, 50, 100, 500, 1000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setSwapAmount(val)}
                    className="px-2 py-0.5 text-[10px] font-medium rounded bg-[#0E1020] hover:bg-[#1E243B] text-[#838E9E] hover:text-white border border-[#1E243B] transition-colors"
                  >
                    {val} {swapDirection === "ca_to_usdt" ? "CA" : "USDT"}
                  </button>
                ))}
              </div>
            </div>

            {/* Swap Direction Toggle */}
            <div className="flex justify-center -my-2 relative z-10">
              <button
                onClick={() => setSwapDirection(swapDirection === "ca_to_usdt" ? "usdt_to_ca" : "ca_to_usdt")}
                className="p-2 rounded-full bg-[#1C1F2E] border border-[#2A314D] hover:border-[#22D3FF] text-[#22D3FF] hover:scale-110 active:scale-95 transition-all shadow-lg cursor-pointer"
                title="Switch swap direction"
                aria-label="Toggle swap direction"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Output Box */}
            <div className="bg-[#131728] border border-[#1E243B] rounded-xl p-3.5">
              <div className="flex items-center justify-between text-xs text-[#838E9E] mb-1.5">
                <span>{tCalc("youReceive")}</span>
                <span className="text-[11px] text-emerald-400 font-medium">BDEX AMM Pool</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <div className="text-2xl font-bold text-emerald-400">
                  {swapDirection === "ca_to_usdt" 
                    ? `$${estimatedReceived.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT`
                    : `${estimatedReceived.toFixed(4)} CA`
                  }
                </div>
                <div className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0E1020] border border-[#1E243B] text-xs font-bold text-white">
                  <span>{swapDirection === "ca_to_usdt" ? "USDT" : "CA Token"}</span>
                </div>
              </div>
            </div>

            {/* 5% Slippage Transparency Breakdown */}
            {swapDirection === "ca_to_usdt" && (
              <div className="bg-[#131728]/70 border border-[#1E243B] rounded-xl p-3 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[#838E9E]">
                  <span className="flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-[#22D3FF]" />
                    <span>{tCalc("slippageNotice")}</span>
                  </span>
                  <span className="font-semibold text-white">-${feeAmountUsd.toFixed(2)} USDT</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="bg-[#0E1020] p-1.5 rounded border border-[#1E243B] text-[#C4CBD8]">
                    <strong className="text-[#22D3FF]">1.80%</strong> Permanent Burn
                  </div>
                  <div className="bg-[#0E1020] p-1.5 rounded border border-[#1E243B] text-[#C4CBD8]">
                    <strong className="text-[#A855F7]">3.20%</strong> VIP Nodes & LP
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* STAKING & HASHRATE YIELD SIMULATOR */
          <div className="pt-3 space-y-3">
            {/* Investment Input */}
            <div className="bg-[#131728] border border-[#1E243B] rounded-xl p-3">
              <div className="flex items-center justify-between text-xs text-[#838E9E] mb-1">
                <span>{tCalc("stakingDeposit")} (USDT)</span>
                <span className="text-[10px] text-amber-400 font-semibold">1 USDT = 1 Hashrate Unit</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <div className="relative w-full">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white font-bold">$</span>
                  <input
                    type="number"
                    min="100"
                    step="100"
                    value={simulationPrincipal}
                    onChange={(e) => setSimulationPrincipal(Math.max(100, Number(e.target.value)))}
                    className="bg-[#0E1020] border border-[#1E243B] rounded-lg pl-7 pr-3 py-1.5 text-base font-bold text-white focus:outline-none focus:border-[#7B4FFF] w-full"
                  />
                </div>
                <div className="text-right text-xs flex-shrink-0">
                  <span className="text-[#838E9E]">Equiv: </span>
                  <strong className="text-[#22D3FF]">{(simulationPrincipal / caPrice).toFixed(1)} CA</strong>
                </div>
              </div>
            </div>

            {/* Term Lockup Selection */}
            <div>
              <label className="text-[11px] font-semibold text-[#838E9E] uppercase tracking-wider block mb-1.5">
                {tCalc("stakingTerm")}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                {stakingTerms.map((term) => (
                  <button
                    key={term.id}
                    onClick={() => setSelectedTermId(term.id)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      selectedTermId === term.id
                        ? "bg-[#7B4FFF]/20 border-[#7B4FFF] text-white shadow-md shadow-[#7B4FFF]/20"
                        : "bg-[#131728] border-[#1E243B] text-[#838E9E] hover:text-white"
                    }`}
                  >
                    <div className="text-xs font-bold">{term.name}</div>
                    <div className="text-[10px] font-extrabold text-[#22D3FF] mt-0.5">
                      {(term.avgDaily * 100).toFixed(2)}%/day
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulation Results Grid */}
            <div className="bg-[#131728] border border-[#1E243B] rounded-xl p-3 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#0E1020] p-2.5 rounded-lg border border-[#1E243B]">
                <div className="text-[10px] text-[#838E9E] uppercase font-bold">{tCalc("projectedYield")}</div>
                <div className="text-base font-bold text-[#22D3FF] mt-0.5">
                  {estimatedTotalCA.toFixed(1)} CA
                </div>
                <div className="text-[10px] text-emerald-400">+{earnedCA.toFixed(1)} CA yield</div>
              </div>

              <div className="bg-[#0E1020] p-2.5 rounded-lg border border-[#1E243B]">
                <div className="text-[10px] text-[#838E9E] uppercase font-bold">Projected USD Value</div>
                <div className="text-base font-bold text-amber-300 mt-0.5">
                  ${projectedFutureUsdtValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <div className="text-[10px] text-[#838E9E]">At ${(projectedFuturePrice).toFixed(1)}/CA model</div>
              </div>
            </div>

            {/* Mandatory Assumption Caveat */}
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" />
              <p className="leading-snug">
                {tCalc("simulationDisclaimer")}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Card Action Link */}
      <div className="pt-4 mt-2">
        <a
          href={AFFILIATE_CONFIG.APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#7B4FFF]/25 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#22D3FF]" />
          <span>{tCommon("launchCaryPact")}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}