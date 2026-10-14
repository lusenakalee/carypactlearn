import "server-only";

export type TokenPrice = {
  symbol: "CA";
  price: number | null; // WBOT per 1 CA
  currency: "WBOT";
  source: "bdex-api";
  updatedAt: string | null;
  status: "ok" | "stale" | "unavailable";
};

const BASE = process.env.BDEX_API_BASE;
const CA = process.env.CA_TOKEN_ADDRESS;
const WBOT = process.env.WBOT_TOKEN_ADDRESS;

// Best-effort only: not shared across serverless instances. Use KV for real persistence.
let last: { price: number; updatedAt: string } | null = null;

function parsePrice(json: unknown): number {
  const j = json as { success?: unknown; data?: { currentPrice?: unknown } } | null;
  if (j?.success !== true) throw new Error("bad response");
  const n = Number(j.data?.currentPrice);
  if (!Number.isFinite(n) || n <= 0) throw new Error("invalid price");
  return n;
}

export async function getCaPrice(): Promise<TokenPrice> {
  const meta = { symbol: "CA", currency: "WBOT", source: "bdex-api" } as const;
  try {
    if (!BASE || !CA || !WBOT) throw new Error("missing config");
    const url = `${BASE}/klines/pair/summary?sell=${CA}&buy=${WBOT}&pool_type=v3`;
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error(`http ${res.status}`);
    const price = parsePrice(await res.json());
    last = { price, updatedAt: new Date().toISOString() };
    return { ...meta, ...last, status: "ok" };
  } catch {
    if (last) return { ...meta, ...last, status: "stale" };
    return { ...meta, price: null, updatedAt: null, status: "unavailable" };
  }
}