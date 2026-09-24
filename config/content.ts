// Comprehensive Guides, Educational Topics, and Multilingual Dictionary

// A guide's video can live on YouTube or be a locally-hosted file.
// We deliberately do NOT hardcode a duration here: durations are read
// straight off the real source at runtime (YouTube IFrame API for
// youtube videos, the HTMLVideoElement's `duration` for local files)
// so the displayed time is always accurate and never guessed.
export type VideoSource =
  | {
      type: "youtube";
      /** The 11-character YouTube video ID */
      videoId: string;
      /** Canonical watch URL, kept for reference / "watch on YouTube" links */
      url: string;
      /** Optional start offset in seconds, only set when a real timestamp is known */
      startSeconds?: number;
      /** Optional real chapter markers — omit entirely rather than inventing generic ones */
      chapters?: { title: string; startSeconds: number }[];
    }
  | {
      type: "local";
      /** Path to the video file, e.g. /videos/getting-started.mp4 */
      src: string;
      poster?: string;
      /** Optional real chapter markers — omit entirely rather than inventing generic ones */
      chapters?: { title: string; startSeconds: number }[];
    };

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  category: "Setup" | "Computing" | "Earnings" | "Exchange" | "Security";
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  video?: VideoSource;
  steps: {
    title: string;
    description: string;
    warning?: string;
    proTip?: string;
  }[];
  keyTakeaways: string[];
}

