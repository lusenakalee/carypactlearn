import { NextResponse } from "next/server";

// CoinMarketCap "slug" for https://coinmarketcap.com/currencies/bot-chain/
const CMC_SLUG = "bot-chain";
const CMC_QUOTES_URL =
  "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest";

// Revalidate at most once every 3 hours (App Router route cache)
const REVALIDATE_SECONDS = 60 * 60 * 3;
export const revalidate = REVALIDATE_SECONDS;

export async function GET() {
  const apiKey = process.env.COINMARKETCAP_API;

  if (!apiKey) {
    return NextResponse.json(
      { error: "COINMARKETCAP_API is not set in the environment" },
      { status: 500 }
    );
  }

  try {
    const url = `${CMC_QUOTES_URL}?slug=${CMC_SLUG}&convert=USD`;

    const res = await fetch(url, {
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
        Accept: "application/json",
      },
      // Cache on the server for 3h so we don't hammer CMC's rate limits
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: `CoinMarketCap API error (${res.status})`, details: text },
        { status: res.status }
      );
    }

    const json = await res.json();

    // v2 quotes/latest keyed by slug returns data as an object keyed by CMC id,
    // whose value is an array (there can be multiple tokens sharing a slug in
    // rare cases) — grab the first entry.
    const dataObj = json?.data;
    const firstKey = dataObj ? Object.keys(dataObj)[0] : undefined;
    const entry = firstKey
      ? Array.isArray(dataObj[firstKey])
        ? dataObj[firstKey][0]
        : dataObj[firstKey]
      : undefined;

    if (!entry) {
      return NextResponse.json(
        { error: "Unexpected response shape from CoinMarketCap", raw: json },
        { status: 502 }
      );
    }

    const quote = entry.quote?.USD;

    return NextResponse.json({
      symbol: entry.symbol,
      name: entry.name,
      slug: CMC_SLUG,
      priceUSD: quote?.price ?? null,
      percentChange24h: quote?.percent_change_24h ?? null,
      volume24hUSD: quote?.volume_24h ?? null,
      marketCapUSD: quote?.market_cap ?? null,
      lastUpdated: quote?.last_updated ?? null,
      isLiveFromCMC: true,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to fetch price from CoinMarketCap", details: err?.message },
      { status: 500 }
    );
  }
}