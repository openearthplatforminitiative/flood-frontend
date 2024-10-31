'use client';

import { Box, Breadcrumbs, Typography, useMediaQuery } from '@mui/material';
import type { Dict } from '@/app/[lang]/dictionaries';
import Link from 'next/link';
import { ArrowBack } from '@mui/icons-material';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import LogoCopy from './icons/LogoCopy';
import { mainLocations } from '../helpers/mainLocations';
import path from 'path';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const currentSegment = useSelectedLayoutSegment();
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean); // Split and filter out empty segments

  const isNested = pathSegments.length > 2;

  return (
    <Box className="sticky top-0 lg:static text-primary-20 mt-4 mb-12">
      <Breadcrumbs aria-label="breadcrumb">
        {isNested &&
          pathSegments.map((segment, index) => (
            <Link
              key={segment}
              href={pathSegments.slice(0, index + 1).join('/')}
            >
              {segment}
            </Link>
          ))}
        {/* <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          className="hover:underline"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumb</Typography> */}
      </Breadcrumbs>
      <Typography variant="h1">{title}</Typography>
    </Box>
  );
};

export default Header;
