/**
 * Local API fallback handler
 * Serves data from local storage when backend is unavailable
 */

import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Local API is active',
    timestamp: new Date().toISOString()
  });
}
