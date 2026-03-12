'use client';

import {
  Heading,
  Text,
  Button,
  Badge,
  Input,
  Select,
  Box,
  Alert,
  Section,
  Flex,
  Grid,
  Separator,
} from '@toucan-ui/core';

/**
 * Composed vignettes that test real surface-stacking scenarios.
 * Used alongside AtomSamples to verify contrast and cascade behaviour.
 */
export function ThemeProof() {
  return (
    <Flex gap={6}>
      {/* 1. Page surface — base contrast */}
      <Flex gap={2}>
        <Text weight="medium" size="sm">Page Surface</Text>
        <Section background="default" padding="md">
          <Flex gap={2}>
            <Heading level={2}>Default Surface</Heading>
            <Text>Body text on the default page background.</Text>
            <Text muted>Muted text for secondary information.</Text>
          </Flex>
        </Section>
      </Flex>

      <Separator />

      {/* 2. Muted section — nested surfaces */}
      <Flex gap={2}>
        <Text weight="medium" size="sm">Muted Section</Text>
        <Section background="muted" padding="md">
          <Flex gap={3}>
            <Heading level={3}>Muted Background</Heading>
            <Text>Body text on a muted surface.</Text>
            <Box elevation={1} radius="md" padding="md">
              <Flex gap={1}>
                <Heading level={4}>Raised Card</Heading>
                <Text size="sm">Card content elevated above the muted surface.</Text>
              </Flex>
            </Box>
          </Flex>
        </Section>
      </Flex>

      <Separator />

      {/* 3. Primary section — cascade test */}
      <Flex gap={2}>
        <Text weight="medium" size="sm">Primary Section (Cascade)</Text>
        <Section background="primary" padding="md">
          <Flex gap={2}>
            <Heading level={2}>Primary Surface</Heading>
            <Text>Body text inherits on-primary colour via cascade.</Text>
            <Text muted>Muted text also resolves to on-primary.</Text>
            <Flex row gap={2}>
              <Button variant="ghost">Ghost on Primary</Button>
              <Button variant="secondary">Secondary on Primary</Button>
            </Flex>
          </Flex>
        </Section>
      </Flex>

      <Separator />

      {/* 4. Card grid — cards on muted */}
      <Flex gap={2}>
        <Text weight="medium" size="sm">Card Grid on Muted</Text>
        <Section background="muted" padding="md">
          <Grid columns={2} gap={3}>
            <Box elevation={1} radius="md" padding="md">
              <Flex gap={2}>
                <Flex row gap={2} align="center">
                  <Heading level={4}>Feature One</Heading>
                  <Badge variant="success" size="sm">New</Badge>
                </Flex>
                <Text size="sm">Card content on a raised surface over muted background.</Text>
              </Flex>
            </Box>
            <Box elevation={1} radius="md" padding="md">
              <Flex gap={2}>
                <Flex row gap={2} align="center">
                  <Heading level={4}>Feature Two</Heading>
                  <Badge variant="info" size="sm">Beta</Badge>
                </Flex>
                <Text size="sm">Another card verifying consistent contrast and spacing.</Text>
              </Flex>
            </Box>
          </Grid>
        </Section>
      </Flex>

      <Separator />

      {/* 5. Form controls */}
      <Flex gap={2}>
        <Text weight="medium" size="sm">Form Controls</Text>
        <Flex gap={3}>
          <Input label="Full name" placeholder="Jane Doe" />
          <Select
            label="Country"
            options={[
              { value: 'au', label: 'Australia' },
              { value: 'uk', label: 'United Kingdom' },
              { value: 'us', label: 'United States' },
            ]}
            placeholder="Select country..."
          />
        </Flex>
      </Flex>

      <Separator />

      {/* 6. Alerts */}
      <Flex gap={2}>
        <Text weight="medium" size="sm">Alert Variants</Text>
        <Flex gap={2}>
          <Alert variant="info">Informational — check your email for a confirmation link.</Alert>
          <Alert variant="success">Success — your changes have been saved.</Alert>
          <Alert variant="warning">Warning — your trial expires in 3 days.</Alert>
          <Alert variant="danger">Error — payment could not be processed.</Alert>
        </Flex>
      </Flex>

      <Separator />

      {/* 7. Nested composition — real-world stack */}
      <Flex gap={2}>
        <Text weight="medium" size="sm">Nested Composition</Text>
        <Section background="muted" padding="md">
          <Box elevation={2} radius="md" padding="md">
            <Flex gap={3}>
              <Heading level={3}>Subscription Plan</Heading>
              <Text size="sm">Your current plan includes all features.</Text>
              <Flex row gap={2} align="center">
                <Button variant="primary" size="sm">Upgrade</Button>
                <Badge variant="primary" size="sm">Pro</Badge>
              </Flex>
            </Flex>
          </Box>
        </Section>
      </Flex>
    </Flex>
  );
}
