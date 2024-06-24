import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { getRecipes } from '../../api/edamam';
import SwipeModal from '../../components/SwipeModal';
import DefaultSearchBar from '../../components/DefaultSearchBar/DefaultSearchBar';
import SearchRecipesButton from '../../components/SearchRecipesButton';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchRecipes = async () => {
    if (query.trim() === '') return;
    setLoading(true);
    try {
      const data = await getRecipes(query);
      setRecipes(data.hits);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.inputContainer}>
        <DefaultSearchBar />
      </View>
      <View style={styles.listContainer}></View>
      <View style={styles.buttonContainer}>
        <SearchRecipesButton />
      </View>
    </View>
    /**
    <View style={styles.container}>
      <Text style={styles.title}>Search Recipes</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ingredient or recipe"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={fetchRecipes} />
      {loading && <Text>Loading...</Text>}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.recipe.uri}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeContainer}
            onPress={() => openRecipeModal(item.recipe)}
          >
            <Text style={styles.recipeTitle}>{item.recipe.label}</Text>
            <Text>{item.recipe.source}</Text>
          </TouchableOpacity>
        )}
      />
      <SwipeModal
        visible={modalVisible}
        onClose={closeRecipeModal}
        recipe={selectedRecipe}
      />
    </View> */
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    backgroundColor: 'red',
  },
  listContainer: {
    flex: 1,
    backgroundColor: 'blue',
  },
  buttonContainer: {
    backgroundColor: 'yellow',
  },
});

/**const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  recipeContainer: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
*/
