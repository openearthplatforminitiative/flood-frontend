'use server';

import { getUserId } from '@/lib/auth-utils';
import {
  CreateSite,
  SiteWithFloodData,
  UpdateSite,
} from '@/types/SitesWithFloodData';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Site } from '@prisma/client';
import { revalidateTag } from 'next/cache';
import { prisma } from '@/lib/prisma';

export const fetchSites = async () => {
  const userId = await getUserId();
  if (!userId) redirect('/');

  try {
    const cookie = await cookies();

    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/sites?userId=${userId}`,
      {
        headers: {
          Cookie: cookie.toString(),
        },
        next: { tags: [userId, 'sites'] },
      }
    );

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data as SiteWithFloodData[];
  } catch (error) {
    console.error('Error fetching sites:', error);
    throw error;
  }
};

export const fetchSite = async (siteId: string) => {
  const userId = await getUserId();
  if (!userId) redirect('/');
  try {
    const cookie = await cookies();

    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/sites/${siteId}?userId=${userId}`,
      {
        headers: {
          Cookie: cookie.toString(),
        },
        next: { tags: [userId, siteId] },
      }
    );
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data as Site;
  } catch (error) {
    console.error('Error fetching site:', error);
    throw error;
  }
};
export async function createSite(site: CreateSite) {
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User ID not found in session');
  }
  try {
    await prisma.site.create({
      data: {
        ...site,
        userId,
      },
    });
    revalidateTag(userId);
    revalidateTag('sites');
  } catch (error) {
    console.error('Error creating site:', error);
    throw error;
  }
}

export async function updateSite(site: UpdateSite) {
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User ID not found in session');
  }
  revalidateTag(userId);
  revalidateTag(site.id);
  revalidateTag('sites');
  return await prisma.site.update({
    where: { id: site.id, userId },
    data: site,
  });
}

export async function deleteSite(siteId: string) {
  const userId = await getUserId();
  if (!userId) {
    throw new Error('User ID not found in session');
  }
  revalidateTag(userId);
  revalidateTag(siteId);
  revalidateTag('sites');
  await prisma.site.delete({
    where: { id: siteId, userId },
  });
}
