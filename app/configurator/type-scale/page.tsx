'use client';

import { Flex, Heading, Text } from '@toucan-ui/core';
import { FontEditor } from '../../../components/font-editor';
import { SectionResetButton } from '../../../components/reset-buttons';

export default function TypeScalePage() {
  return (
    <Flex gap={6}>
      <Flex gap={2}>
        <Flex row justify="between" align="center">
          <Heading level={2}>Type Scale</Heading>
          <SectionResetButton section="typography" />
        </Flex>
        <Text variant="muted">
          Raw tier — configure font families, the type size scale, weights, line heights, and letter spacings.
          These raw values are referenced by the Typography alias step to build semantic text styles.
        </Text>
      </Flex>
      <FontEditor />
    </Flex>
  );
}
