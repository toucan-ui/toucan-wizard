'use client';

import { Flex, Heading, Text, Box, Separator } from '@toucan-ui/core';
import { useConfig } from '../../../lib/state';

function CodeBlock({ children }: { children: string }) {
  return (
    <Box padding="md" radius="sm">
      <pre className="configurator-code-block">{children}</pre>
    </Box>
  );
}

export default function GettingStartedPage() {
  const { state } = useConfig();
  const name = state.themeName || 'my-theme';

  return (
    <Flex gap={6}>
      <Flex gap={2}>
        <Heading level={2}>Getting Started</Heading>
        <Text variant="muted">
          Follow these steps after downloading your theme.
        </Text>
      </Flex>

      <Flex gap={4}>
        <Heading level={3}>Option A — CSS Custom Properties</Heading>

        <Flex gap={2}>
          <Text weight="semibold">1. Create a Next.js app</Text>
          <CodeBlock>{`npx create-next-app@latest my-app
cd my-app`}</CodeBlock>
        </Flex>

        <Flex gap={2}>
          <Text weight="semibold">2. Install the factory tokens package</Text>
          <CodeBlock>{`npm install @toucan-ui/tokens`}</CodeBlock>
        </Flex>

        <Flex gap={2}>
          <Text weight="semibold">3. Place your downloaded CSS file</Text>
          <Text size="sm" variant="muted">
            Copy the downloaded {name}.css file into your project:
          </Text>
          <CodeBlock>{`cp ~/Downloads/${name}.css ./app/themes/${name}.css`}</CodeBlock>
        </Flex>

        <Flex gap={2}>
          <Text weight="semibold">4. Import in app/layout.tsx</Text>
          <Text size="sm" variant="muted">
            Import the base tokens first, then your theme override:
          </Text>
          <CodeBlock>{`import '@toucan-ui/tokens/css';
import './themes/${name}.css';`}</CodeBlock>
        </Flex>

        <Flex gap={2}>
          <Text weight="semibold">5. Add recommended app globals</Text>
          <Text size="sm" variant="muted">
            Factory doesn&apos;t ship a CSS reset — add these baseline styles to your global stylesheet:
          </Text>
          <CodeBlock>{`/* app/globals.css */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--text-font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`}</CodeBlock>
        </Flex>

        <Flex gap={2}>
          <Text weight="semibold">6. Add data-theme attribute to &lt;html&gt;</Text>
          <CodeBlock>{`export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="${name}">
      <body>{children}</body>
    </html>
  );
}`}</CodeBlock>
        </Flex>

        <Flex gap={2}>
          <Text weight="semibold">7. Build a page using factory components</Text>
          <CodeBlock>{`import { Section, Wrapper, Heading, Text, Button } from '@toucan-ui/core';

export default function Home() {
  return (
    <Section padding="lg">
      <Wrapper>
        <Heading level={1}>Hello, ${name}!</Heading>
        <Text>Your theme is working.</Text>
        <Button variant="primary">Get Started</Button>
      </Wrapper>
    </Section>
  );
}`}</CodeBlock>
        </Flex>
      </Flex>

      <Separator />

      <Flex gap={4}>
        <Heading level={3}>Option B — JSON Tokens (Style Dictionary)</Heading>

        <Flex gap={2}>
          <Text weight="semibold">1. Create a Next.js app and install Style Dictionary</Text>
          <CodeBlock>{`npx create-next-app@latest my-app
cd my-app
npm install style-dictionary`}</CodeBlock>
        </Flex>

        <Flex gap={2}>
          <Text weight="semibold">2. Extract the ZIP into a tokens/ directory</Text>
          <CodeBlock>{`unzip ~/Downloads/${name}-tokens.zip -d ./tokens`}</CodeBlock>
        </Flex>

        <Flex gap={2}>
          <Text weight="semibold">3. Create a Style Dictionary config</Text>
          <Text size="sm" variant="muted">
            Create style-dictionary.config.json in your project root:
          </Text>
          <CodeBlock>{`{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "app/themes/",
      "files": [
        {
          "destination": "${name}.css",
          "format": "css/variables",
          "options": {
            "selector": "[data-theme=\\"${name}\\"]"
          }
        }
      ]
    }
  }
}`}</CodeBlock>
        </Flex>

        <Flex gap={2}>
          <Text weight="semibold">4. Add a build script and run it</Text>
          <Text size="sm" variant="muted">
            Add to your package.json scripts, then run:
          </Text>
          <CodeBlock>{`// package.json
"scripts": {
  "build:tokens": "style-dictionary build"
}

// Terminal
npm run build:tokens`}</CodeBlock>
        </Flex>

        <Flex gap={2}>
          <Text weight="semibold">5. Import the generated CSS and add data-theme to &lt;html&gt;</Text>
          <CodeBlock>{`// app/layout.tsx
import '@toucan-ui/tokens/css';
import './themes/${name}.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="${name}">
      <body>{children}</body>
    </html>
  );
}`}</CodeBlock>
        </Flex>

        <Flex gap={2}>
          <Text weight="semibold">6. Add recommended app globals</Text>
          <Text size="sm" variant="muted">
            Factory doesn&apos;t ship a CSS reset — add these baseline styles to your global stylesheet:
          </Text>
          <CodeBlock>{`/* app/globals.css */
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--text-font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`}</CodeBlock>
        </Flex>

        <Flex gap={2}>
          <Text weight="semibold">7. Build a page</Text>
          <CodeBlock>{`import { Section, Wrapper, Heading, Text, Button } from '@toucan-ui/core';

export default function Home() {
  return (
    <Section padding="lg">
      <Wrapper>
        <Heading level={1}>Hello, ${name}!</Heading>
        <Text>Your theme is working.</Text>
        <Button variant="primary">Get Started</Button>
      </Wrapper>
    </Section>
  );
}`}</CodeBlock>
        </Flex>
      </Flex>
    </Flex>
  );
}
