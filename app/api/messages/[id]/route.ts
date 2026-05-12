/**
 * Individual Message API Route
 * Handles message deletion
 */

import { NextRequest, NextResponse } from 'next/server';

// Shared message storage (in production, use a database)
const getMessages = () => {
  if (typeof global.messages === 'undefined') {
    global.messages = [];
  }
  return global.messages;
};

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const messages = getMessages();
    
    const index = messages.findIndex((m: any) => m.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    messages.splice(index, 1);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}
