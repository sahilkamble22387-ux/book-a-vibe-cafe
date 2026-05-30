import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, date, time, guests, type, message } = body;

    if (!name || !email || !phone || !date || !time) {
      return NextResponse.json(
        { error: 'Name, email, phone, date, and time are required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Map type string to a valid value
    const typeMap: Record<string, string> = {
      'Cafe Visit': 'cafe',
      'Co-working': 'coworking',
      Event: 'event',
    };
    const typeValue = typeMap[type] || 'cafe';

    await db.reservation.create({
      data: {
        name,
        email,
        phone,
        date,
        time,
        guests: parseInt(String(guests), 10) || 1,
        type: typeValue,
        message: message || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Reservation submitted successfully!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reservation form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
