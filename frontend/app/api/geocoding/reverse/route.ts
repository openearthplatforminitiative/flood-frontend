import { NextRequest, NextResponse } from 'next/server';
import { geocoderClient } from '@/lib/openepi-clients';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get('lat'));
  const lon = Number(searchParams.get('lon'));

  try {
    const result = await geocoderClient.getReverseGeocoding({ lon, lat });
    const { data } = result;
    return NextResponse.json({
      data: data,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error ' },
      { status: 500 }
    );
  }
}
