'use client';

import { Box } from '@mui/material';
import { Dict } from '@/app/[lang]/dictionaries';
import { mainLocations } from '@/helpers/mainLocations';
import LogoCopy from './icons/LogoCopy';
import { NavBarButton } from './buttons/NavBarButton';
import { Logout } from '@mui/icons-material';
import { signOut } from 'next-auth/react';

interface NavbarProps {
  dict: Dict;
  lang: string;
}

const Navbar = ({ dict, lang }: NavbarProps) => {
  return (
    <Box
      className={
        'flex bg-secondary-90 lg:h-screen flex-col sticky lg:top-0 bottom-0 left-0 right-0 lg:justify-start text-primary-20'
      }
    >
      <Box className="hidden lg:flex mt-10 mb-8 h-[77px] mx-6">
        <h2 className="flex text-4xl gap-2 items-center">
          <LogoCopy fontSize="inherit" />
          {dict.title}
        </h2>
      </Box>
      <Box className=" grow flex lg:flex-col w-full lg:p-6 p-2 justify-around lg:pr-0 lg:gap-6">
        {mainLocations(dict).map((location) => (
          <NavBarButton key={location.name} location={location} lang={lang} />
        ))}
        <Box className="hidden lg:flex grow flex-col justify-end">
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
            className={
              'flex items-center flex-col lg:flex-row lg:w-full lg:rounded-l-full lg:gap-1 lg:p-2 lg:pr-6'
            }
          >
            <Box className={'flex items-center px-2 py-1 rounded-3xl'}>
              {<Logout />}
            </Box>
            {dict.signOut}
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
