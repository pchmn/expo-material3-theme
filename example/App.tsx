import { StyleSheet, Text, View } from 'react-native';

import * as ExpoMaterial3Theme from 'expo-material3-theme';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoMaterial3Theme.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
