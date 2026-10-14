import { NextResponse } from "next/server";
import { getPoolResponse } from "@/lib/bdex-pool";

export async function GET() {
  return NextResponse.json(await getPoolResponse());
}