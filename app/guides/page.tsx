"use client";
import GuidesSection from "@/components/GuidesSection";
import React, { useState } from "react";

export default function page() {
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoGuideSlug, setVideoGuideSlug] = useState("getting-started");

  // Populated at runtime from the actual video source (YouTube IFrame API
  // for YouTube videos, HTMLVideoElement.duration for local files) — never
  // hardcoded, so the time shown always matches the real video.
  const [videoDurations, setVideoDurations] = useState<Record<string, string>>(
    {},
  );

  const handleOpenVideo = (slug?: string) => {
    if (slug) setVideoGuideSlug(slug);
    setVideoModalOpen(true);
  };

  return (
    <div>
      <GuidesSection
        onOpenVideo={handleOpenVideo}
        onOpenPdf={() => setPdfModalOpen(true)}
        videoDurations={videoDurations}
      />
    </div>
  );
}
