'use client';

import { useId } from 'react';
import { useConfig } from '../lib/state';
import { generateCssProperties } from '../lib/css-generator';
import { useFontLoader } from '../lib/font-loader';
import { AtomSamples } from './atom-samples';
import { ThemeProof } from './theme-proof';
import { Flex, Text, Tabs, TabList, Tab, TabPanel } from '@toucan-ui/core';

/**
 * Preview panel that renders factory atoms with CSS custom property overrides.
 *
 * Uses a <style> element scoped via data attribute rather than inline styles.
 * This ensures the custom property overrides participate fully in the CSS
 * cascade, so system-level tokens like --button-primary-surface-default
 * (which reference --color-primary via var()) resolve correctly through
 * the inheritance chain.
 */
export function PreviewPanel() {
  const scopeId = useId();
  const { state } = useConfig();
  useFontLoader(state);
  const cssProps = generateCssProperties(state);

  const cssText = Object.entries(cssProps)
    .map(([prop, value]) => `${prop}: ${value};`)
    .join('\n  ');

  return (
    <Flex gap={3}>
      <Text weight="semibold" size="sm">Live Preview</Text>
      <style>{`[data-preview-scope="${scopeId}"] {\n  ${cssText}\n}`}</style>
      <div className="configurator-preview-scope" data-preview-scope={scopeId}>
        <Tabs defaultValue="atoms">
          <TabList>
            <Tab value="atoms">Atoms</Tab>
            <Tab value="theme-proof">Theme Proof</Tab>
          </TabList>
          <TabPanel value="atoms">
            <AtomSamples />
          </TabPanel>
          <TabPanel value="theme-proof">
            <ThemeProof />
          </TabPanel>
        </Tabs>
      </div>
    </Flex>
  );
}
