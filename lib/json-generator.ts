import type { ConfigState, ColourScale } from './types';
import { SYSTEM_TOKENS, SYSTEM_SURFACE_TOKENS, type AliasTier } from './system-token-map';
import { SPACING_ALIASES, SIZING_ALIASES, RADIUS_ALIASES, BORDER_WIDTH_ALIASES } from './alias-maps';
import { getGoogleFontsUrl } from './font-presets';

type TokenValue = { $value: string; $type: string };
interface TokenGroup { [key: string]: TokenValue | TokenGroup; }

/**
 * Resolve a semantic colour reference to either a token reference or raw hex.
 * References like "blue-500" become "{color.blue.500}"; raw hex values pass through.
 */
function toTokenRef(ref: string): string {
  if (ref.startsWith('#')) return ref;

  const lastDash = ref.lastIndexOf('-');
  if (lastDash === -1) return ref;

  const scaleName = ref.slice(0, lastDash);
  const step = ref.slice(lastDash + 1);
  return `{color.${scaleName}.${step}}`;
}

/**
 * Map alias tier → DTCG reference prefix for token references.
 */
const ALIAS_REF_PREFIX: Record<AliasTier, string> = {
  spacing: 'spacing',
  sizing: 'sizing',
  radius: 'radius',
  'border-width': 'border-width',
  opacity: 'opacity',
  'font-size': 'font.size',
  'font-weight': 'font.weight',
  colour: 'color',
};

/** Generate raw colour tokens in SD-compatible DTCG format */
function generateRawColourJson(palette: ColourScale[]): object {
  const colour: TokenGroup = {};

  for (const scale of palette) {
    const shadeGroup: TokenGroup = {};
    for (const shade of scale.shades) {
      shadeGroup[String(shade.step)] = { $value: shade.hex, $type: 'color' };
    }
    colour[scale.id] = shadeGroup;
  }

  colour['white'] = { $value: '#ffffff', $type: 'color' };
  colour['black'] = { $value: '#000000', $type: 'color' };
  colour['transparent'] = { $value: '#00000000', $type: 'color' };

  return { color: colour };
}

/** Generate alias colour tokens referencing raw tokens */
function generateAliasColourJson(state: ConfigState): object {
  const { semantics } = state;

  return {
    color: {
      primary: { $value: toTokenRef(semantics.primary), $type: 'color' },
      'primary-hover': { $value: toTokenRef(semantics.primaryHover), $type: 'color' },
      'primary-active': { $value: toTokenRef(semantics.primaryActive), $type: 'color' },
      'on-primary': { $value: toTokenRef(semantics.onPrimary), $type: 'color' },
      surface: {
        default: { $value: toTokenRef(semantics.surfaceDefault), $type: 'color' },
        muted: { $value: toTokenRef(semantics.surfaceMuted), $type: 'color' },
        raised: { $value: toTokenRef(semantics.surfaceRaised), $type: 'color' },
      },
      'on-surface': {
        default: { $value: toTokenRef(semantics.onSurfaceDefault), $type: 'color' },
        muted: { $value: toTokenRef(semantics.onSurfaceMuted), $type: 'color' },
      },
      border: {
        default: { $value: toTokenRef(semantics.borderDefault), $type: 'color' },
        strong: { $value: toTokenRef(semantics.borderStrong), $type: 'color' },
        focus: { $value: toTokenRef(semantics.borderFocus), $type: 'color' },
      },
      danger: { $value: toTokenRef(semantics.danger), $type: 'color' },
      'danger-surface': { $value: toTokenRef(semantics.dangerSurface), $type: 'color' },
      'on-danger': { $value: toTokenRef(semantics.onDanger), $type: 'color' },
      'on-danger-surface': { $value: toTokenRef(semantics.onDangerSurface), $type: 'color' },
      success: { $value: toTokenRef(semantics.success), $type: 'color' },
      'success-surface': { $value: toTokenRef(semantics.successSurface), $type: 'color' },
      'on-success': { $value: toTokenRef(semantics.onSuccess), $type: 'color' },
      'on-success-surface': { $value: toTokenRef(semantics.onSuccessSurface), $type: 'color' },
      warning: { $value: toTokenRef(semantics.warning), $type: 'color' },
      'warning-surface': { $value: toTokenRef(semantics.warningSurface), $type: 'color' },
      'on-warning': { $value: toTokenRef(semantics.onWarning), $type: 'color' },
      'on-warning-surface': { $value: toTokenRef(semantics.onWarningSurface), $type: 'color' },
      info: { $value: toTokenRef(semantics.info), $type: 'color' },
      'info-surface': { $value: toTokenRef(semantics.infoSurface), $type: 'color' },
      'on-info': { $value: toTokenRef(semantics.onInfo), $type: 'color' },
      'on-info-surface': { $value: toTokenRef(semantics.onInfoSurface), $type: 'color' },
      disabled: { $value: toTokenRef(semantics.disabled), $type: 'color' },
      'on-disabled': { $value: toTokenRef(semantics.onDisabled), $type: 'color' },
    },
  };
}

