import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RecipeCard from '../../components/RecipeCard';
import { useFavorites } from '../../contexts/FavoritesContext';
import SwipeModal from '../../components/SwipeModal';
import MainButton from '../../components/MainButton';
import { fetchRecipes } from '../../api/edamam';
import { useNavigation } from '@react-navigation/native';

const FavoritesScreen = () => {
  const { favorites, addFavorite } = useFavorites();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const addToFavs = () => {
    fetchRecipes({ q: 'chicken' })
      .then((res) => {
        const recipe = res.hits[0].recipe;
        addFavorite(recipe);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setModalVisible(false);
  };

  // Wenn die Favoritenliste leer ist, zeige einen Text und einen Button zum Suchen von Rezepten
  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Du möchtest Favoriten? Such welche!
        </Text>
        <MainButton
          title="Rezepte Suchen"
          onPress={() => navigation.navigate('SearchScreen')}
        />
      </View>
    );
  }

  // Wenn Favoriten vorhanden sind, zeige die Liste der Favoritenrezepte
  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        numColumns={2}
        renderItem={({ item }) => (
          <RecipeCard recipe={item} onPress={() => openModal(item)} />
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default FavoritesScreen;
