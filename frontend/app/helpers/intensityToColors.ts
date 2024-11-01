import { FloodIntensity } from "@/lib/openepi-clients";
import { palettes } from "../../theme/palettes";

export const intensityToColors = (intensity: FloodIntensity) => {
  switch (intensity) {
    case 'G':
      return {
        background: palettes.neutral[90],
        text: palettes.neutral[5],
        minorBackground: palettes.neutral[90],
      };
    case 'Y':
      return {
        background: palettes.mild.main,
        text: palettes.mild[5],
        minorBackground: palettes.mild[90],
      };
    case 'R':
      return {
        background: palettes.moderate.main,
        text: palettes.moderate[5],
        minorBackground: palettes.moderate[90],
      };
    case 'P':
      return {
        background: palettes.extreme.main,
        text: palettes.extreme[5],
        minorBackground: palettes.extreme[90],
      };
  }
}