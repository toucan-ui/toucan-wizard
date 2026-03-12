'use client';

import { useCallback } from 'react';
import { Button } from '@toucan-ui/core';
import { useConfig } from '../lib/state';
import type { ConfigSection } from '../lib/types';

const SECTION_LABELS: Record<ConfigSection, string> = {
  palette: 'Palette',
  semantics: 'Semantics',
  scale: 'Scale',
  layout: 'Layout',
  typography: 'Typography',
  typographyAliases: 'Typography Aliases',
  shape: 'Shape',
  componentOverrides: 'Component Overrides',
};

/** Reset a single section back to factory defaults */
export function SectionResetButton({ section }: { section: ConfigSection }) {
  const { dispatch } = useConfig();

  const handleReset = useCallback(() => {
    if (confirm(`Reset ${SECTION_LABELS[section]} to defaults?`)) {
      dispatch({ type: 'RESET_SECTION', section });
    }
  }, [dispatch, section]);

  return (
    <Button variant="ghost" size="sm" onClick={handleReset}>
      Reset {SECTION_LABELS[section]}
    </Button>
  );
}

/** Reset everything back to factory defaults */
export function ResetAllButton() {
  const { dispatch } = useConfig();

  const handleReset = useCallback(() => {
    if (confirm('Reset all settings to defaults? This cannot be undone.')) {
      dispatch({ type: 'RESET_ALL' });
    }
  }, [dispatch]);

  return (
    <Button variant="ghost" size="sm" onClick={handleReset}>
      Reset All
    </Button>
  );
}
