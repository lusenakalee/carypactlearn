"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass,
  ExternalLink,
  Lightbulb,
  Play,
  Signal,
  Sparkles,
  Wallet,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import {
  GUIDE_TOPICS,
  GUIDES_DATA,
  type GuideArticle,
  type GuideTopic,
  type VideoTutorialLink,
} from "@/config/content";
import { AFFILIATE_CONFIG } from "@/config/constants";

// ---------------------------------------------------------------------------
// Message lookup
//
// Existing keys reused (no changes needed in your messages):
//   GuidesPage:    breadcrumbHome, breadcrumbCurrent, supportTitle, supportDescription, launchDapp
//   GuidesSection: guideCount, guidesInTopic, exploreTopic, defaultBadge, readTime,
//                  difficulty.*, communitySupport, topics.<id>.*, guides.<id>.{title,summary}
// New keys (see messages-guidepage/*.json):
//   GuidesPage.detail.*
//   GuidesSection.guides.<id>.steps.s<N>.{title,description,warning,proTip}
//   GuidesSection.guides.<id>.takeaways.k<N>
//   GuidesSection.videos.v<number>
// (generated from GUIDES_DATA by scripts/extract-guide-messages.mjs; any key still missing
// in a locale falls back to the English text in config/content.ts)
//
// Every lookup has an English fallback, so a missing key never renders a raw key
// and never throws.
// ---------------------------------------------------------------------------
type Values = Record<string, string | number>;
type Translate = ((key: never, values?: Values) => string) & { has: (key: never) => boolean };

const fill = (text: string, values?: Values) =>
  values ? text.replace(/\{(\w+)\}/g, (match, name: string) => (name in values ? String(values[name]) : match)) : text;

function msg(translate: Translate, key: string, fallback: string, values?: Values): string {
  return translate.has(key as never) ? translate(key as never, values) : fill(fallback, values);
}

interface LocalizedVideo {
  key: string;
  title: string;
  url: string;
  platform?: string;
}

interface LocalizedStep {
  number: number;
  title: string;
  description: string;
  warning?: string;
  proTip?: string;
  videos: LocalizedVideo[];
}

interface LocalizedGuide {
  id: string;
  title: string;
  summary: string;
  readTime: string;
  difficulty: string;
  videoDuration?: string;
  tutorialVideos: LocalizedVideo[];
  steps: LocalizedStep[];
  takeaways: string[];
}

// Video titles are translated once per numbered video (GuidesSection.videos.v<number>),
// so the same tutorial reads identically in every guide that references it.
const toVideo = (video: VideoTutorialLink, s: Translate): LocalizedVideo => ({
  key: `${video.number}-${video.url}`,
  title: msg(s, `videos.v${video.number}`, video.title),
  url: video.url,
  platform: video.platform,
});

// Config titles carry a hard-coded "1. " prefix; the page renders its own number badge.
const stripLeadingNumber = (title: string) => title.replace(/^\s*\d+\.\s*/, "");

function localizeGuide(guide: GuideArticle, s: Translate): LocalizedGuide {
  const base = `guides.${guide.id}`;
  const minutes = Number.parseInt(guide.readTime, 10);

  return {
    id: guide.id,
    title: msg(s, `${base}.title`, guide.title),
    summary: msg(s, `${base}.summary`, guide.summary),
    readTime: Number.isFinite(minutes) ? msg(s, "readTime", "{minutes} min read", { minutes }) : guide.readTime,
    difficulty: msg(s, `difficulty.${guide.difficulty}`, guide.difficulty),
    videoDuration: guide.videoDuration,
    tutorialVideos: (guide.tutorialVideos ?? []).map((video) => toVideo(video, s)),
    steps: guide.steps.map((step, index) => {
      const key = `${base}.steps.s${index + 1}`;
      const videos = step.videoTutorials ?? (step.videoTutorial ? [step.videoTutorial] : []);
      return {
        number: index + 1,
        title: stripLeadingNumber(msg(s, `${key}.title`, step.title)),
        description: msg(s, `${key}.description`, step.description),
        warning: step.warning ? msg(s, `${key}.warning`, step.warning) : undefined,
        proTip: step.proTip ? msg(s, `${key}.proTip`, step.proTip) : undefined,
        videos: videos.map((video) => toVideo(video, s)),
      };
    }),
    takeaways: guide.keyTakeaways.map((text, index) => msg(s, `${base}.takeaways.k${index + 1}`, text)),
  };
}

