import { FloodIntensity } from "@/lib/openepi-clients";
import { palettes } from "../../theme/palettes";

export const intensityToColor = (intensity: FloodIntensity) => {
  switch (intensity) {
    case 'G':
      return palettes.neutral[90];
    case 'Y':
      return palettes.mild.main;
    case 'R':
      return palettes.moderate.main;
    case 'P':
      return palettes.extreme.main;
  }
}