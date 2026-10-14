"use client";

import { AFFILIATE_CONFIG, ECOSYSTEM_METRICS } from "@/config/constants";
import { useCaPrice } from "@/hooks/useCaPrice";
import {
    AlertTriangle,
    ArrowRightLeft,
    Check,
    Coins,
    Copy,
    ExternalLink,
    Flame
} from "lucide-react";
import { useState } from "react";

type Asset = "CA" | "BOT" | "USDT";

// Fee split as stated on the site. Not verified against protocol docs here.
const BURN_PERCENT = 1.8;
const NODE_PERCENT = 3.2;
const SLIPPAGE = ECOSYSTEM_METRICS.SLIPPAGE_FEE_PERCENT / 100;

export default function LiveMultiConverter() {
  // Live: botPerCa = BDEX pool rate (BOT per 1 CA), botUsd = CMC, caUsd = botPerCa * botUsd.
  // Each is null until valid. There are no hardcoded fallbacks.
  const { botPerCa, botUsd, caUsd, status, updatedAt } = useCaPrice();

  const [amount, setAmount] = useState<number>(100);
  const [sourceAsset, setSourceAsset] = useState<Asset>("CA");
  const [targetAsset, setTargetAsset] = useState<Asset>("BOT");
  const [includeSlippage, setIncludeSlippage] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // USD per 1 unit. USDT is assumed to be $1 (peg), and the pool's WBOT is treated as BOT.
  const usdPer: Record<Asset, number | null> = { USDT: 1, BOT: botUsd, CA: caUsd };

  // Target units per 1 source unit, or null if the needed live data is missing.
  const unitRate = (src: Asset, tgt: Asset): number | null => {
    if (src === tgt) return 1;
    if (src === "CA" && tgt === "BOT") return botPerCa;
    if (src === "BOT" && tgt === "CA") return botPerCa !== null ? 1 / botPerCa : null;
    const s = usdPer[src];
    const t = usdPer[tgt];
    return s !== null && t !== null && t > 0 ? s / t : null;
  };

  const rate = unitRate(sourceAsset, targetAsset);
  const grossValue = rate !== null ? amount * rate : null;

  // Same fee semantics as before: sells of CA (any target) and BOT -> USDT carry the fee;
  // the burn/node split is only shown for CA sells.
  const feeApplies =
    includeSlippage &&
    (sourceAsset === "CA"
      ? targetAsset !== "CA"
      : sourceAsset === "BOT" && targetAsset === "USDT");
  const splitApplies = sourceAsset === "CA" && targetAsset !== "CA";

  const slippageFee = grossValue !== null && feeApplies ? grossValue * SLIPPAGE : 0;
  const convertedValue = grossValue !== null ? grossValue - slippageFee : null;
  const burnShare =
    grossValue !== null && splitApplies ? grossValue * (BURN_PERCENT / 100) : null;
  const nodeShare =
    grossValue !== null && splitApplies ? grossValue * (NODE_PERCENT / 100) : null;

  // Hashrate units equivalent (1 USDT = 1 Hashrate Unit)
  const sourceUsdPer = usdPer[sourceAsset];
  const sourceUsd = sourceUsdPer !== null ? amount * sourceUsdPer : null;

  const priceLabel =
    status === "loading"
      ? "Loading"
      : status === "unavailable"
      ? "Unavailable"
      : status === "stale"
      ? "Stale"
      : "Live";

  const handleSwapAssets = () => {
    setSourceAsset(targetAsset);
    setTargetAsset(sourceAsset);
  };

  const copyResult = () => {
    if (convertedValue === null) return;
    void navigator.clipboard?.writeText(convertedValue.toFixed(4)).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0E1020] border border-[#1E243B] rounded-3xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#1E243B]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#22D3FF]">
            <Coins className="w-3.5 h-3.5" />
            <span>Multi-Currency On-Chain Converter</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
            Live Rate & Pool Rate Calculator
          </h3>
        </div>

        {/* Live pool rate badge */}
        <div className="bg-[#131728] border border-[#2A314D] px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs">
          <span className="text-[#838E9E]">Pool Rate:</span>
          <span className="text-white font-bold font-mono">
            {botPerCa !== null ? `1 CA = ${botPerCa.toFixed(6)} BOT` : "—"}
          </span>
          <span
            className={`text-[10px] font-semibold ${
              status === "ok" ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {priceLabel}
            {status === "stale" && updatedAt
              ? ` (${new Date(updatedAt).toLocaleTimeString()})`
              : ""}
          </span>
        </div>
      </div>

      {status === "unavailable" && (
        <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" />
          <p className="leading-snug">
            Live price unavailable. Conversions that need it are disabled until a valid price loads.
          </p>
        </div>
      )}

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source Input */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#838E9E]">
            <span>You Convert (Source)</span>
            <span>Est. Value: {sourceUsd !== null ? `$${sourceUsd.toFixed(2)}` : "—"}</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min="0"
              value={amount || ""}
              onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
              className="w-full bg-transparent text-xl sm:text-2xl font-black text-white focus:outline-none font-mono"
              placeholder="0.00"
            />

            <select
              value={sourceAsset}
              onChange={(e) => setSourceAsset(e.target.value as Asset)}
              className="bg-[#0E1020] border border-[#1E243B] text-white font-bold text-xs rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
            >
              <option value="CA">CA (CaryPact)</option>
              <option value="BOT">BOT (BOT Chain)</option>
              <option value="USDT">USDT (Tether)</option>
            </select>
          </div>

          {/* Quick preset chips */}
          <div className="flex items-center gap-1.5 pt-2 text-[11px]">
            {[50, 100, 500, 1000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setAmount(preset)}
                className="px-2 py-0.5 rounded-lg bg-[#0E1020] hover:bg-[#1C1F2E] border border-[#1E243B] text-[#C4CBD8] hover:text-white transition-colors"
              >
                +{preset}
              </button>
            ))}
          </div>
        </div>

        {/* Target Output */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-2 relative">
          <div className="flex items-center justify-between text-xs font-semibold text-[#838E9E]">
            <span>You Receive (Target)</span>
            <button
              onClick={copyResult}
              disabled={convertedValue === null}
              className="text-[#22D3FF] hover:underline flex items-center gap-1 text-[11px] disabled:opacity-40 disabled:no-underline"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied" : "Copy Value"}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-full text-xl sm:text-2xl font-black text-emerald-400 font-mono overflow-x-auto no-scrollbar">
              {convertedValue === null
                ? "—"
                : convertedValue.toLocaleString(undefined, { maximumFractionDigits: 4 })}
            </div>

            <select
              value={targetAsset}
              onChange={(e) => setTargetAsset(e.target.value as Asset)}
              className="bg-[#0E1020] border border-[#1E243B] text-white font-bold text-xs rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
            >
              <option value="BOT">BOT (BOT Chain)</option>
              <option value="CA">CA (CaryPact)</option>
              <option value="USDT">USDT (Tether)</option>
            </select>
          </div>

          <div className="text-[11px] text-[#838E9E] pt-2 flex items-center justify-between">
            <span>
              Rate:{" "}
              {rate !== null
                ? `1 ${sourceAsset} ≈ ${rate.toFixed(4)} ${targetAsset}`
                : "—"}
            </span>
            <button
              type="button"
              onClick={handleSwapAssets}
              className="p-1 rounded-lg bg-[#0E1020] hover:bg-[#1C1F2E] border border-[#1E243B] text-[#22D3FF] transition-colors"
              title="Swap Asset Direction"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <p className="text-[10px] text-[#838E9E] leading-snug">
        Spot-rate estimates from the live BDEX pool rate and the CoinMarketCap BOT price. USDT is
        assumed to be $1 and WBOT = BOT. Real swaps in a thin pool can see significant price impact.
      </p>

      {/* Slippage & Hashrate Rule Breakdown */}
      <div className="bg-[#0A0C14] border border-[#1E243B] rounded-2xl p-4 sm:p-5 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-white font-bold flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>BDEX {(SLIPPAGE * 100).toFixed(0)}% Slippage Deductions (When Selling)</span>
          </span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSlippage}
              onChange={(e) => setIncludeSlippage(e.target.checked)}
              className="rounded bg-[#131728] border-[#1E243B] text-[#7B4FFF] focus:ring-0 cursor-pointer"
            />
            <span className="text-[11px] text-[#838E9E]">
              Apply {(SLIPPAGE * 100).toFixed(0)}% Slippage
            </span>
          </label>
        </div>

        {includeSlippage && (sourceAsset === "CA" || sourceAsset === "BOT") && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="bg-[#131728] p-2.5 rounded-xl border border-[#1E243B]">
              <div className="text-[10px] text-[#838E9E]">{BURN_PERCENT}% Auto Buyback & Burn</div>
              <div className="text-white font-bold font-mono mt-0.5">
                {burnShare !== null ? `-${burnShare.toFixed(4)} ${targetAsset}` : "—"}
              </div>
            </div>
            <div className="bg-[#131728] p-2.5 rounded-xl border border-[#1E243B]">
              <div className="text-[10px] text-[#838E9E]">{NODE_PERCENT}% Node Validator Pool</div>
              <div className="text-white font-bold font-mono mt-0.5">
                {nodeShare !== null ? `-${nodeShare.toFixed(4)} ${targetAsset}` : "—"}
              </div>
            </div>
            <div className="bg-[#131728] p-2.5 rounded-xl border border-[#1E243B]">
              <div className="text-[10px] text-[#838E9E]">Equivalent Hashrate Units</div>
              <div className="text-[#22D3FF] font-bold font-mono mt-0.5">
                {sourceUsd !== null ? `${sourceUsd.toFixed(0)} Units (1 USDT = 1 Unit)` : "—"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <span className="text-xs text-[#838E9E]">
          Ready to participate in CaryPact computing clusters?
        </span>
        <a
          href={AFFILIATE_CONFIG.APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#7B4FFF]/25 transition-all"
        >
          <span>Execute On BDEX (Invite: 1AjyRv)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}