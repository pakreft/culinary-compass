import { createStackNavigator } from '@react-navigation/stack';

import { routes } from '../constants/routes';
import { stackScreenOptions } from './stackScreenOptions';
import PlannedScreen from '../screens/main/PlannedScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import colors from '../constants/colors';

const Stack = createStackNavigator();

export default function PlannedScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName={routes.plannedScreen}
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
        name={routes.plannedScreen}
        component={PlannedScreen}
        options={{ headerTitle: 'Planned Recipes' }}
      />
      <Stack.Screen
        name={routes.addRecipeScreen}
        component={AddRecipeScreen}
        options={{ headerTitle: 'Plan new Recipes' }}
      />
      
    </Stack.Navigator>
  );
}
