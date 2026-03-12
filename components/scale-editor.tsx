'use client';

import { useCallback } from 'react';
import { Flex, Text, Input, Button, Box, FlexItem } from '@toucan-ui/core';
import { useConfig } from '../lib/state';

const PRESETS = {
  '4px increments': { baseUnit: 4, multiplier: 1 },
  '8px increments': { baseUnit: 8, multiplier: 1 },
} as const;

/**
 * Editor for scale and layout tokens.
 * Provides a base unit input, preset strategies, and a visual scale display.
 */
export function ScaleEditor() {
  const { state, dispatch } = useConfig();
  const { scale, layout } = state;

  const handleScaleBaseChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const baseUnit = parseInt(e.target.value, 10);
      if (isNaN(baseUnit) || baseUnit < 1) return;

      const steps: Record<string, number> = {};
      for (const key of Object.keys(scale.steps)) {
        const num = parseFloat(key);
        // Pin sub-unit steps (< 1) to fixed values
        if (num < 1) {
          steps[key] = scale.steps[key];
        } else {
          steps[key] = Math.round(num * baseUnit);
        }
      }
      dispatch({ type: 'SET_SCALE', scale: { baseUnit, steps } });
    },
    [dispatch, scale.steps]
  );

  const handleLayoutBaseChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const baseUnit = parseInt(e.target.value, 10);
      if (isNaN(baseUnit) || baseUnit < 1) return;

      const steps: Record<string, number> = {};
      for (const key of Object.keys(layout.steps)) {
        const num = parseInt(key, 10);
        steps[key] = num * baseUnit;
      }
      dispatch({ type: 'SET_LAYOUT', layout: { baseUnit, steps } });
    },
    [dispatch, layout.steps]
  );

  const handleScaleStepChange = useCallback(
    (step: string, value: string) => {
      const num = parseInt(value, 10);
      if (isNaN(num)) return;
      dispatch({
        type: 'SET_SCALE',
        scale: { steps: { ...scale.steps, [step]: num } },
      });
    },
    [dispatch, scale.steps]
  );

  const handleLayoutStepChange = useCallback(
    (step: string, value: string) => {
      const num = parseInt(value, 10);
      if (isNaN(num)) return;
      dispatch({
        type: 'SET_LAYOUT',
        layout: { steps: { ...layout.steps, [step]: num } },
      });
    },
    [dispatch, layout.steps]
  );

  const applyPreset = useCallback(
    (name: keyof typeof PRESETS) => {
      const preset = PRESETS[name];
      const scaleSteps: Record<string, number> = {};
      for (const key of Object.keys(scale.steps)) {
        const num = parseFloat(key);
        // Pin sub-unit steps (< 1) to fixed values
        if (num < 1) {
          scaleSteps[key] = scale.steps[key];
        } else {
          scaleSteps[key] = Math.round(num * preset.baseUnit);
        }
      }
      const layoutSteps: Record<string, number> = {};
      for (const key of Object.keys(layout.steps)) {
        const num = parseInt(key, 10);
        layoutSteps[key] = num * preset.baseUnit;
      }
      dispatch({ type: 'SET_SCALE', scale: { baseUnit: preset.baseUnit, steps: scaleSteps } });
      dispatch({ type: 'SET_LAYOUT', layout: { baseUnit: preset.baseUnit, steps: layoutSteps } });
    },
    [dispatch, scale.steps, layout.steps]
  );

  return (
    <Flex gap={6}>
      {/* Presets */}
      <Flex gap={2}>
        <Text weight="semibold">Scale Presets</Text>
        <Flex row gap={2} wrap>
          {Object.keys(PRESETS).map((name) => (
            <Button
              key={name}
              variant="secondary"
              size="sm"
              onClick={() => applyPreset(name as keyof typeof PRESETS)}
            >
              {name}
            </Button>
          ))}
        </Flex>
      </Flex>

      {/* Scale */}
      <Flex gap={3}>
        <Text weight="semibold">Scale</Text>
        <Flex row gap={2} align="end">
          <Flex gap={1}>
            <Text size="sm" weight="medium">Base Unit (px) - the cornerstone to all units of measurement, icons, border-radius, type.</Text>
            <Input
              type="number"
              value={String(scale.baseUnit)}
              onChange={handleScaleBaseChange}
              size="sm"
              aria-label="Scale base unit"
            />
          </Flex>
        </Flex>
        <Flex row gap={2} wrap>
          {Object.entries(scale.steps).sort(([a], [b]) => parseFloat(a) - parseFloat(b)).map(([step, value]) => (
            <Flex key={step} gap={1} align="center">
              <Text size="sm" variant="muted">{step}</Text>
              <Input
                type="number"
                value={String(value)}
                onChange={(e) => handleScaleStepChange(step, e.target.value)}
                size="sm"
                aria-label={`Scale step ${step}`}
              />
              <Box
                padding="none"
                radius="sm"
                className="configurator-spacing-visual"
                style={{ width: `${Math.min(value, 80)}px`, height: '8px' }}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* Layout */}
      <Flex gap={3}>
        <Text weight="semibold">Layout</Text>
        <Flex row gap={2} align="end">
          <Flex gap={1}>
            <Text size="sm" weight="medium">Base Unit (px) - larger scale layotu orientated units. think Desktop wrapper padding or media query breakpoints, max-widths etc.</Text>
            <FlexItem shrink><Input
              type="number"
              value={String(layout.baseUnit)}
              onChange={handleLayoutBaseChange}
              size="sm"
              aria-label="Layout base unit"
            /></FlexItem>
          </Flex>
        </Flex>
        <Flex row gap={2} wrap>
          {Object.entries(layout.steps).map(([step, value]) => (
            <Flex key={step} gap={1} align="center">
              <Text size="sm" variant="muted">{step}</Text>
              <Input
                type="number"
                value={String(value)}
                onChange={(e) => handleLayoutStepChange(step, e.target.value)}
                size="sm"
                aria-label={`Layout step ${step}`}
              />
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
