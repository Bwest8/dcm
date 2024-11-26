import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { schoolYear } from '@/lib/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const years = await db.query.schoolYear.findMany({
      with: {
        collectionWindows: true,
        snapshots: true,
      },
      orderBy: desc(schoolYear.schoolYear),
    });
    return NextResponse.json(years);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch school years' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newYear = await db.insert(schoolYear).values({
      ...body,
      createdAt: new Date(),
    }).returning();
    return NextResponse.json(newYear[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create school year' }, { status: 500 });
  }
}