const localizeTopic = (topic: GuideTopic, s: Translate) => ({
  id: topic.id,
  iconName: topic.iconName,
  title: msg(s, `topics.${topic.id}.title`, topic.title),
  description: msg(s, `topics.${topic.id}.description`, topic.description),
  badge: msg(s, `topics.${topic.id}.badge`, topic.badge ?? msg(s, "defaultBadge", "Verified")),
});

const guidesForTopic = (topic: GuideTopic): GuideArticle[] =>
  topic.guideIds.flatMap((id) => {
    const guide = GUIDES_DATA.find((g) => g.id === id);
    return guide ? [guide] : [];
  });

// ---------------------------------------------------------------------------
// Presentational helpers
// ---------------------------------------------------------------------------
const TOPIC_ICONS: Record<GuideTopic["iconName"], LucideIcon> = {
  Compass,
  Wallet,
  Zap,
  ArrowLeftRight,
  Wrench,
};

const TRUSTED_DOMAINS = ["botchain.ai", "carypact.com"];

function trustedUrl(raw: string): string | null {
  try {
    const url = new URL(raw);
    const trusted = TRUSTED_DOMAINS.some((d) => url.hostname === d || url.hostname.endsWith(`.${d}`));
    return url.protocol === "https:" && trusted ? url.toString() : null;
  } catch {
    return null;
  }
}

/** Renders text, turning https links on first-party domains into anchors. */
function RichText({ text, hint }: { text: string; hint: string }) {
  // split() with a capture group puts the URLs at the odd indexes.
  const parts = text.split(/(https?:\/\/[^\s)]+)/g);
  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 0) return part;
        const clean = part.replace(/[.,;:!?]+$/, "");
        const href = trustedUrl(clean);
        if (!href) return part;
        return (
          <span key={index}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#22D3FF] underline underline-offset-2 hover:text-white break-all"
            >
              {clean}
              <span className="sr-only"> {hint}</span>
            </a>
            {part.slice(clean.length)}
          </span>
        );
      })}
    </>
  );
}

