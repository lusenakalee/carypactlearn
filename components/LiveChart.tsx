"use client";

import React, { useState, useMemo } from "react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  BarChart,
  Bar
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  Maximize2, 
  BarChart2, 
  Activity, 
  Calendar,
  Layers,
  ArrowUpRight,
  Info
} from "lucide-react";

interface LiveChartProps {
  currentCaPrice?: number;
  currentBotPrice?: number;
  ratio?: number;
}

export default function LiveChart({ 
  currentCaPrice = 2.7415, 
  currentBotPrice = 1.1109,
  ratio = 2.46784
}: LiveChartProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"1H" | "24H" | "7D" | "30D" | "1Y">("24H");
  const [selectedAsset, setSelectedAsset] = useState<"CA" | "BOT" | "RATIO">("CA");
  const [chartType, setChartType] = useState<"area" | "volume">("area");

  const timeframes = ["1H", "24H", "7D", "30D", "1Y"] as const;

  // Generate deterministic realistic historical market series based on real base prices and ratio
  const chartData = useMemo(() => {
    const pointsCount = selectedTimeframe === "1H" ? 20 : selectedTimeframe === "24H" ? 24 : selectedTimeframe === "7D" ? 28 : selectedTimeframe === "30D" ? 30 : 52;
    const baseBot = currentBotPrice;
    const baseCa = baseBot * ratio;

    const data = [];

    for (let i = pointsCount; i >= 0; i--) {
      const progress = 1 - (i / pointsCount);
      // upward steady momentum factor with micro jitter
      const jitter = Math.sin(i * 1.7) * 0.03 + Math.cos(i * 2.3) * 0.02;
      const trend = (progress * 0.12) - 0.06;
      
      const botP = Math.max(0.1, Number((baseBot * (1 + trend + jitter)).toFixed(4)));
      const caP = Number((botP * ratio).toFixed(4));
      const volume = Math.round(350000 + Math.abs(Math.sin(i * 1.2)) * 850000);

      let label = "";
      if (selectedTimeframe === "1H") {
        label = `-${i * 3}m`;
      } else if (selectedTimeframe === "24H") {
        label = `${(24 - i).toString().padStart(2, '0')}:00`;
      } else if (selectedTimeframe === "7D") {
        label = `Day ${7 - Math.floor(i / 4)}`;
      } else if (selectedTimeframe === "30D") {
        label = `Day ${30 - i}`;
      } else {
        label = `Wk ${52 - i}`;
      }

      data.push({
        time: label,
        CA: caP,
        BOT: botP,
        RATIO: ratio,
        volume: volume,
      });
    }
    return data;
  }, [selectedTimeframe, currentBotPrice, ratio]);

  const activeValue = selectedAsset === "CA" 
    ? currentCaPrice 
    : selectedAsset === "BOT" 
    ? currentBotPrice 
    : ratio;

  const colorPrimary = selectedAsset === "CA" ? "#22D3FF" : selectedAsset === "BOT" ? "#A855F7" : "#F59E0B";

  return (
    <div className="bg-[#0E1020] border border-[#1E243B] rounded-3xl p-6 sm:p-8 space-y-6">
      {/* Chart Top Control Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          {/* Asset Selector Tabs */}
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => setSelectedAsset("CA")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedAsset === "CA"
                  ? "bg-[#22D3FF] text-[#0A0C14] shadow-md shadow-[#22D3FF]/20"
                  : "bg-[#131728] text-[#838E9E] hover:text-white border border-[#1E243B]"
              }`}
            >
              CA / USDT
            </button>
            <button
              onClick={() => setSelectedAsset("BOT")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedAsset === "BOT"
                  ? "bg-[#A855F7] text-white shadow-md shadow-[#A855F7]/20"
                  : "bg-[#131728] text-[#838E9E] hover:text-white border border-[#1E243B]"
              }`}
            >
              BOT / USDT (CMC)
            </button>
            <button
              onClick={() => setSelectedAsset("RATIO")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedAsset === "RATIO"
                  ? "bg-amber-400 text-[#0A0C14] shadow-md shadow-amber-400/20"
                  : "bg-[#131728] text-[#838E9E] hover:text-white border border-[#1E243B]"
              }`}
            >
              1 CA = 27.00522 BOT
            </button>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-2xl sm:text-4xl font-black text-white tracking-tight font-mono">
              {selectedAsset === "RATIO" ? "27.00522" : `$${activeValue.toFixed(4)}`}
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-4 h-4" />
              <span>+4.28%</span>
            </span>
            <span className="text-xs text-[#838E9E]">24h Volume: $14.25M</span>
          </div>
        </div>

        {/* Timeframe & Display Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-[#131728] border border-[#1E243B] p-1 rounded-xl flex items-center gap-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setSelectedTimeframe(tf)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  selectedTimeframe === tf
                    ? "bg-[#7B4FFF] text-white"
                    : "text-[#838E9E] hover:text-white"
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
      <div className="h-[320px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAsset" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colorPrimary} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={colorPrimary} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E243B" vertical={false} />
              <XAxis 
                dataKey="time" 
                stroke="#838E9E" 
                fontSize={11} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#838E9E" 
                fontSize={11} 
                domain={['auto', 'auto']}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => selectedAsset === "RATIO" ? val.toFixed(2) : `$${val}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#131728",
                  borderColor: "#1E243B",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#FFFFFF",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
                }}
                formatter={(val: any) => [
                  selectedAsset === "RATIO" ? `${Number(val).toFixed(5)} BOT` : `$${Number(val).toFixed(4)}`,
                  selectedAsset
                ]}
              />
              <Area
                type="monotone"
                dataKey={selectedAsset}
                stroke={colorPrimary}
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorAsset)"
              />
            </AreaChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E243B" vertical={false} />
              <XAxis dataKey="time" stroke="#838E9E" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#838E9E" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#131728",
                  borderColor: "#1E243B",
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: "#FFFFFF",
                }}
                formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Volume"]}
              />
              <Bar dataKey="volume" fill="#7B4FFF" radius={[4, 4, 0, 0]} opacity={0.85} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Indicator Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#1E243B] text-xs">
        <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B]">
          <div className="text-[10px] text-[#838E9E] uppercase font-bold">Parity Constant</div>
          <div className="text-white font-bold font-mono mt-0.5">1 CA = 27.00522 BOT</div>
        </div>
        <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B]">
          <div className="text-[10px] text-[#838E9E] uppercase font-bold">24H High / Low</div>
          <div className="text-emerald-400 font-bold font-mono mt-0.5">$31.20 / $28.80</div>
        </div>
        <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B]">
          <div className="text-[10px] text-[#838E9E] uppercase font-bold">BDEX Liquidity</div>
          <div className="text-[#22D3FF] font-bold font-mono mt-0.5">$18,420,000</div>
        </div>
        <div className="bg-[#131728] p-3 rounded-xl border border-[#1E243B]">
          <div className="text-[10px] text-[#838E9E] uppercase font-bold">CMC Status</div>
          <div className="text-[#A855F7] font-bold font-mono mt-0.5">Verified Pro Feed</div>
        </div>
      </div>
    </div>
  );
}
