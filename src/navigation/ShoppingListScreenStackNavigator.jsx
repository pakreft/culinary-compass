import { createStackNavigator } from '@react-navigation/stack';

import { routes } from '../constants/routes';
import ShoppingListScreen from '../screens/main/ShoppingListScreen';

const Stack = createStackNavigator();

export default function ShoppingListScreenStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={routes.shoppingListScreen}>
      <Stack.Screen
        name={routes.shoppingListScreen}
        component={ShoppingListScreen}
      />
    </Stack.Navigator>
  );
}
