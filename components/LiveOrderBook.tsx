"use client";

import { Layers } from "lucide-react";
import { useEffect, useState } from "react";

type Status = "ok" | "stale" | "unavailable";
type HistoryApi = {
  status: Status;
  swaps: { t: number; price: number; volume: number }[];
};

const POLL_MS = 30_000;
const SHOWN = 10;

export default function LiveOrderBook() {
  const [data, setData] = useState<HistoryApi | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const res = await fetch("/api/bdex/swaps", { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as HistoryApi;
        if (alive) setData(json); // keep previous data on failure
      } catch {
        /* keep last data */
      } finally {
        if (alive) setLoading(false);
      }
    }
    load();
    const id = setInterval(load, POLL_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const swaps = [...(data?.swaps ?? [])].sort((a, b) => b.t - a.t).slice(0, SHOWN);
  const status: Status = !data ? "unavailable" : data.status;
  const label = loading ? "Loading…" : status === "ok" ? "Live" : status === "stale" ? "Stale" : "Offline";
  const color =
    status === "ok" ? "text-emerald-400" : status === "stale" ? "text-amber-400" : "text-red-400";

  return (
    <div className="bg-[#0E1020] border border-[#1E243B] rounded-3xl p-6 sm:p-8 space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-[#1E243B]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#22D3FF]" />
            <h3 className="text-base font-bold text-white">Recent BDEX Swaps</h3>
          </div>
          <p className="text-xs text-[#838E9E]">CA/WBOT pool swaps, polled every 30s</p>
        </div>
        <span className={`text-[10px] font-bold uppercase ${color}`}>● {label}</span>
      </div>

      <div className="bg-[#0A0C14] border border-[#1E243B] rounded-2xl p-3 space-y-1.5">
        <div className="grid grid-cols-3 text-[10px] font-bold text-[#838E9E] uppercase pb-1 border-b border-[#1E243B]">
          <span>Price (WBOT)</span>
          <span className="text-right">Size (CA)</span>
          <span className="text-right">Time</span>
        </div>
        {swaps.length === 0 ? (
          <div className="py-6 text-center text-xs text-[#838E9E]">
            {loading ? "Loading swaps…" : "No swap data available"}
          </div>
        ) : (
          swaps.map((s) => (
            <div key={`${s.t}-${s.price}-${s.volume}`} className="grid grid-cols-3 text-xs font-mono py-0.5">
              <span className="text-white">{s.price.toFixed(4)}</span>
              <span className="text-right text-white">
                {s.volume.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </span>
              <span className="text-right text-[#838E9E] text-[11px]">
                {new Date(s.t * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}