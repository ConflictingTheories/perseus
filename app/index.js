// App.js
import React from 'react';
import MainNavigator from '../navigation/MainNavigator';
import { useFonts } from '@expo-google-fonts/gfs-didot';
import { ThemeProvider } from './ThemeContext';
import { SQLiteProvider } from 'expo-sqlite';
import settings from '../config/settings';

export default function App() {
  let [fontsLoaded] = useFonts(settings.fonts);

  if (!fontsLoaded) {
    return <ThemeProvider></ThemeProvider>;
  } else {
    return (
      <SQLiteProvider databaseName={settings.database} assetSource={{ assetId: settings.databaseFile }}>
        <ThemeProvider>
          <MainNavigator />
        </ThemeProvider>
      </SQLiteProvider>
    );
  }
}
