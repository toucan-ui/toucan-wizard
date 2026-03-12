'use client';

import { useCallback } from 'react';
import { Flex, Text, Input, Button } from '@toucan-ui/core';
import { useConfig } from '../lib/state';

/**
 * Parse a rem value string (e.g. "0.75rem") and convert to px using the given remBase.
 * Returns null if the value isn't a simple rem value.
 */
function remToPx(value: string, remBase: number): number | null {
  const match = value.match(/^([\d.]+)rem$/);
  if (!match) return null;
  return parseFloat(match[1]) * remBase;
}

/**
 * Editor for raw typography tokens: rem base, font sizes, weights, line heights, letter spacings.
 * Font family pickers live on the typography aliases page.
 */
export function FontEditor() {
  const { state, dispatch } = useConfig();
  const { typography } = state;

  const updateTypography = useCallback(
    (partial: Partial<typeof typography>) => {
      dispatch({ type: 'SET_TYPOGRAPHY', typography: partial });
    },
    [dispatch]
  );

  const handleSizeChange = useCallback(
    (key: string, value: string) => {
      updateTypography({ fontSizes: { ...typography.fontSizes, [key]: value } });
    },
    [updateTypography, typography.fontSizes]
  );

  const handleWeightChange = useCallback(
    (key: string, value: string) => {
      const num = parseInt(value, 10);
      if (isNaN(num)) return;
      updateTypography({ fontWeights: { ...typography.fontWeights, [key]: num } });
    },
    [updateTypography, typography.fontWeights]
  );

  const handleLineHeightChange = useCallback(
    (key: string, value: string) => {
      const num = parseFloat(value);
      if (isNaN(num)) return;
      updateTypography({ lineHeights: { ...typography.lineHeights, [key]: num } });
    },
    [updateTypography, typography.lineHeights]
  );

  const handleLetterSpacingChange = useCallback(
    (key: string, value: string) => {
      updateTypography({ letterSpacings: { ...typography.letterSpacings, [key]: value } });
    },
    [updateTypography, typography.letterSpacings]
  );

  const REM_BASE_PRESETS = [10, 12, 14, 16, 18];

  return (
    <Flex gap={6}>
      {/* Rem Base */}
      <Flex gap={3}>
        <Text weight="semibold">Rem Base</Text>
        <Flex row gap={2} wrap align="center">
          {REM_BASE_PRESETS.map((px) => (
            <Button
              key={px}
              size="sm"
              variant={typography.remBase === px ? 'primary' : 'ghost'}
              onClick={() => updateTypography({ remBase: px })}
            >
              {px}px
            </Button>
          ))}
          <Input
            type="number"
            value={String(typography.remBase)}
            onChange={(e) => {
              const num = parseFloat(e.target.value);
              if (!isNaN(num) && num > 0) {
                updateTypography({ remBase: num });
              }
            }}
            size="sm"
            aria-label="Custom rem base"
          />
          <Text size="sm" variant="muted">
            = {(typography.remBase / 16) * 100}% root font-size
          </Text>
        </Flex>
      </Flex>

      {/* Font Sizes */}
      <Flex gap={3}>
        <Text weight="semibold">Font Sizes</Text>
        <Flex row gap={2} wrap>
          {Object.entries(typography.fontSizes).map(([key, value]) => (
            <Flex key={key} gap={1}>
              <Text size="sm" variant="muted">{key}</Text>
              <Input
                value={value}
                onChange={(e) => handleSizeChange(key, e.target.value)}
                size="sm"
                aria-label={`Font size ${key}`}
              />
              <Text size="sm" style={{ fontSize: remToPx(value, typography.remBase) ?? undefined }}>Aa</Text>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* Font Weights */}
      <Flex gap={3}>
        <Text weight="semibold">Font Weights</Text>
        <Flex row gap={2} wrap>
          {Object.entries(typography.fontWeights).map(([key, value]) => (
            <Flex key={key} gap={1}>
              <Text size="sm" variant="muted">{key}</Text>
              <Input
                type="number"
                value={String(value)}
                onChange={(e) => handleWeightChange(key, e.target.value)}
                size="sm"
                aria-label={`Font weight ${key}`}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* Line Heights */}
      <Flex gap={3}>
        <Text weight="semibold">Line Heights</Text>
        <Flex row gap={2} wrap>
          {Object.entries(typography.lineHeights).map(([key, value]) => (
            <Flex key={key} gap={1}>
              <Text size="sm" variant="muted">{key}</Text>
              <Input
                type="number"
                value={String(value)}
                onChange={(e) => handleLineHeightChange(key, e.target.value)}
                size="sm"
                aria-label={`Line height ${key}`}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* Letter Spacings */}
      <Flex gap={3}>
        <Text weight="semibold">Letter Spacings</Text>
        <Flex row gap={2} wrap>
          {Object.entries(typography.letterSpacings).map(([key, value]) => (
            <Flex key={key} gap={1}>
              <Text size="sm" variant="muted">{key}</Text>
              <Input
                value={value}
                onChange={(e) => handleLetterSpacingChange(key, e.target.value)}
                size="sm"
                aria-label={`Letter spacing ${key}`}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
