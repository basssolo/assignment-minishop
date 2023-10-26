import React from 'react';
import { StatusBar } from 'react-native';
import StackNavigation from './StackNavigation';

export const colors = {
  primary: '#00aa46',
  buttonText: '#fff',
  inactiveButtonText: '#c5c5c5',
  danger: '#f00',
  background: '#fff',
  border: '#e5e5e5',
  card: '#f5f5f5',
} as const;
export const CUSTOMER_ID = 'customer-1' as const;

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <StackNavigation />
    </>
  );
};

export default App;
