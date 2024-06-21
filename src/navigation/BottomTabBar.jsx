import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { routes } from '../constants/routes';
import SearchScreenStack from './SearchScreenStack';
import FavoritesScreenStack from './FavoritesScreenStack';
import PlannedScreenStack from './PlannedScreenStack';
import ShoppingListScreenStack from './ShoppingListScreenStack';
import PlayGroundScreen from './PlayGroundScreenStack';
import PlayGroundScreenStack from './PlayGroundScreenStack';

const Tab = createBottomTabNavigator();

export default function BottomTabBar() {
  return (
    <Tab.Navigator
      initialRouteName={routes.searchStack}
      backBehavior="none"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {},
        tabBarStyle: { backgroundColor: 'lightgrey' },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'darkgrey',
      }}
    >
      <Tab.Screen
        name={routes.searchStack}
        component={SearchScreenStack}
        options={{
          tabBarLabel: 'Search',
          //tabBarIcon:
        }}
      />
      <Tab.Screen
        name={routes.favoritesStack}
        component={FavoritesScreenStack}
        options={{
          tabBarLabel: 'Favorites',
          //tabBarIcon:
        }}
      />
      <Tab.Screen
        name={routes.plannedStack}
        component={PlannedScreenStack}
        options={{
          tabBarLabel: 'Planned',
          //tabBarIcon:
        }}
      />
      <Tab.Screen
        name="ShoppingList"
        component={ShoppingListScreenStack}
        options={{
          tabBarLabel: 'Shopping List',
        }}
      />
      <Tab.Screen
        name={routes.playGroundStack}
        component={PlayGroundScreenStack}
        options={{
          tabBarLabel: 'PlayGround',
          //tabBarIcon:
        }}
      />
    </Tab.Navigator>
  );
}
