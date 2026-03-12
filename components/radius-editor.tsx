'use client';

import { Flex, Text, Box } from '@toucan-ui/core';
import { useConfig } from '../lib/state';
import { RADIUS_ALIASES } from '../lib/alias-maps';

/**
 * Read-only display of border-radius values derived from the unified scale.
 * Shows alias name, scale step reference, resolved pixel value, and visual preview.
 */
export function RadiusEditor() {
  const { state } = useConfig();

  const resolveValue = (rawKey: string): string => {
    if (rawKey === '9999') return '9999px';
    const val = state.scale.steps[rawKey];
    return val !== undefined ? `${val}px` : rawKey;
  };

  return (
    <Flex gap={3}>
      <Text weight="semibold">Border Radius</Text>
      <Text size="sm" variant="muted">
        Each radius maps to a scale step. Adjust the scale base unit on the Scale page to resize all radii proportionally.
      </Text>
      <Flex row gap={4} wrap>
        {Object.entries(RADIUS_ALIASES).map(([alias, rawKey]) => {
          const resolved = resolveValue(rawKey);
          return (
            <Flex key={alias} gap={2} align="center">
              <Text size="sm" weight="medium">{alias}</Text>
              <Box
                padding="sm"
                radius="sm"
                className="configurator-radius-preview"
                style={{ borderRadius: resolved }}
              />
              <Text size="xs" variant="muted">
                {rawKey === '9999' ? '9999px' : `scale.${rawKey}`} = {resolved}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
