// Translates messages-guidepage/en.content.json into the 8 non-English locales with Gemini.
// Usage: GEMINI_API_KEY=... node scripts/translate-guide-messages.mjs [--force] [--locales=es,fr]
// Env:   GEMINI_MODEL (default below). Writes messages-guidepage/<locale>.content.json.
// Output is validated (same keys, same URLs/numbers/ICU placeholders); failures are retried, then reported.
import { GoogleGenAI } from "@google/genai";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const LANGS = { es: "Spanish", fr: "French", hi: "Hindi", ja: "Japanese", ko: "Korean", ru: "Russian", vi: "Vietnamese", zh: "Simplified Chinese" };
const MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const force = process.argv.includes("--force");
const only = process.argv.find((a) => a.startsWith("--locales="))?.split("=")[1]?.split(",");
if (!process.env.GEMINI_API_KEY) throw new Error("GEMINI_API_KEY is not set");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const en = JSON.parse(readFileSync("messages-guidepage/en.content.json", "utf8")).GuidesSection;

const flatten = (obj, prefix = "", out = {}) => {
  for (const [k, v] of Object.entries(obj)) typeof v === "string" ? (out[prefix + k] = v) : flatten(v, `${prefix}${k}.`, out);
  return out;
};
const unflatten = (flat) => {
  const root = {};
  for (const [path, value] of Object.entries(flat)) {
    const parts = path.split(".");
    let node = root;
    parts.slice(0, -1).forEach((p) => (node = node[p] ??= {}));
    node[parts.at(-1)] = value;
  }
  return root;
};

// Everything that must survive translation byte-for-byte.
const protectedTokens = (s) => [
  ...(s.match(/https?:\/\/[^\s)"]+/g) ?? []).map((u) => u.replace(/[.,;:!?]+$/, "")),
  ...(s.match(/\d+(?:[.,:/]\d+)*/g) ?? []),
  ...(s.match(/\$[A-Z]{2,}/g) ?? []),
  ...(s.match(/\{[^}]+\}/g) ?? []),
];
const valid = (source, out) => {
  if (typeof out !== "string" || !out.trim()) return false;
  if (/[<]/.test(out)) return false; // next-intl would parse this as a rich-text tag
  return protectedTokens(source).every((tok) => out.includes(tok));
};

const SYSTEM = (lang) => `You are a professional ${lang} localizer for a crypto education website (CaryPact / BOT Chain).
Translate the JSON values from English to ${lang}. Return ONLY a JSON object with exactly the same keys.
Rules: keep every URL, number, token ticker ($CA, $USDT, $BOT, CA, USDT, BOT), invitation code, contract address, product name (CaryPact, BOT Chain, BO Wallet, TokenPocket, MetaMask, Trust Wallet, BDEX, botscan) and {placeholder} unchanged.
Keep UI paths such as "Settings > Networks" in the same order. Keep sentence structure and tone; do not add, drop or soften risk warnings. Plain text only, no markdown, no HTML.`;

async function translateBatch(lang, batch) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await ai.models.generateContent({
      model: MODEL,
      contents: JSON.stringify(batch),
      config: { systemInstruction: SYSTEM(lang), responseMimeType: "application/json", temperature: 0.2 },
    });
    try {
      const out = JSON.parse(res.text);
      const bad = Object.keys(batch).filter((k) => !valid(batch[k], out[k]));
      if (bad.length === 0) return out;
      console.warn(`  attempt ${attempt}: ${bad.length} invalid (${bad.slice(0, 3).join(", ")}…)`);
      batch = Object.fromEntries(Object.entries(batch).filter(([k]) => bad.includes(k)));
      Object.assign(translateBatch.partial ??= {}, Object.fromEntries(Object.entries(out).filter(([k]) => !bad.includes(k))));
    } catch (e) {
      console.warn(`  attempt ${attempt}: ${e.message}`);
    }
  }
  throw new Error("validation failed after 3 attempts: " + Object.keys(batch).join(", "));
}

const flat = flatten(en);
const ids = Object.keys(en.guides);
const groups = [...ids.map((id) => Object.keys(flat).filter((k) => k.startsWith(`guides.${id}.`))), Object.keys(flat).filter((k) => k.startsWith("videos."))];

for (const [code, lang] of Object.entries(LANGS)) {
  if (only && !only.includes(code)) continue;
  const file = `messages-guidepage/${code}.content.json`;
  if (existsSync(file) && !force) { console.log(`skip ${code} (exists, use --force)`); continue; }
  console.log(`${code} (${lang})`);
  const result = {};
  for (const keys of groups) {
    translateBatch.partial = {};
    const batch = Object.fromEntries(keys.map((k) => [k, flat[k]]));
    const out = await translateBatch(lang, batch);
    Object.assign(result, translateBatch.partial, out);
  }
  writeFileSync(file, JSON.stringify({ GuidesSection: unflatten(result) }, null, 2) + "\n");
  console.log(`  wrote ${file} (${Object.keys(result).length} keys)`);
}
