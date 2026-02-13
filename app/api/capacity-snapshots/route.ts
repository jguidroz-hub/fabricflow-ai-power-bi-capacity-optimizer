import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { capacities } from '@/lib/domain-schema';
import { eq, desc } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  // Rate limit: 100 per 15min

  const items = await db.select().from(capacities)
    .where(eq(capacities.userId, session.user.id))
    .orderBy(desc(capacities.createdAt))
    .limit(100);

  return NextResponse.json({ items, count: items.length });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const id = randomUUID();

  const [item] = await db.insert(capacities).values({
    id,
    userId: session.user.id,
    ...body,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();

  return NextResponse.json(item, { status: 201 });
}
