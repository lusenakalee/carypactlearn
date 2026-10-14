import { NextResponse } from "next/server";
import { getCaPrice } from "@/lib/ca-price";

export async function GET() {
  return NextResponse.json(await getCaPrice());
}