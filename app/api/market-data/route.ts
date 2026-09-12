// app/api/market-data/route.ts
//
// GET /api/market-data
//
// Scrapes three pages via Firecrawl's JSON-mode extraction:
//  - BOT/CA pool   (dex.botchain.ai)
//  - BOT/USDT pool (dex.botchain.ai)
//  - PoS Mining    (app.carypact.com/posMining)
//
// The CA<->USDT price isn't listed on a single page, so it's derived by
// bridging the two pools: price(CA in USDT) = price(BOT in USDT) / price(CA in BOT).
//
// PoS Mining terms fall back to a hardcoded static list (FALLBACK_STAKING_TERMS
// below) whenever the scrape fails or returns incomplete data, per the request.
// Swap prices fall back to `null` (the component should keep using
// ECOSYSTEM_METRICS.CA_BASE_PRICE as its own fallback in that case) with
// `priceSource: "fallback"` telling the client that live data wasn't available.

import { NextResponse } from "next/server";
import { scrapeStructuredData } from "@/lib/firecrawl";
import type {
  MarketDataPayload,
  StakingTermData,
} from "@/lib/market-data-types";

export const dynamic = "force-dynamic"; // we manage our own cache below

// ---------------------------------------------------------------------------
// Source URLs
// ---------------------------------------------------------------------------
const BOT_CA_POOL_URL =
  "https://dex.botchain.ai/pool/add/0x822dc160cc971510cf87999004a28b4a7aefd082/0x546307af427902a75771434df831d88219784e19/0xd5452816194a3784dba983426cce7c122f4abd30";
const BOT_USDT_POOL_URL =
  "https://dex.botchain.ai/pool/add/0x64f418471a1a7932a190e10da5a8551db5abec05/0xababc7ddc03e501d190c676bf3d92ef0e6e87a3c/0xd5452816194a3784dba983426cce7c122f4abd30";
const POS_MINING_URL = "https://app.carypact.com/posMining";

// ---------------------------------------------------------------------------
// Extraction shapes (what we ask the LLM extractor for)
// ---------------------------------------------------------------------------
interface PoolExtract {
  token0Symbol: string | null;
  token1Symbol: string | null;
  token0Reserve: number | null;
  token1Reserve: number | null;
  displayedRateText: string | null;
  liquidityUsd: number | null;
}

const POOL_SCHEMA = {
  type: "object",
  properties: {
    token0Symbol: {
      type: ["string", "null"],
      description:
        "Ticker symbol of the first token in the pair, e.g. BOT, CA, USDT. Return null if not found.",
    },
    token1Symbol: {
      type: ["string", "null"],
      description: "Ticker symbol of the second token in the pair. Return null if not found.",
    },
    token0Reserve: {
      type: ["number", "null"],
      description:
        "Pool reserve / total liquidity amount of token0, as a plain number with no commas or symbols. Return null if not found.",
    },
    token1Reserve: {
      type: ["number", "null"],
      description:
        "Pool reserve / total liquidity amount of token1, as a plain number with no commas or symbols. Return null if not found.",
    },
    displayedRateText: {
      type: ["string", "null"],
      description:
        "Any human-readable exchange rate text shown on the page, e.g. '1 BOT = 0.0021 CA'. Return null if not found.",
    },
    liquidityUsd: {
      type: ["number", "null"],
      description: "Total pool liquidity value in USD if displayed on the page. Return null if not found.",
    },
  },
};

const POOL_PROMPT =
  "This is a decentralized exchange 'add liquidity' page for a token pair pool. Extract the two token ticker symbols, their pool reserves/balances, any displayed exchange rate text, and total pool liquidity in USD if shown.";

interface PosMiningTermExtract {
  name: string | null;
  durationDays: number | null;
  avgDailyRatePercent: number | null;
  multiplier: number | null;
}

interface PosMiningExtract {
  hashrateUnitPriceUsdt: number | null;
  minDepositUsdt: number | null;
  terms: PosMiningTermExtract[];
}

