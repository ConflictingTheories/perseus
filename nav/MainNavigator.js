// navigation/MainNavigator.js
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryScreen from '../screens/LibraryScreen';
import ReaderScreen from '../screens/ReaderScreen';
import lightModeStyle from '../styles/lightMode';
import darkModeStyle from '../styles/darkMode';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const [darkMode, setDarkMode] = useState(true);

  const LibraryScreenComponent = ({ navigation, route }) => <LibraryScreen route={route} navigation={navigation} darkMode={darkMode} />;
  const ReaderScreenComponent = ({ navigation, route }) => <ReaderScreen route={route} navigation={navigation} darkMode={darkMode} />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Library"
        initialParams={darkMode}
        screenOptions={{
          ...(darkMode ? darkModeStyle.navigation : lightModeStyle.navigation),
          headerRight: () => (
            <TouchableOpacity onPress={() => setDarkMode(!!darkMode)}>
              <Text>{darkMode ? 'Dark' : 'Light'}</Text>
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="Library" component={LibraryScreenComponent} />
        <Stack.Screen name="Reader" component={ReaderScreenComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
