import { requireNativeModule } from 'expo-modules-core';

let ExpoMaterial3ThemeModule;
try {
  ExpoMaterial3ThemeModule = requireNativeModule('ExpoMaterial3Theme');
} catch {}
export default ExpoMaterial3ThemeModule;
