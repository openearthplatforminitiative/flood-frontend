import { getSiteForUser } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const { id: siteId } = await params;

  if (!userId) redirect('/');

  try {
    const site = await getSiteForUser(userId, siteId);
    if (!site) {
      throw new Error('Site not found');
    }
    return NextResponse.json(site);
  } catch (error) {
    console.error('Error fetching site:', error);
    return NextResponse.json(
      { error: 'Internal server error ' },
      { status: 500 }
    );
  }
}
