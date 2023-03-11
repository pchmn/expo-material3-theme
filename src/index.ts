import { Material3Theme, SystemScheme } from './ExpoMaterial3Theme.types';
import ExpoMaterial3ThemeModule from './ExpoMaterial3ThemeModule';
import { createThemeFromSourceColor, createThemeFromSystemSchemes } from './utils/createMaterial3Theme';

/**
 * Get the Material3 theme from the system (works only on Android 12+).
 *
 * If the system does not support Material3, it will return a theme based on the fallback source color.
 *
 * @param fallbackSourceColor fallback source color for the theme (default to #6750A4)
 * @returns Material3 theme
 */
export function getMaterial3Theme(fallbackSourceColor: string = '#6750A4'): Material3Theme {
  const systemSchemes = ExpoMaterial3ThemeModule.getSystemTheme() as {
    light: SystemScheme;
    dark: SystemScheme;
  } | null;

  if (systemSchemes) {
    return createThemeFromSystemSchemes(systemSchemes);
  }
  return createThemeFromSourceColor(fallbackSourceColor);
}

/**
 * Create a Material3 theme based on the source color.
 *
 * @param sourceColor source color for the theme
 * @returns Material3 theme
 */
export function createMaterial3ThemeFromSourceColor(sourceColor: string): Material3Theme {
  return createThemeFromSourceColor(sourceColor);
}

export { Material3Theme };
