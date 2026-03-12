'use client';

import { Flex, Heading, Text } from '@toucan-ui/core';
import { ComponentOverrideEditor } from '../../../components/component-override-editor';
import { SectionResetButton } from '../../../components/reset-buttons';

export default function ComponentsPage() {
  return (
    <Flex gap={6}>
      <Flex gap={2}>
        <Flex row justify="between" align="center">
          <Heading level={2}>Component Overrides</Heading>
          <SectionResetButton section="componentOverrides" />
        </Flex>
        <Text variant="muted">
          System tier — override tokens for individual components.
          Each component has system tokens (e.g. button padding, input radius) that default to alias values.
          Overriding a token here only affects that specific component, without changing the global alias.
        </Text>
      </Flex>
      <ComponentOverrideEditor />
    </Flex>
  );
}
