'use client';

import { createContext, useContext, useReducer, useEffect, useRef, type ReactNode } from 'react';
import type { ConfigState, ConfigAction, ColourScale, ConfigSection } from './types';
import { createDefaultState, generateUid } from './defaults';
import { generateScale } from './colour-utils';

const STORAGE_KEY = 'factory-configurator-state';

function configReducer(state: ConfigState, action: ConfigAction): ConfigState {
  switch (action.type) {
    case 'SET_THEME_NAME':
      return { ...state, themeName: action.name };

    case 'ADD_SCALE': {
      // Ensure _uid + unique ID — append suffix if collision
      const uid = action.scale._uid || generateUid();
      let id = action.scale.id;
      const existingIds = new Set(state.palette.map((s) => s.id));
      if (existingIds.has(id)) {
        let suffix = 2;
        while (existingIds.has(`${id}-${suffix}`)) suffix++;
        id = `${id}-${suffix}`;
      }
      const fullScale: ColourScale = { ...action.scale, _uid: uid, id };
      return { ...state, palette: [...state.palette, fullScale] };
    }

    case 'REMOVE_SCALE':
      return { ...state, palette: state.palette.filter((s) => s.id !== action.id) };

    case 'UPDATE_SCALE': {
      // Reject ID rename if it would collide with another scale
      const newId = action.scale.id;
      if (newId && newId !== action.id) {
        const taken = state.palette.some((s) => s.id === newId && s.id !== action.id);
        if (taken) return state;
      }

      const newState = {
        ...state,
        palette: state.palette.map((s) =>
          s.id === action.id ? { ...s, ...action.scale } : s
        ),
      };

      // Cascade ID rename into semantic colour references and component overrides
      if (newId && newId !== action.id) {
        const renameRef = (ref: string) => {
          if (!ref.startsWith(action.id + '-')) return ref;
          return newId + ref.slice(action.id.length);
        };

        const updatedSemantics = { ...newState.semantics };
        for (const [key, value] of Object.entries(updatedSemantics)) {
          (updatedSemantics as Record<string, string>)[key] = renameRef(value);
        }
        newState.semantics = updatedSemantics;

        const updatedOverrides = { ...newState.componentOverrides };
        for (const [comp, overrides] of Object.entries(updatedOverrides)) {
          const updated: Record<string, string> = {};
          for (const [token, value] of Object.entries(overrides)) {
            updated[token] = renameRef(value);
          }
          updatedOverrides[comp] = updated;
        }
        newState.componentOverrides = updatedOverrides;
      }

      return newState;
    }

    case 'UPDATE_SHADE':
      return {
        ...state,
        palette: state.palette.map((s) =>
          s.id === action.scaleId
            ? {
                ...s,
                shades: s.shades.map((sh) =>
                  sh.step === action.step ? { ...sh, hex: action.hex } : sh
                ),
              }
            : s
        ),
      };

    case 'REGENERATE_SCALE':
      return {
        ...state,
        palette: state.palette.map((s) =>
          s.id === action.id
            ? { ...s, baseHex: action.baseHex, shades: generateScale(action.baseHex) }
            : s
        ),
      };

    case 'SET_SEMANTICS':
      return { ...state, semantics: { ...state.semantics, ...action.semantics } };

    case 'SET_SCALE':
      return { ...state, scale: { ...state.scale, ...action.scale } };

    case 'SET_LAYOUT':
      return { ...state, layout: { ...state.layout, ...action.layout } };

    case 'SET_TYPOGRAPHY':
      return { ...state, typography: { ...state.typography, ...action.typography } };

    case 'SET_TYPOGRAPHY_ALIASES':
      return { ...state, typographyAliases: { ...state.typographyAliases, ...action.aliases } };

    case 'SET_SHAPE':
      return { ...state, shape: { ...state.shape, ...action.shape } };

    case 'SET_COMPONENT_OVERRIDE':
      return {
        ...state,
        componentOverrides: {
          ...state.componentOverrides,
          [action.component]: action.overrides,
        },
      };

    case 'REMOVE_COMPONENT_OVERRIDE': {
      const { [action.component]: _, ...rest } = state.componentOverrides;
      return { ...state, componentOverrides: rest };
    }

    case 'LOAD_STATE': {
      // Merge with defaults to handle old localStorage missing new fields
      const defaults = createDefaultState();
      const { spacing: _sp, sizing: _sz, opacity: _op, ...rest } = action.state as ConfigState & Record<string, unknown>;

      // Strip old shape.radii and shape.borderWidths from loaded state
      const loadedShape = (rest.shape ?? defaults.shape) as unknown as Record<string, unknown>;
      const { radii: _r, borderWidths: _bw, ...cleanShape } = loadedShape;

      // Migrate old opacity alias names in component overrides
      const OPACITY_MIGRATION: Record<string, string> = {
        'transparent': '0', 'translucent-lighter': '30',
        'translucent-light': '40', 'translucent': '50',
        'translucent-medium': '60', 'translucent-strong': '70',
        'opaque': '100',
      };
      const rawOverrides = (action.state as ConfigState & Record<string, unknown>).componentOverrides ?? {};
      const migratedOverrides: Record<string, Record<string, string>> = {};
      for (const [comp, overrides] of Object.entries(rawOverrides as Record<string, Record<string, string>>)) {
        const migrated: Record<string, string> = {};
        for (const [token, value] of Object.entries(overrides)) {
          migrated[token] = OPACITY_MIGRATION[value] ?? value;
        }
        migratedOverrides[comp] = migrated;
      }

      // Strip removed *Size alias fields from old localStorage data
      const loadedAliases = (rest.typographyAliases ?? defaults.typographyAliases) as unknown as Record<string, unknown>;
      const { bodySize: _bs, h1Size: _h1s, h2Size: _h2s, h3Size: _h3s, h4Size: _h4s,
        displaySmSize: _dss, displayMdSize: _dms, displayLgSize: _dls, ...cleanAliases } = loadedAliases;

      // Migrate fontFamilySans → fontFamilyBody
      const loadedTypography = (rest.typography ?? defaults.typography) as unknown as Record<string, unknown>;
      if ('fontFamilySans' in loadedTypography && !('fontFamilyBody' in loadedTypography)) {
        loadedTypography.fontFamilyBody = loadedTypography.fontFamilySans;
        delete loadedTypography.fontFamilySans;
      }

      // Deduplicate palette scale IDs and ensure _uid exists (old localStorage may lack it)
      const loadedPalette = (rest.palette ?? defaults.palette) as ColourScale[];
      const seenIds = new Set<string>();
      const dedupedPalette: ColourScale[] = [];
      for (const scale of loadedPalette) {
        let id = scale.id;
        if (seenIds.has(id)) {
          let suffix = 2;
          while (seenIds.has(`${id}-${suffix}`)) suffix++;
          id = `${id}-${suffix}`;
        }
        seenIds.add(id);
        const uid = scale._uid || generateUid();
        dedupedPalette.push({ ...scale, id, _uid: uid });
      }

      return {
        ...defaults,
        ...rest,
        palette: dedupedPalette,
        typography: loadedTypography as unknown as ConfigState['typography'],
        typographyAliases: { ...defaults.typographyAliases, ...cleanAliases } as unknown as ConfigState['typographyAliases'],
        shape: cleanShape as unknown as ConfigState['shape'],
        componentOverrides: migratedOverrides,
      };
    }

    case 'RESET_ALL':
      return createDefaultState();

    case 'RESET_SECTION': {
      const defaults = createDefaultState();
      switch (action.section) {
        case 'palette':
          return { ...state, palette: defaults.palette };
        case 'semantics':
          return { ...state, semantics: defaults.semantics };
        case 'scale':
          return { ...state, scale: defaults.scale };
        case 'layout':
          return { ...state, layout: defaults.layout };
        case 'typography':
          return { ...state, typography: defaults.typography };
        case 'typographyAliases':
          return { ...state, typographyAliases: defaults.typographyAliases };
        case 'shape':
          return { ...state, shape: defaults.shape };
        case 'componentOverrides':
          return { ...state, componentOverrides: {} };
        default:
          return state;
      }
    }

    default:
      return state;
  }
}

interface ConfigContextValue {
  state: ConfigState;
  dispatch: React.Dispatch<ConfigAction>;
}

const ConfigContext = createContext<ConfigContextValue | null>(null);

export function ConfigProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(configReducer, null, createDefaultState);
  const hydrated = useRef(false);

  // Hydrate from localStorage after mount (avoids SSR/client mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        dispatch({ type: 'LOAD_STATE', state: JSON.parse(stored) as ConfigState });
      }
    } catch {
      // ignore parse errors
    }
    hydrated.current = true;
  }, []);

  // Persist to localStorage on every state change (skip initial default render)
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state]);

  return (
    <ConfigContext.Provider value={{ state, dispatch }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const ctx = useContext(ConfigContext);
  if (!ctx) throw new Error('useConfig must be used within ConfigProvider');
  return ctx;
}
