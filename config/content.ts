// Comprehensive Guides, Educational Topics, and Multilingual Dictionary

export interface GuideTopic {
  id: "getting-started" | "wallet-accounts" | "network-transactions" | "bridge-defi" | "project-tools";
  title: string;
  description: string;
  badge?: string;
  iconName: "Compass" | "Wallet" | "Zap" | "ArrowLeftRight" | "Wrench";
  guideIds: string[];
}

export interface VideoTutorialLink {
  number: number;
  title: string;
  url: string;
  platform?: string;
  badge?: string;
}

export interface GuideStep {
  title: string;
  description: string;
  warning?: string;
  proTip?: string;
  videoTutorial?: VideoTutorialLink;
  videoTutorials?: VideoTutorialLink[];
}

export interface VideoChapter {
  title: string;
  startSeconds: number;
}

export type VideoSource =
  | {
      type: "youtube";
      videoId: string;
      startSeconds?: number;
      poster?: string;
      chapters?: VideoChapter[];
    }
  | {
      type: "local";
      src: string;
      poster?: string;
      chapters?: VideoChapter[];
    };

export interface GuideArticle {
  id: string;
  slug: string;
  title: string;
  topicId: "getting-started" | "wallet-accounts" | "network-transactions" | "bridge-defi" | "project-tools";
  topicTitle: string;
  category: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  summary: string;
  videoDuration?: string;
  tutorialVideos?: VideoTutorialLink[];
  video?: VideoSource;
  steps: GuideStep[];
  keyTakeaways: string[];
}

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    description: "Set up a wallet, add BOT Chain and complete your first transaction.",
    iconName: "Compass",
    badge: "Essential",
    guideIds: ["getting-started", "create-wallet"]
  },
  {
    id: "wallet-accounts",
    title: "Wallet & Accounts",
    description: "Manage wallets, accounts, assets, multi-network bridging and avoid wrong-network loss.",
    iconName: "Wallet",
    badge: "Networks",
    guideIds: ["create-wallet", "cross-chain-networks-bridging"]
  },
  {
    id: "network-transactions",
    title: "Network & Transactions",
    description: "Understand network parameters, gas fees and transaction status.",
    iconName: "Zap",
    badge: "Network",
    guideIds: ["buy-computing-power", "network-parameters-gas"]
  },
  {
    id: "bridge-defi",
    title: "Bridge & DeFi",
    description: "Use BOT Chain bridge, DEX and staking products safely.",
    iconName: "ArrowLeftRight",
    badge: "DeFi",
    guideIds: ["cross-chain-networks-bridging", "stake-ca", "bot-pledge", "ca-to-usdt"]
  },
  {
    id: "project-tools",
    title: "Project Tools",
    description: "Set up multisite accounts, permissions and project operations.",
    iconName: "Wrench",
    badge: "Operations",
    guideIds: ["every-earning-method", "project-tools-operations"]
  }
];

