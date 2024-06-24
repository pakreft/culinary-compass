import { createStackNavigator } from '@react-navigation/stack';

import { routes } from '../constants/routes';
import { stackScreenOptions } from './stackScreenOptions';
import SearchScreenTopTabs from './SearchScreenTopTabs';

const Stack = createStackNavigator();

export default function SearchScreenStack() {
  return (
    <Stack.Navigator
      initialRouteName={routes.searchTopTabs}
      screenOptions={stackScreenOptions}
    >
      <Stack.Screen
        name={routes.searchTopTabs}
        component={SearchScreenTopTabs}
        options={{ headerTitle: 'Search for Recipes' }}
      />
    </Stack.Navigator>
  );
}
