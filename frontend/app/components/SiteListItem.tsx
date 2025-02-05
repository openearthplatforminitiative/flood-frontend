import { Place, ArrowRight, ArrowForward } from '@mui/icons-material';
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Site } from '@prisma/client';
import Link from 'next/link';
import type { Dict } from '../[lang]/dictionaries';
import { typesRenderer } from '@/lib/render-utils';
import { ReactNode } from 'react';

interface SiteListItemProps {
  dict: Dict;
  href: string;
  site: Site;
  icon?: ReactNode;
}

const SiteListItem = ({
  dict,
  href,
  site,
  icon = <Place />,
}: SiteListItemProps) => {
  const siteTypeNames = typesRenderer(site.types, dict);
  return (
    <Link href={href} key={site.id}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={site.name} secondary={siteTypeNames} />
          <ListItemIcon>
            <ArrowForward />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      <Divider />
    </Link>
  );
};

export default SiteListItem;
