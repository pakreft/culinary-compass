import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  FlatList,
  Image,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import {
  format,
  startOfWeek,
  addDays,
  addWeeks,
  getISOWeek,
  endOfWeek,
} from 'date-fns';
import { de } from 'date-fns/locale';
import { useFavorites } from '../../contexts/FavoritesContext';
import SwipeModal from '../../components/SwipeModal';
import ShoppingListContext from '../../contexts/ShoppingListContext';
import axios from 'axios';
import RecipeCard from '../../components/RecipeCard'; // Import RecipeCard

const APP_ID = '7d001e38';
const APP_KEY = 'a7155b5bebc73690b4c7c5f596792ebc';
const PAGE_SIZE = 10;

const PlannedScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [recipes, setRecipes] = useState({});
  const [addRecipeModalVisible, setAddRecipeModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState(0);
  //const [favoriteRecipes, setFavoriteRecipes] = useState([]); // State to hold favorite recipes
  const [selectedRecipe, setSelectedRecipe] = useState(null); // State to hold selected recipe
  const { favorites } = useFavorites();

  const { addItem } = useContext(ShoppingListContext);

  const handleAddItem = (name, category, amount, recipe) => {
    const newItem = {
      name: name,
      category: category,
      amount: amount,
      done: false,
      recipe: recipe,
    };
    addItem(newItem);
  };

  const handleAddAllItemsToShoppingList = () => {
    // Hole das Start- und Enddatum der aktuellen Woche
    const startOfCurrentWeek = startOfWeek(selectedDate, { locale: de });
    const endOfCurrentWeek = endOfWeek(selectedDate, { locale: de });

    // Filtere die Rezepte der aktuellen Woche
    const currentWeekRecipes = Object.entries(recipes).reduce(
      (acc, [date, dailyRecipes]) => {
        const recipeDate = new Date(date);
        if (
          recipeDate >= startOfCurrentWeek &&
          recipeDate <= endOfCurrentWeek
        ) {
          acc.push(...dailyRecipes);
        }
        return acc;
      },
      [],
    );

    // Füge die Zutaten der aktuellen Wochenrezepte zur Einkaufsliste hinzu
    currentWeekRecipes.forEach((recipe) => {
      if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
        recipe.ingredients.forEach((ingredient) => {
          handleAddItem(
            ingredient.food,
            ingredient.foodCategory,
            ingredient.quantity,
            recipe.label,
          );
        });
      }
    });
  };

  useEffect(() => {
    // GEÄNDERT: Setze initial die Favoriten als Suchergebnisse
    setSearchResults(favorites);
  }, [favorites]);

  // useEffect(() => {
  //   // Fetch favorite recipes on component mount
  //   const fetchFavoriteRecipes = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}&health=alcohol-free`,
  //       );
  //       setFavoriteRecipes(response.data.hits);
  //     } catch (error) {
  //       console.error('Error fetching favorite recipes:', error);
  //     }
  //   };

  //   fetchFavoriteRecipes();
  // }, []);

  const handleNextWeek = () => {
    const newDate = addWeeks(selectedDate, 1);
    setSelectedDate(newDate);
  };

  const handlePrevWeek = () => {
    const newDate = addWeeks(selectedDate, -1);
    setSelectedDate(newDate);
  };

  const handleDateSelect = (date) => {
    const selected = new Date(date.dateString);
    setSelectedDate(selected);
    setCalendarVisible(false);
  };

  const getWeekNumber = (date) => {
    return getISOWeek(date);
  };

  const currentWeek = getWeekNumber(selectedDate);

  const startDate = startOfWeek(selectedDate, { locale: de });
  const endDate = endOfWeek(selectedDate, { locale: de });
  const dateRange = `${format(startDate, 'dd.MM.', { locale: de })} - ${format(
    endDate,
    'dd.MM.',
    { locale: de },
  )}`;

  const days = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = addDays(startDate, i);
    const formattedDate = format(dayDate, 'yyyy-MM-dd');
    const dayName = format(dayDate, 'EEEE', { locale: de });
    days.push({
      date: `${dayName} - ${format(dayDate, 'dd.MM.')}`,
      formattedDate,
      recipes: recipes[formattedDate] || [],
    });
  }

  const addRecipe = (date, newRecipe) => {
    setRecipes((prevRecipes) => {
      const updatedRecipes = { ...prevRecipes };
      if (!updatedRecipes[date]) {
        updatedRecipes[date] = [];
      }
      updatedRecipes[date].push(newRecipe);
      return updatedRecipes;
    });
    setAddRecipeModalVisible(false);
  };

  const removeRecipe = (date, index) => {
    setRecipes((prevRecipes) => {
      const updatedRecipes = { ...prevRecipes };
      updatedRecipes[date].splice(index, 1);
      return updatedRecipes;
    });
  };

  const searchRecipes = async (reset = false) => {
    if (!searchQuery.trim()) {
      // Zeige Favoriten an, wenn keine Suchanfrage vorhanden ist
      setSearchResults(favorites);
      return;
    }
    if (reset) {
      setFrom(0);
      setSearchResults([]);
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${reset ? 0 : from}&to=${reset ? PAGE_SIZE : from + PAGE_SIZE}`,
      );
      setSearchResults((prevResults) =>
        reset ? response.data.hits : [...prevResults, ...response.data.hits],
      );
      setFrom(reset ? PAGE_SIZE : from + PAGE_SIZE);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <SwipeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        recipe={selectedRecipe} // Pass the selected recipe to the SwipeModal
      />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerText}>Planned Recipes</Text>
          <TouchableOpacity
            style={styles.alertButton}
            onPress={handleAddAllItemsToShoppingList}
          >
            <Ionicons name="cart-outline" size={40} color="purple" />
          </TouchableOpacity>
        </View>
        <View style={styles.weekNavigation}>
          <TouchableOpacity onPress={handlePrevWeek}>
            <Ionicons name="chevron-back" size={24} color="purple" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCalendarVisible(true)}>
            <Text style={styles.weekText}>{`Week ${currentWeek}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextWeek}>
            <Ionicons name="chevron-forward" size={24} color="purple" />
          </TouchableOpacity>
        </View>
        <Text style={styles.dateRange}>{dateRange}</Text>
      </View>
      <ScrollView>
        {days.map((day, dayIndex) => (
          <View key={dayIndex} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day.date}</Text>
            {day.recipes.map((recipe, recipeIndex) => (
              <View
                key={recipe.uri + recipeIndex}
                style={styles.recipeContainer}
              >
                <TouchableOpacity onPress={() => openRecipeModal(recipe)}>
                  <View style={styles.recipeCard}>
                    <Image
                      source={{ uri: recipe.image }}
                      style={styles.recipeImage}
                    />
                    <Text style={styles.recipeLabel}>{recipe.label}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeRecipe(day.formattedDate, recipeIndex)}
                >
                  <Ionicons name="close" size={24} color="purple" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={styles.addRecipeButton}
              onPress={() => {
                setCurrentDate(day.formattedDate);
                setAddRecipeModalVisible(true);
                setSearchQuery('');
                setSearchResults(favorites);
              }}
            >
              <Ionicons name="add" size={24} color="#fff" />
              <Text style={styles.addRecipeButtonText}>Add Recipe</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={calendarVisible}
        animationType="slide"
        onRequestClose={() => setCalendarVisible(false)}
        transparent={true} // Modal transparent machen, damit die BottomTabBar sichtbar bleibt
      >
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={{
            [format(selectedDate, 'yyyy-MM-dd')]: {
              selected: true,
              selectedColor: 'purple',
            },
          }}
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setCalendarVisible(false)}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </Modal>

      <Modal
        transparent={true}
        visible={addRecipeModalVisible}
        animationType="slide"
        onRequestClose={() => setAddRecipeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Recipe</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for recipes..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              <Button
                title="Search"
                onPress={() => {
                  searchRecipes(true);
                  Keyboard.dismiss();
                }}
              />
            </View>
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => {
                const uniqueKey = item.recipe ? item.recipe.uri : item.uri;
                return `${uniqueKey}-${index}`;
              }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.recipeCard}
                  onPress={() => addRecipe(currentDate, item.recipe || item)}
                >
                  <Image
                    source={{
                      uri: item.recipe ? item.recipe.image : item.image,
                    }}
                    style={styles.recipeImage}
                  />
                  <Text style={styles.recipeLabel}>
                    {item.recipe ? item.recipe.label : item.label}
                  </Text>
                </TouchableOpacity>
              )}
              onEndReached={() => searchQuery.trim() && searchRecipes()}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={
                loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="purple" />
                    <Text style={styles.loadingText}>Loading...</Text>
                  </View>
                ) : (
                  <FlatList
                    data={searchResults}
                    keyExtractor={(item, index) => {
                      const uniqueKey = item.recipe
                        ? item.recipe.uri
                        : item.uri;
                      return `${uniqueKey}-${index}`;
                    }}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.recipeCard}
                        onPress={() =>
                          addRecipe(currentDate, item.recipe || item)
                        }
                      >
                        <Image
                          source={{
                            uri: item.recipe ? item.recipe.image : item.image,
                          }}
                          style={styles.recipeImage}
                        />
                        <Text style={styles.recipeLabel}>
                          {item.recipe ? item.recipe.label : item.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                    onEndReached={() => searchQuery.trim() && searchRecipes()} // Ändere die Bedingung
                    onEndReachedThreshold={0.5}
                    ListEmptyComponent={
                      !searchQuery.trim() && favorites.length === 0 ? (
                        <Text>No favorite recipes found.</Text>
                      ) : null
                    }
                  />
                )
              }
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAddRecipeModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: 'white',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
  },
  alertButton: {
    padding: 8,
  },
  weekNavigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  weekText: {
    fontSize: 18,
    color: 'purple',
    marginHorizontal: 8,
  },
  dateRange: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 4,
  },
  dayContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'purple',
  },
  recipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  recipeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recipeImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 8,
  },
  recipeLabel: {
    fontSize: 16,
    color: 'purple',
  },
  deleteButton: {
    padding: 8,
  },
  addRecipeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: 'purple',
    borderRadius: 4,
    marginTop: 8,
  },
  addRecipeButtonText: {
    color: '#fff',
    marginLeft: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'lightgrey',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    height: '80%', // Fixierte Höhe
    alignSelf: 'center',
    justifyContent: 'flex-start', // Ändert die Ausrichtung nach oben
  },
  // modalContainer: {
  //   flex: 1,
  //   //width: '90%',
  //   justifyContent: 'center',
  //   transparent: 'true',
  //   //justifyContent: 'flex-end', // Anpassung, um Modal von unten nach oben zu schieben
  // },

  // modalContent: {
  //   backgroundColor: 'lightgrey',
  //   padding: 20,
  //   borderRadius: 10,
  //   width: '90%',
  //   height: '80%', // Fixierte Höhe
  //   alignSelf: 'center',
  //   justifyContent: 'flex-start', // Ändert die Ausrichtung nach oben
  // },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'purple',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  loadingText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'purple',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: 'purple',
  },
});

export default PlannedScreen;