/** Generate raw scale tokens */
function generateRawScaleJson(state: ConfigState): object {
  const scale: TokenGroup = {};
  for (const [step, value] of Object.entries(state.scale.steps).sort(([a], [b]) => parseFloat(a) - parseFloat(b))) {
    scale[step] = { $value: `${value}px`, $type: 'dimension' };
  }
  return { scale };
}

/** Generate raw layout tokens */
function generateRawLayoutJson(state: ConfigState): object {
  const layout: TokenGroup = {};
  for (const [step, value] of Object.entries(state.layout.steps)) {
    layout[step] = { $value: `${value}px`, $type: 'dimension' };
  }
  return { layout };
}

/** Generate raw typography tokens */
function generateRawTypographyJson(state: ConfigState): object {
  const { typography } = state;
  const fontFamily: TokenGroup = {
    body: { $value: typography.fontFamilyBody, $type: 'fontFamily' },
    heading: { $value: typography.fontFamilyHeading, $type: 'fontFamily' },
    mono: { $value: typography.fontFamilyMono, $type: 'fontFamily' },
    display: { $value: typography.fontFamilyDisplay, $type: 'fontFamily' },
  };

  const fontSize: TokenGroup = {};
  for (const [key, value] of Object.entries(typography.fontSizes)) {
    fontSize[key] = { $value: value, $type: 'dimension' };
  }

  const fontWeight: TokenGroup = {};
  for (const [key, value] of Object.entries(typography.fontWeights)) {
    fontWeight[key] = { $value: String(value), $type: 'fontWeight' };
  }

  const lineHeight: TokenGroup = {};
  for (const [key, value] of Object.entries(typography.lineHeights)) {
    lineHeight[key] = { $value: String(value), $type: 'number' };
  }

  const letterSpacing: TokenGroup = {};
  for (const [key, value] of Object.entries(typography.letterSpacings)) {
    letterSpacing[key] = { $value: value, $type: 'dimension' };
  }

  return {
    font: {
      'rem-base': { $value: `${typography.remBase}px`, $type: 'dimension' },
      family: fontFamily,
      size: fontSize,
      weight: fontWeight,
      'line-height': lineHeight,
      'letter-spacing': letterSpacing,
    },
  };
}

/** Generate raw opacity tokens (21 values at 5% increments) */
function generateRawOpacityJson(): object {
  const opacity: TokenGroup = {};
  for (let i = 0; i <= 100; i += 5) {
    opacity[String(i)] = { $value: String(i / 100), $type: 'number' };
  }
  return { opacity };
}

/** Generate raw shadow tokens */
function generateRawShadowJson(state: ConfigState): object {
  const shadow: TokenGroup = {};
  for (const [key, value] of Object.entries(state.shape.shadows)) {
    shadow[key] = { $value: value, $type: 'shadow' };
  }
  return { shadow };
}

/** Generate alias spacing tokens referencing raw scale */
function generateAliasSpacingJson(): object {
  const spacing: TokenGroup = {};
  for (const [alias, scaleStep] of Object.entries(SPACING_ALIASES)) {
    spacing[alias] = { $value: `{scale.${scaleStep}}`, $type: 'dimension' };
  }
  return { spacing };
}

/** Generate alias sizing tokens referencing raw scale */
function generateAliasSizingJson(): object {
  const sizing: TokenGroup = {};
  for (const [alias, scaleStep] of Object.entries(SIZING_ALIASES)) {
    sizing[alias] = { $value: `{scale.${scaleStep}}`, $type: 'dimension' };
  }
  return { sizing };
}

/** Generate alias radius tokens referencing scale (full → concrete 9999px) */
function generateAliasRadiusJson(): object {
  const radius: TokenGroup = {};
  for (const [alias, rawKey] of Object.entries(RADIUS_ALIASES)) {
    if (rawKey === '9999') {
      radius[alias] = { $value: '9999px', $type: 'dimension' };
    } else {
      radius[alias] = { $value: `{scale.${rawKey}}`, $type: 'dimension' };
    }
  }
  return { radius };
}

