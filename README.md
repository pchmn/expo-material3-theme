# expo-material3-theme

This expo module allows you retrieve the [material3 dynamic theme](https://developer.android.com/develop/ui/views/theming/dynamic-colors) from your Android 12+ device, so that you can use it in your expo (or bare react-native) app.

For devices not compatible (iOS or older Android versions) a fallback theme is returned.

![example-android](docs/example-android.gif)

## Features

- Retrieve material3 dynamic theme from Android 12+ devices (or a fallback theme if device is not compatible)
- Generate material3 theme based on a source color (using [`@material/material-color-utilities`](https://github.com/material-foundation/material-color-utilities/tree/main/typescript))
- Material3 theme compatible with [`react-native-paper`](https://callstack.github.io/react-native-paper/)

## Installation

### Installation in managed Expo projects

```
expo install expo-material3-theme && expo prebuild
```

### Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

```sh
npm i expo-material3-theme && npx pod-install
# or
yarn add expo-material3-theme && npx pod-install
# or
pnpm add expo-material3-theme && npx pod-install
```

## Usage

### Retrieve theme

A basic usage would be to retrieve the material3 theme from your device (or a fallback theme if not supported) by using `useMaterial3Theme` hook:

```tsx
import { useMaterial3Theme } from 'expo-material3-theme';
import { useColorScheme, View, Button } from 'react-native';

function App() {
  const colorScheme = useColorScheme();
  // If the device does not support material3, it will return a theme based on the fallback source color (optional, default to #6750A4)
  const { theme } = useMaterial3Theme({ fallbackSourceColor: '#3E8260' });

  return (
    <View style={{ backgroundColor: theme[colorScheme].background }}>
      <Button color={theme[colorScheme].primary}>Themed button</Button>
    </View>
  );
}
```

### Change theme

You may also want to update the theme by generating a new one, or go back to the default theme (to let users personalize your app for example). You can do it with `useMaterial3Theme` hook:

```tsx
import { useMaterial3Theme } from 'expo-material3-theme';
import { useColorScheme, View, Button } from 'react-native';

function App() {
  const colorScheme = useColorScheme();
  const { theme, updateTheme, resetTheme } = useMaterial3Theme();

  return (
    <View style={{ backgroundColor: theme[colorScheme].background }}>
      {/* Update theme by generating a new one based on a source color */}
      <Button onPress={() => updateTheme('#3E8260')}>Update theme</Button>
      {/* Reset theme to default (system or fallback) */}
      <Button onPress={() => resetTheme()}>Reset theme</Button>
    </View>
  );
}
```

> `updateTheme()` and `resetTheme()` will change the theme returns by `useMaterial3Theme()`, it will not change theme at system level

### Usage with `react-native-paper`

`expo-material3-theme` provides a theme compatible with `react-native-paper`, so you can combine both libraries easily:

```tsx
import { useMaterial3Theme } from 'expo-material3-theme';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { Button, MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

function App() {
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark' ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );

  return (
    <PaperProvider theme={paperTheme}>
      <Button>Themed react native paper button</Button>
    </PaperProvider>
  );
}
```

## [API Reference](docs/api-reference.md)
