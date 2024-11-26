import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { template } from '@/lib/schema';

export async function GET() {
  try {
    const templates = await db.query.template.findMany({
      with: {
        domain: true,
        collectionTemplates: true,
      },
    });
    return NextResponse.json(templates);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newTemplate = await db.insert(template).values(body).returning();
    return NextResponse.json(newTemplate[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create template' }, { status: 500 });
  }
}