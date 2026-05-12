/**
 * Latest Location API Route
 * Public endpoint to get the most recent location
 */

import { NextRequest, NextResponse } from 'next/server';

// Type definition for global locations
declare global {
  var locations: any[] | undefined;
}

// Shared location storage
const getLocations = () => {
  if (typeof global.locations === 'undefined') {
    global.locations = [];
  }
  return global.locations;
};

export async function GET(request: NextRequest) {
  try {
    const locations = getLocations();
    
    if (locations.length === 0) {
      return NextResponse.json(
        { error: 'No location data available' },
        { status: 404 }
      );
    }

    // Get the most recent location
    const sortedLocations = [...locations].sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    const latestLocation = sortedLocations[0];
    
    return NextResponse.json(latestLocation);
  } catch (error) {
    console.error('Error fetching latest location:', error);
    return NextResponse.json(
      { error: 'Failed to fetch location' },
      { status: 500 }
    );
  }
}
