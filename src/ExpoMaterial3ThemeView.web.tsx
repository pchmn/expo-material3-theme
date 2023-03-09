import * as React from 'react';

import { ExpoMaterial3ThemeViewProps } from './ExpoMaterial3Theme.types';

export default function ExpoMaterial3ThemeView(props: ExpoMaterial3ThemeViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
