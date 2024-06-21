import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import RecipeCard from '../../components/RecipeCard'; // Import RecipeCard

const APP_ID = '7d001e38';
const APP_KEY = 'a7155b5bebc73690b4c7c5f596792ebc';
const PAGE_SIZE = 10; 

const PlayGroundScreen = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [from, setFrom] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async (reset = false) => {
    if (reset) {
      setFrom(0);
      setRecipes([]);
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${reset ? 0 : from}&to=${reset ? PAGE_SIZE : from + PAGE_SIZE}`
      );
      setRecipes(prevRecipes => reset ? response.data.hits : [...prevRecipes, ...response.data.hits]);
      setFrom(reset ? PAGE_SIZE : from + PAGE_SIZE);
      setError(null);
    } catch (error) {
      setError(error);
      console.error('Error response:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecipePress = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe Search</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter recipe name"
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Search" onPress={() => fetchRecipes(true)} />
      </View>
      {error && <Text style={styles.error}>Error: {error.message}</Text>}
      <FlatList
        data={recipes}
        keyExtractor={(item, index) => `${item.recipe.uri}-${index}`} 
        numColumns={2} // Two Columns for recipeCard
        renderItem={({ item }) => (
          <RecipeCard recipe={item.recipe} onPress={handleRecipePress} /> //Add Recipe Card
        )}
        onEndReached={() => {
          if (!loading) {
            fetchRecipes(false);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text>Loading...</Text> : null}
      />
      {selectedRecipe && (
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeTitle}>{selectedRecipe.label}</Text>
          <Text>Ingredients:</Text>
          {selectedRecipe.ingredientLines.map((ingredient, index) => (
            <Text key={index} style={styles.ingredient}>{ingredient}</Text>
          ))}
          <Text>Calories: {selectedRecipe.calories.toFixed(2)}</Text>
          <Text>Fat: {selectedRecipe.totalNutrients.FAT.quantity.toFixed(2)} {selectedRecipe.totalNutrients.FAT.unit}</Text>
          <Text>Protein: {selectedRecipe.totalNutrients.PROCNT.quantity.toFixed(2)} {selectedRecipe.totalNutrients.PROCNT.unit}</Text>
          <Text>Carbs: {selectedRecipe.totalNutrients.CHOCDF.quantity.toFixed(2)} {selectedRecipe.totalNutrients.CHOCDF.unit}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  recipeDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ingredient: {
    marginLeft: 10,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 20,
  },
});

export default PlayGroundScreen;
