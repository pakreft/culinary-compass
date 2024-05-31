import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Hinzugefügt

import { styles } from './styles';
import { routes } from '../../constants/routes';
import SearchScreen from '../../screens/SearchScreen';
import FavoritesScreen from '../../screens/FavoritesScreen';
import PlannedScreen from '../../screens/PlannedScreen';
import ShoppingListScreen from '../../screens/ShoppingListScreen';
import AddRecipeScreen from '../../screens/AddRecipeScreen'; // Import AddRecipeScreen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Hinzugefügt

function PlannedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.plannedMain}
        component={PlannedScreen}
        options={options.planned}
      />
      <Stack.Screen
        name={routes.addRecipe}
        component={AddRecipeScreen}
        options={options.addRecipe}
      />
    </Stack.Navigator>
  );
}

export default function TabBar() {
  return (
    <Tab.Navigator
      initialRouteName={routes.search}
      screenOptions={options.default}
      sceneContainerStyle={styles.sceneContainer}
    >
      <Tab.Screen
        name={routes.search}
        component={SearchScreen}
        options={options.search}
      />
      <Tab.Screen
        name={routes.favorites}
        component={FavoritesScreen}
        options={options.favorites}
      />
      <Tab.Screen
        name={routes.planned}
        component={PlannedStack}
        options={options.planned}
      />
      <Tab.Screen
        name={routes.shoppingList}
        component={ShoppingListScreen}
        options={options.shoppingList}
      />
    </Tab.Navigator>
  );
}

const options = {
  default: {
    headerStyle: styles.header,
    tabBarActiveTintColor: 'red',
    tabBarStyle: styles.tabBar,
  },
  search: {
    headerTitle: 'Search Recipes',
    tabBarLabel: 'Search',
  },
  favorites: {
    headerTitle: 'Favorite Recipes',
    tabBarLabel: 'Favorites',
  },
  planned: {
    headerTitle: 'Planned Recipes',
    tabBarLabel: 'Planned',
  },
  shoppingList: {
    headerTitle: 'Shopping List',
    tabBarLabel: 'Shopping List',
  },
  addRecipe: {
    headerTitle: 'Add Recipe',
  },
};
