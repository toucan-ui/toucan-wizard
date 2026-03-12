import type { ConfigState, ColourScale } from './types';
import { SYSTEM_TOKENS, SYSTEM_SURFACE_TOKENS, buildColourTokenMap, type AliasTier } from './system-token-map';
import { SPACING_ALIASES, SIZING_ALIASES, RADIUS_ALIASES, BORDER_WIDTH_ALIASES } from './alias-maps';
import { getGoogleFontsUrl } from './font-presets';

/**
 * Resolve a semantic colour reference to its hex value.
 * References like "blue-500" look up the palette; raw hex values pass through.
 */
function resolveColourRef(ref: string, palette: ColourScale[]): string {
  if (ref.startsWith('#')) return ref;

  const lastDash = ref.lastIndexOf('-');
  if (lastDash === -1) return ref;

  const scaleName = ref.slice(0, lastDash);
  const step = parseInt(ref.slice(lastDash + 1), 10);

  for (const scale of palette) {
    if (scale.id === scaleName || scale.name.toLowerCase() === scaleName) {
      const shade = scale.shades.find((s) => s.step === step);
      if (shade) return shade.hex;
    }
  }

  return ref;
}

/**
 * Map alias tier → CSS variable prefix for var() references.
 */
const ALIAS_VAR_PREFIX: Record<AliasTier, string> = {
  spacing: '--spacing',
  sizing: '--sizing',
  radius: '--radius',
  'border-width': '--border-width',
  opacity: '--opacity',
  'font-size': '--font-size',
  'font-weight': '--font-weight',
  colour: '--color',
};

/**
 * System-level colour tokens built from the structured SYSTEM_COLOUR_TOKENS map.
 * Maps system token name (with --) → alias colour token name (with --color-).
 */
const SYSTEM_COLOUR_TOKEN_MAP = buildColourTokenMap();

/**
 * Convert the full config state into a flat Record of CSS custom property → value.
 * Emits raw tokens (concrete values), alias tokens (var() references where possible),
 * and system-level tokens (var() references) to preserve the cascade.
 */
