import { createStackNavigator } from '@react-navigation/stack';
import { routes } from '../constants/routes';
import { stackScreenOptions } from './stackScreenOptions';
import ShoppingListScreen from '../screens/main/ShoppingListScreen';
import colors from '../constants/colors';

const Stack = createStackNavigator();

export default function ShoppingListScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName={routes.shoppingListScreen}
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
        name={routes.shoppingListScreen}
        component={ShoppingListScreen}
        options={{ headerTitle: 'Shopping List' }}
      />
    </Stack.Navigator>
  );
}
