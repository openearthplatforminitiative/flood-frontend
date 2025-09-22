'use client';

import { ArrowBack } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

type HeaderProps = {
  title: string;
  actions?: React.ReactNode;
};

const Header = ({ title, actions }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const pathSegments = pathname.split('/').filter(Boolean);
  const isNested = pathSegments.length > 2;

  return (
    <div className="sticky gap-2 lg:gap-6 top-0 w-full flex lg:flex-wrap justify-between items-center lg:static bg-neutralVariant-99 text-primary-20 p-4 lg:p-6 lg:pt-12 lg:pb-10 z-50 lg:z-0">
      <div className="flex-1 lg:flex-none lg:w-min">
        {isNested && (
          <>
            <div className="text-black lg:hidden">
              <IconButton color="inherit" onClick={() => router.back()}>
                <ArrowBack />
              </IconButton>
            </div>
            <div className="hidden lg:inline">
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => router.back()}
              >
                Back
              </Button>
            </div>
          </>
        )}
      </div>
      <h1 className="flex-2 lg:w-full text-center lg:text-left text-2xl lg:text-6xl">
        {title}
      </h1>
      <div className="flex-1 flex justify-end items-center">{actions}</div>
    </div>
  );
};

export default Header;