/** Generate alias typography tokens referencing raw typography */
function generateAliasTypographyJson(state: ConfigState): object {
  const a = state.typographyAliases;

  return {
    body: {
      'font-family': { $value: '{font.family.body}', $type: 'fontFamily' },
      'font-size': { $value: '{font.size.base}', $type: 'dimension' },
      'font-weight': { $value: `{font.weight.${a.bodyWeight}}`, $type: 'fontWeight' },
      'line-height': { $value: `{font.line-height.${a.bodyLineHeight}}`, $type: 'number' },
      'letter-spacing': { $value: `{font.letter-spacing.${a.bodyLetterSpacing}}`, $type: 'dimension' },
    },
    mono: {
      'font-family': { $value: '{font.family.mono}', $type: 'fontFamily' },
    },
    heading: {
      'font-family': { $value: '{font.family.heading}', $type: 'fontFamily' },
      'font-weight': { $value: '{font.weight.semibold}', $type: 'fontWeight' },
      'letter-spacing': { $value: '{font.letter-spacing.tight}', $type: 'dimension' },
    },
    display: {
      'font-family': { $value: '{font.family.display}', $type: 'fontFamily' },
      'font-weight': { $value: '{font.weight.bold}', $type: 'fontWeight' },
      'letter-spacing': { $value: '{font.letter-spacing.tight}', $type: 'dimension' },
      'line-height': { $value: '{font.line-height.tighter}', $type: 'number' },
    },
  };
}

