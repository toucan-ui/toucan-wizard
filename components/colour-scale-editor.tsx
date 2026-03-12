'use client';

import { useCallback, useMemo, useState } from 'react';
import { Flex, Text, Button, Input, Box, Badge } from '@toucan-ui/core';
import { ColourPickerField } from './colour-picker-field';
import { useConfig } from '../lib/state';
import { isValidHex } from '../lib/colour-utils';
import type { ColourScale, SemanticColours } from '../lib/types';

/** Human-readable labels for semantic roles */
const ROLE_LABELS: Record<keyof SemanticColours, string> = {
  primary: 'Primary',
  primaryHover: 'Primary Hover',
  primaryActive: 'Primary Active',
  onPrimary: 'On Primary',
  surfaceDefault: 'Surface',
  surfaceMuted: 'Surface Muted',
  surfaceRaised: 'Surface Raised',
  onSurfaceDefault: 'Text',
  onSurfaceMuted: 'Muted Text',
  borderDefault: 'Border',
  borderStrong: 'Strong Border',
  borderFocus: 'Focus Ring',
  danger: 'Danger',
  dangerSurface: 'Danger Surface',
  onDanger: 'On Danger',
  onDangerSurface: 'On Danger Surface',
  success: 'Success',
  successSurface: 'Success Surface',
  onSuccess: 'On Success',
  onSuccessSurface: 'On Success Surface',
  warning: 'Warning',
  warningSurface: 'Warning Surface',
  onWarning: 'On Warning',
  onWarningSurface: 'On Warning Surface',
  info: 'Info',
  infoSurface: 'Info Surface',
  onInfo: 'On Info',
  onInfoSurface: 'On Info Surface',
  disabled: 'Disabled',
  onDisabled: 'On Disabled',
};

/** Find which semantic roles reference a given scale id */
function getRolesForScale(scaleId: string, semantics: SemanticColours): string[] {
  const roles: string[] = [];
  for (const [key, value] of Object.entries(semantics)) {
    if (typeof value === 'string' && value.startsWith(`${scaleId}-`)) {
      roles.push(ROLE_LABELS[key as keyof SemanticColours] || key);
    }
  }
  return roles;
}

interface ColourScaleEditorProps {
  scale: ColourScale;
}

/**
 * Editor for a single named colour scale.
 * Shows a base colour picker (500 shade) that regenerates the full scale,
 * with individual shade overrides via clickable swatches.
 */
export function ColourScaleEditor({ scale }: ColourScaleEditorProps) {
  const { state, dispatch } = useConfig();
  const [idError, setIdError] = useState<string | null>(null);

  const roles = useMemo(
    () => getRolesForScale(scale.id, state.semantics),
    [scale.id, state.semantics]
  );

  const handleBaseChange = useCallback(
    (hex: string) => {
      dispatch({ type: 'REGENERATE_SCALE', id: scale.id, baseHex: hex });
    },
    [dispatch, scale.id]
  );

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'UPDATE_SCALE', id: scale.id, scale: { name: e.target.value } });
    },
    [dispatch, scale.id]
  );

  const handleIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const id = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
      if (!id) {
        setIdError('ID cannot be empty');
        return;
      }
      const taken = state.palette.some((s) => s.id === id && s.id !== scale.id);
      if (taken) {
        setIdError(`ID "${id}" is already in use`);
        return;
      }
      setIdError(null);
      dispatch({ type: 'UPDATE_SCALE', id: scale.id, scale: { id } });
    },
    [dispatch, scale.id, state.palette]
  );

  const handleShadeChange = useCallback(
    (step: number, hex: string) => {
      if (isValidHex(hex)) {
        dispatch({ type: 'UPDATE_SHADE', scaleId: scale.id, step, hex });
      }
    },
    [dispatch, scale.id]
  );

  const handleRemove = useCallback(() => {
    dispatch({ type: 'REMOVE_SCALE', id: scale.id });
  }, [dispatch, scale.id]);

  return (
    <Box elevation={0} radius="md" padding="md" className="configurator-scale-card">
      <Flex gap={4}>
        {/* Header row: name, id, base colour, remove */}
        <Flex row gap={3} wrap align="end">
          <Flex gap={1}>
            <Text size="sm" weight="medium">Name</Text>
            <Input value={scale.name} onChange={handleNameChange} size="sm" aria-label="Scale name" />
          </Flex>
          <Flex gap={1}>
            <Text size="sm" weight="medium">ID</Text>
            <Input value={scale.id} onChange={handleIdChange} size="sm" aria-label="Scale ID" />
            {idError && <Text size="xs" style={{ color: 'var(--color-danger)' }}>{idError}</Text>}
          </Flex>
          <ColourPickerField
            label="Base (500)"
            value={scale.baseHex}
            onChange={handleBaseChange}
          />
          <Button variant="ghost" size="sm" onClick={handleRemove} aria-label={`Remove ${scale.name} scale`}>
            Remove
          </Button>
        </Flex>

        {/* Semantic role hints */}
        {roles.length > 0 ? (
          <Flex gap={1}>
            <Text size="sm" variant="muted">Used for:</Text>
            <Flex row gap={1} wrap>
              {roles.map((role) => (
                <Badge key={role} variant="info" size="sm">{role}</Badge>
              ))}
            </Flex>
          </Flex>
        ) : (
          <Text size="sm" variant="muted">
            Not mapped to any semantic role yet. Assign it in Step 2 (Semantics).
          </Text>
        )}

        {/* Swatch strip */}
        <Flex gap={1}>
          <Text size="sm" weight="medium">Shades</Text>
          <Flex row gap={1} wrap>
            {scale.shades.map((shade) => (
              <Flex key={shade.step} gap={1} align="center">
                <button
                  className="configurator-swatch"
                  style={{ backgroundColor: shade.hex }}
                  aria-label={`${scale.name} ${shade.step}: ${shade.hex}`}
                  title={`${shade.step}: ${shade.hex}`}
                  onClick={() => {
                    const hex = prompt(`Enter hex for ${scale.name} ${shade.step}:`, shade.hex);
                    if (hex && isValidHex(hex.startsWith('#') ? hex : `#${hex}`)) {
                      handleShadeChange(shade.step, hex.startsWith('#') ? hex : `#${hex}`);
                    }
                  }}
                />
                <Text size="sm" variant="muted">{shade.step}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
