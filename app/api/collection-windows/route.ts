import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collectionWindow } from '@/lib/schema';

export async function GET() {
  try {
    const windows = await db.query.collectionWindow.findMany({
      with: {
        schoolYear: true,
        collections: true,
      },
    });
    return NextResponse.json(windows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch collection windows' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newWindow = await db.insert(collectionWindow).values(body).returning();
    return NextResponse.json(newWindow[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create collection window' }, { status: 500 });
  }
}