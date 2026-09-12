"use client";

import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  Heart, 
  Repeat2, 
  Share2, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  BadgeCheck,
  RefreshCw,
  Eye,
  Send
  
} from "lucide-react";
import { AFFILIATE_CONFIG } from "@/config/constants";

interface TweetItem {
  id: string;
  author: string;
  handle: string;
  verified: boolean;
  date: string;
  content: string;
  likes: number;
  retweets: number;
  replies: number;
  views: string;
  url: string;
  category: string;
  badge: string;
}

interface TwitterLiveFeedProps {
  limit?: number;
  showHeader?: boolean;
}

export default function TwitterLiveFeed({ limit, showHeader = true }: TwitterLiveFeedProps) {
  const [tweets, setTweets] = useState<TweetItem[]>([]);
  const [profile, setProfile] = useState({
    name: "CaryPact Official",
    handle: "@CaryPact",
    url: "https://x.com/CaryPact",
    followers: "128.5K",
    following: "42",
    tweetsCount: "1,420",
    bio: "Decentralized AI Supercomputing Consensus Protocol on BOT Chain. High-throughput computing resource coordination. Total Supply: 210M CA."
  });
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>("Just now");

  const categories = ["All", "Consensus", "Tokenomics", "Product", "Education", "Community"];

  const fetchTweets = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/twitter/feed");
      if (res.ok) {
        const data = await res.json();
        if (data.tweets) {
          setTweets(data.tweets);
        }
        if (data.profile) {
          setProfile(data.profile);
        }
        setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
    } catch (err) {
      console.error("Failed to fetch tweets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadInitialTweets = async () => {
      try {
        const res = await fetch("/api/twitter/feed");
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data.tweets) {
            setTweets(data.tweets);
          }
          if (data.profile) {
            setProfile(data.profile);
          }
          setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }
      } catch (err) {
        console.error("Failed to load initial tweets", err);
      }
    };

    loadInitialTweets();
    const interval = setInterval(fetchTweets, 60000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const filteredTweets = tweets.filter(
    (t) => activeCategory === "All" || t.category.toLowerCase() === activeCategory.toLowerCase()
  );

  const displayList = limit ? filteredTweets.slice(0, limit) : filteredTweets;

  return (
    <div className="bg-[#0E1020] border border-[#1E243B] rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#7B4FFF]/10 blur-[130px] pointer-events-none rounded-full" />

      {showHeader && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#1E243B]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131728] border border-[#2A314D] text-xs font-semibold text-[#22D3FF]">
              {/* <Twitter className="w-3.5 h-3.5 fill-current" /> */}
              <span>Live Social Consensus Feed</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2 mt-1">
              <span>Official @CaryPact X / Twitter Feed</span>
              <BadgeCheck className="w-5 h-5 text-[#22D3FF]" />
            </h3>
            <p className="text-xs text-[#838E9E]">
              Direct real-time broadcasts, consensus updates, and token announcements from{" "}
              <a 
                href="https://x.com/CaryPact" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#22D3FF] hover:underline font-semibold"
              >
                https://x.com/CaryPact
              </a>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchTweets}
              disabled={loading}
              className="p-2.5 rounded-xl bg-[#131728] hover:bg-[#1C1F2E] border border-[#1E243B] text-[#C4CBD8] hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Refresh tweets"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-[#22D3FF]" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <a
              href="https://x.com/CaryPact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <span>Follow @CaryPact</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="bg-[#131728] border border-[#1E243B] rounded-2xl p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#22D3FF] via-[#7B4FFF] to-[#A855F7] p-0.5 flex-shrink-0">
            <div className="w-full h-full bg-[#0E1020] rounded-[14px] flex items-center justify-center font-black text-white text-lg">
              CP
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm sm:text-base font-extrabold text-white">{profile.name}</h4>
              <BadgeCheck className="w-4 h-4 text-[#22D3FF]" />
              <span className="text-xs text-[#838E9E]">{profile.handle}</span>
            </div>
            <p className="text-xs text-[#C4CBD8] mt-0.5 line-clamp-1">{profile.bio}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-[#838E9E] self-end sm:self-auto">
          <div><strong className="text-white">{profile.followers}</strong> Followers</div>
          <div><strong className="text-white">{profile.tweetsCount}</strong> Posts</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-5 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              activeCategory === cat
                ? "bg-[#7B4FFF] text-white shadow-sm"
                : "bg-[#131728] text-[#838E9E] hover:text-white border border-[#1E243B]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tweets Grid / Feed */}
      <div className="space-y-4">
        {displayList.map((tweet) => (
          <div
            key={tweet.id}
            className="bg-[#0A0C14] border border-[#1E243B] hover:border-[#7B4FFF]/50 rounded-2xl p-5 transition-all group"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#22D3FF] to-[#7B4FFF] p-0.5 flex-shrink-0">
                  <div className="w-full h-full bg-[#0E1020] rounded-[10px] flex items-center justify-center font-bold text-xs text-white">
                    CP
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-[#22D3FF] transition-colors">
                      {tweet.author}
                    </span>
                    <BadgeCheck className="w-3.5 h-3.5 text-[#22D3FF]" />
                    <span className="text-[11px] text-[#838E9E]">{tweet.handle}</span>
                    <span className="text-[#838E9E] text-[10px]">•</span>
                    <span className="text-[11px] text-[#838E9E]">{tweet.date}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#A855F7] px-2 py-0.5 rounded bg-[#131728] border border-[#1E243B]">
                    {tweet.badge}
                  </span>
                </div>
              </div>

              <a
                href={tweet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#838E9E] hover:text-[#22D3FF] transition-colors p-1"
                title="View original on X"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Tweet Content Body */}
            <p className="text-xs sm:text-sm text-[#C4CBD8] leading-relaxed whitespace-pre-line mb-4">
              {tweet.content}
            </p>

            {/* Tweet Metrics Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#1E243B] text-xs text-[#838E9E]">
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-1 hover:text-[#22D3FF] transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{tweet.replies}</span>
                </span>
                <span className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
                  <Repeat2 className="w-3.5 h-3.5" />
                  <span>{tweet.retweets}</span>
                </span>
                <span className="flex items-center gap-1 hover:text-rose-400 transition-colors">
                  <Heart className="w-3.5 h-3.5" />
                  <span>{tweet.likes}</span>
                </span>
                <span className="flex items-center gap-1 hover:text-[#22D3FF] transition-colors">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{tweet.views}</span>
                </span>
              </div>

              <a
                href={tweet.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#7B4FFF] hover:text-[#22D3FF] transition-colors flex items-center gap-1"
              >
                <span>Open on X.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Feed Footer */}
      <div className="mt-6 pt-4 border-t border-[#1E243B] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#838E9E]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Live feed auto-synced with @CaryPact (Last update: {lastRefreshed})</span>
        </div>

        <a
          href="https://x.com/CaryPact"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-[#22D3FF] hover:underline flex items-center gap-1"
        >
          <span>View complete X feed history</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
