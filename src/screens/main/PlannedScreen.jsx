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
  Pressable,
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
import colors from '../../constants/colors';
import { de } from 'date-fns/locale';
import { useFavorites } from '../../contexts/FavoritesContext';
import SwipeModal from '../../components/SwipeModal';
import ShoppingListContext from '../../contexts/ShoppingListContext';
import axios from 'axios';
import RecipeCard from '../../components/RecipeCard'; // Import RecipeCard
import { MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons from Expo

const APP_ID = process.env.EXPO_PUBLIC_APP_ID;
const APP_KEY = process.env.EXPO_PUBLIC_APP_KEY;
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
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { favorites } = useFavorites();
  const { addItem, newRecipe } = useContext(ShoppingListContext);

  useEffect(() => {
    setSearchResults(favorites);
  }, [favorites]);

  const handleAddAllItemsToShoppingList = () => {
    const startOfCurrentWeek = startOfWeek(selectedDate, { locale: de });
    const endOfCurrentWeek = endOfWeek(selectedDate, { locale: de });

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

    currentWeekRecipes.forEach((recipe) => {
      newRecipe(recipe);
    });
  };

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalVisible(true);
  };

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
  const dateRange = `${format(startDate, 'dd.MM.yy', {
    locale: de,
  })} - ${format(endDate, 'dd.MM.yy', {
    locale: de,
  })}`;

  const days = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = addDays(startDate, i);
    const formattedDate = format(dayDate, 'yyyy-MM-dd');
    const dayName = format(dayDate, 'EEEE', { locale: de });
    days.push({
      date: `${dayName} - ${format(dayDate, 'dd.MM.yy')}`,
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

  return (
    <View style={styles.container}>
      <SwipeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        recipe={selectedRecipe}
      />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerText}></Text>
        </View>
        <View style={styles.weekNavigation}>
          <TouchableOpacity onPress={handlePrevWeek}>
            <Ionicons name="chevron-back" size={24} color={colors.accent} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCalendarVisible(true)}>
            <Text style={styles.weekText}>{`Week ${currentWeek}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextWeek}>
            <Ionicons name="chevron-forward" size={24} color={colors.accent} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addToShoppingListBtn}
            onPress={handleAddAllItemsToShoppingList}
          >
            {/*<Text style={styles.addToList}>Add all to {'\n'}shopping list</Text>*/}
            <Pressable
              onPress={handleAddAllItemsToShoppingList}
              style={({ pressed }) => [pressed && styles.pressedButton]}
            >
              <MaterialIcons
                name="add-shopping-cart"
                size={25}
                style={styles.addToShoppingListIcon}
                color={colors.brightest}
              />
            </Pressable>
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
                <RecipeCard
                  recipe={recipe}
                  onPress={() => openRecipeModal(recipe)}
                />
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeRecipe(day.formattedDate, recipeIndex)}
                >
                  <Ionicons name="close" size={24} color={colors.accent} />
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
        transparent={true}
      >
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={{
            [format(selectedDate, 'yyyy-MM-dd')]: {
              selected: true,
              selectedColor: colors.accent,
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
              numColumns={2} // Two Columns for RecipeCard
              data={searchResults}
              keyExtractor={(item, index) => {
                const uniqueKey = item.recipe ? item.recipe.uri : item.uri;
                return `${uniqueKey}-${index}`;
              }}
              renderItem={({ item }) => (
                <RecipeCard
                  recipe={item.recipe || item}
                  onPress={() => addRecipe(currentDate, item.recipe || item)}
                />
              )}
              onEndReached={() => searchQuery.trim() && searchRecipes()}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={
                loading ? (
                  <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.accent} />
                    <Text style={styles.loadingText}>Loading...</Text>
                  </View>
                ) : (
                  <Text>No favorite recipes found.</Text>
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
    backgroundColor: colors.primary,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: colors.primary,
  },
  weekNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  weekText: {
    fontSize: 18,
    color: colors.accent,
    marginHorizontal: 8,
  },
  dateRange: {
    fontSize: 16,
    color: colors.accent,
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
    color: colors.accent,
  },
  recipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  deleteButton: {
    padding: 8,
  },
  addRecipeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: colors.accent,
    borderRadius: 10,
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.header,
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
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
    color: colors.iconsGrocery,
  },
  closeButtonText: {
    color: colors.iconsGrocery,
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
    color: colors.brightest,
  },
  addToShoppingListBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    padding: 8,
    borderRadius: 8,
  },
  addToList: {
    color: colors.brightest,
    marginRight: 10,
    fontSize: 16,
  },
  pressedButton: {
    backgroundColor: colors.primaryLight,
  },
  addToShoppingListIcon: {
    marginLeft: 'auto',
  },
});

export default PlannedScreen;
