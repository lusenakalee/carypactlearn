"use client";

import CaryPactLogo from "@/components/CaryPactLogo";
import {
    Cpu,
    Maximize2,
    Pause,
    Play,
    RotateCcw,
    Volume2,
    VolumeX
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export default function HeroVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(6);
  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setCurrentTime(video.currentTime);
        setDuration(video.duration);
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Attempt autoplay
    video.play().catch(() => {
      setIsPlaying(false);
    });

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleRestart = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div 
      ref={containerRef}
      id="hero-video-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className="relative w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl border border-[#2A314D]/80 bg-[#070913] p-1.5 sm:p-2.5 shadow-2xl shadow-[#7B4FFF]/15 group overflow-hidden transition-all duration-300 hover:border-[#7B4FFF]/50"
    >
      {/* Decorative Neon Ambient Glow behind the player */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#22D3FF]/20 via-[#7B4FFF]/25 to-[#A855F7]/20 rounded-3xl blur-xl -z-10 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity" />

      {/* Top Header Bar of the Hardware Screen */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 border-b border-[#1E243B] bg-[#0E1020]/90 rounded-t-xl sm:rounded-t-2xl text-xs text-[#838E9E]">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="flex items-center gap-1.5">
            <CaryPactLogo size="sm" showBadge={false} />
            <span className="hidden sm:inline-block text-[#5B6579]">•</span>
            <span className="hidden sm:inline-block text-[#C4CBD8] font-medium text-[11px]">
              Protocol Reveal Reel
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#161B2E] border border-[#222A45] text-[10px] font-mono font-medium text-[#22D3FF]">
            <Cpu className="w-3 h-3" />
            <span>HASH-SPHERE</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#161B2E] border border-[#222A45] text-[10px] font-mono font-medium text-[#C084FC]">
            <span>60 FPS HD</span>
          </span>
        </div>
      </div>

      {/* Main Video Viewport (16:9 Aspect Ratio) */}
      <div className="relative aspect-video w-full rounded-b-xl sm:rounded-b-2xl overflow-hidden bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          src="/videos/cp-reel.mp4"
          poster="/carrypact-hero-poster.png"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover select-none cursor-pointer"
          onClick={togglePlay}
        />

        {/* Big Center Play/Pause Overlay Button on click/pause */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            id="hero-video-play-center-btn"
            className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#7B4FFF]/90 hover:bg-[#6D3DF5] text-white flex items-center justify-center shadow-2xl shadow-[#7B4FFF]/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-white/20 backdrop-blur-md"
            aria-label="Play video"
          >
            <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1" />
          </button>
        )}

        {/* Bottom Control Overlay Bar */}
        <div 
          className={`absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent flex flex-col gap-2 transition-opacity duration-300 ${
            showControls || !isPlaying ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto"
          }`}
        >
          {/* Progress Bar with scrubber */}
          <div 
            onClick={handleSeek}
            className="group/progress relative h-2 sm:h-2.5 w-full bg-white/20 hover:bg-white/30 rounded-full cursor-pointer transition-all overflow-hidden"
          >
            <div 
              className="h-full bg-gradient-to-r from-[#22D3FF] via-[#7B4FFF] to-[#A855F7] rounded-full relative"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between text-xs text-white pt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                id="hero-video-toggle-play"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>

              <button
                onClick={handleRestart}
                id="hero-video-restart"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#C4CBD8] hover:text-white transition-colors cursor-pointer"
                title="Replay from beginning"
                aria-label="Replay"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={toggleMute}
                id="hero-video-toggle-mute"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#838E9E]" /> : <Volume2 className="w-4 h-4 text-[#22D3FF]" />}
                <span className="text-[11px] text-[#C4CBD8] hidden sm:inline">
                  {isMuted ? "Muted" : "Sound On"}
                </span>
              </button>

              <div className="text-[11px] font-mono text-[#838E9E]">
                <span className="text-white font-medium">{formatTime(currentTime)}</span> / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#7B4FFF]/30 text-[#22D3FF] border border-[#7B4FFF]/50 hidden sm:inline-block">
                CaryPact Core
              </span>
              <button
                onClick={toggleFullscreen}
                id="hero-video-fullscreen"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#C4CBD8] hover:text-white transition-colors cursor-pointer"
                title="Fullscreen"
                aria-label="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
