// src/context/FavoritesContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [plannedRecipes, setPlannedRecipes] = useState({});

  useEffect(() => {
    loadFavorites();
    loadPlannedRecipes();
  }, []);

  const saveFavorites = async (favorites) => {
    try {
      const jsonValue = JSON.stringify(favorites);
      await AsyncStorage.setItem('@favorites', jsonValue);
    } catch (e) {
      console.log('Error saving favorites:', e);
    }
  };

  const loadFavorites = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorites');
      if (jsonValue != null) {
        setFavorites(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log('Error loading favorites:', e);
    }
  };

  const savePlannedRecipes = async (recipes) => {
    try {
      const jsonValue = JSON.stringify(recipes);
      await AsyncStorage.setItem('@plannedRecipes', jsonValue);
    } catch (e) {
      console.log('Error saving planned recipes:', e);
    }
  };

  const loadPlannedRecipes = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@plannedRecipes');
      if (jsonValue != null) {
        setPlannedRecipes(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.log('Error loading planned recipes:', e);
    }
  };

  const addFavorite = (recipe) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.label === recipe.label)) {
        return prevFavorites;
      }
      const newFavorites = [...prevFavorites, recipe];
      saveFavorites(newFavorites);
      return newFavorites;
    });
  };

  const removeFavorite = (recipe) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter(
        (fav) => fav.label !== recipe.label,
      );
      saveFavorites(newFavorites);
      return newFavorites;
    });
  };

  const addPlannedRecipe = (date, newRecipe) => {
    setPlannedRecipes((prevRecipes) => {
      const updatedRecipes = { ...prevRecipes };
      if (!updatedRecipes[date]) {
        updatedRecipes[date] = [];
      }
      updatedRecipes[date].push(newRecipe);
      savePlannedRecipes(updatedRecipes);
      return updatedRecipes;
    });
  };

  const removePlannedRecipe = (date, index) => {
    setPlannedRecipes((prevRecipes) => {
      const updatedRecipes = { ...prevRecipes };
      updatedRecipes[date].splice(index, 1);
      savePlannedRecipes(updatedRecipes);
      return updatedRecipes;
    });
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        plannedRecipes,
        addPlannedRecipe,
        removePlannedRecipe,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
