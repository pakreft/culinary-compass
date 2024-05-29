import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { styles } from './styles';
import { routes } from '../../constants/routes';
import SearchScreen from '../../screens/SearchScreen';
import FavoritesScreen from '../../screens/FavoritesScreen';
import PlannedScreen from '../../screens/PlannedScreen';
import ShoppingListScreen from '../../screens/ShoppingListScreen';

const Tab = createBottomTabNavigator();

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
        component={PlannedScreen}
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
    //headerTitleStyle:
    //tabBarLabelStyle:
    //tabBarIcon:
    //tabBarIconStyle:
    tabBarActiveTintColor: 'red',
    //tabBarInactiveTintColor: 'blue',
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
};
