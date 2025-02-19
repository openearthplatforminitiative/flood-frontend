'use server';

import { getUserId } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function submitPushPermissions(
  allowPushNotifications: boolean,
  allowSMSNotifications: boolean,
) {
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User ID not found in session');
  }
  await prisma.user.update({
    where: { id: userId },
    data: { allowPushNotifications, allowSMSNotifications },
  });
}

export async function createSite(
  name: string,
  types: string[],
  lat: number,
  lng: number,
  radius: number,
  redirectPath?: string
) {
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User ID not found in session');
  }
  await prisma.site.create({
    data: {
      name,
      types,
      lat,
      lng,
      radius,
      userId,
    },
  });
  if (redirectPath) redirect(redirectPath);
}

export async function updateSite(
  siteId: string,
  name: string,
  types: string[],
  lat: number,
  lng: number,
  radius: number,
  redirectPath?: string
) {
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User ID not found in session');
  }
  await prisma.site.update({
    where: { id: siteId, userId },
    data: { name, types, lat, lng, radius },
  });
  if (redirectPath) redirect(redirectPath);
}

export async function deleteSite(siteId: string, redirectPath?: string) {
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User ID not found in session');
  }
  await prisma.site.delete({
    where: { id: siteId, userId },
  });
  if (redirectPath) redirect(redirectPath);
}

export async function completeOnboarding() {
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User ID not found in session');
  }
  await prisma.user.update({
    where: { id: userId },
    data: { completedOnboarding: true },
  });
  redirect('/');
}
