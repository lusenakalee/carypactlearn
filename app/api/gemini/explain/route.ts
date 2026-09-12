import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { question, language = "en" } = await req.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Missing question parameter" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Graceful fallback if API key is not configured in local environment
      return NextResponse.json({
        answer: `CaryPact is a decentralized supercomputing protocol running on BOT Chain. Total CA supply is 210M with a 22-year emission schedule (40,000 CA released daily, decreasing 10% every 2 years). Computing power is purchased at 1 USDT = 1 Hashrate Unit (minimum 100 USDT) and is permanent with no principal exit. Staking offers flexible and term lockups (30d to 360d with 1.3x to 2.5x multipliers). All CA selling incurs a 5% slippage (1.8% buyback & burn, 3.2% node operators). Please review all risk disclosures before participating.`,
        grounded: true,
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemPrompt = `You are the lead educational AI tutor for the CaryPact Learning Hub.
Your objective is to provide objective, clear, highly accurate, and balanced educational answers about CaryPact, BOT Chain, CA Token, and decentralized supercomputing.

Confirmed Ecosystem Facts:
1. BOT Chain: Layer 1 public chain tailored for AI Agent identity and decentralized computing. Features Mainnet, Explorer, Cross-Chain Bridge, BO Wallet, BDEX. $15M Seed round completed (NIX Foundation, Alpha Capital, Gemhead Capital), $50M strategic expansion. 55+ countries, 350,000+ users, 1,500 office network.
2. CA Token: 210 Million total supply (10M SWAP liquidity, 200M emissions over 22 years). Initial 40,000 CA daily emission (split: 42% Mining, 35% Active pool, 18% PoS staking, 3% DAO, 2% Foundation). Reduced 10% every 2 years.
3. Computing Power / Mining: 1 USDT = 1 Hashrate Unit, min 100 USDT. Purchase is PERMANENT (no principal withdrawal). Daily pool: 16,800 CA.
4. Staking: Flexible (0.2%–0.4% daily) vs Fixed Terms (30d x1.3, 90d x1.6, 180d x2.0, 360d x2.5). Funded by 7,200 CA/day PoS + 1.8% sell slippage buyback. Note: High compounding projections shown in presentations are hypothetical and based on price growth assumptions, not guaranteed.
5. BDEX Slippage: 5% total on CA sell (1.8% buyback & burn, 3.2% node operators).
6. VIP Active Rewards: 10-tier referral downline structure (V1–V10) requiring 300 USDT personal investment + team leg volume. Explain this structure neutrally as a referral incentive system.
7. Risk Disclosure: Always maintain an educational tone, remind users about crypto market volatility, and emphasize DYOR (Do Your Own Research).

Respond in the user's requested language (${language}) in 2-3 concise, well-structured, scannable paragraphs with bullet points if helpful.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: `${systemPrompt}\n\nUser Question: ${question}` }] }
      ],
    });

    return NextResponse.json({
      answer: response.text || "No response generated.",
      grounded: true,
    });
  } catch (error: any) {
    console.error("Gemini explain error:", error);
    return NextResponse.json({
      answer: "CaryPact is a decentralized supercomputing protocol on BOT Chain. Total CA supply is 210M, starting at 40,000 CA daily emission. Hashrate is 1 USDT = 1 Unit (permanent, no exit). Always review risk disclosures and tokenomics before allocating assets.",
      fallback: true,
    });
  }
}
