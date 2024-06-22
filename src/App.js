import React from 'react';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import BottomTabBar from './navigation/BottomTabBar';
import { ShoppingListProvider } from './contexts/ShoppingListContext';
import { FavoritesProvider } from './contexts/FavoritesContext';

export default function App() {
  return (
    <FavoritesProvider>
      <ShoppingListProvider>
        <NavigationContainer>
          <BottomTabBar />
        </NavigationContainer>
      </ShoppingListProvider>
    </FavoritesProvider>
  );
}

registerRootComponent(App);
