'use server';

import { getUserId } from '@/lib/auth-utils';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function submitPushPermissions(
  allowPushNotifications: boolean,
  allowSMSNotifications: boolean
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
