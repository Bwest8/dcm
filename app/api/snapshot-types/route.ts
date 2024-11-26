import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { snapshotType } from '@/lib/schema';

export async function GET() {
  try {
    const types = await db.query.snapshotType.findMany({
      with: {
        snapshots: true,
      },
    });
    return NextResponse.json(types);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch snapshot types' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newType = await db.insert(snapshotType).values(body).returning();
    return NextResponse.json(newType[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create snapshot type' }, { status: 500 });
  }
}