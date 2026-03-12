/**
 * Hardcoded alias → raw step mappings.
 * These are fixed by design — alias names always point to the same raw scale steps.
 * To change what "md" resolves to in pixels, edit the raw scale value (step 3 = 12px → 16px).
 */

/** Spacing alias name → raw scale step key */
export const SPACING_ALIASES: Record<string, string> = {
  none: '0', xs: '1', sm: '2', md: '3', lg: '4',
  xl: '6', '2xl': '8', '3xl': '12', '4xl': '16',
};

/** Sizing alias name → raw scale step key */
export const SIZING_ALIASES: Record<string, string> = {
  '3xs': '3', '2xs': '4', xs: '5', sm: '6',
  md: '8', lg: '10', xl: '12',
};

/** Radius alias name → raw scale step key (full is special: 9999px) */
export const RADIUS_ALIASES: Record<string, string> = {
  none: '0', sm: '1', md: '2', lg: '3', full: '9999',
};

/** Border-width alias name → raw scale step key */
export const BORDER_WIDTH_ALIASES: Record<string, string> = {
  none: '0', thin: '0.25', thick: '0.5',
};

/** Raw opacity keys (0–100 at 5% increments) */
export const OPACITY_RAW_KEYS: string[] = [
  '0', '5', '10', '15', '20', '25', '30', '35', '40', '45',
  '50', '55', '60', '65', '70', '75', '80', '85', '90', '95', '100',
];
