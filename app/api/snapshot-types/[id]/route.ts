import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { snapshotType } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const type = await db.query.snapshotType.findFirst({
      where: eq(snapshotType.id, parseInt(params.id)),
      with: {
        snapshots: true,
      },
    });
    
    if (!type) {
      return NextResponse.json({ error: 'Snapshot type not found' }, { status: 404 });
    }
    
    return NextResponse.json(type);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch snapshot type' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = await db
      .update(snapshotType)
      .set(body)
      .where(eq(snapshotType.id, parseInt(params.id)))
      .returning();
    
    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update snapshot type' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db
      .delete(snapshotType)
      .where(eq(snapshotType.id, parseInt(params.id)));
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete snapshot type' }, { status: 500 });
  }
}