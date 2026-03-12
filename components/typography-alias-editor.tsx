'use client';

import { useCallback, useEffect, useState } from 'react';
import { Flex, Text, Select, Separator, Input } from '@toucan-ui/core';
import type { SelectOption } from '@toucan-ui/core';
import { useConfig } from '../lib/state';
import type { TypographyAliases, TypographyConfig } from '../lib/types';
import {
  FONT_PRESETS,
  MONO_PRESETS,
  CUSTOM_FONT_VALUE,
  type FontPreset,
} from '../lib/font-presets';

/** Combined, sorted font list (all presets merged + deduplicated) */
const ALL_FONT_OPTIONS = (() => {
  const seen = new Set<string>();
  const merged: FontPreset[] = [];
  for (const p of [...FONT_PRESETS, ...MONO_PRESETS]) {
    if (seen.has(p.value)) continue;
    seen.add(p.value);
    merged.push(p);
  }
  merged.sort((a, b) => a.label.localeCompare(b.label));
  return [
    ...merged.map((p) => ({ value: p.value, label: p.label })),
    { value: CUSTOM_FONT_VALUE, label: 'Custom...' },
  ];
})();

/** Check if a value is a known preset */
function isPresetValue(value: string): boolean {
  return [...FONT_PRESETS, ...MONO_PRESETS].some((p) => p.value === value);
}

/** Preload all Google Fonts so dropdown previews render correctly */
const PRELOAD_LINK_PREFIX = 'font-preview-';

function usePreloadPresetFonts() {
  useEffect(() => {
    const allPresets = [...FONT_PRESETS, ...MONO_PRESETS];
    const seenUrls = new Set<string>();

    for (const preset of allPresets) {
      if (!preset.googleFontsUrl || seenUrls.has(preset.googleFontsUrl)) continue;
      seenUrls.add(preset.googleFontsUrl);

      const id = PRELOAD_LINK_PREFIX + preset.label.replace(/\s+/g, '-').toLowerCase();
      if (document.getElementById(id)) continue;

      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = preset.googleFontsUrl;
      document.head.appendChild(link);
    }
  }, []);
}

/** Render a Select option in its own font */
function renderFontOption(option: SelectOption) {
  if (option.value === CUSTOM_FONT_VALUE) return option.label;
  return <span style={{ fontFamily: option.value }}>{option.label}</span>;
}

/** Build Select options from a Record's keys */
function keysToOptions(record: Record<string, unknown>) {
  return Object.keys(record).map((key) => ({ value: key, label: key }));
}

interface AliasSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function AliasSelect({ label, value, options, onChange }: AliasSelectProps) {
  return (
    <Flex gap={1}>
      <Text size="sm" variant="muted">{label}</Text>
      <Select options={options} value={value} onChange={onChange} size="sm" />
    </Flex>
  );
}

interface FontFamilyPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function FontFamilyPicker({ label, value, onChange }: FontFamilyPickerProps) {
  const [isCustom, setIsCustom] = useState(!isPresetValue(value));

  return (
    <Flex gap={1}>
      <Text size="sm" weight="medium">{label}</Text>
      <Select
        options={ALL_FONT_OPTIONS}
        value={isCustom ? CUSTOM_FONT_VALUE : value}
        onChange={(v) => {
          if (v === CUSTOM_FONT_VALUE) {
            setIsCustom(true);
          } else {
            setIsCustom(false);
            onChange(v);
          }
        }}
        size="sm"
        renderOption={renderFontOption}
      />
      {isCustom && (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="'My Font', sans-serif"
          size="sm"
          aria-label={`Custom ${label.toLowerCase()} font family`}
        />
      )}
    </Flex>
  );
}

