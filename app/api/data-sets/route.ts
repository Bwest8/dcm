import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { dataSet } from '@/lib/schema';

export async function GET() {
  try {
    const dataSets = await db.query.dataSet.findMany({
      with: {
        domain: true,
      },
    });
    return NextResponse.json(dataSets);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data sets' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newDataSet = await db.insert(dataSet).values(body).returning();
    return NextResponse.json(newDataSet[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create data set' }, { status: 500 });
  }
}