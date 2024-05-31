import { createStackNavigator } from '@react-navigation/stack';

import { routes } from '../constants/routes';
import FavoritesScreen from '../screens/main/FavoritesScreen';

const Stack = createStackNavigator();

export default function FavoritesScreenStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={routes.favoritesScreen}>
      <Stack.Screen name={routes.favoritesScreen} component={FavoritesScreen} />
    </Stack.Navigator>
  );
}
