'use client';

import { Flex, Heading, Text } from '@toucan-ui/core';
import { RoleMapper } from '../../../components/role-mapper';
import { SectionResetButton } from '../../../components/reset-buttons';

export default function ColoursPage() {
  return (
    <Flex gap={6}>
      <Flex gap={2}>
        <Flex row justify="between" align="center">
          <Heading level={2}>Colour Aliases</Heading>
          <SectionResetButton section="semantics" />
        </Flex>
        <Text variant="muted">
          Alias tier — map semantic colour roles to your raw palette shades.
          Components reference these aliases (e.g. &quot;primary&quot;, &quot;danger&quot;) rather than specific hex values,
          so changing a mapping here cascades through every component that uses it.
        </Text>
      </Flex>
      <RoleMapper />
    </Flex>
  );
}
