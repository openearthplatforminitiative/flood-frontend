import { PaletteOptions } from '@mui/material/styles';
import tailwindConfig from '../../tailwind.config';

export const palettes = tailwindConfig.theme?.extend?.colors as PaletteOptions;
