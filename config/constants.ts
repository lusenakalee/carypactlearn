// CaryPact Learning Hub - Ecosystem Configuration & Ground Truth Data

export const AFFILIATE_CONFIG = {
  INVITE_CODE: "1AjyRv",
  SUFFIX: "C82A37",
  APP_URL: "https://app.carypact.com/?inviteCode=1AjyRv&suffix=C82A37",
  OFFICIAL_APP: "https://app.carypact.com/",
  BOT_CHAIN_LEARN: "https://www.botchain.ai/en/learn",
  TELEGRAM_URL: "https://t.me/CaryPactOfficial",
  TWITTER_URL: "https://x.com/CaryPact_BOT",
  DISCORD_URL: "https://discord.gg/carypact",
  DISCLOSURE_TEXT: "Independent educational resource. We may receive referral commissions if you register through links on this site. Crypto assets carry substantial financial risk.",
};

export const ECOSYSTEM_METRICS = {
  CA_BASE_PRICE: 2.7415,
  BOT_BASE_PRICE: 1.1109,
  CA_TO_BOT_RATIO: 2.46784,
  BOT_TO_CA_RATIO: 0.405213,
  TOTAL_CA_SUPPLY: 210000000, // 210 Million
  DAILY_CA_EMISSION: 40000,
  EMISSION_HALVING_CYCLE_YEARS: 2,
  EMISSION_REDUCTION_RATE: 0.10, // 10% every 2 years
  TOTAL_EMISSION_YEARS: 22,
  MINIMUM_HASHRATE_USDT: 100, // 1 USDT = 1 Hashrate Unit
  SLIPPAGE_FEE_PERCENT: 5.0, // 5% total (1.8% buyback & burn, 3.2% node operators)
  BUYBACK_PERCENT: 1.8,
  NODE_OPERATOR_PERCENT: 3.2,
  BOT_GAS_BURN_PERCENT: 1.50,
  CA_TX_BUYBACK_BURN: 1.10,
  SEED_FUNDING_USD: 15000000, // $15M Seed
  STRATEGIC_EXPANSION_USD: 50000000, // $50M Strategic
  GLOBAL_USERS: "350,000+",
  COUNTRIES_ACTIVE: "55+",
  OFFICE_NETWORK: "1,500+", // 1,300 studios + 200 operation centers
  EXCHANGES: ["OKX", "Bybit", "KuCoin", "MEXC", "Bitget"],
};

export const EMISSION_SPLIT = [
  { name: "Computing Power Mining", percent: 42, dailyCA: 16800, color: "#22D3FF", description: "Distributed proportionally to active hashrate unit holders (K ≈ 1.01 compounding factor)." },
  { name: "Active Reward Pool", percent: 35, dailyCA: 14000, color: "#A855F7", description: "Funds VIP tier incentives and referral downline performance matching." },
  { name: "PoS Staking Output", percent: 18, dailyCA: 7200, color: "#7B4FFF", description: "Daily staking rewards distributed to locked & flexible CA stakers." },
  { name: "DAO Governance", percent: 3, dailyCA: 1200, color: "#F59E0B", description: "Shared among V7–V10 consensus contributors and ecosystem governance." },
  { name: "Foundation & Tech", percent: 2, dailyCA: 800, color: "#10B981", description: "Continuous core protocol security audits, infrastructure, and dev grants." },
];

export const STAKING_TERMS = [
  { id: "flex", name: "Flexible", durationDays: 0, multiplier: 1.0, dailyRateMin: 0.002, dailyRateMax: 0.004, avgDaily: 0.003, lockup: "Instant Withdrawal (T+1 settlement)" },
  { id: "30d", name: "30 Days", durationDays: 30, multiplier: 1.3, dailyRateMin: 0.0026, dailyRateMax: 0.0052, avgDaily: 0.0039, lockup: "30-Day Term Lock" },
  { id: "90d", name: "90 Days", durationDays: 90, multiplier: 1.6, dailyRateMin: 0.0032, dailyRateMax: 0.0064, avgDaily: 0.0048, lockup: "90-Day Term Lock" },
  { id: "180d", name: "180 Days", durationDays: 180, multiplier: 2.0, dailyRateMin: 0.0040, dailyRateMax: 0.0080, avgDaily: 0.0060, lockup: "180-Day Term Lock" },
  { id: "360d", name: "360 Days", durationDays: 360, multiplier: 2.5, dailyRateMin: 0.0050, dailyRateMax: 0.0100, avgDaily: 0.0075, lockup: "360-Day Term Lock" },
];

