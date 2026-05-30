import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, phone, email, date, time, guests, type } = body;

    // Validate required fields
    if (!name || !phone || !email || !date || !time || !guests || !type) {
      return NextResponse.json(
        { error: 'All required fields must be provided.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Validate date is not in the past
    const reservationDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (reservationDate < today) {
      return NextResponse.json(
        { error: 'Reservation date cannot be in the past.' },
        { status: 400 }
      );
    }

    // Save to database
    const reservation = await db.reservation.create({
      data: {
        name,
        phone,
        email,
        date,
        time,
        guests,
        type,
        specialRequests: body.specialRequests || '',
        status: 'confirmed',
      },
    });

    return NextResponse.json(
      {
        message: 'Reservation confirmed successfully!',
        reservation,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to process reservation. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const reservations = await db.reservation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({ reservations });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch reservations.' },
      { status: 500 }
    );
  }
}
