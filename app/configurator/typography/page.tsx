'use client';

import { Flex, Heading, Text } from '@toucan-ui/core';
import { TypographyAliasEditor } from '../../../components/typography-alias-editor';
import { SectionResetButton } from '../../../components/reset-buttons';

export default function TypographyPage() {
  return (
    <Flex gap={6}>
      <Flex gap={2}>
        <Flex row justify="between" align="center">
          <Heading level={2}>Typography</Heading>
          <SectionResetButton section="typographyAliases" />
        </Flex>
        <Text variant="muted">
          Alias tier — map semantic text roles (body, headings, display) to your raw type scale values.
          Each dropdown references keys defined on the Type Scale step.
        </Text>
      </Flex>
      <TypographyAliasEditor />
    </Flex>
  );
}
