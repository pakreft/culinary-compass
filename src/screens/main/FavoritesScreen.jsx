import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import RecipeCard from '../../components/RecipeCard';
import { useFavorites } from '../../contexts/FavoritesContext';
import SwipeModal from '../../components/SwipeModal';

const FavoritesScreen = () => {
  const { favorites } = useFavorites();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        numColumns={2}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={openModal} />
        )}
        keyExtractor={(item) => item.label}
        contentContainerStyle={styles.list}
      />
      {selectedRecipe && (
        <SwipeModal
          visible={isModalVisible}
          onClose={closeModal}
          recipe={selectedRecipe}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default FavoritesScreen;