const POS_MINING_SCHEMA = {
  type: "object",
  properties: {
    hashrateUnitPriceUsdt: {
      type: ["number", "null"],
      description: "USDT cost of one hashrate unit, if shown. Return null if not found.",
    },
    minDepositUsdt: {
      type: ["number", "null"],
      description: "Minimum staking/mining deposit in USDT, if shown. Return null if not found.",
    },
    terms: {
      type: "array",
      description: "All staking/lockup term options listed on the page.",
      items: {
        type: "object",
        properties: {
          name: {
            type: ["string", "null"],
            description: "Display label of the term, e.g. 'Flex', '30 Days', '360 Days'.",
          },
          durationDays: {
            type: ["number", "null"],
            description: "Lockup duration in days. Use 0 for flexible/no-lock terms. Return null if not found.",
          },
          avgDailyRatePercent: {
            type: ["number", "null"],
            description:
              "Average daily yield rate for this term, as a percent number (e.g. 0.3 for 0.3%), not a decimal fraction. Return null if not found.",
          },
          multiplier: {
            type: ["number", "null"],
            description: "Yield multiplier for this term, e.g. 1, 1.2, 1.5. Return null if not found.",
          },
        },
      },
    },
  },
};

const POS_MINING_PROMPT =
  "This page describes a PoS mining / staking product with one or more lockup term options, each with a duration, an average daily yield rate, and a yield multiplier. Extract the hashrate unit price in USDT, the minimum deposit, and every term option listed.";

// ---------------------------------------------------------------------------
// Hardcoded fallback data — used only when the live scrape fails or returns
// incomplete data. Keep these roughly in sync with STAKING_TERMS in
// @/config/constants so the UI doesn't jump around when it falls back.
// ---------------------------------------------------------------------------
const FALLBACK_STAKING_TERMS: StakingTermData[] = [
  { id: "flex", name: "Flex", durationDays: 1, avgDaily: 0.001, multiplier: 1 },
  { id: "30d", name: "30D", durationDays: 30, avgDaily: 0.0015, multiplier: 1.05 },
  { id: "90d", name: "90D", durationDays: 90, avgDaily: 0.002, multiplier: 1.15 },
  { id: "180d", name: "180D", durationDays: 180, avgDaily: 0.0025, multiplier: 1.3 },
  { id: "360d", name: "360D", durationDays: 360, avgDaily: 0.003, multiplier: 1.5 },
];
const FALLBACK_HASHRATE_UNIT_PRICE_USDT = 1;
const FALLBACK_MIN_DEPOSIT_USDT = 100;

// ---------------------------------------------------------------------------
// In-memory cache — avoids hitting Firecrawl (and burning credits) on every
// page render. Resets when the server instance restarts/redeploys.
// ---------------------------------------------------------------------------
const CACHE_TTL_MS = 60_000;
let cache: { at: number; payload: MarketDataPayload } | null = null;

function findReserve(pool: PoolExtract, symbol: string): number | null {
  const target = symbol.toUpperCase();
  if (pool.token0Symbol?.toUpperCase() === target) return pool.token0Reserve;
  if (pool.token1Symbol?.toUpperCase() === target) return pool.token1Reserve;
  return null;
}

