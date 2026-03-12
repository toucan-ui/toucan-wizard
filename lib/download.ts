import { zipSync, strToU8 } from 'fflate';
import type { ConfigState } from './types';
import { generateCssFile } from './css-generator';
import { generateJsonFiles } from './json-generator';

/** Trigger a browser file download */
function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/** Download a CSS theme file */
export function downloadCss(state: ConfigState) {
  const css = generateCssFile(state);
  const blob = new Blob([css], { type: 'text/css' });
  downloadBlob(blob, `${state.themeName}-theme.css`);
}

/** Download JSON token files as a ZIP */
export function downloadJson(state: ConfigState) {
  const files = generateJsonFiles(state);
  const zipData: Record<string, Uint8Array> = {};

  for (const [path, content] of Object.entries(files)) {
    zipData[`${state.themeName}/${path}`] = strToU8(content);
  }

  const zipped = zipSync(zipData);
  const blob = new Blob([zipped as BlobPart], { type: 'application/zip' });
  downloadBlob(blob, `${state.themeName}-tokens.zip`);
}
