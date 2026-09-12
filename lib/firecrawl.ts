// lib/firecrawl.ts
//
// Thin server-only wrapper around Firecrawl's v2 /scrape endpoint using
// "json" format (LLM-powered structured extraction). Never import this from
// a client component — it reads FIRECRAWL_API_KEY from process.env and is
// only meant to run inside Route Handlers / server actions.

const FIRECRAWL_API_URL = "https://api.firecrawl.dev/v2/scrape";

interface FirecrawlJsonFormatInput {
  schema?: Record<string, unknown>;
  prompt?: string;
}

interface FirecrawlScrapeResponse<T> {
  success: boolean;
  data?: {
    json?: T;
    metadata?: Record<string, unknown>;
  };
  error?: string;
}

/**
 * Scrapes a single URL and extracts structured JSON data matching the given
 * schema/prompt. Returns `null` instead of throwing on any failure (missing
 * key, network error, timeout, bad response) so callers can fall back to
 * cached or static data without taking down the whole API route.
 */
export async function scrapeStructuredData<T>(
  url: string,
  format: FirecrawlJsonFormatInput,
  opts: { timeoutMs?: number } = {}
): Promise<T | null> {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) {
    console.error("[firecrawl] FIRECRAWL_API_KEY is not set");
    return null;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), opts.timeoutMs ?? 25_000);

  try {
    const res = await fetch(FIRECRAWL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url,
        onlyMainContent: false,
        formats: [{ type: "json", ...format }],
      }),
      signal: controller.signal,
      // This is a POST call, so Next's fetch data-cache never applies to it
      // anyway — being explicit avoids any ambiguity.
      cache: "no-store",
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[firecrawl] ${url} -> HTTP ${res.status}: ${text.slice(0, 500)}`);
      return null;
    }

    const payload = (await res.json()) as FirecrawlScrapeResponse<T>;

    if (!payload.success || !payload.data?.json) {
      console.error(`[firecrawl] ${url} -> unsuccessful response`, payload.error);
      return null;
    }

    return payload.data.json;
  } catch (err) {
    console.error(`[firecrawl] ${url} -> request failed`, err);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}