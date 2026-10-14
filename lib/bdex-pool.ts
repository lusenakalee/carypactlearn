import "server-only";
import { getCaPrice } from "@/lib/ca-price";

const BASE = process.env.BDEX_API_BASE;
const POOL = process.env.BDEX_POOL_ADDRESS?.toLowerCase();
const CA = process.env.CA_TOKEN_ADDRESS?.toLowerCase();

export type PoolData = {
  poolAddress: string;
  name: string;
  poolType: string;
  feeTierPercent: number;
  tvlUsd: number; // BDEX field `fdvUsd`; value matches the DEX UI's TVL
  volume24hUsd: number;
  volume24hChangePercent: number | null;
  fees24hUsd: number;
  feeAprPercent: number; // BDEX `feeApr` is a fraction, x100 matches the UI
  transactions24h: number | null;
  caReserve: number; // token0Amount (base token = CA)
  wbotReserve: number; // token1Amount (quote token = WBOT)
};

type Status = "ok" | "stale" | "unavailable";

export type PoolResult = {
  status: Status;
  source: "bdex-api";
  updatedAt: string | null;
  pool: PoolData | null;
};

export type PoolResponse = PoolResult & {
  rate: {
    price: number | null; // WBOT per 1 CA
    status: Status;
    updatedAt: string | null;
  };
};

function toNum(v: unknown): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function req(v: unknown): number {
  const n = toNum(v);
  if (n === null || n < 0) throw new Error("invalid field");
  return n;
}

// Best-effort only: not shared across serverless instances. Use KV for real persistence.
let last: { pool: PoolData; updatedAt: string } | null = null;

async function fetchPool(): Promise<PoolData> {
  if (!BASE || !POOL || !CA) throw new Error("missing config");

  const res = await fetch(`${BASE}/pools/${POOL}`, {
    signal: AbortSignal.timeout(8000),
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error(`http ${res.status}`);

  const json = (await res.json()) as {
    success?: unknown;
    data?: Record<string, unknown> | null;
  };
  if (json?.success !== true || !json.data) throw new Error("bad response");
  const d = json.data;

  if (String(d.poolId).toLowerCase() !== POOL) throw new Error("unexpected pool");
  if (String(d.baseTokenAddress).toLowerCase() !== CA) {
    throw new Error("unexpected base token");
  }

  return {
    poolAddress: POOL,
    name: String(d.name ?? ""),
    poolType: String(d.poolType ?? ""),
    feeTierPercent: req(d.feeTier) / 10000, // 10000 -> 1%
    tvlUsd: req(d.fdvUsd),
    volume24hUsd: req(d.volumeUsd24),
    volume24hChangePercent: toNum(d.volumeChangePercent),
    fees24hUsd: req(d.fees24Usd),
    feeAprPercent: req(d.feeApr) * 100,
    transactions24h: toNum(d.transactionsH24),
    caReserve: req(d.token0Amount),
    wbotReserve: req(d.token1Amount),
  };
}

async function getPool(): Promise<PoolResult> {
  const meta = { source: "bdex-api" } as const;
  try {
    const pool = await fetchPool();
    last = { pool, updatedAt: new Date().toISOString() };
    return { ...meta, ...last, status: "ok" };
  } catch {
    if (last) return { ...meta, ...last, status: "stale" };
    return { ...meta, pool: null, updatedAt: null, status: "unavailable" };
  }
}

export async function getPoolResponse(): Promise<PoolResponse> {
  const [pool, rate] = await Promise.all([getPool(), getCaPrice()]);
  return {
    ...pool,
    rate: { price: rate.price, status: rate.status, updatedAt: rate.updatedAt },
  };
}