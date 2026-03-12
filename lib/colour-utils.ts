/**
 * OKLCH-based colour scale generation.
 * Converts hex → OKLCH, generates a full shade scale by varying lightness & chroma,
 * then converts back to hex with sRGB gamut clamping.
 */

// --- sRGB ↔ Linear RGB ---

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

// --- Linear RGB ↔ XYZ (D65) ---

function linearRgbToXyz(r: number, g: number, b: number): [number, number, number] {
  return [
    0.4124564 * r + 0.3575761 * g + 0.1804375 * b,
    0.2126729 * r + 0.7151522 * g + 0.0721750 * b,
    0.0193339 * r + 0.1191920 * g + 0.9503041 * b,
  ];
}

function xyzToLinearRgb(x: number, y: number, z: number): [number, number, number] {
  return [
    3.2404542 * x - 1.5371385 * y - 0.4985314 * z,
    -0.9692660 * x + 1.8760108 * y + 0.0415560 * z,
    0.0556434 * x - 0.2040259 * y + 1.0572252 * z,
  ];
}

// --- XYZ ↔ OKLab ---

function xyzToOklab(x: number, y: number, z: number): [number, number, number] {
  const l_ = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
  const m_ = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
  const s_ = 0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z;

  const l_c = Math.cbrt(l_);
  const m_c = Math.cbrt(m_);
  const s_c = Math.cbrt(s_);

  return [
    0.2104542553 * l_c + 0.7936177850 * m_c - 0.0040720468 * s_c,
    1.9779984951 * l_c - 2.4285922050 * m_c + 0.4505937099 * s_c,
    0.0259040371 * l_c + 0.7827717662 * m_c - 0.8086757660 * s_c,
  ];
}

function oklabToXyz(L: number, a: number, b: number): [number, number, number] {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ * l_ * l_;
  const m = m_ * m_ * m_;
  const s = s_ * s_ * s_;

  return [
    1.2270138511 * l - 0.5577999807 * m + 0.2812561490 * s,
    -0.0405801784 * l + 1.1122568696 * m - 0.0716766787 * s,
    -0.0763812845 * l - 0.4214819784 * m + 1.5861632204 * s,
  ];
}

// --- OKLab ↔ OKLCH ---

interface OKLCH {
  L: number; // 0-1
  C: number; // 0-~0.4
  H: number; // 0-360
}

function oklabToOklch(L: number, a: number, b: number): OKLCH {
  const C = Math.sqrt(a * a + b * b);
  const H = (Math.atan2(b, a) * 180) / Math.PI;
  return { L, C, H: H < 0 ? H + 360 : H };
}

function oklchToOklab(lch: OKLCH): [number, number, number] {
  const hRad = (lch.H * Math.PI) / 180;
  return [lch.L, lch.C * Math.cos(hRad), lch.C * Math.sin(hRad)];
}

// --- Hex ↔ sRGB ---

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) => {
    const clamped = Math.round(Math.max(0, Math.min(1, c)) * 255);
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// --- Public conversion API ---

export function hexToOklch(hex: string): OKLCH {
  const [r, g, b] = hexToRgb(hex);
  const [lr, lg, lb] = [srgbToLinear(r), srgbToLinear(g), srgbToLinear(b)];
  const [x, y, z] = linearRgbToXyz(lr, lg, lb);
  const [L, a, bVal] = xyzToOklab(x, y, z);
  return oklabToOklch(L, a, bVal);
}

export function oklchToHex(lch: OKLCH): string {
  const [L, a, b] = oklchToOklab(lch);
  const [x, y, z] = oklabToXyz(L, a, b);
  const [lr, lg, lb] = xyzToLinearRgb(x, y, z);
  return rgbToHex(linearToSrgb(lr), linearToSrgb(lg), linearToSrgb(lb));
}

/** Check whether an OKLCH colour is within sRGB gamut */
function isInGamut(lch: OKLCH): boolean {
  const [L, a, b] = oklchToOklab(lch);
  const [x, y, z] = oklabToXyz(L, a, b);
  const [r, g, bVal] = xyzToLinearRgb(x, y, z);
  const eps = 0.001;
  return r >= -eps && r <= 1 + eps && g >= -eps && g <= 1 + eps && bVal >= -eps && bVal <= 1 + eps;
}

/** Clamp chroma until colour is within sRGB gamut */
function clampToGamut(lch: OKLCH): OKLCH {
  if (isInGamut(lch)) return lch;
  let lo = 0;
  let hi = lch.C;
  let result = { ...lch, C: 0 };
  for (let i = 0; i < 32; i++) {
    const mid = (lo + hi) / 2;
    const test = { ...lch, C: mid };
    if (isInGamut(test)) {
      result = test;
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return result;
}

// --- Scale generation ---

/** Standard shade steps */
const SHADE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

/**
 * Eased interpolation — uses a sine-based ease for smoother lightness distribution.
 * t: 0-1 input, returns 0-1 eased value
 */
function easeInOut(t: number): number {
  return t - Math.sin(t * 2 * Math.PI) / (2 * Math.PI);
}

/**
 * Generate a full colour scale from a base hex colour.
 * Step 500 is anchored to the exact base colour.
 * Lighter steps (50–400) interpolate toward L=0.97.
 * Darker steps (600–950) interpolate toward L=0.25.
 * Chroma peaks at the base and reduces toward the extremes.
 * Hue is kept constant.
 */
export function generateScale(baseHex: string): Array<{ step: number; hex: string }> {
  const base = hexToOklch(baseHex);

  // Lightness anchors
  const lightEnd = 0.97;
  const darkEnd = 0.25;
  const midL = base.L; // anchor 500 to the actual input colour

  // Chroma multipliers at extremes
  const chromaLightMul = 0.2;
  const chromaDarkMul = 0.4;

  return SHADE_STEPS.map((step) => {
    if (step === 500) {
      return { step, hex: baseHex };
    }

    // Normalise step position: 50 → 0, 950 → 1
    const t = (step - 50) / 900;
    const eased = easeInOut(t);

    // Lightness: interpolate from lightEnd through midL to darkEnd
    let L: number;
    if (step < 500) {
      // Light side: t goes 0→0.5, map to 0→1 within that range
      const localT = eased / easeInOut(0.5);
      L = lightEnd + (midL - lightEnd) * localT;
    } else {
      // Dark side: t goes 0.5→1, map to 0→1 within that range
      const localT = (eased - easeInOut(0.5)) / (1 - easeInOut(0.5));
      L = midL + (darkEnd - midL) * localT;
    }

    // Chroma: peak at 500, reduced at extremes
    const chromaPeak = base.C;
    const chromaMin = step < 500
      ? chromaPeak * chromaLightMul
      : chromaPeak * chromaDarkMul;
    const dist = Math.abs(t - 0.5) * 2; // 0 at 500, 1 at extremes
    const C = chromaPeak + (chromaMin - chromaPeak) * dist * dist;

    const clamped = clampToGamut({ L, C, H: base.H });
    return { step, hex: oklchToHex(clamped) };
  });
}

/** Validate a hex colour string */
export function isValidHex(hex: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(hex);
}
