'use client';

import { useCallback, useMemo, useState } from 'react';
import { Flex, Text, Select, Heading, Button, Box, Separator, type SelectOption } from '@toucan-ui/core';
import { useConfig } from '../lib/state';
import {
  SYSTEM_TOKENS,
  SYSTEM_SURFACE_TOKENS,
  ALIAS_OPTIONS,
  type SystemTokenDef,
  type AliasTier,
} from '../lib/system-token-map';
import { ComponentPreview } from './component-preview';
import type { SemanticColours, ColourScale } from '../lib/types';

/** Union of all component keys from structural + surface token maps */
const ALL_COMPONENT_KEYS = [
  ...new Set([...Object.keys(SYSTEM_TOKENS), ...Object.keys(SYSTEM_SURFACE_TOKENS)]),
];

const COMPONENT_OPTIONS = ALL_COMPONENT_KEYS
  .sort((a, b) => a.localeCompare(b))
  .map((key) => ({
    value: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
  }));

function buildAliasOptions(tier: AliasTier) {
  return ALIAS_OPTIONS[tier].map((val) => ({ value: val, label: val }));
}

// ---------------------------------------------------------------------------
// Alias colour name → SemanticColours field mapping
// ---------------------------------------------------------------------------

const ALIAS_TO_SEMANTIC_FIELD: Record<string, keyof SemanticColours> = {
  'primary': 'primary',
  'primary-hover': 'primaryHover',
  'primary-active': 'primaryActive',
  'on-primary': 'onPrimary',
  'surface-default': 'surfaceDefault',
  'surface-muted': 'surfaceMuted',
  'surface-raised': 'surfaceRaised',
  'on-surface-default': 'onSurfaceDefault',
  'on-surface-muted': 'onSurfaceMuted',
  'border-default': 'borderDefault',
  'border-strong': 'borderStrong',
  'border-focus': 'borderFocus',
  'danger': 'danger',
  'danger-surface': 'dangerSurface',
  'on-danger': 'onDanger',
  'on-danger-surface': 'onDangerSurface',
  'success': 'success',
  'success-surface': 'successSurface',
  'on-success': 'onSuccess',
  'on-success-surface': 'onSuccessSurface',
  'warning': 'warning',
  'warning-surface': 'warningSurface',
  'on-warning': 'onWarning',
  'on-warning-surface': 'onWarningSurface',
  'info': 'info',
  'info-surface': 'infoSurface',
  'on-info': 'onInfo',
  'on-info-surface': 'onInfoSurface',
  'disabled': 'disabled',
  'on-disabled': 'onDisabled',
};

/** Fixed alias colours that don't come from SemanticColours */
const FIXED_ALIAS_HEX: Record<string, string> = {
  'transparent': 'transparent',
  'backdrop': 'rgba(0, 0, 0, 0.5)',
};

/** Resolve a palette reference like "blue-500" to hex. */
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

/** Build a map from colour alias name → resolved hex value */
function buildAliasHexMap(
  semantics: SemanticColours,
  palette: ColourScale[]
): Record<string, string> {
  const map: Record<string, string> = { ...FIXED_ALIAS_HEX };
  for (const [alias, field] of Object.entries(ALIAS_TO_SEMANTIC_FIELD)) {
    const ref = semantics[field];
    map[alias] = resolveColourRef(ref, palette);
  }
  return map;
}

// ---------------------------------------------------------------------------
// Colour select option with swatch
// ---------------------------------------------------------------------------

interface ColourOption extends SelectOption {
  hex: string;
}

