import { requireNativeModule } from 'expo-modules-core';

interface ExpoMaterial3ThemeModuleType {
  getSystemTheme(): { light: Record<string, string>; dark: Record<string, string> } | null;
  getSystemThemeAsync(): Promise<{ light: Record<string, string>; dark: Record<string, string> } | null>;
}

let ExpoMaterial3ThemeModule: ExpoMaterial3ThemeModuleType | undefined;
try {
  ExpoMaterial3ThemeModule = requireNativeModule<ExpoMaterial3ThemeModuleType>('ExpoMaterial3Theme');
} catch {}
export default ExpoMaterial3ThemeModule;
