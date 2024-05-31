// src/screens/AddRecipeScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddRecipeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Add Recipe Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddRecipeScreen;
