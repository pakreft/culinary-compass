// src/context/FavoritesContext.js
import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (recipe) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.some((fav) => fav.label === recipe.label)) {
        return prevFavorites;
      }
      //console.log('Recipe added to favorites:', recipe);
      return [...prevFavorites, recipe];
    });
    //console.log('Current favorites:', favorites);
  };

  const removeFavorite = (recipe) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav.label !== recipe.label),
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
