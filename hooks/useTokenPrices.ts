"use client";

import { PRICE_ENDPOINTS, PRICE_REFRESH_MS } from "@/config/constants";
import { useEffect, useState } from "react";

export type PriceStatus = "live" | "stale" | "unavailable";

export interface TokenPrice {
  symbol: "CA" | "BOT";
  price: number | null;
  currency: string;
  source: string;
  updatedAt: string | null;
  status: PriceStatus;
}

const unavailable = (symbol: TokenPrice["symbol"]): TokenPrice => ({
  symbol,
  price: null,
  currency: "USD",
  source: "",
  updatedAt: null,
  status: "unavailable",
});

// Single adapter point: adjust field names here if the route response differs.
function parseTokenPrice(symbol: TokenPrice["symbol"], raw: unknown): TokenPrice | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  const price =
    typeof r.price === "number" ? r.price : typeof r.price === "string" ? Number(r.price) : NaN;
  if (!Number.isFinite(price) || price <= 0) return null;
  const currency =
    typeof r.currency === "string" && /^[A-Z]{3}$/.test(r.currency) ? r.currency : "USD";
  const updatedRaw = r.updatedAt ?? r.lastUpdated;
  const updatedAt =
    typeof updatedRaw === "string" && !Number.isNaN(Date.parse(updatedRaw)) ? updatedRaw : null;
  return {
    symbol,
    price,
    currency,
    source: typeof r.source === "string" ? r.source : "",
    updatedAt,
    status: r.status === "stale" ? "stale" : "live",
  };
}

async function fetchOne(symbol: TokenPrice["symbol"], url: string): Promise<TokenPrice | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    return parseTokenPrice(symbol, await res.json());
  } catch {
    return null;
  }
}

// A failed refresh keeps the last valid value, marked stale; with none, it is unavailable.
const merge = (symbol: TokenPrice["symbol"], next: TokenPrice | null, prev: TokenPrice | null) =>
  next ?? (prev && prev.price !== null ? { ...prev, status: "stale" as const } : unavailable(symbol));

export function useTokenPrices() {
  const [ca, setCa] = useState<TokenPrice | null>(null);
  const [bot, setBot] = useState<TokenPrice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      const [c, b] = await Promise.all([
        fetchOne("CA", PRICE_ENDPOINTS.CA),
        fetchOne("BOT", PRICE_ENDPOINTS.BOT),
      ]);
      if (cancelled) return;
      setCa((prev) => merge("CA", c, prev));
      setBot((prev) => merge("BOT", b, prev));
      setLoading(false);
    };
    tick();
    const id = setInterval(tick, PRICE_REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return { ca, bot, loading };
}