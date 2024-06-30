import { StyleSheet } from 'react-native';
import { Button } from '@rneui/base';

export default function MainButton({
  title = 'Button',
  loading = false,
  disabled = false,
  onPress,
}) {
  return (
    <Button
      title={title}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
      size="lg"
      radius={20}
      raised={true}
      containerStyle={styles.container}
      buttonStyle={styles.button}
      titleStyle={styles.title}
      disabledStyle={styles.disabled}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: 'red',
  },
  title: {},
  disabled: {},
});
