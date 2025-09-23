import { FloodIntensity } from '@/lib/openepi-clients';
import { Site } from '@prisma/client';

export type SiteWithFloodData = Site & {
  floodIntensity?: FloodIntensity;
};
