enum ElevationLevels {
  'level0',
  'level1',
  'level2',
  'level3',
  'level4',
  'level5',
}

export type Material3SystemColors = {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;

  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;

  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;

  background: string;
  onBackground: string;

  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;

  outline: string;
  outlineVariant: string;

  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
};

export type Material3Colors = Material3SystemColors & {
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;

  shadow: string;
  scrim: string;
};

export type Material3Scheme = Material3Colors & {
  surfaceDisabled: string;
  onSurfaceDisabled: string;
  backdrop: string;

  elevation: {
    [key in keyof typeof ElevationLevels]: string;
  };
};

export type Material3Theme = {
  light: Material3Scheme;
  dark: Material3Scheme;
};
