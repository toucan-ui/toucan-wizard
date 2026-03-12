/** A single shade step in a colour scale */
export interface ColourShade {
  step: number;
  hex: string;
}

/** A named colour scale (e.g. "brand", "accent") with 50-950 shades */
export interface ColourScale {
  /** Internal stable key for React — never changes after creation */
  _uid: string;
  id: string;
  name: string;
  baseHex: string;
  shades: ColourShade[];
}

/** Semantic colour role mappings referencing palette scales */
export interface SemanticColours {
  primary: string;
  primaryHover: string;
  primaryActive: string;
  onPrimary: string;
  surfaceDefault: string;
  surfaceMuted: string;
  surfaceRaised: string;
  onSurfaceDefault: string;
  onSurfaceMuted: string;
  borderDefault: string;
  borderStrong: string;
  borderFocus: string;
  danger: string;
  dangerSurface: string;
  onDanger: string;
  onDangerSurface: string;
  success: string;
  successSurface: string;
  onSuccess: string;
  onSuccessSurface: string;
  warning: string;
  warningSurface: string;
  onWarning: string;
  onWarningSurface: string;
  info: string;
  infoSurface: string;
  onInfo: string;
  onInfoSurface: string;
  disabled: string;
  onDisabled: string;
}

/** Scale configuration (unified component-range spacing) */
export interface ScaleConfig {
  baseUnit: number;
  steps: Record<string, number>;
}

/** Layout configuration (large layout dimensions) */
export interface LayoutConfig {
  baseUnit: number;
  steps: Record<string, number>;
}

/** Typography configuration */
export interface TypographyConfig {
  remBase: number;
  fontFamilyBody: string;
  fontFamilyHeading: string;
  fontFamilyMono: string;
  fontFamilyDisplay: string;
  fontSizes: Record<string, string>;
  fontWeights: Record<string, number>;
  lineHeights: Record<string, number>;
  letterSpacings: Record<string, string>;
}

/** Typography alias mappings — each value is a key into the raw typography maps.
 *  Sizes are hardwired to namesake raw tokens (not configurable here). */
export interface TypographyAliases {
  // Body text variants (weight, line-height, letter-spacing per variant)
  bodyWeight: string;
  bodyLineHeight: string;
  bodyLetterSpacing: string;
  textXsWeight: string;
  textXsLineHeight: string;
  textXsLetterSpacing: string;
  textSmWeight: string;
  textSmLineHeight: string;
  textSmLetterSpacing: string;
  textLgWeight: string;
  textLgLineHeight: string;
  textLgLetterSpacing: string;

  // Headings (per-level)
  h1LineHeight: string;
  h1Weight: string;
  h1LetterSpacing: string;
  h2LineHeight: string;
  h2Weight: string;
  h2LetterSpacing: string;
  h3LineHeight: string;
  h3Weight: string;
  h3LetterSpacing: string;
  h4LineHeight: string;
  h4Weight: string;
  h4LetterSpacing: string;
  h5LineHeight: string;
  h5Weight: string;
  h5LetterSpacing: string;
  h6LineHeight: string;
  h6Weight: string;
  h6LetterSpacing: string;

  // Display (per-size)
  displaySmWeight: string;
  displaySmLetterSpacing: string;
  displaySmLineHeight: string;
  displayMdWeight: string;
  displayMdLetterSpacing: string;
  displayMdLineHeight: string;
  displayLgWeight: string;
  displayLgLetterSpacing: string;
  displayLgLineHeight: string;
}

/** Shape & elevation configuration */
export interface ShapeConfig {
  shadows: Record<string, string>;
}

/** Per-component system token override (token suffix → alias value) */
export interface ComponentOverride {
  [tokenSuffix: string]: string;
}

/** Complete configurator state */
export interface ConfigState {
  themeName: string;
  palette: ColourScale[];
  semantics: SemanticColours;
  scale: ScaleConfig;
  layout: LayoutConfig;
  typography: TypographyConfig;
  typographyAliases: TypographyAliases;
  shape: ShapeConfig;
  componentOverrides: Record<string, ComponentOverride>;
}

/** All possible actions for the config reducer */
export type ConfigAction =
  | { type: 'SET_THEME_NAME'; name: string }
  | { type: 'ADD_SCALE'; scale: Omit<ColourScale, '_uid'> & { _uid?: string } }
  | { type: 'REMOVE_SCALE'; id: string }
  | { type: 'UPDATE_SCALE'; id: string; scale: Partial<ColourScale> }
  | { type: 'UPDATE_SHADE'; scaleId: string; step: number; hex: string }
  | { type: 'REGENERATE_SCALE'; id: string; baseHex: string }
  | { type: 'SET_SEMANTICS'; semantics: Partial<SemanticColours> }
  | { type: 'SET_SCALE'; scale: Partial<ScaleConfig> }
  | { type: 'SET_LAYOUT'; layout: Partial<LayoutConfig> }
  | { type: 'SET_TYPOGRAPHY'; typography: Partial<TypographyConfig> }
  | { type: 'SET_TYPOGRAPHY_ALIASES'; aliases: Partial<TypographyAliases> }
  | { type: 'SET_SHAPE'; shape: Partial<ShapeConfig> }
  | { type: 'SET_COMPONENT_OVERRIDE'; component: string; overrides: ComponentOverride }
  | { type: 'REMOVE_COMPONENT_OVERRIDE'; component: string }
  | { type: 'LOAD_STATE'; state: ConfigState }
  | { type: 'RESET_ALL' }
  | { type: 'RESET_SECTION'; section: ConfigSection };

/** Sections that can be individually reset */
export type ConfigSection =
  | 'palette' | 'semantics' | 'scale' | 'layout' | 'typography' | 'typographyAliases' | 'shape'
  | 'componentOverrides';
