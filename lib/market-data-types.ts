// lib/market-data-types.ts
//
// Shared shape of the /api/market-data response. Kept in its own file (rather
// than inside the route handler) so the client component can import it as a
// type-only import without pulling any server code into the client bundle.

export interface PoolSnapshot {
  pair: string;
  sourceUrl: string;
  status: "live" | "unavailable";
}

export interface SwapMarketData {
  botCa: PoolSnapshot;
  botUsdt: PoolSnapshot;
  /** USDT price of 1 CA, derived by bridging the BOT/CA and BOT/USDT pools. */
  caPriceUsdt: number | null;
  /** USDT price of 1 BOT. */
  botPriceUsdt: number | null;
  /** How many CA one BOT buys. */
  caPerBot: number | null;
  priceSource: "live" | "fallback";
}

export interface StakingTermData {
  id: string;
  name: string;
  durationDays: number;
  /** Daily rate as a decimal fraction, e.g. 0.003 = 0.3%/day. */
  avgDaily: number;
  multiplier: number;
}

export interface PosMiningMarketData {
  sourceUrl: string;
  hashrateUnitPriceUsdt: number;
  minDepositUsdt: number;
  terms: StakingTermData[];
  status: "live" | "fallback";
}

export interface MarketDataPayload {
  success: boolean;
  fetchedAt: string;
  swap: SwapMarketData;
  posMining: PosMiningMarketData;
}