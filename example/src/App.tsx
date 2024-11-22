import { useState } from 'react';
import { useMMKVString } from 'react-native-mmkv';
import { Dialog, FAB, Portal } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Flex } from './components/Flex';
import { ThemeEditor } from './components/ThemeEditor';
import { Material3ThemeProvider } from './providers/Material3ThemeProvider';
import { ComponentsExampleView } from './views/ComponentsExampleView';

export default function App() {
  const [sourceColor] = useMMKVString('sourceColor');

  return (
    <Material3ThemeProvider sourceColor={sourceColor}>
      <AppContent />
    </Material3ThemeProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();
  const [visible, setVisible] = useState(false);

  const toggleModal = () => setVisible((visible) => !visible);

  return (
    <Flex
      flex={1}
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
