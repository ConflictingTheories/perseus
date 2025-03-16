// App.js
import React from 'react';
import MainNavigator from '../nav/MainNavigator';
import { useFonts, GFSDidot_400Regular } from '@expo-google-fonts/gfs-didot';
import { ThemeProvider } from './ThemeContext';

export default function App() {
  let [fontsLoaded] = useFonts({
    GFSDidot_400Regular,
  });

  if (!fontsLoaded) {
    return <ThemeProvider></ThemeProvider>;
  } else {
    return (
      <ThemeProvider>
        <MainNavigator />
      </ThemeProvider>
    );
  }
}
