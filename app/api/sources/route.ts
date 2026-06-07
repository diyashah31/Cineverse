import { NextResponse } from "next/server";

const DEFAULT_SOURCES = [
  { source_id: 203, name: "Netflix" },
  { source_id: 26, name: "Prime Video" },
  { source_id: 15, name: "Hulu" },
  { source_id: 390, name: "Disney+" },
  { source_id: 384, name: "HBO" },
  { source_id: 371, name: "Apple TV+" },
];

export async function GET() {
  return NextResponse.json(DEFAULT_SOURCES);
}
