# API Reference

## `useMaterial3Theme`

Hook that lets you handle material3 theme in your app. It will return the theme retrieved from user device (or a fallback if device is not supported), a function to update the theme and a function to reset the theme.

```ts
// Without params
const { theme, updateTheme, resetTheme } = useMaterial3Theme();

// With params
const { theme, updateTheme, resetTheme } = useMaterial3Theme({ fallbackSourceColor: '#3E8260', overwrite: false });
```

#### Parameters (optional)

```ts
{
  fallbackSourceColor?: string;
  overwrite?: boolean;
}
```

- `fallbackSourceColor` (default to `#6750A4`): Color used to create a fallback theme if material3 is not supported by the device
- `overwrite` (default to `false`): Whether to overwrite system theme and return a theme based on `fallbackSourceColor`

#### Returns

```ts
{
  theme: Material3Theme;
  updateTheme: (sourceColor: string) => void;
  resetTheme: () => void;
}
```

- `theme`: Material3 theme retrieved from user device (or fallback theme)
- `updateTheme(sourceColor)`: Function to update theme by generating a new one based on a source color
- `resetTheme()`: Function to reset theme to default (system or fallback)

> `updateTheme()` and `resetTheme()` will change the theme returns by `useMaterial3Theme()`, it will not change theme at system level

<br>

## `getMaterial3Theme`

Function that will return the theme retrieved from user device (or a fallback theme if device is not supported).

```ts
// Without params
const theme = getMaterial3Theme();

// With params
const theme = getMaterial3Theme('#6750A4');
```

#### Parameters (optional)

- `fallbackSourceColor` (default to `#6750A4`): Color used to create a fallback theme if material3 is not supported by the device

#### Returns

`Material3` theme retrieved from user device (or fallback theme)

<br>

## `createMaterial3Theme`

Function that will create a material3 theme based on a source color (using [`@material/material-color-utilities`](https://github.com/material-foundation/material-color-utilities/tree/main/typescript)).

```ts
const theme = createMaterial3Theme('#6750A4');
```

#### Parameters (required)

- `sourceColor`: Color used to create the material3 theme

#### Returns

`Material3` theme generated from the `sourceColor`
