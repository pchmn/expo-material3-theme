import { useState } from 'react';
import { Platform } from 'react-native';

import { Material3Scheme, Material3Theme, SystemScheme } from './ExpoMaterial3Theme.types';
import ExpoMaterial3ThemeModule from './ExpoMaterial3ThemeModule';
import { createThemeFromSourceColor, createThemeFromSystemSchemes } from './utils/createMaterial3Theme';

export const isDynamicThemeSupported =
  !!ExpoMaterial3ThemeModule && Platform.OS === 'android' && Platform.Version >= 31;

/**
 * Hook to manage material3 theme.
 *
 * It returns:
 * - a Material 3 theme:
 *   - the system theme (or a fallback theme if not supported) if sourceColor is not provided
 *   - a theme based on sourceColor if provided
 * - a function to update the theme based on a source color
 * - a function to reset the theme to default
 *
 * @param params.fallbackSourceColor - optional - source color for the fallback theme (default to #6750A4)
 * @param params.sourceColor - optional - source color for the theme (overwrite system theme)
 * @returns
 */
export function useMaterial3Theme(params?: { fallbackSourceColor?: string; sourceColor?: string }) {
  const { fallbackSourceColor = '#6750A4', sourceColor } = params || {};

  const [theme, setTheme] = useState<Material3Theme>(
    sourceColor ? createMaterial3Theme(sourceColor) : getMaterial3Theme(fallbackSourceColor)
  );

  const updateTheme = (sourceColor: string) => {
    setTheme(createThemeFromSourceColor(sourceColor));
  };

  const resetTheme = () => {
    setTheme(getMaterial3Theme(fallbackSourceColor));
  };

  return { theme, updateTheme, resetTheme };
}

/**
 * Get the Material 3 theme from the system (works only on Android 12+).
 *
 * If the system does not support Material3, it will return a theme based on the fallback source color.
 *
 * @param fallbackSourceColor source color for the fallback theme (default to #6750A4)
 * @returns
 */
export function getMaterial3Theme(fallbackSourceColor: string = '#6750A4'): Material3Theme {
  if (!isDynamicThemeSupported) {
    return createThemeFromSourceColor(fallbackSourceColor);
  }

  const systemSchemes = ExpoMaterial3ThemeModule.getSystemTheme() as {
    light: SystemScheme;
    dark: SystemScheme;
  } | null;

  if (systemSchemes) {
    return createThemeFromSystemSchemes(systemSchemes);
  }
  return createThemeFromSourceColor(fallbackSourceColor);
}

export async function getMaterial3ThemeAsync(fallbackSourceColor: string = '#6750A4'): Promise<Material3Theme> {
  if (!isDynamicThemeSupported) {
    return createThemeFromSourceColor(fallbackSourceColor);
  }

  const systemSchemes = (await ExpoMaterial3ThemeModule.getSystemThemeAsync()) as {
    light: SystemScheme;
    dark: SystemScheme;
  } | null;

  if (systemSchemes) {
    return createThemeFromSystemSchemes(systemSchemes);
  }
  return createThemeFromSourceColor(fallbackSourceColor);
}

/**
 * Create a Material 3 theme based on the source color.
 *
 * @param sourceColor source color for the theme
 * @returns
 */
export function createMaterial3Theme(sourceColor: string): Material3Theme {
  return createThemeFromSourceColor(sourceColor);
}

export { Material3Theme, Material3Scheme };
