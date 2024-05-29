import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import TabBar from './navigation/TabBar/TabBar';

export default function App() {
  return (
    <NavigationContainer>
      <TabBar />
    </NavigationContainer>
  );
}

registerRootComponent(App);
