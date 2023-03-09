import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoMaterial3ThemeViewProps } from './ExpoMaterial3Theme.types';

const NativeView: React.ComponentType<ExpoMaterial3ThemeViewProps> =
  requireNativeViewManager('ExpoMaterial3Theme');

export default function ExpoMaterial3ThemeView(props: ExpoMaterial3ThemeViewProps) {
  return <NativeView {...props} />;
}
