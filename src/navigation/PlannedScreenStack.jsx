import { createStackNavigator } from '@react-navigation/stack';

import { routes } from '../constants/routes';
import { stackScreenOptions } from './stackScreenOptions';
import PlannedScreen from '../screens/main/PlannedScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import DetailsRecipeScreen from '../screens/DetailsRecipeScreen';

const Stack = createStackNavigator();

export default function PlannedScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName={routes.plannedScreen}
      screenOptions={stackScreenOptions}
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
      <Stack.Screen
        name={routes.detailsRecipeScreen}
        component={DetailsRecipeScreen}
        options={{ headerTitle: 'View Details Recipe' }}
      />
    </Stack.Navigator>
  );
}
