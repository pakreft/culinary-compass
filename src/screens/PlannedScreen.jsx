// src/screens/PlannedScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const days = [
  {
    date: 'Montag - 21.06.',
    recipes: ['Süßkartoffelpommes mit Sourcreme'],
  },
  {
    date: 'Donnerstag - 24.06.',
    recipes: [
      'Süßkartoffeln mit blaalal dwadada',
      'Süßkartoffeln mit blaalal dwadada',
    ],
  },
  // Add more days as needed
];

const PlannedScreen = ({ navigation }) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  const handlePrevWeek = () => {
    setCurrentWeek(currentWeek - 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Planned Recipes</Text>
        <View style={styles.weekNavigation}>
          <TouchableOpacity onPress={handlePrevWeek}>
            <Ionicons name="chevron-back" size={24} color="purple" />
          </TouchableOpacity>
          <Text style={styles.weekText}>{`Woche ${currentWeek + 1}`}</Text>
          <TouchableOpacity onPress={handleNextWeek}>
            <Ionicons name="chevron-forward" size={24} color="purple" />
          </TouchableOpacity>
        </View>
        <Text style={styles.dateRange}>31.04. - 06.05.</Text>
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
                <TouchableOpacity style={styles.deleteButton}>
                  <Ionicons name="close" size={24} color="purple" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddRecipe')}
      >
        <Ionicons name="add" size={24} color="white" />
      </TouchableOpacity>
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recipeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'lightgray',
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
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlannedScreen;
