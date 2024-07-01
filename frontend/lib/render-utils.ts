import type { Dict, SiteType } from '@/app/[lang]/dictionaries';

export const typesRenderer = (types: string[], dict: Dict) => {
  return types
    .map(
      (type) => dict.onBoarding.sites.siteTypes[type as SiteType] ?? undefined
    )
    .filter((type) => type !== undefined)
    .map((type) => type[0].toUpperCase() + type.slice(1))
    .join(', ');
};
