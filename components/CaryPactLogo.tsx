"use client";

import Image from "next/image";

interface CaryPactLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "mark-only";
  showBadge?: boolean;
  badgeText?: string;
  subtitle?: string;
  className?: string;
  idPrefix?: string;
}

export function CaryPactMark({
  size = 36,
  className = "",
  id = "cp-mark",
}: {
  size?: number;
  className?: string;
  id?: string;
}) {
  const silverUpperId = `${id}-silver-upper`;
  const silverLowerId = `${id}-silver-lower`;
  const ribbonUpperId = `${id}-ribbon-upper`;
  const ribbonLowerId = `${id}-ribbon-lower`;
  const shadowId = `${id}-shadow`;

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_12px_rgba(123,79,255,0.35)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          {/* Silver Upper Metallic Chrome Gradient */}
          <linearGradient id={silverUpperId} x1="0%" y1="0%" x2="70%" y2="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#E2E8F0" />
            <stop offset="60%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Silver Lower Metallic Chrome Gradient */}
          <linearGradient id={silverLowerId} x1="0%" y1="100%" x2="70%" y2="30%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="35%" stopColor="#64748B" />
            <stop offset="70%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>

          {/* Top Ribbon Arc: Cyan -> Electric Blue -> Royal Violet */}
          <linearGradient id={ribbonUpperId} x1="25%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="20%" stopColor="#0284C7" />
            <stop offset="55%" stopColor="#3B82F6" />
            <stop offset="82%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>

          {/* Bottom Ribbon Arc: Royal Violet -> Electric Indigo -> Cyan */}
          <linearGradient id={ribbonLowerId} x1="100%" y1="50%" x2="25%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="28%" stopColor="#7C3AED" />
            <stop offset="65%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Soft Glow Filter */}
          <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#7C3AED" floodOpacity="0.4" />
          </filter>
        </defs>

        <g filter={`url(#${shadowId})`}>
          {/* 1. Upper Left Metallic Chrome Segment */}
          <path
            d="M 50 4
               A 46 46 0 0 0 4 50
               L 36 50
               L 50 36
               Z"
            fill={`url(#${silverUpperId})`}
          />

          {/* 2. Lower Left Metallic Chrome Segment */}
          <path
            d="M 4 50
               A 46 46 0 0 0 50 96
               L 50 64
               L 36 50
               Z"
            fill={`url(#${silverLowerId})`}
          />

          {/* 3. Top Gradient Ribbon Arm (Cyan -> Blue -> Purple) */}
          <path
            d="M 50 4
               A 46 46 0 0 1 88 28
               C 89.2 29.6 88.6 31.8 86.8 32.8
               L 64 48
               C 63.2 48.6 61.8 48.4 61 47.4
               L 50 36
               Z"
            fill={`url(#${ribbonUpperId})`}
          />

          {/* 4. Bottom Gradient Ribbon Arm (Purple -> Blue -> Cyan) */}
          <path
            d="M 50 96
               A 46 46 0 0 0 88 72
               C 89.2 70.4 88.6 68.2 86.8 67.2
               L 64 52
               C 63.2 51.4 61.8 51.6 61 52.6
               L 50 64
               Z"
            fill={`url(#${ribbonLowerId})`}
          />

          {/* Subtle Crease Lines for 3D Definition */}
          <line
            x1="4"
            y1="50"
            x2="36"
            y2="50"
            stroke="#FFFFFF"
            strokeOpacity="0.65"
            strokeWidth="0.8"
          />
          <line
            x1="36"
            y1="50"
            x2="50"
            y2="36"
            stroke="#FFFFFF"
            strokeOpacity="0.4"
            strokeWidth="0.8"
          />
          <line
            x1="36"
            y1="50"
            x2="50"
            y2="64"
            stroke="#475569"
            strokeOpacity="0.5"
            strokeWidth="0.8"
          />
        </g>
      </svg>
    </div>
  );
}

export default function CaryPactLogo({
  size = "md",
  variant = "full",
  showBadge = false,
  badgeText = "Hub",
  subtitle,
  className = "",
  idPrefix = "cp-nav",
}: CaryPactLogoProps) {
  const markDimensions = {
    sm: 28,
    md: 38,
    lg: 56,
    xl: 12,
  }[size];

  const textSizeClasses = {
    sm: "text-base tracking-tight",
    md: "text-xl tracking-tight",
    lg: "text-2xl tracking-tight",
    xl: "text-3xl tracking-tight",
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* CaryPact Official Emblem */}
      <Image src='/images/cpl-logo.svg' alt="CaryPact Logo" width="124" height="124" />

      {/* Wordmark & Optional Badge/Subtitle */}
      {variant === "full" && (
        <div className="flex flex-col">
         
          {/* {subtitle && (
            <span className="text-[11px] text-[#838E9E] mt-0.5 leading-none">
              {subtitle}
            </span>
          )} */}
        </div>
      )}
    </div>
  );
}
