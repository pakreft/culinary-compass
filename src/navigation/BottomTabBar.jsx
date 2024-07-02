import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { routes } from '../constants/routes';
import SearchScreenStack from './SearchScreenStack';
import FavoritesScreenStack from './FavoritesScreenStack';
import PlannedScreenStack from './PlannedScreenStack';
import ShoppingListScreenStack from './ShoppingListScreenStack';
import PlayGroundScreenStack from './PlayGroundScreenStack';

import colors from '../constants/colors'; // Import the colors

const Tab = createBottomTabNavigator();

export default function BottomTabBar() {
  return (
    <Tab.Navigator
      initialRouteName={routes.searchStack}
      backBehavior="none"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {},
        tabBarStyle: { backgroundColor: colors.accent },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'darkgrey',
      }}
    >
      <Tab.Screen
        name={routes.searchStack}
        component={SearchScreenStack}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.favoritesStack}
        component={FavoritesScreenStack}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.plannedStack}
        component={PlannedScreenStack}
        options={{
          tabBarLabel: 'Meal Planner',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ShoppingList"
        component={ShoppingListScreenStack}
        options={{
          tabBarLabel: 'Shopping List',
          tabBarIcon: ({ color, size }) => (
            <Icon name="cart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={routes.playGroundStack}
        component={PlayGroundScreenStack}
        options={{
          tabBarLabel: 'PlayGround',
          tabBarIcon: ({ color, size }) => (
            <Icon name="construct" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
