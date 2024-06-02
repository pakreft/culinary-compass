import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

const recipeData = {
  title: 'Apple Pie',
  time: '20 Min.',
  vegetarian: 'Vegetarian',
  nutrition: [
    { label: 'Kcal', value: '20' },
    { label: 'Protein', value: '40g' },
    { label: 'Carbs', value: '50g' },
    { label: 'Fat', value: '50g' },
  ],
  groceries: [
    { name: 'egg', type: 'material-community', quantity: '2x', label: 'Eggs' },
    { name: 'apple', type: 'material-community', quantity: '250g', label: 'Apples' },
  ],
};

const RecipeDetailsScreen = () => {
  const [portions, setPortions] = useState(1);

  const incrementPortions = () => setPortions(portions + 1);
  const decrementPortions = () => setPortions(portions > 1 ? portions - 1 : 1);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.recipeTitle}>{recipeData.title}</Text>
          <MaterialIcons name="star-border" size={35} color="black" style={{paddingRight:15}}/>
        </View>
        <View style={styles.info}>
          <MaterialIcons name="timelapse" size={40} color="purple" style={styles.timeBtn}/>
          <Text style={styles.time}>{recipeData.time}</Text>
          <Text style={styles.vegetarian}>{recipeData.vegetarian}</Text>
        </View>
        <View style={styles.actions}>
          <Pressable style={styles.pressableButton}>
          <MaterialIcons name="calendar-month" size={24} color="white" style={{justifyContent:'center', flexDirection:'row'}} />
            <Text style={styles.buttonText}>Plan</Text>
          </Pressable>
          {/*
          <Pressable style={styles.pressableButton}>
           <MaterialIcons name="star-border" size={24} color="white" />
            <Text style={styles.buttonText}>Save</Text>
          </Pressable> 
          */}
        </View>
      </View>

      <View style={styles.portions}>
        <Text style={styles.portionsText}>Portions</Text>
        <View style={styles.portionsControl}>
          <Pressable onPress={decrementPortions}>
            <Icon name="remove" size={30} color="white" style={{backgroundColor: 'purple', borderRadius: 40,}}/>
          </Pressable>
          <Text style={styles.portionsNumber}>{portions}</Text>
          <Pressable onPress={incrementPortions}>
            <Icon name="add" size={30} color="white" style={{backgroundColor: 'purple', borderRadius: 40,}}/>
          </Pressable>
        </View>
      </View>

      <View style={styles.groceries}>
        <Text style={styles.groceriesTitle}>Groceries for 1 Portion</Text>
        <Pressable>
          <Text style={styles.addToList}>Add all to shopping list</Text>
        </Pressable>
        <View style={styles.groceryItems}>
          {recipeData.groceries.map((item, index) => (
            <View key={index} style={styles.groceryItem}>
              <Icon name={item.name} type={item.type} size={40} />
              <Text style={styles.groceryText}>{item.quantity} {item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.nutrition}>
        <Text style={styles.nutritionTitle}>Nutrition for 1 Portion</Text>
        <View style={styles.nutritionItems}>
          {recipeData.nutrition.map((item, index) => (
            <View key={index} style={styles.nutritionItem}>
              <Text style={styles.nutritionValue}>{item.value}</Text>
              <Text style={styles.nutritionLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.instructionsButton}>
        <Pressable style={[styles.pressableButton, ]}>
          <MaterialIcons name="menu-book" size={24} color="white" />
          <Text style={styles.buttonText}>Instructions</Text>
        </Pressable>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    padding:20,
    marginBottom: 20,
    backgroundColor: 'silver',
  },
  title:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipeTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 10,

  },
  time: {
    fontSize: 16,
    marginRight: 20,
  },
  timeBtn:{
    bottom: 10,
    marginRight: 10,
  },
  vegetarian: {
    fontSize: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  pressableButton: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 10,
    marginRight: 35,
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
  },
  portions: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  portionsText: {
    fontSize: 18,
  },
  portionsControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  portionsNumber: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  groceries: {
    //marginBottom: 20,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  groceriesTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  addToList: {
    color: 'purple',
    marginBottom: 10,
  },
  groceryItems: {
    flexDirection: 'row',
  },
  groceryItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    margin:3,
    backgroundColor: '#e5dce5',
  },
  groceryText: {
    marginTop: 5,
    
  },
  nutrition: {
    padding: 20,
  },
  nutritionTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  nutritionItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    
  },
  nutritionItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding:15,
    borderRadius:30,
  },
  nutritionValue: {
    fontSize: 18,
  },
  nutritionLabel: {
    fontSize: 14,
  },
  instructionsButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'purple',
    marginHorizontal: 20,
    borderRadius: 15,
    //marginTop: 20,
  },
});

export default RecipeDetailsScreen;