function Callout({ tone, label, children }: { tone: "warning" | "tip"; label: string; children: ReactNode }) {
  const isWarning = tone === "warning";
  const Icon = isWarning ? AlertTriangle : Lightbulb;
  return (
    <div
      className={`flex gap-3 rounded-2xl border p-4 text-xs sm:text-sm leading-relaxed ${
        isWarning
          ? "border-amber-500/30 bg-amber-500/10 text-amber-100"
          : "border-[#22D3FF]/25 bg-[#22D3FF]/5 text-[#CBD5E1]"
      }`}
    >
      <Icon
        className={`w-4 h-4 mt-0.5 shrink-0 ${isWarning ? "text-amber-400" : "text-[#22D3FF]"}`}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <span
          className={`block mb-1 text-[10px] font-bold uppercase tracking-wider ${
            isWarning ? "text-amber-400" : "text-[#22D3FF]"
          }`}
        >
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

function VideoLink({ video, label, hint }: { video: LocalizedVideo; label: string; hint: string }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/video flex items-center gap-3 rounded-xl bg-[#13182C] hover:bg-[#1C233E] border border-[#222A46] hover:border-[#2C375D] p-3 transition-all"
    >
      <span className="w-8 h-8 shrink-0 rounded-lg bg-[#7B4FFF]/15 text-[#A855F7] group-hover/video:text-[#22D3FF] flex items-center justify-center">
        <Play className="w-4 h-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-[#CBD5E1] group-hover/video:text-white truncate">
          {video.title}
        </span>
        <span className="block text-[10px] text-[#606E85]">{label}</span>
      </span>
      <ExternalLink className="w-3.5 h-3.5 text-[#606E85] shrink-0" aria-hidden="true" />
      <span className="sr-only">{hint}</span>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface GuideDetailProps {
  topicId: GuideTopic["id"];
  guideId: string;
}

export default function GuideDetail({ topicId, guideId }: GuideDetailProps) {
  const locale = useLocale();
  // Cast: next-intl's translator is generic over typed keys; keys here are built dynamically.
  const t = useTranslations("GuidesPage") as unknown as Translate;
  const s = useTranslations("GuidesSection") as unknown as Translate;

  const topicConfig = GUIDE_TOPICS.find((item) => item.id === topicId);
  const selectedConfig = GUIDES_DATA.find((item) => item.id === guideId);
  if (!topicConfig || !selectedConfig) return null;

  const d = (key: string, fallback: string, values?: Values) => msg(t, `detail.${key}`, fallback, values);

  const topicGuides = guidesForTopic(topicConfig);
  const guides = topicGuides.some((g) => g.id === selectedConfig.id) ? topicGuides : [selectedConfig, ...topicGuides];

  const topic = localizeTopic(topicConfig, s);
  const guide = localizeGuide(selectedConfig, s);
  const TopicIcon = TOPIC_ICONS[topic.iconName] ?? BookOpen;
  const numberFormat = new Intl.NumberFormat(locale);
  const hint = d("externalLinkHint", "(opens in a new tab)");

  const index = guides.findIndex((g) => g.id === selectedConfig.id);
  const prev = index > 0 ? guides[index - 1] : undefined;
  const next = index < guides.length - 1 ? guides[index + 1] : undefined;
  const guideHref = (id: string) => `/guides/${topic.id}?guide=${id}`;
  const guideTitle = (g: GuideArticle) => msg(s, `guides.${g.id}.title`, g.title);
  const watchLabel = (video: LocalizedVideo) =>
    d("watchOn", "Watch on {platform}", { platform: video.platform ?? d("videoFallbackPlatform", "Video") });

  const otherTopics = GUIDE_TOPICS.filter((item) => item.id !== topic.id).map((item) => localizeTopic(item, s));

  return (
    <main className="min-h-screen bg-[#0A0C14] text-white relative overflow-hidden">
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-[#22D3FF]/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[#7B4FFF]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label={d("breadcrumbLabel", "Breadcrumb")} className="text-xs text-[#838E9E]">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                {msg(t, "breadcrumbHome", "Home")}
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 rtl:rotate-180" aria-hidden="true" />
            <li>
              <Link href="/guides" className="hover:text-white transition-colors">
                {msg(t, "breadcrumbCurrent", "Guides & Tutorials")}
              </Link>
            </li>
            <ChevronRight className="w-3 h-3 rtl:rotate-180" aria-hidden="true" />
            <li aria-current="page" className="text-[#CBD5E1]">
              {topic.title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="w-11 h-11 rounded-2xl bg-[#161D36] border border-[#263155] flex items-center justify-center text-[#22D3FF]">
              <TopicIcon className="w-5 h-5" aria-hidden="true" />
            </span>
            <span className="px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#22D3FF]">
              {topic.title}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#182038] border border-[#263155] text-[10px] font-bold uppercase tracking-wider text-[#A855F7]">
              {topic.badge}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#22D3FF]">
            {guide.title}
          </h1>
          <p className="max-w-3xl text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            <RichText text={guide.summary} hint={hint} />
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#838E9E]">
            <li className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#22D3FF]" aria-hidden="true" />
              {guide.readTime}
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Signal className="w-3.5 h-3.5 text-[#22D3FF]" aria-hidden="true" />
              {guide.difficulty}
            </li>
            {guide.videoDuration && (
              <li className="inline-flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-[#22D3FF]" aria-hidden="true" />
                {d("videoLength", "Video: {duration}", { duration: guide.videoDuration })}
              </li>
            )}
          </ul>
        </header>

        {/* Guides inside this topic */}
        {guides.length > 1 && (
          <nav aria-label={msg(s, "guidesInTopic", "Guides in this Topic")} className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#606E85]">
              {msg(s, "guidesInTopic", "Guides in this Topic")} ·{" "}
              {msg(s, "guideCount", "{count} Guides", { count: guides.length })}
            </p>
            <ul className="flex flex-wrap gap-2 text-xs">
              {guides.map((item) => {
                const active = item.id === selectedConfig.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={guideHref(item.id)}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex items-center rounded-xl px-3.5 py-2 font-medium transition-all ${
                        active
                          ? "bg-[#7B4FFF] text-white font-bold shadow-md shadow-[#7B4FFF]/25"
                          : "bg-[#131728] text-[#94A3B8] hover:text-white border border-[#222A46]"
                      }`}
                    >
                      {guideTitle(item)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        {/* Steps */}
        <section aria-labelledby="steps-heading" className="space-y-5">
          <h2 id="steps-heading" className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#22D3FF]" aria-hidden="true" />
            {d("stepsHeading", "Step-by-step walkthrough")}
          </h2>

          <ol className="space-y-5">
            {guide.steps.map((step) => (
              <li
                key={step.number}
                className="rounded-3xl bg-[#0E1222] border border-[#202742] p-5 sm:p-7 flex gap-4"
              >
                <span className="w-9 h-9 shrink-0 rounded-xl bg-[#7B4FFF]/15 border border-[#7B4FFF]/40 text-sm font-bold text-[#C4B5FD] flex items-center justify-center">
                  <span aria-hidden="true">{numberFormat.format(step.number)}</span>
                  <span className="sr-only">{d("stepLabel", "Step {number}", { number: step.number })}</span>
                </span>

                <div className="min-w-0 flex-1 space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed whitespace-pre-line">
                    <RichText text={step.description} hint={hint} />
                  </p>

                  {step.warning && (
                    <Callout tone="warning" label={d("warningLabel", "Warning")}>
                      <RichText text={step.warning} hint={hint} />
                    </Callout>
                  )}
                  {step.proTip && (
                    <Callout tone="tip" label={d("proTipLabel", "Pro tip")}>
                      <RichText text={step.proTip} hint={hint} />
                    </Callout>
                  )}

                  {step.videos.length > 0 && (
                    <div className="space-y-2">
                      {step.videos.map((video) => (
                        <VideoLink key={video.key} video={video} hint={hint} label={watchLabel(video)} />
                      ))}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Key takeaways */}
        <section
          aria-labelledby="takeaways-heading"
          className="rounded-3xl bg-gradient-to-r from-[#12172E] via-[#161D3A] to-[#12172E] border border-[#252F53] p-6 sm:p-8 space-y-4"
        >
          <h2 id="takeaways-heading" className="text-lg sm:text-xl font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#10B981]" aria-hidden="true" />
            {d("takeawaysHeading", "Key takeaways")}
          </h2>
          <ul className="space-y-3">
            {guide.takeaways.map((text, i) => (
              <li key={i} className="flex gap-3 text-sm text-[#CBD5E1] leading-relaxed">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#10B981]" aria-hidden="true" />
                <span>
                  <RichText text={text} hint={hint} />
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Video tutorials for the whole guide */}
        {guide.tutorialVideos.length > 0 && (
          <section aria-labelledby="videos-heading" className="space-y-4">
            <h2 id="videos-heading" className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <Play className="w-5 h-5 text-[#A855F7]" aria-hidden="true" />
              {d("videoTutorialsHeading", "Video tutorials")}
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {guide.tutorialVideos.map((video) => (
                <VideoLink key={video.key} video={video} hint={hint} label={watchLabel(video)} />
              ))}
            </div>
          </section>
        )}

        {/* Previous / next guide */}
        {(prev || next) && (
          <nav className="grid gap-3 sm:grid-cols-2" aria-label={msg(s, "guidesInTopic", "Guides in this Topic")}>
            {prev ? (
              <Link
                href={guideHref(prev.id)}
                rel="prev"
                className="group rounded-2xl bg-[#0E1222] hover:bg-[#13182C] border border-[#202742] hover:border-[#2C375D] p-4 transition-all"
              >
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#606E85]">
                  <ArrowLeft className="w-3 h-3 rtl:rotate-180" aria-hidden="true" />
                  {d("previousGuide", "Previous guide")}
                </span>
                <span className="block mt-1 text-sm font-medium text-[#CBD5E1] group-hover:text-white">
                  {guideTitle(prev)}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={guideHref(next.id)}
                rel="next"
                className="group rounded-2xl bg-[#0E1222] hover:bg-[#13182C] border border-[#202742] hover:border-[#2C375D] p-4 transition-all sm:text-end"
              >
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#606E85] sm:justify-end">
                  {d("nextGuide", "Next guide")}
                  <ArrowRight className="w-3 h-3 rtl:rotate-180" aria-hidden="true" />
                </span>
                <span className="block mt-1 text-sm font-medium text-[#CBD5E1] group-hover:text-white">
                  {guideTitle(next)}
                </span>
              </Link>
            )}
          </nav>
        )}

        {/* Support / call to action (reuses the GuidesPage support copy) */}
        <section className="rounded-3xl bg-gradient-to-r from-[#12172E] via-[#161D3A] to-[#12172E] border border-[#252F53] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-start">
            <h2 className="text-lg font-bold flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#22D3FF]" aria-hidden="true" />
              {msg(t, "supportTitle", "Need a hand with this guide?")}
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              {msg(t, "supportDescription", "Our community mentors are available to help.")}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={AFFILIATE_CONFIG.APP_URL}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7B4FFF] hover:bg-[#6a3fe8] text-white text-xs font-bold transition-all shadow-md shadow-[#7B4FFF]/25"
            >
              <span>{msg(t, "launchDapp", "Launch CaryPact DApp")}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="sr-only">{hint}</span>
            </a>
            <a
              href={AFFILIATE_CONFIG.TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#22D3FF] hover:bg-[#1bb8df] text-[#0A0C14] text-xs font-bold transition-all shadow-md shadow-[#22D3FF]/20"
            >
              <span>{msg(s, "communitySupport", "Community Support")}</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="sr-only">{hint}</span>
            </a>
          </div>
        </section>

        {/* Other topics */}
        {otherTopics.length > 0 && (
          <section aria-labelledby="other-topics-heading" className="space-y-4">
            <h2 id="other-topics-heading" className="text-lg sm:text-xl font-bold">
              {d("otherTopicsHeading", "Explore other topics")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {otherTopics.map((item) => {
                const Icon = TOPIC_ICONS[item.iconName] ?? BookOpen;
                return (
                  <Link
                    key={item.id}
                    href={`/guides/${item.id}`}
                    className="group rounded-2xl bg-[#0E1222] border border-[#202742] hover:border-[#7B4FFF]/60 p-4 space-y-2 transition-all"
                  >
                    <Icon className="w-5 h-5 text-[#22D3FF]" aria-hidden="true" />
                    <span className="block text-sm font-bold text-white group-hover:text-[#22D3FF] transition-colors">
                      {item.title}
                    </span>
                    <span className="block text-xs text-[#94A3B8] leading-relaxed line-clamp-3">
                      {item.description}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#22D3FF]">
                      {msg(s, "exploreTopic", "Explore Topic")}
                      <ArrowRight className="w-3 h-3 rtl:rotate-180" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Disclosure (localized; AFFILIATE_CONFIG.DISCLOSURE_TEXT is English-only) */}
        <p className="text-[11px] leading-relaxed text-[#606E85] text-center max-w-3xl mx-auto">
          {d("disclosure", AFFILIATE_CONFIG.DISCLOSURE_TEXT)}
        </p>
      </div>
    </main>
  );
}