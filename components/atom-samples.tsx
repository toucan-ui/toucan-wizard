'use client';

import {
  Button,
  Badge,
  Input,
  Textarea,
  Checkbox,
  Toggle,
  Select,
  Box,
  Alert,
  Avatar,
  Text,
  Heading,
  Separator,
  Skeleton,
  Progress,
  Flex,
  RadioGroup,
  Radio,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  Link as FactoryLink,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Slider,
} from '@toucan-ui/core';

/**
 * A curated set of factory atoms rendered to exercise all token categories.
 * Used inside the preview panel to show live theme changes.
 */
export function AtomSamples() {
  return (
    <Flex gap={6}>
      {/* Typography — Display */}
      <Flex gap={2}>
        <Heading level={1} display="lg">Display Large</Heading>
        <Heading level={1} display="md">Display Medium</Heading>
        <Heading level={1} display="sm">Display Small</Heading>
      </Flex>

      <Separator />

      {/* Typography — Headings */}
      <Flex gap={2}>
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>
        <Heading level={5}>Heading 5</Heading>
        <Heading level={6}>Heading 6</Heading>
      </Flex>

      <Separator />

      {/* Typography — Body */}
      <Flex gap={2}>
        <Text size="lg">Large body text for lead paragraphs.</Text>
        <Text>Default body text in the surface colour.</Text>
        <Text size="sm">Small text for captions and secondary content.</Text>
        <Text size="xs">Extra-small text for fine print and labels.</Text>
        <Text muted>Muted text for supporting information.</Text>
      </Flex>

      <Separator />

      {/* Typography — Code */}
      <Flex gap={3}>
        <Text weight="medium" size="sm">Code</Text>
        <Box padding="md" radius="md">
          <Text mono size="sm">const theme = createTheme(tokens);</Text>
          <Text mono size="sm">export default theme;</Text>
        </Box>
      </Flex>

      <Separator />

      {/* Buttons */}
      <Flex gap={3}>
        <Text weight="medium" size="sm">Buttons</Text>
        <Flex row gap={2} wrap>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </Flex>
      </Flex>

      <Separator />

      {/* Badges */}
      <Flex gap={3}>
        <Text weight="medium" size="sm">Badges</Text>
        <Flex row gap={2} wrap>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="danger">Danger</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
        </Flex>
      </Flex>

      <Separator />

      {/* Form controls */}
      <Flex gap={3}>
        <Text weight="medium" size="sm">Inputs</Text>
        <Input placeholder="Text input" />
        <Textarea placeholder="Textarea" />
        <Flex row gap={4} wrap>
          <Checkbox label="Checkbox" />
          <Toggle label="Toggle" />
        </Flex>
        <Select
          options={[
            { value: 'one', label: 'Option One' },
            { value: 'two', label: 'Option Two' },
          ]}
          placeholder="Select..."
        />
      </Flex>

      <Separator />

      {/* Radio Group */}
      <Flex gap={3}>
        <Text weight="medium" size="sm">Radio Group</Text>
        <RadioGroup name="preview-radio" defaultValue="first">
          <Radio value="first" label="First option" />
          <Radio value="second" label="Second option" />
          <Radio value="third" label="Third option" />
        </RadioGroup>
      </Flex>

      <Separator />

      {/* Cards / Boxes */}
      <Flex gap={3}>
        <Text weight="medium" size="sm">Box / Card</Text>
        <Box elevation={1} radius="md" padding="md">
          <Text>Elevated box with medium radius and padding.</Text>
        </Box>
      </Flex>

      <Separator />

      {/* Alerts */}
      <Flex gap={3}>
        <Text weight="medium" size="sm">Alerts</Text>
        <Alert variant="info">Informational message.</Alert>
        <Alert variant="success">Success message.</Alert>
        <Alert variant="warning">Warning message.</Alert>
        <Alert variant="danger">Error message.</Alert>
      </Flex>

      <Separator />

      {/* Avatar */}
      <Flex gap={3}>
        <Text weight="medium" size="sm">Avatars</Text>
        <Flex row gap={2}>
          <Avatar initials="JD" size="sm" />
          <Avatar initials="AB" size="md" />
          <Avatar initials="XY" size="lg" />
        </Flex>
      </Flex>

      <Separator />

      {/* Accordion */}
      <Flex gap={3}>
        <Text weight="medium" size="sm">Accordion</Text>
        <Accordion type="single" defaultValue="item-1" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>First section</AccordionTrigger>
            <AccordionPanel>
              <Text size="sm">Content for the first accordion section.</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second section</AccordionTrigger>
            <AccordionPanel>
              <Text size="sm">Content for the second accordion section.</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Third section</AccordionTrigger>
            <AccordionPanel>
              <Text size="sm">Content for the third accordion section.</Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>

      <Separator />

      {/* Link */}
      <Flex gap={3}>
        <Text weight="medium" size="sm">Link</Text>
        <Flex row gap={3} wrap>
          <FactoryLink href="#">Default link</FactoryLink>
          <FactoryLink href="#" size="sm">Small link</FactoryLink>
        </Flex>
      </Flex>

      <Separator />

      {/* Breadcrumb */}
      <Flex gap={3}>
        <Text weight="medium" size="sm">Breadcrumb</Text>
        <Breadcrumb>
          <BreadcrumbItem href="#">Home</BreadcrumbItem>
          <BreadcrumbItem href="#">Settings</BreadcrumbItem>
          <BreadcrumbItem isCurrent>Profile</BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Separator />

      {/* Tabs */}
      <Flex gap={3}>
        <Text weight="medium" size="sm">Tabs</Text>
        <Tabs defaultValue="tab-1">
          <TabList>
            <Tab value="tab-1">Overview</Tab>
            <Tab value="tab-2">Details</Tab>
            <Tab value="tab-3">Settings</Tab>
          </TabList>
          <TabPanel value="tab-1">
            <Text size="sm">Overview panel content.</Text>
          </TabPanel>
          <TabPanel value="tab-2">
            <Text size="sm">Details panel content.</Text>
          </TabPanel>
          <TabPanel value="tab-3">
            <Text size="sm">Settings panel content.</Text>
          </TabPanel>
        </Tabs>
      </Flex>

      <Separator />

      {/* Separator showcase */}
      <Flex gap={3}>
        <Text weight="medium" size="sm">Separator</Text>
        <Separator />
        <Text size="xs" variant="muted">Horizontal separator shown above and below.</Text>
        <Separator />
      </Flex>

      <Separator />

      {/* Slider */}
      <Flex gap={3}>
        <Text weight="medium" size="sm">Slider</Text>
        <Slider label="Volume" defaultValue={50} />
      </Flex>

      <Separator />

      {/* Progress + Skeleton */}
      <Flex gap={3}>
        <Text weight="medium" size="sm">Progress &amp; Skeleton</Text>
        <Progress value={65} label="Example progress" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Flex>
    </Flex>
  );
}
