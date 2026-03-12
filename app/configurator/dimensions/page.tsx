'use client';

import {
  Flex, Heading, Text, Separator,
  Table, TableHead, TableBody, TableRow, TableHeader, TableCell,
} from '@toucan-ui/core';
import { useConfig } from '../../../lib/state';
import {
  SPACING_ALIASES,
  SIZING_ALIASES,
  RADIUS_ALIASES,
  BORDER_WIDTH_ALIASES,
  OPACITY_RAW_KEYS,
} from '../../../lib/alias-maps';

function AliasTable({
  title,
  aliases,
  resolveValue,
}: {
  title: string;
  aliases: Record<string, string>;
  resolveValue: (rawKey: string) => string;
}) {
  return (
    <Flex gap={2}>
      <Text weight="semibold">{title}</Text>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Alias</TableHeader>
            <TableHeader>Raw Ref</TableHeader>
            <TableHeader>Value</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(aliases).map(([alias, rawKey]) => (
            <TableRow key={alias}>
              <TableCell>{alias}</TableCell>
              <TableCell>{rawKey}</TableCell>
              <TableCell>{resolveValue(rawKey)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Flex>
  );
}

function OpacityTable() {
  return (
    <Flex gap={2}>
      <Text weight="semibold">Opacity</Text>
      <Text size="sm" variant="muted">
        Opacity uses numeric tokens directly (e.g. --opacity-70 = 0.7).
      </Text>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Token</TableHeader>
            <TableHeader>Value</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {OPACITY_RAW_KEYS.map((key) => (
            <TableRow key={key}>
              <TableCell>--opacity-{key}</TableCell>
              <TableCell>{Number(key) / 100}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Flex>
  );
}

export default function AliasesPage() {
  const { state } = useConfig();

  const resolveScale = (rawKey: string) => {
    const val = state.scale.steps[rawKey];
    return val !== undefined ? `${val}px` : rawKey;
  };

  const resolveRadius = (rawKey: string) => {
    if (rawKey === '9999') return '9999px';
    const val = state.scale.steps[rawKey];
    return val !== undefined ? `${val}px` : rawKey;
  };

  const resolveBorderWidth = (rawKey: string) => {
    const val = state.scale.steps[rawKey];
    return val !== undefined ? `${val}px` : rawKey;
  };

  return (
    <Flex gap={6}>
      <Flex gap={2}>
        <Heading level={2}>Dimensions Reference</Heading>
        <Text variant="muted">
          Read-only reference showing how alias names map to raw scale steps.
          Spacing, sizing, radius, and border-width all share the same scale —
          adjusting the base unit on the Scale page cascades through every alias.
        </Text>
      </Flex>

      <AliasTable title="Spacing" aliases={SPACING_ALIASES} resolveValue={resolveScale} />
      <Separator />
      <AliasTable title="Sizing" aliases={SIZING_ALIASES} resolveValue={resolveScale} />
      <Separator />
      <AliasTable title="Radius" aliases={RADIUS_ALIASES} resolveValue={resolveRadius} />
      <Separator />
      <AliasTable title="Border Width" aliases={BORDER_WIDTH_ALIASES} resolveValue={resolveBorderWidth} />
      <Separator />
      <OpacityTable />
    </Flex>
  );
}
