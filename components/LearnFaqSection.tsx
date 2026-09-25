"use client";

import { AFFILIATE_CONFIG } from "@/config/constants";
import {
    Bot,
    Building2,
    Check,
    CheckCircle2,
    ChevronDown,
    Coins,
    Copy,
    Cpu,
    ExternalLink,
    Globe2,
    HelpCircle,
    Layers,
    Search,
    ShieldCheck,
    Sparkles,
    TrendingUp
} from "lucide-react";
import React, { useMemo, useState } from "react";

export interface FaqItem {
  id: string;
  category: "tokenomics" | "ecosystem" | "mining" | "vip" | "security" | "global";
  categoryLabel: string;
  question: string;
  seoKeywords: string[];
  geoTags?: string[];
  summary: string;
  answerParagraphs: string[];
}

export const FAQ_DATA: FaqItem[] = [
  // Category 1: Tokenomics & Inflation Control
  {
    id: "inflation-elimination",
    category: "tokenomics",
    categoryLabel: "Tokenomics & Inflation",
    question: "How is asset inflation accumulated in staked POS assets eliminated?",
    seoKeywords: ["Staking Inflation Elimination", "CA Tokenomics", "B Wallet & M Wallet Inflow", "Z Address Burn", "BOT Treasury Reserve"],
    geoTags: ["Global Decentralized Protocol"],
    summary: "Through strict 4-inflow/1-outflow wallet mechanics, 10% daily buyback & burn from Z Address, 90% treasury allocation, and the 'Pond vs. Sea' macro absorption capacity of the BOT public chain.",
    answerParagraphs: [
      "1. Wallet Flow Architecture (B & M Wallets): The core solution lies in our strategic CA flow-of-funds engineering. The key on-chain addresses to monitor are the 'B' Wallet (Staking Rewards Pool) and 'M' Wallet (Staking Pool). Both wallets maintain 4 continuous inflows against only 1 outflow of CA tokens. Because inflows mathematically exceed outflows, the protocol guarantees adequate reserves even during massive unstaking periods and daily POS yield releases.",
      "2. Z-Address Buyback & Burn Engine: 10% of all incoming capital to the Z Address is immediately deployed to buy back CA tokens on open decentralized markets and burn them permanently. The remaining 90% is deposited into the protocol BOT treasury. This structural deflation steadily reduces total circulating supply, naturally supporting healthy price appreciation as POS participation scales.",
      "3. Macro 'Pond vs. Sea' Absorption: The CA ecosystem acts as a specialized application pond, whereas the BOT Public Chain is the vast open sea. As thousands of upcoming dApps deploy on BOT Chain, capital depth and gas fee burns easily dissolve or channel out localized liquidity imbalances."
    ]
  },
  {
    id: "candlestick-stability",
    category: "tokenomics",
    categoryLabel: "Tokenomics & Inflation",
    question: "Why do CA and WBOT show high daily trading volume yet steady prices without extreme pump-and-dump spikes?",
    seoKeywords: ["Candlestick Stability", "Algorithmic Treasury Buyback", "Sustainable Growth", "CEX Listing Roadmap"],
    geoTags: ["Global Liquidity"],
    summary: "The price stability is intentionally engineered for institutional longevity via algorithmic treasury interventions, consistent secondary market demand, and real on-chain utility over speculative manipulation.",
    answerParagraphs: [
      "1. Longevity Engineering: The protocol is deliberately structured for steady, organic expansion rather than artificial speculative spikes that harm long-term participants.",
      "2. BOT Token Gas Value: BOT Chain is in its foundational expansion phase. As new ecosystem dApps launch, transaction volume generates growing gas fees (1.50% burned permanently). Planned listings across 10–20 premier centralized exchanges (CEXs) will further expand institutional liquidity.",
      "3. CA Treasury Safeguards: CA tokenomics channels capital into dedicated protocol treasuries. If market prices dip excessively, treasury reserves kick in algorithmically to buy back CA tokens. Furthermore, increasing demand from secondary markets continuously stimulates organic price appreciation."
    ]
  },
  {
    id: "wbot-holders-price-growth",
    category: "tokenomics",
    categoryLabel: "Tokenomics & Inflation",
    question: "With WBOT wallet holders exceeding 900,000, why has the price grown steadily from $9.5 to $9.9 rather than surging to $20+ overnight?",
    seoKeywords: ["900,000+ Wallets", "WBOT Price Scaling", "Incubating 100+ Projects", "Physical DePIN Rigs"],
    geoTags: ["Global Consensus"],
    summary: "BOT has experienced steady, healthy appreciation from $9.50 to ~$9.90+. Value realization will compound as 100+ incubated dApps deploy, physical mining rigs go live, and centralized exchange listings roll out.",
    answerParagraphs: [
      "1. Systematic Early-Stage Growth: BOT has appreciated consistently from $9.50 to ~$9.90+. Because BOT Chain is in its introductory phase with CaryPact as its pioneer flagship protocol, price discovery reflects verified foundational adoption rather than speculative bubbles.",
      "2. Upcoming Catalysts: The foundation is actively in discussions with over 100+ independent projects preparing to incubate and deploy on BOT Chain. Concurrently, physical AI mining rigs are currently in commercial production, allowing operators to build high-capacity mining farms.",
      "3. Exchange Expansion: Broad centralized exchange (CEX) listings scheduled for Q3/Q4 will unlock global retail and institutional order books, fueling the next wave of sustainable network valuation."
    ]
  },
  {
    id: "why-invest-differentiation",
    category: "tokenomics",
    categoryLabel: "Tokenomics & Inflation",
    question: "Why should someone consider participating in CaryPact and BOT Chain over other Web3 projects?",
    seoKeywords: ["Portfolio Diversification", "Due Diligence (DYOR)", "DePIN AI Architecture", "Autonomous Layer 1"],
    geoTags: ["Global Web3 Community"],
    summary: "We advocate disciplined diversification and due diligence (DYOR). BOT Chain pairs an autonomous Layer 1 with deflationary tokenomics, decentralized supercomputing, and a transparent roadmap.",
    answerParagraphs: [
      "1. Prudent Diversification & DYOR: We always advocate doing your own due diligence and never investing capital you cannot afford to risk. BOT Chain is built as a premier diversification asset for crypto portfolios.",
      "2. True Layer 1 Infrastructure: Unlike application-only tokens on congested networks, BOT Chain is an independent EVM Layer 1 with 3-second block times, negligible gas fees, and a permanent 1.50% native gas burn.",
      "3. Open Dialogue: We welcome technical comparisons of architectural philosophies, flow-of-funds structures, and deflationary economics to help builders and participants make well-informed decisions."
    ]
  },

  // Category 2: BOT Public Chain & Ecosystem
  {
    id: "bot-price-project-owners",
    category: "ecosystem",
    categoryLabel: "BOT Chain & Ecosystem",
    question: "Is the ~$9.90 / BOT price too high for project owners and developers to build on BOT Chain?",
    seoKeywords: ["Developer Grant", "$50M Support Fund", "30% Gas Rebate", "Project Onboarding", "Builder Traffic"],
    geoTags: ["Singapore HQ", "Global Developer Network"],
    summary: "No. The BOT Chain Foundation subsidizes incoming developers with user traffic, a $50 Million USD builder grant, and an ongoing 30% gas fee rebate revenue stream.",
    answerParagraphs: [
      "1. Robust Developer Subsidies: High token valuation reflects strong network security and validator commitment. To lower friction for builders, the BOT Chain Foundation provides incoming project teams with direct traffic and an active community of 200,000+ users.",
      "2. $50M Support Grant: A dedicated $50 Million USD Ecosystem Fund awards infrastructure and liquidity grants to qualified teams deploying on BOT Chain.",
      "3. 30% Gas Rebate Revenue Stream: Project owners receive an ongoing 30% rebate on all gas fees generated by their smart contracts, creating an immediate, recurring monetization layer prior to liquidity pool establishment."
    ]
  },
  {
    id: "bot-ecosystem-roadmap",
    category: "ecosystem",
    categoryLabel: "BOT Chain & Ecosystem",
    question: "How is the BOT public chain ecosystem projected to develop over the next 1–3 years?",
    seoKeywords: ["10,000 DApps Roadmap", "1-Click Protocol", "Rapid Deployment (30 Mins)", "10-20 CEX Listings"],
    geoTags: ["Global Node Network", "Asia-Pacific", "Middle East"],
    summary: "Over 900,000 addresses in 2 months; scaling to 2,000 projects this year and 10,000+ in 3 years via the 30-minute '1-Click Protocol', backed by the $50M fund and 10–20 CEX listings.",
    answerParagraphs: [
      "1. Explosive Address Growth: BOT Chain accumulated over 900,000 wallet addresses within approximately two months of mainnet launch.",
      "2. 200+ Projects in Pipeline: Discussions are underway with more than 200 projects. The target is 2,000 projects by year-end and 10,000+ within 3 years, accelerated by our '1-Click Protocol' that allows developers to launch a complete dApp within 30 minutes.",
      "3. CaryPact Pioneer Synergy: CaryPact’s viral growth as the benchmark protocol demonstrates proof-of-throughput, attracting external EVM developers to bridge or port codebases.",
      "4. Liquidity & CEX Listings: Expansion includes listings on 10–20 top-tier centralized exchanges, multiplying secondary liquidity and global brand visibility."
    ]
  },
  {
    id: "bohr-to-bot-rebrand",
    category: "ecosystem",
    categoryLabel: "BOT Chain & Ecosystem",
    question: "BOT Chain was previously named BOHR. What was the rationale behind the strategic rebrand?",
    seoKeywords: ["BOHR to BOT Rebrand", "Niels Bohr Heritage", "AI Operating System", "Intelligent Agent Execution"],
    geoTags: ["Global Rebrand"],
    summary: "Transitioned from theoretical physics exploration (inspired by Niels Bohr) to an intelligent execution network and on-chain operating system for AI agents and DePIN workloads.",
    answerParagraphs: [
      "1. Theoretical Phase (BOHR): The original moniker BOHR honored physicist Niels Bohr, embodying foundational scientific exploration, cryptographic validation, and consensus physics during early network architecture testing.",
      "2. Narrative Evolution to BOT: As the public chain evolved from technical validation to a multi-party commercial ecosystem, 'BOT' was selected to communicate intelligent execution, automated agent coordination, and modular AI infrastructure.",
      "3. Intelligent Operating System: BOT precisely conveys the network's mission as the decentralized digital operating system powering autonomous Web3 agents, distributed machine learning, and cross-border computing resource scheduling."
    ]
  },
  {
    id: "verify-150m-bot-supply",
    category: "ecosystem",
    categoryLabel: "BOT Chain & Ecosystem",
    question: "How can participants verify the total fixed supply of 150 Million BOT tokens?",
    seoKeywords: ["150M BOT Supply", "WBOT Address Verification", "Block Explorer (scan.botchain.ai)", "Cryptographic Proof"],
    geoTags: ["On-Chain Transparency"],
    summary: "Verify transparently on-chain via the WBOT genesis contract address on scan.botchain.ai, and cross-reference with official whitepapers and exchange tracking pages.",
    answerParagraphs: [
      "1. Immutable On-Chain Ledger: The 150 Million BOT genesis allocation is publicly auditable on the BOT Chain Block Explorer (https://scan.botchain.ai) under the WBOT contract address.",
      "2. Institutional Exchange Reconciliation: As upcoming centralized exchange listings finalize, total and circulating supply metrics are verified and displayed transparently on CoinMarketCap and CoinGecko."
    ]
  },

  // Category 3: DePIN Hardware & Mining
  {
    id: "mining-machine-pricing",
    category: "mining",
    categoryLabel: "Mining & DePIN Hardware",
    question: "Presentations listed the AI mining machine price as $3,960, but community calls mentioned $3,600. What is the official cost?",
    seoKeywords: ["AI Mining Machine Price", "DePIN Rig Presale", "Official Price Notice", "Hardware Batches"],
    geoTags: ["Global Hardware Delivery"],
    summary: "Early figures were preliminary estimates; all official hardware pricing, batch specs, and delivery schedules will be formally announced through official community channels prior to commercial shipment.",
    answerParagraphs: [
      "1. Preliminary Phase Notice: Figures shared in preliminary seminars ($3,600 – $3,960 USD) represented internal engineering estimates subject to supply chain component pricing.",
      "2. Official Announcements: Binding commercial pricing, batch quantities, and international logistics details will be released exclusively through official verified channels (t.me/CaryPactOfficial and x.com/CaryPact_BOT)."
    ]
  },
  {
    id: "mining-machine-manufacturer",
    category: "mining",
    categoryLabel: "Mining & DePIN Hardware",
    question: "Which manufacturing partner is producing the physical BOT AI mining machines, and why is the name protected?",
    seoKeywords: ["Hardware Manufacturer", "Tier-1 Fab NDA", "DePIN Supply Chain", "Confidentiality Agreement"],
    geoTags: ["Global Manufacturing Consortium"],
    summary: "Hardware production is contracted with a tier-1 manufacturing partner under strict mutual non-disclosure agreements (NDAs) to protect proprietary chip supply lines until official rollout.",
    answerParagraphs: [
      "1. Strict Commercial NDAs: The manufacturing consortium operates under strict non-disclosure covenants to secure specialized chip allocation, prevent intellectual property infringement, and shield component supply chains.",
      "2. Official Disclosure: The fabrication partners and colocation certifications will be formally unveiled alongside commercial rig shipments."
    ]
  },
  {
    id: "tier-1-mining-operators",
    category: "mining",
    categoryLabel: "Mining & DePIN Hardware",
    question: "Which institutional mining operators are currently deploying BOT mining infrastructure?",
    seoKeywords: ["Institutional Mining Consortia", "Industrial Colocation", "Validation Infrastructure"],
    geoTags: ["Thailand Mining Facilities", "Mongolia Data Centers"],
    summary: "Top-tier industrial mining operators with active facilities in Thailand and Mongolia are deploying hardware, with specific enterprise identities protected under NDA until joint announcement.",
    answerParagraphs: [
      "1. Regional Data Center Deployments: Major institutional operators in Thailand and Mongolia have initiated facility preparation and power allocations to support BOT mining clusters.",
      "2. Enterprise NDAs: Joint public press releases will announce enterprise operator identities as grid connectivity milestones are reached."
    ]
  },
  {
    id: "carypact-compute-vs-bot-rigs",
    category: "mining",
    categoryLabel: "Mining & DePIN Hardware",
    question: "Who is currently using CaryPact computing power, and what is the difference between CA hashrate and physical BOT mining rigs?",
    seoKeywords: ["CA Hashrate vs BOT Mining Rigs", "16,800 CA Pool", "Enterprise AI Inference", "Tokenized Compute"],
    geoTags: ["Global Compute Grid"],
    summary: "CA hashrate is a standardized protocol accounting unit that distributes the 16,800 CA daily pool. Physical BOT mining rigs are tangible hardware machines that will sell real compute to external AI developers.",
    answerParagraphs: [
      "1. CA Computing Power (Internal Yield): Purchasing CA hashrate (1 USDT = 1 Unit) entitles the holder to a permanent mathematical share of the 16,800 CA daily emission pool. It serves as an internal reward distribution mechanism.",
      "2. Physical BOT Mining Rigs (External Commercial AI): Physical BOT mining machines currently in production represent physical hardware. In the future, operators can establish decentralized mining farms to deliver real GPU/CPU computing capacity to external enterprise AI clients for model training and inference fees."
    ]
  },
  {
    id: "hashrate-supply-servers",
    category: "mining",
    categoryLabel: "Mining & DePIN Hardware",
    question: "Who provides the hashrate, and where are the physical servers located?",
    seoKeywords: ["Hashrate Allocation Model", "Protocol Supercomputing", "Decentralized Nodes"],
    geoTags: ["Global Tier-3/4 Data Centers"],
    summary: "Purchasing hashrate activates an on-chain quota that determines your proportional share of daily CA token emissions, backed by global decentralized compute infrastructure.",
    answerParagraphs: [
      "1. Clarifying Hashrate Allocation: In the CaryPact protocol, acquiring hashrate does not mean renting a single dedicated server box. You are activating standardized computing power units on-chain.",
      "2. Proportional Distribution: Your active hashrate relative to total global network hashrate determines your exact daily share of the 16,800 CA mining emission pool, compounded by duration coefficient K ≈ 1.01."
    ]
  },

  // Category 4: VIP System & Compensation
  {
    id: "v4-earnings-differential",
    category: "vip",
    categoryLabel: "VIP Rewards & Compounding",
    question: "I reached V4 rank. Why did my daily earnings adjust, and how does the differential income model work?",
    seoKeywords: ["V4 Rank Income", "Team Reward", "Management Reward (7,000 CA)", "POS Dynamic Reward (6%-30%)", "Differential Payout"],
    geoTags: ["Global Ambassador Network"],
    summary: "V4 leaders earn from 3 streams: Team Rewards (proportional to sub-network hashrate vs. global growth), Management Rewards (shared 7,000 CA pool), and POS Dynamic Differential (6%–30%).",
    answerParagraphs: [
      "1. Team Reward Dynamics: Team income is calculated as: Your Sub-network Hashrate ÷ Global Sub-network Hashrate. To increase daily CA earnings, your team's computing power activation must outpace the growth rate of the global network.",
      "2. Management Pool Weighting: V4 members receive higher weighted multipliers from the fixed 7,000 CA daily emission pool. As more leaders climb into V4–V10 ranks, the pool is distributed among more qualifying leaders (pool decreases 10% every 2 years).",
      "3. POS Differential Payout (6% to 30%): POS dynamic rewards pay out based on rank differential. The higher your VIP rank relative to your direct downlines, the higher the differential percentage you capture.",
      "4. Compounding Advantage: All rewards are settled in liquid CA tokens. Leaders can stake rewards into POS to compound wealth while CA value steadily appreciates."
    ]
  },
  {
    id: "same-rank-bonus-distribution",
    category: "vip",
    categoryLabel: "VIP Rewards & Compounding",
    question: "If a downline member reaches the same or higher rank than me, how is bonus distribution handled?",
    seoKeywords: ["Equal Rank Sharing", "Higher Rank Downline", "Pool Sharing Eligibility", "POS Override"],
    geoTags: ["Community Leadership"],
    summary: "You continue earning from your eligible rank tiers (e.g. V5 earns from V1–V5 pools). If a team member equals your rank, they share the tier pool; POS dynamic differential pauses until you surpass their rank.",
    answerParagraphs: [
      "1. Tier Pool Rights: You earn from all pools up to your current achievement level (e.g., a V5 earns from V1 through V5 pools). A team member reaching your rank simply shares in those pools alongside you.",
      "2. Differential Staking Break: For POS staking dynamic rewards, compensation relies on rank differential. If a downline matches your rank, the differential margin becomes zero for that specific branch until you advance to the next rank tier."
    ]
  },
  {
    id: "time-compensation-mechanism",
    category: "vip",
    categoryLabel: "VIP Rewards & Compounding",
    question: "Why are participants who upgrade to higher VIP ranks later not at a disadvantage?",
    seoKeywords: ["Time Compensation Mechanism", "Fairness Algorithm", "Late Joiner Equity", "Sustainable Network Building"],
    geoTags: ["Global Builder Community"],
    summary: "CaryPact's 'Time Compensation Mechanism' awards late-upgrading users higher weight compensation, mathematically preventing first-mover entrenchment and ensuring fair incentives.",
    answerParagraphs: [
      "1. Algorithmic Equity: Unlike legacy multi-level structures where early entrants permanently dilute late arrivals, CaryPact incorporates a programmatic Time Compensation Mechanism.",
      "2. Dynamic Weight Boost: Builders who achieve VIP ranks in later phases receive enhanced weight multipliers, equalizing yield opportunities and sustaining viral motivation across all phases of network maturity."
    ]
  },
  {
    id: "dynamic-weight-v1-v10",
    category: "vip",
    categoryLabel: "VIP Rewards & Compounding",
    question: "How does the dynamic weight formula change from V1 through V10?",
    seoKeywords: ["Personal Weight Formula", "V1 to V10 Multipliers", "Base Level Weight", "Time Bonus Scaling (1 to 383)"],
    geoTags: ["Ecosystem Governance"],
    summary: "Personal Weight = Base Level Weight × Time Bonus. The combined weight scales smoothly from 1 at V1 up to approximately ~383 at V10, rewarding long-term ecosystem leadership.",
    answerParagraphs: [
      "1. Mathematical Weight Equation: Personal Weight = Base Level Weight × Time Bonus.",
      "2. Multiplier Progression: At V1, the baseline weight begins at 1. Through progressive sub-network thresholds, the combined multiplier scales up to ~383 at V10, maximizing daily DAO dividend capture for top consensus partners."
    ]
  },

  // Category 5: Security & Wallets
  {
    id: "wallet-hacked-recovery",
    category: "security",
    categoryLabel: "Security & Wallets",
    question: "What happens if a wallet is compromised, and can a CaryPact account structure be reconnected to a new wallet?",
    seoKeywords: ["12-Word Seed Phrase", "Non-Custodial Security", "Account Relinking Ticket", "Anti-Phishing"],
    geoTags: ["Self-Custody Web3"],
    summary: "Web3 wallets are strictly non-custodial; stolen on-chain funds cannot be reversed. To preserve your CaryPact affiliate position, generate a secure new wallet and submit a backend support ticket.",
    answerParagraphs: [
      "1. Non-Custodial Ownership: Blockchains enforce absolute user self-custody. Neither CaryPact nor wallet developers have custody of private keys or seed phrases. Once compromised, on-chain assets cannot be recalled.",
      "2. 12-Word Seed Phrase Safeguard: Always write down your 12-word mnemonic phrase offline on physical paper. Never store seed phrases in cloud drives, screenshots, or chat apps.",
      "3. Account Structure Relinking: If your address is compromised, immediately generate a fresh wallet with a new seed phrase on a clean device. Then, contact CaryPact official backend support to verify identity and re-point your account tree to the new address."
    ]
  },
  {
    id: "bo-wallet-vs-tokenpocket",
    category: "security",
    categoryLabel: "Security & Wallets",
    question: "Why use TokenPocket, MetaMask, or Trust Wallet when there is a native BO Wallet?",
    seoKeywords: ["BO Wallet", "TokenPocket Support", "MetaMask Integration", "EVM Compatibility (Chain ID 1918)"],
    geoTags: ["Global Web3 Wallets"],
    summary: "BO Wallet is the purpose-built ecosystem client currently being enhanced. We maintain complete compatibility with TokenPocket, MetaMask, and Trust Wallet to ensure global user choice.",
    answerParagraphs: [
      "1. Ongoing BO Wallet Optimization: BO Wallet is tailored specifically for BOT Chain features. It is undergoing continuous optimization before global consumer marketing campaigns commence.",
      "2. Open Web3 Freedom: BOT Chain is fully EVM-compatible (Chain ID 1918). Users enjoy unrestricted flexibility to use trusted wallets like TokenPocket, Trust Wallet, or MetaMask according to their personal workflow."
    ]
  },

  // Category 6: Global Operations & Legal
  {
    id: "headquarters-global-offices",
    category: "global",
    categoryLabel: "Global Operations & Legal",
    question: "Where are the primary headquarters and global regional offices of CaryPact and CoinStore located?",
    seoKeywords: ["Singapore Operations Base", "Hong Kong 7,000 sq ft Hub", "Dubai UAE Office", "Thailand Regional Office", "Brazil Expansion"],
    geoTags: ["Singapore (Global HQ)", "Hong Kong (Consensus Hub)", "Dubai, UAE (Web3 Center)", "Bangkok, Thailand", "São Paulo, Brazil"],
    summary: "Main operations for CaryPact and CoinStore are anchored in Singapore. Active regional operations in Thailand; two flagship 7,000 sq ft regional hubs opening in Hong Kong and Dubai (Q2/Q3 2026); Brazil expansion planned.",
    answerParagraphs: [
      "1. Singapore Central Hub: Both CaryPact and strategic partner CoinStore operate central operational and technological headquarters in Singapore.",
      "2. Active Thailand Center: Regional operations and developer outreach are actively functioning in Thailand.",
      "3. Hong Kong & Dubai Flagship Hubs: Expanding with two expansive ~7,000 square foot regional offices in Hong Kong and Dubai, opening around June/July 2026 to support Middle Eastern and East Asian institutional partners.",
      "4. Latin America (Brazil): Preparations are underway to establish a Latin American regional operations center in Brazil to accommodate fast-growing South American community adoption."
    ]
  },
  {
    id: "why-not-registered-company",
    category: "global",
    categoryLabel: "Global Operations & Legal",
    question: "Why has CaryPact not registered as a traditional centralized corporate company?",
    seoKeywords: ["Protocol-First Architecture", "DeFi Decentralization", "Censorship Resistance", "Smart Contract Governance"],
    geoTags: ["Global Autonomous Protocol"],
    summary: "CaryPact is architected as an autonomous DeFi protocol—not a corporate entity. Protocol-first smart contracts guarantee censorship resistance, transparency, and community-driven governance.",
    answerParagraphs: [
      "1. Protocol-First Decentralization: CaryPact operates as an autonomous DeFi protocol executed entirely on blockchain infrastructure. Governance, daily rewards, and compute scheduling are coordinated transparently on-chain.",
      "2. Avoiding Centralized Jurisdiction Risk: Traditional corporate incorporation creates single points of failure, bureaucratic bottlenecks, and jurisdictional liabilities that conflict with the core Web3 tenets of decentralization, censorship resistance, and permissionless access.",
      "3. Global Developer Collective: Aligning with premier decentralized networks (like Ethereum and Bitcoin), CaryPact evolves through open collaboration among an international network of developers, node operators, and participants."
    ]
  },
  {
    id: "cmc-coingecko-volume-changes",
    category: "global",
    categoryLabel: "Global Operations & Legal",
    question: "Why did trading volume displayed on CoinMarketCap/CoinGecko adjust from billions to hundreds of millions?",
    seoKeywords: ["CoinMarketCap Volume Sync", "CoinGecko API Indexing", "DEX Liquidity Verification", "Real-Time Scan"],
    geoTags: ["Global Data Aggregators"],
    summary: "Aggregators frequently calibrate API filters, wash-trading algorithms, and DEX pair weightings. Authentic on-chain liquidity and transaction throughput remain verifiable 24/7 on scan.botchain.ai.",
    answerParagraphs: [
      "1. Aggregator API Calibrations: Third-party aggregators (CMC, CoinGecko) periodically recalibrate internal indexing filters, deduplicate synthetic DEX pairs, or adjust reported liquidity tiers.",
      "2. True On-Chain Transparency: Rather than relying solely on third-party aggregators, all actual swap transactions, pool depths, and burn events are verifiable on the public BOT Chain explorer (https://scan.botchain.ai)."
    ]
  },
  {
    id: "ca-card-mobile-roadmap",
    category: "global",
    categoryLabel: "Global Operations & Legal",
    question: "What is the release timeline for the CA Crypto Card and CA Web3 Mobile Phone?",
    seoKeywords: ["CA Crypto Card", "CA Smartphone", "Web3 Hardware Utility", "Community Roadmap"],
    geoTags: ["Global Consumer Rollout"],
    summary: "Hardware utilities including crypto debit cards and dedicated Web3 mobile hardware are in technical planning, with formal rollouts timed to key global community expansion milestones.",
    answerParagraphs: [
      "1. Hardware Ecosystem Roadmap: Physical crypto debit cards and integrated Web3 handheld hardware are actively being conceptualized by ecosystem working groups.",
      "2. Milestone-Driven Releases: Official development roadmaps, technical hardware specs, and pre-order registration windows will be formally announced as global user benchmarks are achieved."
    ]
  }
];

