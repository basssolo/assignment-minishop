import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Products, Orders } from 'screens';
import { colors } from './App';

export type BottomTabsParamList = {
  Products: undefined;
  Orders: undefined;
};

const Tabs = createBottomTabNavigator<BottomTabsParamList>();

const TabsNavigation = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.buttonText,
        tabBarStyle: { backgroundColor: colors.primary },
        tabBarActiveBackgroundColor: colors.primary,
        tabBarActiveTintColor: colors.buttonText,
        tabBarInactiveBackgroundColor: colors.primary,
        tabBarInactiveTintColor: colors.inactiveButtonText,
      }}>
      <Tabs.Screen name="Products" component={Products} />
      <Tabs.Screen name="Orders" component={Orders} />
    </Tabs.Navigator>
  );
};

export default TabsNavigation;
