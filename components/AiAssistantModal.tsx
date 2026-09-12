"use client";

import React, { useState, useEffect } from "react";
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  HelpCircle, 
  Loader2, 
  ArrowRight,
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { AFFILIATE_CONFIG } from "@/config/constants";

interface AiAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
  currentLang?: string;
}

interface Message {
  role: "user" | "assistant";
  text: string;
}

export default function AiAssistantModal({
  isOpen,
  onClose,
  initialQuestion = "",
  currentLang = "en"
}: AiAssistantModalProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I am the CaryPact Learning Assistant. Ask me anything about BOT Chain, CA Tokenomics, Hashrate Units (1 USDT = 1 Unit), 5% BDEX slippage, Staking Multipliers, or VIP Referral structures."
    }
  ]);

  const handleAsk = React.useCallback(async (questionText: string) => {
    if (!questionText.trim()) return;

    const userMsg: Message = { role: "user", text: questionText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/gemini/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: questionText, language: currentLang })
      });

      const data = await res.json();
      const botMsg: Message = {
        role: "assistant",
        text: data.answer || "CaryPact is a decentralized supercomputing protocol on BOT Chain with a 210M CA total supply and permanent hashrate allocation."
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "CaryPact operates on BOT Chain. Computing power is purchased at 1 USDT = 1 Hashrate Unit (permanent, no principal exit). Staking multipliers range from 1.3x to 2.5x, and selling CA incurs a 5% slippage fee."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, [currentLang]);

  useEffect(() => {
    if (initialQuestion && isOpen) {
      const timer = setTimeout(() => {
        handleAsk(initialQuestion);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [initialQuestion, isOpen, handleAsk]);

  if (!isOpen) return null;

  const quickQuestions = [
    "What is the permanence rule for Hashrate Units?",
    "How does the 5% BDEX slippage get distributed?",
    "Explain the 40,000 CA daily emission split",
    "What are the requirements for VIP V1 to V10?"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        id="ai-assistant-modal"
        className="bg-[#0E1020] border border-[#1E243B] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#1E243B] flex items-center justify-between bg-[#131728]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#22D3FF] via-[#7B4FFF] to-[#A855F7] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#0E1020] rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#22D3FF]" />
              </div>
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>CaryPact AI Educational Tutor</span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#22D3FF]/10 text-[#22D3FF] border border-[#22D3FF]/30">
                  Grounded AI
                </span>
              </h3>
              <p className="text-xs text-[#838E9E]">Objective answers grounded in official protocol mechanics</p>
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

        {/* Chat History Messages */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs sm:text-sm">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                m.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                m.role === "user" 
                  ? "bg-[#7B4FFF] text-white" 
                  : "bg-[#131728] border border-[#1E243B] text-[#22D3FF]"
              }`}>
                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-2xl max-w-[85%] leading-relaxed ${
                m.role === "user"
                  ? "bg-[#7B4FFF] text-white font-medium rounded-tr-none"
                  : "bg-[#131728] border border-[#1E243B] text-[#C4CBD8] rounded-tl-none whitespace-pre-line"
              }`}>
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#131728] border border-[#1E243B] text-[#22D3FF] flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-[#131728] border border-[#1E243B] p-3.5 rounded-2xl rounded-tl-none flex items-center gap-2 text-xs text-[#C4CBD8]">
                <Loader2 className="w-4 h-4 animate-spin text-[#22D3FF]" />
                <span>Consulting confirmed CaryPact and BOT Chain knowledge base...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Question Buttons */}
        <div className="px-4 py-2 bg-[#0A0C14] border-t border-[#1E243B] flex gap-1.5 overflow-x-auto text-[11px]">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(q)}
              disabled={loading}
              className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-[#131728] hover:bg-[#1C1F2E] border border-[#1E243B] text-[#C4CBD8] hover:text-[#22D3FF] transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAsk(input);
          }}
          className="p-3 sm:p-4 bg-[#131728] border-t border-[#1E243B] flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Type your question about CaryPact or Web3..."
            className="flex-1 bg-[#0E1020] border border-[#1E243B] focus:border-[#7B4FFF] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-[#838E9E] focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl bg-[#7B4FFF] hover:bg-[#6D3DF5] disabled:opacity-50 text-white transition-all cursor-pointer"
            aria-label="Send question"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
