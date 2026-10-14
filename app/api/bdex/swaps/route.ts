import { NextResponse } from "next/server";
import { getCaHistory } from "@/lib/ca-history";

export async function GET() {
  return NextResponse.json(await getCaHistory());
}