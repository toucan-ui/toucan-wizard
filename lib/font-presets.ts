export type FontPreset = {
  label: string;
  value: string;
  googleFontsUrl: string | null;
};

/** Custom font sentinel value — used to detect "Custom..." selection */
export const CUSTOM_FONT_VALUE = '__custom__';

/** Merged, deduplicated font presets for Body and Display pickers (sorted alphabetically, System Sans first) */
export const FONT_PRESETS: FontPreset[] = (() => {
  const all: FontPreset[] = [
    { label: 'System Sans', value: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif", googleFontsUrl: null },
    { label: 'Cormorant', value: "'Cormorant', Georgia, serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&display=swap' },
    { label: 'DM Sans', value: "'DM Sans', system-ui, sans-serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap' },
    { label: 'Fraunces', value: "'Fraunces', Georgia, serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600;700&display=swap' },
    { label: 'IBM Plex Sans', value: "'IBM Plex Sans', system-ui, sans-serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap' },
    { label: 'Inter', value: "'Inter', system-ui, sans-serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
    { label: 'Lato', value: "'Lato', system-ui, sans-serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap' },
    { label: 'Libre Baskerville', value: "'Libre Baskerville', Georgia, serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap' },
    { label: 'Lora', value: "'Lora', Georgia, serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&display=swap' },
    { label: 'Manrope', value: "'Manrope', system-ui, sans-serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap' },
    { label: 'Merriweather', value: "'Merriweather', Georgia, serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap' },
    { label: 'Montserrat', value: "'Montserrat', system-ui, sans-serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap' },
    { label: 'Nunito Sans', value: "'Nunito Sans', system-ui, sans-serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700&display=swap' },
    { label: 'Open Sans', value: "'Open Sans', system-ui, sans-serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap' },
    { label: 'Oswald', value: "'Oswald', system-ui, sans-serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&display=swap' },
    { label: 'Playfair Display', value: "'Playfair Display', Georgia, serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap' },
    { label: 'Poppins', value: "'Poppins', system-ui, sans-serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap' },
    { label: 'Raleway', value: "'Raleway', system-ui, sans-serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap' },
    { label: 'Roboto', value: "'Roboto', system-ui, sans-serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap' },
    { label: 'Source Sans 3', value: "'Source Sans 3', system-ui, sans-serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700&display=swap' },
    { label: 'Source Serif 4', value: "'Source Serif 4', Georgia, serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;500;600;700&display=swap' },
    { label: 'Space Grotesk', value: "'Space Grotesk', system-ui, sans-serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap' },
    { label: 'Work Sans', value: "'Work Sans', system-ui, sans-serif", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap' },
  ];
  return all;
})();

/** @deprecated Use FONT_PRESETS instead */
export const DEFAULT_PRESETS: FontPreset[] = FONT_PRESETS;

/** @deprecated Use FONT_PRESETS instead */
export const DISPLAY_PRESETS: FontPreset[] = FONT_PRESETS;

export const MONO_PRESETS: FontPreset[] = [
  { label: 'System Mono', value: "'SF Mono', SFMono-Regular, ui-monospace, 'DejaVu Sans Mono', Menlo, Consolas, monospace", googleFontsUrl: null },
  { label: 'JetBrains Mono', value: "'JetBrains Mono', ui-monospace, monospace", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap' },
  { label: 'Fira Code', value: "'Fira Code', ui-monospace, monospace", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap' },
  { label: 'Source Code Pro', value: "'Source Code Pro', ui-monospace, monospace", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600;700&display=swap' },
  { label: 'Inconsolata', value: "'Inconsolata', ui-monospace, monospace", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;600;700&display=swap' },
  { label: 'Space Mono', value: "'Space Mono', ui-monospace, monospace", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap' },
  { label: 'IBM Plex Mono', value: "'IBM Plex Mono', ui-monospace, monospace", googleFontsUrl: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&display=swap' },
];

const ALL_PRESETS = [...FONT_PRESETS, ...MONO_PRESETS];

/**
 * Look up the Google Fonts URL for a given font-family CSS value.
 * Returns null for system fonts or unknown/custom values.
 */
export function getGoogleFontsUrl(fontFamilyValue: string): string | null {
  const preset = ALL_PRESETS.find((p) => p.value === fontFamilyValue);
  return preset?.googleFontsUrl ?? null;
}
