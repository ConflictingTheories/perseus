// App.js
import React from 'react';
import MainNavigator from '../navigation/MainNavigator';
import { useFonts, GFSDidot_400Regular } from '@expo-google-fonts/gfs-didot';
import { ThemeProvider } from './ThemeContext';
import { SQLiteProvider } from 'expo-sqlite';

export default function App() {
  let [fontsLoaded] = useFonts({
    GFSDidot_400Regular,
  });

  if (!fontsLoaded) {
    return <ThemeProvider></ThemeProvider>;
  } else {
    return (
      <SQLiteProvider databaseName="perseus.db" assetSource={{ assetId: require('../assets/perseus.db') }}>
        <ThemeProvider>
          <MainNavigator />
        </ThemeProvider>
      </SQLiteProvider>
    );
  }
}
