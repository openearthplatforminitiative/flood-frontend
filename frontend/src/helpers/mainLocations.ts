import {
  GrassOutlined,
  PlaceOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import React, { ReactNode } from 'react';
import { Dict } from '@/app/[lang]/dictionaries';

export type Location = {
  name: string;
  icon: ReactNode;
  pathName: string;
};

export const mainLocations = (dict: Dict): Location[] => [
  {
    name: dict.navbar.sites,
    icon: React.createElement(PlaceOutlined),
    pathName: 'sites',
  },
  {
    name: dict.navbar.cropHealth,
    icon: React.createElement(GrassOutlined),
    pathName: 'crop-health',
  },
  {
    name: dict.navbar.settings,
    icon: React.createElement(SettingsOutlined),
    pathName: 'settings',
  },
];
