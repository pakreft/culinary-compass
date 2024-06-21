import React from 'react';
import { Card, Image, Text } from 'react-native-elements';
import { TouchableOpacity, StyleSheet, View } from 'react-native'; // Import View

const RecipeCard = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(recipe)} style={styles.cardContainer}>
      <Card containerStyle={styles.card}>
        <Image source={{ uri: recipe.image }} style={styles.image} />
        <Text style={styles.label}>{recipe.label}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1, // Set flex ratio to 1 to share available space
    paddingHorizontal: 5, // Horizontal spacing between cards
    marginBottom: 10, // Vertical spacing between cards
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: 150, // Adjusted image height
  },
  label: {
    fontSize: 16, // Adjusted font size
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: 'center', // Center-align text
  },
});

export default RecipeCard;
