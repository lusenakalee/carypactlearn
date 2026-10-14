"use client";

import { Activity, BarChart2, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Status = "ok" | "stale" | "unavailable";

type PoolApi = {
  status: Status;
  pool: {
    tvlUsd: number;
    volume24hUsd: number;
    volume24hChangePercent: number | null;
    feeAprPercent: number;
  } | null;
  rate: { price: number | null; status: Status; updatedAt: string | null };
};

type HistoryApi = {
  status: Status;
  swaps: { t: number; price: number; volume: number }[];
};

type BotApi = {
  priceUSD: number | null;
  percentChange24h: number | null;
  isLiveFromCMC?: boolean;
  error?: string;
};

type Timeframe = "1H" | "24H";
type Asset = "USD" | "WBOT";

const POLL_MS = 30_000;
const TIMEFRAMES: Record<Timeframe, { windowSec: number; bucketSec: number }> = {
  "1H": { windowSec: 3600, bucketSec: 300 },
  "24H": { windowSec: 86400, bucketSec: 3600 },
};

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  return (await res.json()) as T;
}

const fmtUsd = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(2)}M`
    : n >= 1_000
    ? `$${(n / 1_000).toFixed(1)}K`
    : `$${n.toFixed(2)}`;

const fmtTime = (sec: number, withDate = false) =>
  new Date(sec * 1000).toLocaleString(
    [],
    withDate
      ? { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }
      : { hour: "2-digit", minute: "2-digit" }
  );

export default function LiveChart() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>("24H");
  const [selectedAsset, setSelectedAsset] = useState<Asset>("USD");
  const [chartType, setChartType] = useState<"area" | "volume">("area");

  const [poolData, setPoolData] = useState<PoolApi | null>(null);
  const [history, setHistory] = useState<HistoryApi | null>(null);
  const [bot, setBot] = useState<BotApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [nowSec, setNowSec] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    let alive = true;

    async function load() {
      const [p, h, b] = await Promise.allSettled([
        getJson<PoolApi>("/api/bdex/pool"),
        getJson<HistoryApi>("/api/bdex/swaps"),
        getJson<BotApi>("/api/bot-price"),
      ]);
      if (!alive) return;
      // keep previous data if a request fails
      if (p.status === "fulfilled") setPoolData(p.value);
      if (h.status === "fulfilled") setHistory(h.value);
      if (b.status === "fulfilled" && !b.value.error) setBot(b.value);
      setNowSec(Math.floor(Date.now() / 1000));
      setLoading(false);
    }

    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const botUsd = bot?.priceUSD ?? null;
  const caWbot = poolData?.rate.price ?? null;
  const caUsd = caWbot !== null && botUsd !== null ? caWbot * botUsd : null;

  // USD view needs the BOT/USD price; fall back to WBOT if CMC is unavailable
  const asset: Asset = selectedAsset === "USD" && botUsd === null ? "WBOT" : selectedAsset;
  const mult = asset === "USD" ? botUsd ?? 1 : 1;

  const { windowSec, bucketSec } = TIMEFRAMES[selectedTimeframe];

  const windowSwaps = useMemo(() => {
    const from = nowSec - windowSec;
    return (history?.swaps ?? []).filter((s) => s.t >= from);
  }, [history, nowSec, windowSec]);

  const priceData = useMemo(
    () => windowSwaps.map((s) => ({ t: s.t, value: s.price * mult })),
    [windowSwaps, mult]
  );

  const volumeData = useMemo(() => {
    const buckets = new Map<number, number>();
    for (const s of windowSwaps) {
      const k = Math.floor(s.t / bucketSec) * bucketSec;
      buckets.set(k, (buckets.get(k) ?? 0) + s.volume);
    }
    return [...buckets.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([t, volume]) => ({ t, volume }));
  }, [windowSwaps, bucketSec]);

  const stats = useMemo(() => {
    if (priceData.length === 0) return null;
    const values = priceData.map((d) => d.value);
    const first = values[0];
    const lastV = values[values.length - 1];
    return {
      high: Math.max(...values),
      low: Math.min(...values),
      change: first > 0 ? ((lastV - first) / first) * 100 : null,
      trades: priceData.length,
    };
  }, [priceData]);

  const decimals = asset === "USD" ? 4 : 4;
  const fmtPrice = (n: number) => (asset === "USD" ? `$${n.toFixed(decimals)}` : `${n.toFixed(decimals)} WBOT`);

  const activeValue = asset === "USD" ? caUsd : caWbot;
  const colorPrimary = asset === "USD" ? "#22D3FF" : "#F59E0B";
  const change = stats?.change ?? null;
  const up = (change ?? 0) >= 0;

  const feedStatus: Status =
    !poolData && !history
      ? "unavailable"
      : poolData?.rate.status === "unavailable" || history?.status === "unavailable"
      ? "unavailable"
      : poolData?.rate.status === "stale" || history?.status === "stale"
      ? "stale"
      : "ok";

  const statusLabel = loading
    ? "Loading…"
    : feedStatus === "ok"
    ? "Live"
    : feedStatus === "stale"
    ? "Stale"
    : "Offline";
  const statusColor =
    feedStatus === "ok" ? "text-emerald-400" : feedStatus === "stale" ? "text-amber-400" : "text-red-400";

  const tooltipStyle = {
    backgroundColor: "#131728",
    borderColor: "#1E243B",
    borderRadius: "12px",
    fontSize: "12px",
    color: "#FFFFFF",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
  };

  const empty = !loading && (chartType === "area" ? priceData.length === 0 : volumeData.length === 0);

  return (
    <div className="bg-[#0E1020] border border-[#1E243B] rounded-3xl p-6 sm:p-8 space-y-6">
      {/* Chart Top Control Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          {/* Asset Selector Tabs */}
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => setSelectedAsset("USD")}
              disabled={botUsd === null}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                asset === "USD"
                  ? "bg-[#22D3FF] text-[#0A0C14] shadow-md shadow-[#22D3FF]/20"
                  : "bg-[#131728] text-[#838E9E] hover:text-white border border-[#1E243B]"
              }`}
            >
              CA / USD
            </button>
            <button
              onClick={() => setSelectedAsset("WBOT")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                asset === "WBOT"
                  ? "bg-amber-400 text-[#0A0C14] shadow-md shadow-amber-400/20"
                  : "bg-[#131728] text-[#838E9E] hover:text-white border border-[#1E243B]"
              }`}
            >
              CA / WBOT
            </button>
            <span className={`ml-2 text-[10px] font-bold uppercase ${statusColor}`}>● {statusLabel}</span>
          </div>

          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-2xl sm:text-4xl font-black text-white tracking-tight font-mono">
              {activeValue === null
                ? "—"
                : asset === "USD"
                ? `$${activeValue.toFixed(4)}`
                : `${activeValue.toFixed(4)} WBOT`}
            </span>
            {change !== null && (
              <span
                className={`text-xs sm:text-sm font-bold flex items-center gap-0.5 ${
                  up ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>
                  {up ? "+" : ""}
                  {change.toFixed(2)}%
                </span>
              </span>
            )}
            <span className="text-xs text-[#838E9E]">
              24h Volume: {poolData?.pool ? fmtUsd(poolData.pool.volume24hUsd) : "—"}
            </span>
          </div>
        </div>

        {/* Timeframe & Display Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-[#131728] border border-[#1E243B] p-1 rounded-xl flex items-center gap-1">
            {(Object.keys(TIMEFRAMES) as Timeframe[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  selectedTimeframe === tf ? "bg-[#7B4FFF] text-white" : "text-[#838E9E] hover:text-white"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <div className="bg-[#131728] border border-[#1E243B] p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setChartType("area")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                chartType === "area" ? "bg-[#7B4FFF] text-white" : "text-[#838E9E] hover:text-white"
              }`}
              title="Price Area Chart"
            >
              <Activity className="w-4 h-4" />
            </button>
            <button
              onClick={() => setChartType("volume")}
              className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                chartType === "volume" ? "bg-[#7B4FFF] text-white" : "text-[#838E9E] hover:text-white"
              }`}
              title="Volume Bar Chart"
            >
              <BarChart2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Chart Stage */}
      <div className="h-[320px] w-full pt-4 relative">
        {(loading || empty) && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-[#838E9E] z-10">
            {loading ? "Loading market data…" : `No trades in the last ${selectedTimeframe === "1H" ? "hour" : "24 hours"}`}
          </div>
        )}
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={priceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAsset" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colorPrimary} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={colorPrimary} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E243B" vertical={false} />
              <XAxis
                dataKey="t"
                type="number"
                domain={["dataMin", "dataMax"]}
                stroke="#838E9E"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => fmtTime(Number(v))}
              />
              <YAxis
                stroke="#838E9E"
                fontSize={11}
                domain={["auto", "auto"]}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => (asset === "USD" ? `$${Number(v).toFixed(3)}` : Number(v).toFixed(3))}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelFormatter={(v) => fmtTime(Number(v), true)}
                formatter={(val: any) => [fmtPrice(Number(val)), "CA"]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke={colorPrimary}
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorAsset)"
                isAnimationActive={false}
              />
            </AreaChart>
          ) : (
            <BarChart data={volumeData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E243B" vertical={false} />
              <XAxis
                dataKey="t"
                stroke="#838E9E"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => fmtTime(Number(v))}
              />
              <YAxis
                stroke="#838E9E"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => Number(v).toFixed(0)}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                labelFormatter={(v) => fmtTime(Number(v), true)}
                formatter={(val: any) => [`${Number(val).toLocaleString(undefined, { maximumFractionDigits: 2 })} CA`, "Volume"]}
              />
              <Bar dataKey="volume" fill="#7B4FFF" radius={[4, 4, 0, 0]} opacity={0.85} isAnimationActive={false} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Indicator Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#1E243B] text-xs">
        <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B]">
          <div className="text-[10px] text-[#838E9E] uppercase font-bold">Live Rate</div>
          <div className="text-white font-bold font-mono mt-0.5">
            {caWbot === null ? "—" : `1 CA = ${caWbot.toFixed(4)} WBOT`}
          </div>
        </div>
        <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B]">
          <div className="text-[10px] text-[#838E9E] uppercase font-bold">
            {selectedTimeframe} High / Low
          </div>
          <div className="text-emerald-400 font-bold font-mono mt-0.5">
            {stats ? `${fmtPrice(stats.high)} / ${fmtPrice(stats.low)}`.replaceAll(" WBOT", "") : "—"}
          </div>
        </div>
        <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B]">
          <div className="text-[10px] text-[#838E9E] uppercase font-bold">BDEX Liquidity</div>
          <div className="text-[#22D3FF] font-bold font-mono mt-0.5">
            {poolData?.pool ? `$${Math.round(poolData.pool.tvlUsd).toLocaleString()}` : "—"}
          </div>
        </div>
        <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B]">
          <div className="text-[10px] text-[#838E9E] uppercase font-bold">BOT / USD (CMC)</div>
          <div className="text-[#A855F7] font-bold font-mono mt-0.5">
            {botUsd === null ? "Unavailable" : `$${botUsd.toFixed(4)}`}
          </div>
        </div>
      </div>
    </div>
  );
}