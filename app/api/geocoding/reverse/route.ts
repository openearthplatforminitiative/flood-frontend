import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    const response = await fetch(
      `https://api-test.openepi.io/geocoding/reverse?lat=${lat}&lon=${lon}`
    );
    const product = await response.json();

    return NextResponse.json({
      message: 'Location retrieved successfully',
      status: 200,
      data: product,
    });
  } catch (error) {
    console.error(error);
    throw NextResponse.json(
      { error: 'Internal server error ' },
      { status: 500 }
    );
  }
}
