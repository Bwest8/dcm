import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { snapshot } from '@/lib/schema';

export async function GET() {
  try {
    const snapshots = await db.query.snapshot.findMany({
      with: {
        snapshotType: true,
      },
    });
    return NextResponse.json(snapshots);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch snapshots' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newSnapshot = await db.insert(snapshot).values(body).returning();
    return NextResponse.json(newSnapshot[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create snapshot' }, { status: 500 });
  }
}