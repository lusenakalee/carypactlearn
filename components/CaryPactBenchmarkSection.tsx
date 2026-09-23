"use client";

import React from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Compass, 
  Scale, 
  Coins, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Cpu, 
  CheckCircle2,
  Lock,
  Zap
} from "lucide-react";
import { AFFILIATE_CONFIG } from "@/config/constants";
import CaryPactLogo from "./CaryPactLogo";

interface FeatureCardProps {
  number: string;
  badge: string;
  title: string;
  description: string;
  icon: React.ElementType;
  delay: number;
}

function WhyChooseCard({ number, badge, title, description, icon: Icon, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl bg-gradient-to-b from-[#12162B] to-[#0A0D1B] border border-[#212A4A] hover:border-[#7B4FFF]/60 p-6 sm:p-7 shadow-xl shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#7B4FFF]/15 flex flex-col justify-between"
    >
      {/* Subtle top neon gradient border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#7B4FFF]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Top bar with number and icon */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7B4FFF] to-[#C084FC]">
              {number}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#1A1F38] border border-[#283256] text-[#A5B4FC]">
              {badge}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#171D36] border border-[#2A355C] flex items-center justify-center text-[#A855F7] group-hover:bg-[#7B4FFF]/20 group-hover:border-[#7B4FFF]/50 group-hover:text-white group-hover:scale-105 transition-all">
            <Icon className="w-5 h-5" />
          </div>
        </div>

        {/* Feature Title */}
        <h4 className="text-lg sm:text-xl font-bold text-white mb-2.5 tracking-tight group-hover:text-[#22D3FF] transition-colors">
          {title}
        </h4>

        {/* Feature Description */}
        <p className="text-sm text-[#94A3B8] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Card bottom indicator */}
      <div className="mt-6 pt-4 border-t border-[#1C243E] flex items-center justify-between text-xs text-[#64748B]">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Core Protocol Value</span>
        </span>
        <span className="font-mono text-[11px] text-[#A5B4FC]">app.carypact.com</span>
      </div>
    </motion.div>
  );
}

export default function CaryPactBenchmarkSection() {
  const pillars = [
    {
      number: "01",
      badge: "Sustainable Network",
      title: "Real & Sustainable Computing Infrastructure",
      description: "CaryPact does not pursue short-term explosive incentives, but builds a real and sustainable computing power infrastructure network.",
      icon: ShieldCheck,
      delay: 0.1,
    },
    {
      number: "02",
      badge: "20-Year Horizon",
      title: "Serving Next 20 Years of AI Compute",
      description: "CaryPact's design goal is to serve the AI and decentralized computing needs for the next twenty years.",
      icon: Compass,
      delay: 0.2,
    },
    {
      number: "03",
      badge: "Equal Protocol Rules",
      title: "Fair Competition Without Platform Monopoly",
      description: "Computing power is no longer controlled by a single platform; the protocol is the rule, and all participants compete fairly within the same system.",
      icon: Scale,
      delay: 0.3,
    },
    {
      number: "04",
      badge: "Real Cash Flow",
      title: "Continuous Real Computing Power Output",
      description: "Users no longer rely on market speculation, but continuously obtain cash flow from real computing power output.",
      icon: Coins,
      delay: 0.4,
    },
  ];

  return (
    <section id="carypact-protocol" className="py-16 sm:py-24 relative overflow-hidden bg-[#0A0C16] border-t border-[#1C233B]">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[300px] bg-[#7B4FFF]/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[250px] bg-[#22D3FF]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Ecosystem Relationship Bridge Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14 rounded-2xl bg-[#0D1122] border border-[#222B48] p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-[#94A3B8] shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#182038] border border-[#2B3860] flex items-center justify-center text-[#22D3FF] shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span className="text-white font-semibold">BOT Chain Ecosystem Architecture:</span>{" "}
              <span>CaryPact is one of the premier benchmark protocols running in the BOT Chain ecosystem.</span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2.5 py-1 rounded-full bg-[#181D33] border border-[#2B355A] font-mono text-[11px] text-[#A5B4FC]">
              Layer 1: BOT Chain
            </span>
            <span className="text-[#525E7A]">➔</span>
            <span className="px-2.5 py-1 rounded-full bg-[#7B4FFF]/20 border border-[#7B4FFF]/40 font-mono text-[11px] text-[#22D3FF] font-semibold">
              Benchmark Protocol: CaryPact
            </span>
          </div>
        </motion.div>

        {/* Section Header: What is CaryPact? */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#13182E] border border-[#283256] text-xs font-semibold text-[#A855F7] mb-4 shadow-sm"
          >
            <CaryPactLogo size="sm" showBadge={false} />
            <span className="text-[#556282]">•</span>
            <span>The First Benchmark Protocol on BOT Chain</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
          >
            What is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B4FFF] via-[#A855F7] to-[#22D3FF]">CaryPact?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg sm:text-2xl font-bold text-[#22D3FF] mb-4"
          >
            The first benchmark protocol running on BOT Chain
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed"
          >
            CaryPact integrates the value of BOT Chain, allowing global users to participate in the construction and earnings of BOT Chain through the protocol, achieving value growth.
          </motion.p>
        </div>

        {/* Action Bar for CaryPact */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <a
            href={AFFILIATE_CONFIG.APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            id="carypact-official-app-btn"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#7B4FFF] to-[#6335E5] hover:from-[#6D3DF5] hover:to-[#5527D6] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#7B4FFF]/25 cursor-pointer"
          >
            <Zap className="w-4 h-4 text-[#22D3FF]" />
            <span>Launch CaryPact DApp (app.carypact.com)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <a
            href="#live"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#13182C] hover:bg-[#1C233E] text-[#CBD5E1] hover:text-white font-semibold text-xs border border-[#263152] transition-colors cursor-pointer"
          >
            <span>Live CA / BOT Calculator & Simulator</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#22D3FF]" />
          </a>
        </motion.div>

        {/* Why Choose CaryPact? Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-[#22D3FF] mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Protocol Philosophy</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Why Choose CaryPact?
          </h3>
          <p className="text-xs sm:text-sm text-[#8EA2C6] mt-2">
            Built on non-speculative compute mechanics, mathematical fair distribution, and sustainable long-term value alignment.
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {pillars.map((pillar) => (
            <WhyChooseCard
              key={pillar.number}
              number={pillar.number}
              badge={pillar.badge}
              title={pillar.title}
              description={pillar.description}
              icon={pillar.icon}
              delay={pillar.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
