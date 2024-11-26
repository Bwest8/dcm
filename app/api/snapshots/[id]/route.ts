import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { snapshot } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const item = await db.query.snapshot.findFirst({
      where: eq(snapshot.id, parseInt(params.id)),
      with: {
        snapshotType: true,
      },
    });
    
    if (!item) {
      return NextResponse.json({ error: 'Snapshot not found' }, { status: 404 });
    }
    
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch snapshot' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db
      .delete(snapshot)
      .where(eq(snapshot.id, parseInt(params.id)));
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete snapshot' }, { status: 500 });
  }
}