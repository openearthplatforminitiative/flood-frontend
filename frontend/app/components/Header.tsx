'use client';

import { ArrowBack } from '@mui/icons-material';
import { Box, Breadcrumbs, IconButton } from '@mui/material';
import Link from 'next/link';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { act } from 'react';

type HeaderProps = {
  title: string;
  actions?: React.ReactNode;
};

const Header = ({ title, actions }: HeaderProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean); // Split and filter out empty segments

  const isNested = pathSegments.length > 2;

  return (
    <Box className="sticky top-0 w-full flex lg:flex-col justify-between lg:static bg-neutralVariant-99 text-primary-20 p-4 lg:p-6 lg:pt-12 lg:pb-10 z-50 lg:z-0">
      <div className="flex-1">
        {isNested && (
          <Link className="lg:hidden" href="../">
            <IconButton>
              <ArrowBack />
            </IconButton>
          </Link>
        )}
      </div>
      <h1 className="flex-2 text-center lg:text-left text-2xl lg:text-6xl">
        {title}
      </h1>
      <div className="flex-1 flex justify-end items-center">{actions}</div>
    </Box>
  );
};

export default Header;