export const GUIDES_DATA: GuideArticle[] = [
  {
    id: "getting-started",
    slug: "getting-started",
    title: "Complete Getting Started Guide to CaryPact",
    category: "Setup",
    readTime: "4 min read",
    difficulty: "Beginner",
    video: {
      type: "youtube",
      videoId: "gpMhwqAeWLQ",
      url: "https://www.youtube.com/watch?v=gpMhwqAeWLQ"
    },
    summary: "A step-by-step roadmap to understanding CaryPact decentralized supercomputing, creating your non-custodial wallet, and navigating the ecosystem safely.",
    steps: [
      {
        title: "1. Understand the Core Philosophy",
        description: "CaryPact operates as a decentralized supercomputing protocol deployed on BOT Chain. Participants contribute USDT to obtain Hashrate Units, which tap into the daily release of CA tokens.",
        proTip: "Never invest funds you cannot afford to lock up; computing power purchases are permanent."
      },
      {
        title: "2. Prepare Web3 Wallet & USDT (BEP20 / TRC20)",
        description: "You will need a Web3 wallet (such as BO Wallet, MetaMask, or Trust Wallet) configured with USDT to activate your account and pay network gas.",
        warning: "Always double-check you are interacting with the official CaryPact domain (app.carypact.com)."
      },
      {
        title: "3. Connect via Invitation Code",
        description: "Registration requires a verified community invite. You can use the official learning hub invitation code (1AjyRv / C82A37) to access the network portal.",
      },
      {
        title: "4. Review Risk Disclosures",
        description: "Verify understanding of token emission cycles, 5% selling slippage, and market volatility before allocating assets."
      }
    ],
    keyTakeaways: [
      "CaryPact runs on the high-speed BOT Chain Layer 1 network.",
      "1 USDT equals 1 Hashrate Unit; minimum entry is 100 USDT.",
      "Always maintain private key and seed phrase custody offline."
    ]
  },
  {
    id: "create-wallet",
    slug: "create-wallet",
    title: "How to Create & Secure Your BO Wallet",
    category: "Setup",
    readTime: "5 min read",
    difficulty: "Beginner",
    video: {
      type: "youtube",
      videoId: "dIkahd0EZbk",
      url: "https://youtu.be/dIkahd0EZbk"
    },
    summary: "Set up the non-custodial BO Wallet or standard EVM wallet with custom RPC for BOT Chain compatibility, staking, and reward tracking.",
    steps: [
      {
        title: "1. Download Official Client or Configure RPC",
        description: "Install the BO Wallet app or add BOT Chain custom network to your MetaMask with Chain ID, RPC Endpoint, and BOT currency symbol.",
        proTip: "Keep an extra copy of the RPC endpoints saved in your browser bookmarks."
      },
      {
        title: "2. Write Down Your 12-Word Seed Phrase",
        description: "Record the 12-word recovery phrase on physical paper or titanium cold storage. Never take screenshots or store them in cloud sync folders.",
        warning: "Anyone with your recovery phrase can drain your assets. Support staff will NEVER ask for it."
      },
      {
        title: "3. Deposit Gas Assets & USDT",
        description: "Transfer a small quantity of BOT for transaction gas fees and USDT for your planned computing power or staking participation."
      }
    ],
    keyTakeaways: [
      "Non-custodial means only you hold the keys to your funds.",
      "BOT is the native gas token of BOT Chain (1.50% of gas fees are permanently burned).",
      "Compatible with Android, iOS, and browser extension environments."
    ]
  },
  {
    id: "buy-computing-power",
    slug: "buy-computing-power",
    title: "How to Purchase Computing Power (Hashrate Units)",
    category: "Computing",
    readTime: "6 min read",
    difficulty: "Intermediate",
    video: {
      type: "youtube",
      videoId: "eziTYIKL300",
      url: "https://www.youtube.com/watch?v=eziTYIKL300"
    },
    summary: "Deep dive into Hashrate Units: 1 USDT = 1 Unit, minimum 100 USDT, daily 16,800 CA distribution pool, and the critical permanence rule.",
    steps: [
      {
        title: "1. Understand the 1:1 Hashrate Unit Model",
        description: "When you contribute 100 USDT (or higher), the smart contract permanently allocates 100 Hashrate Units to your address. This grants a proportional share of the 16,800 CA daily mining pool.",
        warning: "CRITICAL: Computing power purchases are PERMANENT. There is no principal withdrawal or exit mechanism for hashrate once activated."
      },
      {
        title: "2. Connect Wallet to CaryPact DApp",
        description: "Open the CaryPact portal, navigate to the 'Computing Power' section, and enter your desired USDT allocation (minimum 100 USDT).",
      },
      {
        title: "3. Approve USDT Smart Contract & Confirm",
        description: "Approve the token spending limit and confirm the transaction. Your Hashrate Units will begin calculating output on the next settlement cycle.",
        proTip: "The compounding time factor (K ≈ 1.01/day) rewards sustained network participation."
      }
    ],
    keyTakeaways: [
      "1 USDT = 1 Hashrate Unit (Permanent allocation, no principal refund).",
      "Daily mining pool contains 16,800 CA (42% of 40,000 daily release).",
      "Your daily CA reward = (Your Hashrate / Total Network Hashrate) × Pool × Time Coefficient."
    ]
  },
  {
    id: "receive-ca",
    slug: "receive-ca",
    title: "Receiving, Claiming & Tracking Daily CA Rewards",
    category: "Earnings",
    readTime: "4 min read",
    difficulty: "Beginner",
    video: {
      type: "youtube",
      videoId: "qJ1trZFznrY",
      url: "https://youtu.be/qJ1trZFznrY"
    },
    summary: "How daily CA mining yields, PoS staking distributions, and referral incentives are settled on-chain every 24 hours.",
    steps: [
      {
        title: "1. Monitor T+1 Daily Settlement",
        description: "The CaryPact smart contract aggregates global hashrate and distributes daily CA rewards automatically to your internal balance at 00:00 UTC.",
      },
      {
        title: "2. Review Output Breakdown",
        description: "Inspect whether your incoming CA originates from Computing Power Mining (16,800 CA pool), PoS Staking (7,200 CA pool), or VIP Active Rewards (14,000 CA pool).",
      },
      {
        title: "3. Claim to Non-Custodial Wallet",
        description: "Click 'Harvest' / 'Claim' to transfer minted CA tokens into your self-custodial wallet address on BOT Chain.",
        proTip: "Batch claiming weekly can optimize gas fee expenses."
      }
    ],
    keyTakeaways: [
      "Daily settlements run on a strict 24-hour T+1 cycle.",
      "Harvested CA is immediately usable for staking, trading, or liquidity pairing.",
      "All distributions are provably verifiable on the BOT Explorer."
    ]
  },
  {
    id: "stake-ca",
    slug: "stake-ca",
    title: "Staking CA: Flexible vs. Fixed Terms (30d–360d)",
    category: "Earnings",
    readTime: "7 min read",
    difficulty: "Intermediate",
    video: {
      type: "youtube",
      videoId: "L8sKdWz6Qbs",
      url: "https://www.youtube.com/watch?v=L8sKdWz6Qbs"
    },
    summary: "Learn how the 7,200 CA/day PoS staking pool works, multiplier tiers (1.3x to 2.5x), and why hypothetical compounding figures require realistic risk assessment.",
    steps: [
      {
        title: "1. Choose Your Staking Strategy",
        description: "Select between Flexible (0.2%–0.4% daily, instant exit) or Fixed Lockup Terms (30d = 1.3x multiplier, 90d = 1.6x, 180d = 2.0x, 360d = 2.5x).",
        proTip: "Fixed terms yield higher multipliers but lock token access until the term expiration date."
      },
      {
        title: "2. Understand the Reward Pool Inflow",
        description: "Staking rewards are continuously replenished by: 7,200 CA/day from base emission, 1.8% from sell slippage fees, active pool surplus, and price stabilization reserves.",
      },
      {
        title: "3. Review Hypothetical vs Real Return Disclosures",
        description: "Ecosystem presentations frequently demonstrate illustrative models (e.g. $10k compounding to $400k+ assuming sustained 0.3% price growth). These are purely hypothetical simulations and DO NOT represent guaranteed returns.",
        warning: "Crypto asset prices fluctuate wildly. High APR estimates depend directly on CA market valuation and network liquidity."
      }
    ],
    keyTakeaways: [
      "Flexible staking allows daily withdrawals; fixed terms lock assets for higher multipliers.",
      "Funded by 18% base emission + 1.8% trade slippage buyback fee.",
      "Compound projections must always be evaluated alongside market volatility."
    ]
  },
  {
    id: "ca-to-usdt",
    slug: "ca-to-usdt",
    title: "How to Swap CA to USDT on BDEX & SWAP",
    category: "Exchange",
    readTime: "5 min read",
    difficulty: "Intermediate",
    video: {
      type: "youtube",
      videoId: "XmPXn2z4DJI",
      url: "https://youtu.be/XmPXn2z4DJI"
    },
    summary: "Mastering the BDEX decentralized exchange, understanding the 5% slippage distribution (1.8% buyback burn + 3.2% node reward), and executing fast swaps.",
    steps: [
      {
        title: "1. Navigate to BDEX or CaryPact SWAP",
        description: "Connect your wallet to BDEX and select the CA / USDT trading pair. Ensure your wallet has sufficient BOT for the gas fee.",
      },
      {
        title: "2. Account for the 5% Slippage Mechanism",
        description: "Every sell order of CA automatically routes 1.8% to the buyback & burn engine (reducing circulating supply) and 3.2% to node operators and liquidity keepers.",
        proTip: "Set your swap tolerance slippage to at least 5.5% to avoid failed transactions."
      },
      {
        title: "3. Review Price Impact & Confirm Swap",
        description: "Check the current execution price against the pool depth and confirm. USDT will appear in your wallet instantly upon block finality."
      }
    ],
    keyTakeaways: [
      "Selling CA incurs a mandatory 5% fee designed to sustain deflation and reward node operators.",
      "1.8% of every sell order permanently burns CA tokens.",
      "Cross-chain bridge enables moving swapped USDT back to Ethereum or BNB Chain."
    ]
  },
  {
    id: "withdraw",
    slug: "withdraw",
    title: "Withdrawing Assets & Bridging to External Chains",
    category: "Security",
    readTime: "5 min read",
    difficulty: "Intermediate",
    video: {
      type: "youtube",
      videoId: "WOwJiiuGCP4",
      url: "https://www.youtube.com/watch?v=WOwJiiuGCP4"
    },
    summary: "Step-by-step procedure for bridging your USDT from BOT Chain to Ethereum, BNB Chain, or centralized exchanges safely.",
    steps: [
      {
        title: "1. Access the Official BOT Chain Bridge",
        description: "Select BOT Chain as the source network and choose your destination chain (e.g. BNB Smart Chain or TRON for low gas).",
      },
      {
        title: "2. Input Destination Address",
        description: "Enter your personal wallet address on the target network. Never send bridge transactions directly to an unsupported smart contract or exchange deposit that requires memo tags unless verified.",
        warning: "Sending tokens to the wrong network without bridge protocol support can result in permanent loss."
      },
      {
        title: "3. Monitor Validator Confirmations",
        description: "Cross-chain bridge relayers validate the lock-and-mint transaction. Typical completion takes between 1 to 5 minutes.",
      }
    ],
    keyTakeaways: [
      "Cross-Chain Bridge provides non-custodial liquidity transfers.",
      "Double-check recipient address and chain network ID before confirming.",
      "Keep a fraction of native gas tokens on both source and destination chains."
    ]
  }
];

