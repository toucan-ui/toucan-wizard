'use client';

import { useId } from 'react';
import {
  Button,
  Badge,
  Heading,
  Input,
  Textarea,
  Checkbox,
  Toggle,
  Select,
  Box,
  Alert,
  Text,
  Separator,
  Section,
  Progress,
  Flex,
  RadioGroup,
  Radio,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  Slider,
} from '@toucan-ui/core';
import { useConfig } from '../lib/state';
import { generateCssProperties } from '../lib/css-generator';

/** Map of component name → preview JSX */
const COMPONENT_PREVIEWS: Record<string, React.ReactNode> = {
  button: (
    <Flex gap={3}>
      <Flex row gap={2} wrap align="center">
        <Button variant="primary" size="sm">Small</Button>
        <Button variant="primary" size="md">Medium</Button>
        <Button variant="primary" size="lg">Large</Button>
      </Flex>
      <Flex row gap={2} wrap align="center">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="primary" disabled>Disabled</Button>
      </Flex>
    </Flex>
  ),
  input: (
    <Flex gap={2}>
      <Input label="Default" placeholder="Default input" />
      <Input label="Disabled" placeholder="Disabled input" disabled />
    </Flex>
  ),
  badge: (
    <Flex row gap={2} wrap>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </Flex>
  ),
  checkbox: (
    <Flex gap={2}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" defaultChecked />
    </Flex>
  ),
  radio: (
    <RadioGroup name="preview-radio" label="Options" defaultValue="first">
      <Radio value="first" label="First option" />
      <Radio value="second" label="Second option" />
      <Radio value="third" label="Third option" />
    </RadioGroup>
  ),
  toggle: (
    <Flex gap={2}>
      <Toggle label="Off" />
      <Toggle label="On" defaultChecked />
    </Flex>
  ),
  select: (
    <Select
      label="Select"
      options={[
        { value: 'one', label: 'Option One' },
        { value: 'two', label: 'Option Two' },
        { value: 'three', label: 'Option Three' },
      ]}
      placeholder="Select an option..."
    />
  ),
  textarea: (
    <Textarea label="Textarea" placeholder="Type something..." />
  ),
  alert: (
    <Flex gap={2}>
      <Alert variant="info">Informational alert.</Alert>
      <Alert variant="success">Success alert.</Alert>
      <Alert variant="warning">Warning alert.</Alert>
      <Alert variant="danger">Danger alert.</Alert>
    </Flex>
  ),
  accordion: (
    <Accordion type="single" defaultValue="item-1" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>First section</AccordionTrigger>
        <AccordionPanel>
          <Text size="sm">Content for the first section.</Text>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second section</AccordionTrigger>
        <AccordionPanel>
          <Text size="sm">Content for the second section.</Text>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  ),
  separator: (
    <Flex gap={3}>
      <Text size="sm">Content above</Text>
      <Separator />
      <Text size="sm">Content below</Text>
    </Flex>
  ),
  box: (
    <Flex gap={2}>
      <Box elevation={0} radius="md" padding="md">
        <Text size="sm">Flat box</Text>
      </Box>
      <Box elevation={1} radius="md" padding="md">
        <Text size="sm">Elevated box</Text>
      </Box>
    </Flex>
  ),
  section: (
    <Flex gap={3}>
      <Section background="default" padding="sm">
        <Flex gap={1}>
          <Heading level={4}>Default</Heading>
          <Text size="sm">Body text on default surface.</Text>
          <Text size="sm" muted>Muted text.</Text>
        </Flex>
      </Section>
      <Section background="muted" padding="sm">
        <Flex gap={1}>
          <Heading level={4}>Muted</Heading>
          <Text size="sm">Body text on muted surface.</Text>
          <Text size="sm" muted>Muted text.</Text>
        </Flex>
      </Section>
      <Section background="primary" padding="sm">
        <Flex gap={1}>
          <Heading level={4}>Primary</Heading>
          <Text size="sm">Body text on primary surface.</Text>
          <Text size="sm" muted>Muted text.</Text>
        </Flex>
      </Section>
    </Flex>
  ),
  wrapper: (
    <Text size="sm" variant="muted">Wrapper preview not available — layout component.</Text>
  ),
  focus: (
    <Flex gap={2}>
      <Button variant="primary">Focus me (Tab)</Button>
      <Input label="Focus test" placeholder="Focus me (Tab)" />
    </Flex>
  ),
  progress: (
    <Progress value={65} label="Progress" />
  ),
};

interface ComponentPreviewProps {
  component: string;
}

export function ComponentPreview({ component }: ComponentPreviewProps) {
  const scopeId = useId();
  const { state } = useConfig();
  const cssProps = generateCssProperties(state);

  const cssText = Object.entries(cssProps)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join('\n  ');

  const preview = COMPONENT_PREVIEWS[component];
  if (!preview) return null;

  return (
    <Flex gap={2}>
      <Text weight="semibold" size="sm">Preview</Text>
      <style>{`[data-preview-scope="${scopeId}"] {\n  ${cssText}\n}`}</style>
      <Box padding="md" radius="md" elevation={0}>
        <div className="configurator-preview-scope" data-preview-scope={scopeId}>
          {preview}
        </div>
      </Box>
    </Flex>
  );
}
