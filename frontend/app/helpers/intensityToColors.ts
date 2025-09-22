import { FloodIntensity } from '@/lib/openepi-clients';

export const intensityToColors = (intensity: FloodIntensity) => {
  switch (intensity) {
    case 'G':
      return {
        background: 'var(--color-neutral-90)',
        text: 'var(--color-neutral-5)',
        minorBackground: 'var(--color-neutral-90)',
      };
    case 'Y':
      return {
        background: 'var(--color-mild-main)',
        text: 'var(--color-mild-5)',
        minorBackground: 'var(--color-mild-90)',
      };
    case 'R':
      return {
        background: 'var(--color-moderate-main)',
        text: 'var(--color-moderate-5)',
        minorBackground: 'var(--color-moderate-90)',
      };
    case 'P':
      return {
        background: 'var(--color-extreme-main)',
        text: 'var(--color-extreme-5)',
        minorBackground: 'var(--color-extreme-90)',
      };
  }
};
