'use client';

import { Flex, Heading, Text } from '@toucan-ui/core';
import { RadiusEditor } from '../../../components/radius-editor';
import { ShadowEditor } from '../../../components/shadow-editor';
import { SectionResetButton } from '../../../components/reset-buttons';

export default function ShapePage() {
  return (
    <Flex gap={6}>
      <Flex gap={2}>
        <Flex row justify="between" align="center">
          <Heading level={2}>Shape &amp; Elevation</Heading>
          <SectionResetButton section="shape" />
        </Flex>
        <Text variant="muted">
          Border radii are controlled by the scale base unit — adjust it on the Scale page
          to proportionally resize all radii. Shadows define elevation levels for cards and overlays.
        </Text>
      </Flex>
      <RadiusEditor />
      <ShadowEditor />
    </Flex>
  );
}
