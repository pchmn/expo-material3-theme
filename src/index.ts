
// Import the native module. On web, it will be resolved to ExpoMaterial3Theme.web.ts
// and on native platforms to ExpoMaterial3Theme.ts
import ExpoMaterial3ThemeModule from "./ExpoMaterial3ThemeModule";


export function hello(): string {
  return ExpoMaterial3ThemeModule.hello();
}
