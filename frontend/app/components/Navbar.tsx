'use client';

import { PlaceOutlined, SettingsOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import Link from 'next/link';
import { Dict } from '../[lang]/dictionaries';
import { useSelectedLayoutSegment } from 'next/navigation';

interface NavbarProps {
  dict: Dict;
  lang: string;
}

const Navbar = ({ dict, lang }: NavbarProps) => {
  const segment = useSelectedLayoutSegment();
  return (
    <Box
      sx={{
        backgroundColor: '#EDEEEA',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <Link
        href={`/${lang}/sites`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'black',
        }}
      >
        <Box
          sx={{
            backgroundColor: segment === 'sites' ? '#D5E7D6' : undefined,
            display: 'flex',
            justifyContent: 'center',
            padding: '0.5rem 1rem',
            borderRadius: '1.5rem',
          }}
        >
          <PlaceOutlined />
        </Box>
        {dict.navbar.sites}
      </Link>
      <Link
        href={`/${lang}/settings`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'black',
        }}
      >
        <Box
          sx={{
            backgroundColor: segment === 'settings' ? '#D5E7D6' : undefined,
            display: 'flex',
            justifyContent: 'center',
            padding: '0.5rem 1rem',
            borderRadius: '1.5rem',
          }}
        >
          <SettingsOutlined />
        </Box>
        {dict.navbar.settings}
      </Link>
    </Box>
  );
};

export default Navbar;
