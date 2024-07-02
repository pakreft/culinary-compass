import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShoppingListContext from '../../contexts/ShoppingListContext';
import ShoppingListItem from '../../components/ShoppingListItem';
import colors from '../../constants/colors';
import App from '../../App';

const Tab = createMaterialTopTabNavigator();

const APP_ID = process.env.EXPO_PUBLIC_APP_ID;
const APP_KEY = process.env.EXPO_PUBLIC_APP_KEY;

const ShoppingModeItem = ({ item, onToggleDone }) => (
  <ShoppingListItem item={item} onToggleDone={onToggleDone} mode="shopping" />
);

const PlanningModeItem = ({ item, onDelete, onToggleDone }) => (
  <ShoppingListItem
    item={item}
    onDelete={onDelete}
    onToggleDone={onToggleDone}
    showDeleteButton={true}
    mode="planning"
  />
);

const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage successfully cleared!');
  } catch (e) {
    console.error('Failed to clear AsyncStorage:', e);
  }
};

const CategoryView = () => {
  const { items, categories, deleteItem, toggleItemDone } = useContext(ShoppingListContext);

  const groupItems = (items) => {
    const groupedItems = {};

    items.forEach((item) => {
      const key = `${item.name}-${item.measurement}`;
      if (!groupedItems[key]) {
        groupedItems[key] = { ...item };
      } else {
        if (item.measurement === 'g') {
          groupedItems[key].amount += item.amount;
        } else {
          groupedItems[key].count += item.count;
        }
      }
    });

    return Object.values(groupedItems);
  };

  const renderCategory = ({ item }) => {
    const filteredItems = item.items.filter(i => !i.done);
    const groupedItems = groupItems(filteredItems);

    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{item.category}</Text>
        <FlatList
          data={groupedItems}
          renderItem={({ item }) => (
            <ShoppingModeItem
              item={item}
              onToggleDone={toggleItemDone}
            />
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

  const doneItems = items.filter(item => item.done);

  const removeAllDoneItems = () => {
    doneItems.forEach(item => deleteItem(item.id));
  };

  return (
    <FlatList
      ListFooterComponent={
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Done</Text>
          <FlatList
            data={doneItems}
            renderItem={({ item }) => (
              <ShoppingModeItem
                item={item}
                onToggleDone={toggleItemDone}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          {doneItems.length > 0 && (
            <TouchableOpacity style={styles.removeAllButton} onPress={removeAllDoneItems}>
              <Text style={styles.removeAllButtonText}>Remove All Done Items</Text>
            </TouchableOpacity>
          )}
        </View>
      }
      data={categorizedItems}
      renderItem={renderCategory}
      keyExtractor={(item, index) => `category-${item.category}-${index}`}
    />
  );
};

const RecipeView = () => {
  const { items, recipes, deleteItem, toggleItemDone } = useContext(ShoppingListContext);

  const renderRecipe = ({ item }) => {
    const sortedItems = item.items.sort((a, b) => a.done - b.done);
    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{item.recipe}</Text>
        <FlatList
          data={sortedItems}
          renderItem={({ item }) => (
            <PlanningModeItem
              item={item}
              onDelete={deleteItem}
              onToggleDone={toggleItemDone}
            />
          )}
          keyExtractor={(item, index) => `${item.id}-${index}`}
        />
      </View>
    );
  };

  const recipeItems = recipes?.map((recipe, index) => ({
    recipe,
    items: items.filter((item) => item.recipe === recipe),
  })) || [];

  return (
    <FlatList
      data={recipeItems}
      renderItem={renderRecipe}
      keyExtractor={(item, index) => `recipe-${item.recipe}-${index}`}
    />
  );
};

const ShoppingListScreen = () => {
  const [currentTab, setCurrentTab] = useState('Shopping Mode');
  const [modalVisible, setModalVisible] = useState(false);
  const { addItem, categories, recipes } = useContext(ShoppingListContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0] || '');
  const [recipe, setRecipe] = useState(recipes[0] || '');
  const [amount, setAmount] = useState('');

  const handleAddItem = () => {
    console.log(APP_ID, APP_KEY);
    addItem({ 
      id: `${name}-${Date.now()}`, // Create a unique ID
      name, 
      category, 
      amount: parseFloat(amount), // Convert amount to a number
      measurement: 'g', 
      count: null, 
      done: false, 
      recipe 
    });
    setModalVisible(false);
    setName('');
    setCategory(categories[0] || '');
    setRecipe(recipes[0] || '');
    setAmount('');
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenListeners={{
          state: (e) => {
            const currentRouteName =
              e.data.state.routes[e.data.state.index].name;
            setCurrentTab(currentRouteName);
          },
        }}
      >
        <Tab.Screen name="Shopping Mode" component={CategoryView} />
        <Tab.Screen name="Planning Mode" component={RecipeView} />
      </Tab.Navigator>
      {currentTab === 'Planning Mode' && (
        <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.resetButton} onPress={clearAsyncStorage}>
        <Text style={styles.resetButtonText}>Reset AsyncStorage</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Ingredient</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingredient Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount in grams"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
            <Text style={styles.pickerLabel}>Select Category</Text>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
            >
              {categories.map((cat) => (
                <Picker.Item key={cat} label={cat} value={cat} />
              ))}
            </Picker>
            <Text style={styles.pickerLabel}>Select Recipe</Text>
            <Picker
              selectedValue={recipe}
              onValueChange={(itemValue) => setRecipe(itemValue)}
              style={styles.picker}
            >
              {recipes.map((rec) => (
                <Picker.Item key={rec} label={rec} value={rec} />
              ))}
            </Picker>
            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.closeButton, { backgroundColor: 'red' }]} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="white" />
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
    backgroundColor: '#fff',
  },
  categoryContainer: {
    marginBottom: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.accent,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors.secondaryAccent,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButton: {
    position: 'absolute',
    left: 20,
    bottom: 20,
    backgroundColor: '#8a8a8a',
    padding: 10,
    borderRadius: 5,
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  removeAllButton: {
    backgroundColor: '#653c33',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  removeAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#653c33',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#653c33',
    paddingBottom: 8,
    marginBottom: 20,
  },
  pickerLabel: {
    alignSelf: 'flex-start',
    fontSize: 16,
    color: '#653c33',
    marginBottom: 5,
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#653c33',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    bottom: -20,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 50,
  },
});

export default ShoppingListScreen;
