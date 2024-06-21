import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import BottomTabBar from './navigation/BottomTabBar';
import { ShoppingListProvider } from './contexts/ShoppingListContext';

export default function App() {
  return (
    <ShoppingListProvider>
      <NavigationContainer>
        <BottomTabBar />
      </NavigationContainer>
    </ShoppingListProvider>
  );
}

registerRootComponent(App);
