import { NextResponse } from 'next/server';
import {
  buildSalesMessage,
  buildDevMessage,
  sendToSlack,
  type SalesPayload,
  type DevPayload,
} from '@/lib/slack';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, ...data } = body;
    const timestamp = new Date().toISOString();

    if (type === 'sales') {
      await sendToSlack(buildSalesMessage(data as SalesPayload, timestamp));
    } else if (type === 'dev') {
      await sendToSlack(buildDevMessage(data as DevPayload, timestamp));
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
