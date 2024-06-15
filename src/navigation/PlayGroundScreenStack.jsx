import { createStackNavigator } from '@react-navigation/stack';

import { routes } from '../constants/routes';
import { stackScreenOptions } from './stackScreenOptions';
import PlayGroundScreen from '../screens/main/PlayGroundScreen';

const Stack = createStackNavigator();

export default function PlayGroundScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName={routes.playGroundScreen}
      screenOptions={stackScreenOptions}
    >
      <Stack.Screen
        name={routes.playGroundScreen}
        component={PlayGroundScreen}
        options={{ headerTitle: 'PlayGround' }}
      />
    </Stack.Navigator>
  );
}
