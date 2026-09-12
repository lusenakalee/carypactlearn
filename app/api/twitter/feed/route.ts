import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const tweets = [
      {
        id: "1894001",
        author: "CaryPact Official",
        handle: "@CaryPact",
        avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
        verified: true,
        date: "2 hours ago",
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        content: "🚀 Global Consensus Summit Highlights: Over 4,000 in-person attendees and 350,000+ community nodes participating globally! The decentralized AI supercomputing power network is accelerating on BOT Chain mainnet.\n\n🔗 Official Portal: https://app.carypact.com\n#CaryPact #BOTChain #DecentralizedAI #Web3Computing",
        likes: 1240,
        retweets: 488,
        replies: 156,
        views: "42.8K",
        url: "https://x.com/CaryPact",
        category: "Consensus",
        badge: "Official Announcement",
      },
      {
        id: "1894002",
        author: "CaryPact Official",
        handle: "@CaryPact",
        verified: true,
        date: "14 hours ago",
        timestamp: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
        content: "📊 Real-Time Metric Notice: The conversion parity 1 CA = 27.00522 BOT is fully tracked on-chain. BDEX liquidity depth has exceeded $18.4M with the 1.8% automated buyback burn systematically reducing circulating supply.",
        likes: 980,
        retweets: 312,
        replies: 89,
        views: "31.2K",
        url: "https://x.com/CaryPact",
        category: "Tokenomics",
        badge: "On-Chain Metrics",
      },
      {
        id: "1894003",
        author: "CaryPact Official",
        handle: "@CaryPact",
        verified: true,
        date: "1 day ago",
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        content: "⚡ Hashrate Unit Activation Rule: 1 USDT = 1 Computing Power Unit (min 100 USDT). Hashrate units are permanently allocated to computing clusters to produce daily CA output. Ensure you safely backup your 12-word seed phrase.",
        likes: 1540,
        retweets: 620,
        replies: 210,
        views: "54.1K",
        url: "https://x.com/CaryPact",
        category: "Education",
        badge: "Security & Rules",
      },
      {
        id: "1894004",
        author: "CaryPact Official",
        handle: "@CaryPact",
        verified: true,
        date: "2 days ago",
        timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
        content: "🌐 Cross-Chain Bridge v2 Upgrade is now live! Seamlessly transfer USDT and BOT assets across BNB Chain, Ethereum, and BOT Chain with sub-2 minute finality and enhanced threshold security.",
        likes: 890,
        retweets: 245,
        replies: 74,
        views: "28.6K",
        url: "https://x.com/CaryPact",
        category: "Product",
        badge: "Infrastructure",
      },
      {
        id: "1894005",
        author: "CaryPact Official",
        handle: "@CaryPact",
        verified: true,
        date: "3 days ago",
        timestamp: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
        content: "🏆 VIP Consensus Milestone: Congratulations to our regional studio leaders reaching V7–V10 tier consensus. Over 1,500 physical hubs and learning studios are now actively training users across 55 countries!",
        likes: 2110,
        retweets: 840,
        replies: 340,
        views: "68.9K",
        url: "https://x.com/CaryPact",
        category: "Community",
        badge: "Consensus Network",
      }
    ];

    return NextResponse.json({
      success: true,
      profile: {
        name: "CaryPact Official",
        handle: "@CaryPact",
        url: "https://x.com/CaryPact",
        followers: "128.5K",
        following: "42",
        tweetsCount: "1,420",
        bio: "Decentralized AI Supercomputing Consensus Protocol on BOT Chain. High-throughput computing resource coordination. Total Supply: 210M CA.",
      },
      tweets,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}
