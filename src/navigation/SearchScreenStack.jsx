import { createStackNavigator } from '@react-navigation/stack';

import { routes } from '../constants/routes';
import { stackScreenOptions } from './stackScreenOptions';
import SearchScreen from '../screens/main/SearchScreen';

const Stack = createStackNavigator();

export default function SearchScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName={routes.searchScreen}
      screenOptions={stackScreenOptions}
    >
      <Stack.Screen
        name={routes.searchScreen}
        component={SearchScreen}
        options={{ headerTitle: 'Search for Recipes' }}
      />
    </Stack.Navigator>
  );
}
