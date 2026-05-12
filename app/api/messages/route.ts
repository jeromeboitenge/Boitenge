/**
 * Messages API Route
 * Handles contact form message storage and retrieval
 */

import { NextRequest, NextResponse } from 'next/server';

// Shared message storage (in production, use a database)
const getMessages = () => {
  if (typeof global.messages === 'undefined') {
    global.messages = [];
  }
  return global.messages;
};

export async function GET(request: NextRequest) {
  try {
    const messages = getMessages();
    // Return messages sorted by newest first
    const sortedMessages = [...messages].sort((a: any, b: any) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return NextResponse.json(sortedMessages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const messages = getMessages();
    
    // Create new message
    const newMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      isRead: false,
      createdAt: new Date().toISOString(),
    };

    messages.push(newMessage);

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  }
}
