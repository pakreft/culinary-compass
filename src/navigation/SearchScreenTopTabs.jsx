import { StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { routes } from '../constants/routes';
import SearchScreen from '../screens/main/SearchScreen';
import FilterScreen from '../screens/FilterScreen';
import colors from '../constants/colors';

const Tab = createMaterialTopTabNavigator();
const { width } = Dimensions.get('window');

export default function SearchScreenTopTabs() {
  return (
    <Tab.Navigator
      initialRouteName={routes.searchScreen}
      screenOptions={screenOptions}
      style={styles.container}
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
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  tabBar: {
    padding: 5,
    backgroundColor: 'transparent',
  },
  tab: {
    width: width / 2,
    backgroundColor: 'transparent',
  },
  indicator: {
    height: 5,
    borderRadius: 20,
    backgroundColor: colors.secondaryAccent,
  },
  label: {
    color: colors.accent,
    fontWeight: 'bold',
  },
});

const screenOptions = {
  tabBarActiveTintColor: colors.accent,
  tabBarInactiveTintColor: 'grey',
  tabBarStyle: styles.tabBar,
  tabBarIndicatorStyle: styles.indicator,
  tabBarLabelStyle: styles.label,
  tabBarItemStyle: styles.tab,
};
