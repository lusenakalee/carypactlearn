import "server-only";

const BASE = process.env.BDEX_API_BASE;
const CA = process.env.CA_TOKEN_ADDRESS?.toLowerCase();
const POOL = process.env.BDEX_POOL_ADDRESS?.toLowerCase();

export type Swap = {
  t: number; // unix seconds
  price: number; // WBOT per 1 CA
  volume: number; // in CA
};

type Status = "ok" | "stale" | "unavailable";

export type CaHistory = {
  status: Status;
  source: "bdex-api";
  updatedAt: string | null;
  swaps: Swap[];
};

// Best-effort only: not shared across serverless instances. Use KV for real persistence.
let last: { swaps: Swap[]; updatedAt: string } | null = null;

async function fetchSwaps(): Promise<Swap[]> {
  if (!BASE || !CA) throw new Error("missing config");

  const res = await fetch(`${BASE}/token-pool-stats?token=${CA}&pool_type=v3`, {
    signal: AbortSignal.timeout(8000),
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`http ${res.status}`);

  const json = (await res.json()) as {
    success?: unknown;
    data?: Array<{
      poolAddress?: string;
      baseToken?: { address?: string };
      swaps?: Array<{ price?: unknown; timestamp?: unknown; volume?: unknown }>;
    }>;
  };
  if (json?.success !== true || !Array.isArray(json.data)) {
    throw new Error("bad response");
  }

  const entry =
    json.data.find((p) => p.poolAddress?.toLowerCase() === POOL) ??
    json.data.find((p) => p.baseToken?.address?.toLowerCase() === CA);
  if (!entry?.swaps) throw new Error("pool not found");

  return entry.swaps
    .map((s) => ({
      t: Number(s.timestamp),
      price: Number(s.price),
      volume: Number(s.volume),
    }))
    .filter(
      (s) =>
        Number.isFinite(s.t) &&
        Number.isFinite(s.price) &&
        s.price > 0 &&
        Number.isFinite(s.volume) &&
        s.volume >= 0
    )
    .sort((a, b) => a.t - b.t);
}

export async function getCaHistory(): Promise<CaHistory> {
  const meta = { source: "bdex-api" } as const;
  try {
    const swaps = await fetchSwaps();
    last = { swaps, updatedAt: new Date().toISOString() };
    return { ...meta, ...last, status: "ok" };
  } catch {
    if (last) return { ...meta, ...last, status: "stale" };
    return { ...meta, swaps: [], updatedAt: null, status: "unavailable" };
  }
}