// App.js
import React, { useEffect } from 'react';
import { View } from 'react-native';
import MainNavigator from '../nav/MainNavigator';
import {
  useFonts,
  GFSDidot_400Regular
} from "@expo-google-fonts/gfs-didot";
import { useTheme } from './ThemeContext';


export default function App() {

  const { theme } = useTheme();

  let [fontsLoaded] = useFonts({
    GFSDidot_400Regular,
  });
  if (!fontsLoaded) {
    return <View></View>;
  } else {
    return <MainNavigator />;
  }
}
