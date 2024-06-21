import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import ShoppingListContext from '../../contexts/ShoppingListContext';
import ShoppingListItem from '../../components/ShoppingListItem';


const ShoppingListScreen = () => {
  const { items, categories, recipes, deleteItem, toggleItemDone } = useContext(ShoppingListContext);
  const [isCategoryView, setIsCategoryView] = useState(true);

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

  const renderRecipe = ({ item }) => {
    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{item.recipe}</Text>
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

const categorizedItems = categories?.map((category) => ({
  category,
  items: items.filter((item) => item.category === category),
})) || [];

const recipeItems = recipes?.map((recipe) => ({
  recipe,
  items: items.filter((item) => item.recipe === recipe),
})) || [];

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Text>Category View</Text>
        <Switch
          value={isCategoryView}
          onValueChange={() => setIsCategoryView((prevValue) => !prevValue)}
        />
        <Text>Recipe View</Text>
      </View>
      <FlatList
        data={isCategoryView ? categorizedItems : recipeItems}
        renderItem={isCategoryView ? renderCategory : renderRecipe}
        keyExtractor={(item) => isCategoryView ? item.category : item.recipe}
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
    fontSize: 20,
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
