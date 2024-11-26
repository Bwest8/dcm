import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collection } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const item = await db.query.collection.findFirst({
      where: eq(collection.id, parseInt(params.id)),
      with: {
        domain: true,
        collectionWindow: true,
      },
    });
    
    if (!item) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }
    
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = await db
      .update(collection)
      .set(body)
      .where(eq(collection.id, parseInt(params.id)))
      .returning();
    
    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update collection' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db
      .delete(collection)
      .where(eq(collection.id, parseInt(params.id)));
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete collection' }, { status: 500 });
  }
}