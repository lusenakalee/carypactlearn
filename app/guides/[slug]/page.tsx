import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GUIDE_TOPICS, GUIDES_DATA, type GuideArticle, type GuideTopic } from "@/config/content";
import GuideDetail from "@/components/GuideDetail";

// This file is a plain Server Component and deliberately makes NO next-intl calls
// (no getTranslations / useTranslations): the app has no server-side next-intl config.
// All translated UI lives in components/GuideDetail.tsx, a client component that reads
// the messages from the NextIntlClientProvider, exactly like GuidesSection does.
//
// Routing
//   /guides/<topicId>                 -> topic page, first guide selected
//   /guides/<topicId>?guide=<guideId> -> topic page, that guide selected
//   /guides/<guideSlug>               -> that guide inside its own topic
// A topic id wins when it collides with a guide slug (e.g. "getting-started").
export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = new Set<string>([
    ...GUIDE_TOPICS.map((topic) => topic.id),
    ...GUIDES_DATA.map((guide) => guide.slug),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

interface ResolvedRoute {
  topic: GuideTopic;
  selected: GuideArticle;
}

const firstParam = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

function resolveRoute(slug: string, guideParam?: string): ResolvedRoute | null {
  const topicMatch = GUIDE_TOPICS.find((topic) => topic.id === slug);
  if (topicMatch) {
    const guides = topicMatch.guideIds.flatMap((id) => {
      const guide = GUIDES_DATA.find((g) => g.id === id);
      return guide ? [guide] : [];
    });
    if (guides.length === 0) return null;
    return { topic: topicMatch, selected: guides.find((g) => g.id === guideParam) ?? guides[0] };
  }

  const guide = GUIDES_DATA.find((g) => g.slug === slug);
  const topic = guide && GUIDE_TOPICS.find((t) => t.id === guide.topicId);
  return guide && topic ? { topic, selected: guide } : null;
}

const truncate = (text: string, max: number) =>
  text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`;

// Metadata cannot be localized here without server-side next-intl, so it uses the English
// strings from config/content.ts (the visible page content is fully localized).
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const resolved = resolveRoute(slug, firstParam(query.guide));
  if (!resolved) return {};

  const description = truncate(resolved.selected.summary, 160);
  return {
    title: `${resolved.selected.title} | ${resolved.topic.title}`,
    description,
    openGraph: { title: resolved.selected.title, description, type: "article" },
  };
}

export default async function GuideDetailPage({ params, searchParams }: PageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const resolved = resolveRoute(slug, firstParam(query.guide));
  if (!resolved) notFound();

  return <GuideDetail topicId={resolved.topic.id} guideId={resolved.selected.id} />;
}