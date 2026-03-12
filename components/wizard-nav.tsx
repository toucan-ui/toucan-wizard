'use client';

import { usePathname } from 'next/navigation';
import { Button, Flex, Text } from '@toucan-ui/core';
import Link from 'next/link';

const STEPS = [
  { path: '/configurator/palette', label: '1. Palette', tier: 'Raw' },
  { path: '/configurator/scale', label: '2. Scale', tier: 'Raw' },
  { path: '/configurator/type-scale', label: '3. Type Scale', tier: 'Raw' },
  { path: '/configurator/colours', label: '4. Colours', tier: 'Alias' },
  { path: '/configurator/dimensions', label: '5. Dimensions', tier: 'Alias' },
  { path: '/configurator/typography', label: '6. Typography', tier: 'Alias' },
  { path: '/configurator/shape', label: '7. Shape', tier: 'Alias' },
  { path: '/configurator/components', label: '8. Components', tier: 'System' },
  { path: '/configurator/download', label: '9. Download', tier: 'Export' },
  { path: '/configurator/getting-started', label: '10. Getting Started', tier: 'Export' },
] as const;

type Tier = (typeof STEPS)[number]['tier'];

function groupByTier() {
  const groups: { tier: Tier; steps: typeof STEPS[number][] }[] = [];
  let currentTier: Tier | null = null;

  for (const step of STEPS) {
    if (step.tier !== currentTier) {
      groups.push({ tier: step.tier, steps: [] });
      currentTier = step.tier;
    }
    groups[groups.length - 1].steps.push(step);
  }

  return groups;
}

const TIER_GROUPS = groupByTier();

export function WizardNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Configuration steps">
      <Flex gap={3}>
        {TIER_GROUPS.map((group) => (
          <Flex key={group.tier} gap={1}>
            <Text size="xs" weight="semibold" variant="muted">
              {group.tier}
            </Text>
            <Flex row gap={1} wrap>
              {group.steps.map((step) => {
                const isActive = pathname === step.path;
                return (
                  <Button
                    key={step.path}
                    as="a"
                    href={step.path}
                    variant={isActive ? 'primary' : 'secondary'}
                    size="sm"
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {step.label}
                  </Button>
                );
              })}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </nav>
  );
}
