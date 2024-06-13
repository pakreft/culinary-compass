import { StyleSheet } from 'react-native';
import { Chip } from '@rneui/base';
import { useState } from 'react';

export default function ToggleChip({
  title,
  startSelected = false,
  disabled = false,
  onPress = (selected) => {},
}) {
  const [selected, setSelected] = useState(startSelected);

  function handlePress() {
    setSelected((selected) => {
      onPress(selected);
      return !selected;
    });
  }

  return (
    <Chip
      title={title}
      onPress={handlePress}
      disabled={disabled}
      radius={20}
      containerStyle={styles.container}
      buttonStyle={selected ? styles.selectedButton : styles.unselectedButton}
      titleStyle={selected ? styles.selectedTitle : styles.unselectedTitle}
      disabledStyle={styles.disabledButton}
      disabledTitleStyle={styles.disabledTitle}
    />
  );
}

const styles = StyleSheet.create({
  container: { alignSelf: 'flex-start' },

  // Buttons
  selectedButton: {
    backgroundColor: 'green',
  },
  unselectedButton: {
    backgroundColor: 'red',
  },
  disabledButton: {
    backgroundColor: 'darkgrey',
  },

  // Titles
  selectedTitle: {},
  unselectedTitle: {},
  disabledTitle: {},
});
