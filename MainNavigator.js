// navigation/MainNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryScreen from './LibraryScreen';
import ReaderScreen from './ReaderScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#eee', // sage green
          },
          headerTintColor: '#1E3A8A', // gold
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'serif', // classical font
          },
          headerBackTitleStyle: {
            fontFamily: 'serif', // classical font
          },
        }}
        initialRouteName="Perseus Library"
      >
        <Stack.Screen name="Perseus Library" component={LibraryScreen} />
        <Stack.Screen name="Reader" title="" component={ReaderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
