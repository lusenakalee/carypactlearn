"use client";

import { useEffect, useState } from "react";

type CaPriceApi = {
  price: number | null; // WBOT per 1 CA
  status: "ok" | "stale" | "unavailable";
  updatedAt: string | null;
};

export type CaUsdPrice = {
  botPerCa: number | null; // pool rate: BOT (WBOT) per 1 CA
  botUsd: number | null; // CoinMarketCap BOT/USD
  caUsd: number | null; // botPerCa * botUsd; null unless both are valid
  status: "loading" | "ok" | "stale" | "unavailable";
  updatedAt: string | null; // pool-rate timestamp, shown when stale
};

const CA_POLL_MS = 60 * 1000;
const BOT_POLL_MS = 10 * 60 * 1000;

const isPos = (n: unknown): n is number =>
  typeof n === "number" && Number.isFinite(n) && n > 0;

export function useCaPrice(): CaUsdPrice {
  const [ca, setCa] = useState<CaPriceApi | null>(null);
  const [caLoaded, setCaLoaded] = useState(false);
  const [botUsd, setBotUsd] = useState<number | null>(null);
  const [botLoaded, setBotLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/price/ca", { cache: "no-store" });
        const json: CaPriceApi = await res.json();
        if (alive) setCa(json);
      } catch {
        // keep the previous value; mark it stale if we have one
        if (alive) setCa((prev) => (prev?.price ? { ...prev, status: "stale" } : prev));
      } finally {
        if (alive) setCaLoaded(true);
      }
    };
    load();
    const id = setInterval(load, CA_POLL_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/bot-price");
        const json: { priceUSD?: number | null; error?: string } = await res.json();
        if (alive && res.ok && !json.error && isPos(json.priceUSD)) {
          setBotUsd(json.priceUSD);
        }
      } catch {
        // keep the previous value
      } finally {
        if (alive) setBotLoaded(true);
      }
    };
    load();
    const id = setInterval(load, BOT_POLL_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const botPerCa =
    ca && ca.status !== "unavailable" && isPos(ca.price) ? ca.price : null;
  const caUsd = botPerCa !== null && botUsd !== null ? botPerCa * botUsd : null;

  const status: CaUsdPrice["status"] =
    !(caLoaded && botLoaded)
      ? "loading"
      : caUsd === null
      ? "unavailable"
      : ca?.status === "stale"
      ? "stale"
      : "ok";

  return { botPerCa, botUsd, caUsd, status, updatedAt: ca?.updatedAt ?? null };
}