import { Button, Text } from 'react-native-paper';
import { Flex } from '../components/Flex';

export function ComponentsExampleView() {
  return (
    <Flex gap={40} padding={20}>
      <Flex gap={20}>
        <Text variant="headlineSmall">Themed buttons</Text>
        <Button mode="contained" onPress={() => {}}>
          Contained button
        </Button>
        <Button mode="outlined" onPress={() => {}}>
          Outlined button
        </Button>
      </Flex>
    </Flex>
  );
}
