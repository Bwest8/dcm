import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { domain } from '@/lib/schema';

export async function GET() {
  try {
    const domains = await db.query.domain.findMany({
      with: {
        templates: true,
      },
    });
    return NextResponse.json(domains);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch domains' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newDomain = await db.insert(domain).values(body).returning();
    return NextResponse.json(newDomain[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create domain' }, { status: 500 });
  }
}