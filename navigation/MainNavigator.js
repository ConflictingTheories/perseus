// navigation/MainNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryScreen from '../screens/LibraryScreen';
import ReaderScreen from '../screens/ReaderScreen';
import SettingsScreen from '../screens/SettingsScreen';
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

  return <TouchableOpacity onPress={() => { navigation.navigate('Settings') }}>
    <Text style={themeStyles.text}>
      <Ionicons
        name={theme === 'light' ? "gear" : "gear-outline"}
        color={themeStyles.text.color}
        size={24}
      />
    </Text>
  </TouchableOpacity>
}

/**
 * Clear the SQLite database and navigate to the Library screen.
 * @param {SQLiteService} sqliteService - The SQLite service instance.
 * @param {string} theme - The current theme.
 */
const clearCacheButton = (sqliteService, theme) => {
  const styles = theme === 'light' ? lightModeStyle : darkModeStyle;
  const themeStyles = styles.themeProvider;

  return <TouchableOpacity onPress={() =>
    sqliteService.deleteDatabase('perseus.db')
      .then(() => {
        console.log('Database deleted');
        navigation.navigate('Library');
      }).catch((error) => {
        console.error('Error deleting database:', error);
      })}>
    <Text style={themeStyles.text}>Clear Data</Text>
  </TouchableOpacity>
}

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
          screenOptions={{
            ...(navigationStyles),
            headerRight: () => <>
              {themeButton(toggleTheme, theme)}
              {/* {settingsMenuButton(navigation, theme)} */}
            </>
          }}
        >
          <Stack.Screen name="Library" component={LibraryScreen} options={
            {
              headerRight: () => (
                <>
                  {clearCacheButton(sqliteService, theme)}
                  {themeButton(toggleTheme, theme)}
                  {/* {settingsMenuButton(navigation, theme)} */}
                </>
              )
            }}
          />
          <Stack.Screen name="Reader" component={ReaderScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
};

export default MainNavigator;