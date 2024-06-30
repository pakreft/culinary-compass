import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { routes } from '../constants/routes';
import SearchScreen from '../screens/main/SearchScreen';
import FilterScreen from '../screens/FilterScreen';

const Tab = createMaterialTopTabNavigator();

export default function SearchScreenTopTabs() {
  return (
    <Tab.Navigator
      initialRouteName={routes.searchScreen}
      screenOptions={screenOptions}
      style={styles.wholeScreenContainer}
      sceneContainerStyle={styles.sceneContainer}
    >
      <Tab.Screen
        name={routes.searchScreen}
        component={SearchScreen}
        options={{ tabBarLabel: 'by Language' }}
      />
      <Tab.Screen
        name={routes.filterScreen}
        component={FilterScreen}
        options={{ tabBarLabel: 'by Filters' }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  wholeScreenContainer: {
    //backgroundColor:
  },
  sceneContainer: {},

  // Tab Bar
  tabBar: {
    padding: 5,
    //backgroundColor: 'green',
  },

  // Tabs
  tabsContainer: {
    justifyContent: 'center',
    //backgroundColor: 'blue',
  },
  tab: {
    //backgroundColor: 'red',
    width: 120,
  },

  // Indicator
  indicatorContainer: {
    width: 240,
    //backgroundColor: 'yellow',
  },
  indicator: {
    width: 120,
    height: 5,
    borderRadius: 20,
  },

  // Text
  label: {},
});

const screenOptions = {
  tabBarActiveTintColor: 'blue',

  // Container for the whole tab bar
  tabBarStyle: styles.tabBar,

  // Container for tabs
  tabBarContentContainerStyle: styles.tabsContainer,

  // Tab
  tabBarItemStyle: styles.tab,

  // Container for indicators
  tabBarIndicatorContainerStyle: styles.indicatorContainer,

  // Indicator
  tabBarIndicatorStyle: styles.indicator,

  // Text in tabs
  tabBarLabel: styles.label,
};
