'use client';

import { useCallback } from 'react';
import { Flex, Text, Button, Heading } from '@toucan-ui/core';
import { ColourScaleEditor } from '../../../components/colour-scale-editor';
import { SectionResetButton } from '../../../components/reset-buttons';
import { useConfig } from '../../../lib/state';
import { generateScale } from '../../../lib/colour-utils';

export default function PalettePage() {
  const { state, dispatch } = useConfig();

  const handleAddScale = useCallback(() => {
    const id = `scale-${Date.now()}`;
    const baseHex = '#6366f1';
    dispatch({
      type: 'ADD_SCALE',
      scale: {
        id,
        name: 'New Scale',
        baseHex,
        shades: generateScale(baseHex),
      },
    });
  }, [dispatch]);

  return (
    <Flex gap={6}>
      <Flex gap={2}>
        <Flex row justify="between" align="center">
          <Heading level={2}>Colour Palette</Heading>
          <SectionResetButton section="palette" />
        </Flex>
        <Text variant="muted">
          Raw tier — the foundation colour values everything else references.
          Create named colour scales by picking a base colour to auto-generate a full 50-950 shade range.
          Click any swatch to manually override individual shades.
        </Text>
      </Flex>

      {state.palette.map((scale) => (
        <ColourScaleEditor key={scale._uid} scale={scale} />
      ))}

      <Button variant="secondary" onClick={handleAddScale}>
        Add Colour Scale
      </Button>
    </Flex>
  );
}
