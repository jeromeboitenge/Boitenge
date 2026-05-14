import { NextResponse } from 'next/server';

declare global {
  var currentLocation: {
    latitude: number;
    longitude: number;
    accuracy: number;
    timestamp: number;
    address?: string;
    createdAt: string;
  } | undefined;
}

export async function GET() {
  if (!global.currentLocation) {
    return NextResponse.json(
      { error: 'No location data available' },
      { status: 404 }
    );
  }

  return NextResponse.json(global.currentLocation);
}
