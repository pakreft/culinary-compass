import { createStackNavigator } from '@react-navigation/stack';

import { routes } from '../constants/routes';
import { stackScreenOptions } from './stackScreenOptions';
import FavoritesScreen from '../screens/main/FavoritesScreen';
import colors from '../constants/colors';

const Stack = createStackNavigator();

export default function FavoritesScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName={routes.favoritesScreen}
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
        name={routes.favoritesScreen}
        component={FavoritesScreen}
        options={{ headerTitle: 'Favorite Recipes' }}
      />
    </Stack.Navigator>
  );
}