export function generateCssProperties(state: ConfigState): Record<string, string> {
  const props: Record<string, string> = {};
  const { palette, semantics, scale, layout, typography, shape, componentOverrides } = state;

  // === Root font-size (rem base) ===
  props['font-size'] = `${(typography.remBase / 16) * 100}%`;

  // === Raw tokens (concrete values) ===

  // Raw colour tokens
  for (const s of palette) {
    for (const shade of s.shades) {
      props[`--color-${s.id}-${shade.step}`] = shade.hex;
    }
  }

  // Raw scale tokens
  for (const [step, value] of Object.entries(scale.steps).sort(([a], [b]) => parseFloat(a) - parseFloat(b))) {
    props[`--scale-${step}`] = `${value}px`;
  }

  // Raw layout tokens
  for (const [step, value] of Object.entries(layout.steps)) {
    props[`--layout-${step}`] = `${value}px`;
  }

  // Raw opacity tokens (21 values at 5% increments)
  for (let i = 0; i <= 100; i += 5) {
    props[`--opacity-${i}`] = String(i / 100);
  }

  // Raw typography tokens
  props['--font-family-body'] = typography.fontFamilyBody;
  props['--font-family-heading'] = typography.fontFamilyHeading;
  props['--font-family-mono'] = typography.fontFamilyMono;
  props['--font-family-display'] = typography.fontFamilyDisplay;

  for (const [key, value] of Object.entries(typography.fontSizes)) {
    props[`--font-size-${key}`] = value;
  }

  for (const [key, value] of Object.entries(typography.fontWeights)) {
    props[`--font-weight-${key}`] = String(value);
  }

  for (const [key, value] of Object.entries(typography.lineHeights)) {
    props[`--font-line-height-${key}`] = String(value);
  }

  for (const [key, value] of Object.entries(typography.letterSpacings)) {
    props[`--font-letter-spacing-${key}`] = value;
  }

  // Raw shadow tokens
  for (const [key, value] of Object.entries(shape.shadows)) {
    props[`--shadow-${key}`] = value;
  }

  // === Alias tokens (var() references) ===

  // Alias colour tokens — resolved to hex (colour refs are dynamic palette lookups)
  const colourMap: Record<string, string> = {
    '--color-primary': semantics.primary,
    '--color-primary-hover': semantics.primaryHover,
    '--color-primary-active': semantics.primaryActive,
    '--color-on-primary': semantics.onPrimary,
    '--color-surface-default': semantics.surfaceDefault,
    '--color-surface-muted': semantics.surfaceMuted,
    '--color-surface-raised': semantics.surfaceRaised,
    '--color-on-surface-default': semantics.onSurfaceDefault,
    '--color-on-surface-muted': semantics.onSurfaceMuted,
    '--color-border-default': semantics.borderDefault,
    '--color-border-strong': semantics.borderStrong,
    '--color-border-focus': semantics.borderFocus,
    '--color-danger': semantics.danger,
    '--color-danger-surface': semantics.dangerSurface,
    '--color-on-danger': semantics.onDanger,
    '--color-on-danger-surface': semantics.onDangerSurface,
    '--color-success': semantics.success,
    '--color-success-surface': semantics.successSurface,
    '--color-on-success': semantics.onSuccess,
    '--color-on-success-surface': semantics.onSuccessSurface,
    '--color-warning': semantics.warning,
    '--color-warning-surface': semantics.warningSurface,
    '--color-on-warning': semantics.onWarning,
    '--color-on-warning-surface': semantics.onWarningSurface,
    '--color-info': semantics.info,
    '--color-info-surface': semantics.infoSurface,
    '--color-on-info': semantics.onInfo,
    '--color-on-info-surface': semantics.onInfoSurface,
    '--color-disabled': semantics.disabled,
    '--color-on-disabled': semantics.onDisabled,
  };

  for (const [prop, ref] of Object.entries(colourMap)) {
    props[prop] = resolveColourRef(ref, palette);
  }

  // Fixed alias colours (not theme-configurable)
  props['--color-transparent'] = 'transparent';
  props['--color-backdrop'] = 'rgba(0, 0, 0, 0.5)';

  // Alias spacing tokens → var(--scale-N)
  for (const [alias, scaleStep] of Object.entries(SPACING_ALIASES)) {
    props[`--spacing-${alias}`] = `var(--scale-${scaleStep})`;
  }

  // Alias sizing tokens → var(--scale-N)
  for (const [alias, scaleStep] of Object.entries(SIZING_ALIASES)) {
    props[`--sizing-${alias}`] = `var(--scale-${scaleStep})`;
  }

  // Alias radius tokens → var(--scale-N), special-case full → 9999px
  for (const [alias, rawKey] of Object.entries(RADIUS_ALIASES)) {
    if (rawKey === '9999') {
      props[`--radius-${alias}`] = '9999px';
    } else {
      props[`--radius-${alias}`] = `var(--scale-${rawKey})`;
    }
  }

  // Alias border-width tokens → var(--scale-N)
  for (const [alias, scaleStep] of Object.entries(BORDER_WIDTH_ALIASES)) {
    props[`--border-width-${alias}`] = `var(--scale-${scaleStep})`;
  }

  // Alias elevation tokens → var(--shadow-*)
  props['--elevation-0'] = 'var(--shadow-none)';
  props['--elevation-1'] = 'var(--shadow-sm)';
  props['--elevation-2'] = 'var(--shadow-md)';
  props['--elevation-3'] = 'var(--shadow-lg)';

  // Alias typography intermediaries (bridge raw font tokens to system text tokens)
  const a = state.typographyAliases;
  props['--body-font-family'] = 'var(--font-family-body)';
  props['--mono-font-family'] = 'var(--font-family-mono)';
  props['--heading-font-family'] = 'var(--font-family-heading)';
  props['--display-font-family'] = 'var(--font-family-display)';
  props['--body-font-size'] = 'var(--font-size-base)';
  props['--body-font-weight'] = `var(--font-weight-${a.bodyWeight})`;
  props['--body-line-height'] = `var(--font-line-height-${a.bodyLineHeight})`;
  props['--body-letter-spacing'] = `var(--font-letter-spacing-${a.bodyLetterSpacing})`;

  // System text tokens (connect atom CSS to alias/raw typography values)
  props['--text-font-family'] = 'var(--body-font-family)';
  props['--text-mono-font-family'] = 'var(--mono-font-family)';
  props['--text-heading-font-family'] = 'var(--heading-font-family)';
  props['--text-display-font-family'] = 'var(--display-font-family)';
  props['--text-body-font-size'] = 'var(--body-font-size)';
  props['--text-body-font-weight'] = 'var(--body-font-weight)';
  props['--text-body-line-height'] = 'var(--body-line-height)';
  // Text variant tokens (sizes hardwired to namesake raw token)
  props['--text-xs-font-size'] = 'var(--font-size-xs)';
  props['--text-xs-font-weight'] = `var(--font-weight-${a.textXsWeight})`;
  props['--text-xs-line-height'] = `var(--font-line-height-${a.textXsLineHeight})`;
  props['--text-xs-letter-spacing'] = `var(--font-letter-spacing-${a.textXsLetterSpacing})`;
  props['--text-sm-font-size'] = 'var(--font-size-sm)';
  props['--text-sm-font-weight'] = `var(--font-weight-${a.textSmWeight})`;
  props['--text-sm-line-height'] = `var(--font-line-height-${a.textSmLineHeight})`;
  props['--text-sm-letter-spacing'] = `var(--font-letter-spacing-${a.textSmLetterSpacing})`;
  props['--text-lg-font-size'] = 'var(--font-size-lg)';
  props['--text-lg-font-weight'] = `var(--font-weight-${a.textLgWeight})`;
  props['--text-lg-line-height'] = `var(--font-line-height-${a.textLgLineHeight})`;
  props['--text-lg-letter-spacing'] = `var(--font-letter-spacing-${a.textLgLetterSpacing})`;
  // Shared heading/display convenience aliases (consumed by pattern CSS)
  props['--text-heading-font-weight'] = `var(--text-heading-h3-font-weight)`;
  props['--text-heading-letter-spacing'] = `var(--text-heading-h3-letter-spacing)`;
  props['--text-display-font-weight'] = `var(--text-display-md-font-weight)`;
  props['--text-display-letter-spacing'] = `var(--text-display-md-letter-spacing)`;
  // Per-heading tokens (sizes hardwired)
  props['--text-heading-h1-font-size'] = 'var(--font-size-4xl)';
  props['--text-heading-h1-line-height'] = `var(--font-line-height-${a.h1LineHeight})`;
  props['--text-heading-h1-font-weight'] = `var(--font-weight-${a.h1Weight})`;
  props['--text-heading-h1-letter-spacing'] = `var(--font-letter-spacing-${a.h1LetterSpacing})`;
  props['--text-heading-h2-font-size'] = 'var(--font-size-3xl)';
  props['--text-heading-h2-line-height'] = `var(--font-line-height-${a.h2LineHeight})`;
  props['--text-heading-h2-font-weight'] = `var(--font-weight-${a.h2Weight})`;
  props['--text-heading-h2-letter-spacing'] = `var(--font-letter-spacing-${a.h2LetterSpacing})`;
  props['--text-heading-h3-font-size'] = 'var(--font-size-2xl)';
  props['--text-heading-h3-line-height'] = `var(--font-line-height-${a.h3LineHeight})`;
  props['--text-heading-h3-font-weight'] = `var(--font-weight-${a.h3Weight})`;
  props['--text-heading-h3-letter-spacing'] = `var(--font-letter-spacing-${a.h3LetterSpacing})`;
  props['--text-heading-h4-font-size'] = 'var(--font-size-xl)';
  props['--text-heading-h4-line-height'] = `var(--font-line-height-${a.h4LineHeight})`;
  props['--text-heading-h4-font-weight'] = `var(--font-weight-${a.h4Weight})`;
  props['--text-heading-h4-letter-spacing'] = `var(--font-letter-spacing-${a.h4LetterSpacing})`;
  props['--text-heading-h5-font-size'] = 'var(--font-size-lg)';
  props['--text-heading-h5-line-height'] = `var(--font-line-height-${a.h5LineHeight})`;
  props['--text-heading-h5-font-weight'] = `var(--font-weight-${a.h5Weight})`;
  props['--text-heading-h5-letter-spacing'] = `var(--font-letter-spacing-${a.h5LetterSpacing})`;
  props['--text-heading-h6-font-size'] = 'var(--font-size-base)';
  props['--text-heading-h6-line-height'] = `var(--font-line-height-${a.h6LineHeight})`;
  props['--text-heading-h6-font-weight'] = `var(--font-weight-${a.h6Weight})`;
  props['--text-heading-h6-letter-spacing'] = `var(--font-letter-spacing-${a.h6LetterSpacing})`;
  // Per-display tokens (sizes hardwired)
  props['--text-display-sm-font-size'] = 'var(--font-size-5xl)';
  props['--text-display-sm-font-weight'] = `var(--font-weight-${a.displaySmWeight})`;
  props['--text-display-sm-letter-spacing'] = `var(--font-letter-spacing-${a.displaySmLetterSpacing})`;
  props['--text-display-sm-line-height'] = `var(--font-line-height-${a.displaySmLineHeight})`;
  props['--text-display-md-font-size'] = 'var(--font-size-6xl)';
  props['--text-display-md-font-weight'] = `var(--font-weight-${a.displayMdWeight})`;
  props['--text-display-md-letter-spacing'] = `var(--font-letter-spacing-${a.displayMdLetterSpacing})`;
  props['--text-display-md-line-height'] = `var(--font-line-height-${a.displayMdLineHeight})`;
  props['--text-display-lg-font-size'] = 'var(--font-size-7xl)';
  props['--text-display-lg-font-weight'] = `var(--font-weight-${a.displayLgWeight})`;
  props['--text-display-lg-letter-spacing'] = `var(--font-letter-spacing-${a.displayLgLetterSpacing})`;
  props['--text-display-lg-line-height'] = `var(--font-line-height-${a.displayLgLineHeight})`;

  // === System-level colour token overrides (var() references) ===
  for (const [systemToken, aliasToken] of Object.entries(SYSTEM_COLOUR_TOKEN_MAP)) {
    props[systemToken] = `var(${aliasToken})`;
  }

  // === System-level non-colour defaults (var() references from SYSTEM_TOKENS map) ===
  for (const [, tokenDefs] of Object.entries(SYSTEM_TOKENS)) {
    for (const def of tokenDefs) {
      const prefix = ALIAS_VAR_PREFIX[def.alias];
      props[`--${def.token}`] = `var(${prefix}-${def.default})`;
    }
  }

  // === Component overrides (user-configured system token overrides) ===
  const allTokenDefs = [...Object.values(SYSTEM_TOKENS).flat(), ...Object.values(SYSTEM_SURFACE_TOKENS).flat()];
  for (const [, overrides] of Object.entries(componentOverrides)) {
    for (const [token, aliasValue] of Object.entries(overrides)) {
      // Find the token definition to determine the alias tier
      const def = allTokenDefs.find((d) => d.token === token);
      if (def) {
        const prefix = ALIAS_VAR_PREFIX[def.alias];
        props[`--${token}`] = `var(${prefix}-${aliasValue})`;
      }
    }
  }

  return props;
}

