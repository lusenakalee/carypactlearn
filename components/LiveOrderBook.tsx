"use client";

import React, { useState, useEffect } from "react";
import { 
  Layers, 
  ArrowDownUp, 
  Flame, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Sparkles
} from "lucide-react";

interface OrderBookProps {
  basePrice?: number;
}

export default function LiveOrderBook({ basePrice = 2.7415 }: OrderBookProps) {
  const [bids, setBids] = useState<Array<{ price: number; amount: number; total: number }>>(() => {
    const initialBids = [];
    let bidAccum = 0;
    for (let i = 1; i <= 5; i++) {
      const p = Number((basePrice - i * 0.08).toFixed(4));
      const amt = 200 + i * 50;
      bidAccum += amt;
      initialBids.push({ price: p, amount: amt, total: bidAccum });
    }
    return initialBids;
  });

  const [asks, setAsks] = useState<Array<{ price: number; amount: number; total: number }>>(() => {
    const initialAsks = [];
    let askAccum = 0;
    for (let i = 5; i >= 1; i--) {
      const p = Number((basePrice + i * 0.08).toFixed(4));
      const amt = 180 + i * 40;
      askAccum += amt;
      initialAsks.push({ price: p, amount: amt, total: askAccum });
    }
    return initialAsks;
  });

  const [recentTrades, setRecentTrades] = useState<Array<{ id: string; price: number; amount: number; time: string; type: "buy" | "sell" }>>(() => [
    { id: "1", price: basePrice, amount: 240, time: "10:42:15", type: "buy" },
    { id: "2", price: Number((basePrice - 0.02).toFixed(2)), amount: 500, time: "10:42:09", type: "sell" },
    { id: "3", price: Number((basePrice + 0.04).toFixed(2)), amount: 120, time: "10:41:55", type: "buy" },
    { id: "4", price: basePrice, amount: 350, time: "10:41:40", type: "buy" },
    { id: "5", price: Number((basePrice - 0.05).toFixed(2)), amount: 80, time: "10:41:20", type: "sell" },
  ]);

  // Generate dynamic live order book updates
  useEffect(() => {
    const generateBook = () => {
      const newAsks = [];
      const newBids = [];
      let askAccum = 0;
      let bidAccum = 0;

      for (let i = 5; i >= 1; i--) {
        const p = Number((basePrice + i * 0.08 + (Math.random() * 0.02 - 0.01)).toFixed(4));
        const amt = Math.round(150 + Math.random() * 450);
        askAccum += amt;
        newAsks.push({ price: p, amount: amt, total: askAccum });
      }

      for (let i = 1; i <= 5; i++) {
        const p = Number((basePrice - i * 0.08 + (Math.random() * 0.02 - 0.01)).toFixed(4));
        const amt = Math.round(180 + Math.random() * 500);
        bidAccum += amt;
        newBids.push({ price: p, amount: amt, total: bidAccum });
      }

      setAsks(newAsks);
      setBids(newBids);
    };

    const interval = setInterval(generateBook, 3500);
    return () => clearInterval(interval);
  }, [basePrice]);

  // Stream recent trades
  useEffect(() => {
    const tradeInterval = setInterval(() => {
      const isBuy = Math.random() > 0.45;
      const jitter = (Math.random() * 0.1 - 0.05);
      const newTrade = {
        id: Math.random().toString(),
        price: Number((basePrice + jitter).toFixed(4)),
        amount: Math.round(50 + Math.random() * 600),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        type: isBuy ? ("buy" as const) : ("sell" as const),
      };

      setRecentTrades((prev) => [newTrade, ...prev.slice(0, 5)]);
    }, 4500);

    return () => clearInterval(tradeInterval);
  }, [basePrice]);

  return (
    <div className="bg-[#0E1020] border border-[#1E243B] rounded-3xl p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1E243B]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#22D3FF]" />
            <h3 className="text-base font-bold text-white">BDEX Live Order Book & Depth</h3>
          </div>
          <p className="text-xs text-[#838E9E]">Real-time liquidity depth and settlement stream</p>
        </div>

        <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active AMM Pool</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Book Depth Table */}
        <div className="space-y-3">
          <div className="grid grid-cols-3 text-[11px] font-bold uppercase tracking-wider text-[#838E9E] px-2">
            <span>Price (USDT)</span>
            <span className="text-right">Size (CA)</span>
            <span className="text-right">Total</span>
          </div>

          {/* Asks (Red / Sell) */}
          <div className="space-y-1">
            {asks.map((a, idx) => (
              <div
                key={`ask-${idx}`}
                className="relative grid grid-cols-3 text-xs font-mono py-1 px-2 rounded hover:bg-[#131728] transition-colors"
              >
                <span className="text-rose-400 font-semibold">${a.price.toFixed(4)}</span>
                <span className="text-right text-[#C4CBD8]">{a.amount}</span>
                <span className="text-right text-[#838E9E]">{a.total}</span>
                {/* Visual Depth Bar */}
                <div 
                  className="absolute inset-y-0 right-0 bg-rose-500/10 pointer-events-none rounded"
                  style={{ width: `${Math.min(100, (a.total / 2500) * 100)}%` }}
                />
              </div>
            ))}
          </div>

          {/* Mid Price Spread Indicator */}
          <div className="py-2.5 px-3 bg-[#131728] border border-[#1E243B] rounded-xl flex items-center justify-between text-xs">
            <span className="text-[#838E9E]">Spread: <strong className="text-white">$0.02 (0.07%)</strong></span>
            <span className="font-bold text-[#22D3FF] font-mono text-sm">${basePrice.toFixed(4)}</span>
          </div>

          {/* Bids (Green / Buy) */}
          <div className="space-y-1">
            {bids.map((b, idx) => (
              <div
                key={`bid-${idx}`}
                className="relative grid grid-cols-3 text-xs font-mono py-1 px-2 rounded hover:bg-[#131728] transition-colors"
              >
                <span className="text-emerald-400 font-semibold">${b.price.toFixed(4)}</span>
                <span className="text-right text-[#C4CBD8]">{b.amount}</span>
                <span className="text-right text-[#838E9E]">{b.total}</span>
                {/* Visual Depth Bar */}
                <div 
                  className="absolute inset-y-0 right-0 bg-emerald-500/10 pointer-events-none rounded"
                  style={{ width: `${Math.min(100, (b.total / 2500) * 100)}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Executed Trades & Slippage Notice */}
        <div className="space-y-4">
          <div>
            <div className="text-xs font-bold text-white mb-2 flex items-center justify-between">
              <span>Recent Executed Trades</span>
              <span className="text-[10px] text-[#838E9E]">BDEX Settlement</span>
            </div>

            <div className="bg-[#0A0C14] border border-[#1E243B] rounded-2xl p-3 space-y-1.5">
              <div className="grid grid-cols-3 text-[10px] font-bold text-[#838E9E] uppercase pb-1 border-b border-[#1E243B]">
                <span>Price</span>
                <span className="text-right">Amount (CA)</span>
                <span className="text-right">Time</span>
              </div>
              {recentTrades.map((t) => (
                <div key={t.id} className="grid grid-cols-3 text-xs font-mono py-0.5 items-center">
                  <span className={t.type === "buy" ? "text-emerald-400 font-semibold" : "text-rose-400 font-semibold"}>
                    ${t.price.toFixed(4)}
                  </span>
                  <span className="text-right text-white">{t.amount}</span>
                  <span className="text-right text-[#838E9E] text-[11px]">{t.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5% Slippage Distribution Micro-Panel */}
          <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>5% Slippage Mechanism</span>
              </span>
              <span className="text-[10px] text-[#838E9E]">Enforced on all Sells</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-[#0E1020] p-2 rounded-xl border border-[#1E243B]">
                <div className="text-[#A855F7] font-bold font-mono">1.8%</div>
                <div className="text-[10px] text-[#838E9E]">Auto Buyback Burn</div>
              </div>
              <div className="bg-[#0E1020] p-2 rounded-xl border border-[#1E243B]">
                <div className="text-[#22D3FF] font-bold font-mono">3.2%</div>
                <div className="text-[10px] text-[#838E9E]">Node Operator Pool</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
