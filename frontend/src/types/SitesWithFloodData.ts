import { FloodIntensity } from '@/lib/openepi-clients';
import { Site } from '@prisma/client';
import z from 'zod';

export type SiteWithFloodData = Site & {
  floodIntensity?: FloodIntensity;
};

export const UpdateSiteFormSchema = z.object({
  id: z.string(),
  name: z.string('Name is Required').min(2).max(50),
  types: z.array(z.string()).min(1, 'Select at least one site type'),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  radius: z.number('Radius is Required').min(10).max(1000),
});

export const CreateSiteFormSchema = UpdateSiteFormSchema.omit({ id: true });

export type UpdateSite = z.infer<typeof UpdateSiteFormSchema>;

export type CreateSite = z.infer<typeof CreateSiteFormSchema>;
