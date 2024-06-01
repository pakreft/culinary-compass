import { createStackNavigator } from '@react-navigation/stack';

import { routes } from '../constants/routes';
import { stackScreenOptions } from './stackScreenOptions';
import ShoppingListScreen from '../screens/main/ShoppingListScreen';

const Stack = createStackNavigator();

export default function ShoppingListScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName={routes.shoppingListScreen}
      screenOptions={stackScreenOptions}
    >
      <Stack.Screen
        name={routes.shoppingListScreen}
        component={ShoppingListScreen}
        options={{ headerTitle: 'Shopping List' }}
      />
    </Stack.Navigator>
  );
}
