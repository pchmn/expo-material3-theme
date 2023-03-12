import { useMaterial3Theme } from 'expo-material3-theme';
import { useState } from 'react';
import { Dialog, FAB, Portal, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Flex } from './components/Flex';
import { ThemeEditor } from './components/ThemeEditor';
import { ThemeProvider } from './providers/ThemeProvider';
import { storage } from './storage';
import { ComponentsExampleView } from './views/ComponentsExampleView';

export default function App() {
  const sourceColor = storage.getString('sourceColor');
  const { theme, updateTheme, resetTheme } = useMaterial3Theme({
    fallbackSourceColor: sourceColor,
    overwrite: !!sourceColor,
  });
  // const [theme, setTheme] = useState(sourceColor ? createMaterial3ThemeFromSourceColor(sourceColor) : material3Theme);

  return (
    <ThemeProvider theme={theme} resetTheme={resetTheme} updateTheme={updateTheme}>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);

  const toggleModal = () => setVisible((visible) => !visible);

  return (
    <Flex
      flex={1}
      backgroundColor={theme.colors.background}
      style={{
        paddingTop: insets.top,
        position: 'relative',
      }}
    >
      <ComponentsExampleView />

      <Portal>
        <Dialog visible={visible} onDismiss={toggleModal}>
          <Dialog.Title>Change theme</Dialog.Title>
          <Dialog.Content>
            <ThemeEditor />
          </Dialog.Content>
        </Dialog>
      </Portal>

      <FAB
        icon="palette"
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        onPress={toggleModal}
      />
    </Flex>
  );
}
