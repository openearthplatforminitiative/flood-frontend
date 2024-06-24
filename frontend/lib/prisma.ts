import { PrismaClient, User } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Link: https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prevent-hot-reloading-from-creating-new-instances-of-prismaclient

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function getOrCreateUser(userId: string): Promise<User> {
  let user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        id: userId,
      },
    });
  }

  if (!user) {
    throw new Error('User not found and faild to create');
  }

  return user;
}

export async function getUser(userId: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function getUserIncludingSites(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      sites: true,
    },
  });
}

export async function getSiteForUser(userId: string, siteId: string) {
  return await prisma.site.findFirst({
    where: {
      id: siteId,
      userId,
    },
  });
}