export const LEARN_MODULES = [
  {
    id: "blockchain",
    slug: "blockchain",
    title: "Blockchain & Layer 1 Consensus Fundamentals",
    category: "Core Tech",
    readTime: "6 min read",
    summary: "How distributed ledgers, cryptographic proofs, and decentralized consensus mechanisms form the immutable foundation of BOT Chain.",
    sections: [
      {
        heading: "What is a Layer 1 Public Chain?",
        content: "A Layer 1 blockchain is the foundational base architecture that processes and finalizes transactions without relying on another network. BOT Chain serves as a specialized Layer 1 optimized specifically for AI agent coordination and distributed computing resource scheduling."
      },
      {
        heading: "Proof-of-Stake & Consensus Security",
        content: "Validators stake native BOT tokens to secure the network, propose new blocks, and validate smart contract state transitions. This provides sub-second transaction finality with minimal energy consumption compared to legacy Proof-of-Work systems."
      },
      {
        heading: "Immutable Ledger Transparency",
        content: "Every Hashrate Unit creation, CA emission release, and token burn transaction is permanently recorded and publicly verifiable via the BOT Explorer, ensuring cryptographic auditability."
      }
    ]
  },
  {
    id: "ai-computing",
    slug: "ai-computing",
    title: "Decentralized AI Computing & Hashrate Economics",
    category: "AI & Supercomputing",
    readTime: "8 min read",
    summary: "Why global artificial intelligence requires decentralized supercomputing, and how CaryPact turns hardware power into tokenized Hashrate Units.",
    sections: [
      {
        heading: "The Global AI Compute Crunch",
        content: "Modern LLMs, AI agents, and neural networks demand exponential GPU computing power. Centralized cloud monopolies charge exorbitant premiums and enforce restrictive API quotas. CaryPact pools global computing resources into an open, decentralized supercomputing marketplace."
      },
      {
        heading: "Understanding the Hashrate Unit (1 USDT = 1 Unit)",
        content: "Hashrate Units represent your proportional share in the CaryPact supercomputing cluster. The 16,800 CA daily mining pool is divided among all active hashrate units based on a mathematical time-compounding formula (K ≈ 1.01/day)."
      },
      {
        heading: "Permanence & Network Capital Discipline",
        content: "Hashrate Units cannot be liquidated or refunded. This structural permanence guarantees that network computing capacity remains stable and immune to sudden capital flight, aligning long-term participants with network growth."
      }
    ]
  },
  {
    id: "tokenomics",
    slug: "tokenomics",
    title: "CA Tokenomics: 210M Supply, 22-Year Emissions & Deflation",
    category: "Economics",
    readTime: "7 min read",
    summary: "Comprehensive mathematical breakdown of CA token allocation, daily release schedules, halving mechanics, and multi-layered burn sinks.",
    sections: [
      {
        heading: "Total Supply: 210,000,000 CA",
        content: "The CA token has a hard-capped maximum supply of 210 Million tokens. 10 Million are allocated for initial SWAP liquidity, and 200 Million are emitted programmatically over a 22-year cycle."
      },
      {
        heading: "Daily Emission & 2-Year Reduction Cycle",
        content: "The base release begins at 40,000 CA per day. Every 2 years, daily emissions decrease by 10%, creating a steady disinflationary curve that mimics Bitcoin's halving dynamics."
      },
      {
        heading: "Triple Deflationary Mechanisms",
        content: "1. 1.80% of every sell order on BDEX is permanently burned.\n2. 1.10% of general ecosystem transaction fees are allocated to buyback & burn.\n3. 1.50% of all BOT Chain gas fees are destroyed at the protocol level."
      }
    ]
  },
  {
    id: "defi",
    slug: "defi",
    title: "DeFi Yield Mechanisms & Staking Multipliers",
    category: "DeFi",
    readTime: "6 min read",
    summary: "How Proof-of-Stake yields, multiplier terms (up to 2.5x for 360 days), and fee recyclers generate staking rewards on BOT Chain.",
    sections: [
      {
        heading: "The 7,200 CA Daily PoS Staking Pool",
        content: "18% of the daily token emission (7,200 CA) is exclusively reserved for stakers. Users who lock CA tokens earn a proportional daily dividend settled every 24 hours (T+1)."
      },
      {
        heading: "Lockup Multipliers Explained",
        content: "Flexible staking yields 0.2%–0.4% daily. By committing to fixed terms, your yield base is multiplied: 30 Days (1.3x), 90 Days (1.6x), 180 Days (2.0x), and 360 Days (2.5x)."
      },
      {
        heading: "Slippage & Surplus Redistribution",
        content: "In addition to base emission, the staking pool receives 1.8% from market sell slippage and unspent active reward surpluses, creating organic yield backed by real trading volume."
      }
    ]
  },
  {
    id: "web3",
    slug: "web3",
    title: "Web3 Protocols, Self-Custody & Smart Contract Safety",
    category: "Security",
    readTime: "5 min read",
    summary: "Best security practices for managing private keys, identifying phishing attempts, and validating verified protocol smart contracts.",
    sections: [
      {
        heading: "The Golden Rule of Self-Custody",
        content: "'Not your keys, not your crypto.' When using BO Wallet or MetaMask, your private key stays in your device's secure enclave. Never paste private keys into websites, forms, or chat apps."
      },
      {
        heading: "Contract Verification & Approval Limits",
        content: "Always check token approval allowances. When activating computing power or staking, set custom token spending caps rather than unlimited approvals when possible."
      },
      {
        heading: "Identifying Phishing Domains",
        content: "Always ensure the URL in your browser bar is exactly 'app.carypact.com' or 'botchain.ai'. Bookmark official links and avoid clicking sponsored search ad links that may impersonate the site."
      }
    ]
  }
];

