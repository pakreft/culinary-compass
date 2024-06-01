import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import BottomTabBar from './navigation/BottomTabBar';

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabBar />
    </NavigationContainer>
  );
}

registerRootComponent(App);
