'use client';

import { Flex, Heading, Text } from '@toucan-ui/core';
import { ScaleEditor } from '../../../components/scale-editor';
import { SectionResetButton } from '../../../components/reset-buttons';

export default function ScalePage() {
  return (
    <Flex gap={6}>
      <Flex gap={2}>
        <Flex row justify="between" align="center">
          <Heading level={2}>Scale &amp; Layout</Heading>
          <SectionResetButton section="scale" />
        </Flex>
        <Text variant="muted">
          Raw tier — the numeric scale that underpins spacing, sizing, and layout.
          Scale tokens are small dimensions (0-64px) used by spacing and sizing aliases.
          Layout tokens are larger fixed dimensions (80-1280px) used for container max-widths, grid minimums, and dropdown max-heights.
        </Text>
      </Flex>
      <ScaleEditor />
    </Flex>
  );
}
