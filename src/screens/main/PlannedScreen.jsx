import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
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
import SwipeModal from '../../components/SwipeModal';

// Dummy function to simulate fetching recipes for a date
const getRecipesForDate = (date) => {
  const recipesData = {
    '2024-06-21': ['Süßkartoffelpommes mit Sourcreme'],
    '2024-06-24': ['Nudelauflauf', 'Salat'],
    // Add more dates and recipes as needed
  };
  return recipesData[date] || [];
};

const PlannedScreen = ({ navigation }) => {
 
  const [modalVisible, setModalVisible] = useState(false);// Details Modal

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [recipes, setRecipes] = useState({});
  const [addRecipeModalVisible, setAddRecipeModalVisible] = useState(false);
  const [newRecipe, setNewRecipe] = useState('');
  const [currentDate, setCurrentDate] = useState('');

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
  const dateRange = `${format(startDate, 'dd.MM.', { locale: de })} - ${format(endDate, 'dd.MM.', { locale: de })}`;

  // Generate the days for the current week
  const days = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = addDays(startDate, i);
    const formattedDate = format(dayDate, 'yyyy-MM-dd');
    const dayName = format(dayDate, 'EEEE', { locale: de });
    days.push({
      date: `${dayName} - ${format(dayDate, 'dd.MM.')}`,
      formattedDate,
      recipes: recipes[formattedDate] || getRecipesForDate(formattedDate),
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
  };

  const removeRecipe = (date, index) => {
    setRecipes((prevRecipes) => {
      const updatedRecipes = { ...prevRecipes };
      updatedRecipes[date].splice(index, 1);
      return updatedRecipes;
    });
  };

  return (
    <View style={styles.container}>
      <SwipeModal //Details Modal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerText}>Planned Recipes</Text>
          <TouchableOpacity 
            style={styles.alertButton} // Details Modal
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="alert-circle" size={40} color="purple" />
          </TouchableOpacity>
        </View>
        <View style={styles.weekNavigation}>
          <TouchableOpacity onPress={handlePrevWeek}>
            <Ionicons name="chevron-back" size={24} color="purple" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCalendarVisible(true)}>
            <Text style={styles.weekText}>{`Woche ${currentWeek}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNextWeek}>
            <Ionicons name="chevron-forward" size={24} color="purple" />
          </TouchableOpacity>
        </View>
        <Text style={styles.dateRange}>{dateRange}</Text>
      </View>
      <ScrollView>
        {days.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayText}>{day.date}</Text>
            {day.recipes.map((recipe, idx) => (
              <View key={idx} style={styles.recipeContainer}>
                <View style={styles.recipeTextContainer}>
                  <Text style={styles.recipeText}>{recipe}</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => removeRecipe(day.formattedDate, idx)}
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
              }}
            >
              <Ionicons name="add" size={24} color="purple" />
              <Text style={styles.addRecipeButtonText}>Add Recipe</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Modal visible={calendarVisible} animationType="slide">
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
          <Text style={styles.closeButtonText}>Schließen</Text>
        </TouchableOpacity>
      </Modal>
      <Modal
        visible={addRecipeModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Recipe</Text>
            <TextInput
              style={styles.input}
              placeholder="Recipe name"
              value={newRecipe}
              onChangeText={setNewRecipe}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {
                  addRecipe(currentDate, newRecipe);
                  setNewRecipe('');
                  setAddRecipeModalVisible(false);
                }}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setNewRecipe('');
                  setAddRecipeModalVisible(false);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertButton: {
    marginRight: 10,
  },
  weekNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  weekText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: 'purple',
  },
  dateRange: {
    fontSize: 14,
    color: 'purple',
  },
  dayContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  recipeTextContainer: {
    flex: 1,
  },
  recipeText: {
    fontSize: 14,
  },
  deleteButton: {
    marginLeft: 10,
  },
  addRecipeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  addRecipeButtonText: {
    marginLeft: 5,
    color: 'purple',
  },
  closeButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 20,
  },
  closeButtonText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  saveButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  saveButtonText: {
    color: 'white',
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
  cancelButtonText: {
    color: 'white',
  },
});

export default PlannedScreen;