export function TypographyAliasEditor() {
  const { state, dispatch } = useConfig();
  const { typographyAliases: aliases, typography } = state;

  usePreloadPresetFonts();

  const weightOptions = keysToOptions(typography.fontWeights);
  const lineHeightOptions = keysToOptions(typography.lineHeights);
  const letterSpacingOptions = keysToOptions(typography.letterSpacings);

  const updateAliases = useCallback(
    (partial: Partial<TypographyAliases>) => {
      dispatch({ type: 'SET_TYPOGRAPHY_ALIASES', aliases: partial });
    },
    [dispatch]
  );

  const updateTypography = useCallback(
    (partial: Partial<TypographyConfig>) => {
      dispatch({ type: 'SET_TYPOGRAPHY', typography: partial });
    },
    [dispatch]
  );

  return (
    <Flex gap={6}>
      {/* Font Families */}
      <Flex gap={3}>
        <Text weight="semibold">Font Families</Text>
        <Flex gap={3}>
          <FontFamilyPicker
            label="Body"
            value={typography.fontFamilyBody}
            onChange={(v) => updateTypography({ fontFamilyBody: v })}
          />
          <FontFamilyPicker
            label="Heading"
            value={typography.fontFamilyHeading}
            onChange={(v) => updateTypography({ fontFamilyHeading: v })}
          />
          <FontFamilyPicker
            label="Display"
            value={typography.fontFamilyDisplay}
            onChange={(v) => updateTypography({ fontFamilyDisplay: v })}
          />
          <FontFamilyPicker
            label="Mono"
            value={typography.fontFamilyMono}
            onChange={(v) => updateTypography({ fontFamilyMono: v })}
          />
        </Flex>
      </Flex>

      <Separator />

      {/* Body Text Variants */}
      <Flex gap={3}>
        <Text weight="semibold">Body Text</Text>
        <Flex gap={3}>
          <Flex gap={1}>
            <Text size="sm" weight="medium">XS</Text>
            <Flex row gap={3} wrap>
              <AliasSelect label="Weight" value={aliases.textXsWeight} options={weightOptions} onChange={(v) => updateAliases({ textXsWeight: v })} />
              <AliasSelect label="Line Height" value={aliases.textXsLineHeight} options={lineHeightOptions} onChange={(v) => updateAliases({ textXsLineHeight: v })} />
              <AliasSelect label="Letter Spacing" value={aliases.textXsLetterSpacing} options={letterSpacingOptions} onChange={(v) => updateAliases({ textXsLetterSpacing: v })} />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Text size="sm" weight="medium">SM</Text>
            <Flex row gap={3} wrap>
              <AliasSelect label="Weight" value={aliases.textSmWeight} options={weightOptions} onChange={(v) => updateAliases({ textSmWeight: v })} />
              <AliasSelect label="Line Height" value={aliases.textSmLineHeight} options={lineHeightOptions} onChange={(v) => updateAliases({ textSmLineHeight: v })} />
              <AliasSelect label="Letter Spacing" value={aliases.textSmLetterSpacing} options={letterSpacingOptions} onChange={(v) => updateAliases({ textSmLetterSpacing: v })} />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Text size="sm" weight="medium">Body (base)</Text>
            <Flex row gap={3} wrap>
              <AliasSelect label="Weight" value={aliases.bodyWeight} options={weightOptions} onChange={(v) => updateAliases({ bodyWeight: v })} />
              <AliasSelect label="Line Height" value={aliases.bodyLineHeight} options={lineHeightOptions} onChange={(v) => updateAliases({ bodyLineHeight: v })} />
              <AliasSelect label="Letter Spacing" value={aliases.bodyLetterSpacing} options={letterSpacingOptions} onChange={(v) => updateAliases({ bodyLetterSpacing: v })} />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Text size="sm" weight="medium">LG</Text>
            <Flex row gap={3} wrap>
              <AliasSelect label="Weight" value={aliases.textLgWeight} options={weightOptions} onChange={(v) => updateAliases({ textLgWeight: v })} />
              <AliasSelect label="Line Height" value={aliases.textLgLineHeight} options={lineHeightOptions} onChange={(v) => updateAliases({ textLgLineHeight: v })} />
              <AliasSelect label="Letter Spacing" value={aliases.textLgLetterSpacing} options={letterSpacingOptions} onChange={(v) => updateAliases({ textLgLetterSpacing: v })} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Separator />

      {/* Headings */}
      <Flex gap={3}>
        <Text weight="semibold">Headings</Text>
        <Flex gap={3}>
          <Flex gap={1}>
            <Text size="sm" weight="medium">H1</Text>
            <Flex row gap={3} wrap>
              <AliasSelect label="Weight" value={aliases.h1Weight} options={weightOptions} onChange={(v) => updateAliases({ h1Weight: v })} />
              <AliasSelect label="Line Height" value={aliases.h1LineHeight} options={lineHeightOptions} onChange={(v) => updateAliases({ h1LineHeight: v })} />
              <AliasSelect label="Letter Spacing" value={aliases.h1LetterSpacing} options={letterSpacingOptions} onChange={(v) => updateAliases({ h1LetterSpacing: v })} />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Text size="sm" weight="medium">H2</Text>
            <Flex row gap={3} wrap>
              <AliasSelect label="Weight" value={aliases.h2Weight} options={weightOptions} onChange={(v) => updateAliases({ h2Weight: v })} />
              <AliasSelect label="Line Height" value={aliases.h2LineHeight} options={lineHeightOptions} onChange={(v) => updateAliases({ h2LineHeight: v })} />
              <AliasSelect label="Letter Spacing" value={aliases.h2LetterSpacing} options={letterSpacingOptions} onChange={(v) => updateAliases({ h2LetterSpacing: v })} />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Text size="sm" weight="medium">H3</Text>
            <Flex row gap={3} wrap>
              <AliasSelect label="Weight" value={aliases.h3Weight} options={weightOptions} onChange={(v) => updateAliases({ h3Weight: v })} />
              <AliasSelect label="Line Height" value={aliases.h3LineHeight} options={lineHeightOptions} onChange={(v) => updateAliases({ h3LineHeight: v })} />
              <AliasSelect label="Letter Spacing" value={aliases.h3LetterSpacing} options={letterSpacingOptions} onChange={(v) => updateAliases({ h3LetterSpacing: v })} />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Text size="sm" weight="medium">H4</Text>
            <Flex row gap={3} wrap>
              <AliasSelect label="Weight" value={aliases.h4Weight} options={weightOptions} onChange={(v) => updateAliases({ h4Weight: v })} />
              <AliasSelect label="Line Height" value={aliases.h4LineHeight} options={lineHeightOptions} onChange={(v) => updateAliases({ h4LineHeight: v })} />
              <AliasSelect label="Letter Spacing" value={aliases.h4LetterSpacing} options={letterSpacingOptions} onChange={(v) => updateAliases({ h4LetterSpacing: v })} />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Text size="sm" weight="medium">H5</Text>
            <Flex row gap={3} wrap>
              <AliasSelect label="Weight" value={aliases.h5Weight} options={weightOptions} onChange={(v) => updateAliases({ h5Weight: v })} />
              <AliasSelect label="Line Height" value={aliases.h5LineHeight} options={lineHeightOptions} onChange={(v) => updateAliases({ h5LineHeight: v })} />
              <AliasSelect label="Letter Spacing" value={aliases.h5LetterSpacing} options={letterSpacingOptions} onChange={(v) => updateAliases({ h5LetterSpacing: v })} />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Text size="sm" weight="medium">H6</Text>
            <Flex row gap={3} wrap>
              <AliasSelect label="Weight" value={aliases.h6Weight} options={weightOptions} onChange={(v) => updateAliases({ h6Weight: v })} />
              <AliasSelect label="Line Height" value={aliases.h6LineHeight} options={lineHeightOptions} onChange={(v) => updateAliases({ h6LineHeight: v })} />
              <AliasSelect label="Letter Spacing" value={aliases.h6LetterSpacing} options={letterSpacingOptions} onChange={(v) => updateAliases({ h6LetterSpacing: v })} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Separator />

      {/* Display */}
      <Flex gap={3}>
        <Text weight="semibold">Display</Text>
        <Flex gap={3}>
          <Flex gap={1}>
            <Text size="sm" weight="medium">Display Small</Text>
            <Flex row gap={3} wrap>
              <AliasSelect label="Weight" value={aliases.displaySmWeight} options={weightOptions} onChange={(v) => updateAliases({ displaySmWeight: v })} />
              <AliasSelect label="Line Height" value={aliases.displaySmLineHeight} options={lineHeightOptions} onChange={(v) => updateAliases({ displaySmLineHeight: v })} />
              <AliasSelect label="Letter Spacing" value={aliases.displaySmLetterSpacing} options={letterSpacingOptions} onChange={(v) => updateAliases({ displaySmLetterSpacing: v })} />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Text size="sm" weight="medium">Display Medium</Text>
            <Flex row gap={3} wrap>
              <AliasSelect label="Weight" value={aliases.displayMdWeight} options={weightOptions} onChange={(v) => updateAliases({ displayMdWeight: v })} />
              <AliasSelect label="Line Height" value={aliases.displayMdLineHeight} options={lineHeightOptions} onChange={(v) => updateAliases({ displayMdLineHeight: v })} />
              <AliasSelect label="Letter Spacing" value={aliases.displayMdLetterSpacing} options={letterSpacingOptions} onChange={(v) => updateAliases({ displayMdLetterSpacing: v })} />
            </Flex>
          </Flex>
          <Flex gap={1}>
            <Text size="sm" weight="medium">Display Large</Text>
            <Flex row gap={3} wrap>
              <AliasSelect label="Weight" value={aliases.displayLgWeight} options={weightOptions} onChange={(v) => updateAliases({ displayLgWeight: v })} />
              <AliasSelect label="Line Height" value={aliases.displayLgLineHeight} options={lineHeightOptions} onChange={(v) => updateAliases({ displayLgLineHeight: v })} />
              <AliasSelect label="Letter Spacing" value={aliases.displayLgLetterSpacing} options={letterSpacingOptions} onChange={(v) => updateAliases({ displayLgLetterSpacing: v })} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
