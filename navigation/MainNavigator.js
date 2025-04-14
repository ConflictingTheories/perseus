// navigation/MainNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryScreen from '../screens/LibraryScreen';
import ReaderScreen from '../screens/ReaderScreen';
import { useTheme } from '../app/ThemeContext';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install this package
import lightModeStyle from '../styles/lightMode';
import darkModeStyle from '../styles/darkMode';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const { theme, toggleTheme } = useTheme();

  const styles = theme === 'light' ? lightModeStyle : darkModeStyle;
  const themeStyles = styles.themeProvider;
  const navigationStyles = styles.navigation;

  return (
    <NavigationContainer>
      <View style={themeStyles.container}>
        <Stack.Navigator
          initialRouteName="Library"
          screenOptions={{
            ...(navigationStyles),
            headerRight: () => (
              <TouchableOpacity onPress={toggleTheme}>
                <Text style={themeStyles.text}>
                  <Ionicons
                    name={theme === 'light' ? "contrast" : "contrast-outline"}
                    color={themeStyles.text.color}
                    size={24}
                  />
                  <Ionicons
                    name={theme === 'light' ? "sunny" : "sunny-outline"}
                    color={themeStyles.text.color}
                    size={24}
                  />
                </Text>
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