export const GUIDES_DATA: GuideArticle[] = [
  {
    id: "getting-started",
    slug: "getting-started",
    title: "Getting Started on CaryPact",
    topicId: "getting-started",
    topicTitle: "Getting Started",
    category: "Getting Started",
    readTime: "4 min read",
    difficulty: "Beginner",
    videoDuration: "3:45",
    tutorialVideos: [
      { number: 3, title: "How To Register On CaryPact", url: "https://vt.tiktok.com/ZSXacJHg2/", platform: "TikTok" },
      { number: 8, title: "The Tokenomics of $CA and how to check on botscan", url: "https://vt.tiktok.com/ZSXa3td8n/", platform: "TikTok" }
    ],
    summary: "Complete step-by-step onboarding guide to CaryPact decentralized supercomputing on BOT Chain, connecting with invitation code, verifying the official portal, and understanding ecosystem tokenomics.",
    steps: [
      {
        title: "1. Understand the CaryPact Decentralized Supercomputing Model",
        description: "CaryPact operates as an autonomous supercomputing protocol deployed on BOT Chain. Participants allocate USDT to obtain permanent Hashrate Units, which tap into the daily release pool of 16,800 CA tokens.",
        proTip: "Never invest funds you cannot afford to lock up; computing power purchases are irreversible and permanent."
      },
      {
        title: "2. Prepare Web3 Wallet & USDT (BEP20 / TRC20)",
        description: "You will need a Web3 wallet (such as BO Wallet, MetaMask, Trust Wallet, or TokenPocket) configured with USDT to activate your account and native BOT tokens to pay network gas.",
        warning: "Always double-check you are interacting with the official CaryPact domain (app.carypact.com).",
        videoTutorial: {
          number: 1,
          title: "How To Download Tokenpocket Web3 Wallet For CaryPact",
          url: "https://vt.tiktok.com/ZSXacS6jC/",
          platform: "TikTok"
        }
      },
      {
        title: "3. Connect via Verified Invitation Code",
        description: "Registration requires a verified community invite. You can use the official learning hub invitation code (1AjyRv / C82A37) to access the network portal.",
        videoTutorial: {
          number: 3,
          title: "How To Register On CaryPact",
          url: "https://vt.tiktok.com/ZSXacJHg2/",
          platform: "TikTok"
        }
      },
      {
        title: "4. Activate Account & Fund Gas with Native BOT Coins",
        description: "Transfer a small quantity of BOT (e.g. 0.5 - 2 BOT) to your wallet address. Gas fees on BOT Chain are ultra-low, and 1.50% of all gas fees are burned permanently.",
      },
      {
        title: "5. Review Daily Emission Schedules & Risk Disclosures",
        description: "Verify your understanding of token emission cycles (40,000 CA daily release), 5% selling slippage on BDEX, and market volatility before allocating assets.",
        videoTutorial: {
          number: 8,
          title: "The Tokenomics of $CA and how to check on botscan",
          url: "https://vt.tiktok.com/ZSXa3td8n/",
          platform: "TikTok"
        }
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
    title: "How to Create Wallet (TokenPocket, Trust Wallet, MetaMask, BO Wallet)",
    topicId: "getting-started",
    topicTitle: "Getting Started",
    category: "Getting Started",
    readTime: "5 min read",
    difficulty: "Beginner",
    videoDuration: "4:20",
    tutorialVideos: [
      { number: 1, title: "How To Download Tokenpocket Web3 Wallet For CaryPact", url: "https://vt.tiktok.com/ZSXacS6jC/", platform: "TikTok" },
      { number: 2, title: "How To Install Botchain and add the $CA & $USDT Contracts", url: "https://vt.tiktok.com/ZSXacF78K/", platform: "TikTok" }
    ],
    summary: "Instructions on how to download and set up a Web3 wallet: TokenPocket, Trust Wallet, MetaMask, and BO Wallet with BOT Chain network configuration, seed phrase security, and custom token import.",
    steps: [
      {
        title: "1. Choose & Download Your Web3 Wallet",
        description: "Select your preferred non-custodial wallet: BO Wallet (native to BOT Chain ecosystem), TokenPocket (tokenpocket.pro), Trust Wallet (trustwallet.com), or MetaMask (metamask.io). Always download exclusively from official verified app stores or official domains.",
        warning: "Beware of phishing clones in app stores. Never download wallet software from search engine advertisements or direct APK links in chats.",
        videoTutorial: {
          number: 1,
          title: "How To Download Tokenpocket Web3 Wallet For CaryPact",
          url: "https://vt.tiktok.com/ZSXacS6jC/",
          platform: "TikTok"
        }
      },
      {
        title: "2. Create a New Wallet & Write Down 12-Word Seed Phrase",
        description: "Select 'Create New Wallet' and set a strong alphanumeric password. The app will generate a 12 or 24-word recovery phrase. Write these words on physical paper in sequential order and store them in a fireproof/waterproof location.",
        warning: "Never take screenshots, store recovery phrases in cloud storage (Google Drive, iCloud), or email them. Anyone with your 12 words can instantly drain your funds."
      },
      {
        title: "3. Configure BOT Chain Custom RPC Network",
        description: "For MetaMask, Trust Wallet, or TokenPocket, navigate to Settings > Networks > Add Network (Custom RPC) and enter: Network Name: BOT Chain, RPC URL: https://rpc.botchain.ai, Chain ID: 1918, Currency Symbol: BOT, Block Explorer: https://scan.botchain.ai. (BO Wallet includes BOT Chain pre-configured).",
        proTip: "Save the official RPC endpoint in your notes so you can switch if a secondary mirror is ever needed.",
        videoTutorial: {
          number: 2,
          title: "How To Install Botchain and add the $CA & $USDT Contracts",
          url: "https://vt.tiktok.com/ZSXacF78K/",
          platform: "TikTok"
        }
      },
      {
        title: "4. Add CA and USDT Token Contracts",
        description: "In your wallet, tap 'Import Tokens' or 'Custom Token', select BOT Chain, and paste the official contract addresses for CA Token and USDT. Your balances will now reflect automatically in your asset dashboard.",
        videoTutorial: {
          number: 2,
          title: "How To Install Botchain and add the $CA & $USDT Contracts",
          url: "https://vt.tiktok.com/ZSXacF78K/",
          platform: "TikTok"
        }
      },
      {
        title: "5. Deposit Gas Assets & Verify Account Security",
        description: "Transfer a small amount of BOT for transaction gas fees and USDT for computing power or staking. Test your wallet by sending a small transaction before committing larger allocations."
      }
    ],
    keyTakeaways: [
      "Non-custodial means only you hold the keys to your funds.",
      "BOT Chain uses Chain ID 1918 with native gas token BOT (1.50% gas burn).",
      "Compatible across BO Wallet, TokenPocket, Trust Wallet, and MetaMask."
    ]
  },
  {
    id: "cross-chain-networks-bridging",
    slug: "cross-chain-networks-bridging",
    title: "Understanding Networks, Bridging & Avoiding Wrong-Network Loss (BSC, Ethereum, Bitcoin & BOT Chain)",
    topicId: "wallet-accounts",
    topicTitle: "Wallet & Accounts",
    category: "Networks & Bridging",
    readTime: "7 min read",
    difficulty: "Beginner",
    videoDuration: "5:30",
    summary: "Essential masterclass on understanding different blockchain networks (Binance Smart Chain/BSC, Ethereum, Bitcoin, and BOT Chain), why cross-chain bridging (https://bridge.botchain.ai/) is required, how they interact, and critical cautions to avoid permanent loss from sending to the wrong network.",
    steps: [
      {
        title: "1. Understand Blockchain Separation: Why Networks Cannot Directly Talk",
        description: "Blockchains are completely independent cryptographic ledgers. Bitcoin operates on its own UTXO blockchain, Ethereum operates on EVM Chain ID 1, Binance Smart Chain (BSC) operates on Chain ID 56, and BOT Chain operates as an autonomous Layer 1 on Chain ID 1918. Tokens created on one chain cannot simply be 'transferred' to an address on another chain without a bridge.",
        warning: "CRITICAL: Never send tokens directly from Binance Smart Chain (BSC), Ethereum, or Bitcoin to a BOT Chain address via a standard wallet transfer. Because the networks are separate, transferring directly across different chains without a bridge will orphan your tokens and result in permanent, unrecoverable loss."
      },
      {
        title: "2. Why We Have Bridging: The Official BOT Chain Bridge (https://bridge.botchain.ai/)",
        description: "Because networks are isolated, cross-chain bridges exist to securely transfer value. When moving USDT between BSC (BEP20) or Ethereum (ERC20) and BOT Chain, the bridge smart contracts lock your original tokens on the source network and release or mint equivalent pegged tokens on BOT Chain (and vice versa when moving out).",
        proTip: "Always use the official verified bridge portal: https://bridge.botchain.ai/ — bookmark this address and never use unverified third-party bridge aggregators."
      },
      {
        title: "3. Major Networks Breakdown & How They Interact with BOT Chain",
        description: "• Binance Smart Chain (BSC / BEP-20): The primary onboarding corridor for CaryPact. Most users hold USDT (BEP-20) due to low network fees and fast confirmations. You bridge BEP-20 USDT into BOT Chain to buy computing power or stake.\n• Ethereum (ERC-20): The highest liquidity smart contract network. ERC-20 USDT can be bridged to BOT Chain, but incurs higher Layer 1 Ethereum gas fees.\n• Bitcoin (BTC Network): The pioneer decentralized store of value. Bitcoin runs on a non-EVM UTXO ledger and interacts with EVM networks exclusively through cross-chain wrapped relays or centralized exchange on-ramps.\n• BOT Chain (Layer 1, Chain ID 1918): The high-speed Layer 1 for CaryPact AI supercomputing. Powered by native BOT gas with sub-second finality and sub-cent fees.",
        proTip: "BSC (BEP-20) is recommended for most users due to rapid 3-second block finality and transaction fees under $0.15 compared to Ethereum."
      },
      {
        title: "4. Severe Caution: How to Prevent Sending to the Wrong Network",
        description: "1. Centralized Exchange Warning (Binance, OKX, Bybit, KuCoin): Centralized exchanges only accept deposits on specifically supported networks. If an exchange requires 'USDT-BEP20' or 'USDT-TRC20', DO NOT send directly from your BOT Chain wallet! First use https://bridge.botchain.ai/ to bridge your BOT Chain USDT back to BSC (BEP-20), and then deposit from your BSC wallet into the exchange.\n2. Always verify your wallet's active network header before submitting any transaction.\n3. Address Match Trap: In EVM wallets (MetaMask, TokenPocket), your public address (0x...) is often identical across Ethereum, BSC, and BOT Chain. Having the same address does NOT mean the funds are on the same network! You must bridge assets across chains to change their network.",
        warning: "Sending BOT Chain tokens directly to a centralized exchange deposit address that does not support BOT Chain native deposits will cause your funds to be permanently lost or stuck in exchange custodial vaults."
      },
      {
        title: "5. Step-by-Step Guide to Bridging Assets (https://bridge.botchain.ai/)",
        description: "1. Open the official bridge portal at https://bridge.botchain.ai/ in your Web3 browser.\n2. Connect your wallet (BO Wallet, MetaMask, Trust Wallet, or TokenPocket).\n3. Select your Source Network (e.g. BSC / BNB Smart Chain) and Target Network (BOT Chain).\n4. Select the asset to bridge (e.g. USDT) and specify the amount.\n5. Click 'Approve Token' to permit the bridge smart contract to process the transfer.\n6. Confirm the cross-chain swap transaction. Decentralized relayers validate the lock-and-mint action within 1 to 3 minutes.\n7. Switch your wallet network to BOT Chain (Chain ID 1918) to view your bridged USDT balance.",
        proTip: "Golden Rule: Always perform a small test transfer (e.g. 10 USDT) before bridging large amounts to verify network endpoints and destination wallet addresses.",
        videoTutorial: {
          number: 1,
          title: "How To Download Tokenpocket Web3 Wallet For CaryPact",
          url: "https://vt.tiktok.com/ZSXacS6jC/",
          platform: "TikTok"
        }
      }
    ],
    keyTakeaways: [
      "Different blockchains (Bitcoin, Ethereum, BSC, BOT Chain) cannot directly communicate without a cross-chain bridge.",
      "The official portal to bridge assets safely between BSC/Ethereum and BOT Chain is https://bridge.botchain.ai/.",
      "Never send BOT Chain tokens directly to centralized exchange deposit addresses without first bridging back to BSC (BEP-20).",
      "Identical 0x... wallet addresses across EVM chains do not share balances; cross-chain bridging is required to transfer value.",
      "Always execute a small test transaction first to ensure full peace of mind."
    ]
  },
  {
    id: "buy-computing-power",
    slug: "buy-computing-power",
    title: "How to Purchase Computing Power (Hashrate Units)",
    topicId: "network-transactions",
    topicTitle: "Network & Transactions",
    category: "Network & Transactions",
    readTime: "6 min read",
    difficulty: "Intermediate",
    videoDuration: "5:10",
    tutorialVideos: [
      { number: 4, title: "How To Buy Hashrate For $CA token Mining", url: "https://vt.tiktok.com/ZSXacsE6S/", platform: "TikTok" },
      { number: 5, title: "How To Calculate Daily Rewards From Mining $CA Token", url: "https://vt.tiktok.com/ZSXacUSfs/", platform: "TikTok" }
    ],
    summary: "Deep dive into Hashrate Units: 1 USDT = 1 Unit, minimum 100 USDT, daily 16,800 CA distribution pool, transaction gas estimation, and the permanent allocation rule.",
    steps: [
      {
        title: "1. Understand the 1:1 Hashrate Unit Model & Permanence Rule",
        description: "When you contribute 100 USDT (or higher), the smart contract permanently mints 100 Hashrate Units to your address. This grants a perpetual proportional share of the 16,800 CA daily mining pool.",
        warning: "CRITICAL: Computing power purchases are PERMANENT. There is no principal withdrawal or exit mechanism for hashrate once activated. Only participate with capital you intend to commit long-term."
      },
      {
        title: "2. Connect Wallet to CaryPact DApp",
        description: "Open the CaryPact portal, navigate to the 'Computing Power' section, and verify your wallet is connected to BOT Chain with sufficient USDT and a small BOT gas balance.",
        videoTutorial: {
          number: 3,
          title: "How To Register On CaryPact",
          url: "https://vt.tiktok.com/ZSXacJHg2/",
          platform: "TikTok"
        }
      },
      {
        title: "3. Enter USDT Amount (Minimum 100 USDT) & Approve Spend",
        description: "Input your desired USDT allocation (multiples of 100 USDT). Click 'Approve USDT' and sign the transaction in your wallet. Wait for the approval confirmation on-chain.",
        proTip: "The compounding time factor (K ≈ 1.01/day) mathematically rewards sustained early network participation.",
        videoTutorial: {
          number: 4,
          title: "How To Buy Harshrate For $CA token Mining",
          url: "https://vt.tiktok.com/ZSXacsE6S/",
          platform: "TikTok"
        }
      },
      {
        title: "4. Confirm Purchase Transaction & Gas Parameters",
        description: "Click 'Confirm Purchase' and authorize the contract transaction. The BOT Chain network processes the transaction within seconds at negligible gas costs.",
        videoTutorial: {
          number: 4,
          title: "How To Buy Harshrate For $CA token Mining",
          url: "https://vt.tiktok.com/ZSXacsE6S/",
          platform: "TikTok"
        }
      },
      {
        title: "5. Monitor Daily T+1 Mining Reward Settlement",
        description: "Your Hashrate Units are activated immediately and will begin calculating output on the next daily settlement cycle (00:00 UTC) from the 16,800 CA mining pool.",
        videoTutorial: {
          number: 5,
          title: "How To Calculate Daily Rewards From Mining $CA Token",
          url: "https://vt.tiktok.com/ZSXacUSfs/",
          platform: "TikTok"
        }
      }
    ],
    keyTakeaways: [
      "1 USDT = 1 Hashrate Unit (Permanent allocation, no principal refund).",
      "Daily mining pool contains 16,800 CA (42% of 40,000 daily release).",
      "Your daily CA reward = (Your Hashrate / Total Network Hashrate) × Pool × Time Coefficient."
    ]
  },
  {
    id: "network-parameters-gas",
    slug: "network-parameters-gas",
    title: "BOT Chain Network Parameters, Gas Fees & Transaction Status",
    topicId: "network-transactions",
    topicTitle: "Network & Transactions",
    category: "Network & Transactions",
    readTime: "4 min read",
    difficulty: "Beginner",
    tutorialVideos: [
      { number: 8, title: "The Tokenomics of $CA and how to check on botscan", url: "https://vt.tiktok.com/ZSXa3td8n/", platform: "TikTok" }
    ],
    summary: "Understand network parameters, gas fees, RPC endpoints, Chain ID, 1.50% native gas burn mechanics, block explorer confirmations, and how to verify transaction status.",
    steps: [
      {
        title: "1. Official BOT Chain Network Parameters",
        description: "Network Name: BOT Chain | Chain ID: 1918 | Currency Symbol: BOT | Primary RPC: https://rpc.botchain.ai | Block Explorer: https://scan.botchain.ai.",
        proTip: "BOT Chain features 3-second block times and sub-cent transaction costs.",
        videoTutorial: {
          number: 2,
          title: "How To Install Botchain and add the $CA & $USDT Contracts",
          url: "https://vt.tiktok.com/ZSXacF78K/",
          platform: "TikTok"
        }
      },
      {
        title: "2. Understanding the 1.50% Native Gas Burn",
        description: "Every single transaction executed on BOT Chain burns 1.50% of the gas fee automatically at the protocol level, creating structural deflation as network usage scales.",
      },
      {
        title: "3. Checking Transaction Status & Verifying Hashes",
        description: "If a transaction is pending or you need proof of transfer, copy your transaction hash (TxID) and paste it into the BOT Chain Block Explorer to view block height, gas used, and confirmation timestamp.",
        videoTutorial: {
          number: 8,
          title: "The Tokenomics of $CA and how to check on botscan",
          url: "https://vt.tiktok.com/ZSXa3td8n/",
          platform: "TikTok"
        }
      }
    ],
    keyTakeaways: [
      "Chain ID 1918 is the official identifier for BOT Chain Layer 1.",
      "1.50% of all transaction fees are permanently burned from total BOT supply.",
      "All transfers, swaps, and hashrate activations are publicly verifiable on scan.botchain.ai."
    ]
  },
  {
    id: "stake-ca",
    slug: "stake-ca",
    title: "How to Stake CA (Flexible vs. Fixed Term Multipliers)",
    topicId: "bridge-defi",
    topicTitle: "Bridge & DeFi",
    category: "Bridge & DeFi",
    readTime: "7 min read",
    difficulty: "Intermediate",
    videoDuration: "6:00",
    tutorialVideos: [
      { number: 6, title: "How To Stake $CA", url: "https://vt.tiktok.com/ZSXa3dSgr/", platform: "TikTok" },
      { number: 7, title: "How To Compound Your Daily Rewards From Staking $CA", url: "https://vt.tiktok.com/ZSXa3f1sM/", platform: "TikTok" }
    ],
    summary: "Learn how the 7,200 CA/day PoS staking pool works, flexible vs fixed terms (30d–360d), multiplier boosts (1.3x to 2.5x), fee buyback inflows, and compounding mechanics.",
    steps: [
      {
        title: "1. Choose Your Staking Strategy: Flexible vs Fixed Terms",
        description: "Select between Flexible Staking (0.2%–0.4% daily, instant unstaking anytime) or Fixed Lockup Terms (30 days = 1.3x multiplier, 90 days = 1.6x multiplier, 180 days = 2.0x multiplier, 360 days = 2.5x multiplier).",
        proTip: "Fixed terms yield significantly higher shares of the daily 7,200 CA pool, but lock principal until term expiration."
      },
      {
        title: "2. Understand the Continuous Reward Pool Inflows",
        description: "Staking rewards are continuously replenished by: 7,200 CA/day base protocol emission + 1.8% from BDEX sell slippage buyback + active pool surplus.",
      },
      {
        title: "3. Allocate CA & Sign the Staking Contract",
        description: "Navigate to the CaryPact Staking portal, enter the amount of CA tokens you wish to stake, select your duration tier, and confirm the transaction in your Web3 wallet.",
        videoTutorial: {
          number: 6,
          title: "How To Stake $CA",
          url: "https://vt.tiktok.com/ZSXa3dSgr/",
          platform: "TikTok"
        }
      },
      {
        title: "4. Review Hypothetical vs Real Return Disclosures",
        description: "Illustrative presentations often model compound figures (e.g. $10k compounding to $400k+ assuming sustained 0.3% price growth). These are purely hypothetical simulations and DO NOT represent guaranteed yields.",
        warning: "Crypto asset prices fluctuate wildly. Staking yield value is directly coupled to CA market pricing.",
        videoTutorial: {
          number: 7,
          title: "How To Compound Your Daily Rewards From Staking $CA",
          url: "https://vt.tiktok.com/ZSXa3f1sM/",
          platform: "TikTok"
        }
      }
    ],
    keyTakeaways: [
      "Flexible staking allows daily withdrawals; fixed terms lock assets for higher multipliers (up to 2.5x).",
      "Funded by 18% base emission (7,200 CA/day) + 1.8% trade slippage buyback fee.",
      "Compound projections must always be evaluated alongside market volatility."
    ]
  },
  {
    id: "ca-to-usdt",
    slug: "ca-to-usdt",
    title: "How to Swap CA - USDT & Cross-Chain Bridging",
    topicId: "bridge-defi",
    topicTitle: "Bridge & DeFi",
    category: "Bridge & DeFi",
    readTime: "5 min read",
    difficulty: "Intermediate",
    videoDuration: "4:40",
    summary: "Complete walkthrough of using BDEX and CaryPact SWAP, navigating the 5% sell slippage (1.8% buyback burn + 3.2% node rewards), and bridging swapped USDT back to BNB Chain, TRON, or Ethereum.",
    steps: [
      {
        title: "1. Navigate to BDEX or CaryPact SWAP",
        description: "Connect your wallet to BDEX and select the CA / USDT trading pair. Ensure your wallet has sufficient BOT for the gas fee.",
      },
      {
        title: "2. Account for the 5% Sell Slippage Mechanism",
        description: "Every sell order of CA automatically routes 1.8% to the buyback & burn engine (reducing circulating supply permanently) and 3.2% to node operators and liquidity keepers.",
        proTip: "Set your swap tolerance slippage to at least 5.5% in the DEX settings to avoid failed transactions.",
        videoTutorial: {
          number: 8,
          title: "The Tokenomics of $CA and how to check on botscan",
          url: "https://vt.tiktok.com/ZSXa3td8n/",
          platform: "TikTok"
        }
      },
      {
        title: "3. Review Price Impact & Confirm Swap",
        description: "Check the current execution price against the pool depth and confirm. USDT will appear in your wallet instantly upon block finality.",
      },
      {
        title: "4. Access the Official Cross-Chain Bridge",
        description: "To move your swapped USDT from BOT Chain to another network, open the BOT Chain Bridge, select BOT Chain as source and BNB Smart Chain (BEP20) or TRON (TRC20) as destination.",
        warning: "Always verify recipient address on the destination chain. Never bridge directly to an exchange deposit address that requires MEMO tags unless verified."
      },
      {
        title: "5. Confirm Bridge Transaction & Monitor Validator Relayers",
        description: "Submit the bridge transaction. Cross-chain relayers validate the lock-and-mint action within 1 to 5 minutes.",
      }
    ],
    keyTakeaways: [
      "Selling CA incurs a mandatory 5% fee designed to sustain deflation and reward node operators.",
      "1.8% of every sell order permanently burns CA tokens.",
      "Cross-chain bridge enables moving swapped USDT back to Ethereum, BSC, or TRON safely."
    ]
  },
  {
    id: "bot-pledge",
    slug: "bot-pledge",
    title: "How to Stake BOT (BOT Pledge & Auto-Compounding)",
    topicId: "bridge-defi",
    topicTitle: "Bridge & DeFi",
    category: "Bridge & DeFi",
    readTime: "5 min read",
    difficulty: "Beginner",
    videoDuration: "4:15",
    tutorialVideos: [
      { number: 7, title: "How To Compound Your Daily Rewards From Staking $CA", url: "https://vt.tiktok.com/ZSXa3f1sM/", platform: "TikTok" }
    ],
    summary: "Complete guide to BOT Pledge (also called Bot Staking) at app.carypact.com/bot-pledge: stake BOT to earn rewards with flexible entry and exit, 24-hour principal unlocking rule, and automatic daily compounding.",
    steps: [
      {
        title: "1. Stake BOT to Earn Rewards Flexible Entry and Exit, Free Control",
        description: "BOT Pledge allows you to stake native BOT Layer 1 coins to earn daily protocol staking rewards with complete control over your capital. Unlike locked term staking or permanent computing power purchases, you can deposit and request withdrawal at any time.",
        proTip: "Earnings are generated and settled directly in native BOT coins, so there are no DEX trading slippages or token conversion delays."
      },
      {
        title: "2. Basic Rule 1: Stake BOT to Earn Rewards",
        description: "Connect your Web3 wallet (BO Wallet, MetaMask, Trust Wallet, or TokenPocket) to the official CaryPact BOT Pledge portal (app.carypact.com/bot-pledge). Enter your desired BOT staking amount and confirm the on-chain pledge transaction to begin earning.",
      },
      {
        title: "3. Basic Rule 2: 24-Hour Unlocking Period for Released Principal",
        description: "Released principal can be withdrawn at any time. When you initiate a withdrawal in the DApp, the contract initiates an unbonding countdown. After withdrawal, it will be available for claim following a 24-hour unlocking period.",
        warning: "Once you submit a withdrawal request, your principal enters the 24-hour safety unbonding period before you can execute the final on-chain claim to your wallet."
      },
      {
        title: "4. Basic Rule 3: Automatic Compounding Engine",
        description: "Automatic compounding automatically uses the previous day’s principal + daily earnings as the new principal for compounding staking. This continuous geometric reinvestment maximizes long-term yield without requiring daily manual transactions or additional gas fees.",
        proTip: "Compounding continuously over 90, 180, or 365 days significantly amplifies cumulative APY compared to flat non-compounded staking.",
        videoTutorial: {
          number: 7,
          title: "How To Compound Your Daily Rewards From Staking $CA",
          url: "https://vt.tiktok.com/ZSXa3f1sM/",
          platform: "TikTok"
        }
      },
      {
        title: "5. Monitor Daily Payouts & Claim Released Funds",
        description: "Review your active staked BOT, daily compounding returns, and claimable balances anytime directly within the BOT Pledge interface.",
      }
    ],
    keyTakeaways: [
      "Rule 1: Stake BOT to Earn Rewards — flexible entry and exit with free control.",
      "Rule 2: Released principal can be withdrawn anytime, available for claim after a 24-hour unlocking period.",
      "Rule 3: Automatic compounding automatically re-stakes (previous day's principal + daily earnings) as new principal.",
      "Zero swap fees: rewards and principal are denominated directly in native BOT Layer 1 coins."
    ]
  },
  {
    id: "every-earning-method",
    slug: "every-earning-method",
    title: "How-To for Every Earning Method in CaryPact",
    topicId: "project-tools",
    topicTitle: "Project Tools",
    category: "Project Tools",
    readTime: "9 min read",
    difficulty: "Intermediate",
    tutorialVideos: [
      { number: 4, title: "How To Buy Hashrate For $CA token Mining", url: "https://vt.tiktok.com/ZSXacsE6S/", platform: "TikTok" },
      { number: 6, title: "How To Stake $CA", url: "https://vt.tiktok.com/ZSXa3dSgr/", platform: "TikTok" },
      { number: 9, title: "The $BOT Mining Server Benefits", url: "https://vt.tiktok.com/ZSXaT1Wvy/", platform: "TikTok" }
    ],
    summary: "Comprehensive guide to all earning methods in the CaryPact ecosystem: Computing Power Mining, PoS CA Staking, BOT Pledge (Bot Staking), VIP Dynamic Active Rewards, Global Community Pool, Node Dividend Pools, LP Farming, Referral Rebates, and Deflationary Burn Arbitrage.",
    steps: [
      {
        title: "Method 1: Computing Power Mining (16,800 CA / Day)",
        description: "Allocate USDT (min 100 USDT = 100 Hashrate Units) to earn proportional daily CA rewards from the primary 16,800 CA daily pool (42% of total emissions). Rewards scale with your hashrate share and duration coefficient K.",
        proTip: "Permanent hashrate participation builds steady base cash flow independent of staking lockups.",
        videoTutorials: [
          {
            number: 4,
            title: "How To Buy Harshrate For $CA token Mining",
            url: "https://vt.tiktok.com/ZSXacsE6S/",
            platform: "TikTok"
          },
          {
            number: 5,
            title: "How To Calculate Daily Rewards From Mining $CA Token",
            url: "https://vt.tiktok.com/ZSXacUSfs/",
            platform: "TikTok"
          }
        ]
      },
      {
        title: "Method 2: PoS Token Staking (7,200 CA / Day + Multipliers)",
        description: "Stake mined or purchased CA tokens in flexible (0.2%-0.4%/day) or fixed terms (30d = 1.3x, 90d = 1.6x, 180d = 2.0x, 360d = 2.5x). Funded by 18% base emission plus 1.8% of all BDEX sell slippage.",
        videoTutorials: [
          {
            number: 6,
            title: "How To Stake $CA",
            url: "https://vt.tiktok.com/ZSXa3dSgr/",
            platform: "TikTok"
          },
          {
            number: 7,
            title: "How To Compound Your Daily Rewards From Staking $CA",
            url: "https://vt.tiktok.com/ZSXa3f1sM/",
            platform: "TikTok"
          }
        ]
      },
      {
        title: "Method 3: BOT Pledge / Bot Staking (Flexible Entry/Exit + Auto-Compounding)",
        description: "Stake BOT to earn rewards with flexible entry and exit and free control (app.carypact.com/bot-pledge). Released principal can be withdrawn at any time and becomes available for claim after a 24-hour unlocking period. Features automatic compounding that uses previous day’s principal + daily earnings as the new principal.",
        proTip: "Ideal for holders seeking liquid Layer 1 coin staking without fixed-term commitments and with zero DEX swap friction.",
        videoTutorial: {
          number: 7,
          title: "How To Compound Your Daily Rewards From Staking $CA",
          url: "https://vt.tiktok.com/ZSXa3f1sM/",
          platform: "TikTok"
        }
      },
      {
        title: "Method 4: VIP Dynamic Active Rewards (14,000 CA / Day)",
        description: "Earn active rewards across V1 through V5 tiers by building community computing power and direct referrals. 35% of daily release (14,000 CA) is allocated to dynamic active contributors.",
      },
      {
        title: "Method 5: Global Community Pool (2,000 CA / Day)",
        description: "Top community leaders and qualifying nodes share in the 5% daily global emission reserve (2,000 CA/day), distributed as perpetual passive ecosystem dividends.",
      },
      {
        title: "Method 6: Node Dividend Pools (3.2% BDEX Sell Slippage)",
        description: "Node operators and qualified holders receive proportional distributions from the 3.2% fee levied on every CA sell order on decentralized exchanges. Physical server operators also share in commercial task execution fees.",
        videoTutorial: {
          number: 9,
          title: "The $BOT Mining Server Benefits",
          url: "https://vt.tiktok.com/ZSXaT1Wvy/",
          platform: "TikTok"
        }
      },
      {
        title: "Method 7: BDEX Liquidity Provider (LP) Farming",
        description: "Provide CA/USDT liquidity pairs on BDEX to earn a share of 0.3% protocol trading fees plus bonus LP yield farming allocations.",
      },
      {
        title: "Method 8: Ecosystem Referral Rebates & Node Expansion",
        description: "Share your verified invitation link to earn direct computing power rebate percentages and acceleration credits as your invited members activate hashrate.",
      },
      {
        title: "Method 9: Deflationary Burn Arbitrage",
        description: "Participate in supply reduction value capture: 1.8% of every sell order and 1.50% of all BOT gas fees are permanently removed from circulation.",
        videoTutorial: {
          number: 8,
          title: "The Tokenomics of $CA and how to check on botscan",
          url: "https://vt.tiktok.com/ZSXa3td8n/",
          platform: "TikTok"
        }
      }
    ],
    keyTakeaways: [
      "Total daily release is capped at 40,000 CA tokens across all mining, staking, and community pools.",
      "BOT Pledge provides native BOT yield with flexible 24-hour principal unlock and automatic compounding.",
      "Combining Computing Power (base production) with Staking Multipliers (yield optimization) maximizes ecosystem utility.",
      "Node operators earn steady fee flow from global exchange volume via the 3.2% dividend pool."
    ]
  },
  {
    id: "project-tools-operations",
    slug: "project-tools-operations",
    title: "Multisite Accounts, Permissions & Project Operations",
    topicId: "project-tools",
    topicTitle: "Project Tools",
    category: "Project Tools",
    readTime: "5 min read",
    difficulty: "Advanced",
    summary: "Set up multisite accounts, permissions and project operations — managing multiple addresses, affiliate team links, smart contract interaction approvals, and validator operations.",
    steps: [
      {
        title: "1. Multisite Address Management & Portfolio Segregation",
        description: "Operate separate addresses for community leadership, validator rewards, and personal staking portfolios to ensure clean accounting and enhanced security isolation.",
      },
      {
        title: "2. Permission Management & Smart Contract Allowances",
        description: "Use permission management tools on the BOT Chain explorer to inspect contract allowances, set exact spend caps instead of infinite approvals, and revoke legacy authorizations.",
        warning: "Never share private keys across team members. Use multi-signature wallets for shared community treasuries."
      },
      {
        title: "3. Invitation Code & Community Expansion Tools",
        description: "Access the CaryPact ambassador portal to generate and manage team referral links, track team hashrate thresholds, and monitor VIP tier progression.",
      }
    ],
    keyTakeaways: [
      "Organize team operations with separate addresses for community pools and staking.",
      "Audit contract permissions regularly to maintain tight security posture.",
      "Leverage the ambassador dashboard to track real-time team hashrate activation."
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