/**
 * Generate a CSS file string with all custom properties scoped to [data-theme="name"],
 * organized by tier with comments.
 */
export function generateCssFile(state: ConfigState): string {
  const selector = `[data-theme="${state.themeName}"]`;
  const { palette, semantics, scale, layout, typography, shape, componentOverrides } = state;

  const lines: string[] = [];

  // Root font-size (rem base)
  lines.push(`  font-size: ${(typography.remBase / 16) * 100}%;`);
  lines.push('');

  // === Raw ===
  lines.push('  /* === Raw === */');

  // Raw colours
  for (const s of palette) {
    for (const shade of s.shades) {
      lines.push(`  --color-${s.id}-${shade.step}: ${shade.hex};`);
    }
  }

  // Raw scale
  for (const [step, value] of Object.entries(scale.steps).sort(([a], [b]) => parseFloat(a) - parseFloat(b))) {
    lines.push(`  --scale-${step}: ${value}px;`);
  }

  // Raw layout
  for (const [step, value] of Object.entries(layout.steps)) {
    lines.push(`  --layout-${step}: ${value}px;`);
  }

  // Raw opacity (21 values at 5% increments)
  for (let i = 0; i <= 100; i += 5) {
    lines.push(`  --opacity-${i}: ${i / 100};`);
  }

  // Raw typography
  lines.push(`  --font-family-body: ${typography.fontFamilyBody};`);
  lines.push(`  --font-family-heading: ${typography.fontFamilyHeading};`);
  lines.push(`  --font-family-mono: ${typography.fontFamilyMono};`);
  lines.push(`  --font-family-display: ${typography.fontFamilyDisplay};`);
  for (const [key, value] of Object.entries(typography.fontSizes)) {
    lines.push(`  --font-size-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(typography.fontWeights)) {
    lines.push(`  --font-weight-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(typography.lineHeights)) {
    lines.push(`  --font-line-height-${key}: ${value};`);
  }
  for (const [key, value] of Object.entries(typography.letterSpacings)) {
    lines.push(`  --font-letter-spacing-${key}: ${value};`);
  }

  // Raw shadows
  for (const [key, value] of Object.entries(shape.shadows)) {
    lines.push(`  --shadow-${key}: ${value};`);
  }

  lines.push('');
  lines.push('  /* === Alias === */');

  // Alias colours (resolved hex)
  const colourMap: Record<string, string> = {
    '--color-primary': semantics.primary,
    '--color-primary-hover': semantics.primaryHover,
    '--color-primary-active': semantics.primaryActive,
    '--color-on-primary': semantics.onPrimary,
    '--color-surface-default': semantics.surfaceDefault,
    '--color-surface-muted': semantics.surfaceMuted,
    '--color-surface-raised': semantics.surfaceRaised,
    '--color-on-surface-default': semantics.onSurfaceDefault,
    '--color-on-surface-muted': semantics.onSurfaceMuted,
    '--color-border-default': semantics.borderDefault,
    '--color-border-strong': semantics.borderStrong,
    '--color-border-focus': semantics.borderFocus,
    '--color-danger': semantics.danger,
    '--color-danger-surface': semantics.dangerSurface,
    '--color-on-danger': semantics.onDanger,
    '--color-on-danger-surface': semantics.onDangerSurface,
    '--color-success': semantics.success,
    '--color-success-surface': semantics.successSurface,
    '--color-on-success': semantics.onSuccess,
    '--color-on-success-surface': semantics.onSuccessSurface,
    '--color-warning': semantics.warning,
    '--color-warning-surface': semantics.warningSurface,
    '--color-on-warning': semantics.onWarning,
    '--color-on-warning-surface': semantics.onWarningSurface,
    '--color-info': semantics.info,
    '--color-info-surface': semantics.infoSurface,
    '--color-on-info': semantics.onInfo,
    '--color-on-info-surface': semantics.onInfoSurface,
    '--color-disabled': semantics.disabled,
    '--color-on-disabled': semantics.onDisabled,
  };
  for (const [prop, ref] of Object.entries(colourMap)) {
    lines.push(`  ${prop}: ${resolveColourRef(ref, palette)};`);
  }

  // Fixed alias colours
  lines.push('  --color-transparent: transparent;');
  lines.push('  --color-backdrop: rgba(0, 0, 0, 0.5);');

  // Alias spacing
  for (const [alias, scaleStep] of Object.entries(SPACING_ALIASES)) {
    lines.push(`  --spacing-${alias}: var(--scale-${scaleStep});`);
  }

  // Alias sizing
  for (const [alias, scaleStep] of Object.entries(SIZING_ALIASES)) {
    lines.push(`  --sizing-${alias}: var(--scale-${scaleStep});`);
  }

  // Alias radius → var(--scale-N), special-case full → 9999px
  for (const [alias, rawKey] of Object.entries(RADIUS_ALIASES)) {
    if (rawKey === '9999') {
      lines.push(`  --radius-${alias}: 9999px;`);
    } else {
      lines.push(`  --radius-${alias}: var(--scale-${rawKey});`);
    }
  }

  // Alias border-width → var(--scale-N)
  for (const [alias, scaleStep] of Object.entries(BORDER_WIDTH_ALIASES)) {
    lines.push(`  --border-width-${alias}: var(--scale-${scaleStep});`);
  }

  // Alias elevation
  lines.push('  --elevation-0: var(--shadow-none);');
  lines.push('  --elevation-1: var(--shadow-sm);');
  lines.push('  --elevation-2: var(--shadow-md);');
  lines.push('  --elevation-3: var(--shadow-lg);');

  // Alias typography intermediaries
  const a = state.typographyAliases;
  lines.push('  --body-font-family: var(--font-family-body);');
  lines.push('  --mono-font-family: var(--font-family-mono);');
  lines.push('  --heading-font-family: var(--font-family-heading);');
  lines.push('  --display-font-family: var(--font-family-display);');
  lines.push('  --body-font-size: var(--font-size-base);');
  lines.push(`  --body-font-weight: var(--font-weight-${a.bodyWeight});`);
  lines.push(`  --body-line-height: var(--font-line-height-${a.bodyLineHeight});`);
  lines.push(`  --body-letter-spacing: var(--font-letter-spacing-${a.bodyLetterSpacing});`);

  lines.push('');
  lines.push('  /* === System (text) === */');
  lines.push('  --text-font-family: var(--body-font-family);');
  lines.push('  --text-mono-font-family: var(--mono-font-family);');
  lines.push('  --text-heading-font-family: var(--heading-font-family);');
  lines.push('  --text-display-font-family: var(--display-font-family);');
  lines.push('  --text-body-font-size: var(--body-font-size);');
  lines.push('  --text-body-font-weight: var(--body-font-weight);');
  lines.push('  --text-body-line-height: var(--body-line-height);');
  // Text variant tokens (sizes hardwired to namesake raw token)
  lines.push('  --text-xs-font-size: var(--font-size-xs);');
  lines.push(`  --text-xs-font-weight: var(--font-weight-${a.textXsWeight});`);
  lines.push(`  --text-xs-line-height: var(--font-line-height-${a.textXsLineHeight});`);
  lines.push(`  --text-xs-letter-spacing: var(--font-letter-spacing-${a.textXsLetterSpacing});`);
  lines.push('  --text-sm-font-size: var(--font-size-sm);');
  lines.push(`  --text-sm-font-weight: var(--font-weight-${a.textSmWeight});`);
  lines.push(`  --text-sm-line-height: var(--font-line-height-${a.textSmLineHeight});`);
  lines.push(`  --text-sm-letter-spacing: var(--font-letter-spacing-${a.textSmLetterSpacing});`);
  lines.push('  --text-lg-font-size: var(--font-size-lg);');
  lines.push(`  --text-lg-font-weight: var(--font-weight-${a.textLgWeight});`);
  lines.push(`  --text-lg-line-height: var(--font-line-height-${a.textLgLineHeight});`);
  lines.push(`  --text-lg-letter-spacing: var(--font-letter-spacing-${a.textLgLetterSpacing});`);
  lines.push('  --text-heading-font-weight: var(--text-heading-h3-font-weight);');
  lines.push('  --text-heading-letter-spacing: var(--text-heading-h3-letter-spacing);');
  lines.push('  --text-display-font-weight: var(--text-display-md-font-weight);');
  lines.push('  --text-display-letter-spacing: var(--text-display-md-letter-spacing);');
  // Per-heading tokens (sizes hardwired)
  lines.push('  --text-heading-h1-font-size: var(--font-size-4xl);');
  lines.push(`  --text-heading-h1-line-height: var(--font-line-height-${a.h1LineHeight});`);
  lines.push(`  --text-heading-h1-font-weight: var(--font-weight-${a.h1Weight});`);
  lines.push(`  --text-heading-h1-letter-spacing: var(--font-letter-spacing-${a.h1LetterSpacing});`);
  lines.push('  --text-heading-h2-font-size: var(--font-size-3xl);');
  lines.push(`  --text-heading-h2-line-height: var(--font-line-height-${a.h2LineHeight});`);
  lines.push(`  --text-heading-h2-font-weight: var(--font-weight-${a.h2Weight});`);
  lines.push(`  --text-heading-h2-letter-spacing: var(--font-letter-spacing-${a.h2LetterSpacing});`);
  lines.push('  --text-heading-h3-font-size: var(--font-size-2xl);');
  lines.push(`  --text-heading-h3-line-height: var(--font-line-height-${a.h3LineHeight});`);
  lines.push(`  --text-heading-h3-font-weight: var(--font-weight-${a.h3Weight});`);
  lines.push(`  --text-heading-h3-letter-spacing: var(--font-letter-spacing-${a.h3LetterSpacing});`);
  lines.push('  --text-heading-h4-font-size: var(--font-size-xl);');
  lines.push(`  --text-heading-h4-line-height: var(--font-line-height-${a.h4LineHeight});`);
  lines.push(`  --text-heading-h4-font-weight: var(--font-weight-${a.h4Weight});`);
  lines.push(`  --text-heading-h4-letter-spacing: var(--font-letter-spacing-${a.h4LetterSpacing});`);
  lines.push('  --text-heading-h5-font-size: var(--font-size-lg);');
  lines.push(`  --text-heading-h5-line-height: var(--font-line-height-${a.h5LineHeight});`);
  lines.push(`  --text-heading-h5-font-weight: var(--font-weight-${a.h5Weight});`);
  lines.push(`  --text-heading-h5-letter-spacing: var(--font-letter-spacing-${a.h5LetterSpacing});`);
  lines.push('  --text-heading-h6-font-size: var(--font-size-base);');
  lines.push(`  --text-heading-h6-line-height: var(--font-line-height-${a.h6LineHeight});`);
  lines.push(`  --text-heading-h6-font-weight: var(--font-weight-${a.h6Weight});`);
  lines.push(`  --text-heading-h6-letter-spacing: var(--font-letter-spacing-${a.h6LetterSpacing});`);
  // Per-display tokens (sizes hardwired)
  lines.push('  --text-display-sm-font-size: var(--font-size-5xl);');
  lines.push(`  --text-display-sm-font-weight: var(--font-weight-${a.displaySmWeight});`);
  lines.push(`  --text-display-sm-letter-spacing: var(--font-letter-spacing-${a.displaySmLetterSpacing});`);
  lines.push(`  --text-display-sm-line-height: var(--font-line-height-${a.displaySmLineHeight});`);
  lines.push('  --text-display-md-font-size: var(--font-size-6xl);');
  lines.push(`  --text-display-md-font-weight: var(--font-weight-${a.displayMdWeight});`);
  lines.push(`  --text-display-md-letter-spacing: var(--font-letter-spacing-${a.displayMdLetterSpacing});`);
  lines.push(`  --text-display-md-line-height: var(--font-line-height-${a.displayMdLineHeight});`);
  lines.push('  --text-display-lg-font-size: var(--font-size-7xl);');
  lines.push(`  --text-display-lg-font-weight: var(--font-weight-${a.displayLgWeight});`);
  lines.push(`  --text-display-lg-letter-spacing: var(--font-letter-spacing-${a.displayLgLetterSpacing});`);
  lines.push(`  --text-display-lg-line-height: var(--font-line-height-${a.displayLgLineHeight});`);

  // Check if any component overrides exist
  const hasOverrides = Object.keys(componentOverrides).some(
    (comp) => Object.keys(componentOverrides[comp]).length > 0
  );

  if (hasOverrides) {
    lines.push('');
    lines.push('  /* === System overrides === */');
    for (const [component, overrides] of Object.entries(componentOverrides)) {
      if (Object.keys(overrides).length === 0) continue;
      lines.push(`  /* ${component} */`);
      for (const [token, aliasValue] of Object.entries(overrides)) {
        const def = Object.values(SYSTEM_TOKENS).flat().find((d) => d.token === token)
          ?? Object.values(SYSTEM_SURFACE_TOKENS).flat().find((d) => d.token === token);
        if (def) {
          const prefix = ALIAS_VAR_PREFIX[def.alias];
          lines.push(`  --${token}: var(${prefix}-${aliasValue});`);
        }
      }
    }
  }

  const header = generateFontLoadingComment(state);
  return `${header}${selector} {\n${lines.join('\n')}\n}\n`;
}

/**
 * Generate a CSS comment block with font-loading instructions.
 * Only included when non-system (Google) fonts are used.
 */
function generateFontLoadingComment(state: ConfigState): string {
  const { typography } = state;
  const fonts: { slot: string; value: string; url: string }[] = [];

  const slots = [
    { slot: 'Body', value: typography.fontFamilyBody },
    { slot: 'Heading', value: typography.fontFamilyHeading },
    { slot: 'Mono', value: typography.fontFamilyMono },
    { slot: 'Display', value: typography.fontFamilyDisplay },
  ];

  const seenUrls = new Set<string>();

  for (const { slot, value } of slots) {
    const url = getGoogleFontsUrl(value);
    if (url && !seenUrls.has(url)) {
      seenUrls.add(url);
      fonts.push({ slot, value, url });
    }
  }

  // Check for custom fonts (no Google URL and not a system font stack)
  const customFonts = slots.filter(({ value }) => {
    const url = getGoogleFontsUrl(value);
    return url === null && !value.startsWith('system-ui') && !value.startsWith("'SF Mono'");
  });

  if (fonts.length === 0 && customFonts.length === 0) return '';

  const lines: string[] = [
    '/* ==========================================================================',
    '   Font Loading',
    '   Add these to your HTML <head> or CSS to load the required fonts.',
    '   ========================================================================== */',
  ];

  if (fonts.length > 0) {
    lines.push('/*');
    lines.push(' * HTML <link> tags:');
    for (const { url } of fonts) {
      lines.push(` *   <link rel="stylesheet" href="${url}" />`);
    }
    lines.push(' *');
    lines.push(' * Or CSS @import (place at top of stylesheet):');
    for (const { url } of fonts) {
      lines.push(` *   @import url('${url}');`);
    }
    lines.push(' */');
  }

  if (customFonts.length > 0) {
    lines.push('/*');
    for (const { slot, value } of customFonts) {
      lines.push(` * Custom font (${slot}): ensure ${value} is loaded in your application`);
    }
    lines.push(' */');
  }

  lines.push('');
  return lines.join('\n');
}
