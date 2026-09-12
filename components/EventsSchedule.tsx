"use client";

import React from "react";
import { 
  Calendar, 
  Video, 
  MapPin, 
  Users, 
  Play, 
  ExternalLink, 
  MessageSquare, 
  Send,
  Sparkles
} from "lucide-react";
import { UPCOMING_EVENTS, AFFILIATE_CONFIG } from "@/config/constants";

export default function EventsSchedule() {
  return (
    <section id="events" className="py-14 sm:py-20 relative overflow-hidden bg-[#0E1020] border-t border-[#1E243B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#22D3FF]">
            <Calendar className="w-3.5 h-3.5" />
            <span>Community Consensus & Live Broadcasts</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Global Events & <span className="text-brand-gradient">Consensus Summits</span>
          </h2>
          <p className="text-sm sm:text-base text-[#C4CBD8]">
            Stay connected with weekly onboarding webinars, recorded Hong Kong consensus summits, and active international community channels.
          </p>
        </div>

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {UPCOMING_EVENTS.map((evt) => (
            <div
              key={evt.id}
              className="bg-[#0A0C14] border border-[#1E243B] rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-[#7B4FFF] transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold px-2.5 py-1 rounded-full bg-[#131728] border border-[#1E243B] text-[#22D3FF]">
                    {evt.type}
                  </span>
                  <span className="text-xs text-[#838E9E]">{evt.date}</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-[#22D3FF] transition-colors">
                  {evt.title}
                </h3>

                <div className="text-xs text-amber-300/90 font-medium flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{evt.stats}</span>
                </div>

                <p className="text-xs text-[#C4CBD8] leading-relaxed">
                  {evt.summary}
                </p>
              </div>

              <div className="pt-5 mt-4 border-t border-[#1E243B]">
                <a
                  href={evt.replayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#7B4FFF] hover:text-[#22D3FF] transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Session & Replay</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Live Social Feeds & Community Strip */}
        <div className="bg-[#131728] border border-[#1E243B] rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <h3 className="text-lg font-bold text-white">Join 350,000+ Global Participants</h3>
            <p className="text-xs sm:text-sm text-[#C4CBD8]">
              Connect with developers, node operators, and verified consensus ambassadors across 15+ languages.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={AFFILIATE_CONFIG.TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1020] hover:bg-[#22D3FF]/10 text-white hover:text-[#22D3FF] text-xs font-bold border border-[#1E243B] hover:border-[#22D3FF] transition-colors"
            >
              <Send className="w-4 h-4 text-[#22D3FF]" />
              <span>Official Telegram</span>
            </a>

            <a
              href={AFFILIATE_CONFIG.TWITTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1020] hover:bg-[#A855F7]/10 text-white hover:text-[#A855F7] text-xs font-bold border border-[#1E243B] hover:border-[#A855F7] transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-[#A855F7]" />
              <span>Twitter / X Feed</span>
            </a>

            <a
              href={AFFILIATE_CONFIG.DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0E1020] hover:bg-[#7B4FFF]/10 text-white hover:text-[#7B4FFF] text-xs font-bold border border-[#1E243B] hover:border-[#7B4FFF] transition-colors"
            >
              <Users className="w-4 h-4 text-[#7B4FFF]" />
              <span>Global Community</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
