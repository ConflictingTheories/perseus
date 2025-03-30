// navigation/MainNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryScreen from '../screens/LibraryScreen';
import ReaderScreen from '../screens/ReaderScreen';
import { useTheme } from '../app/ThemeContext';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import lightModeStyle from '../styles/lightMode';
import darkModeStyle from '../styles/darkMode';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const { theme, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    lightContainer: {
      flex: 1,
      backgroundColor: 'white',
      color: 'black',
    },
    darkContainer: {
      flex: 1,
      backgroundColor: 'black',
      color: 'white',
    },
  });

  return (
    <NavigationContainer>
      <View style={theme === 'light' ? styles.lightContainer : styles.darkContainer}>
        <Stack.Navigator
          initialRouteName="Library"
          screenOptions={{
            ...(theme === 'light' ? lightModeStyle.navigation : darkModeStyle.navigation),
            headerRight: () => (
              <TouchableOpacity onPress={toggleTheme}>
                <Text>{theme === 'light' ? 'Dark' : 'Light'}</Text>
              </TouchableOpacity>
            ),
          }}
        >
          <Stack.Screen name="Library" component={LibraryScreen} />
          <Stack.Screen name="Reader" component={ReaderScreen} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default MainNavigator;