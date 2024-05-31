import { createStackNavigator } from '@react-navigation/stack';

import { routes } from '../constants/routes';
import SearchScreen from '../screens/main/SearchScreen';

const Stack = createStackNavigator();

export default function SearchScreenStackNavigator() {
  return (
    <Stack.Navigator initialRouteName={routes.searchScreen}>
      <Stack.Screen name={routes.searchScreen} component={SearchScreen} />
    </Stack.Navigator>
  );
}
