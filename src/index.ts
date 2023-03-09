import { Material3SystemColors, Material3Theme } from './ExpoMaterial3Theme.types';
import ExpoMaterial3ThemeModule from './ExpoMaterial3ThemeModule';
import { createMaterial3Theme, generateMaterial3Scheme } from './utils/createMaterial3Theme';

export function getMaterial3Theme(defaultSourceColor: string, overwriteSystem = false): Material3Theme {
  const systemTheme = ExpoMaterial3ThemeModule.getSystemTheme() as {
    light: Material3SystemColors;
    dark: Material3SystemColors;
  } | null;

  if (systemTheme && !overwriteSystem) {
    return {
      light: generateMaterial3Scheme(systemTheme.light, 'light'),
      dark: generateMaterial3Scheme(systemTheme.dark, 'dark'),
    };
  }
  return createMaterial3Theme(defaultSourceColor);
}
