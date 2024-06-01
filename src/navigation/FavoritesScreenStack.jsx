import { createStackNavigator } from '@react-navigation/stack';

import { routes } from '../constants/routes';
import { stackScreenOptions } from './stackScreenOptions';
import FavoritesScreen from '../screens/main/FavoritesScreen';

const Stack = createStackNavigator();

export default function FavoritesScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName={routes.favoritesScreen}
      screenOptions={stackScreenOptions}
    >
      <Stack.Screen
        name={routes.favoritesScreen}
        component={FavoritesScreen}
        options={{ headerTitle: 'Favorite Recipes' }}
      />
    </Stack.Navigator>
  );
}
