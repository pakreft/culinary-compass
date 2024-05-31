import { createStackNavigator } from '@react-navigation/stack';

import { routes } from '../constants/routes';
import PlannedScreen from '../screens/main/PlannedScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';

const Stack = createStackNavigator();

export default function PlannedScreenStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={routes.plannedScreen}>
      <Stack.Screen name={routes.plannedScreen} component={PlannedScreen} />
      <Stack.Screen name={routes.addRecipeScreen} component={AddRecipeScreen} />
    </Stack.Navigator>
  );
}