/** Generate system-level text tokens referencing alias typography */
function generateSystemTypographyJson(state: ConfigState): object {
  const a = state.typographyAliases;

  return {
    text: {
      'font-family': { $value: '{body.font-family}', $type: 'fontFamily' },
      mono: {
        'font-family': { $value: '{mono.font-family}', $type: 'fontFamily' },
      },
      body: {
        'font-size': { $value: '{body.font-size}', $type: 'dimension' },
        'font-weight': { $value: '{body.font-weight}', $type: 'fontWeight' },
        'line-height': { $value: '{body.line-height}', $type: 'number' },
      },
      xs: {
        'font-size': { $value: '{font.size.xs}', $type: 'dimension' },
        'font-weight': { $value: `{font.weight.${a.textXsWeight}}`, $type: 'fontWeight' },
        'line-height': { $value: `{font.line-height.${a.textXsLineHeight}}`, $type: 'number' },
        'letter-spacing': { $value: `{font.letter-spacing.${a.textXsLetterSpacing}}`, $type: 'dimension' },
      },
      sm: {
        'font-size': { $value: '{font.size.sm}', $type: 'dimension' },
        'font-weight': { $value: `{font.weight.${a.textSmWeight}}`, $type: 'fontWeight' },
        'line-height': { $value: `{font.line-height.${a.textSmLineHeight}}`, $type: 'number' },
        'letter-spacing': { $value: `{font.letter-spacing.${a.textSmLetterSpacing}}`, $type: 'dimension' },
      },
      lg: {
        'font-size': { $value: '{font.size.lg}', $type: 'dimension' },
        'font-weight': { $value: `{font.weight.${a.textLgWeight}}`, $type: 'fontWeight' },
        'line-height': { $value: `{font.line-height.${a.textLgLineHeight}}`, $type: 'number' },
        'letter-spacing': { $value: `{font.letter-spacing.${a.textLgLetterSpacing}}`, $type: 'dimension' },
      },
      heading: {
        'font-family': { $value: '{heading.font-family}', $type: 'fontFamily' },
        'font-weight': { $value: '{font.weight.semibold}', $type: 'fontWeight' },
        'letter-spacing': { $value: '{font.letter-spacing.tight}', $type: 'dimension' },
        h1: {
          'font-size': { $value: '{font.size.4xl}', $type: 'dimension' },
          'line-height': { $value: `{font.line-height.${a.h1LineHeight}}`, $type: 'number' },
          'font-weight': { $value: `{font.weight.${a.h1Weight}}`, $type: 'fontWeight' },
          'letter-spacing': { $value: `{font.letter-spacing.${a.h1LetterSpacing}}`, $type: 'dimension' },
        },
        h2: {
          'font-size': { $value: '{font.size.3xl}', $type: 'dimension' },
          'line-height': { $value: `{font.line-height.${a.h2LineHeight}}`, $type: 'number' },
          'font-weight': { $value: `{font.weight.${a.h2Weight}}`, $type: 'fontWeight' },
          'letter-spacing': { $value: `{font.letter-spacing.${a.h2LetterSpacing}}`, $type: 'dimension' },
        },
        h3: {
          'font-size': { $value: '{font.size.2xl}', $type: 'dimension' },
          'line-height': { $value: `{font.line-height.${a.h3LineHeight}}`, $type: 'number' },
          'font-weight': { $value: `{font.weight.${a.h3Weight}}`, $type: 'fontWeight' },
          'letter-spacing': { $value: `{font.letter-spacing.${a.h3LetterSpacing}}`, $type: 'dimension' },
        },
        h4: {
          'font-size': { $value: '{font.size.xl}', $type: 'dimension' },
          'line-height': { $value: `{font.line-height.${a.h4LineHeight}}`, $type: 'number' },
          'font-weight': { $value: `{font.weight.${a.h4Weight}}`, $type: 'fontWeight' },
          'letter-spacing': { $value: `{font.letter-spacing.${a.h4LetterSpacing}}`, $type: 'dimension' },
        },
        h5: {
          'font-size': { $value: '{font.size.lg}', $type: 'dimension' },
          'line-height': { $value: `{font.line-height.${a.h5LineHeight}}`, $type: 'number' },
          'font-weight': { $value: `{font.weight.${a.h5Weight}}`, $type: 'fontWeight' },
          'letter-spacing': { $value: `{font.letter-spacing.${a.h5LetterSpacing}}`, $type: 'dimension' },
        },
        h6: {
          'font-size': { $value: '{font.size.base}', $type: 'dimension' },
          'line-height': { $value: `{font.line-height.${a.h6LineHeight}}`, $type: 'number' },
          'font-weight': { $value: `{font.weight.${a.h6Weight}}`, $type: 'fontWeight' },
          'letter-spacing': { $value: `{font.letter-spacing.${a.h6LetterSpacing}}`, $type: 'dimension' },
        },
      },
      display: {
        'font-family': { $value: '{display.font-family}', $type: 'fontFamily' },
        'font-weight': { $value: '{font.weight.bold}', $type: 'fontWeight' },
        'letter-spacing': { $value: '{font.letter-spacing.tight}', $type: 'dimension' },
        sm: {
          'font-size': { $value: '{font.size.5xl}', $type: 'dimension' },
          'font-weight': { $value: `{font.weight.${a.displaySmWeight}}`, $type: 'fontWeight' },
          'letter-spacing': { $value: `{font.letter-spacing.${a.displaySmLetterSpacing}}`, $type: 'dimension' },
          'line-height': { $value: `{font.line-height.${a.displaySmLineHeight}}`, $type: 'number' },
        },
        md: {
          'font-size': { $value: '{font.size.6xl}', $type: 'dimension' },
          'font-weight': { $value: `{font.weight.${a.displayMdWeight}}`, $type: 'fontWeight' },
          'letter-spacing': { $value: `{font.letter-spacing.${a.displayMdLetterSpacing}}`, $type: 'dimension' },
          'line-height': { $value: `{font.line-height.${a.displayMdLineHeight}}`, $type: 'number' },
        },
        lg: {
          'font-size': { $value: '{font.size.7xl}', $type: 'dimension' },
          'font-weight': { $value: `{font.weight.${a.displayLgWeight}}`, $type: 'fontWeight' },
          'letter-spacing': { $value: `{font.letter-spacing.${a.displayLgLetterSpacing}}`, $type: 'dimension' },
          'line-height': { $value: `{font.line-height.${a.displayLgLineHeight}}`, $type: 'number' },
        },
      },
    },
  };
}

/** Generate alias border-width tokens referencing scale */
function generateAliasBorderWidthJson(): object {
  // Convert JS keys (dots) to SD-compatible keys (hyphens)
  const sdKeyMap: Record<string, string> = {
    '0': '0', '0.25': '0-25', '0.5': '0-5',
  };

  const borderWidth: TokenGroup = {};
  for (const [alias, scaleStep] of Object.entries(BORDER_WIDTH_ALIASES)) {
    const sdKey = sdKeyMap[scaleStep] ?? scaleStep;
    borderWidth[alias] = { $value: `{scale.${sdKey}}`, $type: 'dimension' };
  }
  return { 'border-width': borderWidth };
}

