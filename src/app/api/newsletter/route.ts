import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const existing = await db.newsletterSubscription.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { success: true, message: "You're already subscribed! Stay buzzed ☕" },
        { status: 200 }
      );
    }

    await db.newsletterSubscription.create({
      data: { email },
    });

    return NextResponse.json(
      { success: true, message: "Welcome to the NBC family! Stay buzzed ☕" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
