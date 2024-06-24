import { StyleSheet } from 'react-native';
import { Button } from '@rneui/base';

export default function SearchRecipesButton() {
  return (
    <Button
      title={'dada'}
      disabled={false}
      size="lg"
      radius={20}
      raised={true}
      containerStyle={styles.container}
      buttonStyle={styles.button}
      titleStyle={styles.title}
      onPress={() => {}}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: 'red',
  },
  title: {},
});
