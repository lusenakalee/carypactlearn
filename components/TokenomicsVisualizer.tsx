"use client";

import { Clock, Coins, Flame, TrendingDown } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";
import { ECOSYSTEM_METRICS as E, EMISSION_SPLIT } from "@/config/constants";

// Not in constants.ts; verify against protocol docs before moving there.
const INITIAL_LIQUIDITY_CA = 10_000_000;
const SCHEDULE_ROWS = 4;

export default function TokenomicsVisualizer() {
  const t = useTranslations("Tokenomics");
  const format = useFormatter();
  const [selectedId, setSelectedId] = useState(EMISSION_SPLIT[0].id);
  const selected = EMISSION_SPLIT.find((s) => s.id === selectedId) ?? EMISSION_SPLIT[0];

  const num = (v: number) => format.number(v);
  const compact = (v: number) =>
    format.number(v, { notation: "compact", maximumFractionDigits: 2 });
  const pct = (fraction: number, digits = 0) =>
    format.number(fraction, { style: "percent", maximumFractionDigits: digits });
  const pct2 = (points: number) =>
    format.number(points / 100, {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const cycle = E.EMISSION_HALVING_CYCLE_YEARS;
  const years = E.TOTAL_EMISSION_YEARS;
  const rate = pct(E.EMISSION_REDUCTION_RATE);
  const emittedCA = E.TOTAL_CA_SUPPLY - INITIAL_LIQUIDITY_CA;

  const schedule = Array.from({ length: SCHEDULE_ROWS }, (_, i) => {
    const factor = Math.pow(1 - E.EMISSION_REDUCTION_RATE, i);
    const daily = Math.round(E.DAILY_CA_EMISSION * factor);
    return {
      start: i * cycle + 1,
      end: (i + 1) * cycle,
      daily,
      annual: daily * 365,
      factor,
    };
  });
  const finalStart = SCHEDULE_ROWS * cycle + 1;

  return (
    <section
      id="ca-token"
      className="py-14 sm:py-20 relative overflow-hidden bg-[#0E1020] border-t border-[#1E243B]"
    >
      {/* Ambient Accent Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#7B4FFF]/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#A855F7]">
            <Coins className="w-3.5 h-3.5" />
            <span>{t("badge")}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {t.rich("title", {
              supply: compact(E.TOTAL_CA_SUPPLY),
              accent: (chunks) => <span className="text-brand-gradient">{chunks}</span>,
            })}
          </h2>
          <p className="text-sm sm:text-base text-[#C4CBD8]">{t("subtitle", { years })}</p>
        </div>

        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-5 relative overflow-hidden">
            <div className="text-xs uppercase font-bold text-[#838E9E] tracking-wider">
              {t("capLabel")}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              {t("caAmount", { amount: num(E.TOTAL_CA_SUPPLY) })}
            </div>
            <p className="text-xs text-[#C4CBD8] mt-2">
              {t.rich("capBody", {
                liquidity: compact(INITIAL_LIQUIDITY_CA),
                emitted: compact(emittedCA),
                years,
                cyan: (chunks) => <strong className="text-[#22D3FF]">{chunks}</strong>,
                purple: (chunks) => <strong className="text-[#A855F7]">{chunks}</strong>,
              })}
            </p>
          </div>

          <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-5 relative overflow-hidden">
            <div className="text-xs uppercase font-bold text-[#838E9E] tracking-wider">
              {t("emissionLabel")}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#22D3FF] mt-1">
              {t("emissionValue", { amount: num(E.DAILY_CA_EMISSION) })}
            </div>
            <p className="text-xs text-[#C4CBD8] mt-2">
              {t.rich("emissionBody", {
                rate,
                cycle,
                years,
                amber: (chunks) => <strong className="text-amber-300">{chunks}</strong>,
              })}
            </p>
          </div>

          <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-5 relative overflow-hidden">
            <div className="text-xs uppercase font-bold text-[#838E9E] tracking-wider">
              {t("burnLabel")}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
              {t("burnValue")}
            </div>
            <p className="text-xs text-[#C4CBD8] mt-2">
              {t("burnBody", {
                buyback: pct2(E.BUYBACK_PERCENT),
                txFee: pct2(E.CA_TX_BUYBACK_BURN),
                gas: pct2(E.BOT_GAS_BURN_PERCENT),
              })}
            </p>
          </div>
        </div>

        {/* Emission Distribution Interactive Visualizer */}
        <div className="bg-[#0A0C14] border border-[#1E243B] rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-[#1E243B]">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {t("allocTitle", { amount: num(E.DAILY_CA_EMISSION) })}
              </h3>
              <p className="text-xs text-[#838E9E]">{t("allocHint")}</p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs text-[#22D3FF] font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{t("settlement")}</span>
            </span>
          </div>

          {/* Distribution Progress Bar */}
          <div className="pt-6">
            <div className="h-6 w-full rounded-xl overflow-hidden flex bg-[#131728] p-0.5 border border-[#1E243B]">
              {EMISSION_SPLIT.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  className="h-full transition-all hover:opacity-90 cursor-pointer first:rounded-l-lg last:rounded-r-lg relative group"
                  title={t("segmentTitle", {
                    name: t(`split.${item.id}.name`),
                    percent: pct(item.percent / 100),
                    amount: num(item.dailyCA),
                  })}
                />
              ))}
            </div>

            {/* Percentage Markers Row */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-4">
              {EMISSION_SPLIT.map((item) => {
                const isSelected = selected.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    aria-pressed={isSelected}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#131728] border-[#7B4FFF] shadow-lg ring-1 ring-[#7B4FFF]"
                        : "bg-[#0E1020] border-[#1E243B] hover:bg-[#131728]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs font-bold text-white">
                        {pct(item.percent / 100)}
                      </span>
                    </div>
                    <div className="text-xs text-[#C4CBD8] font-medium truncate">
                      {t(`split.${item.id}.name`)}
                    </div>
                    <div className="text-[10px] text-[#838E9E] mt-0.5">
                      {t("perDay", { amount: num(item.dailyCA) })}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Detail Showcase */}
          <div className="mt-6 bg-[#131728] border border-[#1E243B] rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selected.color }}
                />
                <h4 className="text-base font-bold text-white">
                  {t(`split.${selected.id}.name`)}
                </h4>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#1C1F2E] text-white font-mono">
                  {t("poolBadge", {
                    percent: pct(selected.percent / 100),
                    amount: num(selected.dailyCA),
                  })}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#C4CBD8] leading-relaxed">
                {t(`split.${selected.id}.description`)}
              </p>
            </div>
          </div>
        </div>

        {/* Halving Curve & Reduction Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-7 bg-[#0A0C14] border border-[#1E243B] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-base font-bold text-white">
                  {t("curveTitle", { years, rate })}
                </h4>
                <p className="text-xs text-[#838E9E]">{t("curveSubtitle")}</p>
              </div>
              <TrendingDown className="w-5 h-5 text-[#22D3FF]" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#1E243B] text-[#838E9E]">
                    <th className="pb-2 font-semibold">{t("thCycle")}</th>
                    <th className="pb-2 font-semibold">{t("thDaily")}</th>
                    <th className="pb-2 font-semibold">{t("thAnnual")}</th>
                    <th className="pb-2 font-semibold">{t("thFactor")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E243B]/60 text-[#C4CBD8]">
                  {schedule.map((row, idx) => (
                    <tr key={row.start} className="hover:bg-[#131728]/50">
                      <td className="py-2.5 font-medium text-white">
                        {t("yearsRange", { start: row.start, end: row.end })}
                      </td>
                      <td className="py-2.5 text-[#22D3FF] font-mono">
                        {t("caAmount", { amount: num(row.daily) })}
                      </td>
                      <td className="py-2.5">
                        {t("caAmount", { amount: compact(row.annual) })}
                      </td>
                      <td className="py-2.5 text-amber-300 font-semibold">
                        {idx === 0
                          ? pct(row.factor, 1)
                          : t("factorWithDelta", {
                              percent: pct(row.factor, 1),
                              delta: pct(-E.EMISSION_REDUCTION_RATE),
                            })}
                      </td>
                    </tr>
                  ))}
                  <tr className="hover:bg-[#131728]/50">
                    <td className="py-2.5 font-medium text-white">
                      {t("yearsRange", { start: finalStart, end: years })}
                    </td>
                    <td className="py-2.5 text-[#22D3FF] font-mono">{t("finalDaily")}</td>
                    <td className="py-2.5">{t("finalAnnual")}</td>
                    <td className="py-2.5 text-amber-300 font-semibold">{t("finalFactor")}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Burning & Deflationary Mechanics Box */}
          <div className="lg:col-span-5 bg-[#0A0C14] border border-[#1E243B] rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              <h4 className="text-base font-bold text-white">{t("sinksTitle")}</h4>
            </div>
            <p className="text-xs text-[#C4CBD8]">{t("sinksIntro")}</p>

            <div className="space-y-2.5 text-xs">
              <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B]">
                <div className="flex items-center justify-between gap-2 text-white font-bold mb-1">
                  <span>{t("sink1Title", { percent: pct2(E.BUYBACK_PERCENT) })}</span>
                  <span className="text-rose-400 shrink-0">{t("sink1Tag")}</span>
                </div>
                <p className="text-[#838E9E]">
                  {t("sink1Body", { percent: pct2(E.BUYBACK_PERCENT) })}
                </p>
              </div>

              <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B]">
                <div className="flex items-center justify-between gap-2 text-white font-bold mb-1">
                  <span>{t("sink2Title", { percent: pct2(E.CA_TX_BUYBACK_BURN) })}</span>
                  <span className="text-amber-400 shrink-0">{t("sink2Tag")}</span>
                </div>
                <p className="text-[#838E9E]">
                  {t("sink2Body", { percent: pct2(E.CA_TX_BUYBACK_BURN) })}
                </p>
              </div>

              <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B]">
                <div className="flex items-center justify-between gap-2 text-white font-bold mb-1">
                  <span>{t("sink3Title", { percent: pct2(E.BOT_GAS_BURN_PERCENT) })}</span>
                  <span className="text-[#22D3FF] shrink-0">{t("sink3Tag")}</span>
                </div>
                <p className="text-[#838E9E]">
                  {t("sink3Body", { percent: pct2(E.BOT_GAS_BURN_PERCENT) })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}