import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import BottomTabBarNavigator from './navigation/BottomTabBarNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabBarNavigator />
    </NavigationContainer>
  );
}

registerRootComponent(App);
