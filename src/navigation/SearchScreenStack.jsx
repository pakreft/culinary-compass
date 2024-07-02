import { createStackNavigator } from '@react-navigation/stack';

import { routes } from '../constants/routes';
import { stackScreenOptions } from './stackScreenOptions';
import SearchScreenTopTabs from './SearchScreenTopTabs';
import RecipeViewScreen from '../screens/RecipeViewScreen';
import colors from '../constants/colors';

const Stack = createStackNavigator();

export default function SearchScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName={routes.searchTopTabs}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background, // Set the header background color
        },
        headerTintColor: colors.accent, // Set the header text color
        headerTitleStyle: {
          fontWeight: 'bold', // Set the header title style
        },
      }}
    >
      <Stack.Screen
        name={routes.searchTopTabs}
        component={SearchScreenTopTabs}
        options={{ headerTitle: 'Search for Recipes' }}
      />

      <Stack.Screen
        name={routes.recipeViewScreen}
        component={RecipeViewScreen}
        options={{ headerTitle: '' }}
      />
    </Stack.Navigator>
  );
}
