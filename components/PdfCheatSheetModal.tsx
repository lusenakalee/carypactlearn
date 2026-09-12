"use client";

import React from "react";
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Coins, 
  Cpu,
  Layers,
  Sparkles
} from "lucide-react";
import { ECOSYSTEM_METRICS, STAKING_TERMS, VIP_TIERS, AFFILIATE_CONFIG } from "@/config/constants";

interface PdfCheatSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PdfCheatSheetModal({ isOpen, onClose }: PdfCheatSheetModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="pdf-cheatsheet-modal"
        className="bg-[#0E1020] border border-[#1E243B] rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#1E243B] flex items-center justify-between bg-[#131728] print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#A855F7]/20 border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">CaryPact Protocol Reference & Cheat Sheet</h3>
              <p className="text-xs text-[#838E9E]">Printable summary of tokenomics, multipliers, and safety rules</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              id="print-cheatsheet-btn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#838E9E] hover:text-white hover:bg-[#1C1F2E] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-[#C4CBD8] bg-[#0A0C14] print:bg-white print:text-black print:p-8">
          {/* Document Header */}
          <div className="border-b border-[#1E243B] pb-4 print:border-gray-300">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-white print:text-black">
                  CaryPact & BOT Chain Ecosystem Cheat Sheet
                </h1>
                <p className="text-xs text-[#838E9E] print:text-gray-600 mt-0.5">
                  Official Protocol Specs • Mathematical Formulas • Security Guidelines
                </p>
              </div>
              <div className="text-right text-[10px] text-[#838E9E] print:text-gray-500">
                <div>Independent Learning Hub</div>
                <div>Code: 1AjyRv • Suffix: C82A37</div>
              </div>
            </div>
          </div>

          {/* Core Numbers Quick Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 print:gap-2">
            <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B] print:bg-gray-100 print:border-gray-300">
              <div className="text-[10px] font-bold text-[#838E9E] print:text-gray-600 uppercase">Max CA Supply</div>
              <div className="text-base font-extrabold text-white print:text-black mt-0.5">210,000,000 CA</div>
              <div className="text-[10px] text-[#22D3FF] print:text-blue-700">22-Year Schedule</div>
            </div>

            <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B] print:bg-gray-100 print:border-gray-300">
              <div className="text-[10px] font-bold text-[#838E9E] print:text-gray-600 uppercase">Daily CA Release</div>
              <div className="text-base font-extrabold text-[#22D3FF] print:text-black mt-0.5">40,000 CA</div>
              <div className="text-[10px] text-amber-300 print:text-amber-700">-10% Every 2 Years</div>
            </div>

            <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B] print:bg-gray-100 print:border-gray-300">
              <div className="text-[10px] font-bold text-[#838E9E] print:text-gray-600 uppercase">Hashrate Unit Entry</div>
              <div className="text-base font-extrabold text-white print:text-black mt-0.5">1 USDT = 1 Unit</div>
              <div className="text-[10px] text-rose-400 print:text-red-700">Permanent Lock</div>
            </div>

            <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B] print:bg-gray-100 print:border-gray-300">
              <div className="text-[10px] font-bold text-[#838E9E] print:text-gray-600 uppercase">BDEX Sell Slippage</div>
              <div className="text-base font-extrabold text-amber-300 print:text-black mt-0.5">5.0% Total</div>
              <div className="text-[10px] text-[#A855F7] print:text-purple-700">1.8% Burn + 3.2% Node</div>
            </div>
          </div>

          {/* Daily 40k Emission Split Table */}
          <div className="bg-[#131728] p-4 rounded-xl border border-[#1E243B] print:bg-white print:border-gray-300">
            <h4 className="text-xs font-bold text-white print:text-black uppercase tracking-wider mb-2">
              Daily 40,000 CA Emission Allocation
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="bg-[#0E1020] p-2 rounded-lg print:bg-gray-50 border border-[#1E243B] print:border-gray-200">
                <div className="font-extrabold text-[#22D3FF] print:text-black">42% (16,800 CA)</div>
                <div className="text-[10px] text-[#838E9E] print:text-gray-600">Computing Mining</div>
              </div>
              <div className="bg-[#0E1020] p-2 rounded-lg print:bg-gray-50 border border-[#1E243B] print:border-gray-200">
                <div className="font-extrabold text-[#A855F7] print:text-black">35% (14,000 CA)</div>
                <div className="text-[10px] text-[#838E9E] print:text-gray-600">Active Pool (VIP)</div>
              </div>
              <div className="bg-[#0E1020] p-2 rounded-lg print:bg-gray-50 border border-[#1E243B] print:border-gray-200">
                <div className="font-extrabold text-[#7B4FFF] print:text-black">18% (7,200 CA)</div>
                <div className="text-[10px] text-[#838E9E] print:text-gray-600">PoS Staking</div>
              </div>
              <div className="bg-[#0E1020] p-2 rounded-lg print:bg-gray-50 border border-[#1E243B] print:border-gray-200">
                <div className="font-extrabold text-amber-300 print:text-black">3% (1,200 CA)</div>
                <div className="text-[10px] text-[#838E9E] print:text-gray-600">DAO Governance</div>
              </div>
              <div className="bg-[#0E1020] p-2 rounded-lg print:bg-gray-50 border border-[#1E243B] print:border-gray-200">
                <div className="font-extrabold text-emerald-400 print:text-black">2% (800 CA)</div>
                <div className="text-[10px] text-[#838E9E] print:text-gray-600">Foundation</div>
              </div>
            </div>
          </div>

          {/* Staking Multipliers Matrix */}
          <div className="bg-[#131728] p-4 rounded-xl border border-[#1E243B] print:bg-white print:border-gray-300">
            <h4 className="text-xs font-bold text-white print:text-black uppercase tracking-wider mb-2">
              Staking Multipliers Schedule (PoS Output)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
              {STAKING_TERMS.map((t) => (
                <div key={t.id} className="bg-[#0E1020] p-2 rounded-lg print:bg-gray-50 border border-[#1E243B] print:border-gray-200">
                  <div className="font-bold text-white print:text-black">{t.name}</div>
                  <div className="text-[#22D3FF] font-extrabold print:text-blue-800">{t.multiplier}x Multiplier</div>
                  <div className="text-[9px] text-[#838E9E] print:text-gray-500">{(t.avgDaily * 100 * t.multiplier).toFixed(2)}%/day base</div>
                </div>
              ))}
            </div>
          </div>

          {/* Essential Security & Rules Summary */}
          <div className="bg-[#131728] p-4 rounded-xl border border-[#1E243B] print:bg-white print:border-gray-300 space-y-2">
            <h4 className="text-xs font-bold text-white print:text-black uppercase tracking-wider">
              Critical Rules Checklist
            </h4>
            <ul className="space-y-1.5 text-xs text-[#C4CBD8] print:text-gray-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span><strong>Hashrate Permanence:</strong> Computing power purchases cannot be refunded or liquidated.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span><strong>Seed Phrase Custody:</strong> Store your 12 recovery words on physical offline media.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span><strong>VIP Referral Mechanics:</strong> Downline rewards require 300 USDT personal investment + team leg volume.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span><strong>Official Portal:</strong> Only interact via verified URL (app.carypact.com / botchain.ai).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
