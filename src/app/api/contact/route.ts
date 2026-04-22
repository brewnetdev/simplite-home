import { NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/google-sheets';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, ...data } = body;
    const timestamp = new Date().toISOString();

    if (type === 'sales') {
      const row = [
        timestamp,
        data.name || '',
        data.company || '',
        data.email || '',
        data.phone || '',
        data.products || '',
        data.size || '',
        data.plan || '',
        data.message || '',
      ];
      await appendToSheet('Sales', [row]);
    } else if (type === 'dev') {
      const row = [
        timestamp,
        data.name || '',
        data.email || '',
        data.target || '',
        data.topic || '',
        data.issue_url || '',
        data.message || '',
      ];
      await appendToSheet('Dev', [row]);
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
