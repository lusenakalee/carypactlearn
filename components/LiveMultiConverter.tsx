"use client";

import { AFFILIATE_CONFIG } from "@/config/constants";
import {
    ArrowRightLeft,
    Check,
    Coins,
    Copy,
    ExternalLink,
    Flame
} from "lucide-react";
import { useState } from "react";

interface LiveMultiConverterProps {
  botPriceUSD?: number;
  caPriceUSD?: number;
  ratio?: number;
}

export default function LiveMultiConverter({
  botPriceUSD = 1.1109,
  caPriceUSD = 2.7415,
  ratio = 1.279615
}: LiveMultiConverterProps) {
  const [amount, setAmount] = useState<number>(100);
  const [sourceAsset, setSourceAsset] = useState<"CA" | "BOT" | "USDT">("CA");
  const [targetAsset, setTargetAsset] = useState<"BOT" | "CA" | "USDT">("BOT");
  const [includeSlippage, setIncludeSlippage] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Conversion calculations
  // 1 CA = 1.279615 BOT
  // 1 BOT = 0.405213 CA
  // BOT in USD = botPriceUSD
  // CA in USD = botPriceUSD * 1.279615
  const computedCaPrice = caPriceUSD || (botPriceUSD * ratio);

  let convertedValue = 0;
  let grossValue = 0;
  let slippageFee = 0;
  let burnShare = 0;
  let nodeShare = 0;

  if (sourceAsset === "CA" && targetAsset === "BOT") {
    // 1 CA -> 1.279615 BOT
    grossValue = amount * ratio;
    slippageFee = includeSlippage ? grossValue * 0.05 : 0;
    burnShare = grossValue * 0.018;
    nodeShare = grossValue * 0.032;
    convertedValue = grossValue - slippageFee;
  } else if (sourceAsset === "BOT" && targetAsset === "CA") {
    // 1 BOT -> 0.405213 CA
    grossValue = amount / ratio;
    convertedValue = grossValue;
  } else if (sourceAsset === "CA" && targetAsset === "USDT") {
    // 1 CA -> computedCaPrice USDT
    grossValue = amount * computedCaPrice;
    slippageFee = includeSlippage ? grossValue * 0.05 : 0;
    burnShare = grossValue * 0.018;
    nodeShare = grossValue * 0.032;
    convertedValue = grossValue - slippageFee;
  } else if (sourceAsset === "USDT" && targetAsset === "CA") {
    // 1 USDT -> (1 / computedCaPrice) CA
    grossValue = amount / computedCaPrice;
    convertedValue = grossValue;
  } else if (sourceAsset === "BOT" && targetAsset === "USDT") {
    grossValue = amount * botPriceUSD;
    slippageFee = includeSlippage ? grossValue * 0.05 : 0;
    convertedValue = grossValue - slippageFee;
  } else if (sourceAsset === "USDT" && targetAsset === "BOT") {
    grossValue = amount / botPriceUSD;
    convertedValue = grossValue;
  } else {
    grossValue = amount;
    convertedValue = amount;
  }

  // Hashrate units equivalent (1 USDT = 1 Hashrate Unit)
  const hashrateUnits = sourceAsset === "USDT" ? amount : sourceAsset === "CA" ? amount * computedCaPrice : amount * botPriceUSD;

  const handleSwapAssets = () => {
    const prevSource = sourceAsset;
    const prevTarget = targetAsset;
    setSourceAsset(prevTarget as any);
    setTargetAsset(prevSource as any);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(convertedValue.toFixed(4));
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
            Live Rate & Parity Calculator
          </h3>
        </div>

        {/* 1 CA = 1.279615 BOT Badge */}
        <div className="bg-[#131728] border border-[#2A314D] px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-xs">
          <span className="text-[#838E9E]">On-Chain Parity:</span>
          <span className="text-white font-bold font-mono">1 CA = {ratio} BOT</span>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Source Input */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#838E9E]">
            <span>You Convert (Source)</span>
            <span>Est. Value: ${((sourceAsset === "CA" ? amount * computedCaPrice : sourceAsset === "BOT" ? amount * botPriceUSD : amount) || 0).toFixed(2)}</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="number"
              min="0"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value) || 0)}
              className="w-full bg-transparent text-xl sm:text-2xl font-black text-white focus:outline-none font-mono"
              placeholder="0.00"
            />

            <select
              value={sourceAsset}
              onChange={(e) => setSourceAsset(e.target.value as any)}
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
              className="text-[#22D3FF] hover:underline flex items-center gap-1 text-[11px]"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? "Copied" : "Copy Value"}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-full text-xl sm:text-2xl font-black text-emerald-400 font-mono overflow-x-auto no-scrollbar">
              {convertedValue.toLocaleString(undefined, { maximumFractionDigits: 4 })}
            </div>

            <select
              value={targetAsset}
              onChange={(e) => setTargetAsset(e.target.value as any)}
              className="bg-[#0E1020] border border-[#1E243B] text-white font-bold text-xs rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
            >
              <option value="BOT">BOT (BOT Chain)</option>
              <option value="CA">CA (CaryPact)</option>
              <option value="USDT">USDT (Tether)</option>
            </select>
          </div>

          <div className="text-[11px] text-[#838E9E] pt-2 flex items-center justify-between">
            <span>Rate: 1 {sourceAsset} ≈ {(grossValue / (amount || 1)).toFixed(4)} {targetAsset}</span>
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

      {/* 5% Slippage & Hashrate Rule Breakdown */}
      <div className="bg-[#0A0C14] border border-[#1E243B] rounded-2xl p-4 sm:p-5 space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-white font-bold flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>BDEX 5% Slippage Deductions (When Selling)</span>
          </span>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSlippage}
              onChange={(e) => setIncludeSlippage(e.target.checked)}
              className="rounded bg-[#131728] border-[#1E243B] text-[#7B4FFF] focus:ring-0 cursor-pointer"
            />
            <span className="text-[11px] text-[#838E9E]">Apply 5% Slippage</span>
          </label>
        </div>

        {includeSlippage && (sourceAsset === "CA" || sourceAsset === "BOT") && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="bg-[#131728] p-2.5 rounded-xl border border-[#1E243B]">
              <div className="text-[10px] text-[#838E9E]">1.8% Auto Buyback & Burn</div>
              <div className="text-white font-bold font-mono mt-0.5">
                -{burnShare.toFixed(4)} {targetAsset}
              </div>
            </div>
            <div className="bg-[#131728] p-2.5 rounded-xl border border-[#1E243B]">
              <div className="text-[10px] text-[#838E9E]">3.2% Node Validator Pool</div>
              <div className="text-white font-bold font-mono mt-0.5">
                -{nodeShare.toFixed(4)} {targetAsset}
              </div>
            </div>
            <div className="bg-[#131728] p-2.5 rounded-xl border border-[#1E243B]">
              <div className="text-[10px] text-[#838E9E]">Equivalent Hashrate Units</div>
              <div className="text-[#22D3FF] font-bold font-mono mt-0.5">
                {hashrateUnits.toFixed(0)} Units (1 USDT = 1 Unit)
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
