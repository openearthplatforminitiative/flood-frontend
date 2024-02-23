import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createKeycloakUser, fetchAccessToken } from '@/utils/user-utils';

export async function POST(request: NextRequest) {
  try {
    const accessToken = await fetchAccessToken()
      .then((res) => res.json())
      .then((res) => res.access_token);
    const newUser = await request.json();
    if (!newUser) {
      throw NextResponse.json({
        error: 'Missing user data in body ',
        status: 400,
      });
    }

    console.log('User: ', newUser);
    await createKeycloakUser(accessToken, newUser);

    const result = await prisma.user.create({
      data: {
        ...newUser,
        sites: {
          create: newUser.sites,
        },
      },
    });

    return NextResponse.json({
      message: 'User created',
      status: 200,
      result,
    });
  } catch (error) {
    console.error(error);
    throw NextResponse.json(
      { error: 'Internal server error ' },
      { status: 500 }
    );
  }
}

export async function GET(_: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({
      message: 'Users retrieved successfully',
      status: 200,
      users,
    });
  } catch (error) {
    console.error(error);
    throw NextResponse.json(
      { error: 'Internal server error ' },
      { status: 500 }
    );
  }
}
