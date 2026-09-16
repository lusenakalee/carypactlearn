import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FIRECRAWL_URL = "https://api.firecrawl.dev/v2/scrape";

const DEFAULT_POOL_URL =
  "https://dex.botchain.ai/pool/new-detail/0x822c6af0d0dd0a7aab92021bd968e0a91806d082/0x546ef0b620274e9b8355212ce27d088ac6574e19/0xd548461aebe520b57f0c7eeaa4c586a93072bd30";

const priceSchema = {
  type: "object",
  properties: {
    pairName: {
      type: ["string", "null"],
      description: "Trading pair name shown near the top, e.g. 'BOT / CA'. Return null if blank or still a loading placeholder.",
    },
    currentPrice: {
      type: ["string", "null"],
      description: "The numeric value under 'Current price', e.g. '1.240448'. Return null if it still shows '--' or is blank.",
    },
    currentPriceLabel: {
      type: ["string", "null"],
      description: "The label next to current price, e.g. 'BOT = 1 CA'. Return null if it still shows '- = 1 -' or is blank.",
    },
  },
  required: [],
};

export async function GET(request: NextRequest) {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "FIRECRAWL_API_KEY is not set" },
      { status: 500 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const targetUrl = searchParams.get("url") || DEFAULT_POOL_URL;
  const debug = searchParams.get("debug") === "true";
  // Allow forcing proxy mode via query string for easy A/B testing: ?proxy=stealth
  const proxy = searchParams.get("proxy") || "stealth";

  const formats: unknown[] = [
    {
      type: "json",
      schema: priceSchema,
      prompt:
        "Extract the pool's current price exactly as currently displayed. If it still shows a loading placeholder like '--' or '-', return null instead.",
    },
  ];

  if (debug) {
    formats.push("markdown");
  }

  try {
    const firecrawlResponse = await fetch(FIRECRAWL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
  url: targetUrl,
  proxy,
  waitFor: 25000, // pairName resolved at 15s, price likely needs more
  timeout: 120000, // must exceed waitFor + render comfortably
  onlyMainContent: false,
  formats,
}),
      cache: "no-store",
    });

    if (!firecrawlResponse.ok) {
      const errText = await firecrawlResponse.text();
      return NextResponse.json(
        { success: false, error: `Firecrawl error (${firecrawlResponse.status})`, details: errText },
        { status: firecrawlResponse.status }
      );
    }

    const result = await firecrawlResponse.json();

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Firecrawl scrape did not succeed", details: result },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      sourceUrl: targetUrl,
      proxyUsed: result.data?.metadata?.proxyUsed ?? proxy,
      scrapedAt: new Date().toISOString(),
      data: result.data?.json ?? null,
      ...(debug ? { markdown: result.data?.markdown ?? null } : {}),
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Unexpected server error", details: (err as Error).message },
      { status: 500 }
    );
  }
}