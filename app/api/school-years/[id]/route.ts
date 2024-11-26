import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { schoolYear } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const year = await db.query.schoolYear.findFirst({
      where: eq(schoolYear.id, parseInt(params.id)),
      with: {
        collectionWindows: true,
        snapshots: true,
      },
    });
    
    if (!year) {
      return NextResponse.json({ error: 'School year not found' }, { status: 404 });
    }
    
    return NextResponse.json(year);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch school year' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = await db
      .update(schoolYear)
      .set(body)
      .where(eq(schoolYear.id, parseInt(params.id)))
      .returning();
    
    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update school year' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db
      .delete(schoolYear)
      .where(eq(schoolYear.id, parseInt(params.id)));
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete school year' }, { status: 500 });
  }
}