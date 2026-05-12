/**
 * Location Tracking API Route
 * Stores device location data
 */

import { NextRequest, NextResponse } from 'next/server';

// Type definition for global locations
declare global {
  var locations: any[] | undefined;
}

// Shared location storage (in production, use a database)
const getLocations = () => {
  if (typeof global.locations === 'undefined') {
    global.locations = [];
  }
  return global.locations;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { latitude, longitude, accuracy, timestamp, address } = body;

    // Validate required fields
    if (latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    const locations = getLocations();
    
    // Create new location entry
    const newLocation = {
      id: `loc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      latitude,
      longitude,
      accuracy: accuracy || 0,
      timestamp: timestamp || Date.now(),
      address: address || null,
      createdAt: new Date().toISOString(),
    };

    locations.push(newLocation);

    // Keep only last 1000 locations to prevent memory issues
    if (locations.length > 1000) {
      locations.shift();
    }

    console.log('Location tracked:', {
      lat: latitude,
      lon: longitude,
      accuracy,
      address: address || 'Unknown',
    });

    return NextResponse.json(newLocation, { status: 201 });
  } catch (error) {
    console.error('Error storing location:', error);
    return NextResponse.json(
      { error: 'Failed to store location' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const locations = getLocations();
    
    // Return locations sorted by newest first
    const sortedLocations = [...locations].sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    // Get query params for filtering
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    
    return NextResponse.json(sortedLocations.slice(0, limit));
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}