export default function LearnFaqSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string | null>("inflation-elimination");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "All Questions", count: FAQ_DATA.length, icon: HelpCircle },
    { id: "tokenomics", label: "Tokenomics & Inflation", count: FAQ_DATA.filter(f => f.category === "tokenomics").length, icon: Coins },
    { id: "ecosystem", label: "BOT Chain Ecosystem", count: FAQ_DATA.filter(f => f.category === "ecosystem").length, icon: Layers },
    { id: "mining", label: "DePIN & Mining Rigs", count: FAQ_DATA.filter(f => f.category === "mining").length, icon: Cpu },
    { id: "vip", label: "VIP & Dynamic Yield", count: FAQ_DATA.filter(f => f.category === "vip").length, icon: TrendingUp },
    { id: "security", label: "Security & Wallets", count: FAQ_DATA.filter(f => f.category === "security").length, icon: ShieldCheck },
    { id: "global", label: "Global Hubs & Legal", count: FAQ_DATA.filter(f => f.category === "global").length, icon: Building2 },
  ];

  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((faq) => {
      if (selectedCategory !== "all" && faq.category !== selectedCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const questionMatch = faq.question.toLowerCase().includes(q);
      const summaryMatch = faq.summary.toLowerCase().includes(q);
      const keywordMatch = faq.seoKeywords.some((k) => k.toLowerCase().includes(q));
      const geoMatch = faq.geoTags?.some((g) => g.toLowerCase().includes(q));
      const answerMatch = faq.answerParagraphs.some((p) => p.toLowerCase().includes(q));

      return questionMatch || summaryMatch || keywordMatch || geoMatch || answerMatch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCopyLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}#faq-${id}`;
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleExpandAll = () => {
    if (expandedId === "all_open") {
      setExpandedId(null);
    } else {
      setExpandedId("all_open");
    }
  };

  // Structured Data (JSON-LD) for SEO Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_DATA.slice(0, 15).map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answerParagraphs.join(" ")
      }
    }))
  };

  return (
    <section id="faq" className="py-16 sm:py-24 relative overflow-hidden bg-[#070914] border-t border-[#1C233B]">
      {/* JSON-LD Structured Data for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Radiant Background Ambient Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#22D3FF]/10 via-[#7B4FFF]/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#11162C] border border-[#232D50] text-xs font-semibold text-[#22D3FF] shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Protocol Intelligence & Master FAQ</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22D3FF] via-[#7B4FFF] to-[#A855F7]">Questions</span>
          </h2>

          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            In-depth technical, economic, hardware, and operational clarity directly addressing token inflation mechanisms, physical mining machine production, global regional offices (Singapore, Hong Kong, Dubai, Thailand), and the V1–V10 dynamic yield algorithms.
          </p>
        </div>

        {/* Search & Action Bar */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {/* Live Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#838E9E]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, e.g. 'inflation', 'Singapore', 'Z Address', 'V4', 'mining machine', 'seed phrase'..."
              id="faq-search-input"
              className="w-full pl-12 pr-24 py-3.5 rounded-2xl bg-[#101322] border border-[#212946] focus:border-[#22D3FF] focus:ring-1 focus:ring-[#22D3FF] text-sm text-white placeholder-[#606E85] outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-[#838E9E] hover:text-white transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  id={`faq-tab-${cat.id}`}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isSelected
                      ? "bg-[#7B4FFF] text-white shadow-md shadow-[#7B4FFF]/25 font-bold"
                      : "bg-[#111528] text-[#94A3B8] hover:text-white border border-[#1E2644]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${isSelected ? 'bg-white/20 text-white' : 'bg-[#182038] text-[#8EA2C6]'}`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Stats & Expand All Control */}
          <div className="flex items-center justify-between text-xs text-[#838E9E] pt-1 px-1">
            <span>
              Showing <strong className="text-white">{filteredFaqs.length}</strong> of {FAQ_DATA.length} verified answers
            </span>
            <button
              onClick={handleExpandAll}
              className="text-[#22D3FF] hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>{expandedId === "all_open" ? "Collapse All" : "Expand All"}</span>
            </button>
          </div>
        </div>

        {/* Modern Accordion List */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-[#0E1222] border border-[#1E2540] rounded-3xl p-8 space-y-3">
              <HelpCircle className="w-10 h-10 text-[#606E85] mx-auto" />
              <h4 className="text-base font-bold text-white">No matching answers found</h4>
              <p className="text-xs text-[#94A3B8]">
                Try adjusting your search terms or select &quot;All Questions&quot; to browse all answers.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                className="mt-2 px-4 py-2 rounded-xl bg-[#171D33] text-xs font-semibold text-[#22D3FF] hover:bg-[#202844] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = expandedId === "all_open" || expandedId === faq.id;

              return (
                <div
                  key={faq.id}
                  id={`faq-${faq.id}`}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen 
                      ? "bg-[#0F1428] border-[#2E3B66] shadow-xl shadow-black/40 ring-1 ring-[#7B4FFF]/30" 
                      : "bg-[#0B0E1E] border-[#1C233C] hover:border-[#2C375D] hover:bg-[#0E1224]"
                  }`}
                >
                  {/* Accordion Trigger Header */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-2 flex-grow">
                      {/* Top Badges: Category & SEO Keywords */}
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#161D36] text-[#22D3FF] border border-[#232F52]">
                          {faq.categoryLabel}
                        </span>

                        {faq.geoTags?.map((geo) => (
                          <span 
                            key={geo}
                            className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          >
                            <Globe2 className="w-2.5 h-2.5" />
                            <span>{geo}</span>
                          </span>
                        ))}
                      </div>

                      {/* Question Headline */}
                      <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#22D3FF] transition-colors">
                        <span className="text-[#8EA2C6] mr-2 font-mono text-sm font-normal">
                          {String(index + 1).padStart(2, "0")}.
                        </span>
                        {faq.question}
                      </h3>

                      {/* Brief Executive Summary (visible when collapsed or expanded) */}
                      {!isOpen && (
                        <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed pt-1">
                          {faq.summary}
                        </p>
                      )}
                    </div>

                    {/* Right Chevron & Copy Button */}
                    <div className="flex items-center gap-1 shrink-0 pt-1">
                      <button
                        onClick={(e) => handleCopyLink(faq.id, e)}
                        title="Copy direct link to this FAQ"
                        className="p-1.5 rounded-lg text-[#606E85] hover:text-white hover:bg-[#161D36] transition-colors"
                      >
                        {copiedId === faq.id ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <div className={`w-8 h-8 rounded-xl bg-[#141A30] border border-[#222B48] flex items-center justify-center text-[#8EA2C6] transition-transform duration-200 ${isOpen ? 'rotate-180 text-white bg-[#7B4FFF]' : ''}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {/* Accordion Expandable Content */}
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#1C243F] space-y-4">
                      {/* SEO Keywords Pills Bar */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-2">
                        <span className="text-[10px] uppercase font-mono font-semibold text-[#606E85] mr-1">
                          Key Topic Anchors:
                        </span>
                        {faq.seoKeywords.map((kw) => (
                          <span
                            key={kw}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#13192F] text-[#CBD5E1] border border-[#222C4E]"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>

                      {/* Answer Paragraphs */}
                      <div className="space-y-3 text-xs sm:text-sm text-[#C4CBD8] leading-relaxed bg-[#0B0E1D] p-4 sm:p-5 rounded-xl border border-[#1A223C]">
                        {faq.answerParagraphs.map((para, pIdx) => (
                          <p key={pIdx} className="leading-relaxed">
                            {para}
                          </p>
                        ))}
                      </div>

                      {/* Bottom Micro Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-[#838E9E]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Verified Protocol Documentation</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <a
                            href={AFFILIATE_CONFIG.TELEGRAM_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#22D3FF] hover:underline flex items-center gap-1"
                          >
                            <span>Discuss in Community</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Global Support Callout Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-[#10152B] via-[#151C3A] to-[#10152B] border border-[#242F54] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl max-w-4xl mx-auto">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Bot className="w-5 h-5 text-[#22D3FF]" />
              <span>Have a question not listed here?</span>
            </h4>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl">
              Connect directly with our 24/7 global community managers in Singapore, Thailand, Hong Kong, and Dubai, or query the CaryPact AI Copilot in real time.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={AFFILIATE_CONFIG.TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#22D3FF] hover:bg-[#1bb8df] text-[#070913] text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-[#22D3FF]/20"
            >
              <span>Join Community Support</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
