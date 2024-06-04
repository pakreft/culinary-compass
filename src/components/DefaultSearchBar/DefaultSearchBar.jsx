import { useState } from 'react';
import { SearchBar } from '@rneui/themed';

import { styles } from './styles';

export default function DefaultSearchBar() {
  const [value, setValue] = useState('');

  return (
    <SearchBar
      value={value}
      onChangeText={(newVal) => setValue(newVal)}
      placeholder="Type here"
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
