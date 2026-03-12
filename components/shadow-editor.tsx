'use client';

import { useCallback } from 'react';
import { Flex, Text, Input } from '@toucan-ui/core';
import { useConfig } from '../lib/state';

/**
 * Editor for shadow tokens with visual previews.
 */
export function ShadowEditor() {
  const { state, dispatch } = useConfig();
  const { shadows } = state.shape;

  const handleShadowChange = useCallback(
    (key: string, value: string) => {
      dispatch({
        type: 'SET_SHAPE',
        shape: { shadows: { ...shadows, [key]: value } },
      });
    },
    [dispatch, shadows]
  );

  return (
    <Flex gap={3}>
      <Text weight="semibold">Shadows</Text>
      <Flex row gap={4} wrap>
        {Object.entries(shadows).map(([key, value]) => (
          <Flex key={key} gap={2}>
            <Text size="sm" variant="muted">{key}</Text>
            <div
              className="configurator-shadow-preview"
              style={{ boxShadow: value }}
            />
            <Input
              value={value}
              onChange={(e) => handleShadowChange(key, e.target.value)}
              size="sm"
              aria-label={`Shadow ${key}`}
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
