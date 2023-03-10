import { createMaterial3ThemeFromSourceColor, getMaterial3Theme } from 'expo-material3-theme';
import { useState } from 'react';
import { IconButton, Switch, Text, TouchableRipple } from 'react-native-paper';
import { useThemeProviderContext } from '../providers/ThemeProvider';
import { storage } from '../storage';
import { Flex } from './Flex';

const colors = ['#FFE082', '#ADF2C7', '#E5DFFF', '#FDDDB9'];

export function ThemeEditor() {
  const [useSystemTheme, setUseSystemTheme] = useState(storage.getBoolean('useSystemTheme') || false);
  const [baseColor, setBaseColor] = useState<string | undefined>(storage.getString('baseThemeColor'));
  const { setTheme } = useThemeProviderContext();

  const toggleUseSystemTheme = () => {
    if (useSystemTheme) {
      setUseSystemTheme(false);
      storage.set('useSystemTheme', false);
    } else {
      setTheme(getMaterial3Theme('#FFD9DA'));
      setUseSystemTheme(true);
      storage.set('useSystemTheme', true);
      setBaseColor(undefined);
      storage.delete('baseThemeColor');
    }
  };

  const handleBaseColorChange = (color: string) => {
    if (useSystemTheme) {
      return;
    }
    setBaseColor(color);
    storage.set('baseThemeColor', color);
    setTheme(createMaterial3ThemeFromSourceColor(color));
  };

  return (
    <Flex gap={20} style={{ paddingTop: 20 }}>
      <Flex direction="row" justify="space-between">
        <Text>Use system theme</Text>
        <Switch value={useSystemTheme} onValueChange={toggleUseSystemTheme} />
      </Flex>

      <Flex gap={20}>
        <Text>Base color</Text>
        <Flex gap={20} direction="row" justify="center">
          {colors.map((color) => (
            <TouchableRipple
              style={{ height: 50, width: 50, borderRadius: 50 }}
              onPress={() => handleBaseColorChange(color)}
              borderless
              rippleColor="rgba(0, 0, 0, .32)"
              disabled={useSystemTheme}
              key={color}
            >
              <Flex
                backgroundColor={color}
                justify="center"
                align="center"
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  opacity: useSystemTheme ? 0.5 : 1,
                }}
              >
                {color === baseColor && <IconButton icon="check" iconColor="#000" size={20} />}
              </Flex>
            </TouchableRipple>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