export const I18N_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    heroBadge: "Independent Educational & Analytics Hub",
    heroHeadline1: "The CaryPact Learning Hub",
    heroSubheadline: "Understand CaryPact, BOT Chain, CA, computing power and how the ecosystem works before you participate.",
    searchPlaceholder: "Ask anything about CaryPact, BOT Chain, Staking, Hashrate...",
    navHome: "Home",
    navLive: "Live Data",
    navGuides: "Guides & Tutorials",
    navLearn: "Learn Web3",
    navDisclosures: "Risks & Disclosures",
    ctaLaunchApp: "Launch CaryPact App",
    ctaRegister: "Register on CaryPact",
    liveDashboardTitle: "CaryPact Live Network",
    calculatorTitle: "CA ↔ USDT Conversion & Yield Simulator",
    affiliateNote: "Affiliate Disclosure: This independent learning hub may earn a commission if you register using our invitation link. DYOR & invest responsibly.",
    permanentHashrateWarning: "Notice: 1 USDT = 1 Hashrate Unit. Computing power purchases are permanent with no principal exit mechanism.",
    readGuideBtn: "Read Interactive Guide",
    downloadPdfBtn: "Download PDF Guide",
    videoTutorial: "Watch Video Explainer",
  },
  hi: {
    heroBadge: "स्वतंत्र शैक्षिक और विश्लेषण केंद्र",
    heroHeadline1: "CaryPact लर्निंग हब",
    heroSubheadline: "भाग लेने से पहले CaryPact, BOT Chain, CA, कंप्यूटिंग पावर और इकोसिस्टम के काम करने के तरीके को समझें।",
    searchPlaceholder: "CaryPact, BOT Chain, Staking, Hashrate के बारे में कुछ भी पूछें...",
    navHome: "होम",
    navLive: "लाइव डेटा",
    navGuides: "गाइड और ट्यूटोरियल",
    navLearn: "Web3 सीखें",
    navDisclosures: "जोखिम और प्रकटीकरण",
    ctaLaunchApp: "CaryPact ऐप लॉन्च करें",
    ctaRegister: "CaryPact पर पंजीकरण करें",
    liveDashboardTitle: "CaryPact लाइव नेटवर्क",
    calculatorTitle: "CA ↔ USDT कन्वर्ज़न और यील्ड सिम्युलेटर",
    affiliateNote: "एफ़िलिएट प्रकटीकरण: यदि आप हमारे आमंत्रण लिंक का उपयोग करके पंजीकरण करते हैं, तो यह स्वतंत्र लर्निंग हब कमीशन कमा सकता है। DYOR और जिम्मेदारी से निवेश करें।",
    permanentHashrateWarning: "सूचना: 1 USDT = 1 Hashrate Unit। कंप्यूटिंग पावर की खरीद स्थायी है और इसमें मूलधन निकालने का कोई तंत्र नहीं है।",
    readGuideBtn: "इंटरैक्टिव गाइड पढ़ें",
    downloadPdfBtn: "PDF गाइड डाउनलोड करें",
    videoTutorial: "वीडियो व्याख्या देखें",
  },
  zh: {
    heroBadge: "独立教育与实时数据中心",
    heroHeadline1: "CaryPact 学习中心",
    heroSubheadline: "在参与之前，全面了解 CaryPact、BOT 公链、CA 代币、算力模型及生态运行机制。",
    searchPlaceholder: "输入任何关于 CaryPact、BOT 公链、质押、算力的问题...",
    navHome: "首页",
    navLive: "实时数据",
    navGuides: "操作指南",
    navLearn: "Web3 知识",
    navDisclosures: "风险披露",
    ctaLaunchApp: "进入 CaryPact 应用",
    ctaRegister: "注册 CaryPact",
    liveDashboardTitle: "CaryPact 实时网络数据",
    calculatorTitle: "CA ↔ USDT 兑换与收益模拟器",
    affiliateNote: "推广披露：本独立学习中心包含邀请返佣链接。加密资产具有波动风险，请理性评估。",
    permanentHashrateWarning: "提示：1 USDT = 1 算力单位。算力购买为永久性质，无本金退出机制。",
    readGuideBtn: "阅读完整指南",
    downloadPdfBtn: "下载 PDF 指南",
    videoTutorial: "观看视频详解",
  },
  es: {
    heroBadge: "Centro Educativo y Analítico Independiente",
    heroHeadline1: "Centro de Aprendizaje CaryPact",
    heroSubheadline: "Comprende CaryPact, BOT Chain, el token CA, el poder de cómputo y cómo funciona el ecosistema antes de participar.",
    searchPlaceholder: "Pregunta sobre CaryPact, BOT Chain, Staking, Hashrate...",
    navHome: "Inicio",
    navLive: "Datos en Vivo",
    navGuides: "Guías",
    navLearn: "Aprender",
    navDisclosures: "Riesgos y Divulgación",
    ctaLaunchApp: "Abrir App CaryPact",
    ctaRegister: "Registrarse en CaryPact",
    liveDashboardTitle: "Red en Vivo de CaryPact",
    calculatorTitle: "Calculadora de Conversión y Rendimiento CA ↔ USDT",
    affiliateNote: "Divulgación de afiliados: Este portal educativo independiente puede recibir comisiones por enlaces de invitación. DYOR.",
    permanentHashrateWarning: "Aviso: 1 USDT = 1 Unidad de Hashrate. La compra de poder de cómputo es permanente sin mecanismo de retiro de principal.",
    readGuideBtn: "Leer Guía Interactiva",
    downloadPdfBtn: "Descargar Guía en PDF",
    videoTutorial: "Ver Video Explicativo",
  },
  ja: {
    heroBadge: "独立教育・分析ハブ",
    heroHeadline1: "CaryPact ラーニングハブ",
    heroSubheadline: "参加する前に、CaryPact、BOT Chain、CA トークン、コンピューティングパワー、エコシステムの仕組みを深く理解しましょう。",
    searchPlaceholder: "CaryPact、BOT Chain、ステーキング、ハッシュレートについて質問...",
    navHome: "ホーム",
    navLive: "ライブデータ",
    navGuides: "ガイド",
    navLearn: "Web3学習",
    navDisclosures: "リスク開示",
    ctaLaunchApp: "CaryPact アプリを開く",
    ctaRegister: "CaryPact に登録",
    liveDashboardTitle: "CaryPact リアルタイムネットワーク",
    calculatorTitle: "CA ↔ USDT 換算＆利回りシミュレーター",
    affiliateNote: "アフィリエイト開示: この独立した学習ハブは招待リンクを通じて手数料を得る場合があります。投資は自己責任で行ってください。",
    permanentHashrateWarning: "重要: 1 USDT = 1 ハッシュレート単位。コンピューティングパワーの購入は永続的であり、元本返還メカニズムはありません。",
    readGuideBtn: "ガイドを読む",
    downloadPdfBtn: "PDFガイドを保存",
    videoTutorial: "解説動画を見る",
  },
  ko: {
    heroBadge: "독립 교육 및 실시간 데이터 허브",
    heroHeadline1: "CaryPact 학습 허브",
    heroSubheadline: "참여하기 전에 CaryPact, BOT Chain, CA 토큰, 컴퓨팅 파워 및 생태계 작동 원리를 완벽하게 이해하세요.",
    searchPlaceholder: "CaryPact, BOT 체인, 스테이킹, 해시레이트에 대해 질문하세요...",
    navHome: "홈",
    navLive: "실시간 데이터",
    navGuides: "가이드",
    navLearn: "Web3 학습",
    navDisclosures: "위험 고지",
    ctaLaunchApp: "CaryPact 앱 실행",
    ctaRegister: "CaryPact 등록하기",
    liveDashboardTitle: "CaryPact 실시간 네트워크 현황",
    calculatorTitle: "CA ↔ USDT 전환 및 수익률 시뮬레이터",
    affiliateNote: "제휴 고지: 본 독립 교육 사이트는 추천 링크를 통해 수수료를 받을 수 있습니다. 투자 전 철저한 조사를 권장합니다.",
    permanentHashrateWarning: "주의: 1 USDT = 1 해시레이트 단위. 컴퓨팅 파워 구매는 영구적이며 원금 반환 메커니즘이 없습니다.",
    readGuideBtn: "가이드 읽기",
    downloadPdfBtn: "PDF 가이드 다운로드",
    videoTutorial: "영상 설명 보기",
  },
  vi: {
    heroBadge: "Trung Tâm Giáo Dục & Dữ Liệu Độc Lập",
    heroHeadline1: "Trung Tâm Học Tập CaryPact",
    heroSubheadline: "Tìm hiểu CaryPact, BOT Chain, token CA, năng lực tính toán và cách thức hoạt động của hệ sinh thái trước khi tham gia.",
    searchPlaceholder: "Hỏi bất kỳ điều gì về CaryPact, BOT Chain, Staking, Hashrate...",
    navHome: "Trang chủ",
    navLive: "Dữ liệu Live",
    navGuides: "Hướng dẫn",
    navLearn: "Kiến thức Web3",
    navDisclosures: "Rủi ro & Miễn trừ",
    ctaLaunchApp: "Mở App CaryPact",
    ctaRegister: "Đăng ký CaryPact",
    liveDashboardTitle: "Mạng Lưới Trực Tiếp CaryPact",
    calculatorTitle: "Máy Tính Chuyển Đổi CA ↔ USDT & Lợi Nhuận",
    affiliateNote: "Tiết lộ liên kết: Trang web giáo dục độc lập này có thể nhận hoa hồng từ liên kết mời. Hãy tự nghiên cứu kỹ trước khi đầu tư.",
    permanentHashrateWarning: "Lưu ý: 1 USDT = 1 Đơn vị Hashrate. Mua năng lực tính toán là vĩnh viễn không có cơ chế hoàn gốc.",
    readGuideBtn: "Đọc Hướng Dẫn Chi Tiết",
    downloadPdfBtn: "Tải Bản PDF",
    videoTutorial: "Xem Video Hướng Dẫn",
  },
  ru: {
    heroBadge: "Независимый образовательный и аналитический центр",
    heroHeadline1: "Обучающий Центр CaryPact",
    heroSubheadline: "Изучите CaryPact, BOT Chain, токен CA, вычислительные мощности и устройство экосистемы перед участием.",
    searchPlaceholder: "Задайте любой вопрос о CaryPact, BOT Chain, стейкинге, хешрейте...",
    navHome: "Главная",
    navLive: "Онлайн данные",
    navGuides: "Руководства",
    navLearn: "Обучение Web3",
    navDisclosures: "Риски и раскрытие",
    ctaLaunchApp: "Запустить CaryPact App",
    ctaRegister: "Регистрация в CaryPact",
    liveDashboardTitle: "CaryPact Онлайн Статистика",
    calculatorTitle: "Калькулятор конвертации CA ↔ USDT и доходности",
    affiliateNote: "Партнерское раскрытие: Независимый обучающий портал может получать комиссионные по реферальным ссылкам. DYOR.",
    permanentHashrateWarning: "Внимание: 1 USDT = 1 единица хешрейта. Покупка вычислительной мощности бессрочна без возврата тела инвестиции.",
    readGuideBtn: "Читать руководство",
    downloadPdfBtn: "Скачать PDF",
    videoTutorial: "Смотреть видео",
  },
  fr: {
    heroBadge: "Centre Éducatif et Analytique Indépendant",
    heroHeadline1: "Hub d'Apprentissage CaryPact",
    heroSubheadline: "Comprenez CaryPact, BOT Chain, le jeton CA, la puissance de calcul et le fonctionnement de l'écosystème avant de participer.",
    searchPlaceholder: "Posez vos questions sur CaryPact, BOT Chain, Staking, Hashrate...",
    navHome: "Accueil",
    navLive: "Données en Direct",
    navGuides: "Guides & Tutoriels",
    navLearn: "Apprendre le Web3",
    navDisclosures: "Risques & Mentions",
    ctaLaunchApp: "Lancer CaryPact App",
    ctaRegister: "S'inscrire sur CaryPact",
    liveDashboardTitle: "Réseau en Direct CaryPact",
    calculatorTitle: "Convertisseur CA ↔ USDT & Simulateur de Rendement",
    affiliateNote: "Divulgation d'affiliation : Ce centre éducatif indépendant peut percevoir des commissions via les liens d'invitation. DYOR.",
    permanentHashrateWarning: "Avis : 1 USDT = 1 unité de Hashrate. L'achat de puissance de calcul est définitif sans remboursement du capital initial.",
    readGuideBtn: "Lire le Guide Interactif",
    downloadPdfBtn: "Télécharger le PDF",
    videoTutorial: "Voir la Vidéo Explicative",
  }
};