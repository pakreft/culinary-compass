import { StyleSheet } from 'react-native';
import { Button } from '@rneui/base';
import colors from '../constants/colors';

export default function MainButton({
  title = 'Button',
  loading = false,
  disabled = false,
  buttonStyle,
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
      buttonStyle={[styles.button, buttonStyle]}
      titleStyle={styles.title}
      disabledStyle={styles.disabled}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  button: {
    backgroundColor: colors.accent,
  },
  title: {},
  disabled: {},
});
