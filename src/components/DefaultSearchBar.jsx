import { StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/themed';

export default function DefaultSearchBar({
  input,
  onChangeText,
  placeholderText = 'Type here',
}) {
  return (
    <SearchBar
      value={input}
      onChangeText={onChangeText}
      placeholder={placeholderText}
      lightTheme="true"
      round="true"
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      leftIconContainerStyle={styles.leftIconContainer}
      rightIconContainerStyle={styles.rightIconContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
  },
  inputContainer: {
    borderRadius: 22,
    backgroundColor: 'lightgrey',
  },
  input: {
    marginRight: 10,
    //backgroundColor: 'blue',
  },
  leftIconContainer: {
    paddingRight: 0,
    //backgroundColor: 'red',
  },
  rightIconContainer: {
    paddingRight: 0,
    //backgroundColor: 'red',
  },
});
