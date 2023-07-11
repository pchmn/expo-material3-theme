# API Reference

## <code>useMaterial3Theme(params?: Params): Object</code>


Hook that lets you manage Material 3 theme in your app. It will return the theme retrieved from user device (or a fallback theme if device is not supported) or a theme based on a source color, a function to update the theme and a function to reset the theme.

```ts
// Without params
const { theme, updateTheme, resetTheme } = useMaterial3Theme();

// With params
const { theme, updateTheme, resetTheme } = useMaterial3Theme({ fallbackSourceColor: '#3E8260' });
// or
const { theme, updateTheme, resetTheme } = useMaterial3Theme({ sourceColor: '#3E8260' });
```

#### Parameters (optional)

<details>
  <summary>Typescript definition</summary>

```ts
{
  fallbackSourceColor?: string;
  sourceColor?: string;
}
```

</details>

- `params`:
  - `fallbackSourceColor` (optional, default to `#6750A4`): Source color for the fallback theme
  - `sourceColor` (optional): Source color for the theme (overwrite system theme)

#### Returns

<details>
  <summary>Typescript definition</summary>

<pre>
{
  theme: <a href="../src/ExpoMaterial3Theme.types.ts#L59-L62">Material3Theme</a>;
  updateTheme: (sourceColor: string) => void;
  resetTheme: () => void;
}
</pre>

</details>


- `Object`:
  - `theme`: 
    - theme retrieved from user device (or fallback theme) if `sourceColor` not provided
    - theme based on `sourceColor` if provided
  - `updateTheme(sourceColor)`: Function to update theme by generating a new one based on a source color
  - `resetTheme()`: Function to reset theme to default (system or fallback)

> `updateTheme()` and `resetTheme()` will change the theme returned by `useMaterial3Theme()`, it will not change theme at system level

<br>

## <code>getMaterial3Theme(fallbackSourceColor?: string): <a href="../src/ExpoMaterial3Theme.types.ts#L59-L62">Material3Theme</a></code>

Function that will return the theme retrieved from user device (or a fallback theme if device is not supported).

```ts
// Without params
const theme = getMaterial3Theme();

// With params
const theme = getMaterial3Theme('#6750A4');
```

#### Parameters

- `fallbackSourceColor` (optional, default to `#6750A4`): Source color for the fallback theme

#### Returns

- [`Material3Theme`](../src/ExpoMaterial3Theme.types.ts#L59-L62): theme retrieved from user device (or fallback theme)

<br>

## <code>createMaterial3Theme(sourceColor: string): <a href="../src/ExpoMaterial3Theme.types.ts#L59-L62">Material3Theme</a></code>

Function that will create a Material 3 theme based on a source color (using [`@material/material-color-utilities`](https://github.com/material-foundation/material-color-utilities/tree/main/typescript)).

```ts
const theme = createMaterial3Theme('#6750A4');
```

#### Parameters

- `sourceColor` (required): Source color for the theme

#### Returns

- [`Material3Theme`](../src/ExpoMaterial3Theme.types.ts#L59-L62): theme generated from the `sourceColor`

<br>

## `isDynamicThemeSupported: boolean`

Constant that returns if device supports [Material 3 dynamic theme](https://developer.android.com/develop/ui/views/theming/dynamic-colors) from Android 12+ devices.