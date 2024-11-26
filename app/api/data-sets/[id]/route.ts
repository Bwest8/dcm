import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { dataSet } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const item = await db.query.dataSet.findFirst({
      where: eq(dataSet.id, parseInt(params.id)),
      with: {
        domain: true,
      },
    });
    
    if (!item) {
      return NextResponse.json({ error: 'Data set not found' }, { status: 404 });
    }
    
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data set' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = await db
      .update(dataSet)
      .set(body)
      .where(eq(dataSet.id, parseInt(params.id)))
      .returning();
    
    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update data set' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db
      .delete(dataSet)
      .where(eq(dataSet.id, parseInt(params.id)));
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete data set' }, { status: 500 });
  }
}