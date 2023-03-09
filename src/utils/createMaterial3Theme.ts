import { argbFromHex, Scheme, themeFromSourceColor } from '@importantimport/material-color-utilities';
import color from 'color';
import { Material3Scheme, Material3SystemColors } from '../ExpoMaterial3Theme.types';

const opacity = {
  level1: 0.08,
  level2: 0.12,
  level3: 0.16,
  level4: 0.38,
};

const elevations = ['transparent', 0.05, 0.08, 0.11, 0.12, 0.14];

const constantColors = {
  light: {
    error: '#B3261E',
    onError: '#FFFFFF',
    errorContainer: '#F9DEDC',
    onErrorContainer: '#410E0B',
    shadow: '#000000',
    scrim: '#000000',
  },
  dark: {
    error: '#F2B8B5',
    onError: '#601410',
    errorContainer: '#8C1D18',
    onErrorContainer: '#F9DEDC',
    shadow: '#000000',
    scrim: '#000000',
  },
};

export function createMaterial3Theme(sourceColor: string) {
  const { schemes } = themeFromSourceColor(argbFromHex(sourceColor));

  return {
    light: generateMaterial3Scheme(transformScheme(schemes.light), 'light'),
    dark: generateMaterial3Scheme(transformScheme(schemes.dark), 'dark'),
  };
}

export function generateMaterial3Scheme(colors: Material3SystemColors, colorScheme: 'dark' | 'light'): Material3Scheme {
  const elevation = elevations.reduce(
    (acc, value, index) => ({
      ...acc,
      [`level${index}`]: index === 0 ? value : color(colors.surface).mix(color(colors.primary), Number(value)).hex(),
    }),
    {}
  ) as Material3Scheme['elevation'];

  const customColors = {
    surfaceDisabled: color(colors.onSurface).alpha(opacity.level2).rgb().string(),
    onSurfaceDisabled: color(colors.onSurface).alpha(opacity.level4).rgb().string(),
    backdrop: colors.onSurface,
  };

  return { ...colors, elevation, ...customColors, ...constantColors[colorScheme] };
}

function transformScheme(scheme: Scheme) {
  const jsonScheme = scheme.toJSON();
  type SchemeKeys = keyof typeof jsonScheme;

  return Object.entries(jsonScheme).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: color(value).hex(),
    };
  }, {} as { [key in SchemeKeys]: string });
}
