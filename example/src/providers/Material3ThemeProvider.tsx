import { Material3Scheme, Material3Theme, useMaterial3Theme } from 'expo-material3-theme';
import { createContext, useContext } from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  Provider as PaperProvider,
  ProviderProps,
  useTheme,
} from 'react-native-paper';

import { Flex } from '../components/Flex';

type Material3ThemeProviderProps = {
  theme: Material3Theme;
  updateTheme: (sourceColor: string) => void;
  resetTheme: () => void;
};

const Material3ThemeProviderContext = createContext<Material3ThemeProviderProps>({} as Material3ThemeProviderProps);

export function Material3ThemeProvider({
  children,
  sourceColor,
  fallbackSourceColor,
  ...otherProps
}: ProviderProps & { sourceColor?: string; fallbackSourceColor?: string }) {
  const colorScheme = useColorScheme();

  const { theme, updateTheme, resetTheme } = useMaterial3Theme({
    sourceColor,
    fallbackSourceColor,
  });

  const paperTheme =
    colorScheme === 'dark' ? { ...MD3DarkTheme, colors: theme.dark } : { ...MD3LightTheme, colors: theme.light };

  return (
    <Material3ThemeProviderContext.Provider value={{ theme, updateTheme, resetTheme }}>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <PaperProvider theme={paperTheme} {...otherProps}>
        <Flex flex={1} backgroundColor={paperTheme.colors.background}>
          {children}
        </Flex>
      </PaperProvider>
    </Material3ThemeProviderContext.Provider>
  );
}

export function useMaterial3ThemeContext() {
  const ctx = useContext(Material3ThemeProviderContext);
  if (!ctx) {
    throw new Error('useMaterial3ThemeContext must be used inside Material3ThemeProvider');
  }
  return ctx;
}

export const useAppTheme = useTheme<MD3Theme & { colors: Material3Scheme }>;
