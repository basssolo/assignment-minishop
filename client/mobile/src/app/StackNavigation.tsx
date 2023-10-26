import React from 'react';
import { type NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OrderDetails } from 'screens';
import { colors } from './App';
import {
  default as TabsNavigation,
  type BottomTabsParamList,
} from './TabsNavigation';

export type StackParamList = {
  Main: NavigatorScreenParams<BottomTabsParamList>;
  OrderDetails: {
    orderId: string;
  };
};

const Stack = createNativeStackNavigator<StackParamList>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.primary },
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.buttonText,
      }}>
      <Stack.Screen
        name="Main"
        component={TabsNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetails}
        options={{
          title: 'Order Details',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
