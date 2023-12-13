import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const newUser = await request.json();
    if (!newUser) {
      throw NextResponse.json({
        error: 'Missing user data in body ',
        status: 400,
      });
    }
    const result = await prisma.user.create({
      data: {
        ...newUser,
        sites: {
          create: newUser.sites,
        },
        accounts: {
          create: newUser.accounts,
        },
        sessions: {
          create: newUser.sessions,
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
