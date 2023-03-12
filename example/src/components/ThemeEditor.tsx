import { useColorScheme } from 'react-native';
import { useMMKVBoolean, useMMKVString } from 'react-native-mmkv';
import { IconButton, Switch, Text, TouchableRipple } from 'react-native-paper';
import { useThemeProviderContext } from '../providers/ThemeProvider';
import { Flex } from './Flex';

const colors = [
  {
    light: '#FFE082',
    dark: '#FFE082',
  },
  {
    light: '#3E8260',
    dark: '#ADF2C7',
  },
  {
    light: '#756FAB',
    dark: '#E5DFFF',
  },
  {
    light: '#9F6C2C',
    dark: '#FDDDB9',
  },
];

export function ThemeEditor() {
  const colorScheme = useColorScheme();
  const { updateTheme, resetTheme } = useThemeProviderContext();

  const [usePredifinedTheme, setUsePredifinedTheme] = useMMKVBoolean('usePredifinedTheme');
  const [sourceColor, setSourceColor] = useMMKVString('sourceColor');

  const toggleUsePredefinedTheme = () => {
    if (usePredifinedTheme) {
      setUsePredifinedTheme(false);
    } else {
      setUsePredifinedTheme(true);
      setSourceColor(undefined);
      resetTheme();
    }
  };

  const handleSourceColorChange = (color: string) => {
    if (usePredifinedTheme) {
      return;
    }
    setSourceColor(color);
    updateTheme(color);
  };

  return (
    <Flex gap={20} style={{ paddingTop: 20 }}>
      <Flex direction="row" justify="space-between">
        <Text>Use predefined theme</Text>
        <Switch value={usePredifinedTheme !== false} onValueChange={toggleUsePredefinedTheme} />
      </Flex>

      <Flex gap={20}>
        <Text>Select source color</Text>
        <Flex gap={20} direction="row" justify="center">
          {colors.map(({ light, dark }) => {
            const color = colorScheme === 'dark' ? dark : light;
            return (
              <TouchableRipple
                style={{ height: 50, width: 50, borderRadius: 50 }}
                onPress={() => handleSourceColorChange(color)}
                borderless
                rippleColor="rgba(0, 0, 0, .32)"
                disabled={usePredifinedTheme}
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
                    opacity: usePredifinedTheme ? 0.5 : 1,
                  }}
                >
                  {sourceColor && [light, dark].includes(sourceColor) && (
                    <IconButton icon="check" iconColor="#000" size={20} />
                  )}
                </Flex>
              </TouchableRipple>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
}
