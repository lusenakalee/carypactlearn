"use client";

import React, { useState } from "react";
import { 
  X, 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Bell, 
  ArrowRight,
  Loader2
} from "lucide-react";
import confetti from "canvas-confetti";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["Daily Emission Reports", "Exchange Listing Alerts"]);

  if (!isOpen) return null;

  const topics = [
    "Daily Emission Reports",
    "Exchange Listing Alerts (OKX/Bybit)",
    "Hashrate Yield Updates",
    "Security & Phishing Warnings",
    "Weekly Web3 Deep-Dives"
  ];

  const toggleTopic = (t: string) => {
    setSelectedTopics((prev) => 
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !consentChecked) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="newsletter-modal"
        className="bg-[#0E1020] border border-[#1E243B] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#1E243B] flex items-center justify-between bg-[#131728]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7B4FFF]/20 border border-[#7B4FFF]/30 flex items-center justify-center text-[#22D3FF]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">CaryPact Protocol Dispatch</h3>
              <p className="text-xs text-[#838E9E]">On-chain metrics, halving countdowns & listing alerts</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#838E9E] hover:text-white hover:bg-[#1C1F2E] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Subscription Confirmed</h4>
            <p className="text-xs text-[#C4CBD8] leading-relaxed max-w-sm mx-auto">
              You are now subscribed to verified CaryPact updates and tokenomics dispatches. You can unsubscribe at any time with a single click.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] text-white text-xs font-bold uppercase tracking-wider"
            >
              Return to Hub
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-[#838E9E] uppercase tracking-wider">
                Your Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#838E9E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#131728] border border-[#1E243B] focus:border-[#7B4FFF] rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-[#838E9E] focus:outline-none"
                />
              </div>
            </div>

            {/* Topics of Interest */}
            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-[#838E9E] uppercase tracking-wider">
                Select Topics of Interest
              </label>
              <div className="flex flex-wrap gap-1.5">
                {topics.map((t) => {
                  const isChecked = selectedTopics.includes(t);
                  return (
                    <button
                      type="button"
                      key={t}
                      onClick={() => toggleTopic(t)}
                      className={`px-3 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
                        isChecked
                          ? "bg-[#7B4FFF]/20 border-[#7B4FFF] text-white"
                          : "bg-[#131728] border-[#1E243B] text-[#838E9E] hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GDPR Consent Checkbox */}
            <div className="p-3 bg-[#131728] border border-[#1E243B] rounded-xl flex items-start gap-2.5">
              <input
                type="checkbox"
                id="gdpr-consent"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-0.5 rounded border-[#1E243B] bg-[#0E1020] text-[#7B4FFF] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="gdpr-consent" className="text-[11px] text-[#C4CBD8] leading-tight cursor-pointer">
                <strong>Explicit Opt-in:</strong> I consent to receiving educational updates and protocol alerts. I understand my email will never be sold or shared, and I can unsubscribe anytime.
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={loading || !email || !consentChecked}
              className="w-full py-3 px-4 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#7B4FFF]/25 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#22D3FF]" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#22D3FF]" />
                  <span>Subscribe to Verified Updates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
