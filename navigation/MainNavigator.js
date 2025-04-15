// navigation/MainNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryScreen from '../screens/LibraryScreen';
import ReaderScreen from '../screens/ReaderScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/settings/AboutScreen';
import OpenSourceScreen from '../screens/settings/OpenSourceScreen';
import StorageManagementScreen from '../screens/settings/StorageManagementScreen';
import RepositoryManagementScreen from '../screens/settings/RepositoryManagementScreen';
import ReaderSettingsScreen from '../screens/settings/ReaderSettingsScreen';
import { useTheme } from '../app/ThemeContext';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install this package
import lightModeStyle from '../styles/lightMode';
import darkModeStyle from '../styles/darkMode';
import SQLiteService from '../services/sqliteService';

const Stack = createStackNavigator();

/**
 * Render the theme toggle button.
 * @param {*} toggleTheme 
 * @param {*} theme 
 * @returns 
 */
const themeButton = (toggleTheme, theme) => {
  const styles = theme === 'light' ? lightModeStyle : darkModeStyle;
  const themeStyles = styles.themeProvider;

  return <TouchableOpacity onPress={toggleTheme}>
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
}

/**
 * Render the theme toggle button.
 * @returns 
 */
const settingsMenuButton = (navigation, theme) => {
  const styles = theme === 'light' ? lightModeStyle : darkModeStyle;
  const themeStyles = styles.themeProvider;

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Settings')}> {/* Correct navigation */}
      <Text style={themeStyles.text}>
        <Ionicons
          name={theme === 'light' ? "cog" : "cog-outline"}
          color={themeStyles.text.color}
          size={24}
        />
      </Text>
    </TouchableOpacity>
  );
};

/**
 * 
 * @returns 
 */
const MainNavigator = () => {
  const { theme, toggleTheme } = useTheme();
  const styles = theme === 'light' ? lightModeStyle : darkModeStyle;
  const themeStyles = styles.themeProvider;
  const navigationStyles = styles.navigation;
  const sqliteService = new SQLiteService('perseus.db');
  return (
    <NavigationContainer>
      <View style={themeStyles.container}>
        <Stack.Navigator
          initialRouteName="Library"
          screenOptions={({ navigation }) => ({ // Pass navigation here
            ...(navigationStyles),
            headerRight: () => (
              <>
                {themeButton(toggleTheme, theme)}
                {settingsMenuButton(navigation, theme)} {/* Use navigation from screenOptions */}
              </>
            ),
          })}
        >
          <Stack.Screen name="Library" component={LibraryScreen} />
          <Stack.Screen name="Reader" component={ReaderScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <>
                  {themeButton(toggleTheme, theme)}
                </>
              ),
            })} />
          <Stack.Screen name="StorageManagement" component={StorageManagementScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <>
                  {themeButton(toggleTheme, theme)}
                </>
              ),
            })} />
          <Stack.Screen name="RepositoryManagement" component={RepositoryManagementScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <>
                  {themeButton(toggleTheme, theme)}
                </>
              ),
            })} />
          <Stack.Screen name="ReaderSettings" component={ReaderSettingsScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <>
                  {themeButton(toggleTheme, theme)}
                </>
              ),
            })} />
          <Stack.Screen name="About" component={AboutScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <>
                  {themeButton(toggleTheme, theme)}
                </>
              ),
            })} />
          <Stack.Screen name="OpenSource" component={OpenSourceScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <>
                  {themeButton(toggleTheme, theme)}
                </>
              ),
            })} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default MainNavigator;