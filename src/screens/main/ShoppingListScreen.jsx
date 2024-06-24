import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ShoppingListContext from '../../contexts/ShoppingListContext';
import ShoppingListItem from '../../components/ShoppingListItem';

const Tab = createMaterialTopTabNavigator();

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

// Felix TEst
const CategoryView = () => {
  const { items, categories, deleteItem, toggleItemDone } =
    useContext(ShoppingListContext);

  const renderCategory = ({ item }) => {
    const sortedItems = item.items.filter((i) => !i.done);
    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{item.category}</Text>
        <FlatList
          data={sortedItems}
          renderItem={({ item }) => (
            <ShoppingModeItem
              item={item}
              onToggleDone={() => toggleItemDone(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const categorizedItems =
    categories?.map((category) => ({
      category,
      items: items.filter((item) => item.category === category),
    })) || [];

  const doneItems = items.filter((item) => item.done);

  const removeAllDoneItems = () => {
    doneItems.forEach((item) => deleteItem(item.id));
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
                onToggleDone={() => toggleItemDone(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          {doneItems.length > 0 && (
            <TouchableOpacity
              style={styles.removeAllButton}
              onPress={removeAllDoneItems}
            >
              <Text style={styles.removeAllButtonText}>
                Remove All Done Items
              </Text>
            </TouchableOpacity>
          )}
        </View>
      }
      data={categorizedItems}
      renderItem={renderCategory}
      keyExtractor={(item) => item.category}
    />
  );
};

const RecipeView = () => {
  const { items, recipes, deleteItem, toggleItemDone } =
    useContext(ShoppingListContext);

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
              onDelete={() => deleteItem(item.id)}
              onToggleDone={() => toggleItemDone(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  };

  const recipeItems =
    recipes?.map((recipe) => ({
      recipe,
      items: items.filter((item) => item.recipe === recipe),
    })) || [];

  return (
    <FlatList
      data={recipeItems}
      renderItem={renderRecipe}
      keyExtractor={(item) => item.recipe}
    />
  );
};

// Test ende

// const CategoryView = () => {
//   const { items, categories, deleteItem, toggleItemDone } = useContext(ShoppingListContext);

//   const renderCategory = ({ item }) => {
//     const sortedItems = item.items.filter(i => !i.done);
//     return (
//       <View style={styles.categoryContainer}>
//         <Text style={styles.categoryTitle}>{item.category}</Text>
//         <FlatList
//           data={sortedItems}
//           renderItem={({ item }) => (
//             <ShoppingModeItem
//               item={item}
//               onToggleDone={toggleItemDone}
//             />
//           )}
//           keyExtractor={(item) => item.id}
//         />
//       </View>
//     );
//   };

//   const categorizedItems = categories?.map((category) => ({
//     category,
//     items: items.filter((item) => item.category === category),
//   })) || [];

//   const doneItems = items.filter(item => item.done);

//   const removeAllDoneItems = () => {
//     doneItems.forEach(item => deleteItem(item.id));
//   };

//   return (
//     <FlatList
//       ListFooterComponent={
//         <View style={styles.categoryContainer}>
//           <Text style={styles.categoryTitle}>Done</Text>
//           <FlatList
//             data={doneItems}
//             renderItem={({ item }) => (
//               <ShoppingModeItem
//                 item={item}
//                 onToggleDone={toggleItemDone}
//               />
//             )}
//             keyExtractor={(item) => item.id}
//           />
//           {doneItems.length > 0 && (
//             <TouchableOpacity style={styles.removeAllButton} onPress={removeAllDoneItems}>
//               <Text style={styles.removeAllButtonText}>Remove All Done Items</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       }
//       data={categorizedItems}
//       renderItem={renderCategory}
//       keyExtractor={(item) => item.category}
//     />
//   );
// };

// const RecipeView = () => {
//   const { items, recipes, deleteItem, toggleItemDone } = useContext(ShoppingListContext);

//   const renderRecipe = ({ item }) => {
//     const sortedItems = item.items.sort((a, b) => a.done - b.done);
//     return (
//       <View style={styles.categoryContainer}>
//         <Text style={styles.categoryTitle}>{item.recipe}</Text>
//         <FlatList
//           data={sortedItems}
//           renderItem={({ item }) => (
//             <PlanningModeItem
//               item={item}
//               onDelete={deleteItem}
//               onToggleDone={toggleItemDone}
//             />
//           )}
//           keyExtractor={(item) => item.id}
//         />
//       </View>
//     );
//   };

//   const recipeItems = recipes?.map((recipe) => ({
//     recipe,
//     items: items.filter((item) => item.recipe === recipe),
//   })) || [];

//   return (
//     <FlatList
//       data={recipeItems}
//       renderItem={renderRecipe}
//       keyExtractor={(item) => item.recipe}
//     />
//   );
// };

const ShoppingListScreen = () => {
  const [currentTab, setCurrentTab] = useState('Shopping Mode');

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
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={32} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    marginBottom: 20,
    padding: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#800080',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#800080',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeAllButton: {
    backgroundColor: '#800080',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  removeAllButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ShoppingListScreen;
