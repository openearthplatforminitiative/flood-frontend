'use client';

import { Box, Breadcrumbs } from '@mui/material';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean); // Split and filter out empty segments

  const isNested = pathSegments.length > 2;

  return (
    <Box className="sticky top-0 w-full lg:static text-primary-20 p-4 lg:p-6 lg:pt-12 lg:pb-10 z-50 lg:z-0">
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
      </Breadcrumbs>
      <h1 className="text-center lg:text-left text-2xl lg:text-6xl">{title}</h1>
    </Box>
  );
};

export default Header;