function derivePrices(botCaPool: PoolExtract | null, botUsdtPool: PoolExtract | null) {
  if (!botCaPool || !botUsdtPool) return null;

  const botInCaPool = findReserve(botCaPool, "BOT");
  const caReserve = findReserve(botCaPool, "CA");
  const botInUsdtPool = findReserve(botUsdtPool, "BOT");
  const usdtReserve = findReserve(botUsdtPool, "USDT");

  if (botInCaPool === null || caReserve === null || botInUsdtPool === null || usdtReserve === null) {
    return null;
  }
  if (botInCaPool <= 0 || caReserve <= 0 || botInUsdtPool <= 0 || usdtReserve <= 0) {
    return null;
  }

  const caPerBot = caReserve / botInCaPool; // how many CA one BOT buys
  const usdtPerBot = usdtReserve / botInUsdtPool; // how many USDT one BOT buys
  const caPriceUsdt = usdtPerBot / caPerBot; // USDT per 1 CA, bridged through BOT

  return { caPriceUsdt, botPriceUsdt: usdtPerBot, caPerBot };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get("force") === "true";
  const includeDebug = searchParams.get("debug") === "true";

  if (!forceRefresh && cache && Date.now() - cache.at < CACHE_TTL_MS) {
    return NextResponse.json(cache.payload, {
      headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=60" },
    });
  }

  const [botCaResult, botUsdtResult, posMiningResult] = await Promise.allSettled([
    scrapeStructuredData<PoolExtract>(BOT_CA_POOL_URL, { schema: POOL_SCHEMA, prompt: POOL_PROMPT }),
    scrapeStructuredData<PoolExtract>(BOT_USDT_POOL_URL, { schema: POOL_SCHEMA, prompt: POOL_PROMPT }),
    scrapeStructuredData<PosMiningExtract>(POS_MINING_URL, {
      schema: POS_MINING_SCHEMA,
      prompt: POS_MINING_PROMPT,
    }),
  ]);

  const botCaPool = botCaResult.status === "fulfilled" ? botCaResult.value : null;
  const botUsdtPool = botUsdtResult.status === "fulfilled" ? botUsdtResult.value : null;
  const posMining = posMiningResult.status === "fulfilled" ? posMiningResult.value : null;

  const derived = derivePrices(botCaPool, botUsdtPool);

  const hasUsableTerms =
    !!posMining?.terms?.length &&
    posMining.terms.every(
      (t) => t.durationDays !== null && t.avgDailyRatePercent !== null && t.multiplier !== null
    );

  const stakingTerms: StakingTermData[] = hasUsableTerms
    ? posMining!.terms.map((t, i) => ({
        id: (t.name ?? `term-${i}`).toLowerCase().trim().replace(/\s+/g, "-"),
        name: t.name ?? `Term ${i + 1}`,
        durationDays: t.durationDays as number,
        avgDaily: (t.avgDailyRatePercent as number) / 100, // percent -> decimal, matches STAKING_TERMS shape
        multiplier: t.multiplier as number,
      }))
    : FALLBACK_STAKING_TERMS;

  const payload: MarketDataPayload = {
    success: true,
    fetchedAt: new Date().toISOString(),
    swap: {
      botCa: {
        pair: "BOT/CA",
        sourceUrl: BOT_CA_POOL_URL,
        status: botCaPool ? "live" : "unavailable",
      },
      botUsdt: {
        pair: "BOT/USDT",
        sourceUrl: BOT_USDT_POOL_URL,
        status: botUsdtPool ? "live" : "unavailable",
      },
      caPriceUsdt: derived?.caPriceUsdt ?? null,
      botPriceUsdt: derived?.botPriceUsdt ?? null,
      caPerBot: derived?.caPerBot ?? null,
      priceSource: derived ? "live" : "fallback",
    },
    posMining: {
      sourceUrl: POS_MINING_URL,
      hashrateUnitPriceUsdt: posMining?.hashrateUnitPriceUsdt ?? FALLBACK_HASHRATE_UNIT_PRICE_USDT,
      minDepositUsdt: posMining?.minDepositUsdt ?? FALLBACK_MIN_DEPOSIT_USDT,
      terms: stakingTerms,
      status: hasUsableTerms ? "live" : "fallback",
    },
  };

  cache = { at: Date.now(), payload };

  return NextResponse.json(
    includeDebug ? { ...payload, debug: { botCaPool, botUsdtPool, posMining } } : payload,
    { headers: { "Cache-Control": "public, max-age=30, stale-while-revalidate=60" } }
  );
}