import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection } from '@/lib/schema';

export async function GET() {
  try {
    const collections = await db.query.collection.findMany({
      with: {
        domain: true,
        collectionWindow: true,
      },
    });
    return NextResponse.json(collections);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCollection = await db.insert(collection).values(body).returning();
    return NextResponse.json(newCollection[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create collection' }, { status: 500 });
  }
}