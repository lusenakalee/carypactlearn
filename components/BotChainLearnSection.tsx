"use client";

import React from "react";
import { motion } from "motion/react";
import { 
  Cpu, 
  Code2, 
  Zap, 
  Layers, 
  Bot, 
  ExternalLink, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  Server,
  Network
} from "lucide-react";

interface RevealCardProps {
  number: string;
  title: string;
  description: string;
  tag: string;
  icon: React.ElementType;
  delay: number;
}

function RevealCard({ number, title, description, tag, icon: Icon, delay }: RevealCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl bg-gradient-to-b from-[#101426] to-[#0A0D1B] border border-[#1E2540] hover:border-[#22D3FF]/50 p-6 sm:p-7 shadow-xl shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#22D3FF]/10 flex flex-col justify-between"
    >
      {/* Subtle top neon gradient line on hover */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#22D3FF]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        {/* Card Header: Monospaced Number + Icon */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#22D3FF] to-[#7B4FFF]">
              {number}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#161D33] border border-[#232D4E] text-[#8EA2C6]">
              {tag}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#141A2F] border border-[#232D4E] flex items-center justify-center text-[#22D3FF] group-hover:bg-[#22D3FF]/15 group-hover:border-[#22D3FF]/40 group-hover:scale-105 transition-all">
            <Icon className="w-5 h-5" />
          </div>
        </div>

        {/* Card Content */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2.5 tracking-tight group-hover:text-[#22D3FF] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-[#8EA2C6] leading-relaxed">
          {description}
        </p>
      </div>

      {/* Decorative footer indicator */}
      <div className="mt-6 pt-4 border-t border-[#192138] flex items-center justify-between text-xs text-[#5D6F93] font-mono">
        <span>BOT Chain Spec</span>
        <span className="text-[#22D3FF] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-sans font-semibold">
          <span>Active Standard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.div>
  );
}

export default function BotChainLearnSection() {
  const cards = [
    {
      number: "01",
      title: "EVM-Compatible Execution",
      description: "Build and deploy Solidity smart contracts with familiar Ethereum development tools and workflows.",
      tag: "EVM & Solidity",
      icon: Code2,
      delay: 0.1,
    },
    {
      number: "02",
      title: "Fast, Predictable Settlement",
      description: "Support frequent on-chain interactions with a network designed for low-latency execution and efficient transaction processing.",
      tag: "High-Frequency",
      icon: Zap,
      delay: 0.2,
    },
    {
      number: "03",
      title: "Dual-Driven Network",
      description: "Combine staking-based network security with DePIN participation to connect on-chain activity with physical compute infrastructure.",
      tag: "Staking + DePIN",
      icon: Layers,
      delay: 0.3,
    },
    {
      number: "04",
      title: "Infrastructure for AI Agents",
      description: "Give AI-agent applications a verifiable foundation for contract execution, payments, coordination and auditable on-chain outcomes.",
      tag: "AI Coordination",
      icon: Bot,
      delay: 0.4,
    },
  ];

  return (
    <section id="botchain-learn" className="py-16 sm:py-24 relative overflow-hidden bg-[#070913] border-t border-[#1C233B]">
      {/* Background Cyber Grid & Radiant Blurs */}
      <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#22D3FF]/10 via-[#7B4FFF]/10 to-transparent blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11162A] border border-[#232D4E] text-xs font-semibold text-[#22D3FF] mb-4 shadow-sm"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Official BOT Chain Architecture & Documentation</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5"
          >
            What Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3FF] via-[#7B4FFF] to-[#A855F7]">BOT Chain?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base sm:text-xl text-[#CBD5E1] font-medium leading-relaxed"
          >
            BOT Chain is an <span className="text-white font-semibold">AI-native, EVM-compatible Layer 1 blockchain</span> built for high-frequency applications, decentralized compute and verifiable on-chain settlement.
          </motion.p>
        </div>

        {/* Feature Highlight Banner: An AI-Native Layer 1 Blockchain */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 rounded-3xl bg-gradient-to-r from-[#0F1426] via-[#141830] to-[#0F1426] border border-[#222B4A] p-6 sm:p-9 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#7B4FFF]/15 blur-3xl rounded-full pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#A855F7]">
                <Sparkles className="w-4 h-4 text-[#22D3FF]" />
                <span>Next-Gen Web3 Infrastructure</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                An AI-Native Layer 1 Blockchain
              </h3>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Developers can build with familiar EVM tooling while connecting AI agents, compute resources and digital assets to a shared blockchain network.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
              <a
                href="https://www.botchain.ai/en/learn/"
                target="_blank"
                rel="noopener noreferrer"
                id="botchain-learn-official-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#22D3FF] hover:bg-[#1bb8df] text-[#070913] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#22D3FF]/20 cursor-pointer"
              >
                <span>Explore BOT Chain Learn</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.botchain.ai/"
                target="_blank"
                rel="noopener noreferrer"
                id="botchain-portal-btn"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#171D33] hover:bg-[#1E2642] text-white font-medium text-xs border border-[#283556] transition-colors cursor-pointer"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#8EA2C6]" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Reveal Cards Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Infrastructure Designed for Intelligent On-Chain Applications
          </h3>
          <p className="text-xs sm:text-sm text-[#8EA2C6] mt-2">
            Built from the ground up for verifiable autonomous agents, low-latency micro-settlements, and physical decentralized computing networks.
          </p>
        </div>

        {/* 4 Reveal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {cards.map((card) => (
            <RevealCard
              key={card.number}
              number={card.number}
              title={card.title}
              description={card.description}
              tag={card.tag}
              icon={card.icon}
              delay={card.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
