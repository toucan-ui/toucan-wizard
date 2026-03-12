'use client';

import { useCallback } from 'react';
import { Flex, Text, Input } from '@toucan-ui/core';
import { isValidHex } from '../lib/colour-utils';

interface ColourPickerFieldProps {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}

/**
 * A colour input combining a native colour picker with a hex text input.
 */
export function ColourPickerField({ label, value, onChange }: ColourPickerFieldProps) {
  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let hex = e.target.value;
      if (!hex.startsWith('#')) hex = `#${hex}`;
      if (isValidHex(hex)) {
        onChange(hex);
      }
    },
    [onChange]
  );

  const handlePickerChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <Flex gap={1}>
      <Text size="sm" weight="medium">{label}</Text>
      <Flex row gap={2} align="center">
        <input
          type="color"
          value={value}
          onChange={handlePickerChange}
          className="configurator-colour-picker"
          aria-label={`${label} colour picker`}
        />
        <Input
          value={value}
          onChange={handleTextChange}
          aria-label={`${label} hex value`}
          size="sm"
        />
      </Flex>
    </Flex>
  );
}
