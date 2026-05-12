/**
 * Mark Message as Read API Route
 * Handles marking messages as read
 */

import { NextRequest, NextResponse } from 'next/server';

// Shared message storage (in production, use a database)
const getMessages = () => {
  if (typeof global.messages === 'undefined') {
    global.messages = [];
  }
  return global.messages;
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const messages = getMessages();
    
    const message = messages.find((m: any) => m.id === id);
    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    message.isRead = true;
    
    return NextResponse.json(message);
  } catch (error) {
    console.error('Error marking message as read:', error);
    return NextResponse.json(
      { error: 'Failed to mark message as read' },
      { status: 500 }
    );
  }
}
