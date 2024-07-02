import { StyleSheet } from 'react-native';
import { Chip } from '@rneui/base';
import { useState } from 'react';
import colors from '../constants/colors';

export default function FilterChip({
  title,
  categorie,
  filterKey,
  onPress = ({ categorie, filterKey, selected }) => {},
}) {
  const [selected, setSelected] = useState(false);

  function handleOnPress() {
    const newSelected = !selected;
    setSelected(newSelected);
    onPress({ categorie, filterKey, selected: newSelected });
  }

  return (
    <Chip
      title={title}
      onPress={handleOnPress}
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
    backgroundColor: colors.accent,
  },
  unselectedButton: {
    backgroundColor: '#b99f99',
  },
  disabledButton: {
    backgroundColor: colors.secondaryAccent,
  },
  // Titles
  selectedTitle: {},
  unselectedTitle: {},
  disabledTitle: {},
});
