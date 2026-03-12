import type { ConfigState, SemanticColours, ScaleConfig, LayoutConfig, TypographyConfig, TypographyAliases, ShapeConfig } from './types';
import { generateScale } from './colour-utils';

let uidCounter = 0;
/** Generate a stable unique ID for React keys */
export function generateUid(): string {
  return `s-${Date.now()}-${++uidCounter}`;
}

/** Default palette scales matching the base factory tokens */
function createDefaultPalette() {
  return [
    { _uid: generateUid(), id: 'blue', name: 'Blue', baseHex: '#3b82f6', shades: generateScale('#3b82f6') },
    { _uid: generateUid(), id: 'neutral', name: 'Neutral', baseHex: '#737373', shades: generateScale('#737373') },
    { _uid: generateUid(), id: 'red', name: 'Red', baseHex: '#ef4444', shades: generateScale('#ef4444') },
    { _uid: generateUid(), id: 'green', name: 'Green', baseHex: '#22c55e', shades: generateScale('#22c55e') },
    { _uid: generateUid(), id: 'amber', name: 'Amber', baseHex: '#f59e0b', shades: generateScale('#f59e0b') },
    { _uid: generateUid(), id: 'cyan', name: 'Cyan', baseHex: '#06b6d4', shades: generateScale('#06b6d4') },
  ];
}

/** Default semantic mapping referencing palette scale shades */
const defaultSemantics: SemanticColours = {
  primary: 'blue-500',
  primaryHover: 'blue-600',
  primaryActive: 'blue-700',
  onPrimary: '#ffffff',
  surfaceDefault: '#ffffff',
  surfaceMuted: 'neutral-100',
  surfaceRaised: '#ffffff',
  onSurfaceDefault: 'neutral-900',
  onSurfaceMuted: 'neutral-500',
  borderDefault: 'neutral-200',
  borderStrong: 'neutral-400',
  borderFocus: 'blue-500',
  danger: 'red-600',
  dangerSurface: 'red-50',
  onDanger: '#ffffff',
  onDangerSurface: 'red-700',
  success: 'green-600',
  successSurface: 'green-50',
  onSuccess: '#ffffff',
  onSuccessSurface: 'green-700',
  warning: 'amber-600',
  warningSurface: 'amber-50',
  onWarning: '#000000',
  onWarningSurface: 'amber-700',
  info: 'cyan-600',
  infoSurface: 'cyan-50',
  onInfo: '#ffffff',
  onInfoSurface: 'cyan-700',
  disabled: 'neutral-100',
  onDisabled: 'neutral-500',
};

const defaultScale: ScaleConfig = {
  baseUnit: 4,
  steps: {
    '0': 0,
    '0.25': 1,
    '0.5': 2,
    '1': 4,
    '2': 8,
    '3': 12,
    '4': 16,
    '5': 20,
    '6': 24,
    '7': 28,
    '8': 32,
    '9': 36,
    '10': 40,
    '11': 44,
    '12': 48,
    '16': 64,
  },
};

const defaultLayout: LayoutConfig = {
  baseUnit: 4,
  steps: {
    '20': 80,
    '40': 160,
    '45': 180,
    '50': 200,
    '60': 240,
    '70': 280,
    '80': 320,
    '120': 480,
    '140': 560,
    '192': 768,
    '240': 960,
    '256': 1024,
    '300': 1200,
    '320': 1280,
  },
};

const defaultTypography: TypographyConfig = {
  remBase: 16,
  fontFamilyBody: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontFamilyHeading: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  fontFamilyMono: "'SF Mono', SFMono-Regular, ui-monospace, 'DejaVu Sans Mono', Menlo, Consolas, monospace",
  fontFamilyDisplay: "'Playfair Display', Georgia, 'Times New Roman', serif",
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tighter: 1.1,
    tight: 1.25,
    normal: 1.5,
    loose: 1.75,
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

const defaultTypographyAliases: TypographyAliases = {
  // Body text variants
  bodyWeight: 'regular',
  bodyLineHeight: 'normal',
  bodyLetterSpacing: 'normal',
  textXsWeight: 'regular',
  textXsLineHeight: 'normal',
  textXsLetterSpacing: 'normal',
  textSmWeight: 'regular',
  textSmLineHeight: 'normal',
  textSmLetterSpacing: 'normal',
  textLgWeight: 'regular',
  textLgLineHeight: 'normal',
  textLgLetterSpacing: 'normal',
  // Headings
  h1LineHeight: 'tight',
  h1Weight: 'semibold',
  h1LetterSpacing: 'tight',
  h2LineHeight: 'tight',
  h2Weight: 'semibold',
  h2LetterSpacing: 'tight',
  h3LineHeight: 'tight',
  h3Weight: 'semibold',
  h3LetterSpacing: 'tight',
  h4LineHeight: 'tight',
  h4Weight: 'semibold',
  h4LetterSpacing: 'tight',
  h5LineHeight: 'tight',
  h5Weight: 'semibold',
  h5LetterSpacing: 'normal',
  h6LineHeight: 'tight',
  h6Weight: 'semibold',
  h6LetterSpacing: 'normal',
  // Display
  displaySmWeight: 'bold',
  displaySmLetterSpacing: 'tight',
  displaySmLineHeight: 'tighter',
  displayMdWeight: 'bold',
  displayMdLetterSpacing: 'tight',
  displayMdLineHeight: 'tighter',
  displayLgWeight: 'bold',
  displayLgLetterSpacing: 'tight',
  displayLgLineHeight: 'tighter',
};

const defaultShape: ShapeConfig = {
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  },
};

export function createDefaultState(): ConfigState {
  return {
    themeName: 'custom',
    palette: createDefaultPalette(),
    semantics: defaultSemantics,
    scale: defaultScale,
    layout: defaultLayout,
    typography: defaultTypography,
    typographyAliases: defaultTypographyAliases,
    shape: defaultShape,
    componentOverrides: {},
  };
}
