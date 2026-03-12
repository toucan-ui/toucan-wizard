'use client';

import { useCallback, useMemo } from 'react';
import { Flex, Text, Select, type SelectOption } from '@toucan-ui/core';
import { useConfig } from '../lib/state';
import type { SemanticColours, ColourScale } from '../lib/types';

interface ColourOption extends SelectOption {
  hex: string;
}

/** Build select options from all palette shades, including hex for swatches */
function buildOptions(palette: ColourScale[]): ColourOption[] {
  const options: ColourOption[] = [
    { value: '#ffffff', label: 'White (#ffffff)', hex: '#ffffff' },
    { value: '#000000', label: 'Black (#000000)', hex: '#000000' },
  ];

  for (const scale of palette) {
    for (const shade of scale.shades) {
      options.push({
        value: `${scale.id}-${shade.step}`,
        label: `${scale.name} ${shade.step} (${shade.hex})`,
        hex: shade.hex,
      });
    }
  }

  return options;
}

/** Build a value→hex lookup map for resolving the current swatch */
function buildHexMap(palette: ColourScale[]): Record<string, string> {
  const map: Record<string, string> = {
    '#ffffff': '#ffffff',
    '#000000': '#000000',
  };

  for (const scale of palette) {
    for (const shade of scale.shades) {
      map[`${scale.id}-${shade.step}`] = shade.hex;
    }
  }

  return map;
}

/** Render a colour option with an inline swatch */
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

interface RoleFieldProps {
  label: string;
  field: keyof SemanticColours;
  options: ColourOption[];
  value: string;
  resolvedHex: string;
  onChange: (field: keyof SemanticColours, value: string) => void;
}

function RoleField({ label, field, options, value, resolvedHex, onChange }: RoleFieldProps) {
  return (
    <Flex gap={1}>
      <Text size="sm" weight="medium">{label}</Text>
      <Flex row gap={2} align="center">
        <div
          className="configurator-swatch"
          style={{ backgroundColor: resolvedHex }}
          aria-hidden="true"
        />
        <Select
          label={label}
          hideLabel
          options={options}
          value={value}
          onChange={(val) => onChange(field, val)}
          renderOption={renderColourOption}
          size="sm"
        />
      </Flex>
    </Flex>
  );
}

interface RoleGroupProps {
  title: string;
  fields: { label: string; field: keyof SemanticColours }[];
}

/**
 * Maps semantic colour roles to palette references via dropdowns.
 */
export function RoleMapper() {
  const { state, dispatch } = useConfig();
  const options = useMemo(() => buildOptions(state.palette), [state.palette]);
  const hexMap = useMemo(() => buildHexMap(state.palette), [state.palette]);

  const handleChange = useCallback(
    (field: keyof SemanticColours, value: string) => {
      dispatch({ type: 'SET_SEMANTICS', semantics: { [field]: value } });
    },
    [dispatch]
  );

  const groups: RoleGroupProps[] = [
    {
      title: 'Primary',
      fields: [
        { label: 'Primary', field: 'primary' },
        { label: 'Primary Hover', field: 'primaryHover' },
        { label: 'Primary Active', field: 'primaryActive' },
        { label: 'On Primary', field: 'onPrimary' },
      ],
    },
    {
      title: 'Surface',
      fields: [
        { label: 'Surface Default', field: 'surfaceDefault' },
        { label: 'Surface Muted', field: 'surfaceMuted' },
        { label: 'Surface Raised', field: 'surfaceRaised' },
        { label: 'On Surface Default', field: 'onSurfaceDefault' },
        { label: 'On Surface Muted', field: 'onSurfaceMuted' },
      ],
    },
    {
      title: 'Border',
      fields: [
        { label: 'Border Default', field: 'borderDefault' },
        { label: 'Border Strong', field: 'borderStrong' },
        { label: 'Border Focus', field: 'borderFocus' },
      ],
    },
    {
      title: 'Danger',
      fields: [
        { label: 'Danger', field: 'danger' },
        { label: 'Danger Surface', field: 'dangerSurface' },
        { label: 'On Danger', field: 'onDanger' },
        { label: 'On Danger Surface', field: 'onDangerSurface' },
      ],
    },
    {
      title: 'Success',
      fields: [
        { label: 'Success', field: 'success' },
        { label: 'Success Surface', field: 'successSurface' },
        { label: 'On Success', field: 'onSuccess' },
        { label: 'On Success Surface', field: 'onSuccessSurface' },
      ],
    },
    {
      title: 'Warning',
      fields: [
        { label: 'Warning', field: 'warning' },
        { label: 'Warning Surface', field: 'warningSurface' },
        { label: 'On Warning', field: 'onWarning' },
        { label: 'On Warning Surface', field: 'onWarningSurface' },
      ],
    },
    {
      title: 'Info',
      fields: [
        { label: 'Info', field: 'info' },
        { label: 'Info Surface', field: 'infoSurface' },
        { label: 'On Info', field: 'onInfo' },
        { label: 'On Info Surface', field: 'onInfoSurface' },
      ],
    },
    {
      title: 'Disabled',
      fields: [
        { label: 'Disabled', field: 'disabled' },
        { label: 'On Disabled', field: 'onDisabled' },
      ],
    },
  ];

  return (
    <Flex gap={6}>
      {groups.map((group) => (
        <Flex key={group.title} gap={3}>
          <Text weight="semibold">{group.title}</Text>
          <Flex row gap={3} wrap>
            {group.fields.map((f) => {
              const val = state.semantics[f.field];
              const hex = hexMap[val] ?? val;
              return (
                <RoleField
                  key={f.field}
                  label={f.label}
                  field={f.field}
                  options={options}
                  value={val}
                  resolvedHex={hex}
                  onChange={handleChange}
                />
              );
            })}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
}
