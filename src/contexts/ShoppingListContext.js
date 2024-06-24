import React, { createContext, useState } from 'react';

const ShoppingListContext = createContext();

const initialItems = [
  { id: '1', name: 'Apple', category: 'Obst', amount: '200', measurement: 'g', count: null, done: false, recipe: 'Obstsalat' },
  { id: '2', name: 'Carrot', category: 'Gemüse', amount: '300', measurement: 'g', count: null, done: false, recipe: 'Bolognese' },
  { id: '3', name: 'Chicken', category: 'Fleisch', amount: '500', measurement: 'g', count: null, done: false, recipe: 'Chicken Curry' },
  { id: '4', name: 'Bread', category: 'Getreide', amount: null, measurement: 'loaf', count: 1, done: false, recipe: 'Sandwich' },
  { id: '5', name: 'Banana', category: 'Obst', amount: '150', measurement: 'g', count: null, done: false, recipe: 'Smoothie' },
  { id: '6', name: 'Spinach', category: 'Gemüse', amount: '200', measurement: 'g', count: null, done: false, recipe: 'Spinach Pie' },
  { id: '7', name: 'Beef', category: 'Fleisch', amount: '400', measurement: 'g', count: null, done: false, recipe: 'Beef Stew' },
  { id: '8', name: 'Rice', category: 'Getreide', amount: '1', measurement: 'kg', count: null, done: false, recipe: 'Fried Rice' },
  { id: '9', name: 'Sugar', category: 'Gewürze', amount: null, measurement: 'Esslöffel', count: 1, done: false, recipe: 'Dessert' },
];

const initialCategories = ['Obst', 'Gemüse', 'Fleisch', 'Getreide', 'Gewürze'];
const initialRecipes = ['Obstsalat', 'Bolognese', 'Chicken Curry', 'Sandwich', 'Smoothie', 'Spinach Pie', 'Beef Stew', 'Fried Rice', 'Dessert'];

export const ShoppingListProvider = ({ children }) => {
  const [items, setItems] = useState(initialItems);
  //const [nextId, setNextId] = useState(initialItems.length + 1);
  const [categories, setCategories] = useState(initialCategories);
  const [recipes, setRecipes] = useState(initialRecipes);
  
  const addItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  
    setCategories((prevCategories) => {
      if (!prevCategories.includes(newItem.category)) {
        return [...prevCategories, newItem.category];
      }
      return prevCategories;
    });
  
    setRecipes((prevRecipes) => {
      if (!prevRecipes.includes(newItem.recipe)) {
        return [...prevRecipes, newItem.recipe];
      }
      return prevRecipes;
    });
  };
  
  const deleteItem = (itemId) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);

      const itemToDelete = prevItems.find((item) => item.id === itemId);
      const isLastInCategory = !updatedItems.some((item) => item.category === itemToDelete.category);
      const isLastInRecipe = !updatedItems.some((item) => item.recipe === itemToDelete.recipe);

      if (isLastInCategory) {
        setCategories((prevCategories) => prevCategories.filter((category) => category !== itemToDelete.category));
      }

      if (isLastInRecipe) {
        setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe !== itemToDelete.recipe));
      }
      return updatedItems;
    });
    
  };

  const newRecipe = (recipe) => {
    console.log("Adding new recipe: ", recipe.label);
  
    recipe.ingredients.forEach((ingredient, index) => {
      const newItem = {
        id: `${ingredient.foodId}-${index}-${Date.now()}-${Math.random().toString(16).slice(2)}`, // Eindeutige ID durch Kombination aus foodId und Index
        name: ingredient.food,
        category: ingredient.foodCategory || 'Sonstiges', // Default Kategorie, falls keine vorhanden
        amount: ingredient.weight.toFixed(2),
        measurement: ingredient.measure || 'g', // Default Maßeinheit, falls keine vorhanden
        count: ingredient.quantity,
        done: false,
        recipe: recipe.label
      };
  
      addItem(newItem);
    });
  
    console.log("All ingredients from the recipe have been added to the shopping list.");
  };
  

  const toggleItemDone = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item
      )
    );
  };

  const updateItemAmount = (itemId, amount, measurement, count) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, amount, measurement, count } : item
      )
    );
  };

  return (
    <ShoppingListContext.Provider value={{
      items,
      categories,
      recipes,
      addItem,
      deleteItem,
      newRecipe,
      toggleItemDone,
      updateItemAmount
    }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export default ShoppingListContext;
