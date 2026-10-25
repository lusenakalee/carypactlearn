// Generates messages-guidepage/en.json from config/content.ts (GUIDES_DATA).
// Usage: node scripts/extract-guide-messages.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const src = readFileSync("config/content.ts", "utf8");
const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const mod = { exports: {} };
new Function("module", "exports", "require", js)(mod, mod.exports, require);
const { GUIDES_DATA } = mod.exports;

const guides = {};
const videos = {};
const addVideo = (v) => { videos[`v${v.number}`] ??= v.title; };

for (const g of GUIDES_DATA) {
  const entry = { steps: {}, takeaways: {} };
  g.steps.forEach((s, i) => {
    const step = { title: s.title.replace(/^\s*\d+\.\s*/, ""), description: s.description };
    if (s.warning) step.warning = s.warning;
    if (s.proTip) step.proTip = s.proTip;
    entry.steps[`s${i + 1}`] = step;
    (s.videoTutorials ?? (s.videoTutorial ? [s.videoTutorial] : [])).forEach(addVideo);
  });
  g.keyTakeaways.forEach((t, i) => { entry.takeaways[`k${i + 1}`] = t; });
  (g.tutorialVideos ?? []).forEach(addVideo);
  guides[g.id] = entry;
}

mkdirSync("messages-guidepage", { recursive: true });
writeFileSync("messages-guidepage/en.content.json", JSON.stringify({ GuidesSection: { guides, videos } }, null, 2) + "\n");
console.log("guides:", Object.keys(guides).length, "videos:", Object.keys(videos).length);
