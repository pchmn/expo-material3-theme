import { useState } from 'react';
import { Platform } from 'react-native';

import { Material3Scheme, Material3Theme, SystemScheme } from './ExpoMaterial3Theme.types';
import ExpoMaterial3ThemeModule from './ExpoMaterial3ThemeModule';
import {
  createThemeFromSourceColor,
  createThemeFromSystemSchemes,
  Material3ThemeOptions,
} from './utils/createMaterial3Theme';

export const isDynamicThemeSupported =
  !!ExpoMaterial3ThemeModule && Platform.OS === 'android' && Platform.Version >= 31;

interface UseMaterial3ThemeOptions extends Material3ThemeOptions {
  /**
   * Source color for the theme.
   *
   * If provided, it will overwrite the system theme.
   * */
  sourceColor?: string;
  /**
   * Source color for the fallback theme.
   * @default '#6750A4'
   */
  fallbackSourceColor?: string;
}

/**
 * Hook to manage material3 theme.
 *
 * It returns:
 * - a Material 3 theme:
 *   - the system theme (or a fallback theme if not supported) if sourceColor is not provided
 *   - a theme based on sourceColor if provided
 * - a function to update the theme based on a source color
 * - a function to reset the theme to default
 * @returns
 */
export function useMaterial3Theme(options?: UseMaterial3ThemeOptions) {
  const { fallbackSourceColor = '#6750A4', sourceColor, ...themeOptions } = options || {};

  const [theme, setTheme] = useState<Material3Theme>(
    sourceColor ? createMaterial3Theme(sourceColor, themeOptions) : getMaterial3Theme(fallbackSourceColor, options)
  );

  const updateTheme = (sourceColor: string, options?: Material3ThemeOptions) => {
    setTheme(createThemeFromSourceColor(sourceColor, options));
  };

  const resetTheme = () => {
    setTheme(getMaterial3Theme(fallbackSourceColor, options));
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
export function getMaterial3Theme(
  fallbackSourceColor: string = '#6750A4',
  options?: Material3ThemeOptions
): Material3Theme {
  if (!isDynamicThemeSupported) {
    return createThemeFromSourceColor(fallbackSourceColor, options);
  }

  const systemSchemes = ExpoMaterial3ThemeModule.getSystemTheme() as {
    light: SystemScheme;
    dark: SystemScheme;
  } | null;

  if (systemSchemes) {
    return createThemeFromSystemSchemes(systemSchemes);
  }
  return createThemeFromSourceColor(fallbackSourceColor, options);
}

export async function getMaterial3ThemeAsync(
  fallbackSourceColor: string = '#6750A4',
  options?: Material3ThemeOptions
): Promise<Material3Theme> {
  if (!isDynamicThemeSupported) {
    return createThemeFromSourceColor(fallbackSourceColor, options);
  }

  const systemSchemes = (await ExpoMaterial3ThemeModule.getSystemThemeAsync()) as {
    light: SystemScheme;
    dark: SystemScheme;
  } | null;

  if (systemSchemes) {
    return createThemeFromSystemSchemes(systemSchemes);
  }
  return createThemeFromSourceColor(fallbackSourceColor, options);
}

/**
 * Create a Material 3 theme based on the source color.
 *
 * @param sourceColor source color for the theme
 * @returns
 */
export function createMaterial3Theme(sourceColor: string, options?: Material3ThemeOptions): Material3Theme {
  return createThemeFromSourceColor(sourceColor, options);
}

export { Material3Scheme, Material3Theme, Material3ThemeOptions };
