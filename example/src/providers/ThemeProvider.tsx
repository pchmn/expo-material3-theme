import { Material3Theme } from 'expo-material3-theme';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, Provider as PaperProvider } from 'react-native-paper';

type ThemeProviderProps = {
  theme: Material3Theme;
  setTheme?: (theme: Material3Theme) => void;
  updateTheme: (sourceColor: string) => void;
  resetTheme: () => void;
};

const ThemeProviderContext = createContext<ThemeProviderProps>({} as ThemeProviderProps);

export function useThemeProviderContext() {
  const ctx = useContext(ThemeProviderContext);
  if (!ctx) {
    throw new Error('useThemeProviderContext must be used inside ThemeProvider');
  }
  return ctx;
}

export function ThemeProvider({ children, theme, ...otherProps }: PropsWithChildren<ThemeProviderProps>) {
  const colorScheme = useColorScheme();

  const paperTheme = useMemo(
    () =>
      colorScheme === 'dark' ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light },
    [colorScheme, theme]
  );

  return (
    <ThemeProviderContext.Provider value={{ theme, ...otherProps }}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <PaperProvider theme={paperTheme}>{children}</PaperProvider>
    </ThemeProviderContext.Provider>
  );
}
