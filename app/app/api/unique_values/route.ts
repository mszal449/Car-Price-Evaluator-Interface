import { NextResponse } from "next/server";
import uniqueValues from "@/public/unique_values.json";

export async function GET() {
  return NextResponse.json(uniqueValues);
}
