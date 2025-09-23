'use client';

import { Box } from '@mui/material';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { Location } from '../../utils/mainLocations';

type NavBarButtonProps = {
  location: Location;
  lang: string;
};

export const NavBarButton = ({ location, lang }: NavBarButtonProps) => {
  const segment = useSelectedLayoutSegment();

  const active = segment == location.pathName;

  return (
    <Link
      key={location.name}
      href={`/${lang}/${location.pathName}`}
      className={
        'flex items-center flex-col lg:flex-row lg:w-full lg:rounded-l-full lg:gap-1 lg:p-2 lg:pr-6' +
        (active ? ' lg:bg-primary-40 lg:text-secondary-90' : '')
      }
    >
      <Box
        className={
          'flex items-center px-2 py-1 rounded-3xl' +
          (active ? ' bg-primary-40 text-[#F9F7CD]' : '')
        }
      >
        {location.icon}
      </Box>
      {location.name}
    </Link>
  );
};
