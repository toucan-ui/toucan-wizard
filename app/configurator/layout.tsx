'use client';

import { usePathname } from 'next/navigation';
import { ConfigProvider } from '../../lib/state';
import { WizardNav } from '../../components/wizard-nav';
import { PreviewPanel } from '../../components/preview-panel';
import { ResetAllButton } from '../../components/reset-buttons';
import { Grid, GridItem, Section, Wrapper, Flex, Heading } from '@toucan-ui/core';

/** Raw-tier steps don't show the live preview */
const RAW_PATHS = ['/configurator/palette', '/configurator/scale', '/configurator/type-scale', '/configurator/getting-started'];

/**
 * Wizard shell layout: step nav at top.
 * Raw steps render single-column; alias/system steps render two-column with preview.
 */
export default function ConfiguratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isRawStep = RAW_PATHS.includes(pathname);

  return (
    <ConfigProvider>
      <Section padding="md">
        <Wrapper>
          <Flex gap={6}>
            <Flex row justify="between" align="center">
              <Heading level={1}>Theme Wiz'rd</Heading>
              <ResetAllButton />
            </Flex>
            <WizardNav />
            {isRawStep ? (
              children
            ) : (
              <Grid columns={2} gap={6}>
                <GridItem>
                  {children}
                </GridItem>
                <GridItem>
                  <div className="configurator-preview-sticky">
                    <PreviewPanel />
                  </div>
                </GridItem>
              </Grid>
            )}
          </Flex>
        </Wrapper>
      </Section>
    </ConfigProvider>
  );
}
