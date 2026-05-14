import { NextRequest, NextResponse } from 'next/server';

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { latitude, longitude, accuracy, address } = body;

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    global.currentLocation = {
      latitude,
      longitude,
      accuracy: accuracy || 0,
      timestamp: Date.now(),
      address: address || undefined,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: 'Location updated successfully',
      location: global.currentLocation,
    });
  } catch (error) {
    console.error('Error updating location:', error);
    return NextResponse.json(
      { error: 'Failed to update location' },
      { status: 500 }
    );
  }
}
