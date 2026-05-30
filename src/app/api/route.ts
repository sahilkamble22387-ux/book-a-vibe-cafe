import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    brand: "Nothing Before Coffee",
    tagline: "Bring on the Buzz",
    version: "1.0.0",
  });
}
