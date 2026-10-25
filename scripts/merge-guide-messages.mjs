// Merges GuidesPage.detail + GuidesSection.{guides,videos} content into messages/*.json.
// Existing keys are never overwritten unless --force. Preserves BOM and line endings.
// Usage: node scripts/merge-guide-messages.mjs [--force] [--dir=messages]
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { DETAIL_UI } from "./guide-detail-ui.mjs";

const force = process.argv.includes("--force");
const dir = process.argv.find((a) => a.startsWith("--dir="))?.split("=")[1] ?? "messages";
const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);

function merge(target, source, path = "", stats) {
  for (const [k, v] of Object.entries(source)) {
    if (isObj(v)) {
      if (!isObj(target[k])) target[k] = {};
      merge(target[k], v, `${path}${k}.`, stats);
    } else if (!(k in target) || force) {
      if (target[k] !== v) stats.added++;
      target[k] = v;
    }
  }
}
const flatCount = (o) => Object.values(o).reduce((n, v) => n + (isObj(v) ? flatCount(v) : 1), 0);

const enContent = JSON.parse(readFileSync("messages-guidepage/en.content.json", "utf8"));
const expected = flatCount(enContent.GuidesSection) + Object.keys(DETAIL_UI.en).length;

for (const name of readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const code = name.replace(/\.json$/i, "").toLowerCase().split(/[-_]/)[0]; // Zh.json / zh-CN.json -> zh
  if (!DETAIL_UI[code]) { console.log(`skip ${name} (not one of the 9 locales)`); continue; }

  const raw = readFileSync(`${dir}/${name}`, "utf8");
  const bom = raw.charCodeAt(0) === 0xfeff ? "\ufeff" : "";
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const json = JSON.parse(bom ? raw.slice(1) : raw);

  const contentFile = `messages-guidepage/${code}.content.json`;
  const content = code === "en" ? enContent : existsSync(contentFile) ? JSON.parse(readFileSync(contentFile, "utf8")) : null;

  const stats = { added: 0 };
  json.GuidesPage ??= {};
  merge(json.GuidesPage, { detail: DETAIL_UI[code] }, "", stats);
  if (content) merge(json.GuidesSection ??= {}, content.GuidesSection, "", stats);

  let out = JSON.stringify(json, null, 2);
  if (eol === "\r\n") out = out.replace(/\n/g, "\r\n");
  writeFileSync(`${dir}/${name}`, bom + out + eol);

  const have = flatCount(json.GuidesPage.detail ?? {}) + (content ? flatCount(content.GuidesSection) : 0);
  console.log(`${name.padEnd(10)} +${stats.added} keys, guide-detail coverage ${content ? "complete" : "UI only (run translate script)"} (${have}/${expected})`);
}
