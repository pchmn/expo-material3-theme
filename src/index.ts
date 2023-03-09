import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoMaterial3Theme.web.ts
// and on native platforms to ExpoMaterial3Theme.ts
import ExpoMaterial3ThemeModule from './ExpoMaterial3ThemeModule';
import ExpoMaterial3ThemeView from './ExpoMaterial3ThemeView';
import { ChangeEventPayload, ExpoMaterial3ThemeViewProps } from './ExpoMaterial3Theme.types';

// Get the native constant value.
export const PI = ExpoMaterial3ThemeModule.PI;

export function hello(): string {
  return ExpoMaterial3ThemeModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoMaterial3ThemeModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoMaterial3ThemeModule ?? NativeModulesProxy.ExpoMaterial3Theme);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoMaterial3ThemeView, ExpoMaterial3ThemeViewProps, ChangeEventPayload };
