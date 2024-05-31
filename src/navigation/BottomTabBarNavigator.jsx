import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { routes } from '../constants/routes';
import SearchScreenStackNavigator from './SearchScreenStackNavigator';
import FavoritesScreenStackNavigator from './FavoritesScreenStackNavigator';
import PlannedScreenStackNavigator from './PlannedScreenStackNavigator';
import ShoppingListScreenStackNavigator from './ShoppingListScreenStackNavigator';

const Tab = createBottomTabNavigator();

export default function BottomTabBarNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={routes.searchStack}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={routes.searchStack}
        component={SearchScreenStackNavigator}
        options={{
          tabBarLabel: 'Search',
        }}
      />
      <Tab.Screen
        name={routes.favoritesStack}
        component={FavoritesScreenStackNavigator}
        options={{
          tabBarLabel: 'Favorites',
        }}
      />
      <Tab.Screen
        name={routes.plannedStack}
        component={PlannedScreenStackNavigator}
        options={{
          tabBarLabel: 'Planned',
        }}
      />
      <Tab.Screen
        name={routes.shoppingListStack}
        component={ShoppingListScreenStackNavigator}
        options={{
          tabBarLabel: 'Shopping List',
        }}
      />
    </Tab.Navigator>
  );
}
