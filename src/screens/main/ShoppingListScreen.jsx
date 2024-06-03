import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

const initialItems = [
  { id: '1', name: 'Apple', category: 'Obst', amount: '200g', done: false },
  { id: '2', name: 'Carrot', category: 'Gemüse', amount: '300g', done: false },
  { id: '3', name: 'Chicken', category: 'Fleisch', amount: '500g', done: false },
  { id: '4', name: 'Bread', category: 'Getreide', amount: '1 loaf', done: false },
  { id: '5', name: 'Banana', category: 'Obst', amount: '150g', done: false },
  { id: '6', name: 'Spinach', category: 'Gemüse', amount: '200g', done: false },
  { id: '7', name: 'Beef', category: 'Fleisch', amount: '400g', done: false },
  { id: '8', name: 'Rice', category: 'Getreide', amount: '1kg', done: false },
];

const categories = ['Obst', 'Gemüse', 'Fleisch', 'Getreide'];

const ShoppingListItem = ({ item, onDelete, onToggleDone }) => (
  <TouchableOpacity style={styles.itemContainer}>
    <View>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemAmount}>{item.amount}</Text>
    </View>
    <View style={styles.buttonsContainer}>
      <View style={styles.buttonWrapper}>
        <Button
          title="Done"
          color={item.done ? 'gray' : 'green'}
          onPress={() => onToggleDone(item.id)}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Löschen" color="red" onPress={() => onDelete(item.id)} />
      </View>
    </View>
  </TouchableOpacity>
);

const ShoppingListScreen = () => {
  const [items, setItems] = useState(initialItems);

  const deleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const toggleItemDone = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item
      )
    );
  };

  const renderCategory = ({ item }) => {
    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{item.category}</Text>
        <FlatList
          data={item.items}
          renderItem={({ item }) => (
            <ShoppingListItem item={item} onDelete={deleteItem} onToggleDone={toggleItemDone} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const categorizedItems = categories.map((category) => ({
    category,
    items: items.filter((item) => item.category === category),
  }));

  return (
    <View style={styles.container}>
      <FlatList
        data={categorizedItems}
        renderItem={renderCategory}
        keyExtractor={(item) => item.category}
      />
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
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
    color: '#800080', // Lila
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#800080', // Lila
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
  },
  itemAmount: {
    fontSize: 14,
    color: '#888',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonWrapper: {
    marginLeft: 10,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#800080', // Lila
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShoppingListScreen;
