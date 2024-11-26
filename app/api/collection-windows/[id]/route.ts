import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { collectionWindow } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const window = await db.query.collectionWindow.findFirst({
      where: eq(collectionWindow.id, parseInt(params.id)),
      with: {
        schoolYear: true,
        collections: true,
      },
    });
    
    if (!window) {
      return NextResponse.json({ error: 'Collection window not found' }, { status: 404 });
    }
    
    return NextResponse.json(window);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch collection window' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = await db
      .update(collectionWindow)
      .set(body)
      .where(eq(collectionWindow.id, parseInt(params.id)))
      .returning();
    
    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update collection window' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db
      .delete(collectionWindow)
      .where(eq(collectionWindow.id, parseInt(params.id)));
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete collection window' }, { status: 500 });
  }
}