/** Generate system override tokens for a component */
function generateSystemOverrideJson(
  component: string,
  overrides: Record<string, string>
): object {
  const result: TokenGroup = {};

  for (const [token, aliasValue] of Object.entries(overrides)) {
    const def = SYSTEM_TOKENS[component]?.find((d) => d.token === token)
      ?? SYSTEM_SURFACE_TOKENS[component]?.find((d) => d.token === token);
    if (!def) continue;

    const refPrefix = ALIAS_REF_PREFIX[def.alias];
    // Convert token name to nested structure: "button-sm-padding-x" → button.sm.padding-x
    const componentPrefix = component + '-';
    const suffix = token.startsWith(componentPrefix) ? token.slice(componentPrefix.length) : token;
    const suffixParts = suffix.split('-');

    // Build nested object
    let current = result;
    for (let i = 0; i < suffixParts.length - 1; i++) {
      const part = suffixParts[i];
      if (!current[part] || typeof current[part] !== 'object' || '$value' in current[part]) {
        current[part] = {};
      }
      current = current[part] as TokenGroup;
    }

    const lastPart = suffixParts[suffixParts.length - 1];
    const $type = def.alias === 'colour' ? 'color'
      : def.alias === 'opacity' ? 'number'
      : def.alias === 'font-weight' ? 'fontWeight'
      : 'dimension';
    current[lastPart] = {
      $value: `{${refPrefix}.${aliasValue}}`,
      $type,
    };
  }

  return { [component]: result };
}

/**
 * Generate all JSON token files as a Record<filePath, jsonString>.
 * File paths are relative to the ZIP root.
 */
export function generateJsonFiles(state: ConfigState): Record<string, string> {
  const files: Record<string, string> = {};
  const pretty = (obj: object) => JSON.stringify(obj, null, 2);

  // Raw tier
  files['raw/color.json'] = pretty(generateRawColourJson(state.palette));
  files['raw/scale.json'] = pretty(generateRawScaleJson(state));
  files['raw/layout.json'] = pretty(generateRawLayoutJson(state));
  files['raw/typography.json'] = pretty(generateRawTypographyJson(state));
  files['raw/opacity.json'] = pretty(generateRawOpacityJson());
  files['raw/shadow.json'] = pretty(generateRawShadowJson(state));

  // Alias tier
  files['alias/color.json'] = pretty(generateAliasColourJson(state));
  files['alias/spacing.json'] = pretty(generateAliasSpacingJson());
  files['alias/sizing.json'] = pretty(generateAliasSizingJson());
  files['alias/radius.json'] = pretty(generateAliasRadiusJson());
  files['alias/border-width.json'] = pretty(generateAliasBorderWidthJson());
  files['alias/typography.json'] = pretty(generateAliasTypographyJson(state));

  // System tier
  files['system/text.json'] = pretty(generateSystemTypographyJson(state));
  for (const [component, overrides] of Object.entries(state.componentOverrides)) {
    if (Object.keys(overrides).length > 0) {
      files[`system/${component}.json`] = pretty(generateSystemOverrideJson(component, overrides));
    }
  }

  // Font loading metadata
  files['fonts.json'] = pretty(generateFontsJson(state));

  return files;
}

/** Generate fonts.json with Google Fonts URLs and custom font info */
function generateFontsJson(state: ConfigState): object {
  const { typography } = state;
  const googleFonts: { family: string; url: string }[] = [];
  const custom: string[] = [];

  const slots = [
    { value: typography.fontFamilyBody },
    { value: typography.fontFamilyHeading },
    { value: typography.fontFamilyMono },
    { value: typography.fontFamilyDisplay },
  ];

  const seenUrls = new Set<string>();

  for (const { value } of slots) {
    const url = getGoogleFontsUrl(value);
    if (url && !seenUrls.has(url)) {
      seenUrls.add(url);
      // Extract family name from the font-family value (first quoted name)
      const match = value.match(/^'([^']+)'/);
      const family = match ? match[1] : value.split(',')[0].trim();
      googleFonts.push({ family, url });
    } else if (url === null && !value.startsWith('system-ui') && !value.startsWith("'SF Mono'")) {
      // Custom font — extract name
      const match = value.match(/^'([^']+)'/);
      const family = match ? match[1] : value.split(',')[0].trim();
      if (!custom.includes(family)) {
        custom.push(family);
      }
    }
  }

  return { googleFonts, custom };
}