function renderColourOption(option: SelectOption) {
  const hex = (option as ColourOption).hex;
  return (
    <span className="configurator-colour-option">
      <span
        className="configurator-colour-option-swatch"
        style={{ backgroundColor: hex }}
      />
      {option.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// TokenField — structural (non-colour) tokens
// ---------------------------------------------------------------------------

interface TokenFieldProps {
  def: SystemTokenDef;
  value: string | undefined;
  onChange: (token: string, value: string) => void;
  onClear: (token: string) => void;
}

function TokenField({ def, value, onChange, onClear }: TokenFieldProps) {
  const isOverridden = value !== undefined;
  const options = buildAliasOptions(def.alias);

  return (
    <Flex row gap={3} align="center">
      <Text size="sm" weight={isOverridden ? 'semibold' : 'regular'} className="configurator-token-label">
        {def.token}
      </Text>
      <Text size="xs" variant="muted">
        ({def.alias})
      </Text>
      <Select
        options={options}
        value={value ?? def.default}
        onChange={(val) => onChange(def.token, val)}
        size="sm"
      />
      {isOverridden && (
        <Button variant="ghost" size="sm" onClick={() => onClear(def.token)}>
          Reset
        </Button>
      )}
      {!isOverridden && (
        <Text size="xs" variant="muted">default</Text>
      )}
    </Flex>
  );
}

// ---------------------------------------------------------------------------
// ColourTokenField — colour tokens with swatch preview
// ---------------------------------------------------------------------------

interface ColourTokenFieldProps {
  def: SystemTokenDef;
  value: string | undefined;
  aliasHexMap: Record<string, string>;
  onChange: (token: string, value: string) => void;
  onClear: (token: string) => void;
}

function ColourTokenField({ def, value, aliasHexMap, onChange, onClear }: ColourTokenFieldProps) {
  const isOverridden = value !== undefined;
  const currentAlias = value ?? def.default;
  const currentHex = aliasHexMap[currentAlias] ?? 'transparent';

  const options: ColourOption[] = useMemo(
    () =>
      ALIAS_OPTIONS.colour.map((alias) => ({
        value: alias,
        label: alias,
        hex: aliasHexMap[alias] ?? 'transparent',
      })),
    [aliasHexMap]
  );

  return (
    <Flex row gap={3} align="center">
      <Text size="sm" weight={isOverridden ? 'semibold' : 'regular'} className="configurator-token-label">
        {def.token}
      </Text>
      <div
        className="configurator-swatch"
        style={{ backgroundColor: currentHex }}
        aria-hidden="true"
      />
      <Select
        options={options}
        value={currentAlias}
        onChange={(val) => onChange(def.token, val)}
        renderOption={renderColourOption}
        size="sm"
      />
      {isOverridden && (
        <Button variant="ghost" size="sm" onClick={() => onClear(def.token)}>
          Reset
        </Button>
      )}
      {!isOverridden && (
        <Text size="xs" variant="muted">default</Text>
      )}
    </Flex>
  );
}

// ---------------------------------------------------------------------------
// Main editor
// ---------------------------------------------------------------------------

export function ComponentOverrideEditor() {
  const { state, dispatch } = useConfig();
  const [selectedComponent, setSelectedComponent] = useState(COMPONENT_OPTIONS[0]?.value ?? '');

  const overrides = state.componentOverrides[selectedComponent] ?? {};
  const structuralDefs = SYSTEM_TOKENS[selectedComponent] ?? [];
  const surfaceDefs = SYSTEM_SURFACE_TOKENS[selectedComponent] ?? [];

  const aliasHexMap = useMemo(
    () => buildAliasHexMap(state.semantics, state.palette),
    [state.semantics, state.palette]
  );

  const handleTokenChange = useCallback(
    (token: string, value: string) => {
      dispatch({
        type: 'SET_COMPONENT_OVERRIDE',
        component: selectedComponent,
        overrides: { ...overrides, [token]: value },
      });
    },
    [dispatch, selectedComponent, overrides]
  );

  const handleTokenClear = useCallback(
    (token: string) => {
      const { [token]: _, ...rest } = overrides;
      if (Object.keys(rest).length === 0) {
        dispatch({ type: 'REMOVE_COMPONENT_OVERRIDE', component: selectedComponent });
      } else {
        dispatch({
          type: 'SET_COMPONENT_OVERRIDE',
          component: selectedComponent,
          overrides: rest,
        });
      }
    },
    [dispatch, selectedComponent, overrides]
  );

  const overrideCount = Object.keys(overrides).length;
  const hasStructural = structuralDefs.length > 0;
  const hasSurface = surfaceDefs.length > 0;

  return (
    <Flex gap={4}>
      <Flex gap={2}>
        <Heading level={3}>Component</Heading>
        <Select
          label="Component"
          options={COMPONENT_OPTIONS}
          value={selectedComponent}
          onChange={setSelectedComponent}
        />
        {overrideCount > 0 && (
          <Text size="sm" variant="muted">
            {overrideCount} override{overrideCount !== 1 ? 's' : ''} active
          </Text>
        )}
      </Flex>

      <ComponentPreview component={selectedComponent} />

      <Flex gap={2}>
        <Text weight="semibold">System Tokens</Text>
        <Text size="sm" variant="muted">
          Change a value to override the default. Overrides emit as system-tier CSS variables.
        </Text>
      </Flex>

      <Box padding="md">
        <Flex gap={2}>
          {hasStructural && (
            <>
              {structuralDefs.map((def) => (
                <Flex key={def.token} gap={2}>
                  <TokenField
                    def={def}
                    value={overrides[def.token]}
                    onChange={handleTokenChange}
                    onClear={handleTokenClear}
                  />
                </Flex>
              ))}
            </>
          )}

          {hasStructural && hasSurface && <Separator />}

          {hasSurface && (
            <>
              <Text size="sm" weight="semibold">Surface Colours</Text>
              {surfaceDefs.map((def) => (
                <Flex key={def.token} gap={2}>
                  <ColourTokenField
                    def={def}
                    value={overrides[def.token]}
                    aliasHexMap={aliasHexMap}
                    onChange={handleTokenChange}
                    onClear={handleTokenClear}
                  />
                </Flex>
              ))}
            </>
          )}

          {!hasStructural && !hasSurface && (
            <Text variant="muted">No system tokens defined for this component.</Text>
          )}
        </Flex>
      </Box>
    </Flex>
  );
}
