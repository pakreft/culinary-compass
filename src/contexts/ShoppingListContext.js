import React, { createContext, useState } from 'react';

const ShoppingListContext = createContext();

const initialItems = [
  { id: '1', name: 'Apple', category: 'Obst', amount: '200g', done: false, recipe: 'Obstsalat' },
    { id: '2', name: 'Carrot', category: 'Gemüse', amount: '300g', done: false, recipe: 'Bolognese' },
    { id: '3', name: 'Chicken', category: 'Fleisch', amount: '500g', done: false, recipe: 'Chicken Curry' },
    { id: '4', name: 'Bread', category: 'Getreide', amount: '1 loaf', done: false, recipe: 'Sandwich' },
    { id: '5', name: 'Banana', category: 'Obst', amount: '150g', done: false, recipe: 'Smoothie' },
    { id: '6', name: 'Spinach', category: 'Gemüse', amount: '200g', done: false, recipe: 'Spinach Pie' },
    { id: '7', name: 'Beef', category: 'Fleisch', amount: '400g', done: false, recipe: 'Beef Stew' },
    { id: '8', name: 'Rice', category: 'Getreide', amount: '1kg', done: false, recipe: 'Fried Rice' },
];

const initialCategories = ['Obst', 'Gemüse', 'Fleisch', 'Getreide'];
const initialRecipes = ['Obstsalat', 'Bolognese', 'Chicken Curry', 'Sandwich', 'Smoothie', 'Spinach Pie', 'Beef Stew', 'Fried Rice'];


export const ShoppingListProvider = ({ children }) => {
  const [items, setItems] = useState(initialItems);
  const [nextId, setNextId] = useState(initialItems.length + 1);
  const [categories, setCategories] = useState(initialCategories);
  const [recipes, setRecipes] = useState(initialRecipes);

  const addItem = (newItem) => {
    newItem.id = nextId.toString();
    setItems((prevItems) => [...prevItems, newItem]);
    setNextId(nextId + 1);

    if (!categories.includes(newItem.category)) {
      setCategories((prevCategories) => [...prevCategories, newItem.category]);
    }

    if (!recipes.includes(newItem.recipe)) {
      setRecipes((prevRecipes) => [...prevRecipes, newItem.recipe]);
    }
  };

  const deleteItem = (itemId) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);

      // Check for categories to delete
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

  const toggleItemDone = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, done: !item.done } : item
      )
    );
  };

  return (
    <ShoppingListContext.Provider value={{ items, categories, recipes, addItem, deleteItem, toggleItemDone }}>
      {children}
    </ShoppingListContext.Provider>
  );
};

export default ShoppingListContext;

