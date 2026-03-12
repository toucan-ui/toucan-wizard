'use client';

import { useEffect } from 'react';
import type { ConfigState } from './types';
import { getGoogleFontsUrl } from './font-presets';

const LINK_ID_PREFIX = 'wizard-font-';

/**
 * Dynamically inject/remove <link> tags for Google Fonts based on selected fonts.
 * Deduplicates URLs and cleans up on unmount.
 */
export function useFontLoader(state: ConfigState) {
  const { fontFamilyBody, fontFamilyMono, fontFamilyDisplay } = state.typography;

  useEffect(() => {
    const urls = new Map<string, string>();

    const entries = [
      { key: 'body', value: fontFamilyBody },
      { key: 'mono', value: fontFamilyMono },
      { key: 'display', value: fontFamilyDisplay },
    ];

    for (const { key, value } of entries) {
      const url = getGoogleFontsUrl(value);
      if (url) {
        urls.set(key, url);
      }
    }

    // Deduplicate by URL — multiple slots may use the same font
    const uniqueUrls = new Set(urls.values());

    // Collect link IDs we're managing this render
    const activeIds = new Set<string>();

    for (const url of uniqueUrls) {
      // Use URL as a stable ID (hashed to avoid special chars)
      const id = LINK_ID_PREFIX + simpleHash(url);
      activeIds.add(id);

      if (!document.getElementById(id)) {
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = url;
        document.head.appendChild(link);
      }
    }

    // Remove previously injected links that are no longer needed
    const existing = document.querySelectorAll(`link[id^="${LINK_ID_PREFIX}"]`);
    for (const el of existing) {
      if (!activeIds.has(el.id)) {
        el.remove();
      }
    }

    return () => {
      // Cleanup all managed links on unmount
      const links = document.querySelectorAll(`link[id^="${LINK_ID_PREFIX}"]`);
      for (const el of links) {
        el.remove();
      }
    };
  }, [fontFamilyBody, fontFamilyMono, fontFamilyDisplay]);
}

/** Simple string hash for stable element IDs */
function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash).toString(36);
}
