"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ExternalLink,
} from "lucide-react";
import { GUIDES_DATA } from "@/config/content";
import { AFFILIATE_CONFIG } from "@/config/constants";

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  guideSlug?: string;
  /**
   * Called once the real duration of the currently open video is known,
   * read directly off the source itself (YouTube IFrame API for YouTube
   * videos, HTMLVideoElement.duration for local files). Never fabricated.
   */
  onDurationResolved?: (guideId: string, duration: string) => void;
}

// Minimal surface of the YouTube IFrame API used here.
declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
  getIframe: () => HTMLIFrameElement;
}

let youtubeApiPromise: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT) return Promise.resolve();
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise((resolve) => {
    const prevCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prevCallback?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });

  return youtubeApiPromise;
}

function formatTime(totalSeconds: number): string {
  if (!isFinite(totalSeconds) || totalSeconds < 0) return "0:00";
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function VideoPlayerModal({
  isOpen,
  onClose,
  guideSlug = "getting-started",
  onDurationResolved,
}: VideoPlayerModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const ytContainerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const theatreRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentGuide = GUIDES_DATA.find((g) => g.slug === guideSlug) || GUIDES_DATA[0];
  const video = currentGuide.video;
  const isYouTube = video?.type === "youtube";

  // Reset transient playback state whenever we switch to a different guide's video.
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(true);
    setIsMuted(false);
  }, [guideSlug]);

  // Set up (and tear down) the real YouTube player for YouTube-hosted guides.
  useEffect(() => {
    if (!isOpen || !video || video.type !== "youtube") return;

    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled || !ytContainerRef.current || !window.YT) return;

      ytPlayerRef.current = new window.YT.Player(ytContainerRef.current, {
        videoId: video.videoId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          ...(video.startSeconds ? { start: video.startSeconds } : {}),
        },
        events: {
          onReady: (event) => {
            const realDuration = event.target.getDuration();
            setDuration(realDuration);
            onDurationResolved?.(currentGuide.id, formatTime(realDuration));

            pollRef.current = setInterval(() => {
              if (!ytPlayerRef.current) return;
              setCurrentTime(ytPlayerRef.current.getCurrentTime());
            }, 500);
          },
          onStateChange: (event) => {
            if (!window.YT) return;
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (pollRef.current) clearInterval(pollRef.current);
      ytPlayerRef.current?.destroy();
      ytPlayerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, guideSlug]);

  if (!isOpen || !video) return null;

  const togglePlay = () => {
    if (isYouTube) {
      const p = ytPlayerRef.current;
      if (!p) return;
      isPlaying ? p.pauseVideo() : p.playVideo();
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch((err) => {
        console.warn("Video playback failed (likely a missing/invalid source):", err);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (isYouTube) {
      const p = ytPlayerRef.current;
      if (!p) return;
      const nextMuted = !p.isMuted();
      nextMuted ? p.mute() : p.unMute();
      setIsMuted(nextMuted);
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const fraction = (e.clientX - rect.left) / rect.width;
    const target = fraction * duration;

    if (isYouTube) {
      ytPlayerRef.current?.seekTo(target, true);
      setCurrentTime(target);
      return;
    }
    const v = videoRef.current;
    if (v) v.currentTime = target;
  };

  const handleFullscreen = () => {
    if (isYouTube) {
      const iframe = ytPlayerRef.current?.getIframe();
      iframe?.requestFullscreen?.();
      return;
    }
    videoRef.current?.requestFullscreen?.();
  };

  const chapters = video.chapters;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="video-player-modal"
        className="bg-[#0E1020] border border-[#1E243B] rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#1E243B] flex items-center justify-between bg-[#131728]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#22D3FF]/20 text-[#22D3FF] flex items-center justify-center">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">{currentGuide.title}</h3>
              <p className="text-xs text-[#838E9E]">Interactive Protocol Video Walkthrough</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#838E9E] hover:text-white hover:bg-[#1C1F2E] transition-colors"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas / Theatre Screen */}
        <div ref={theatreRef} className="relative aspect-video bg-[#05060A] flex items-center justify-center overflow-hidden group">
          {video.type === "youtube" ? (
            // The YT.Player attaches its iframe onto this div directly.
            <div ref={ytContainerRef} className="absolute inset-0 w-full h-full" />
          ) : video.src ? (
            <video
              ref={videoRef}
              src={video.src}
              poster={video.poster}
              autoPlay
              muted={isMuted}
              playsInline
              onTimeUpdate={() => {
                if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
              }}
              onLoadedMetadata={() => {
                const v = videoRef.current;
                if (!v) return;
                setDuration(v.duration);
                onDurationResolved?.(currentGuide.id, formatTime(v.duration));
              }}
              onError={() => {
                console.warn(`No playable source found at "${video.src}" for guide "${currentGuide.id}".`);
                setIsPlaying(false);
              }}
              className="w-full h-full object-cover cursor-pointer"
              onClick={togglePlay}
            />
          ) : (
            <div className="text-xs text-[#838E9E] px-6 text-center">
              No video source is configured for this guide yet.
            </div>
          )}

          {/* Center Play Button Overlay when paused (local video only —
              the YouTube player's own click-to-play affordance is inside its iframe) */}
          {!isYouTube && !isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute z-20 w-16 h-16 rounded-full bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white flex items-center justify-center shadow-2xl shadow-[#7B4FFF]/50 hover:scale-110 transition-all cursor-pointer border border-white/20"
              aria-label="Play video"
            >
              <Play className="w-7 h-7 fill-current ml-1" />
            </button>
          )}

          {/* Bottom Player Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none">
            {/* Progress Bar */}
            <div
              onClick={handleSeek}
              className="h-1.5 w-full bg-[#1E243B] rounded-full overflow-hidden cursor-pointer pointer-events-auto"
            >
              <div
                className="h-full bg-gradient-to-r from-[#22D3FF] to-[#A855F7] rounded-full"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-white pointer-events-auto">
              <div className="flex items-center gap-3">
                <button onClick={togglePlay} className="hover:text-[#22D3FF] transition-colors cursor-pointer">
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button onClick={toggleMute} className="hover:text-[#22D3FF] transition-colors cursor-pointer">
                  {isMuted ? <VolumeX className="w-4 h-4 text-[#838E9E]" /> : <Volume2 className="w-4 h-4 text-[#22D3FF]" />}
                </button>
                <span className="text-[#838E9E] font-mono">
                  {formatTime(currentTime)} / {duration ? formatTime(duration) : "--:--"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#1C1F2E] text-[#22D3FF] font-bold">
                  {isYouTube ? "YouTube" : "Local HD"}
                </span>
                <button onClick={handleFullscreen} className="p-1 hover:text-[#22D3FF] transition-colors cursor-pointer" title="Fullscreen">
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Chapters — only rendered when a guide actually has real, authored
            chapter timestamps; we never fabricate generic placeholder chapters. */}
        <div className="p-4 sm:p-6 bg-[#0E1020] border-t border-[#1E243B] space-y-3">
          {chapters && chapters.length > 0 && (
            <>
              <div className="text-xs font-bold uppercase tracking-wider text-[#838E9E]">Video Chapters</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {chapters.map((ch, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (isYouTube) {
                        ytPlayerRef.current?.seekTo(ch.startSeconds, true);
                      } else if (videoRef.current) {
                        videoRef.current.currentTime = ch.startSeconds;
                      }
                    }}
                    className="p-2.5 rounded-xl border text-left text-xs bg-[#0A0C14] border-[#1E243B] text-[#838E9E] hover:text-[#C4CBD8] hover:border-[#2A314D] transition-colors"
                  >
                    <div className="font-bold truncate">{ch.title}</div>
                    <div className="text-[10px] text-[#22D3FF] mt-0.5">{formatTime(ch.startSeconds)}</div>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#1E243B]">
            <span className="text-xs text-[#838E9E]">Follow along in real-time on CaryPact</span>
            <a
              href={AFFILIATE_CONFIG.APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
            >
              <span>Launch App (Invite: 1AjyRv)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}