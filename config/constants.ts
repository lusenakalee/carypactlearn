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

export const SUPPORT_CONFIG = {
  TELEGRAM_URL: "https://t.me/CaryPactOfficial",
  TELEGRAM_HANDLE: "@CaryPactOfficial",
  // Placeholder WhatsApp phone number (update anytime to your official number)
  WHATSAPP_PHONE: "+2540181605117",
  WHATSAPP_DISPLAY_PHONE: "+2540181605117",
  WHATSAPP_DEFAULT_MESSAGE: "Hello! I have a question about the CarryPact protocol and Learning Hub.",
  SUPPORT_HOURS: "24/7 Community Support",
  AVG_RESPONSE_TIME: "Usually responds in a few minutes",
};


export const ECOSYSTEM_METRICS = {
  CA_BASE_PRICE: 2.7415,
  BOT_BASE_PRICE: 1.1109,
  CA_TO_BOT_RATIO: 1.337631,
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
  { id: "flex", name: "Flexible", durationDays: 0, multiplier: 1.0, dailyRateMin: 0.002, dailyRateMax: 0.002, avgDaily: 0.002, lockup: "Instant Withdrawal (T+1 settlement)" },
  { id: "30d", name: "30 Days", durationDays: 30, multiplier: 1.0, dailyRateMin: 0.0026, dailyRateMax: 0.0026, avgDaily: 0.0026, lockup: "30-Day Term Lock" },
  { id: "90d", name: "90 Days", durationDays: 90, multiplier: 1.0, dailyRateMin: 0.0032, dailyRateMax: 0.0032, avgDaily: 0.0032, lockup: "90-Day Term Lock" },
  { id: "180d", name: "180 Days", durationDays: 180, multiplier: 1.0, dailyRateMin: 0.004, dailyRateMax: 0.004, avgDaily: 0.004, lockup: "180-Day Term Lock" },
  { id: "360d", name: "360 Days", durationDays: 360, multiplier: 1.0, dailyRateMin: 0.005, dailyRateMax: 0.005, avgDaily: 0.005, lockup: "360-Day Term Lock" },
];

export const VIP_TIERS = [
  { tier: "V1", personalUSDT: 500, legUSDT: 10000, dailyIncomeMin: 15, dailyIncomeMax: 30, monthlyIncomeMin: 450, monthlyIncomeMax: 900 },
  { tier: "V2", personalUSDT: 1000, legUSDT: 30000, dailyIncomeMin: 40, dailyIncomeMax: 70, monthlyIncomeMin: 1200, monthlyIncomeMax: 2100 },
  { tier: "V3", personalUSDT: 1500, legUSDT: 80000, dailyIncomeMin: 100, dailyIncomeMax: 150, monthlyIncomeMin: 3000, monthlyIncomeMax: 4500 },
  { tier: "V4", personalUSDT: 2000, legUSDT: 200000, dailyIncomeMin: 200, dailyIncomeMax: 350, monthlyIncomeMin: 6000, monthlyIncomeMax: 10500 },
  { tier: "V5", personalUSDT: 3000, legUSDT: 500000, dailyIncomeMin: 500, dailyIncomeMax: 700, monthlyIncomeMin: 15000, monthlyIncomeMax: 21000 },
  { tier: "V6", personalUSDT: 4000, legUSDT: 1600000, dailyIncomeMin: 1000, dailyIncomeMax: 2000, monthlyIncomeMin: 30000, monthlyIncomeMax: 60000 },
  { tier: "V7", personalUSDT: 5000, legUSDT: 5000000, dailyIncomeMin: 3000, dailyIncomeMax: 5000, monthlyIncomeMin: 90000, monthlyIncomeMax: 150000 },
  { tier: "V8", personalUSDT: 10000, legUSDT: 10000000, dailyIncomeMin: 10000, dailyIncomeMax: 15000, monthlyIncomeMin: 300000, monthlyIncomeMax: 450000 },
  { tier: "V9", personalUSDT: 15000, legUSDT: 20000000, dailyIncomeMin: 25000, dailyIncomeMax: 30000, monthlyIncomeMin: 750000, monthlyIncomeMax: 900000 },
  { tier: "V10", personalUSDT: 20000, legUSDT: 40000000, dailyIncomeMin: 50000, dailyIncomeMax: 100000, monthlyIncomeMin: 1500000, monthlyIncomeMax: 2000000 },
];

export const VIP_INCOME_DISCLAIMER =
  "Income is flexible, not fixed. Returns depend on the Hashrate Mining Pool, Community Performance, Business Performance, Mining Efficiency, and market conditions.";

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