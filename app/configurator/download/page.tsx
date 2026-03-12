'use client';

import { useCallback } from 'react';
import { Flex, Heading, Text, Input, Button, Separator } from '@toucan-ui/core';
import { useConfig } from '../../../lib/state';
import { downloadCss, downloadJson } from '../../../lib/download';

export default function DownloadPage() {
  const { state, dispatch } = useConfig();

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_THEME_NAME', name: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') });
    },
    [dispatch]
  );

  const handleDownloadCss = useCallback(() => {
    downloadCss(state);
  }, [state]);

  const handleDownloadJson = useCallback(() => {
    downloadJson(state);
  }, [state]);

  return (
    <Flex gap={6}>
      <Flex gap={2}>
        <Heading level={2}>Preview &amp; Download</Heading>
        <Text variant="muted">
          Export — review your theme in the preview panel, then download as CSS or JSON tokens.
          CSS output uses var() references to preserve the three-tier cascade.
          JSON output follows the DTCG format, organised into raw/, alias/, and system/ directories.
        </Text>
      </Flex>

      <Flex gap={2}>
        <Text weight="semibold">Theme Name</Text>
        <Input
          value={state.themeName}
          onChange={handleNameChange}
          placeholder="my-theme"
          aria-label="Theme name"
        />
        <Text size="sm" variant="muted">
          Used as the CSS selector: [data-theme=&quot;{state.themeName}&quot;]
        </Text>
      </Flex>

      <Separator />

      <Flex gap={3}>
        <Text weight="semibold">Download</Text>
        <Flex row gap={3} wrap>
          <Button variant="primary" onClick={handleDownloadCss}>
            Download CSS
          </Button>
          <Button variant="secondary" onClick={handleDownloadJson}>
            Download JSON (ZIP)
          </Button>
        </Flex>
        <Flex gap={1}>
          <Text size="sm" variant="muted">
            <strong>CSS:</strong> A single file scoped to [data-theme=&quot;{state.themeName}&quot;].
            Import after @toucan-ui/tokens/css to override the base theme.
            If your theme uses Google Fonts, loading instructions are included as a comment at the top of the file.
          </Text>
          <Text size="sm" variant="muted">
            <strong>JSON:</strong> A ZIP containing raw/, alias/, and system/ directories in DTCG format,
            compatible with Style Dictionary pipelines.
            A fonts.json file lists required Google Fonts URLs for easy integration.
          </Text>
          <Text size="sm" variant="muted">
            <strong>Custom fonts:</strong> If you specified a custom font family, you are responsible for
            loading it in your application (via @font-face, a CDN link, or a hosted file).
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