export const VIP_TIERS = [
  { tier: "V1", personalUSDT: 300, legUSDT: 3000, rewardPercent: "5%", daoShare: false, perk: "Direct referral hashrate reward bonus" },
  { tier: "V2", personalUSDT: 300, legUSDT: 10000, rewardPercent: "8%", daoShare: false, perk: "Multi-level downline computing bonus" },
  { tier: "V3", personalUSDT: 300, legUSDT: 30000, rewardPercent: "12%", daoShare: false, perk: "Ecosystem node revenue acceleration" },
  { tier: "V4", personalUSDT: 300, legUSDT: 100000, rewardPercent: "15%", daoShare: false, perk: "Priority bridge liquidity pool fee discount" },
  { tier: "V5", personalUSDT: 300, legUSDT: 300000, rewardPercent: "18%", daoShare: false, perk: "Dedicated regional studio manager subsidy" },
  { tier: "V6", personalUSDT: 300, legUSDT: 1000000, rewardPercent: "21%", daoShare: false, perk: "Global conference VIP pass & governance badge" },
  { tier: "V7", personalUSDT: 300, legUSDT: 3000000, rewardPercent: "24%", daoShare: true, perk: "Shares 3% DAO daily pool (1,200 CA/day)" },
  { tier: "V8", personalUSDT: 300, legUSDT: 10000000, rewardPercent: "27%", daoShare: true, perk: "Weighted DAO dividend & node validator status" },
  { tier: "V9", personalUSDT: 300, legUSDT: 30000000, rewardPercent: "30%", daoShare: true, perk: "Global operation council voting seat" },
  { tier: "V10", personalUSDT: 300, legUSDT: 100000000, rewardPercent: "33%", daoShare: true, perk: "Master consensus partner & protocol foundation seat" },
];

export const BOT_CHAIN_INFRASTRUCTURE = [
  {
    id: "mainnet",
    title: "BOT Mainnet",
    category: "Layer 1 Core",
    icon: "Cpu",
    tagline: "High-Throughput AI Supercomputing Consensus",
    details: "Built specifically to coordinate AI workloads, decentralized model inference, and cross-border computing resource scheduling with sub-second finality and EVM compatibility.",
    features: ["1.50% Gas Fee Burn", "Native AI Agent Identity", "Cross-sharding resource allocation", "Sub-second block confirmation"]
  },
  {
    id: "explorer",
    title: "BOT Explorer",
    category: "Transparency & Analytics",
    icon: "Search",
    tagline: "Real-Time Hashrate & Ledger Verification",
    details: "Full transparent tracking of daily 40,000 CA releases, permanent hashrate power registrations, block verification, node health, and token burn addresses.",
    features: ["100% On-chain Hashrate metrics", "Real-time burn tracker", "Wallet balance inspector", "Smart contract verification"]
  },
  {
    id: "bridge",
    title: "Cross-Chain Bridge",
    category: "Interoperability",
    icon: "ArrowLeftRight",
    tagline: "Seamless Liquidity across BNB, Ethereum, & Tron",
    details: "Enables instant 1:1 token bridging for USDT, CA, and BOT between major blockchains and BOT Chain with cryptographic threshold validation.",
    features: ["Sub-2 minute bridging", "Decentralized relayers", "Institutional liquidity vaults", "Ultra-low cross-chain fee"]
  },
  {
    id: "wallet",
    title: "BO Wallet",
    category: "Decentralized Asset Management",
    icon: "Wallet",
    tagline: "Self-Custodial Staking & Daily Computing Yield",
    details: "The unified portal to view daily computing output, manage flexible & term staking pools, swap CA/USDT, and track team referral tiers with non-custodial security.",
    features: ["Biometric & Seed phrase security", "Integrated CaryPact DApp browser", "One-tap staking activation", "Real-time earnings push"]
  },
  {
    id: "bdex",
    title: "BDEX Decentralized Exchange",
    category: "Liquidity & Automated Market Making",
    icon: "TrendingUp",
    tagline: "High-Liquidity CA / USDT / BOT Pairs",
    details: "AMM-powered decentralized exchange with deep liquidity pools, automated 1.8% buyback burns on sell orders, and instant settlement with minimal slippage.",
    features: ["5% Slippage distribution engine", "1.8% Automated buyback burn", "Concentrated liquidity curve", "Direct fiat-gateway integrations"]
  }
];

export const UPCOMING_EVENTS = [
  {
    id: "hk-summit",
    title: "Global Consensus Summit — Hong Kong",
    type: "Flagship Summit",
    date: "Recorded & Highlights Available",
    stats: "45 Countries • 4,000+ Attendees • 200,000+ Stream Views",
    summary: "Historic consensus milestone inaugurating BOT Chain mainnet launch, institutional seed announcements ($15M), and global computing alliance.",
    replayUrl: "https://www.youtube.com",
  },
  {
    id: "singapore-ai",
    title: "Singapore AI Supercomputing Symposium",
    type: "Institutional Meetup",
    date: "Upcoming Virtual & In-Person",
    stats: "Marina Bay Sands Expo • 1,200 Leaders",
    summary: "Technical deep-dive on CaryPact AI agent dispatching, decentralized GPU pooling, and tier-1 exchange listing roadmaps.",
    replayUrl: "https://zoom.us",
  },
  {
    id: "dubai-expo",
    title: "Dubai Web3 & Computing Power Expo",
    type: "Regional Hub Opening",
    date: "Weekly Live Webinar Series",
    stats: "Dubai Internet City • 15 Languages",
    summary: "Live onboarding session covering wallet creation, USDT to Hashrate activation, and risk-management best practices.",
    replayUrl: "https://zoom.us",
  }
];
