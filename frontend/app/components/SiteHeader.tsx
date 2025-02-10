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

const SiteHeader = ({ title, actions }: HeaderProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean); // Split and filter out empty segments

  const isNested = pathSegments.length > 2;

  return (
    <>
      <div className="flex lg:hidden row fixed top-0 bg-primary-99 w-full p-4 justify-between items-center z-50">
        <div className="flex-1">
          {isNested && (
            <Link className="lg:hidden" href="../">
              <IconButton>
                <ArrowBack />
              </IconButton>
            </Link>
          )}
        </div>
        <h1 className="flex-2 text-center lg:text-left text-2xl">{title}</h1>
        <div className="flex-1 flex justify-end items-center">{actions}</div>
      </div>
      <div className="hidden absolute lg:flex items-start top-0 w-full flex-col justify-between text-primary-20 p-6 pt-12 pb-10">
        <div className="bg-neutralVariant-99 p-4 lg:p-6 rounded-xl flex flex-row lg:flex-col items-center lg:items-start">
          <div className="flex w-full justify-between items-center">
            <h1 className="flex-2 text-center lg:text-left text-2xl lg:text-6xl">
              {title}
            </h1>
            <div className="flex-1 flex justify-end items-center">
              {actions}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteHeader;
