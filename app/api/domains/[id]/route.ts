import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { domain } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const item = await db.query.domain.findFirst({
      where: eq(domain.id, parseInt(params.id)),
      with: {
        templates: true,
      },
    });
    
    if (!item) {
      return NextResponse.json({ error: 'Domain not found' }, { status: 404 });
    }
    
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch domain' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updated = await db
      .update(domain)
      .set(body)
      .where(eq(domain.id, parseInt(params.id)))
      .returning();
    
    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update domain' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await db
      .delete(domain)
      .where(eq(domain.id, parseInt(params.id)));
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete domain' }, { status: 500 });
  }
}